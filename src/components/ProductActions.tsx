'use client';

import { useState } from 'react';
import { Minus, Plus, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { buildQuickInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { buttonClasses } from '@/components/ui/Button';
import type { Product } from '@/lib/types';

export default function ProductActions({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const inquiryLink = buildWhatsAppLink(
    whatsappNumber,
    buildQuickInquiryMessage()
  );

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <div className="flex items-center gap-3 rounded-lg border border-plate-200 px-2 py-2 w-fit">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="grid h-7 w-7 place-items-center rounded-md transition active:scale-[0.95] hover:bg-plate-100"
          aria-label="Restar cantidad"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-medium">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="grid h-7 w-7 place-items-center rounded-md transition active:scale-[0.95] hover:bg-plate-100"
          aria-label="Sumar cantidad"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        onClick={() => {
          addItem({ sku: product.sku, name: product.name, qty, price: product.price });
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
        disabled={product.stock <= 0}
        className={buttonClasses({ variant: 'primary', size: 'lg', className: 'flex-1' })}
      >
        <ShoppingCart className="h-4 w-4" />
        {added ? 'Agregado ✓' : 'Agregar al pedido'}
      </button>

      <a
        href={inquiryLink}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({ variant: 'whatsapp', size: 'lg' })}
      >
        <MessageCircle className="h-4 w-4" /> Consultar
      </a>
    </div>
  );
}
