import ProductCard from './ProductCard';
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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {title && (
        <div className="mb-5">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-steel-400 mb-1">
            Selección destacada
          </p>
          <h2 className="font-display text-xl font-semibold text-steel-900">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
        ))}
      </div>
    </section>
  );
}
