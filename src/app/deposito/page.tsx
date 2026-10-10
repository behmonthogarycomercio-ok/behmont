'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { DEPOSITO_STAFF, canIngreso, type DepositoPin } from '@/lib/deposito';

type ZonaApi = { id: string; parent_id: string | null; tipo: string; codigo: string; nombre: string; active: boolean };
type LocationApi = { id: string; zona_id: string; quantity: number };
type ProductoApi = {
  id: string;
  sku: string;
  name: string;
  stock: number;
  active: boolean;
  product_locations: LocationApi[];
};

function zonaPath(zonaId: string, zonasById: Map<string, ZonaApi>): string {
  const parts: string[] = [];
  let current = zonasById.get(zonaId);
  while (current) {
    parts.unshift(current.nombre);
    current = current.parent_id ? zonasById.get(current.parent_id) : undefined;
  }
  return parts.join(' › ') || 'Zona eliminada';
}

export default function DepositoPage() {
  const [pendingPin, setPendingPin] = useState<DepositoPin | null>(null); // eligió nombre, falta validar código
  const [codeInput, setCodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authing, setAuthing] = useState(false);

  const [pin, setPin] = useState<DepositoPin | null>(null); // ya validado
  const [code, setCode] = useState('');

  const [products, setProducts] = useState<ProductoApi[] | null>(null);
  const [zonas, setZonas] = useState<ZonaApi[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [q, setQ] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [retirarQty, setRetirarQty] = useState<Record<string, string>>({});
  const [retirarSinUbicacionQty, setRetirarSinUbicacionQty] = useState('1');
  const [ingresoZonaId, setIngresoZonaId] = useState('');
  const [ingresoQty, setIngresoQty] = useState('1');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch('/api/deposito/productos');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data.products);
      setZonas(data.zonas);
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }

  useEffect(() => {
    if (pin !== null) load();
  }, [pin]);

  async function confirmCode() {
    if (pendingPin === null || codeInput.trim().length < 4) return;
    setAuthing(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/deposito/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pendingPin, code: codeInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Código incorrecto.');
        return;
      }
      setPin(pendingPin);
      setCode(codeInput.trim());
      setCodeInput('');
    } catch {
      setAuthError('No se pudo validar. Probá de nuevo.');
    } finally {
      setAuthing(false);
    }
  }

  function logout() {
    setPin(null);
    setPendingPin(null);
    setCode('');
    setCodeInput('');
    setAuthError(null);
    setSelectedId(null);
  }

  const zonasById = useMemo(() => new Map(zonas.map((z) => [z.id, z])), [zonas]);
  const hasChildren = useMemo(() => {
    const set = new Set<string>();
    zonas.forEach((z) => z.parent_id && set.add(z.parent_id));
    return set;
  }, [zonas]);
  const assignableZonas = useMemo(
    () => zonas.filter((z) => z.active && !hasChildren.has(z.id)),
    [zonas, hasChildren]
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    const term = q.trim().toLowerCase();
    if (!term) return products.slice(0, 30);
    return products.filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term));
  }, [q, products]);

  const selected = products?.find((p) => p.id === selectedId) || null;

  async function retirar(locationId: string, zonaId: string) {
    if (pin === null || !selected) return;
    const quantity = Number(retirarQty[locationId] || '1');
    if (!quantity || quantity <= 0) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch('/api/deposito/retirar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, code, productId: selected.id, zonaId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'No se pudo retirar');
        return;
      }
      setMessage(`Retirado ${quantity}. Quedan ${data.newQuantity} en esa zona.`);
      await load();
    } catch {
      setMessage('No se pudo retirar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  async function retirarSinUbicacion() {
    if (pin === null || !selected) return;
    const quantity = Number(retirarSinUbicacionQty || '1');
    if (!quantity || quantity <= 0) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch('/api/deposito/retirar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, code, productId: selected.id, quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'No se pudo retirar');
        return;
      }
      setMessage(`Retirado ${quantity}. Stock general: ${data.newStock}.`);
      setRetirarSinUbicacionQty('1');
      await load();
    } catch {
      setMessage('No se pudo retirar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  async function ingresar() {
    if (pin === null || !selected || !ingresoZonaId) return;
    const quantity = Number(ingresoQty || '0');
    if (!quantity || quantity <= 0) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch('/api/deposito/ingreso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, code, productId: selected.id, zonaId: ingresoZonaId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'No se pudo registrar el ingreso');
        return;
      }
      setMessage(`Ingreso registrado. Ahora hay ${data.newQuantity} en esa zona.`);
      setIngresoZonaId('');
      setIngresoQty('1');
      await load();
    } catch {
      setMessage('No se pudo registrar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Depósito</h1>
        </div>

        {pin === null && pendingPin === null && (
          <div>
            <p className="text-sm text-white/60 mb-3">¿Quién sos?</p>
            <div className="grid grid-cols-2 gap-3">
              {DEPOSITO_STAFF.map((s) => (
                <button
                  key={s.pin}
                  onClick={() => setPendingPin(s.pin)}
                  className="rounded-xl2 bg-steel-900 border border-steel-800 py-6 text-lg font-bold hover:border-amber-500 hover:text-amber-400"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {pin === null && pendingPin !== null && (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6">
            <p className="text-sm text-white/60 mb-1">
              Hola <span className="font-semibold text-white">{DEPOSITO_STAFF.find((s) => s.pin === pendingPin)?.name}</span>,
              ingresá tu código secreto
            </p>
            <p className="text-xs text-white/40 mb-3">Si no lo tenés, pedíselo al admin.</p>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmCode()}
              placeholder="Código"
              className="w-full rounded-lg px-3 py-3 text-steel-900 mb-3"
              autoFocus
            />
            {authError && <p className="text-sm text-red-400 mb-3">{authError}</p>}
            <div className="flex gap-2">
              <button
                onClick={confirmCode}
                disabled={authing || codeInput.trim().length < 4}
                className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white"
              >
                {authing ? 'Verificando…' : 'Entrar'}
              </button>
              <button
                onClick={() => {
                  setPendingPin(null);
                  setCodeInput('');
                  setAuthError(null);
                }}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white/70"
              >
                Volver
              </button>
            </div>
          </div>
        )}

        {pin !== null && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-white/60">
                Entraste como <span className="font-semibold text-white">{DEPOSITO_STAFF.find((s) => s.pin === pin)?.name}</span>
              </p>
              <button onClick={logout} className="text-xs text-amber-400 underline">
                Cambiar
              </button>
            </div>

            {loadError && <p className="mb-4 text-sm text-red-400">No se pudo cargar el catálogo. Reintentando…</p>}
            {products === null && !loadError && <p className="text-white/60">Cargando…</p>}

            {products !== null && (
              <>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSelectedId(null);
                  }}
                  placeholder="Buscar por código o nombre..."
                  className="w-full rounded-lg px-3 py-3 text-steel-900 mb-3"
                />

                {!selected ? (
                  <div className="flex flex-col gap-2">
                    {filtered.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className="text-left rounded-xl2 bg-steel-900 border border-steel-800 p-4 hover:border-amber-500"
                      >
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-white/40 font-mono">{p.sku} — stock {p.stock}</p>
                      </button>
                    ))}
                    {filtered.length === 0 && <p className="text-white/50 text-sm">Sin resultados.</p>}
                  </div>
                ) : (
                  <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
                    <button onClick={() => setSelectedId(null)} className="text-xs text-amber-400 underline mb-3">
                      ← Volver a la búsqueda
                    </button>
                    <p className="font-display text-xl font-bold">{selected.name}</p>
                    <p className="text-xs text-white/40 font-mono mb-4">{selected.sku} — stock total {selected.stock}</p>

                    <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Ubicaciones</p>
                    <div className="flex flex-col gap-2 mb-4">
                      {selected.product_locations.map((loc) => (
                        <div key={loc.id} className="flex items-center gap-2 rounded-lg bg-steel-800 px-3 py-2">
                          <span className="flex-1 text-sm">{zonaPath(loc.zona_id, zonasById)}</span>
                          <span className="text-sm text-white/60">{loc.quantity} u.</span>
                          <input
                            type="number"
                            min={1}
                            value={retirarQty[loc.id] ?? '1'}
                            onChange={(e) => setRetirarQty((prev) => ({ ...prev, [loc.id]: e.target.value }))}
                            className="w-16 rounded px-2 py-1 text-steel-900 text-sm"
                          />
                          <button
                            onClick={() => retirar(loc.id, loc.zona_id)}
                            disabled={busy}
                            className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Retirar
                          </button>
                        </div>
                      ))}
                      {selected.product_locations.length === 0 && (
                        <div className="rounded-lg bg-steel-800 px-3 py-2">
                          <p className="text-sm text-white/40 mb-2">Sin ubicaciones asignadas todavía.</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={1}
                              value={retirarSinUbicacionQty}
                              onChange={(e) => setRetirarSinUbicacionQty(e.target.value)}
                              className="w-16 rounded px-2 py-1 text-steel-900 text-sm"
                            />
                            <button
                              onClick={retirarSinUbicacion}
                              disabled={busy}
                              className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              Retirar del stock general
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {canIngreso(pin) && (
                      <div className="border-t border-steel-800 pt-4">
                        <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Ingresó mercadería</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={ingresoZonaId}
                            onChange={(e) => setIngresoZonaId(e.target.value)}
                            className="rounded-lg px-2 py-2 text-steel-900 text-sm flex-1 min-w-[180px]"
                          >
                            <option value="">Elegir zona...</option>
                            {assignableZonas.map((z) => (
                              <option key={z.id} value={z.id}>
                                {zonaPath(z.id, zonasById)}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min={1}
                            value={ingresoQty}
                            onChange={(e) => setIngresoQty(e.target.value)}
                            className="w-20 rounded px-2 py-2 text-steel-900 text-sm"
                          />
                          <button
                            onClick={ingresar}
                            disabled={busy || !ingresoZonaId}
                            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-3 py-2 text-sm font-semibold text-white"
                          >
                            Ingresar
                          </button>
                        </div>
                      </div>
                    )}

                    {message && <p className="mt-3 text-sm text-amber-300">{message}</p>}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
