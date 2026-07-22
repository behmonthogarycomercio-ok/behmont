'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { buttonClasses } from '@/components/ui/Button';
import type { Product } from '@/lib/types';

export default function BusinessSection({ products }: { products: Product[] }) {
  const items = products.filter((p) => p.images?.[0]).slice(0, 8);
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (items.length < 2) return;
    timer.current = setInterval(() => setIdx((i) => { setKey((k) => k + 1); return (i + 1) % items.length; }), 4500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[idx];

  return (
    <section className="relative w-full overflow-hidden min-h-[620px] lg:min-h-[780px]">
      {/* Fotos de producto de fondo, en crossfade */}
      {items.map((p, i) => (
        <div key={p.id} className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 10 : 0 }}>
          <Image src={p.images![0]} alt={p.name} fill priority={i === 0} sizes="100vw"
            className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-steel-950/95 via-steel-950/70 to-steel-950/25" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-steel-950/85 via-transparent to-transparent lg:hidden" />

      {/* Texto, integrado sobre la foto */}
      <div className="relative z-20 flex flex-col justify-end lg:justify-center h-full min-h-[620px] lg:min-h-[780px] px-6 sm:px-8 lg:px-16 py-16">
        <div key={`t${key}`} className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">
            Equipamos tu negocio
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-4">
            Todo lo que tu comercio necesita, en un solo lugar.
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md mb-8">
            Gastronomía, panadería, carnicería, peluquería, frío comercial y almacén. Stock real y
            financiación propia para equipar tu local de punta a punta.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/producto/${current.slug}`} className={buttonClasses({ variant: 'tactile-red', size: 'lg', className: 'rounded-full' })}>
              Ver {current.name.length > 28 ? `${current.name.slice(0, 28)}…` : current.name} <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-white font-bold text-lg">
              ${current.price.toLocaleString('es-AR')}
            </span>
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-2 mt-8">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIdx(i); setKey((k) => k + 1); }}
                  aria-label={`Ver producto ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 24 : 8,
                    background: i === idx ? '#ED3237' : 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
