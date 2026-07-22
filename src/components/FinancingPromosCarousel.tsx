'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Wallet, MessageCircle, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { buildPromoInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import type { Promotion } from '@/lib/types';

function ZoomableImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [origin, setOrigin] = useState('50% 50%');

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-[18px] border border-white/10 bg-white cursor-zoom-in"
      style={{ aspectRatio: '3 / 4' }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 90vw, 520px"
        className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.9]"
        style={{ transformOrigin: origin }}
      />
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
        <ZoomIn className="h-3.5 w-3.5" /> Pasá el mouse para ampliar
      </div>
    </div>
  );
}

export default function FinancingPromosCarousel({
  promotions,
  whatsappNumber,
}: {
  promotions: Promotion[];
  whatsappNumber: string;
}) {
  const items = promotions.filter((p) => p.image_url);
  const [idx, setIdx] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenDetail(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (items.length === 0) return null;

  const current = items[idx];
  const link = buildWhatsAppLink(whatsappNumber, buildPromoInquiryMessage(current.title));

  function go(dir: 'prev' | 'next') {
    setIdx((i) => (dir === 'next' ? (i + 1) % items.length : (i - 1 + items.length) % items.length));
  }

  return (
    <section className="bg-steel-900 py-[88px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-center">
          {/* Texto, columna izquierda */}
          <div>
            <span className="grid h-10 w-10 shrink-0 -rotate-6 place-items-center rounded-md bg-amber-500 shadow-lg mb-5">
              <Wallet className="h-5 w-5 text-white" />
            </span>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/90 mb-2">
              Julio · hasta agotar stock
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight mb-4">
              Promos en financiación
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Pasá el mouse por la imagen para ampliarla y leer bien la promo, o tocala para ver el detalle.
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ED3237] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c9282c]"
            >
              <MessageCircle className="h-4 w-4" /> Me interesa esta promo
            </a>
          </div>

          {/* Imagen unica grande, columna derecha */}
          <div ref={containerRef} className="relative max-w-md mx-auto lg:mx-0 lg:max-w-lg w-full">
            <ZoomableImage src={current.image_url!} alt={current.title} onClick={() => setOpenDetail(true)} />

            {items.length > 1 && (
              <>
                <button onClick={() => go('prev')} aria-label="Anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-lg border border-plate-200 text-steel-600 flex items-center justify-center hover:text-[#0B1C3A] transition">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => go('next')} aria-label="Siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-lg border border-plate-200 text-steel-600 flex items-center justify-center hover:text-[#0B1C3A] transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {items.map((_, i) => (
                    <button key={i} onClick={() => setIdx(i)} aria-label={`Ver promo ${i + 1}`}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{ width: i === idx ? 24 : 8, background: i === idx ? '#f59e0b' : 'rgba(255,255,255,0.35)' }} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detalle al tocar la imagen */}
      {openDetail && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpenDetail(false)}
        >
          <button
            onClick={() => setOpenDetail(false)}
            aria-label="Cerrar"
            className="absolute top-5 right-5 z-10 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-2xl bg-white rounded-[18px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full bg-white" style={{ aspectRatio: '3 / 4', maxHeight: '70vh' }}>
              <Image src={current.image_url!} alt={current.title} fill sizes="90vw" className="object-contain" />
            </div>
            <div className="p-6 border-t border-plate-100">
              <h3 className="font-display text-xl font-bold text-steel-900 mb-1">{current.title}</h3>
              {current.subtitle && (
                <p className="text-steel-600 text-sm leading-relaxed mb-4">{current.subtitle}</p>
              )}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ED3237] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c9282c]"
              >
                <MessageCircle className="h-4 w-4" /> Me interesa esta promo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
