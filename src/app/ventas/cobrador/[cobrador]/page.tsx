'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { COBRADORES, formatCuotasLine, type CobradorPin } from '@/lib/preventas';
import { formatPrice } from '@/lib/price';
import CobradorPushButton from '@/components/preventas/CobradorPushButton';

type Preventa = {
  id: string;
  cliente_nombre: string;
  cliente_direccion: string;
  cliente_contacto: string | null;
  cliente_dni_cuit: string;
  cliente_ciudad: string;
  cliente_rubro: string | null;
  cliente_estado: string;
  vendedor_nombre: string;
  items: { sku: string; name: string; quantity: number; precioLista: number; precioOfrecido: number }[];
  cuotas_cantidad: number;
  cuotas_tipo: string;
  cuota_precio: number;
  interes_porcentaje: number | null;
  observaciones: string | null;
  status: string;
  cobrador_foto_url: string | null;
  cobrador_motivo_rechazo: string | null;
  cobrador_segunda_opinion_motivo: string | null;
  supervisor_motivo_rechazo: string | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  pendiente_cobrador: 'Pendiente',
  pendiente_supervisor: 'Esperando a Alejandro',
  aprobada: 'Aprobada',
  rechazada_cobrador: 'Rechazada',
  rechazada_supervisor: 'Rechazada (Alejandro)',
};

const STATUS_COLORS: Record<string, string> = {
  aprobada: 'bg-emerald-600',
  pendiente_supervisor: 'bg-warning-600',
  rechazada_cobrador: 'bg-red-600',
  rechazada_supervisor: 'bg-red-600',
};

