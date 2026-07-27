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
        className="w-full bg-steel-950 text-amber-400 text-[11px] font-mono font-semibold uppercase tracking-wide py-1.5 flex items-center justify-center gap-1.5 hover:bg-steel-900 transition-colors"
      >
        <Flame className="h-3.5 w-3.5" /> Oferta bomba: termina en {countdown}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="bg-steel-950 text-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2 flex items-center gap-3 sm:gap-5">
        <Link href={`/producto/${product.slug}`} className="flex items-center gap-3 min-w-0 flex-1 sm:flex-none sm:w-[320px]">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-md bg-white/10 overflow-hidden">
            {product.images?.[0] && (
              <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-contain p-1" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-tight truncate">{product.name}</p>
            <p className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-bold text-amber-400">${formatPrice(product.price)}</span>
              {discountPct !== null && (
                <>
                  <span className="text-[10px] font-medium text-white/40 line-through">
                    ${formatPrice(product.compare_at_price!)}
                  </span>
                  <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {discountPct}% OFF
                  </span>
                </>
              )}
            </p>
          </div>
        </Link>

        <div className="hidden sm:flex flex-1 items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-amber-400">
            <Flame className="h-3.5 w-3.5" /> Oferta bomba · termina en
          </span>
          <span className="font-mono text-lg font-bold tabular-nums tracking-wider">{countdown}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
          <Link
            href={`/producto/${product.slug}`}
            className="rounded-full bg-amber-500 hover:bg-amber-400 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold text-white transition-colors whitespace-nowrap"
          >
            Llevalo hoy
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Minimizar oferta bomba"
            className="hidden sm:grid h-7 w-7 place-items-center rounded-full hover:bg-white/10 text-white/60 transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cuenta regresiva — fila propia en mobile por espacio */}
      <div className="sm:hidden border-t border-white/10 px-3 py-1.5 flex items-center justify-center gap-2">
        <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wide text-amber-400">
          <Flame className="h-3 w-3" /> Termina en
        </span>
        <span className="font-mono text-sm font-bold tabular-nums">{countdown}</span>
      </div>
    </div>
  );
}
