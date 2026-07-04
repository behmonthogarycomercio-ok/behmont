'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export type FaqItem = { q: string; a: string };
export type FaqCategory = { title: string; items: FaqItem[] };

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.title}>
          <h2 className="font-display text-lg font-semibold text-steel-900 mb-3">{cat.title}</h2>
          <div className="rounded-xl2 border border-plate-200 bg-white shadow-card divide-y divide-plate-100 overflow-hidden">
            {cat.items.map((item) => {
              const key = `${cat.title}__${item.q}`;
              const open = openKey === key;
              return (
                <div key={key}>
                  <button
                    onClick={() => setOpenKey(open ? null : key)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-steel-900 text-sm">{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-steel-500 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={clsx(
                      'grid transition-[grid-template-rows] duration-300 ease-in-out',
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-4 -mt-1">
                        <p className="text-sm text-steel-600 leading-relaxed whitespace-pre-line">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
