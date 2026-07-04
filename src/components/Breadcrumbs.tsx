import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-steel-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-amber-600">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-steel-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
