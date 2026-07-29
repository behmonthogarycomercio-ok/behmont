'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Wallet, MessageCircle, X } from 'lucide-react';
import { buildPromoInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import ProductCarousel from './ProductCarousel';
import type { Promotion } from '@/lib/types';

export default function FinancingPromosCarousel({
  promotions,
  whatsappNumber,
}: {
  promotions: Promotion[];
  whatsappNumber: string;
}) {
  const items = promotions.filter((p) => p.image_url);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIdx(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (items.length === 0) return null;

  const detail = openIdx !== null ? items[openIdx] : null;
  const detailLink = detail ? buildWhatsAppLink(whatsappNumber, buildPromoInquiryMessage(detail.title)) : '';
  const generalLink = buildWhatsAppLink(whatsappNumber, buildPromoInquiryMessage('Promos en financiación'));

  return (
    <section className="bg-steel-900 py-[84px] lg:py-[104px]">
      <div className="mx-auto max-w-[1382px] px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* Texto */}
          <div className="lg:w-[520px] shrink-0">
            <span className="grid h-20 w-20 shrink-0 -rotate-6 place-items-center rounded-xl bg-amber-500 shadow-lg mb-6">
              <Wallet className="h-10 w-10 text-white" />
            </span>
            <p className="font-mono text-[22px] font-medium uppercase tracking-[0.2em] text-amber-400/90 mb-4">
              Julio · hasta agotar stock
            </p>
            <h2 className="font-display text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Promos en financiación
            </h2>
            <p className="text-white/60 text-2xl leading-relaxed mb-8">
              Tocá una imagen para ver el detalle de la promo.
            </p>
            <a
              href={generalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#ED3237] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#c9282c]"
            >
              <MessageCircle className="h-6 w-6" /> Me interesa esta promo
            </a>
          </div>

          {/* Carrusel de imagenes, una al lado de la otra */}
          <div className="flex-1 min-w-0">
            <ProductCarousel>
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setOpenIdx(i)}
                  aria-label={`Ver promo: ${item.title}`}
                  className="group shrink-0 w-[300px] sm:w-[380px] relative overflow-hidden rounded-[16px] border border-white/10 bg-white"
                  style={{ aspectRatio: '3 / 4' }}
                >
                  <Image
                    src={item.image_url!}
                    alt={item.title}
                    fill
                    sizes="380px"
                    className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </ProductCarousel>
          </div>
        </div>
      </div>

      {/* Detalle al tocar una imagen */}
      {detail && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpenIdx(null)}
        >
          <button
            onClick={() => setOpenIdx(null)}
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
              <Image src={detail.image_url!} alt={detail.title} fill sizes="90vw" className="object-contain" />
            </div>
            <div className="p-6 border-t border-plate-100">
              <h3 className="font-display text-xl font-bold text-steel-900 mb-1">{detail.title}</h3>
              {detail.subtitle && (
                <p className="text-steel-600 text-sm leading-relaxed mb-4">{detail.subtitle}</p>
              )}
              <a
                href={detailLink}
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
