import { notFound } from 'next/navigation';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import ProductActions from '@/components/ProductActions';
import ProductGallery from '@/components/ProductGallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGrid from '@/components/ProductGrid';
import { getProductBySlug, getRelatedProducts, getSiteSettings } from '@/lib/data';
import { getProductCode } from '@/lib/product-display';

export const revalidate = 60;

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

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-10 grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {product.brand && (
            <span className="text-xs font-semibold uppercase tracking-wide text-steel-500">
              {product.brand.name}
            </span>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 mt-1">
            {product.name}
          </h1>
          {code && <p className="text-sm text-steel-500 mt-1">Código: {code}</p>}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display font-bold text-3xl text-steel-950">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {discountPct && (
              <>
                <span className="text-steel-400 line-through text-lg">
                  ${product.compare_at_price!.toLocaleString('es-AR')}
                </span>
                <span className="rounded-full bg-amber-500 text-white text-xs font-bold px-2.5 py-1">
                  {discountPct}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-success-600 font-medium">
                Stock disponible ({product.stock} unidades)
              </span>
            ) : (
              <span className="text-danger-600 font-medium">Sin stock</span>
            )}
          </p>

          {product.description && (
            <p className="mt-4 text-steel-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}

          {product.specs && product.specs.filter((s) => s.label.trim().toLowerCase() !== 'sku').length > 0 && (
            <div className="mt-6">
              <h2 className="font-display font-semibold text-steel-900 mb-3">Características</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.filter((s) => s.label.trim().toLowerCase() !== 'sku').map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-lg border border-plate-200 bg-plate-50 px-3 py-2 text-sm"
                  >
                    <span className="text-steel-500">{spec.label}</span>
                    <span className="text-steel-800 font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ProductActions product={product} whatsappNumber={settings.whatsappNumber} />

          {product.ml_permalink && (
            <a
              href={product.ml_permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-steel-500 underline hover:text-steel-700"
            >
              Ver también en MercadoLibre →
            </a>
          )}
        </div>
      </div>

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
