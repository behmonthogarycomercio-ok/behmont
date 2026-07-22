'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState('50% 50%');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length);
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-xl2 bg-plate-50 border border-plate-200 grid place-items-center text-steel-300">
        Sin imagen
      </div>
    );
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div>
      <div
        className="group relative aspect-square overflow-hidden rounded-xl2 bg-plate-50 border border-plate-200 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onClick={() => setOpen(true)}
      >
        <Image src={images[active]} alt={name} fill priority sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-8 transition-transform duration-300 ease-out group-hover:scale-[1.8]"
          style={{ transformOrigin: origin }} />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" /> Tocá para ver en detalle
        </div>
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

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="absolute top-5 right-5 z-10 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative w-full max-w-3xl aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image src={images[active]} alt={name} fill sizes="90vw" className="object-contain" priority />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + images.length) % images.length); }}
                aria-label="Anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % images.length); }}
                aria-label="Siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
