'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Bell, BellOff, BellRing, Volume2, Home, Package, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/price';
import {
  isRetrasado,
  getTrackingUrl,
  parseTrackingNumbers,
  NEXT_DRIVER_STATUS,
  DRIVER_ACTION_LABELS,
  STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  type ShipmentStatus,
  type PaymentStatus,
} from '@/lib/envios';

type Shipment = {
  id: string;
  ml_order_id: number;
  destino_tipo: 'domicilio' | 'sucursal_andreani' | 'otro';
  destino_detalle: string | null;
  buyer_nickname: string | null;
  items: { title: string; quantity: number }[];
  total: number | null;
  estimated_delivery_date: string | null;
  created_at: string;
  status: ShipmentStatus;
  payment_status: PaymentStatus;
  transportista: string | null;
  numeros_seguimiento: string[];
  precio_asegurado: number | null;
};

type PushState = 'unsupported' | 'checking' | 'off' | 'on' | 'busy';

const POLL_MS = 45000;
const DRIVER_NAME_KEY = 'envios_driver_name';

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
  // Tarjeta donde se está por confirmar un paso que requiere nombre (retirado/entregado)
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [confirmingStatus, setConfirmingStatus] = useState<ShipmentStatus | null>(null);
  const [driverName, setDriverName] = useState('');
  const [advancingId, setAdvancingId] = useState<string | null>(null);

  // Datos de envío (transportista / seguimiento / precio asegurado) de las
  // cargas manuales -- se completan después, cuando el paquete se despachó
  // como "encomienda en mostrador" y no se sabían al cargar la venta.
  const [trackingFormId, setTrackingFormId] = useState<string | null>(null);
  const [trackingTransportista, setTrackingTransportista] = useState('');
  const [trackingNumero, setTrackingNumero] = useState('');
  const [trackingPrecio, setTrackingPrecio] = useState('');
  const [savingTracking, setSavingTracking] = useState(false);

  useEffect(() => {
    setDriverName(localStorage.getItem(DRIVER_NAME_KEY) || '');
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

  async function sendStatus(id: string, status: ShipmentStatus, by?: string) {
    const res = await fetch('/api/envios/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, by }),
    });
    if (!res.ok) throw new Error();
  }

  // "en_camino" no pide nombre -- avanza directo al tocar el botón.
  // "retirado" y "entregado" sí, porque identifican quién hizo ese paso.
  async function advance(s: Shipment) {
    const next = NEXT_DRIVER_STATUS[s.status];
    if (!next) return;
    if (next === 'en_camino') {
      setAdvancingId(s.id);
      try {
        await sendStatus(s.id, next);
        setShipments((prev) => (prev ? prev.map((x) => (x.id === s.id ? { ...x, status: next } : x)) : prev));
      } catch {
        alert('No se pudo actualizar el estado. Probá de nuevo.');
      } finally {
        setAdvancingId(null);
      }
      return;
    }
    setConfirmingId(s.id);
    setConfirmingStatus(next);
  }

  async function confirmAdvance(id: string) {
    const name = driverName.trim();
    const status = confirmingStatus;
    if (!name || !status) return;
    localStorage.setItem(DRIVER_NAME_KEY, name);
    setAdvancingId(id);
    try {
      await sendStatus(id, status, name);
      if (status === 'entregado') {
        setShipments((prev) => (prev ? prev.filter((s) => s.id !== id) : prev));
      } else {
        setShipments((prev) => (prev ? prev.map((s) => (s.id === id ? { ...s, status } : s)) : prev));
      }
      setConfirmingId(null);
      setConfirmingStatus(null);
    } catch {
      alert('No se pudo actualizar el estado. Probá de nuevo.');
    } finally {
      setAdvancingId(null);
    }
  }

  async function markPaid(id: string) {
    setAdvancingId(id);
    try {
      const res = await fetch('/api/envios/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, paymentStatus: 'abonado' }),
      });
      if (!res.ok) throw new Error();
      setShipments((prev) => (prev ? prev.map((s) => (s.id === id ? { ...s, payment_status: 'abonado' } : s)) : prev));
    } catch {
      alert('No se pudo marcar como cobrado. Probá de nuevo.');
    } finally {
      setAdvancingId(null);
    }
  }

  function openTrackingForm(s: Shipment) {
    setTrackingFormId(s.id);
    setTrackingTransportista(s.transportista || '');
    setTrackingNumero(s.numeros_seguimiento.join(', '));
    setTrackingPrecio(s.precio_asegurado != null ? String(s.precio_asegurado) : '');
  }

  async function saveTracking(id: string) {
    setSavingTracking(true);
    try {
      const res = await fetch('/api/envios/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          transportista: trackingTransportista.trim() || undefined,
          numerosSeguimiento: trackingNumero.trim() || undefined,
          precioAsegurado: trackingPrecio.trim() ? Number(trackingPrecio) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setShipments((prev) =>
        prev
          ? prev.map((s) =>
              s.id === id
                ? {
                    ...s,
                    transportista: trackingTransportista.trim() || null,
                    numeros_seguimiento: parseTrackingNumbers(trackingNumero),
                    precio_asegurado: trackingPrecio.trim() ? Number(trackingPrecio) : null,
                  }
                : s
            )
          : prev
      );
      setTrackingFormId(null);
    } catch {
      alert('No se pudo guardar. Probá de nuevo.');
    } finally {
      setSavingTracking(false);
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
          <>
            <button
              onClick={subscribe}
              className="w-full mb-2 flex items-center justify-center gap-2 rounded-xl2 py-4 text-base font-semibold text-white bg-amber-500 hover:bg-amber-400 shadow-card transition-colors"
            >
              <BellOff className="h-5 w-5" /> Activar avisos de nuevos envíos
            </button>
            <p className="mb-4 text-xs text-white/40">
              Para que no se corten solos: en el navegador del celular, agregá esta página a la
              pantalla de inicio (menú ⋮ o compartir → &quot;Agregar a pantalla de inicio&quot;) y
              abrila desde ahí.
            </p>
          </>
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

        <div className="flex flex-col gap-5">
          {shipments?.map((s) => {
            const retrasado = isRetrasado({
              status: s.status,
              created_at: s.created_at,
              estimated_delivery_date: s.estimated_delivery_date,
            });
            const firstTitle = s.items[0]?.title || 'Producto';
            const extra = s.items.length > 1 ? ` + ${s.items.length - 1} más` : '';

            const next = NEXT_DRIVER_STATUS[s.status];
            const isManual = s.ml_order_id < 0;
            const hasTracking = Boolean(s.transportista || s.numeros_seguimiento.length > 0 || s.precio_asegurado != null);

            return (
              <div key={s.id} className="rounded-xl2 bg-steel-900 border border-steel-800 p-6 shadow-card">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="rounded-full bg-steel-800 px-3.5 py-1.5 text-sm font-bold uppercase text-white/70">
                    {STATUS_LABELS[s.status]}
                  </span>
                  {retrasado && (
                    <span className="rounded-full bg-red-600 px-3.5 py-1.5 text-sm font-bold uppercase">
                      Retrasado
                    </span>
                  )}
                  <span className={`rounded-full px-3.5 py-1.5 text-sm font-bold uppercase ${
                    s.payment_status === 'abonado' ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}>
                    {PAYMENT_STATUS_LABELS[s.payment_status]}
                  </span>
                </div>
                <p className="font-display text-xl font-bold">{firstTitle}{extra}</p>
                {s.total != null && <p className="text-base text-white/50">${formatPrice(s.total)}</p>}

                <div className="mt-4 flex items-start gap-2 text-base">
                  {s.destino_tipo === 'domicilio' ? (
                    <Home className="h-5 w-5 mt-0.5 shrink-0 text-amber-400" />
                  ) : (
                    <Package className="h-5 w-5 mt-0.5 shrink-0 text-amber-400" />
                  )}
                  <span className="text-white/80">
                    {s.destino_tipo === 'domicilio' ? 'Entregar en domicilio' : 'Llevar a sucursal'}
                    {s.destino_detalle ? ` — ${s.destino_detalle}` : ''}
                  </span>
                </div>

                {s.buyer_nickname && (
                  <p className="mt-1.5 text-sm text-white/40">Comprador: {s.buyer_nickname}</p>
                )}

                {isManual && (
                  <div className="mt-3 rounded-lg bg-steel-950/60 border border-steel-800 p-3">
                    {hasTracking && trackingFormId !== s.id ? (
                      <div className="text-sm text-white/70">
                        {s.transportista && <p className="font-semibold text-white/90">{s.transportista}</p>}
                        {s.numeros_seguimiento.length > 0 && <p>Seguimiento: {s.numeros_seguimiento.join(', ')}</p>}
                        {s.precio_asegurado != null && <p>Asegurado: ${formatPrice(s.precio_asegurado)}</p>}
                        {getTrackingUrl(s.transportista) && (
                          <a
                            href={getTrackingUrl(s.transportista)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 underline"
                          >
                            Ver estado →
                          </a>
                        )}
                      </div>
                    ) : null}

                    {trackingFormId === s.id ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Transportista"
                          value={trackingTransportista}
                          onChange={(e) => setTrackingTransportista(e.target.value)}
                          className="rounded-lg px-3 py-2 text-steel-900"
                        />
                        <input
                          type="text"
                          placeholder="Nº de seguimiento (si hay más de uno, separalos con coma)"
                          value={trackingNumero}
                          onChange={(e) => setTrackingNumero(e.target.value)}
                          className="rounded-lg px-3 py-2 text-steel-900"
                        />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Precio asegurado"
                          value={trackingPrecio}
                          onChange={(e) => setTrackingPrecio(e.target.value)}
                          className="rounded-lg px-3 py-2 text-steel-900"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveTracking(s.id)}
                            disabled={savingTracking}
                            className="flex-1 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 py-2 font-semibold text-white"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setTrackingFormId(null)}
                            className="rounded-lg bg-steel-800 hover:bg-steel-700 py-2 px-4 text-white/70"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => openTrackingForm(s)}
                        className="w-full rounded-lg border border-steel-700 text-white/70 hover:bg-steel-800 py-2 text-sm font-semibold"
                      >
                        {hasTracking ? 'Editar datos de envío' : '📮 Agregar datos de envío'}
                      </button>
                    )}
                  </div>
                )}

                {!isManual && hasTracking && (
                  <div className="mt-3 rounded-lg bg-steel-950/60 border border-steel-800 p-3 text-sm text-white/70">
                    {s.transportista && <p className="font-semibold text-white/90">{s.transportista}</p>}
                    {s.numeros_seguimiento.length > 0 && <p>Seguimiento: {s.numeros_seguimiento.join(', ')}</p>}
                    {getTrackingUrl(s.transportista) && (
                      <a
                        href={getTrackingUrl(s.transportista)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 underline"
                      >
                        Ver estado →
                      </a>
                    )}
                  </div>
                )}

                {confirmingId === s.id ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="rounded-lg px-3 py-2.5 text-base text-steel-900"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmAdvance(s.id)}
                        disabled={!driverName.trim() || advancingId === s.id}
                        className="flex-1 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 py-3 text-base font-semibold text-white"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => { setConfirmingId(null); setConfirmingStatus(null); }}
                        className="rounded-lg bg-steel-800 hover:bg-steel-700 py-3 px-4 text-base text-white/70"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : next === 'entregado' && s.payment_status !== 'abonado' ? (
                  <p className="mt-4 text-center text-sm text-amber-400">
                    Marcá el pago como cobrado antes de poder entregar
                  </p>
                ) : (
                  next && (
                    <button
                      onClick={() => advance(s)}
                      disabled={advancingId === s.id}
                      className="mt-4 w-full rounded-lg bg-steel-800 hover:bg-steel-700 disabled:opacity-50 py-3 text-base font-semibold text-white"
                    >
                      {DRIVER_ACTION_LABELS[next]}
                    </button>
                  )
                )}

                {s.payment_status === 'pendiente_pago' && (
                  <button
                    onClick={() => markPaid(s.id)}
                    disabled={advancingId === s.id}
                    className="mt-2.5 w-full rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500/10 disabled:opacity-50 py-3 text-base font-semibold"
                  >
                    💰 Marcar cobrado
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
