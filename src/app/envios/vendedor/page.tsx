'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Home, Package, Plus, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/price';
import { isRetrasado, STATUS_LABELS, PAYMENT_STATUS_LABELS, type ShipmentStatus, type PaymentStatus } from '@/lib/envios';

type StaffName = 'lucas' | 'luz' | 'lito';
const STAFF_OPTIONS: { value: StaffName; label: string }[] = [
  { value: 'lucas', label: 'Lucas' },
  { value: 'luz', label: 'Luz' },
  { value: 'lito', label: 'Lito' },
];

type Shipment = {
  id: string;
  status: ShipmentStatus;
  payment_status: PaymentStatus;
  destino_tipo: 'domicilio' | 'sucursal_andreani' | 'otro';
  destino_detalle: string | null;
  buyer_nickname: string | null;
  items: { title: string; quantity: number }[];
  total: number | null;
  estimated_delivery_date: string | null;
  delivered_at: string | null;
  delivered_by: string | null;
  created_at: string;
};

const POLL_MS = 60000;

export default function VendedorEnviosPage() {
  const [shipments, setShipments] = useState<Shipment[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [addedBy, setAddedBy] = useState<StaffName>('lucas');
  const [productTitle, setProductTitle] = useState('');
  const [buyerNickname, setBuyerNickname] = useState('');
  const [destinoTipo, setDestinoTipo] = useState<'domicilio' | 'sucursal_andreani' | 'otro'>('domicilio');
  const [destinoDetalle, setDestinoDetalle] = useState('');
  const [dni, setDni] = useState('');
  const [contacto, setContacto] = useState('');
  const [email, setEmail] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('abonado');

  async function loadShipments() {
    try {
      const res = await fetch('/api/envios/list');
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

  async function submitManual(e: React.FormEvent) {
    e.preventDefault();
    if (!productTitle.trim()) return;
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/envios/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: productTitle.trim(),
          buyerNickname: buyerNickname.trim() || undefined,
          destinoTipo,
          destinoDetalle: destinoDetalle.trim() || undefined,
          addedBy,
          dni: dni.trim() || undefined,
          contacto: contacto.trim() || undefined,
          email: email.trim() || undefined,
          codigoPostal: codigoPostal.trim() || undefined,
          paymentStatus,
        }),
      });
      if (!res.ok) throw new Error();
      setProductTitle('');
      setBuyerNickname('');
      setDestinoDetalle('');
      setDni('');
      setContacto('');
      setEmail('');
      setCodigoPostal('');
      setPaymentStatus('abonado');
      setShowForm(false);
      loadShipments();
    } catch {
      setFormError('No se pudo guardar. Probá de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Estado de envíos</h1>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-5 flex items-center justify-center gap-2 rounded-xl2 py-4 text-base font-semibold text-white bg-amber-500 hover:bg-amber-400 shadow-card transition-colors"
          >
            <Plus className="h-5 w-5" /> Agregar venta por fuera de MercadoLibre
          </button>
        )}

        {showForm && (
          <form onSubmit={submitManual} className="mb-5 flex flex-col gap-3 rounded-xl2 bg-steel-900 border border-steel-800 p-4">
            <div>
              <p className="text-xs text-white/50 mb-1.5">¿Quién carga esto?</p>
              <div className="flex gap-2">
                {STAFF_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setAddedBy(s.value)}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                      addedBy === s.value ? 'bg-amber-500 text-white' : 'bg-steel-800 text-white/60'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Producto"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
              className="rounded-lg px-3 py-2 text-steel-900"
            />
            <input
              type="text"
              placeholder="Comprador (opcional)"
              value={buyerNickname}
              onChange={(e) => setBuyerNickname(e.target.value)}
              className="rounded-lg px-3 py-2 text-steel-900"
            />
            <select
              value={destinoTipo}
              onChange={(e) => setDestinoTipo(e.target.value as typeof destinoTipo)}
              className="rounded-lg px-3 py-2 text-steel-900"
            >
              <option value="domicilio">Domicilio</option>
              <option value="sucursal_andreani">Sucursal</option>
              <option value="otro">Otro</option>
            </select>
            <input
              type="text"
              placeholder="Dirección / detalle"
              value={destinoDetalle}
              onChange={(e) => setDestinoDetalle(e.target.value)}
              className="rounded-lg px-3 py-2 text-steel-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="rounded-lg px-3 py-2 text-steel-900"
              />
              <input
                type="text"
                placeholder="Contacto (teléfono)"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                className="rounded-lg px-3 py-2 text-steel-900"
              />
              <input
                type="text"
                placeholder="Código postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                className="rounded-lg px-3 py-2 text-steel-900"
              />
              <input
                type="email"
                placeholder="Email (opcional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg px-3 py-2 text-steel-900"
              />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1.5">¿Ya se abonó?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentStatus('abonado')}
                  className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                    paymentStatus === 'abonado' ? 'bg-emerald-600 text-white' : 'bg-steel-800 text-white/60'
                  }`}
                >
                  Abonado
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentStatus('pendiente_pago')}
                  className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                    paymentStatus === 'pendiente_pago' ? 'bg-amber-500 text-white' : 'bg-steel-800 text-white/60'
                  }`}
                >
                  Pendiente de abonar
                </button>
              </div>
            </div>
            {formError && <p className="text-sm text-red-400">{formError}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting || !productTitle.trim()}
                className="flex-1 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 py-2 font-semibold text-white"
              >
                {submitting ? 'Guardando…' : 'Agregar'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg bg-steel-800 hover:bg-steel-700 py-2 px-4 text-white/70"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {loadError && <p className="mb-4 text-sm text-red-400">No se pudo actualizar la lista. Reintentando…</p>}
        {shipments === null && <p className="text-white/60">Cargando…</p>}
        {shipments && shipments.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-white/50">
            <CheckCircle2 className="h-12 w-12" />
            <p>No hay envíos cargados todavía.</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
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
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-display text-base font-bold">{firstTitle}{extra}</p>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {retrasado && (
                      <span className="shrink-0 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase">Retrasado</span>
                    )}
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      s.status === 'entregado' ? 'bg-emerald-600' : 'bg-yellow-600'
                    }`}>
                      {STATUS_LABELS[s.status]}
                    </span>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      s.payment_status === 'abonado' ? 'bg-emerald-700' : 'bg-amber-600'
                    }`}>
                      {PAYMENT_STATUS_LABELS[s.payment_status]}
                    </span>
                  </div>
                </div>
                {s.total != null && <p className="text-sm text-white/50 mb-2">${formatPrice(s.total)}</p>}

                <div className="flex items-start gap-2 text-sm">
                  {s.destino_tipo === 'domicilio' ? (
                    <Home className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                  ) : (
                    <Package className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                  )}
                  <span className="text-white/80">
                    {s.destino_tipo === 'domicilio' ? 'Domicilio' : 'Sucursal'}
                    {s.destino_detalle ? ` — ${s.destino_detalle}` : ''}
                  </span>
                </div>

                {s.buyer_nickname && <p className="mt-1 text-xs text-white/40">Comprador: {s.buyer_nickname}</p>}
                {s.status === 'entregado' && s.delivered_by && (
                  <p className="mt-1 text-xs text-emerald-400">Entregado por {s.delivered_by}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
