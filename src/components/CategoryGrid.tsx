import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/lib/types';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 tracking-tight">
          Categorías
        </h2>
        <Link
          href="/buscar"
          className="text-sm font-semibold text-steel-500 hover:text-amber-600 transition-colors"
        >
          Ver todo →
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-plate-200 bg-white px-3 py-5 text-center transition-all duration-150 hover:border-steel-900 hover:shadow-md"
          >
            {cat.icon_url ? (
              <span className="relative h-14 w-14 overflow-hidden rounded-xl">
                <Image
                  src={cat.icon_url}
                  alt={cat.name}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </span>
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-plate-100 font-display text-lg font-bold text-steel-300 group-hover:bg-steel-900 group-hover:text-white transition-colors duration-150">
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            <span className="text-xs font-semibold leading-tight text-steel-800 line-clamp-2 group-hover:text-steel-950">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
