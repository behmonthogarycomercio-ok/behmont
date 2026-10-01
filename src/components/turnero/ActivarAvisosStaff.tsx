'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import type { StaffName } from '@/lib/push';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

type State = 'unsupported' | 'checking' | 'off' | 'on' | 'busy';

// Activación de avisos push para una persona del staff (Lucas/Luz/Lito), sin
// cuenta de admin: cada uno abre su propio link privado una vez en su
// celular y a partir de ahí recibe el aviso cuando un cliente lo elige en
// la tablet del salón (/turnero).
export default function ActivarAvisosStaff({ staff, label }: { staff: StaffName; label: string }) {
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
      await fetch('/api/turnero/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff, subscription: sub.toJSON() }),
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
        await fetch('/api/turnero/subscribe', {
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

  if (state === 'unsupported') {
    return (
      <p className="text-amber-500 font-medium">
        Este navegador no soporta notificaciones push. Probá abrir este link con Chrome.
      </p>
    );
  }

  if (state === 'checking' || state === 'busy') {
    return (
      <button disabled className="flex items-center gap-2 rounded-xl2 px-6 py-4 text-lg font-semibold text-steel-400">
        <Bell className="h-5 w-5" /> Un momento…
      </button>
    );
  }

  if (state === 'on') {
    return (
      <button
        onClick={unsubscribe}
        className="flex items-center gap-2 rounded-xl2 px-6 py-4 text-lg font-semibold text-white bg-success-600 hover:bg-success-700 shadow-card transition-colors"
      >
        <BellRing className="h-5 w-5" /> Avisos activados para {label}
      </button>
    );
  }

  return (
    <button
      onClick={subscribe}
      className="flex items-center gap-2 rounded-xl2 px-6 py-4 text-lg font-semibold text-white bg-amber-500 hover:bg-amber-400 shadow-card transition-colors"
    >
      <BellOff className="h-5 w-5" /> Activar avisos para {label}
    </button>
  );
}
