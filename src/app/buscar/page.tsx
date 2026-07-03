import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import { getCategories, getSiteSettings, searchProducts } from '@/lib/data';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim() || '';
  const [settings, categories, products] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    q ? searchProducts(q) : Promise.resolve([]),
  ]);

  return (
    <>
      <Navbar categories={categories} />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
          <h1 className="font-display text-2xl font-bold text-steel-900">
            Resultados para "{q}"
          </h1>
        </div>
        <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} />
      </main>
      <Footer whatsappNumber={settings.whatsappNumber} />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
