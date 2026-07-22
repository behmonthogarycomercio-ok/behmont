'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import type { Promotion } from '@/lib/types';

const ANIM = `
  @keyframes bar { from { width:0 } to { width:100% } }
  .bar { animation: bar 6s linear forwards; }
`;

type Slide = {
  id: string;
  image: string;
  eyebrow?: string;
  title: string;
  price?: number;
  ctaLink?: string;
  ctaText?: string;
};

function StaticFallback() {
  return (
    <div className="relative w-full overflow-hidden min-h-[520px] lg:min-h-[640px]">
      <Image src="/images/hero-local.jpg" alt="Local BEHMONT" fill priority sizes="100vw"
        className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1226]/95 via-[#0A1226]/70 to-[#0A1226]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1226]/80 via-transparent to-transparent lg:hidden" />

      <div className="relative z-20 flex flex-col justify-end lg:justify-center h-full min-h-[520px] lg:min-h-[640px] px-6 sm:px-8 lg:px-16 py-16 lg:py-[100px]">
        <div className="max-w-[640px]">
          <span className="inline-flex items-center mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400 bg-amber-400/10 px-3.5 py-2 rounded-full w-fit">
            Concordia, Entre Ríos · Desde 1995
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.98] tracking-tight">
            Equipamiento<br />
            para cada<br />
            <span className="text-amber-400">rincón del negocio.</span>
          </h1>
          <p className="mt-7 text-white/70 text-base sm:text-lg max-w-[420px] leading-relaxed">
            Gastronomía, hogar, barbería y electrónica. Financiación propia y stock real, actualizado todos los días.
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <Link href="/buscar" className={buttonClasses({ variant: 'tactile-red', size: 'lg' })}>
              Ver catálogo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#ubicacion"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white hover:text-[#0A1226] text-white font-bold uppercase tracking-wider px-7 py-3.5 text-sm border border-white/25 transition-colors">
              Cómo llegar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideCarousel({ slides }: { slides: Slide[] }) {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function reset() {
    if (timer.current) clearInterval(timer.current);
    if (slides.length < 2) return;
    timer.current = setInterval(() => advance('next'), 6000);
  }
  function advance(dir: 'prev' | 'next') {
    setIdx((c) => (dir === 'next' ? (c + 1) % slides.length : (c - 1 + slides.length) % slides.length));
    setKey((k) => k + 1);
  }
  useEffect(() => {
    reset();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const slide = slides[idx];

  return (
    <>
      <style>{ANIM}</style>
      <div className="relative w-full overflow-hidden min-h-[520px] lg:min-h-[640px]">
        {/* Fotos de fondo, en crossfade simple */}
        {slides.map((s, i) => (
          <div key={s.id} className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 10 : 0 }}>
            <Image src={s.image} alt={s.title} fill priority={i === 0} sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1226]/95 via-[#0A1226]/65 to-[#0A1226]/15" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A1226]/80 via-transparent to-transparent lg:hidden" />

        {/* Texto, integrado sobre la foto */}
        <div className="relative z-20 flex flex-col justify-end lg:justify-center h-full min-h-[520px] lg:min-h-[640px] px-6 sm:px-8 lg:px-16 py-16 lg:py-[100px]">
          <div key={`t${key}`} className="max-w-[640px]">
            {slide.eyebrow && (
              <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                {slide.eyebrow}
              </span>
            )}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {slide.title}
            </h2>
            {slide.price !== undefined && (
              <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                ${slide.price.toLocaleString('es-AR')}
              </p>
            )}
            {slide.ctaLink && (
              <Link href={slide.ctaLink} className={buttonClasses({ variant: 'tactile-red', size: 'lg', className: 'mt-8' })}>
                {slide.ctaText || 'Ver más'} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Flechas */}
        {slides.length > 1 && (
          <>
            <button onClick={() => { advance('prev'); reset(); }} aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center hover:bg-black/70 transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => { advance('next'); reset(); }} aria-label="Siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center hover:bg-black/70 transition">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots + barra progreso */}
        {slides.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setIdx(i); setKey((k) => k + 1); reset(); }}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === idx ? 24 : 8, background: i === idx ? '#f59e0b' : 'rgba(255,255,255,0.35)' }} />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
              <div key={key} className="bar h-full bg-amber-500" />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function Hero({ promotions }: { promotions: Promotion[] }) {
  if (promotions.length > 0) {
    const slides: Slide[] = promotions
      .filter((p) => p.image_url)
      .map((p) => ({
        id: p.id,
        image: p.image_url!,
        eyebrow: p.subtitle || undefined,
        title: p.title,
        ctaLink: p.cta_link || undefined,
        ctaText: 'Ver más',
      }));
    if (slides.length > 0) return <SlideCarousel slides={slides} />;
  }

  return <StaticFallback />;
}
