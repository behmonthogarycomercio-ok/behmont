import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import SearchInput from '@/components/SearchInput';
import { getSiteSettings, searchProducts, getCategories } from '@/lib/data';

export async function generateMetadata({ searchParams }: { searchParams: { q?: string } }): Promise<Metadata> {
  const q = searchParams.q?.trim();
  if (!q) return { title: 'Buscar productos | BEHMONT' };
  return {
    title: `Resultados para "${q}" | BEHMONT`,
    description: `Buscás "${q}" en el catálogo de BEHMONT, Concordia. Más de 2.500 productos con stock.`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim() || '';

  const [settings, products, categories] = await Promise.all([
    getSiteSettings(),
    q ? searchProducts(q) : Promise.resolve([]),
    getCategories(),
  ]);

  return (
    <main>
      {/* Header buscador */}
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-400 mb-3">
            Catálogo BEHMONT
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight mb-6">
            {q ? `Resultados para "${q}"` : 'Buscar productos'}
          </h1>
          <SearchInput defaultValue={q} />
        </div>
      </div>

      {/* Sin query: mostrar categorías */}
      {!q && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <p className="font-mono text-[11px] uppercase tracking-wide text-steel-400 mb-5">
            Explorar por categoría
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-plate-200 bg-white px-4 py-3.5 text-sm font-semibold text-steel-800 transition-all hover:border-steel-900 hover:shadow-sm"
              >
                <span className="line-clamp-1">{cat.name}</span>
                <span className="shrink-0 text-steel-300 font-mono text-xs">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Con query y resultados */}
      {q && products.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <p className="font-mono text-[11px] uppercase tracking-wide text-steel-400 mb-6">
            {products.length} {products.length === 1 ? 'resultado' : 'resultados'}
          </p>
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

      {/* Con query pero sin resultados */}
      {q && products.length === 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="max-w-md">
            <p className="font-display text-2xl font-bold text-steel-950 tracking-tight">
              Sin resultados para "{q}"
            </p>
            <p className="mt-3 text-sm text-steel-400 leading-relaxed">
              Probá con otro término o consultanos directamente por WhatsApp — tenemos más de 2.500 productos en stock.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hola%2C+busco+${encodeURIComponent(q)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/buscar"
                className="inline-flex items-center gap-2 rounded-full border border-plate-200 px-5 py-2.5 text-sm font-semibold text-steel-700 transition hover:border-steel-900"
              >
                Ver todo el catálogo
              </Link>
            </div>
          </div>

          {/* Igual mostramos categorías */}
          <div className="mt-14">
            <p className="font-mono text-[11px] uppercase tracking-wide text-steel-400 mb-5">
              Explorar por categoría
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-plate-200 bg-white px-4 py-3.5 text-sm font-semibold text-steel-800 transition-all hover:border-steel-900 hover:shadow-sm"
                >
                  <span className="line-clamp-1">{cat.name}</span>
                  <span className="shrink-0 text-steel-300 font-mono text-xs">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
