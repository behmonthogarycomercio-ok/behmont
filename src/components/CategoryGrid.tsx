import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/lib/types';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-semibold text-steel-900">Categorías</h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white border border-plate-200 shadow-card overflow-hidden group-hover:border-amber-500 transition-colors">
              {cat.icon_url ? (
                <Image src={cat.icon_url} alt={cat.name} fill className="object-cover" />
              ) : (
                <span className="font-display font-bold text-steel-700 text-lg">
                  {cat.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="text-sm font-medium text-steel-800 group-hover:text-amber-600">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
