'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SupervisorPushButton from '@/components/preventas/SupervisorPushButton';
import { formatCuotasLine } from '@/lib/preventas';
import { formatPrice } from '@/lib/price';

type Preventa = {
  id: string;
  cliente_nombre: string;
  cliente_direccion: string;
  cliente_contacto: string | null;
  cliente_dni_cuit: string;
  cliente_ciudad: string;
  cliente_rubro: string | null;
  vendedor_nombre: string;
  cobrador_nombre: string;
  items: { sku: string; name: string; quantity: number; precioLista: number; precioOfrecido: number }[];
  cuotas_cantidad: number;
  cuotas_tipo: string;
  cuota_precio: number;
  interes_porcentaje: number | null;
  observaciones: string | null;
  cobrador_foto_url: string | null;
  cobrador_notas: string | null;
  cobrador_segunda_opinion_motivo: string | null;
  created_at: string;
};

// Alejandro (supervisor de cobradores, PIN 1 del roster de depósito) activa
// acá los avisos de escalada de 24/48hs, y además da el veredicto final
// cuando un cobrador le pide una segunda opinión sobre un cliente -- usa su
// código secreto de /deposito, misma tabla, mismo mecanismo.
export default function VentasSupervisorPage() {
  const [codeInput, setCodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authing, setAuthing] = useState(false);
  const [code, setCode] = useState('');
  const [authed, setAuthed] = useState(false);

  const [preventas, setPreventas] = useState<Preventa[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [confirmingRechazo, setConfirmingRechazo] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function load(c: string) {
    try {
      const res = await fetch('/api/ventas/supervisor/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: c }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPreventas(data.preventas);
    } catch {
      setPreventas([]);
    }
  }

  useEffect(() => {
    if (authed) load(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function confirmCode() {
    if (codeInput.trim().length < 4) return;
    setAuthing(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/deposito/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: 1, code: codeInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Código incorrecto.');
        return;
      }
      setCode(codeInput.trim());
      setAuthed(true);
    } catch {
      setAuthError('No se pudo validar. Probá de nuevo.');
    } finally {
      setAuthing(false);
    }
  }

  const selected = preventas?.find((p) => p.id === selectedId) || null;

  function selectPreventa(id: string) {
    setSelectedId(id);
    setMotivoRechazo('');
    setConfirmingRechazo(false);
    setMessage(null);
  }

  async function review(decision: 'aprobar' | 'rechazar') {
    if (!selected) return;
    if (decision === 'rechazar' && !motivoRechazo.trim()) {
      setMessage('El motivo de rechazo es obligatorio.');
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch('/api/ventas/supervisor/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          preventaId: selected.id,
          decision,
          motivoRechazo: decision === 'rechazar' ? motivoRechazo.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'No se pudo guardar.');
        return;
      }
      setSelectedId(null);
      await load(code);
    } catch {
      setMessage('No se pudo guardar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-steel-900">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-steel-900">Supervisor</h1>
        </div>

        {!authed ? (
          <div className="rounded-xl2 bg-white border border-steel-200 shadow-card p-6">
            <p className="text-sm text-steel-500 mb-1">
              Hola <span className="font-semibold text-steel-900">Alejandro</span>, ingresá tu código secreto
            </p>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmCode()}
              placeholder="Código"
              className="w-full rounded-lg border border-steel-200 px-3 py-3 text-steel-900 mb-3 mt-3"
              autoFocus
            />
            {authError && <p className="text-sm text-red-600 mb-3">{authError}</p>}
            <button
              onClick={confirmCode}
              disabled={authing || codeInput.trim().length < 4}
              className="rounded-lg bg-steel-800 hover:bg-steel-700 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white"
            >
              {authing ? 'Verificando…' : 'Entrar'}
            </button>
          </div>
        ) : selected ? (
          <div className="rounded-xl2 bg-white border border-steel-200 shadow-card p-4">
            <button onClick={() => setSelectedId(null)} className="text-xs text-steel-600 underline mb-3">
              ← Volver a la lista
            </button>
            <p className="font-display text-xl font-bold text-steel-900">{selected.cliente_nombre}</p>
            <p className="text-sm text-steel-500 mb-1">{selected.cliente_direccion} — {selected.cliente_ciudad}</p>
            <p className="text-sm text-steel-500 mb-1">DNI/CUIT: {selected.cliente_dni_cuit}</p>
            {selected.cliente_contacto && <p className="text-sm text-steel-500 mb-1">Tel: {selected.cliente_contacto}</p>}
            <p className="text-sm text-steel-500 mb-3">Vendedor: {selected.vendedor_nombre} · Cobrador: {selected.cobrador_nombre}</p>

            <div className="rounded-lg bg-steel-50 border border-steel-200 p-3 mb-3">
              {selected.items.map((i) => (
                <p key={i.sku} className="text-sm text-steel-800">
                  {i.quantity}x {i.name} — ${formatPrice(i.precioOfrecido)} c/u (lista ${formatPrice(i.precioLista)})
                </p>
              ))}
              <p className="text-sm text-steel-500 mt-2">
                {formatCuotasLine(selected.cuotas_cantidad, selected.cuotas_tipo, selected.cuota_precio, formatPrice)}
                {selected.interes_porcentaje ? ` — ${selected.interes_porcentaje}% interés` : ''}
              </p>
            </div>

            {selected.cobrador_segunda_opinion_motivo && (
              <div className="rounded-lg bg-steel-50 border border-warning-500 p-3 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-warning-600 mb-1">
                  Por qué {selected.cobrador_nombre} te pide una segunda opinión
                </p>
                <p className="text-sm text-steel-800">{selected.cobrador_segunda_opinion_motivo}</p>
              </div>
            )}
            {selected.cobrador_notas && (
              <p className="text-sm text-steel-600 mb-3">Notas del cobrador: {selected.cobrador_notas}</p>
            )}

            {selected.cobrador_foto_url ? (
              <a
                href={selected.cobrador_foto_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-4 text-sm font-semibold text-steel-600 underline"
              >
                Ver foto del local (la subió {selected.cobrador_nombre}) →
              </a>
            ) : (
              <p className="text-sm text-steel-400 mb-4">El cobrador no dejó foto.</p>
            )}

            {confirmingRechazo && (
              <textarea
                placeholder="Motivo del rechazo (obligatorio)"
                value={motivoRechazo}
                onChange={(e) => setMotivoRechazo(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-steel-200 px-3 py-2 text-steel-900 text-sm mb-3"
              />
            )}

            {message && <p className="text-sm text-red-600 mb-3">{message}</p>}

            <div className="flex gap-2">
              <button
                onClick={() => review('aprobar')}
                disabled={busy}
                className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-3 text-sm font-semibold text-white"
              >
                Aprobar
              </button>
              {confirmingRechazo ? (
                <button
                  onClick={() => review('rechazar')}
                  disabled={busy}
                  className="flex-1 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 py-3 text-sm font-semibold text-white"
                >
                  Confirmar rechazo
                </button>
              ) : (
                <button
                  onClick={() => setConfirmingRechazo(true)}
                  className="flex-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 py-3 text-sm font-semibold"
                >
                  Rechazar
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="rounded-xl2 bg-white border border-steel-200 shadow-card p-6">
              <p className="text-sm text-steel-500 mb-4">
                Te vamos a avisar si una preventa queda 24 o 48hs sin que el cobrador la resuelva, y cada
                vez que un cobrador te pida una segunda opinión.
              </p>
              <SupervisorPushButton code={code} />
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-steel-900 mb-3">Segunda opinión pedida</h2>
              {preventas === null && <p className="text-steel-500 text-sm">Cargando…</p>}
              {preventas && preventas.length === 0 && (
                <p className="text-steel-400 text-sm">No hay ninguna preventa esperando tu opinión.</p>
              )}
              <div className="flex flex-col gap-2">
                {preventas?.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectPreventa(p.id)}
                    className="text-left rounded-xl2 bg-white border border-steel-200 shadow-card p-4 hover:border-steel-600"
                  >
                    <p className="font-semibold text-steel-900">{p.cliente_nombre}</p>
                    <p className="text-xs text-steel-400">{p.cliente_direccion} — {p.cliente_ciudad}</p>
                    <p className="text-xs text-steel-500 mt-1">Cobrador: {p.cobrador_nombre}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
