'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Flame } from 'lucide-react';
import { formatPrice } from '@/lib/price';
import type { Product } from '@/lib/types';

// La oferta bomba "dura 24 horas": la cuenta regresiva apunta siempre a
// la medianoche local, así que se reinicia sola todos los días sin
// necesidad de guardar una fecha de fin en la base.
function msUntilMidnight(): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function FlashOfferBar({ product }: { product: Product }) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setRemaining(msUntilMidnight());
    const id = setInterval(() => setRemaining(msUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const discountPct = product.compare_at_price
    ? Math.round(100 - (product.price / product.compare_at_price) * 100)
    : null;
  const countdown = remaining === null ? '--:--:--' : formatCountdown(remaining);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-white border-b border-plate-200 text-steel-950 text-xs font-mono font-bold uppercase tracking-wide py-2 flex items-center justify-center gap-2 hover:bg-plate-50 transition-colors"
      >
        <Flame className="h-4 w-4 text-amber-500" /> Oferta bomba: termina en {countdown}
        <ChevronDown className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="bg-white border-b border-plate-200 text-steel-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4 sm:gap-8">
        <Link href={`/producto/${product.slug}`} className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 sm:flex-none sm:w-[360px]">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl border border-plate-200 bg-plate-50 overflow-hidden">
            {product.images?.[0] && (
              <Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-contain p-1.5" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate text-steel-900">{product.name}</p>
            <p className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-lg sm:text-xl font-bold text-steel-950">${formatPrice(product.price)}</span>
              {discountPct !== null && (
                <>
                  <span className="text-xs font-medium text-steel-350 line-through">
                    ${formatPrice(product.compare_at_price!)}
                  </span>
                  <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {discountPct}% OFF
                  </span>
                </>
              )}
            </p>
          </div>
        </Link>

        <div className="hidden sm:flex flex-1 items-center justify-center gap-4">
          <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-amber-600">
            <Flame className="h-4 w-4" /> Oferta bomba · termina en
          </span>
          <span className="font-mono text-3xl font-black tabular-nums tracking-wider text-steel-950">{countdown}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
          <Link
            href={`/producto/${product.slug}`}
            className="rounded-full bg-amber-500 hover:bg-amber-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white transition-colors whitespace-nowrap shadow-sm"
          >
            Llevalo hoy
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Minimizar oferta bomba"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-full hover:bg-plate-100 text-steel-400 transition-colors"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Cuenta regresiva — fila propia en mobile por espacio */}
      <div className="sm:hidden border-t border-plate-200 px-4 py-2 flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-amber-600">
          <Flame className="h-3.5 w-3.5" /> Termina en
        </span>
        <span className="font-mono text-xl font-black tabular-nums text-steel-950">{countdown}</span>
      </div>
    </div>
  );
}
