'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

type State = 'unsupported' | 'checking' | 'off' | 'on' | 'busy';

// Notificaciones push del panel: cuando llega un pedido pagado por Mercado
// Pago (confirmado por el webhook, server-side), este navegador recibe un
// aviso aunque el panel esté cerrado. Es Web Push estándar del navegador --
// no depende de ningún servicio de terceros, solo de las claves VAPID
// propias del sitio.
export default function PushSubscribeButton() {
  const [state, setState] = useState<State>('checking');

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setState('unsupported');
      return;
    }
    navigator.serviceWorker.register('/sw.js').then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setState(sub ? 'on' : 'off');
    }).catch(() => setState('unsupported'));
  }, []);

  async function subscribe() {
    setState('busy');
    try {
      const reg = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setState('off');
        return;
      }
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) throw new Error('Falta configurar la clave VAPID');
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });
      setState('on');
    } catch {
      setState('off');
    }
  }

  async function unsubscribe() {
    setState('busy');
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch('/api/push/subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState('off');
    } catch {
      setState('on');
    }
  }

  if (state === 'unsupported') return null;

  if (state === 'checking' || state === 'busy') {
    return (
      <button disabled className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-plate-100/40">
        <Bell className="h-4 w-4" /> Notificaciones…
      </button>
    );
  }

  if (state === 'on') {
    return (
      <button
        onClick={unsubscribe}
        title="Desactivar avisos de pedidos nuevos en este dispositivo"
        className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-400 hover:bg-white/5"
      >
        <BellRing className="h-4 w-4" /> Avisos activados
      </button>
    );
  }

  return (
    <button
      onClick={subscribe}
      title="Recibir un aviso en este dispositivo cuando llegue un pedido pagado"
      className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-plate-100/80 hover:bg-white/5 hover:text-white"
    >
      <BellOff className="h-4 w-4" /> Activar avisos de pedidos
    </button>
  );
}
