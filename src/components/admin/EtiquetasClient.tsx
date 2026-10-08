'use client';

import { useMemo, useRef, useState } from 'react';
import { formatPrice } from '@/lib/price';
import { getProductCode } from '@/lib/product-display';
import { getBrandName, getSpecItems, getDescriptionFallback, type LabelProduct } from '@/lib/etiqueta-content';
import { generateLabelsPdfFromDom } from '@/lib/generateLabelsPdf';
import { updateProductSpecs } from '@/lib/actions';

type Spec = { label: string; value: string };

export default function EtiquetasClient({ products: initialProducts }: { products: LabelProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Edición rápida de características (specs) directo desde la vista previa,
  // para no tener que ir a /admin/productos antes de imprimir.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSpecs, setEditSpecs] = useState<Spec[]>([]);
  const [savingSpecs, setSavingSpecs] = useState(false);

  function startEdit(p: LabelProduct) {
    setEditingId(p.id);
    setEditSpecs(p.specs.length > 0 ? p.specs.map((s) => ({ ...s })) : [{ label: '', value: '' }]);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditSpecs([]);
  }

  function updateSpecRow(index: number, field: keyof Spec, value: string) {
    setEditSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function removeSpecRow(index: number) {
    setEditSpecs((prev) => prev.filter((_, i) => i !== index));
  }

  function addSpecRow() {
    setEditSpecs((prev) => [...prev, { label: '', value: '' }]);
  }

  async function saveSpecs(id: string) {
    const cleaned = editSpecs.map((s) => ({ label: s.label.trim(), value: s.value.trim() })).filter((s) => s.value);
    setSavingSpecs(true);
    try {
      const formData = new FormData();
      formData.set('id', id);
      formData.set('specs', JSON.stringify(cleaned));
      const result = await updateProductSpecs(formData);
      if (result.error) {
        alert(result.error);
        return;
      }
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, specs: cleaned } : p)));
      cancelEdit();
    } finally {
      setSavingSpecs(false);
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => {
      const code = getProductCode(p) ?? p.sku;
      const brand = getBrandName(p) ?? '';
      return (
        p.name.toLowerCase().includes(term) ||
        code.toLowerCase().includes(term) ||
        brand.toLowerCase().includes(term)
      );
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

  async function handleDownloadPdf() {
    if (!gridRef.current) return;
    setGeneratingPdf(true);
    try {
      const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.etiqueta-card'));
      await generateLabelsPdfFromDom(cards);
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div>
      <div className="print:hidden">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="font-display text-2xl font-bold text-steel-950">Etiquetas de producto</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={selected.size === 0 || generatingPdf}
              className="rounded-lg border border-steel-950 px-4 py-2 text-sm font-semibold text-steel-950 hover:bg-plate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {generatingPdf ? 'Generando PDF…' : `Descargar PDF ${selected.size > 0 ? `(${selected.size})` : ''}`}
            </button>
            <button
              onClick={() => window.print()}
              disabled={selected.size === 0}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Imprimir {selected.size > 0 ? `(${selected.size})` : ''}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, marca o código (SKU)..."
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
                <th className="p-3 font-medium">Marca</th>
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
                  <td className="p-3 text-steel-600">{getBrandName(p) ?? '—'}</td>
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
          <div className="etiquetas-grid" ref={gridRef}>
            {selectedProducts.map((p) => {
              const code = getProductCode(p) ?? p.sku;
              const specItems = getSpecItems(p);
              const descriptionFallback = getDescriptionFallback(p);
              const brandName = getBrandName(p);

              const isEditing = editingId === p.id;

              return (
                <div key={p.id}>
                  <div className="etiqueta-card">
                    <div className="etiqueta-contenido">
                      <div className="etiqueta-info-col">
                        {brandName ? (
                          <>
                            <p className="etiqueta-marca">{brandName}</p>
                            <p className="etiqueta-variacion">{p.name}</p>
                          </>
                        ) : (
                          <p className="etiqueta-variacion etiqueta-variacion--sola">{p.name}</p>
                        )}
                        <div className="etiqueta-divisor" />
                        {specItems.length > 0 ? (
                          <ul className={`etiqueta-specs ${specItems.length >= 3 ? 'etiqueta-specs--compact' : ''}`}>
                            {specItems.map((s, i) => (
                              <li key={i} className="etiqueta-spec-item">
                                <span className="etiqueta-spec-dot" />
                                {s.label && <span className="etiqueta-spec-label">{s.label}:</span>}
                                <span className="etiqueta-spec-value">{s.value}</span>
                              </li>
                            ))}
                          </ul>
                        ) : descriptionFallback ? (
                          <p className="etiqueta-descripcion">{descriptionFallback}</p>
                        ) : null}
                      </div>
                      <div className="etiqueta-marca-row">
                        <p className="etiqueta-sku">{code}</p>
                        {/* eslint-disable-next-line @next/next/no-img-element -- se imprime, no navega por rutas de Next Image */}
                        <img src="/images/logo-behmont-oval.png" alt="BEHMONT" className="etiqueta-logo" />
                      </div>
                    </div>
                  </div>

                  <div className="print:hidden mt-1.5">
                    {isEditing ? (
                      <div className="rounded-lg border border-plate-200 bg-white p-3 shadow-card">
                        <p className="text-xs font-semibold text-steel-500 mb-2">Características de {p.name}</p>
                        <div className="flex flex-col gap-1.5">
                          {editSpecs.map((s, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={s.label}
                                onChange={(e) => updateSpecRow(i, 'label', e.target.value)}
                                placeholder="Etiqueta (opcional)"
                                className="w-2/5 rounded border border-plate-200 px-2 py-1 text-xs"
                              />
                              <input
                                type="text"
                                value={s.value}
                                onChange={(e) => updateSpecRow(i, 'value', e.target.value)}
                                placeholder="Valor"
                                className="flex-1 rounded border border-plate-200 px-2 py-1 text-xs"
                              />
                              <button
                                onClick={() => removeSpecRow(i)}
                                className="shrink-0 text-steel-400 hover:text-red-600 px-1"
                                title="Quitar"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={addSpecRow}
                          className="mt-2 text-xs font-semibold text-amber-600 hover:underline"
                        >
                          + Agregar característica
                        </button>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => saveSpecs(p.id)}
                            disabled={savingSpecs}
                            className="rounded-lg bg-steel-900 text-white hover:bg-steel-800 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold"
                          >
                            {savingSpecs ? 'Guardando…' : 'Guardar'}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-plate-200 px-3 py-1.5 text-xs font-semibold text-steel-600"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className="text-xs font-semibold text-steel-500 hover:text-amber-700 underline"
                      >
                        Editar características
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
