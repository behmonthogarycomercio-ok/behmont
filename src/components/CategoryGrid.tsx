'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChefHat,
  ShoppingBasket,
  Beef,
  Croissant,
  Snowflake,
  Home,
  Scissors,
  Sparkles,
  Palette,
  Archive,
  Briefcase,
  Wrench,
  Smartphone,
  Sofa,
  WashingMachine,
  Wind,
  Bike,
  Tag,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/lib/types';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  gastronomia: ChefHat,
  almacen: ShoppingBasket,
  carniceria: Beef,
  panaderia: Croissant,
  frio: Snowflake,
  hogar: Home,
  'peluqueria-barberia': Scissors,
  estetica: Sparkles,
  decoracion: Palette,
  almacenamiento: Archive,
  oficina: Briefcase,
  herramientas: Wrench,
  electronica: Smartphone,
  muebles: Sofa,
  electrodomesticos: WashingMachine,
  climatizacion: Wind,
  'deportes-aire-libre': Bike,
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    scrollerRef.current?.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-semibold text-steel-900">Categorías</h2>
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
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] || Tag;
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group flex w-20 shrink-0 snap-start flex-col items-center gap-2 text-center"
            >
              <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white border border-plate-200 shadow-card overflow-hidden transition-colors group-hover:border-amber-500 group-hover:bg-amber-50">
                {cat.icon_url ? (
                  <Image src={cat.icon_url} alt={cat.name} fill className="object-cover" />
                ) : (
                  <Icon className="h-7 w-7 text-steel-700 transition-colors group-hover:text-amber-600" strokeWidth={1.75} />
                )}
              </span>
              <span className="text-sm font-medium text-steel-800 line-clamp-2 group-hover:text-amber-600">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
