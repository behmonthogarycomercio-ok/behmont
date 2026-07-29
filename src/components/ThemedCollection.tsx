import Image from 'next/image';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousel';
import type { Product } from '@/lib/types';

const CUOTAS = 3;

export default function ThemedCollection({
  eyebrow,
  title,
  products,
  whatsappNumber,
  promoImage,
}: {
  eyebrow?: string;
  title: string;
  products: Product[];
  whatsappNumber: string;
  /** Reemplaza el tile de "Hasta N cuotas" calculado por una imagen ya diseñada (formato vertical). */
  promoImage?: string;
}) {
  if (products.length === 0) return null;

  const maxDiscountPct = Math.max(
    0,
    ...products.map((p) =>
      p.compare_at_price && p.compare_at_price > p.price
        ? Math.round(100 - (p.price / p.compare_at_price) * 100)
        : 0
    )
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-10">
      <div className="mb-6">
        {eyebrow && (
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-600 mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex gap-5">
        {promoImage ? (
          <div className="hidden lg:block shrink-0 w-[170px] relative rounded-xl2 overflow-hidden">
            <Image src={promoImage} alt={title} width={170} height={302} className="h-full w-full object-cover" />
          </div>
        ) : (
        <div className="hidden lg:flex shrink-0 w-[170px] flex-col items-center justify-center gap-1 rounded-xl2 bg-steel-950 text-white p-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-wide text-amber-400">Hasta</p>
          <p className="font-display text-3xl font-black leading-none">
            {CUOTAS}<span className="text-sm font-semibold"> cuotas</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/50 mb-2">sin interés</p>
          {maxDiscountPct > 0 && (
            <>
              <div className="h-px w-full bg-white/10 my-1" />
              <p className="font-mono text-[11px] uppercase tracking-wide text-amber-400">Hasta</p>
              <p className="font-display text-3xl font-black leading-none">
                {maxDiscountPct}<span className="text-lg">%</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-white/50">OFF</p>
            </>
          )}
          <p className="text-[10px] text-white/40 mt-3 leading-snug">En productos seleccionados</p>
        </div>
        )}

        <div className="flex-1 min-w-0">
          <ProductCarousel>
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]">
                <ProductCard product={product} whatsappNumber={whatsappNumber} />
              </div>
            ))}
          </ProductCarousel>
        </div>
      </div>
    </section>
  );
}
