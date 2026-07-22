'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { buttonClasses } from '@/components/ui/Button';
import type { Product } from '@/lib/types';

export default function BusinessSection({ products }: { products: Product[] }) {
  const items = products.filter((p) => p.images?.[0]).slice(0, 8);
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function reset() {
    if (timer.current) clearInterval(timer.current);
    if (items.length < 2) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % items.length), 4500);
  }

  useEffect(() => {
    reset();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[idx];

  function go(dir: 'prev' | 'next') {
    setIdx((i) => (dir === 'next' ? (i + 1) % items.length : (i - 1 + items.length) % items.length));
    reset();
  }

  return (
    <section className="bg-steel-950 py-[88px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-center">
          {/* Imagen contenida, columna derecha */}
          <div className="relative order-2 max-w-md mx-auto lg:mx-0 w-full">
            <div className="relative w-full overflow-hidden rounded-[18px] border border-white/10 bg-white"
              style={{ aspectRatio: '4 / 3' }}>
              <Image src={current.images![0]} alt={current.name} fill sizes="(max-width: 1024px) 90vw, 620px"
                className="object-contain p-3" />
            </div>

            {items.length > 1 && (
              <>
                <button onClick={() => go('prev')} aria-label="Anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-lg border border-plate-200 text-steel-600 flex items-center justify-center hover:text-[#0B1C3A] transition">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => go('next')} aria-label="Siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-lg border border-plate-200 text-steel-600 flex items-center justify-center hover:text-[#0B1C3A] transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {items.map((_, i) => (
                    <button key={i} onClick={() => { setIdx(i); reset(); }} aria-label={`Ver producto ${i + 1}`}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{ width: i === idx ? 24 : 8, background: i === idx ? '#ED3237' : 'rgba(255,255,255,0.35)' }} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Texto, columna izquierda */}
          <div className="order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">
              Equipamos tu negocio
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-4">
              Todo lo que tu comercio necesita, en un solo lugar.
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Gastronomía, panadería, carnicería, peluquería, frío comercial y almacén. Stock real y
              financiación propia para equipar tu local de punta a punta.
            </p>

            <div className="flex flex-col items-start gap-4">
              <span className="text-white font-bold text-xl">
                ${current.price.toLocaleString('es-AR')}
              </span>
              <Link href={`/producto/${current.slug}`} className={buttonClasses({ variant: 'tactile-red', size: 'lg', className: 'rounded-full' })}>
                Ver {current.name.length > 28 ? `${current.name.slice(0, 28)}…` : current.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
