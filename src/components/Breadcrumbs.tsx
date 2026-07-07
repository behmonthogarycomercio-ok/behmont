import Link from 'next/link';

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-0 font-mono text-[11px] text-steel-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          {i > 0 && <span className="mx-2 text-steel-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-steel-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-steel-700 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
