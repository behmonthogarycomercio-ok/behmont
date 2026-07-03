'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import { upsertProduct } from '@/lib/actions';

type Option = { id: string; name: string };

export default function ProductForm({
  product,
  categories,
  brands,
}: {
  product?: any;
  categories: Option[];
  brands: Option[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    formData.set('images', images.join(','));
    await upsertProduct(formData);
    setSaving(false);
    router.push('/admin/productos');
  }

  return (
    <form action={handleSubmit} className="max-w-2xl rounded-xl2 border border-plate-200 bg-white p-6 shadow-card space-y-5">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Código / SKU">
          <input name="sku" required defaultValue={product?.sku} className="input" />
        </Field>
        <Field label="Nombre del producto">
          <input name="name" required defaultValue={product?.name} className="input" />
        </Field>
      </div>

      <Field label="Descripción">
        <textarea name="description" rows={3} defaultValue={product?.description} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Categoría">
          <select name="category_id" defaultValue={product?.category_id || ''} className="input">
            <option value="">Sin categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Marca">
          <select name="brand_id" defaultValue={product?.brand_id || ''} className="input">
            <option value="">Sin marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Precio">
          <input type="number" step="0.01" name="price" required defaultValue={product?.price} className="input" />
        </Field>
        <Field label="Precio anterior (para % OFF)">
          <input type="number" step="0.01" name="compare_at_price" defaultValue={product?.compare_at_price} className="input" />
        </Field>
        <Field label="Stock">
          <input type="number" name="stock" required defaultValue={product?.stock ?? 0} className="input" />
        </Field>
      </div>

      <Field label="Imágenes">
        <ImageUploader value={images} onChange={setImages} />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="active" defaultChecked={product?.active ?? true} /> Activo en el catálogo
        </label>
        <label className="flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} /> Destacado en portada
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-steel-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar producto'}
        </button>
        <a href="/admin/productos" className="rounded-lg border border-plate-200 px-5 py-2.5 text-sm font-semibold text-steel-700 hover:bg-plate-50">
          Cancelar
        </a>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #dfe3e8;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          box-shadow: 0 0 0 2px #e8590c;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-steel-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
