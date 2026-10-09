'use client';

import { useMemo, useState } from 'react';
import type { DepositoPin } from '@/lib/deposito';

type ZonaApi = { id: string; parent_id: string | null; tipo: string; codigo: string; nombre: string; active: boolean };
type LocationApi = { id: string; zona_id: string; quantity: number };
type ProductoApi = { id: string; sku: string; name: string; stock: number; product_locations?: LocationApi[] | null };

function zonaPath(zonaId: string, zonasById: Map<string, ZonaApi>): string {
  const parts: string[] = [];
  let current = zonasById.get(zonaId);
  while (current) {
    parts.unshift(current.nombre);
    current = current.parent_id ? zonasById.get(current.parent_id) : undefined;
  }
  return parts.join(' › ') || 'Zona eliminada';
}

export default function UbicacionesGestionClient({
  pin,
  code,
  products,
  zonas,
  onChanged,
}: {
  pin: DepositoPin;
  code: string;
  products: ProductoApi[];
  zonas: ZonaApi[];
  onChanged: () => void;
}) {
  const [q, setQ] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newZonaId, setNewZonaId] = useState('');
  const [newQuantity, setNewQuantity] = useState('1');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const zonasById = useMemo(() => new Map(zonas.map((z) => [z.id, z])), [zonas]);
  // Solo tiene sentido ubicar stock en zonas "hoja" (división), o en un área
  // sin góndolas debajo (ej. Salón) -- igual que en /admin/depositos.
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
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)).slice(0, 15);
  }, [q, products]);

  const selected = products.find((p) => p.id === selectedId) || null;
  const selectedLocations = selected?.product_locations || [];

  async function call(body: object, endpoint: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, code, ...body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo guardar');
        return false;
      }
      onChanged();
      return true;
    } catch {
      setError('No se pudo guardar. Probá de nuevo.');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function addLocation() {
    if (!selected || !newZonaId) return;
    const ok = await call(
      { productId: selected.id, zonaId: newZonaId, quantity: Number(newQuantity) || 0 },
      '/api/deposito/ubicaciones'
    );
    if (ok) {
      setNewZonaId('');
      setNewQuantity('1');
    }
  }

  async function updateQuantity(locationId: string, quantity: string) {
    await call({ id: locationId, quantity: Number(quantity) || 0 }, '/api/deposito/ubicaciones');
  }

  async function removeLocation(locationId: string) {
    await call({ id: locationId }, '/api/deposito/ubicaciones/delete');
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Ubicación de productos</p>
      <input
        type="text"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setSelectedId(null);
        }}
        placeholder="Buscar producto por código o nombre..."
        className="w-full max-w-md rounded-lg px-3 py-2 text-sm text-steel-900 mb-2"
      />
      {!selected && filtered.length > 0 && (
        <ul className="flex flex-col gap-1 mb-3">
          {filtered.map((p) => (
            <li key={p.id}>
              <button onClick={() => setSelectedId(p.id)} className="text-left text-sm text-white/80 hover:text-amber-400">
                {p.name} <span className="text-white/40 font-mono text-xs">({p.sku}) — stock {p.stock}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="rounded-lg bg-steel-800 p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-xs text-white/40 font-mono">{selected.sku} — stock total {selected.stock}</p>
            </div>
            <button onClick={() => setSelectedId(null)} className="text-xs text-amber-400 underline shrink-0">
              Cambiar producto
            </button>
          </div>

          <ul className="space-y-2 mb-3">
            {selectedLocations.map((loc) => (
              <li key={loc.id} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
                <span className="flex-1 text-sm text-white/80">{zonaPath(loc.zona_id, zonasById)}</span>
                <input
                  type="number"
                  min={0}
                  defaultValue={loc.quantity}
                  onBlur={(e) => {
                    if (Number(e.target.value) !== loc.quantity) updateQuantity(loc.id, e.target.value);
                  }}
                  className="w-16 rounded border border-white/10 bg-steel-900 px-2 py-1 text-sm text-white"
                />
                <button
                  onClick={() => removeLocation(loc.id)}
                  disabled={busy}
                  className="text-xs text-red-400 underline disabled:opacity-50"
                >
                  Quitar
                </button>
              </li>
            ))}
            {selectedLocations.length === 0 && (
              <li className="text-sm text-white/40">Sin ubicaciones asignadas todavía.</li>
            )}
          </ul>

          <div className="flex flex-wrap items-end gap-2 rounded-lg border border-dashed border-white/20 p-3">
            <div>
              <label className="block text-[11px] font-semibold text-white/50">Zona</label>
              <select
                value={newZonaId}
                onChange={(e) => setNewZonaId(e.target.value)}
                className="w-52 rounded border border-white/10 bg-steel-900 px-2 py-1 text-sm text-white"
              >
                <option value="">Elegir...</option>
                {assignableZonas.map((z) => (
                  <option key={z.id} value={z.id}>
                    {zonaPath(z.id, zonasById)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-white/50">Cantidad</label>
              <input
                type="number"
                min={0}
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="w-16 rounded border border-white/10 bg-steel-900 px-2 py-1 text-sm text-white"
              />
            </div>
            <button
              onClick={addLocation}
              disabled={busy || !newZonaId}
              className="rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
            >
              + Agregar ubicación
            </button>
          </div>
          {error && <p className="mt-2 text-xs font-medium text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
