'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { updateStockAndPrice, deleteProduct } from '@/lib/actions';
import { getProductCode } from '@/lib/product-display';
import DeleteButton from './DeleteButton';

type Row = {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  images: string[] | null;
  ml_item_id: string | null;
  specs: { label: string; value: string }[];
  category: { name: string } | null;
};

export default function ProductsTable({ products }: { products: Row[] }) {
  const [rows, setRows] = useState(products);
  const [pending, startTransition] = useTransition();
  const [savedId, setSavedId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(id: string, field: 'price' | 'stock', value: number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function handleSave(row: Row) {
    setErrors((prev) => ({ ...prev, [row.id]: '' }));
    startTransition(async () => {
      const result = await updateStockAndPrice(row.id, row.stock, row.price);
      if (result?.error) {
        setErrors((prev) => ({ ...prev, [row.id]: result.error! }));
        return;
      }
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
            <th className="p-3 font-medium">Categoría</th>
            <th className="p-3 font-medium">Precio</th>
            <th className="p-3 font-medium">Stock</th>
            <th className="p-3 font-medium">Estado</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-plate-100 last:border-0">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-md bg-white overflow-hidden shrink-0">
                    {row.images?.[0] && (
                      <Image src={row.images[0]} alt={row.name} fill sizes="40px" className="object-contain" />
                    )}
                  </div>
                  <span className="font-medium text-steel-900 line-clamp-1">
                    {row.name} {row.ml_item_id && <span title="Sincronizado con MercadoLibre">🛒</span>}
                  </span>
                </div>
              </td>
              <td className="p-3 font-mono text-xs text-steel-500">{getProductCode(row) ?? row.sku}</td>
              <td className="p-3 text-steel-600">{row.category?.name || '—'}</td>
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
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    row.active ? 'bg-emerald-100 text-emerald-700' : 'bg-plate-100 text-steel-500'
                  }`}
                >
                  {row.active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="p-3 text-right space-y-1 whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleSave(row)}
                    disabled={pending}
                    className="rounded-md bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800 disabled:opacity-40"
                  >
                    {savedId === row.id ? 'Guardado ✓' : 'Guardar'}
                  </button>
                  <a href={`?edit=${row.id}`} className="text-steel-600 hover:text-amber-600 text-xs font-semibold">
                    Editar
                  </a>
                  <DeleteButton id={row.id} action={deleteProduct} label="producto" />
                </div>
                {errors[row.id] && (
                  <p role="alert" className="text-xs font-medium text-danger-600">{errors[row.id]}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
