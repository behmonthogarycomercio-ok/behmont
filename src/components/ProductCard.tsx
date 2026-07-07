'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { buildQuickInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { getProductCode } from '@/lib/product-display';
import { clsx } from 'clsx';
import { buttonClasses } from '@/components/ui/Button';
import type { Product } from '@/lib/types';

export default function ProductCard({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.sku);
  const code = getProductCode(product);
  const discountPct =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(100 - (product.price / product.compare_at_price) * 100)
      : null;

  const inquiryLink = buildWhatsAppLink(
    whatsappNumber,
    buildQuickInquiryMessage()
  );

  return (
    <div className="group relative flex flex-col rounded-xl2 border border-plate-200 bg-white shadow-card overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-4px_rgba(11,18,32,0.18)]">
      {discountPct && (
        <span className="absolute left-3 top-3 z-10 -rotate-2 rounded bg-amber-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow">
          {discountPct}% OFF
        </span>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.sku);
        }}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow transition active:scale-[0.95] hover:bg-white"
        aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        aria-pressed={favorite}
      >
        <Heart
          className={clsx('h-4 w-4', favorite ? 'fill-amber-500 text-amber-500' : 'text-steel-400')}
        />
      </button>

      <Link href={`/producto/${product.slug}`} className="relative aspect-square bg-plate-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full place-items-center text-steel-300 font-mono text-[10px] uppercase tracking-widest">
            Sin imagen
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-0.5 p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          {product.brand && (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-steel-400">
              {product.brand.name}
            </span>
          )}
          {code && (
            <span className="ml-auto shrink-0 font-mono text-[10px] text-steel-300">
              {code}
            </span>
          )}
        </div>

        <Link
          href={`/producto/${product.slug}`}
          className="font-medium text-steel-900 text-sm leading-snug line-clamp-2 hover:text-amber-600 transition-colors"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display font-bold text-xl text-steel-950 tracking-tight">
            ${product.price.toLocaleString('es-AR')}
          </span>
          {product.compare_at_price && discountPct && (
            <span className="text-xs text-steel-350 line-through">
              ${product.compare_at_price.toLocaleString('es-AR')}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.stock <= 0 ? (
            <span className="rounded bg-danger-600/10 px-2 py-0.5 text-[10px] font-semibold text-danger-600">
              Sin stock
            </span>
          ) : product.stock <= 3 ? (
            <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              ¡Últimas {product.stock} unidades!
            </span>
          ) : (
            <span className="rounded bg-plate-100 px-2 py-0.5 text-[10px] font-medium text-steel-500">
              Retirá en local
            </span>
          )}
          <span className="rounded bg-plate-100 px-2 py-0.5 text-[10px] font-medium text-steel-500">
            Enviamos por Andreani
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() =>
              addItem({ sku: product.sku, name: product.name, qty: 1, price: product.price })
            }
            disabled={product.stock <= 0}
            className={buttonClasses({ variant: 'primary', size: 'sm', className: 'flex-1' })}
          >
            <Plus className="h-3.5 w-3.5" /> Agregar al pedido
          </button>
          <a
            href={inquiryLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: 'whatsapp', size: 'sm' })}
            aria-label={`Consultar ${product.name} por WhatsApp`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
