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
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/images/logo-behmont-oval.png',
      badge: '/images/logo-behmont-oval.png',
      data: { url: data.url },
    })
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
