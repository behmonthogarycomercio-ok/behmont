'use client';

import { useMemo, useState } from 'react';
import { Upload, Download } from 'lucide-react';
import type { DepositoPin } from '@/lib/deposito';

type ZonaApi = { id: string; parent_id: string | null; tipo: string; codigo: string; nombre: string; active: boolean };
type LocationApi = { id: string; zona_id: string; quantity: number };
type ProductoApi = {
  id: string;
  sku: string;
  name: string;
  stock: number;
  images?: string[] | null;
  product_locations?: LocationApi[] | null;
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

// Un único buscador de producto para Gabriel desde /deposito/gestion: elegido
// el producto, puede reubicar su stock y subir/sacar fotos en el mismo lugar
// (antes eran dos buscadores separados, uno por sección).
export default function ProductoGestionClient({
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
  const [locBusy, setLocBusy] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [confirmDeleteUrl, setConfirmDeleteUrl] = useState<string | null>(null);

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

  async function callLocations(body: object, endpoint: string) {
    setLocBusy(true);
    setLocError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, code, ...body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLocError(data.error || 'No se pudo guardar');
        return false;
      }
      onChanged();
      return true;
    } catch {
      setLocError('No se pudo guardar. Probá de nuevo.');
      return false;
    } finally {
      setLocBusy(false);
    }
  }

  async function addLocation() {
    if (!selected || !newZonaId) return;
    const ok = await callLocations(
      { productId: selected.id, zonaId: newZonaId, quantity: Number(newQuantity) || 0 },
      '/api/deposito/ubicaciones'
    );
    if (ok) {
      setNewZonaId('');
      setNewQuantity('1');
    }
  }

  async function updateQuantity(locationId: string, quantity: string) {
    await callLocations({ id: locationId, quantity: Number(quantity) || 0 }, '/api/deposito/ubicaciones');
  }

  async function removeLocation(locationId: string) {
    await callLocations({ id: locationId }, '/api/deposito/ubicaciones/delete');
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !selected) return;
    setUploading(true);
    setPhotoError(null);
    try {
      const fd = new FormData();
      fd.set('pin', String(pin));
      fd.set('code', code);
      fd.set('productId', selected.id);
      Array.from(files).forEach((f) => fd.append('files', f));
      const res = await fetch('/api/deposito/fotos', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setPhotoError(data.error || 'No se pudo subir la foto');
        return;
      }
      onChanged();
    } catch {
      setPhotoError('No se pudo subir. Probá de nuevo.');
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(imageUrl: string) {
    if (!selected) return;
    setPhotoError(null);
    const res = await fetch('/api/deposito/fotos/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin, code, productId: selected.id, imageUrl }),
    });
    const data = await res.json();
    setConfirmDeleteUrl(null);
    if (!res.ok) {
      setPhotoError(data.error || 'No se pudo quitar la foto');
      return;
    }
    onChanged();
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-steel-400 mb-2">Productos</p>
      <input
        type="text"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setSelectedId(null);
        }}
        placeholder="Buscar producto por código o nombre..."
        className="w-full max-w-md rounded-lg border border-steel-200 px-3 py-2 text-sm text-steel-900 mb-2"
      />
      {!selected && filtered.length > 0 && (
        <ul className="flex flex-col gap-1 mb-3">
          {filtered.map((p) => (
            <li key={p.id}>
              <button onClick={() => setSelectedId(p.id)} className="text-left text-sm text-steel-700 hover:text-steel-600">
                {p.name} <span className="text-steel-400 font-mono text-xs">({p.sku}) — stock {p.stock}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="rounded-lg bg-steel-50 border border-steel-200 p-3 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-steel-900">{selected.name}</p>
              <p className="text-xs text-steel-400 font-mono">{selected.sku} — stock total {selected.stock}</p>
            </div>
            <button onClick={() => setSelectedId(null)} className="text-xs text-steel-600 underline shrink-0">
              Cambiar producto
            </button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-steel-400 mb-2">Ubicación</p>
            <ul className="space-y-2 mb-3">
              {selectedLocations.map((loc) => (
                <li key={loc.id} className="flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-3 py-2">
                  <span className="flex-1 text-sm text-steel-700">{zonaPath(loc.zona_id, zonasById)}</span>
                  <input
                    type="number"
                    min={0}
                    defaultValue={loc.quantity}
                    onBlur={(e) => {
                      if (Number(e.target.value) !== loc.quantity) updateQuantity(loc.id, e.target.value);
                    }}
                    className="w-16 rounded border border-steel-200 bg-white px-2 py-1 text-sm text-steel-900"
                  />
                  <button
                    onClick={() => removeLocation(loc.id)}
                    disabled={locBusy}
                    className="text-xs text-red-600 underline disabled:opacity-50"
                  >
                    Quitar
                  </button>
                </li>
              ))}
              {selectedLocations.length === 0 && (
                <li className="text-sm text-steel-400">Sin ubicaciones asignadas todavía.</li>
              )}
            </ul>

            <div className="flex flex-wrap items-end gap-2 rounded-lg border border-dashed border-steel-300 p-3">
              <div>
                <label className="block text-[11px] font-semibold text-steel-500">Zona</label>
                <select
                  value={newZonaId}
                  onChange={(e) => setNewZonaId(e.target.value)}
                  className="w-52 rounded border border-steel-200 bg-white px-2 py-1 text-sm text-steel-900"
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
                  className="w-16 rounded border border-steel-200 bg-white px-2 py-1 text-sm text-steel-900"
                />
              </div>
              <button
                onClick={addLocation}
                disabled={locBusy || !newZonaId}
                className="rounded-lg bg-steel-800 hover:bg-steel-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
              >
                + Agregar ubicación
              </button>
            </div>
            {locError && <p className="mt-2 text-xs font-medium text-red-600">{locError}</p>}
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-steel-400 mb-2">Fotos</p>
            <div className="flex flex-wrap gap-3 mb-3">
              {(selected.images || []).map((url) => (
                <div key={url} className="w-24">
                  <div className="h-20 w-24 rounded-lg overflow-hidden border border-steel-200 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1 text-[11px]">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-0.5 text-steel-600 underline"
                    >
                      <Download className="h-3 w-3" /> Bajar
                    </a>
                    {confirmDeleteUrl === url ? (
                      <span className="flex items-center gap-1">
                        <button onClick={() => removeImage(url)} className="text-red-600 underline font-semibold">
                          Sí, borrar
                        </button>
                        <button onClick={() => setConfirmDeleteUrl(null)} className="text-steel-400 underline">
                          No
                        </button>
                      </span>
                    ) : (
                      <button onClick={() => setConfirmDeleteUrl(url)} className="text-red-600 underline">
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-steel-300 px-4 py-2 text-sm text-steel-600 hover:border-steel-600 hover:text-steel-700">
              <Upload className="h-4 w-4" />
              {uploading ? 'Subiendo...' : 'Subir fotos'}
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </label>
            {photoError && <p className="mt-2 text-xs font-medium text-red-600">{photoError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
