import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import ProductActions from '@/components/ProductActions';
import ProductGallery from '@/components/ProductGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGrid from '@/components/ProductGrid';
import { getProductBySlug, getRelatedProducts, getSiteSettings } from '@/lib/data';
import { getProductCode } from '@/lib/product-display';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const description = `${product.name}${product.brand ? ` — ${product.brand.name}` : ''}. Consultá precio y stock en BEHMONT, Concordia. Financiación diaria y envíos por Andreani.`;
  const image = product.images?.[0];
  return {
    title: `${product.name} | BEHMONT`,
    description,
    openGraph: {
      title: product.name,
      description,
      ...(image && { images: [{ url: image, width: 800, height: 800, alt: product.name }] }),
      type: 'website',
      locale: 'es_AR',
      siteName: 'BEHMONT — Comercio y Hogar',
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [settings, product] = await Promise.all([
    getSiteSettings(),
    getProductBySlug(params.slug),
  ]);

  if (!product) notFound();

  const related = product.category_id
    ? await getRelatedProducts(product.category_id, product.id)
    : [];

  const discountPct =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(100 - (product.price / product.compare_at_price) * 100)
      : null;

  const code = getProductCode(product);
  const filteredSpecs = product.specs?.filter(
    (s) => s.label.trim().toLowerCase() !== 'sku'
  ) ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? undefined,
    image: product.images,
    sku: product.sku,
    ...(product.brand && { brand: { '@type': 'Brand', name: product.brand.name } }),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'BEHMONT' },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-7">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            ...(product.category
              ? [{ label: product.category.name, href: `/categoria/${product.category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      {/* Product layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 grid gap-10 md:gap-16 md:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        {/* Right panel */}
        <div className="flex flex-col">
          {/* Brand + code */}
          <div className="flex items-center justify-between gap-3">
            {product.brand && (
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-400">
                {product.brand.name}
              </span>
            )}
            {code && (
              <span className="font-mono text-[11px] text-steel-300">
                {code}
              </span>
            )}
          </div>

          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-steel-950 leading-tight tracking-tight">
            {product.name}
          </h1>

          {/* Price block */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display font-bold text-4xl text-steel-950 tracking-tight">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {discountPct && product.compare_at_price && (
              <>
                <span className="text-steel-350 line-through text-lg">
                  ${product.compare_at_price.toLocaleString('es-AR')}
                </span>
                <span className="-rotate-1 rounded bg-amber-500 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                  {discountPct}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-2">
            {product.stock > 0 ? (
              product.stock <= 3 ? (
                <span className="font-mono text-[11px] font-semibold text-amber-700">
                  ¡Últimas {product.stock} unidades!
                </span>
              ) : (
                <span className="font-mono text-[11px] font-semibold text-success-600">
                  En stock · {product.stock} unidades
                </span>
              )
            ) : (
              <span className="font-mono text-[11px] font-semibold text-danger-600">Sin stock</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-5 text-steel-600 leading-relaxed text-sm whitespace-pre-line border-t border-plate-200 pt-5">
              {product.description}
            </p>
          )}

          {/* CTA actions */}
          <ProductActions product={product} whatsappNumber={settings.whatsappNumber} />

          {/* Trust strip */}
          <div className="mt-5 grid grid-cols-3 gap-px bg-plate-200 rounded-xl overflow-hidden text-center">
            <div className="bg-plate-50 px-3 py-3">
              <p className="font-mono text-[10px] font-semibold text-steel-700 leading-tight">Envíos</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">por Andreani</p>
            </div>
            <div className="bg-plate-50 px-3 py-3">
              <p className="font-mono text-[10px] font-semibold text-steel-700 leading-tight">Retirá</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">en local</p>
            </div>
            <div className="bg-plate-50 px-3 py-3">
              <p className="font-mono text-[10px] font-semibold text-steel-700 leading-tight">Factura</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">A y B</p>
            </div>
          </div>

          {/* ML link */}
          {product.ml_permalink && (
            <a
              href={product.ml_permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 font-mono text-[11px] text-steel-400 hover:text-steel-700 transition-colors"
            >
              Ver en MercadoLibre →
            </a>
          )}
        </div>
      </div>

      {/* Specs */}
      {filteredSpecs.length > 0 && (
        <div className="border-t border-plate-200 bg-plate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
            <h2 className="font-display text-xl font-bold text-steel-950 tracking-tight mb-6">
              Características técnicas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-plate-200 rounded-xl overflow-hidden">
              {filteredSpecs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-6 px-5 py-3.5 bg-white border-b border-plate-200 last:border-b-0 even:sm:border-l"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide text-steel-400 shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-sm font-semibold text-steel-900 text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <ProductGrid
          title="También te puede interesar"
          products={related}
          whatsappNumber={settings.whatsappNumber}
        />
      )}

      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
