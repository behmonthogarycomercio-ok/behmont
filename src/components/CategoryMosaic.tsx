import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/lib/types';
import { CATEGORY_PHOTOS } from '@/lib/category-photos';

export default function CategoryMosaic({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-20">
      <div className="flex items-end justify-between mb-11">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-300 mb-2.5">
            Explorá
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-steel-950 tracking-tight">
            Categorías
          </h2>
        </div>
        <Link
          href="/buscar"
          className="text-sm font-semibold text-steel-500 hover:text-amber-500 transition-colors"
        >
          Ver todo →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((cat) => {
          const photo = CATEGORY_PHOTOS[cat.slug];
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group rounded-[20px] border border-steel-100 bg-white overflow-hidden transition-all duration-200 hover:shadow-[0_16px_32px_-12px_rgba(10,18,38,0.18)] hover:-translate-y-[3px] hover:border-steel-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {photo ? (
                  <Image
                    src={photo}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="placeholder-pattern flex h-full w-full items-center justify-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-steel-300">
                      Foto categoría
                    </span>
                  </div>
                )}
              </div>
              <p className="px-[18px] py-4 text-[15px] font-semibold text-steel-900">{cat.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
