'use client';

import { useMemo, useState } from 'react';
import { Upload, X } from 'lucide-react';
import type { DepositoPin } from '@/lib/deposito';

type ProductoApi = { id: string; sku: string; name: string; images?: string[] | null };

export default function FotosGestionClient({
  pin,
  code,
  products,
  onChanged,
}: {
  pin: DepositoPin;
  code: string;
  products: ProductoApi[];
  onChanged: () => void;
}) {
  const [q, setQ] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)).slice(0, 15);
  }, [q, products]);

  const selected = products.find((p) => p.id === selectedId) || null;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !selected) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set('pin', String(pin));
      fd.set('code', code);
      fd.set('productId', selected.id);
      Array.from(files).forEach((f) => fd.append('files', f));
      const res = await fetch('/api/deposito/fotos', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo subir la foto');
        return;
      }
      onChanged();
    } catch {
      setError('No se pudo subir. Probá de nuevo.');
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(imageUrl: string) {
    if (!selected) return;
    setError(null);
    const res = await fetch('/api/deposito/fotos/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin, code, productId: selected.id, imageUrl }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'No se pudo quitar la foto');
      return;
    }
    onChanged();
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40 mb-2">Fotos de producto</p>
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
                {p.name} <span className="text-white/40 font-mono text-xs">({p.sku})</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="rounded-lg bg-steel-800 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">{selected.name}</p>
            <button onClick={() => setSelectedId(null)} className="text-xs text-amber-400 underline">
              Cambiar producto
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mb-3">
            {(selected.images || []).map((url) => (
              <div key={url} className="relative h-20 w-20 rounded-lg overflow-hidden group border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  onClick={() => removeImage(url)}
                  className="absolute inset-0 hidden group-hover:grid place-items-center bg-black/60"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-white/30 px-4 py-2 text-sm text-white/70 hover:border-amber-500 hover:text-amber-400">
            <Upload className="h-4 w-4" />
            {uploading ? 'Subiendo...' : 'Subir fotos'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </label>
          {error && <p className="mt-2 text-xs font-medium text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
