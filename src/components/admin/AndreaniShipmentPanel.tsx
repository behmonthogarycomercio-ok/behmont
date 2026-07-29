'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Loader2, Download, RefreshCw } from 'lucide-react';

const DELIVERY_MODES = [
  { value: 'estándar', label: 'Estándar (a domicilio)' },
  { value: 'llega hoy', label: 'Llega hoy' },
  { value: 'sucursal', label: 'A sucursal' },
  { value: 'bigger', label: 'Bigger (bultos grandes)' },
];

type Sucursal = { codigo: string; descripcion: string; direccion: string; localidad: string };

export default function AndreaniShipmentPanel({
  orderId,
  postalCode,
  deliveryMode: initialDeliveryMode,
  trackingNumber: initialTrackingNumber,
  numeroInterno,
  lastError,
}: {
  orderId: string;
  postalCode: string;
  deliveryMode: string | null;
  trackingNumber: string | null;
  numeroInterno: string | null;
  lastError: string | null;
}) {
  const router = useRouter();
  const [deliveryMode, setDeliveryMode] = useState(initialDeliveryMode || 'estándar');
  const [peso, setPeso] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [profundidad, setProfundidad] = useState('');
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [codigoSucursal, setCodigoSucursal] = useState('');
  const [loadingSucursales, setLoadingSucursales] = useState(false);
  const [creating, setCreating] = useState(false);
  const [checkingTracking, setCheckingTracking] = useState(false);
  const [error, setError] = useState(lastError || '');
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || '');

  async function buscarSucursales() {
    if (!postalCode) {
      setError('El pedido no tiene código postal cargado');
      return;
    }
    setLoadingSucursales(true);
    setError('');
    const res = await fetch(`/api/admin/andreani/sucursales?cp=${encodeURIComponent(postalCode)}`);
    const data = await res.json();
    setLoadingSucursales(false);
    if (!res.ok) {
      setError(data.error || 'No se pudieron cargar las sucursales');
      return;
    }
    setSucursales(data.sucursales || []);
  }

  async function generarEnvio() {
    if (!peso || !ancho || !alto || !profundidad) {
      setError('Completá peso y las 3 medidas del paquete');
      return;
    }
    if (deliveryMode === 'sucursal' && !codigoSucursal) {
      setError('Elegí la sucursal de destino');
      return;
    }
    setCreating(true);
    setError('');
    const res = await fetch('/api/admin/andreani/crear-envio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        deliveryMode,
        codigoSucursal: deliveryMode === 'sucursal' ? codigoSucursal : undefined,
        paquete: {
          pesoKg: parseFloat(peso),
          anchoCm: parseFloat(ancho),
          altoCm: parseFloat(alto),
          profundidadCm: parseFloat(profundidad),
        },
      }),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) {
      setError(data.error || 'No se pudo generar el envío');
      return;
    }
    router.refresh();
  }

  async function buscarTracking() {
    setCheckingTracking(true);
    setError('');
    const res = await fetch('/api/admin/andreani/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    setCheckingTracking(false);
    if (!res.ok) {
      setError(data.error || 'No se pudo buscar el número de seguimiento');
      return;
    }
    if (data.trackingNumber) {
      setTrackingNumber(data.trackingNumber);
      router.refresh();
    } else {
      setError('Andreani todavía no procesó el envío — probá de nuevo en un rato');
    }
  }

  return (
    <div className="rounded-xl border border-plate-200 bg-plate-50 p-4 space-y-3">
      <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-steel-400 flex items-center gap-1.5">
        <Truck className="h-3.5 w-3.5" /> Envío Andreani
      </p>

      {trackingNumber ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm">
            <span className="text-steel-400">Seguimiento:</span>{' '}
            <span className="font-mono font-semibold text-steel-900">{trackingNumber}</span>
          </p>
          <a
            href={`/api/admin/andreani/etiqueta?orderId=${orderId}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800"
          >
            <Download className="h-3.5 w-3.5" /> Descargar etiqueta
          </a>
        </div>
      ) : numeroInterno ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-steel-600">Envío creado, esperando número de seguimiento de Andreani.</p>
          <button
            onClick={buscarTracking}
            disabled={checkingTracking}
            className="inline-flex items-center gap-1.5 rounded-lg border border-plate-300 px-3 py-1.5 text-xs font-semibold text-steel-700 hover:bg-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${checkingTracking ? 'animate-spin' : ''}`} />
            {checkingTracking ? 'Buscando...' : 'Buscar seguimiento'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-steel-500 mb-1">Modo de entrega</label>
              <select
                value={deliveryMode}
                onChange={(e) => setDeliveryMode(e.target.value)}
                className="w-full rounded-lg border border-plate-200 bg-white px-3 py-2 text-sm"
              >
                {DELIVERY_MODES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            {deliveryMode === 'sucursal' && (
              <div>
                <label className="block text-xs font-semibold text-steel-500 mb-1">Sucursal destino</label>
                {sucursales.length === 0 ? (
                  <button
                    onClick={buscarSucursales}
                    disabled={loadingSucursales}
                    className="w-full rounded-lg border border-plate-300 bg-white px-3 py-2 text-sm text-steel-600 hover:border-steel-400 disabled:opacity-50"
                  >
                    {loadingSucursales ? 'Buscando...' : `Buscar sucursales (CP ${postalCode || '—'})`}
                  </button>
                ) : (
                  <select
                    value={codigoSucursal}
                    onChange={(e) => setCodigoSucursal(e.target.value)}
                    className="w-full rounded-lg border border-plate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">Elegí una sucursal...</option>
                    {sucursales.map((s) => (
                      <option key={s.codigo} value={s.codigo}>{s.descripcion} — {s.direccion}</option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-steel-500 mb-1">Peso y medidas del paquete ya armado</p>
            <div className="grid grid-cols-4 gap-2">
              <input type="number" step="0.1" min="0" placeholder="Peso (kg)" value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="rounded-lg border border-plate-200 bg-white px-2.5 py-2 text-sm" />
              <input type="number" step="1" min="0" placeholder="Ancho (cm)" value={ancho}
                onChange={(e) => setAncho(e.target.value)}
                className="rounded-lg border border-plate-200 bg-white px-2.5 py-2 text-sm" />
              <input type="number" step="1" min="0" placeholder="Alto (cm)" value={alto}
                onChange={(e) => setAlto(e.target.value)}
                className="rounded-lg border border-plate-200 bg-white px-2.5 py-2 text-sm" />
              <input type="number" step="1" min="0" placeholder="Prof. (cm)" value={profundidad}
                onChange={(e) => setProfundidad(e.target.value)}
                className="rounded-lg border border-plate-200 bg-white px-2.5 py-2 text-sm" />
            </div>
          </div>

          <button
            onClick={generarEnvio}
            disabled={creating}
            className="inline-flex items-center gap-1.5 rounded-lg bg-steel-900 px-4 py-2 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
          >
            {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Truck className="h-3.5 w-3.5" />}
            {creating ? 'Generando...' : 'Generar envío Andreani'}
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
