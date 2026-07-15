import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousel';
import type { Product } from '@/lib/types';

export default function FlashOffers({
  products,
  whatsappNumber,
}: {
  products: Product[];
  whatsappNumber: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="bg-steel-900 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-5 border-b border-dashed border-white/15">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 -rotate-6 place-items-center rounded-md bg-amber-500 shadow-lg">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </span>
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/90">
                Tiempo limitado
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">Ofertas Flash</h2>
            </div>
          </div>
          <Link
            href="/ofertas"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductCarousel>
          {products.slice(0, 12).map((product) => (
            <div key={product.id} className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]">
              <ProductCard product={product} whatsappNumber={whatsappNumber} />
            </div>
          ))}
        </ProductCarousel>
        <Link
          href="/ofertas"
          className="sm:hidden mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-400"
        >
          Ver todas las ofertas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
