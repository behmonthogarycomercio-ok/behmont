'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { buildQuickInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { getProductCode } from '@/lib/product-display';
import { clsx } from 'clsx';
import Badge from '@/components/ui/Badge';
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
    <div className="group relative flex flex-col rounded-xl2 border border-plate-200 bg-white shadow-card overflow-hidden">
      {discountPct && (
        <Badge className="absolute left-3 top-3 z-10">{discountPct}% OFF</Badge>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.sku);
        }}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 hover:bg-white shadow"
        aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        aria-pressed={favorite}
      >
        <Heart
          className={clsx('h-4 w-4', favorite ? 'fill-amber-500 text-amber-500' : 'text-steel-700')}
        />
      </button>

      <Link href={`/producto/${product.slug}`} className="relative aspect-square bg-plate-50">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-steel-300 font-display text-xs">
            Sin imagen
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.brand && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-steel-500">
            {product.brand.name}
          </span>
        )}
        <Link
          href={`/producto/${product.slug}`}
          className="font-medium text-steel-900 text-sm leading-snug line-clamp-2 hover:text-amber-600"
        >
          {product.name}
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display font-bold text-lg text-steel-950">
            ${product.price.toLocaleString('es-AR')}
          </span>
          {product.compare_at_price && discountPct && (
            <span className="text-xs text-steel-400 line-through">
              ${product.compare_at_price.toLocaleString('es-AR')}
            </span>
          )}
        </div>

        {code && <span className="mt-1 text-xs text-steel-500">Código: {code}</span>}
        {product.stock <= 0 ? (
          <span className="text-xs font-medium text-danger-600">Sin stock</span>
        ) : product.stock <= 3 ? (
          <span className="text-xs font-medium text-amber-600">
            ¡Últimas {product.stock} unidades!
          </span>
        ) : null}

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
