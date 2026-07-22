'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import type { BrandOption } from '@/lib/product-filters';

const SORT_OPTIONS = [
  { value: '', label: 'Relevancia' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'nombre', label: 'Nombre A-Z' },
];

export default function ProductFilters({ brands }: { brands: BrandOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const selectedBrands = (searchParams.get('marca') || '').split(',').filter(Boolean);
  const precioMin = searchParams.get('precioMin') || '';
  const precioMax = searchParams.get('precioMax') || '';
  const oferta = searchParams.get('oferta') === '1';
  const soloStock = searchParams.get('stock') === '1';
  const orden = searchParams.get('orden') || '';

  const activeCount =
    selectedBrands.length + (precioMin ? 1 : 0) + (precioMax ? 1 : 0) + (oferta ? 1 : 0) + (soloStock ? 1 : 0);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  function update(patch: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === '') params.delete(key);
      else params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleBrand(id: string) {
    const next = selectedBrands.includes(id)
      ? selectedBrands.filter((b) => b !== id)
      : [...selectedBrands, id];
    update({ marca: next.length ? next.join(',') : null });
  }

  function clearAll() {
    update({ marca: null, precioMin: null, precioMax: null, oferta: null, stock: null });
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            'flex items-center gap-2 rounded-full border px-4 h-10 text-sm font-semibold transition-colors',
            activeCount > 0
              ? 'border-steel-900 bg-steel-950 text-white'
              : 'border-plate-200 bg-white text-steel-700 hover:border-steel-300'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtros
          {activeCount > 0 && (
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-amber-500 text-white text-[11px] font-bold">
              {activeCount}
            </span>
          )}
        </button>

        <div className="relative">
          <select
            value={orden}
            onChange={(e) => update({ orden: e.target.value || null })}
            className="appearance-none rounded-full border border-plate-200 bg-white pl-4 pr-9 h-10 text-sm font-medium text-steel-700 hover:border-steel-300 outline-none focus:border-steel-400 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-steel-400" />
        </div>

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700"
          >
            <X className="h-3.5 w-3.5" /> Limpiar filtros
          </button>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-2 w-[min(90vw,380px)] rounded-2xl border border-plate-200 bg-white p-5 shadow-xl">
            {/* Precio */}
            <p className="font-mono text-[11px] uppercase tracking-wide text-steel-400 mb-3">Precio</p>
            <div className="flex items-center gap-2 mb-5">
              <input
                type="number"
                inputMode="numeric"
                placeholder="Mín."
                defaultValue={precioMin}
                onBlur={(e) => update({ precioMin: e.target.value || null })}
                className="w-full rounded-lg border border-plate-200 px-3 h-9 text-sm outline-none focus:border-steel-400"
              />
              <span className="text-steel-300">—</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="Máx."
                defaultValue={precioMax}
                onBlur={(e) => update({ precioMax: e.target.value || null })}
                className="w-full rounded-lg border border-plate-200 px-3 h-9 text-sm outline-none focus:border-steel-400"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-2.5 mb-5">
              <label className="flex items-center gap-2.5 text-sm text-steel-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={oferta}
                  onChange={(e) => update({ oferta: e.target.checked ? '1' : null })}
                  className="h-4 w-4 rounded border-plate-300 accent-amber-500"
                />
                Solo ofertas
              </label>
              <label className="flex items-center gap-2.5 text-sm text-steel-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soloStock}
                  onChange={(e) => update({ stock: e.target.checked ? '1' : null })}
                  className="h-4 w-4 rounded border-plate-300 accent-amber-500"
                />
                Solo con stock
              </label>
            </div>

            {/* Marcas */}
            {brands.length > 0 && (
              <>
                <p className="font-mono text-[11px] uppercase tracking-wide text-steel-400 mb-3">Marca</p>
                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                  {brands.map((brand) => (
                    <label key={brand.id} className="flex items-center gap-2.5 text-sm text-steel-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="h-4 w-4 rounded border-plate-300 accent-amber-500"
                      />
                      <span className="flex-1">{brand.name}</span>
                      <span className="text-xs text-steel-400">{brand.count}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-full bg-steel-950 text-white text-sm font-semibold py-2.5 hover:bg-steel-800 transition-colors"
            >
              Ver resultados
            </button>
          </div>
        </>
      )}
    </div>
  );
}
