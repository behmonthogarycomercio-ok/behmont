import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { getProductsByBrand, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const [settings, { brand, products }] = await Promise.all([
    getSiteSettings(),
    getProductsByBrand(params.slug),
  ]);

  if (!brand) notFound();

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        <h1 className="font-display text-3xl font-bold text-steel-900">{brand.name}</h1>
        <p className="text-steel-500 text-sm mt-1">{products.length} productos</p>
      </div>
      <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
