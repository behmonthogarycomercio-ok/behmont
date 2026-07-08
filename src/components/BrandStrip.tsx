'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { slugify } from '@/lib/slugify';
import type { Brand } from '@/lib/types';

export default function BrandStrip({ brands, topBrands }: { brands: Brand[]; topBrands: Brand[] }) {
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, brands]);

  if (brands.length === 0) return null;

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

      {topBrands.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topBrands.map((brand) =>
            brand.logo_url ? (
              <Link
                key={brand.id}
                href={`/marca/${slugify(brand.name)}`}
                className="relative h-9 w-24 shrink-0 grayscale transition hover:grayscale-0"
              >
                <Image src={brand.logo_url} alt={brand.name} fill sizes="96px" className="object-contain object-left" />
              </Link>
            ) : (
              <Link
                key={brand.id}
                href={`/marca/${slugify(brand.name)}`}
                className="rounded-full border border-plate-200 bg-white px-4 py-1.5 text-sm font-medium text-steel-700 transition hover:border-amber-500 hover:text-amber-600"
              >
                {brand.name}
              </Link>
            )
          )}
        </div>
      )}
    </section>
  );
}
