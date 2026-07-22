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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-steel-950 tracking-tight leading-[0.92]">
            Categorías
          </h2>
        </div>
        <Link
          href="/buscar"
          className="text-xs font-bold uppercase tracking-wider text-steel-500 hover:text-amber-500 transition-colors"
        >
          Ver todo →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-steel-100">
        {categories.map((cat) => {
          const photo = CATEGORY_PHOTOS[cat.slug];
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group relative block bg-white overflow-hidden"
              style={{ aspectRatio: '3 / 4' }}
            >
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
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,18,38,0.75) 0%, rgba(10,18,38,0.05) 55%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <h3
                  className="font-display font-black uppercase leading-none text-white"
                  style={{ fontSize: 'clamp(1.05rem, 2.4vw, 1.5rem)', letterSpacing: '-0.01em' }}
                >
                  {cat.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
