'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import SpecsEditor from './SpecsEditor';
import { upsertProduct } from '@/lib/actions';
import type { ProductSpec } from '@/lib/types';

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
  const [specs, setSpecs] = useState<ProductSpec[]>(product?.specs || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState(product?.price?.toString() ?? '');
  const [compareAtPrice, setCompareAtPrice] = useState(product?.compare_at_price?.toString() ?? '');
  const [discountPct, setDiscountPct] = useState('');

  function applyDiscount() {
    const pct = Number(discountPct);
    const current = Number(price);
    if (!pct || pct <= 0 || pct >= 100 || !current) return;
    setCompareAtPrice(current.toString());
    setPrice(Math.round(current * (1 - pct / 100)).toString());
  }

  const previewPct =
    compareAtPrice && price && Number(compareAtPrice) > Number(price)
      ? Math.round(100 - (Number(price) / Number(compareAtPrice)) * 100)
      : null;

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    formData.set('images', images.join(','));
    formData.set('specs', JSON.stringify(specs.filter((s) => s.label.trim() && s.value.trim())));
    const result = await upsertProduct(formData);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
      return;
    }
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
          <input
            type="number"
            step="0.01"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Precio anterior (para % OFF)">
          <input
            type="number"
            step="0.01"
            name="compare_at_price"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Stock">
          <input type="number" name="stock" required defaultValue={product?.stock ?? 0} className="input" />
        </Field>
      </div>

      <div className="rounded-lg border border-plate-200 bg-plate-50 p-3">
        <label className="block text-xs font-medium text-steel-700 mb-1">Aplicar % de descuento</label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            min={1}
            max={90}
            placeholder="Ej: 20"
            value={discountPct}
            onChange={(e) => setDiscountPct(e.target.value)}
            className="input w-24"
          />
          <button
            type="button"
            onClick={applyDiscount}
            className="rounded-lg border border-plate-200 bg-white px-4 py-2 text-sm font-semibold text-steel-800 hover:bg-plate-100"
          >
            Calcular
          </button>
          {previewPct !== null && (
            <p className="text-sm text-steel-700">
              <span className="text-steel-400 line-through">
                ${Number(compareAtPrice).toLocaleString('es-AR')}
              </span>{' '}
              → <span className="font-bold text-steel-950">${Number(price).toLocaleString('es-AR')}</span>{' '}
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                {previewPct}% OFF
              </span>
            </p>
          )}
        </div>
        <p className="mt-1 text-xs text-steel-500">
          Toma el precio actual como referencia, lo guarda como "Precio anterior" y calcula el nuevo precio con el descuento.
        </p>
      </div>

      <Field label="Imágenes">
        <ImageUploader value={images} onChange={setImages} />
      </Field>

      <Field label="Características (se muestran en la ficha del producto)">
        <SpecsEditor value={specs} onChange={setSpecs} />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="active" defaultChecked={product?.active ?? true} /> Activo en el catálogo
        </label>
        <label className="flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} /> Destacado en portada
        </label>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-danger-600/10 px-3 py-2 text-sm font-medium text-danger-600">
          {error}
        </p>
      )}

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
