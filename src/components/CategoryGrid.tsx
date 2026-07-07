'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '@/lib/types';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    scrollerRef.current?.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-steel-400 mb-1">
            Índice de pasillos
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-900 tracking-tight">Categorías</h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="grid h-9 w-9 place-items-center rounded-full border border-plate-200 text-steel-600 transition active:scale-[0.95] hover:bg-plate-100"
            aria-label="Ver categorías anteriores"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="grid h-9 w-9 place-items-center rounded-full border border-plate-200 text-steel-600 transition active:scale-[0.95] hover:bg-plate-100"
            aria-label="Ver más categorías"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group flex w-32 shrink-0 snap-start flex-col justify-between gap-3 rounded-xl border border-plate-200 bg-white p-4 transition-all hover:border-steel-900 hover:shadow-md"
          >
            {cat.icon_url && (
              <span className="relative block h-10 w-10 overflow-hidden rounded-md">
                <Image src={cat.icon_url} alt={cat.name} fill className="object-cover" />
              </span>
            )}
            <div>
              <span className="block font-mono text-[10px] text-steel-300 mb-1 group-hover:text-amber-500 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="block text-sm font-semibold leading-snug text-steel-900 line-clamp-2">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
