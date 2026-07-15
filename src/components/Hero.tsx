'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Promotion } from '@/lib/types';

/* ─── Keyframes inyectados una sola vez ─────────────────────── */
const CSS = `
@keyframes kenburns {
  0%   { transform: scale(1)    translate(0, 0); }
  100% { transform: scale(1.12) translate(-2%, -1%); }
}
@keyframes kenburns-alt {
  0%   { transform: scale(1)    translate(0, 0); }
  100% { transform: scale(1.12) translate(2%, 1%); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1;   }
}
.hero-img-active  { animation: kenburns     8s ease-out forwards; }
.hero-img-alt     { animation: kenburns-alt 8s ease-out forwards; }
.hero-text-active { animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
`;

function HeroFallback() {
  return (
    <div className="relative w-full overflow-hidden min-h-[360px] sm:min-h-[480px] flex items-center"
         style={{ background: 'linear-gradient(135deg, #0f1b35 0%, #1a2d54 50%, #0f1b35 100%)' }}>
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.07]"
           style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)' }} />
      {/* Glow orbs */}
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
      <div className="absolute top-10 right-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl" style={{ animation: 'shimmer 6s ease-in-out infinite 2s' }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-12 py-16" style={{ animation: 'slideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards' }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400 mb-4">
          Concordia · Entre Ríos · Desde 1995
        </p>
        <h1 className="font-display text-5xl sm:text-7xl font-bold text-white leading-none tracking-tighter">
          Equipamiento<br />
          <span className="text-amber-400">comercial</span> y de hogar
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="h-1 w-14 rounded-full bg-amber-500" />
          <span className="h-px flex-1 max-w-[80px] bg-white/10" />
        </div>
        <p className="mt-5 text-white/60 text-sm sm:text-lg max-w-md leading-relaxed">
          Gastronomía, barbería, hogar, electrónica y más.
          Financiación diaria · Factura A y B.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/buscar"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-400 active:scale-[0.97]">
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
  const [animKey, setAnimKey]  = useState(0); // reinicia animación al cambiar slide
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const items = promotions.length > 0 ? promotions : null;

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!items || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
      setAnimKey((k) => k + 1);
    }, 6000);
  }

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [promotions.length]);

  function go(dir: 'prev' | 'next') {
    if (!items) return;
    setCurrent((c) => dir === 'next' ? (c + 1) % items.length : (c - 1 + items.length) % items.length);
    setAnimKey((k) => k + 1);
    resetTimer();
  }

  if (!items) return (
    <>
      <style>{CSS}</style>
      <HeroFallback />
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="relative w-full overflow-hidden bg-steel-950 min-h-[320px] sm:min-h-[480px]">

        {/* ── Slides ────────────────────────────────────────────── */}
        {items.map((promo, i) => {
          const isActive = i === current;
          const isAlt    = i % 2 === 1;
          return (
            <div
              key={promo.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 10 : 0 }}
            >
              {promo.image_url && (
                <Image
                  src={promo.image_url}
                  alt={promo.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={`object-cover ${isActive ? (isAlt ? 'hero-img-alt' : 'hero-img-active') : ''}`}
                  key={isActive ? `img-${animKey}` : `img-static-${i}`}
                />
              )}
              {/* Gradient overlay — izquierda fuerte, derecha desvanece */}
              <div className="absolute inset-0"
                   style={{ background: 'linear-gradient(to right, rgba(11,18,32,0.88) 0%, rgba(11,18,32,0.5) 45%, rgba(11,18,32,0.1) 100%)' }} />
              {/* Gradient inferior */}
              <div className="absolute inset-x-0 bottom-0 h-32"
                   style={{ background: 'linear-gradient(to top, rgba(11,18,32,0.7), transparent)' }} />

              {/* Contenido de texto */}
              {isActive && (
                <div className="relative z-10 flex min-h-[320px] sm:min-h-[480px] items-center">
                  <div
                    key={`text-${animKey}`}
                    className="hero-text-active mx-auto w-full max-w-7xl px-6 sm:px-12 py-14"
                  >
                    {promo.subtitle && (
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400 mb-3">
                        {promo.subtitle}
                      </p>
                    )}
                    <h2 className="font-display text-4xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-2xl">
                      {promo.title}
                    </h2>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="h-1 w-14 rounded-full bg-amber-500" />
                    </div>
                    {promo.cta_link && (
                      <Link
                        href={promo.cta_link}
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-400 active:scale-[0.97]"
                      >
                        Ver más <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Flechas ───────────────────────────────────────────── */}
        {items.length > 1 && (
          <>
            <button onClick={() => go('prev')} aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-110 active:scale-95">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go('next')} aria-label="Siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-110 active:scale-95">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* ── Dots + contador ───────────────────────────────────── */}
        {items.length > 1 && (
          <div className="absolute bottom-5 z-20 w-full flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setAnimKey((k) => k + 1); resetTimer(); }}
                aria-label={`Slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '28px' : '8px',
                  background: i === current ? '#f59e0b' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        )}

        {/* ── Barra de progreso ─────────────────────────────────── */}
        {items.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] z-20 bg-white/10">
            <div
              key={`bar-${animKey}`}
              className="h-full bg-amber-500"
              style={{ animation: 'progress 6s linear forwards' }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  );
}
