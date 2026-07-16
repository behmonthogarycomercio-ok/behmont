import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/types';
import { CATEGORY_PHOTOS } from '@/lib/category-photos';

export default function FeaturedCategories({ categories }: { categories: Category[] }) {
  const featured = categories.filter((cat) => CATEGORY_PHOTOS[cat.slug]).slice(0, 6);
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="mb-7">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-steel-400 mb-1">
          Explorá por rubro
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 tracking-tight">
          Categorías destacadas
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {featured.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group relative h-52 rounded-2xl overflow-hidden"
          >
            <Image
              src={CATEGORY_PHOTOS[cat.slug]}
              alt={cat.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3A]/90 via-[#0B1C3A]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-white leading-tight">{cat.name}</h3>
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white/15 group-hover:bg-amber-500 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-white transition-colors whitespace-nowrap">
                Conocé más <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
