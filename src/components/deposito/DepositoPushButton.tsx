'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import type { DepositoPin } from '@/lib/deposito';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

type State = 'unsupported' | 'checking' | 'off' | 'on' | 'busy';

// Avisos push para Gabriel: se entera de cada retiro/ingreso sin entrar al
// panel. Mismo mecanismo que ActivarAvisosStaff.tsx (turnero), pero
// identificado con pin+code en vez de un nombre fijo.
export default function DepositoPushButton({ pin, code }: { pin: DepositoPin; code: string }) {
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
      const res = await fetch('/api/deposito/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, code, subscription: sub.toJSON() }),
      });
      if (!res.ok) {
        await sub.unsubscribe();
        throw new Error('No se pudo guardar la suscripción');
      }
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
        await fetch('/api/deposito/subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin, code, endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState('off');
    } catch {
      setState('on');
    }
  }

  if (state === 'unsupported') {
    return <p className="text-xs text-amber-400">Este navegador no soporta avisos push. Usá Chrome.</p>;
  }

  if (state === 'checking' || state === 'busy') {
    return (
      <button disabled className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white/40">
        <Bell className="h-4 w-4" /> Un momento…
      </button>
    );
  }

  if (state === 'on') {
    return (
      <button
        onClick={unsubscribe}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
      >
        <BellRing className="h-4 w-4" /> Avisos de retiro/ingreso activados
      </button>
    );
  }

  return (
    <button
      onClick={subscribe}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-400"
    >
      <BellOff className="h-4 w-4" /> Activar avisos de retiro/ingreso
    </button>
  );
}
