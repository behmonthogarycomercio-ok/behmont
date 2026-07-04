import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/slugify';
import type { Brand } from '@/lib/types';

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <h2 className="font-display text-xl font-semibold text-steel-900 mb-6">
        Buscar por marca
      </h2>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/marca/${slugify(brand.name)}`} className="shrink-0">
            {brand.logo_url ? (
              <div className="relative h-8 w-28 grayscale hover:grayscale-0 transition">
                <Image src={brand.logo_url} alt={brand.name} fill className="object-contain object-left" />
              </div>
            ) : (
              <span className="font-display font-bold text-steel-400 hover:text-amber-600 text-lg transition-colors">
                {brand.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
