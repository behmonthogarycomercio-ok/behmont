import Link from 'next/link';
import Image from 'next/image';
import type { Promotion } from '@/lib/types';

export default function Hero({ promotions }: { promotions: Promotion[] }) {
  if (promotions.length === 0) return null;
  const [main, ...rest] = promotions;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <Link
          href={main.cta_link || '#'}
          className="group relative overflow-hidden rounded-xl2 bg-steel-900 min-h-[260px] flex items-end"
        >
          {main.image_url && (
            <Image
              src={main.image_url}
              alt={main.title}
              fill
              priority
              className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="relative z-10 p-6 sm:p-8">
            <span className="badge-plate inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white mb-3">
              Destacado
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-white max-w-md leading-tight">
              {main.title}
            </h1>
            {main.subtitle && (
              <p className="mt-2 text-plate-100 max-w-sm text-sm sm:text-base">{main.subtitle}</p>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-3">
          {rest.slice(0, 2).map((promo) => (
            <Link
              key={promo.id}
              href={promo.cta_link || '#'}
              className="group relative flex-1 overflow-hidden rounded-xl2 bg-steel-800 min-h-[120px] flex items-center px-6"
            >
              {promo.image_url && (
                <Image
                  src={promo.image_url}
                  alt={promo.title}
                  fill
                  className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="relative z-10">
                <h2 className="font-display font-semibold text-white text-lg">{promo.title}</h2>
                {promo.subtitle && <p className="text-plate-100 text-xs mt-1">{promo.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
