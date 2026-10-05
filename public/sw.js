// Service worker para notificaciones push del panel admin de BEHMONT.
// No cachea nada del sitio -- su unico trabajo es mostrar la notificacion
// cuando llega un push (pedido nuevo/pagado) y abrir el panel al tocarla.

self.addEventListener('push', (event) => {
  let data = { title: 'BEHMONT', body: 'Tenés una novedad en el panel.', url: '/admin/pedidos' };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    // payload no era JSON -- se usa el default
  }

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/images/logo-behmont-oval.png',
        badge: '/images/logo-behmont-oval.png',
        image: data.image,
        data: { url: data.url },
        // Sin esto, Windows cierra el aviso solo a los pocos segundos y es
        // fácil no llegar a verlo -- queda fijo hasta que lo cierren o lo toquen.
        requireInteraction: true,
      }),
      // Si hay una pestaña del sitio abierta en esta PC, le pedimos que
      // reproduzca el sonido de alerta -- la Web Notifications API no permite
      // adjuntar un audio propio a la notificación del sistema.
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsList) => {
        clientsList.forEach((client) => client.postMessage({ type: 'turnero-push' }));
      }),
    ])
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/admin/pedidos';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsList) => {
      for (const client of clientsList) {
        if (client.url.includes(url) && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
