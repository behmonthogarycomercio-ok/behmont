import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Promotion } from '@/lib/types';

export default function PromoStrip({ promotions }: { promotions: Promotion[] }) {
  if (promotions.length === 0) return null;

  const [first, second] = promotions;

  return (
    <section className="bg-steel-950">
      {/* Primera promo — full-bleed split layout */}
      <Link
        href={first.cta_link || '#'}
        className="group relative flex min-h-[420px] sm:min-h-[480px] items-end sm:items-center overflow-hidden"
      >
        {first.image_url && (
          <>
            <Image
              src={first.image_url}
              alt={first.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/70 to-steel-950/10" />
          </>
        )}
        {!first.image_url && (
          <div className="absolute inset-0 bg-steel-900" />
        )}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 sm:px-14 py-12 sm:py-0">
          {first.subtitle && (
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400">
              {first.subtitle}
            </p>
          )}
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold text-white leading-none tracking-tighter max-w-xl">
            {first.title}
          </h2>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow transition group-hover:bg-amber-600">
            {first.cta_text || 'Ver productos'} <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Segunda promo — compacta con borde superior */}
      {second && (
        <Link
          href={second.cta_link || '#'}
          className="group relative flex min-h-[240px] items-center overflow-hidden border-t border-white/10"
        >
          {second.image_url && (
            <>
              <Image
                src={second.image_url}
                alt={second.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-steel-950/90 via-steel-950/60 to-transparent" />
            </>
          )}
          {!second.image_url && (
            <div className="absolute inset-0 bg-steel-900" />
          )}

          <div className="relative z-10 mx-auto w-full max-w-7xl px-8 sm:px-14 py-10">
            {second.subtitle && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
                {second.subtitle}
              </p>
            )}
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight max-w-lg">
              {second.title}
            </h3>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition group-hover:text-white">
              {second.cta_text || 'Ver productos'} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      )}
    </section>
  );
}
