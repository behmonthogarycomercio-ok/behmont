import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import { getCategories, getProductsByCategory, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [settings, categories, { category, products }] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProductsByCategory(params.slug),
  ]);

  if (!category) notFound();

  return (
    <>
      <Navbar categories={categories} />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
          <h1 className="font-display text-3xl font-bold text-steel-900">{category.name}</h1>
          <p className="text-steel-500 text-sm mt-1">{products.length} productos</p>
        </div>
        <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} />
      </main>
      <Footer
        whatsappNumber={settings.whatsappNumber}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={settings.contactAddress}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        mlStoreUrl={settings.mlStoreUrl}
      />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
