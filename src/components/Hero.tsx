import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Promotion } from '@/lib/types';

function HeroFallback() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
      <div className="relative overflow-hidden rounded-xl2 bg-steel-950 min-h-[300px] sm:min-h-[380px] flex items-center">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)',
          }}
        />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative z-10 px-8 sm:px-14 py-12 max-w-xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400">
            Concordia · Entre Ríos · Desde 1995
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-white leading-[1.05] tracking-tight">
            Equipamiento comercial y de hogar
          </h1>
          <span className="mt-4 block h-1 w-14 rounded-full bg-amber-500" />
          <p className="mt-4 text-plate-100/80 text-sm sm:text-base max-w-sm">
            Gastronomía, barbería, hogar, electrónica y más. Financiación diaria · Factura A y B.
          </p>
          <Link
            href="/buscar"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-amber-600 active:scale-[0.97]"
          >
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Hero({ promotions }: { promotions: Promotion[] }) {
  if (promotions.length === 0) return <HeroFallback />;
  const [main, ...rest] = promotions;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <Link
          href={main.cta_link || '#'}
          className="group relative overflow-hidden rounded-xl2 bg-steel-950 min-h-[300px] sm:min-h-[360px] flex items-end"
        >
          {main.image_url && (
            <Image
              src={main.image_url}
              alt={main.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/50 to-steel-950/5" />

          <span className="absolute right-5 top-5 z-10 rotate-3 rounded-md bg-amber-500 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg">
            Destacado
          </span>

          <div className="relative z-10 p-6 sm:p-9 max-w-lg">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400">
              Behmont · Concordia, Entre Ríos
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white leading-[1.05] tracking-tight">
              {main.title}
            </h1>
            <span className="mt-4 block h-1 w-14 rounded-full bg-amber-500" />
            {main.subtitle && (
              <p className="mt-3 text-plate-100/90 max-w-sm text-sm sm:text-base">{main.subtitle}</p>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-3">
          {rest.slice(0, 2).map((promo, i) => (
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-steel-900/85 via-steel-900/50 to-transparent" />
              <span className="absolute left-4 top-4 z-10 font-mono text-[11px] font-semibold text-amber-400/90">
                0{i + 1}
              </span>
              <div className="relative z-10">
                <h2 className="font-display font-semibold text-white text-lg leading-tight">{promo.title}</h2>
                {promo.subtitle && <p className="text-plate-100/80 text-xs mt-1">{promo.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
