'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, BellOff, BellRing, Volume2 } from 'lucide-react';
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
  const [soundReady, setSoundReady] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

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

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    function onMessage(event: MessageEvent) {
      if (event.data?.type === 'turnero-push') playAlertSound();
    }
    navigator.serviceWorker.addEventListener('message', onMessage);
    return () => navigator.serviceWorker.removeEventListener('message', onMessage);
  }, []);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctor();
    }
    return audioCtxRef.current;
  }

  // Beep propio reproducido desde esta pestaña -- la Web Notifications API no
  // deja adjuntar un sonido a la notificación del sistema, así que esto es el
  // refuerzo sonoro mientras esta página quede abierta en la PC.
  function playAlertSound() {
    try {
      const ctx = getAudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      [0, 0.35, 0.7].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = i === 2 ? 1100 : 880;
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.6, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.32);
      });
    } catch {
      // audio no soportado -- la notificación del sistema ya se mostró igual
    }
  }

  function enableSound() {
    getAudioCtx().resume().then(() => setSoundReady(true));
    playAlertSound();
  }

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
      const res = await fetch('/api/turnero/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff, subscription: sub.toJSON() }),
      });
      if (!res.ok) {
        await sub.unsubscribe();
        throw new Error('No se pudo guardar la suscripción en el servidor');
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
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={unsubscribe}
          className="flex items-center gap-2 rounded-xl2 px-6 py-4 text-lg font-semibold text-white bg-success-600 hover:bg-success-700 shadow-card transition-colors"
        >
          <BellRing className="h-5 w-5" /> Avisos activados para {label}
        </button>
        {!soundReady && (
          <button
            onClick={enableSound}
            className="flex items-center gap-2 rounded-xl2 px-5 py-3 text-base font-semibold text-steel-900 bg-white hover:bg-steel-100 shadow-card transition-colors"
          >
            <Volume2 className="h-5 w-5" /> Activar sonido en esta PC
          </button>
        )}
        {soundReady && (
          <p className="text-sm text-white/60 max-w-xs">
            Sonido activado. Dejá esta pestaña abierta en la PC para escucharlo cuando te avisen.
          </p>
        )}
      </div>
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
