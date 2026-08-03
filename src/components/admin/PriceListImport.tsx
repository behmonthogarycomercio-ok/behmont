'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, ChevronDown } from 'lucide-react';

type DiffRow = {
  toUpdate: { id: string; sku: string; name: string; oldPrice: number; newPrice: number; oldStock: number; newStock: number }[];
  toCreate: { sku: string; displayName: string; brand: string | null; categorySlug: string | null; price: number; stock: number }[];
  toDeactivate: { id: string; sku: string; name: string }[];
  unchanged: number;
};

type ApplyResult = { updated: number; deactivated: number; created: number; errors: string[] };

function fmt(n: number) {
  return n.toLocaleString('es-AR');
}

export default function PriceListImport() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');
  const [diff, setDiff] = useState<DiffRow | null>(null);
  const [rowCount, setRowCount] = useState(0);
  const [result, setResult] = useState<ApplyResult | null>(null);
  const [expanded, setExpanded] = useState<'update' | 'create' | 'deactivate' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function analyze(f: File) {
    setLoading(true);
    setError('');
    setDiff(null);
    setResult(null);
    try {
      const body = new FormData();
      body.append('file', f);
      const res = await fetch('/api/admin/import-price-list', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo leer el archivo');
      setDiff(data.diff);
      setRowCount(data.rowCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo leer el archivo');
    } finally {
      setLoading(false);
    }
  }

  async function apply() {
    if (!file) return;
    setApplying(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('apply', '1');
      const res = await fetch('/api/admin/import-price-list', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo aplicar los cambios');
      setResult(data.applied);
      setDiff(null);
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo aplicar los cambios');
    } finally {
      setApplying(false);
    }
  }

  const hasChanges = diff && (diff.toUpdate.length > 0 || diff.toCreate.length > 0 || diff.toDeactivate.length > 0);

  return (
    <div className="rounded-xl2 border border-plate-200 bg-white p-5 mb-6 space-y-4">
      <div>
        <h2 className="font-display font-semibold text-steel-900">Importar lista de precios</h2>
        <p className="text-sm text-steel-500 mt-1">
          Subí el archivo del distribuidor (.csv o .xlsx) para actualizar precio y stock por SKU.
          Los SKU nuevos se crean sin categoría (o con la que sugiere la lista/el nombre); los que
          ya no aparecen en la lista se desactivan automáticamente.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) { setFile(f); analyze(f); }
          }}
          className="hidden"
          id="price-list-file"
        />
        <label
          htmlFor="price-list-file"
          className="inline-flex items-center gap-2 rounded-lg bg-steel-900 px-4 py-2 text-sm font-semibold text-white hover:bg-steel-800 cursor-pointer"
        >
          <Upload className="h-4 w-4" />
          Elegir archivo
        </label>
        {file && <span className="text-sm text-steel-600">{file.name}</span>}
        {loading && <Loader2 className="h-4 w-4 animate-spin text-steel-400" />}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
          <p className="font-semibold">Listo — se aplicaron los cambios.</p>
          <p className="mt-1">
            {result.updated} actualizados · {result.created} creados · {result.deactivated} desactivados
          </p>
          {result.errors.length > 0 && (
            <div className="mt-2 text-red-600">
              <p className="font-semibold">{result.errors.length} errores:</p>
              <ul className="list-disc list-inside">
                {result.errors.slice(0, 10).map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {diff && (
        <div className="space-y-3">
          <p className="text-sm text-steel-500">
            {fmt(rowCount)} filas leídas · {fmt(diff.unchanged)} sin cambios
          </p>

          {!hasChanges && (
            <p className="text-sm text-steel-500">No hay cambios para aplicar — todo está al día.</p>
          )}

          <DiffSection
            label={`${fmt(diff.toUpdate.length)} productos con precio o stock distinto`}
            open={expanded === 'update'}
            onToggle={() => setExpanded(expanded === 'update' ? null : 'update')}
          >
            {diff.toUpdate.slice(0, 50).map((u) => (
              <div key={u.id} className="flex items-center justify-between gap-3 py-1.5 border-b border-plate-100 text-xs">
                <span className="text-steel-700 truncate flex-1">{u.sku} — {u.name}</span>
                <span className="text-steel-400 shrink-0">
                  {u.oldPrice !== u.newPrice && <>${fmt(u.oldPrice)} → ${fmt(u.newPrice)}</>}
                  {u.oldPrice !== u.newPrice && u.oldStock !== u.newStock && ' · '}
                  {u.oldStock !== u.newStock && <>stock {u.oldStock} → {u.newStock}</>}
                </span>
              </div>
            ))}
            {diff.toUpdate.length > 50 && <p className="text-xs text-steel-400 pt-1">+{diff.toUpdate.length - 50} más</p>}
          </DiffSection>

          <DiffSection
            label={`${fmt(diff.toCreate.length)} productos nuevos`}
            open={expanded === 'create'}
            onToggle={() => setExpanded(expanded === 'create' ? null : 'create')}
          >
            {diff.toCreate.slice(0, 50).map((c) => (
              <div key={c.sku} className="flex items-center justify-between gap-3 py-1.5 border-b border-plate-100 text-xs">
                <span className="text-steel-700 truncate flex-1">{c.sku} — {c.displayName}</span>
                <span className="text-steel-400 shrink-0">
                  ${fmt(c.price)} {c.categorySlug ? `· ${c.categorySlug}` : '· sin categoría'}
                </span>
              </div>
            ))}
            {diff.toCreate.length > 50 && <p className="text-xs text-steel-400 pt-1">+{diff.toCreate.length - 50} más</p>}
          </DiffSection>

          <DiffSection
            label={`${fmt(diff.toDeactivate.length)} productos a desactivar (ya no están en la lista)`}
            open={expanded === 'deactivate'}
            onToggle={() => setExpanded(expanded === 'deactivate' ? null : 'deactivate')}
          >
            {diff.toDeactivate.slice(0, 50).map((d) => (
              <div key={d.id} className="py-1.5 border-b border-plate-100 text-xs text-steel-700 truncate">
                {d.sku} — {d.name}
              </div>
            ))}
            {diff.toDeactivate.length > 50 && <p className="text-xs text-steel-400 pt-1">+{diff.toDeactivate.length - 50} más</p>}
          </DiffSection>

          {hasChanges && (
            <button
              onClick={apply}
              disabled={applying}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
            >
              {applying && <Loader2 className="h-4 w-4 animate-spin" />}
              {applying ? 'Aplicando...' : 'Aplicar cambios'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DiffSection({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-plate-200 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left hover:bg-plate-50 transition-colors"
      >
        <span className="text-sm font-medium text-steel-800">{label}</span>
        <ChevronDown className={`h-4 w-4 text-steel-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-plate-200 px-3.5 py-2 max-h-72 overflow-y-auto">{children}</div>}
    </div>
  );
}
