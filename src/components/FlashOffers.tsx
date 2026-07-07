import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
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
    <section className="bg-steel-900 py-10">
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
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">Ofertas Flash</h2>
            </div>
          </div>
          <Link
            href="/ofertas"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
          ))}
        </div>
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
