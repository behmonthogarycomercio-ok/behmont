'use client';

import { useMemo, useState, useTransition } from 'react';
import { upsertProductLocation, deleteProductLocation } from '@/lib/actions';
import DeleteButton from './DeleteButton';
import type { Zona, ProductoDeposito, ProductLocationRow } from '@/app/admin/depositos/page';

function zonaPath(zonaId: string, zonasById: Map<string, Zona>): string {
  const parts: string[] = [];
  let current = zonasById.get(zonaId);
  while (current) {
    parts.unshift(current.nombre);
    current = current.parent_id ? zonasById.get(current.parent_id) : undefined;
  }
  return parts.join(' › ') || 'Zona eliminada';
}

export default function ProductLocationsManager({
  products,
  zonas,
  locations,
}: {
  products: ProductoDeposito[];
  zonas: Zona[];
  locations: ProductLocationRow[];
}) {
  const [q, setQ] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newZonaId, setNewZonaId] = useState('');
  const [newQuantity, setNewQuantity] = useState('1');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const zonasById = useMemo(() => new Map(zonas.map((z) => [z.id, z])), [zonas]);
  // Solo tiene sentido ubicar stock en zonas "hoja" (división), o en un
  // área sin góndolas debajo (ej. Salón) -- para no permitir cargar
  // cantidad en un nodo intermedio como "Góndola 1" entero.
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
    if (!term) return products.slice(0, 30);
    return products.filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term));
  }, [q, products]);

  const selected = products.find((p) => p.id === selectedId) || null;
  const selectedLocations = locations.filter((l) => l.product_id === selectedId);

  function addLocation() {
    if (!selectedId || !newZonaId) return;
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set('product_id', selectedId);
      fd.set('zona_id', newZonaId);
      fd.set('quantity', newQuantity || '0');
      const result = await upsertProductLocation(fd);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setNewZonaId('');
      setNewQuantity('1');
    });
  }

  function updateQuantity(locationId: string, quantity: string) {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set('id', locationId);
      fd.set('quantity', quantity || '0');
      const result = await upsertProductLocation(fd);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5">
      <h2 className="font-display text-lg font-bold text-steel-950 mb-3">Ubicación de productos</h2>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nombre o SKU..."
        className="w-full max-w-md rounded-lg border border-plate-200 px-3 py-2 text-sm mb-3"
      />
      <div className="flex gap-6">
        <ul className="w-80 shrink-0 max-h-96 overflow-y-auto border border-plate-200 rounded-lg divide-y divide-plate-100">
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-plate-50 ${selectedId === p.id ? 'bg-amber-50' : ''}`}
              >
                <p className="font-medium text-steel-900 truncate">{p.name}</p>
                <p className="text-xs text-steel-400 font-mono">{p.sku} — stock {p.stock}</p>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-4 text-sm text-steel-400">Sin resultados</li>}
        </ul>

        <div className="flex-1">
          {!selected ? (
            <p className="text-sm text-steel-500">Elegí un producto de la lista.</p>
          ) : (
            <div>
              <p className="font-semibold text-steel-900 mb-1">{selected.name}</p>
              <p className="text-xs text-steel-400 font-mono mb-3">{selected.sku} — stock total {selected.stock}</p>

              <ul className="space-y-2 mb-3">
                {selectedLocations.map((loc) => (
                  <li key={loc.id} className="flex items-center gap-2 rounded-lg border border-plate-200 px-3 py-2">
                    <span className="flex-1 text-sm text-steel-700">{zonaPath(loc.zona_id, zonasById)}</span>
                    <input
                      type="number"
                      min={0}
                      defaultValue={loc.quantity}
                      onBlur={(e) => {
                        if (Number(e.target.value) !== loc.quantity) updateQuantity(loc.id, e.target.value);
                      }}
                      className="w-20 rounded border border-plate-200 px-2 py-1 text-sm"
                    />
                    <DeleteButton id={loc.id} action={deleteProductLocation} label="ubicación" />
                  </li>
                ))}
                {selectedLocations.length === 0 && (
                  <li className="text-sm text-steel-400">Sin ubicaciones asignadas todavía.</li>
                )}
              </ul>

              <div className="flex flex-wrap items-end gap-2 rounded-lg border border-dashed border-plate-300 p-3">
                <div>
                  <label className="block text-[11px] font-semibold text-steel-500">Zona</label>
                  <select
                    value={newZonaId}
                    onChange={(e) => setNewZonaId(e.target.value)}
                    className="w-56 rounded border border-plate-200 px-2 py-1 text-sm"
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
                  <label className="block text-[11px] font-semibold text-steel-500">Cantidad</label>
                  <input
                    type="number"
                    min={0}
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-20 rounded border border-plate-200 px-2 py-1 text-sm"
                  />
                </div>
                <button
                  onClick={addLocation}
                  disabled={pending || !newZonaId}
                  className="rounded-lg bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
                >
                  {pending ? 'Agregando…' : '+ Agregar ubicación'}
                </button>
              </div>
              {error && <p className="mt-2 text-xs font-medium text-danger-600">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