export default function CobradorPage() {
  const params = useParams();
  const slug = String(params.cobrador || '').toLowerCase();
  const cobrador = COBRADORES.find((c) => c.name.toLowerCase() === slug);

  const [codeInput, setCodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authing, setAuthing] = useState(false);
  const [code, setCode] = useState('');
  const [authed, setAuthed] = useState(false);

  const [preventas, setPreventas] = useState<Preventa[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [foto, setFoto] = useState<File | null>(null);
  const [notas, setNotas] = useState('');
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [motivoSegundaOpinion, setMotivoSegundaOpinion] = useState('');
  const [confirmingRechazo, setConfirmingRechazo] = useState(false);
  const [confirmingSegundaOpinion, setConfirmingSegundaOpinion] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    if (!cobrador) return;
    try {
      const res = await fetch('/api/ventas/cobrador/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: cobrador.pin, code }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPreventas(data.preventas);
    } catch {
      setPreventas([]);
    }
  }

  useEffect(() => {
    if (authed) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function confirmCode() {
    if (!cobrador || codeInput.trim().length < 4) return;
    setAuthing(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/ventas/cobrador/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: cobrador.pin, code: codeInput.trim() }),
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

  const pendientes = useMemo(() => preventas?.filter((p) => p.status === 'pendiente_cobrador') || [], [preventas]);
  const revisadas = useMemo(() => preventas?.filter((p) => p.status !== 'pendiente_cobrador') || [], [preventas]);
  const selected = preventas?.find((p) => p.id === selectedId) || null;

  function selectPreventa(id: string) {
    setSelectedId(id);
    setFoto(null);
    setNotas('');
    setMotivoRechazo('');
    setMotivoSegundaOpinion('');
    setConfirmingRechazo(false);
    setConfirmingSegundaOpinion(false);
    setMessage(null);
  }

  async function review(decision: 'aprobar' | 'rechazar' | 'segunda_opinion') {
    if (!cobrador || !selected) return;
    const fotoRequerida = selected.cliente_estado === 'nuevo';
    if (fotoRequerida && !foto) {
      setMessage('Subí una foto del papel -- es obligatoria para clientes nuevos.');
      return;
    }
    if (decision === 'rechazar' && !motivoRechazo.trim()) {
      setMessage('El motivo de rechazo es obligatorio.');
      return;
    }
    if (decision === 'segunda_opinion' && !motivoSegundaOpinion.trim()) {
      setMessage('Contanos qué te genera dudas para avisarle a Alejandro.');
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.set('pin', String(cobrador.pin));
      fd.set('code', code);
      fd.set('preventaId', selected.id);
      fd.set('decision', decision);
      fd.set('notas', notas);
      fd.set('motivoRechazo', motivoRechazo);
      fd.set('motivoSegundaOpinion', motivoSegundaOpinion);
      if (foto) fd.set('foto', foto);
      const res = await fetch('/api/ventas/cobrador/review', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'No se pudo guardar.');
        return;
      }
      setSelectedId(null);
      await load();
    } catch {
      setMessage('No se pudo guardar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  if (!cobrador) {
    return (
      <main className="min-h-screen bg-white px-4 py-8 text-steel-900">
        <p className="text-steel-500">Página no encontrada.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-steel-900">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-steel-900">Cobrador</h1>
        </div>

        {!authed ? (
          <div className="rounded-xl2 bg-white border border-steel-200 shadow-card p-6">
            <p className="text-sm text-steel-500 mb-1">
              Hola <span className="font-semibold text-steel-900">{cobrador.name}</span>, ingresá tu código secreto
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
            {selected.cliente_rubro && <p className="text-sm text-steel-500 mb-1">Rubro: {selected.cliente_rubro}</p>}
            <p className="text-sm text-steel-500 mb-3">Cargada por {selected.vendedor_nombre}</p>

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

            {selected.observaciones && (
              <p className="text-sm text-warning-600 mb-3">Obs. del vendedor: {selected.observaciones}</p>
            )}

            {selected.status === 'pendiente_cobrador' ? (
              <>
                {selected.cliente_estado === 'nuevo' ? (
                  <>
                    <p className="text-xs uppercase tracking-wide text-steel-400 mb-2">Foto del papel (obligatoria -- cliente nuevo)</p>
                    <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-steel-300 px-4 py-2 text-sm text-steel-600 hover:border-steel-600 hover:text-steel-700 mb-3">
                      {foto ? foto.name : 'Elegir foto'}
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => setFoto(e.target.files?.[0] || null)}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-wide text-steel-400 mb-2">
                      Foto del papel (opcional -- cliente {selected.cliente_estado})
                    </p>
                    <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-steel-300 px-4 py-2 text-sm text-steel-600 hover:border-steel-600 hover:text-steel-700 mb-3">
                      {foto ? foto.name : 'Elegir foto (opcional)'}
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => setFoto(e.target.files?.[0] || null)}
                      />
                    </label>
                  </>
                )}

                <textarea
                  placeholder="Notas (opcional)"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-steel-200 px-3 py-2 text-steel-900 text-sm mb-3"
                />

                {confirmingRechazo && (
                  <textarea
                    placeholder="Motivo del rechazo (obligatorio)"
                    value={motivoRechazo}
                    onChange={(e) => setMotivoRechazo(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-steel-200 px-3 py-2 text-steel-900 text-sm mb-3"
                  />
                )}

                {confirmingSegundaOpinion && (
                  <textarea
                    placeholder="¿Qué te genera dudas? (obligatorio -- se lo manda a Alejandro)"
                    value={motivoSegundaOpinion}
                    onChange={(e) => setMotivoSegundaOpinion(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-steel-200 px-3 py-2 text-steel-900 text-sm mb-3"
                  />
                )}

                {message && <p className="text-sm text-red-600 mb-3">{message}</p>}

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => review('aprobar')}
                    disabled={busy || (selected.cliente_estado === 'nuevo' && !foto)}
                    className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-3 text-sm font-semibold text-white"
                  >
                    Aprobar
                  </button>
                  {confirmingRechazo ? (
                    <button
                      onClick={() => review('rechazar')}
                      disabled={busy || (selected.cliente_estado === 'nuevo' && !foto)}
                      className="flex-1 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 py-3 text-sm font-semibold text-white"
                    >
                      Confirmar rechazo
                    </button>
                  ) : (
                    <button
                      onClick={() => { setConfirmingRechazo(true); setConfirmingSegundaOpinion(false); }}
                      className="flex-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 py-3 text-sm font-semibold"
                    >
                      Rechazar
                    </button>
                  )}
                </div>

                {confirmingSegundaOpinion ? (
                  <button
                    onClick={() => review('segunda_opinion')}
                    disabled={busy || (selected.cliente_estado === 'nuevo' && !foto)}
                    className="w-full rounded-lg bg-warning-600 hover:opacity-90 disabled:opacity-50 py-3 text-sm font-semibold text-white"
                  >
                    Confirmar y avisarle a Alejandro
                  </button>
                ) : (
                  <button
                    onClick={() => { setConfirmingSegundaOpinion(true); setConfirmingRechazo(false); }}
                    className="w-full rounded-lg border border-steel-400 text-steel-700 hover:bg-steel-50 py-3 text-sm font-semibold"
                  >
                    🤔 Pedir segunda opinión a Alejandro
                  </button>
                )}
              </>
            ) : (
              <div className="text-sm text-steel-500">
                <p className="font-semibold text-steel-900 mb-2">{STATUS_LABELS[selected.status]}</p>
                {selected.cobrador_foto_url && (
                  <a href={selected.cobrador_foto_url} target="_blank" rel="noopener noreferrer" className="text-steel-600 underline">
                    Ver foto subida
                  </a>
                )}
                {selected.cobrador_segunda_opinion_motivo && (
                  <p className="mt-2 text-warning-600">Le pediste a Alejandro: {selected.cobrador_segunda_opinion_motivo}</p>
                )}
                {selected.cobrador_motivo_rechazo && <p className="mt-2 text-red-600">Motivo: {selected.cobrador_motivo_rechazo}</p>}
                {selected.supervisor_motivo_rechazo && <p className="mt-2 text-red-600">Motivo (Alejandro): {selected.supervisor_motivo_rechazo}</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <CobradorPushButton pin={cobrador.pin as CobradorPin} code={code} />
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-steel-900 mb-3">Pendientes</h2>
              {preventas === null && <p className="text-steel-500 text-sm">Cargando…</p>}
              {pendientes.length === 0 && preventas !== null && <p className="text-steel-400 text-sm">No tenés preventas pendientes.</p>}
              <div className="flex flex-col gap-2">
                {pendientes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectPreventa(p.id)}
                    className="text-left rounded-xl2 bg-white border border-steel-200 shadow-card p-4 hover:border-steel-600"
                  >
                    <p className="font-semibold text-steel-900">{p.cliente_nombre}</p>
                    <p className="text-xs text-steel-400">{p.cliente_direccion} — {p.cliente_ciudad}</p>
                  </button>
                ))}
              </div>
            </div>

            {revisadas.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-bold text-steel-900 mb-3">Revisadas</h2>
                <div className="flex flex-col gap-2">
                  {revisadas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => selectPreventa(p.id)}
                      className="text-left rounded-xl2 bg-white border border-steel-200 shadow-card p-4 hover:border-steel-600 flex items-center justify-between gap-2"
                    >
                      <div>
                        <p className="font-semibold text-steel-900">{p.cliente_nombre}</p>
                        <p className="text-xs text-steel-400">{p.cliente_ciudad}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${STATUS_COLORS[p.status] || 'bg-steel-600'}`}>
                        {STATUS_LABELS[p.status]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
