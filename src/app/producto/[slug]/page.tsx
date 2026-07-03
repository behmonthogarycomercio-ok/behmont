import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import ProductActions from '@/components/ProductActions';
import { getCategories, getProductBySlug, getSiteSettings } from '@/lib/data';

export const revalidate = 60;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [settings, categories, product] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProductBySlug(params.slug),
  ]);

  if (!product) notFound();

  const discountPct =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(100 - (product.price / product.compare_at_price) * 100)
      : null;

  return (
    <>
      <Navbar categories={categories} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square rounded-xl2 bg-plate-50 border border-plate-200">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-contain p-8" />
          ) : (
            <div className="grid h-full place-items-center text-steel-300">Sin imagen</div>
          )}
        </div>

        <div>
          {product.brand && (
            <span className="text-xs font-semibold uppercase tracking-wide text-steel-500">
              {product.brand.name}
            </span>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 mt-1">
            {product.name}
          </h1>
          <p className="text-sm text-steel-500 mt-1">Código: {product.sku}</p>

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
              <span className="text-emerald-600 font-medium">
                Stock disponible ({product.stock} unidades)
              </span>
            ) : (
              <span className="text-red-600 font-medium">Sin stock</span>
            )}
          </p>

          {product.description && (
            <p className="mt-4 text-steel-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
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
      </main>
      <Footer whatsappNumber={settings.whatsappNumber} />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
