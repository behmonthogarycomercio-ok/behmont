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
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-500">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-white leading-tight">Ofertas Flash</h2>
              <p className="text-xs text-plate-100/70">Precios especiales por tiempo limitado</p>
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
