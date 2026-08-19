'use client';

import { useMemo, useState } from 'react';
import { formatPrice } from '@/lib/price';
import { getProductCode } from '@/lib/product-display';
import { getCashDiscountPct } from '@/lib/cash-discount';

type LabelProduct = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  ml_item_id: string | null;
  specs: { label: string; value: string }[];
  category: { name: string; cash_discount_pct: number | null } | null;
};

/** Línea corta con 3 specs ("Label: valor") o, si no hay specs cargados, el arranque de la descripción. */
function shortSubtitle(p: LabelProduct): string | null {
  if (p.specs.length > 0) {
    return p.specs
      .slice(0, 3)
      .map((s) => `${s.label}: ${s.value}`)
      .join('  ·  ');
  }
  if (p.description) {
    const clean = p.description.replace(/\s+/g, ' ').trim();
    return clean.length > 110 ? clean.slice(0, 110) + '…' : clean;
  }
  return null;
}

export default function EtiquetasClient({ products }: { products: LabelProduct[] }) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => {
      const code = getProductCode(p) ?? p.sku;
      return p.name.toLowerCase().includes(term) || code.toLowerCase().includes(term);
    });
  }, [q, products]);

  const selectedProducts = useMemo(
    () => products.filter((p) => selected.has(p.id)),
    [products, selected]
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllVisible() {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((p) => next.add(p.id));
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  return (
    <div>
      <div className="print:hidden">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="font-display text-2xl font-bold text-steel-950">Etiquetas de producto</h1>
          <button
            onClick={() => window.print()}
            disabled={selected.size === 0}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Imprimir {selected.size > 0 ? `(${selected.size})` : ''}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o código (SKU)..."
            className="w-full max-w-md rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <button
            onClick={selectAllVisible}
            className="rounded-lg border border-plate-200 px-3 py-2 text-xs font-semibold text-steel-600 hover:border-amber-400 hover:text-amber-700"
          >
            Seleccionar {filtered.length} visibles
          </button>
          <button
            onClick={clearSelection}
            className="rounded-lg border border-plate-200 px-3 py-2 text-xs font-semibold text-steel-600 hover:border-amber-400 hover:text-amber-700"
          >
            Limpiar selección
          </button>
          <span className="text-sm text-steel-500">{selected.size} seleccionados</span>
        </div>

        <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card max-h-[60vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-plate-200 text-left text-steel-500">
                <th className="p-3 font-medium w-10"></th>
                <th className="p-3 font-medium">Producto</th>
                <th className="p-3 font-medium">Código</th>
                <th className="p-3 font-medium">Precio</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-plate-100 last:border-0 hover:bg-plate-50"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggle(p.id)}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 font-medium text-steel-900">{p.name}</td>
                  <td className="p-3 font-mono text-xs text-steel-500">{getProductCode(p) ?? p.sku}</td>
                  <td className="p-3 font-semibold text-steel-900">${formatPrice(p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-8 print:mt-0">
          <p className="print:hidden text-sm font-semibold text-steel-500 mb-3">
            Vista previa de impresión
          </p>
          <div className="etiquetas-grid">
            {selectedProducts.map((p) => {
              const code = getProductCode(p) ?? p.sku;
              const cashPct = getCashDiscountPct(p.category);
              const cashPrice = cashPct !== null ? Math.round(p.price * (1 - cashPct / 100)) : null;
              const cuotaPrice = p.price / 3;
              const subtitle = shortSubtitle(p);

              return (
                <div key={p.id} className="etiqueta-card">
                  <div className="etiqueta-franja" />
                  <div className="etiqueta-contenido">
                    <div className="etiqueta-logo-col">
                      {/* eslint-disable-next-line @next/next/no-img-element -- se imprime, no navega por rutas de Next Image */}
                      <img src="/images/logo-behmont-oval.png" alt="BEHMONT" className="etiqueta-logo" />
                      <p className="etiqueta-sku">{code}</p>
                    </div>
                    <div className="etiqueta-info-col">
                      <p className="etiqueta-nombre">{p.name}</p>
                      {subtitle && <p className="etiqueta-subtitulo">{subtitle}</p>}
                      <p className="etiqueta-precio">${formatPrice(p.price)}</p>
                      <div className="etiqueta-precios-extra">
                        <p className="etiqueta-cuotas">3x ${formatPrice(cuotaPrice)} sin interés</p>
                        {cashPrice !== null && (
                          <p className="etiqueta-contado">Contado: ${formatPrice(cashPrice)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="etiqueta-franja" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
