import Image from 'next/image';
import { Wallet, MessageCircle } from 'lucide-react';
import ProductCarousel from './ProductCarousel';
import { buildPromoInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import type { Promotion } from '@/lib/types';

export default function FinancingPromosCarousel({
  promotions,
  whatsappNumber,
}: {
  promotions: Promotion[];
  whatsappNumber: string;
}) {
  const items = promotions.filter((p) => p.image_url);
  if (items.length === 0) return null;

  return (
    <section className="bg-steel-900 py-[88px]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-5 border-b border-dashed border-white/15">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 -rotate-6 place-items-center rounded-md bg-amber-500 shadow-lg">
              <Wallet className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/90">
                Julio · hasta agotar stock
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                Promos en financiación
              </h2>
            </div>
          </div>
        </div>
        <ProductCarousel>
          {items.map((p) => {
            const link = buildWhatsAppLink(whatsappNumber, buildPromoInquiryMessage(p.title));
            return (
              <a
                key={p.id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 w-[calc(50%-8px)] overflow-hidden rounded-[18px] border border-plate-200 bg-white transition hover:border-amber-300"
              >
                <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '3 / 4' }}>
                  <Image
                    src={p.image_url!}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 460px"
                    className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-center gap-1.5 border-t border-plate-100 bg-plate-50 py-2.5 text-xs font-semibold text-steel-600 transition-colors group-hover:text-amber-600">
                  <MessageCircle className="h-3.5 w-3.5" /> Me interesa esta promo
                </div>
              </a>
            );
          })}
        </ProductCarousel>
      </div>
    </section>
  );
}
