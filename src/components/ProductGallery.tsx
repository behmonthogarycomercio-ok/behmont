'use client';

import { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-xl2 bg-plate-50 border border-plate-200 grid place-items-center text-steel-300">
        Sin imagen
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square rounded-xl2 bg-plate-50 border border-plate-200">
        <Image src={images[active]} alt={name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={clsx(
                'relative h-16 w-16 shrink-0 rounded-lg border bg-plate-50 overflow-hidden',
                active === i ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-plate-200'
              )}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="64px" loading="eager" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
