import ProductGrid from '@/components/ProductGrid';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import { getDiscountedProducts, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export default async function OfertasPage() {
  const [settings, products] = await Promise.all([
    getSiteSettings(),
    getDiscountedProducts(),
  ]);

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        <h1 className="font-display text-3xl font-bold text-steel-900">Ofertas</h1>
        <p className="text-steel-500 text-sm mt-1">{products.length} productos con descuento</p>
      </div>
      <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
