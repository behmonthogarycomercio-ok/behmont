'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Bell, BellOff, BellRing, Volume2, Home, Package, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/price';
import { isRetrasado } from '@/lib/envios';

type Shipment = {
  id: string;
  destino_tipo: 'domicilio' | 'sucursal_andreani' | 'otro';
  destino_detalle: string | null;
  buyer_nickname: string | null;
  items: { title: string; quantity: number }[];
  total: number | null;
  estimated_delivery_date: string | null;
  created_at: string;
  status: 'pendiente';
};

type PushState = 'unsupported' | 'checking' | 'off' | 'on' | 'busy';

const POLL_MS = 45000;
const DELIVERED_BY_KEY = 'envios_delivered_by';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function EnviosPage() {
  const [pushState, setPushState] = useState<PushState>('checking');
  const [soundReady, setSoundReady] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [shipments, setShipments] = useState<Shipment[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [deliveringId, setDeliveringId] = useState<string | null>(null);
  const [deliveredBy, setDeliveredBy] = useState('');

  useEffect(() => {
    setDeliveredBy(localStorage.getItem(DELIVERED_BY_KEY) || '');
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setPushState('unsupported');
      return;
    }
    navigator.serviceWorker.register('/sw.js').then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setPushState(sub ? 'on' : 'off');
    }).catch(() => setPushState('unsupported'));
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
    setPushState('busy');
    try {
      const reg = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setPushState('off');
        return;
      }
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) throw new Error('Falta configurar la clave VAPID');
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const res = await fetch('/api/envios/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });
      if (!res.ok) {
        await sub.unsubscribe();
        throw new Error('No se pudo guardar la suscripción en el servidor');
      }
      setPushState('on');
    } catch {
      setPushState('off');
    }
  }

  async function unsubscribe() {
    setPushState('busy');
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch('/api/envios/subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setPushState('off');
    } catch {
      setPushState('on');
    }
  }

  async function loadShipments() {
    try {
      const res = await fetch('/api/envios/pending');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setShipments(data.shipments);
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }

  useEffect(() => {
    loadShipments();
    const interval = setInterval(loadShipments, POLL_MS);
    return () => clearInterval(interval);
  }, []);

  async function markDelivered(id: string) {
    const name = deliveredBy.trim();
    if (!name) return;
    localStorage.setItem(DELIVERED_BY_KEY, name);
    try {
      const res = await fetch('/api/envios/deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, deliveredBy: name }),
      });
      if (!res.ok) throw new Error();
      setShipments((prev) => (prev ? prev.filter((s) => s.id !== id) : prev));
      setDeliveringId(null);
    } catch {
      alert('No se pudo marcar como entregado. Probá de nuevo.');
    }
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Envíos pendientes</h1>
        </div>

        {pushState === 'off' && (
          <button
            onClick={subscribe}
            className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl2 py-4 text-base font-semibold text-white bg-amber-500 hover:bg-amber-400 shadow-card transition-colors"
          >
            <BellOff className="h-5 w-5" /> Activar avisos de nuevos envíos
          </button>
        )}
        {pushState === 'on' && !soundReady && (
          <button
            onClick={enableSound}
            className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl2 py-3 text-sm font-semibold text-steel-900 bg-white hover:bg-steel-100 shadow-card transition-colors"
          >
            <Volume2 className="h-5 w-5" /> Activar sonido en este dispositivo
          </button>
        )}
        {pushState === 'on' && soundReady && (
          <div className="mb-4 flex items-center gap-2 text-sm text-white/60">
            <BellRing className="h-4 w-4" /> Avisos y sonido activados en este dispositivo
          </div>
        )}
        {pushState === 'unsupported' && (
          <p className="mb-4 text-sm text-amber-400">
            Este navegador no soporta avisos push. Usá Chrome para recibirlos.
          </p>
        )}

        {loadError && (
          <p className="mb-4 text-sm text-red-400">No se pudo actualizar la lista. Reintentando…</p>
        )}

        {shipments === null && <p className="text-white/60">Cargando…</p>}

        {shipments && shipments.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-white/50">
            <CheckCircle2 className="h-12 w-12" />
            <p>No hay envíos pendientes.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {shipments?.map((s) => {
            const retrasado = isRetrasado({
              status: s.status,
              created_at: s.created_at,
              estimated_delivery_date: s.estimated_delivery_date,
            });
            const firstTitle = s.items[0]?.title || 'Producto';
            const extra = s.items.length > 1 ? ` + ${s.items.length - 1} más` : '';

            return (
              <div key={s.id} className="rounded-xl2 bg-steel-900 border border-steel-800 p-4 shadow-card">
                {retrasado && (
                  <span className="inline-block mb-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase">
                    Retrasado
                  </span>
                )}
                <p className="font-display text-lg font-bold">{firstTitle}{extra}</p>
                {s.total != null && <p className="text-sm text-white/50">${formatPrice(s.total)}</p>}

                <div className="mt-3 flex items-start gap-2 text-sm">
                  {s.destino_tipo === 'domicilio' ? (
                    <Home className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                  ) : (
                    <Package className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                  )}
                  <span className="text-white/80">
                    {s.destino_tipo === 'domicilio' ? 'Entregar en domicilio' : 'Llevar a sucursal'}
                    {s.destino_detalle ? ` — ${s.destino_detalle}` : ''}
                  </span>
                </div>

                {s.buyer_nickname && (
                  <p className="mt-1 text-xs text-white/40">Comprador: {s.buyer_nickname}</p>
                )}

                {deliveringId === s.id ? (
                  <div className="mt-3 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={deliveredBy}
                      onChange={(e) => setDeliveredBy(e.target.value)}
                      className="rounded-lg px-3 py-2 text-steel-900"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => markDelivered(s.id)}
                        disabled={!deliveredBy.trim()}
                        className="flex-1 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 py-2 font-semibold text-white"
                      >
                        Confirmar entrega
                      </button>
                      <button
                        onClick={() => setDeliveringId(null)}
                        className="rounded-lg bg-steel-800 hover:bg-steel-700 py-2 px-4 text-white/70"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeliveringId(s.id)}
                    className="mt-3 w-full rounded-lg bg-steel-800 hover:bg-steel-700 py-2 font-semibold text-white"
                  >
                    Marcar entregado
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
