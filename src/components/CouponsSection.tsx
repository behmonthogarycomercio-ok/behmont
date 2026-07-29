'use client';

import { useState } from 'react';
import { Ticket, Copy, Check } from 'lucide-react';
import { buildCouponInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import type { Coupon } from '@/lib/data';

export default function CouponsSection({ coupons, whatsappNumber }: { coupons: Coupon[]; whatsappNumber: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  if (coupons.length === 0) return null;

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="grid h-10 w-10 shrink-0 -rotate-6 place-items-center rounded-md bg-amber-500 shadow-lg">
          <Ticket className="h-5 w-5 text-white" />
        </span>
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-600">
            Cupones
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 leading-tight tracking-tight">
            Códigos con descuento para tu pedido
          </h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="rounded-xl2 border border-dashed border-amber-300 bg-amber-50/50 p-5 flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-steel-900">{coupon.description}</p>
              {coupon.valid_until && (
                <p className="text-xs text-steel-500 mt-0.5">Válido hasta {coupon.valid_until}</p>
              )}
            </div>
            <button
              onClick={() => copyCode(coupon.code)}
              className="flex items-center justify-between gap-2 rounded-lg bg-white border border-plate-200 px-3.5 py-2.5 font-mono text-sm font-bold text-steel-900 hover:border-amber-400 transition-colors"
            >
              {coupon.code}
              {copied === coupon.code ? (
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : (
                <Copy className="h-4 w-4 text-steel-400 shrink-0" />
              )}
            </button>
            <a
              href={buildWhatsAppLink(whatsappNumber, buildCouponInquiryMessage(coupon.code))}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Usar por WhatsApp →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
