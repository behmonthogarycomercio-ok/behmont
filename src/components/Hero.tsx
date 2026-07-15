'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Promotion } from '@/lib/types';

const ANIM = `
  @keyframes kb { from { transform: scale(1) translate(0,0); } to { transform: scale(1.08) translate(-1.5%,-0.8%); } }
  @keyframes kb2 { from { transform: scale(1) translate(0,0); } to { transform: scale(1.08) translate(1.5%,0.8%); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes bar { from { width:0 } to { width:100% } }
  .kb  { animation: kb  7s ease-out forwards; }
  .kb2 { animation: kb2 7s ease-out forwards; }
  .fu  { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) forwards; }
  .bar { animation: bar 6s linear forwards; }
`;

function Fallback() {
  return (
    <div className="w-full bg-[#0B1C3A] flex flex-col md:flex-row min-h-[400px] sm:min-h-[480px] overflow-hidden">
      {/* Texto */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-14 z-10 max-w-2xl">
        <span className="inline-flex items-center mb-6 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full w-fit">
          Concordia, Entre Ríos · Desde 1995
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white leading-[0.98] tracking-tight">
          Equipamiento para cada rincón<br />
          <span className="text-amber-400">del negocio.</span>
        </h1>
        <p className="mt-6 text-white/55 text-base sm:text-lg max-w-md leading-relaxed">
          Gastronomía, hogar, barbería y electrónica. Financiación propia y stock real, actualizado todos los días.
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Link href="/buscar"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:to-amber-600 text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_20px_-6px_rgba(237,50,55,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-px active:scale-[.98]">
            Ver catálogo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#ubicacion"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-full text-sm border border-white/15 transition-colors">
            Cómo llegar
          </Link>
        </div>
      </div>
      {/* Foto real del local */}
      <div className="hidden md:block flex-1 relative overflow-hidden">
        <Image src="/images/hero-local.jpg" alt="Local BEHMONT" fill sizes="50vw"
          className="object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(11,28,58,0.55) 0%,rgba(11,28,58,0.05) 100%)' }} />
      </div>
    </div>
  );
}

export default function Hero({ promotions }: { promotions: Promotion[] }) {
  const [idx, setIdx]     = useState(0);
  const [key, setKey]     = useState(0);
  const timer             = useRef<ReturnType<typeof setInterval> | null>(null);
  const items             = promotions.length > 0 ? promotions : null;

  function reset() {
    if (timer.current) clearInterval(timer.current);
    if (!items || items.length < 2) return;
    timer.current = setInterval(() => advance('next'), 6000);
  }
  function advance(dir: 'prev' | 'next') {
    setIdx(c => dir === 'next' ? (c + 1) % items!.length : (c - 1 + items!.length) % items!.length);
    setKey(k => k + 1);
  }
  useEffect(() => { reset(); return () => { if (timer.current) clearInterval(timer.current); }; }, [promotions.length]);

  if (!items) return <><style>{ANIM}</style><Fallback /></>;

  const slide = items[idx];

  return (
    <>
      <style>{ANIM}</style>
      <div className="relative w-full bg-[#0B1C3A] overflow-hidden" style={{ minHeight: 'clamp(300px, 45vw, 520px)' }}>

        {/* Slides */}
        {items.map((p, i) => (
          <div key={p.id} className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 10 : 0 }}>
            {p.image_url && (
              <Image src={p.image_url} alt={p.title} fill priority={i === 0} sizes="100vw"
                className={`object-cover ${i === idx ? (i % 2 === 0 ? 'kb' : 'kb2') : ''}`}
                key={i === idx ? `${key}` : `s${i}`}
              />
            )}
            {/* Overlay: negro izquierda, transparente derecha */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg,rgba(11,28,58,.9) 0%,rgba(11,28,58,.5) 40%,rgba(11,28,58,.05) 100%)' }} />
          </div>
        ))}

        {/* Contenido activo */}
        <div className="relative z-20 flex h-full items-center" style={{ minHeight: 'clamp(300px, 45vw, 520px)' }}>
          <div key={`t${key}`} className="fu mx-auto w-full max-w-7xl px-6 sm:px-12 py-14">
            {slide.subtitle && (
              <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                {slide.subtitle}
              </span>
            )}
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white leading-tight max-w-2xl tracking-tight">
              {slide.title}
            </h2>
            {slide.cta_link && (
              <Link href={slide.cta_link}
                className="mt-8 inline-flex items-center gap-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:to-amber-600 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_20px_-6px_rgba(237,50,55,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-px active:scale-[.98]">
                Ver más <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Flechas */}
        {items.length > 1 && (
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
        {items.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => { setIdx(i); setKey(k=>k+1); reset(); }}
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
