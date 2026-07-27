import Link from 'next/link';
import Image from 'next/image';
import { Percent } from 'lucide-react';
import { CATEGORY_PHOTOS } from '@/lib/category-photos';
import ProductCarousel from './ProductCarousel';
import type { CategoryWithDiscount } from '@/lib/data';

export default function CategoryDiscountCarousel({ categories }: { categories: CategoryWithDiscount[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="grid h-10 w-10 shrink-0 -rotate-6 place-items-center rounded-md bg-amber-500 shadow-lg">
          <Percent className="h-5 w-5 text-white" />
        </span>
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-600">
            Descuentos por sección
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 leading-tight tracking-tight">
            Dónde hay ofertas hoy
          </h2>
        </div>
      </div>

      <ProductCarousel>
        {categories.map((cat) => {
          const photo = CATEGORY_PHOTOS[cat.slug];
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}?oferta=1`}
              className="group relative shrink-0 w-[150px] sm:w-[190px] overflow-hidden rounded-xl2 border border-plate-200"
              style={{ aspectRatio: '3 / 4' }}
            >
              {photo ? (
                <Image
                  src={photo}
                  alt={cat.name}
                  fill
                  sizes="190px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="placeholder-pattern h-full w-full" />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,18,38,0.85) 0%, rgba(10,18,38,0.1) 60%)' }}
              />
              <span className="absolute top-2.5 left-2.5 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                Hasta {cat.maxDiscountPct}% OFF
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 font-display text-sm sm:text-base font-bold text-white leading-tight">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </ProductCarousel>
    </section>
  );
}
