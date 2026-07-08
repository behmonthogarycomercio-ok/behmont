import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Página no encontrada | BEHMONT',
};

export default async function NotFound() {
  const categories = await getCategories();
  const sample = categories.slice(0, 6);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Code */}
      <span className="font-mono text-[96px] sm:text-[128px] font-bold leading-none text-plate-200 select-none">
        404
      </span>

      <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-steel-950 tracking-tight">
        Esta página no existe
      </h1>
      <p className="mt-3 text-steel-400 text-sm max-w-sm leading-relaxed">
        El producto o sección que buscás no está disponible. Probá buscando por nombre o explorá el catálogo.
      </p>

      {/* Search */}
      <form action="/buscar" className="mt-8 flex w-full max-w-sm gap-2">
        <input
          name="q"
          placeholder="¿Qué estás buscando?"
          className="flex-1 rounded-full border border-plate-200 bg-plate-50 px-5 py-2.5 text-sm outline-none focus:border-steel-400 focus:bg-white transition-colors"
          autoComplete="off"
        />
        <button
          type="submit"
          className="rounded-full bg-steel-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-steel-800 transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Category shortcuts */}
      {sample.length > 0 && (
        <div className="mt-10 w-full max-w-lg">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-300 mb-4">
            O explorá una categoría
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {sample.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="rounded-full border border-plate-200 bg-white px-4 py-1.5 text-sm font-medium text-steel-700 hover:border-amber-500 hover:text-amber-700 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back home */}
      <Link
        href="/"
        className="mt-10 font-mono text-[11px] font-semibold uppercase tracking-wide text-steel-400 hover:text-steel-700 transition-colors"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
