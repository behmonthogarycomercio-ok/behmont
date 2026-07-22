import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getProductsByCategory, getSiteSettings } from '@/lib/data';
import { SUBCATEGORIES } from '@/lib/subcategories';
import { applyProductFilters, getAvailableBrands } from '@/lib/product-filters';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { category } = await getProductsByCategory(params.slug);
  if (!category) return {};
  const description = `Comprá ${category.name} en BEHMONT, Concordia. Stock disponible, financiación y envíos por Andreani.`;
  return {
    title: `${category.name} | BEHMONT`,
    description,
    openGraph: {
      title: `${category.name} | BEHMONT`,
      description,
      ...(category.icon_url && { images: [{ url: category.icon_url, alt: category.name }] }),
      type: 'website',
      locale: 'es_AR',
      siteName: 'BEHMONT — Comercio y Hogar',
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    sub?: string;
    marca?: string;
    precioMin?: string;
    precioMax?: string;
    oferta?: string;
    stock?: string;
    orden?: string;
  };
}) {
  const [settings, { category, products: allProducts }] = await Promise.all([
    getSiteSettings(),
    getProductsByCategory(params.slug),
  ]);

  if (!category) notFound();

  const subcategories = SUBCATEGORIES[category.slug] ?? [];
  const activeSub = subcategories.find((s) => s.keyword === searchParams.sub);
  const subFiltered = activeSub
    ? allProducts.filter((p) => p.name.toLowerCase().includes(activeSub.keyword))
    : allProducts;

  const brands = getAvailableBrands(subFiltered);
  const products = applyProductFilters(subFiltered, searchParams);

  return (
    <main>
      {/* Category header */}
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-11">
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
                {activeSub && ` en "${activeSub.name}"`}
              </p>
            </div>
          </div>

          {subcategories.length > 0 && (
            <div className="mt-8 flex gap-3 overflow-x-auto pb-1">
              {subcategories.map((sub) => {
                const isActive = sub.keyword === searchParams.sub;
                return (
                  <Link
                    key={sub.keyword}
                    href={isActive ? `/categoria/${category.slug}` : `/categoria/${category.slug}?sub=${sub.keyword}`}
                    className={clsx(
                      'group relative shrink-0 overflow-hidden rounded-xl border w-[120px] sm:w-[140px]',
                      isActive ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-plate-200'
                    )}
                    style={{ aspectRatio: '4 / 3' }}
                  >
                    <Image src={sub.image} alt={sub.name} fill sizes="140px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950/85 via-steel-950/10 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-2.5 text-xs font-bold uppercase text-white leading-tight">
                      {sub.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <ProductFilters brands={brands} />
        </div>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold text-steel-400">
            {activeSub
              ? `No hay productos en "${activeSub.name}" con estos filtros.`
              : 'No hay productos con estos filtros.'}
          </p>
          <Link
            href={activeSub ? `/categoria/${category.slug}?sub=${activeSub.keyword}` : `/categoria/${category.slug}`}
            className="mt-6 inline-block text-sm font-semibold text-amber-600 hover:text-amber-700"
          >
            Limpiar filtros →
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-[100px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[22px]">
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
