'use client';

import { useState, useTransition } from 'react';
import { updateStockAndPrice } from '@/lib/actions';

type Row = { id: string; sku: string; name: string; price: number; stock: number; ml_item_id: string | null };

export default function StockTable({ products }: { products: Row[] }) {
  const [rows, setRows] = useState(products);
  const [pending, startTransition] = useTransition();
  const [savedId, setSavedId] = useState<string | null>(null);

  function handleChange(id: string, field: 'price' | 'stock', value: number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function handleSave(row: Row) {
    startTransition(async () => {
      await updateStockAndPrice(row.id, row.stock, row.price);
      setSavedId(row.id);
      setTimeout(() => setSavedId(null), 1200);
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl2 border border-plate-200 bg-white shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-plate-200 text-left text-steel-500">
            <th className="p-3 font-medium">Producto</th>
            <th className="p-3 font-medium">Código</th>
            <th className="p-3 font-medium">Precio</th>
            <th className="p-3 font-medium">Stock</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-plate-100 last:border-0">
              <td className="p-3 font-medium text-steel-900">
                {row.name} {row.ml_item_id && <span title="Sincronizado con MercadoLibre">🛒</span>}
              </td>
              <td className="p-3 font-mono text-xs text-steel-500">{row.sku}</td>
              <td className="p-3">
                <input
                  type="number"
                  step="0.01"
                  value={row.price}
                  onChange={(e) => handleChange(row.id, 'price', Number(e.target.value))}
                  className="w-28 rounded-md border border-plate-200 px-2 py-1 text-sm"
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  value={row.stock}
                  onChange={(e) => handleChange(row.id, 'stock', Number(e.target.value))}
                  className="w-20 rounded-md border border-plate-200 px-2 py-1 text-sm"
                />
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleSave(row)}
                  disabled={pending}
                  className="rounded-md bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800 disabled:opacity-40"
                >
                  {savedId === row.id ? 'Guardado ✓' : 'Guardar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
