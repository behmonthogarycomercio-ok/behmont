'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown } from 'lucide-react';
import { slugify } from '@/lib/slugify';
import type { Brand } from '@/lib/types';

const INITIAL_COUNT = 21;

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const sortedBrands = useMemo(
    () => [...brands].sort((a, b) => a.name.localeCompare(b.name, 'es')),
    [brands]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, brands]);

  if (brands.length === 0) return null;

  const visibleBrands = showAll ? sortedBrands : sortedBrands.slice(0, INITIAL_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-5">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-steel-400 mb-1">
            Catálogo por fabricante
          </p>
          <h2 className="font-display text-xl font-semibold text-steel-900">Buscar por marca</h2>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Samsung, Behmont..."
            aria-label="Buscar marca"
            autoComplete="off"
            className="w-full rounded-full border border-plate-200 bg-plate-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          />
          {matches.length > 0 && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl2 border border-plate-200 bg-white shadow-card">
              {matches.map((b) => (
                <Link
                  key={b.id}
                  href={`/marca/${slugify(b.name)}`}
                  className="block px-4 py-2.5 text-sm text-steel-800 hover:bg-plate-50"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {visibleBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/marca/${slugify(brand.name)}`}
            className="group flex h-20 items-center justify-center rounded-xl2 border border-plate-200 bg-white px-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_16px_28px_-16px_rgba(10,18,38,0.2)]"
          >
            {brand.logo_url ? (
              <div className="relative h-9 w-full rounded-md bg-plate-50 grayscale opacity-70 transition group-hover:grayscale-0 group-hover:opacity-100">
                <Image src={brand.logo_url} alt={brand.name} fill sizes="140px" className="object-contain" />
              </div>
            ) : (
              <span className="text-center text-sm font-semibold text-steel-500 transition-colors group-hover:text-amber-600">
                {brand.name}
              </span>
            )}
          </Link>
        ))}
      </div>

      {!showAll && sortedBrands.length > INITIAL_COUNT && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 mx-auto flex items-center gap-1.5 text-sm font-semibold text-steel-600 hover:text-amber-600 transition-colors"
        >
          Ver todas las marcas ({sortedBrands.length}) <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </section>
  );
}
