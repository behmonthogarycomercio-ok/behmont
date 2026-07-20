import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousel';
import type { Product } from '@/lib/types';

export default function ProductGrid({
  title,
  products,
  whatsappNumber,
}: {
  title?: string;
  products: Product[];
  whatsappNumber: string;
}) {
  if (products.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {title && <h2 className="font-display text-xl font-semibold text-steel-900 mb-5">{title}</h2>}
        <p className="text-steel-500 text-sm">No hay productos disponibles por el momento.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
      {title && (
        <div className="mb-6">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-steel-400 mb-1">
            Selección destacada
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-900 tracking-tight">{title}</h2>
        </div>
      )}
      <ProductCarousel>
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]">
            <ProductCard product={product} whatsappNumber={whatsappNumber} />
          </div>
        ))}
      </ProductCarousel>
    </section>
  );
}
