'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '@/lib/types';

// Fotos reales del local para las categorías que ya las tienen (resto sigue con icon_url o el numero).
const CATEGORY_PHOTOS: Record<string, string> = {
  gastronomia: '/images/categoria-gastronomia.jpg',
  almacen: '/images/categoria-almacen.jpg',
  frio: '/images/categoria-frio.jpg',
  hogar: '/images/categoria-hogar.jpg',
  decoracion: '/images/categoria-decoracion.jpg',
  herramientas: '/images/categoria-herramientas.jpg',
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [categories]);

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector('a')?.getBoundingClientRect().width ?? 120;
    el.scrollBy({ left: dir === 'left' ? -(cardW * 3) : cardW * 3 });
  }

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 tracking-tight">
          Categorías
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canLeft}
            aria-label="Categorías anteriores"
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-plate-200 bg-white text-steel-600 shadow-sm transition hover:border-steel-700 hover:bg-steel-950 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canRight}
            aria-label="Más categorías"
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-steel-700 bg-steel-950 text-white shadow-sm transition hover:border-steel-900 hover:bg-black disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <Link
            href="/buscar"
            className="ml-2 text-sm font-semibold text-steel-500 hover:text-amber-600 transition-colors"
          >
            Ver todo →
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat, i) => {
          const photo = CATEGORY_PHOTOS[cat.slug] || cat.icon_url;
          return (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group flex shrink-0 w-[calc(50%-6px)] sm:w-[calc(25%-9px)] lg:w-[calc(16.666%-10px)] flex-col items-center gap-3 rounded-xl border border-plate-200 bg-white px-3 py-5 text-center transition-all duration-150 hover:border-steel-900 hover:shadow-md"
          >
            {photo ? (
              <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-plate-200">
                <Image
                  src={photo}
                  alt={cat.name}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </span>
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-plate-100 font-display text-lg font-bold text-steel-300 group-hover:bg-steel-900 group-hover:text-white transition-colors duration-150">
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            <span className="text-xs font-semibold leading-tight text-steel-800 line-clamp-2 group-hover:text-steel-950">
              {cat.name}
            </span>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
