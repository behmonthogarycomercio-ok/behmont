'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Promotion } from '@/lib/types';

function HeroFallback() {
  return (
    <div className="relative w-full overflow-hidden bg-steel-950 min-h-[340px] sm:min-h-[440px] flex items-center">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)',
        }}
      />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 py-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400">
          Concordia · Entre Ríos · Desde 1995
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold text-white leading-none tracking-tighter">
          Equipamiento<br className="hidden sm:block" /> comercial y de hogar
        </h1>
        <span className="mt-6 block h-1 w-14 rounded-full bg-amber-500" />
        <p className="mt-5 text-white/60 text-sm sm:text-lg max-w-sm leading-relaxed">
          Gastronomía, barbería, hogar, electrónica y más.<br />
          Financiación diaria · Factura A y B.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/buscar"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-amber-400 active:scale-[0.97]"
          >
            Ver catálogo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#ubicacion" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
            Cómo llegar →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ promotions }: { promotions: Promotion[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = promotions.length > 0 ? promotions : null;

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!items || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
  }

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [promotions.length]);

  function go(dir: 'prev' | 'next') {
    if (!items) return;
    setCurrent((c) => dir === 'next' ? (c + 1) % items.length : (c - 1 + items.length) % items.length);
    resetTimer();
  }

  if (!items) return <HeroFallback />;

  const slide = items[current];

  return (
    <div className="relative w-full overflow-hidden bg-steel-950 min-h-[300px] sm:min-h-[440px]">
      {/* Slides */}
      {items.map((promo, i) => (
        <div
          key={promo.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {promo.image_url && (
            <Image
              src={promo.image_url}
              alt={promo.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950/85 via-steel-950/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex h-full min-h-[300px] sm:min-h-[440px] items-center">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 py-14">
              {promo.subtitle && (
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">
                  {promo.subtitle}
                </p>
              )}
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-xl">
                {promo.title}
              </h2>
              <span className="mt-5 block h-1 w-14 rounded-full bg-amber-500" />
              {promo.cta_link && (
                <Link
                  href={promo.cta_link}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-amber-400 active:scale-[0.97]"
                >
                  Ver más <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Flechas */}
      {items.length > 1 && (
        <>
          <button
            onClick={() => go('prev')}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white border border-white/20 backdrop-blur-sm transition hover:bg-black/60"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go('next')}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white border border-white/20 backdrop-blur-sm transition hover:bg-black/60"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetTimer(); }}
              aria-label={`Ir a slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
