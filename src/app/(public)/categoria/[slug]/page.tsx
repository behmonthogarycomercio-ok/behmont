import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getProductsByCategory, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [settings, { category, products }] = await Promise.all([
    getSiteSettings(),
    getProductsByCategory(params.slug),
  ]);

  if (!category) notFound();

  return (
    <main>
      {/* Category header */}
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-7 pb-8">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: category.name },
            ]}
          />
          <div className="flex items-end gap-5">
            {category.icon_url && (
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-plate-200 bg-plate-50">
                <Image src={category.icon_url} alt={category.name} fill className="object-cover" />
              </span>
            )}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight leading-tight">
                {category.name}
              </h1>
              <p className="mt-1 font-mono text-[11px] text-steel-400 uppercase tracking-wide">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold text-steel-400">
            No hay productos en esta categoría por el momento.
          </p>
          <Link
            href="/buscar"
            className="mt-6 inline-block text-sm font-semibold text-amber-600 hover:text-amber-700"
          >
            Ver todo el catálogo →
          </Link>
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
