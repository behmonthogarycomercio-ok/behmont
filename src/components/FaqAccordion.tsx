'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

export type FaqItem = { q: string; a: string };
export type FaqCategory = { title: string; items: FaqItem[] };

function stripEmoji(str: string) {
  return str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
}

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.title}>
          <h2 className="font-display text-lg font-bold text-steel-950 tracking-tight mb-3">
            {stripEmoji(cat.title)}
          </h2>
          <div className="border border-plate-200 bg-white divide-y divide-plate-100 overflow-hidden rounded-xl">
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
                    <span className={clsx('shrink-0 font-mono text-steel-400 text-base leading-none transition-transform', open && 'rotate-45')}>
                      +
                    </span>
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
