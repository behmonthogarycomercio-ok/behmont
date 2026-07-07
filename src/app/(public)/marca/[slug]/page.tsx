import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getProductsByBrand, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { brand } = await getProductsByBrand(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} | BEHMONT`,
    description: `Productos ${brand.name} en BEHMONT, Concordia. Stock disponible, financiación y envíos a todo el país.`,
  };
}

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const [settings, { brand, products }] = await Promise.all([
    getSiteSettings(),
    getProductsByBrand(params.slug),
  ]);

  if (!brand) notFound();

  return (
    <main>
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-7 pb-8">
          <Breadcrumbs
            items={[{ label: 'Inicio', href: '/' }, { label: brand.name }]}
          />
          <div className="flex items-end gap-5">
            {brand.logo_url && (
              <span className="relative h-12 w-24 shrink-0 overflow-hidden rounded-lg border border-plate-200 bg-white">
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  fill
                  className="object-contain p-2"
                />
              </span>
            )}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight leading-tight">
                {brand.name}
              </h1>
              <p className="mt-1 font-mono text-[11px] text-steel-400 uppercase tracking-wide">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold text-steel-400">
            No hay productos de esta marca por el momento.
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
