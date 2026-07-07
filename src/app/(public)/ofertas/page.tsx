import ProductCard from '@/components/ProductCard';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getDiscountedProducts, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export default async function OfertasPage() {
  const [settings, products] = await Promise.all([
    getSiteSettings(),
    getDiscountedProducts(),
  ]);

  return (
    <main>
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-7 pb-8">
          <Breadcrumbs
            items={[{ label: 'Inicio', href: '/' }, { label: 'Ofertas' }]}
          />
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight leading-tight">
                Ofertas
              </h1>
              <p className="mt-1 font-mono text-[11px] text-steel-400 uppercase tracking-wide">
                {products.length} {products.length === 1 ? 'producto' : 'productos'} con descuento
              </p>
            </div>
            <span className="-rotate-1 rounded bg-amber-500 px-3 py-1 font-mono text-[11px] font-bold text-white shrink-0">
              % OFF
            </span>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold text-steel-400">
            No hay ofertas activas por el momento.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        </div>
      )}

      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
