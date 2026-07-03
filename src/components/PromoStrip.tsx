import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Promotion } from '@/lib/types';

export default function PromoStrip({ promotions }: { promotions: Promotion[] }) {
  if (promotions.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid gap-4 sm:grid-cols-2">
      {promotions.map((promo) => (
        <Link
          key={promo.id}
          href={promo.cta_link || '#'}
          className="group relative overflow-hidden rounded-xl2 bg-plate-100 min-h-[180px] flex items-center px-6"
        >
          {promo.image_url && (
            <Image
              src={promo.image_url}
              alt={promo.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="relative z-10 max-w-[70%] bg-white/90 rounded-lg p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-600">
              {promo.subtitle}
            </p>
            <h3 className="font-display font-bold text-steel-900 text-lg leading-tight mt-1">
              {promo.title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white bg-steel-900 rounded-full px-3 py-1.5">
              {promo.cta_text || 'Ver productos'} <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
