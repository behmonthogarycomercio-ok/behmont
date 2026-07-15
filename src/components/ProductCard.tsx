'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { buildQuickInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { getProductCode } from '@/lib/product-display';
import { clsx } from 'clsx';
import type { Product } from '@/lib/types';

const CUOTAS = 3; // cuotas sin interés por defecto

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

  const cuotaPrice = Math.ceil(product.price / CUOTAS);

  const inquiryLink = buildWhatsAppLink(
    whatsappNumber,
    buildQuickInquiryMessage()
  );

  return (
    <div className="group relative flex flex-col bg-white border border-plate-200 rounded-xl overflow-hidden transition-shadow hover:shadow-[0_6px_24px_-4px_rgba(11,18,32,0.14)] hover:border-plate-300">
      {/* Badges */}
      {discountPct && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-red-500 px-2 py-0.5 font-mono text-[11px] font-bold text-white shadow">
          -{discountPct}%
        </span>
      )}
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(product.sku); }}
        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm transition hover:bg-white active:scale-[0.95]"
        aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        aria-pressed={favorite}
      >
        <Heart className={clsx('h-4 w-4', favorite ? 'fill-red-500 text-red-500' : 'text-steel-300')} />
      </button>

      {/* Imagen */}
      <Link href={`/producto/${product.slug}`} className="relative bg-plate-50 overflow-hidden" style={{ paddingBottom: '100%' }}>
        <div className="absolute inset-0">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center text-steel-300 font-mono text-[10px] uppercase tracking-widest">
              Sin imagen
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 gap-1">
        {/* Marca */}
        {product.brand && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-steel-400">
            {product.brand.name}
          </span>
        )}

        {/* Nombre */}
        <Link
          href={`/producto/${product.slug}`}
          className="text-sm font-medium text-steel-800 leading-snug line-clamp-2 hover:text-steel-950 transition-colors mt-0.5"
        >
          {product.name}
        </Link>

        {/* Precio */}
        <div className="mt-2.5">
          {product.compare_at_price && discountPct && (
            <span className="block text-xs text-steel-350 line-through leading-none mb-0.5">
              ${product.compare_at_price.toLocaleString('es-AR')}
            </span>
          )}
          <span className="font-display font-bold text-2xl text-steel-950 leading-none tracking-tight">
            ${product.price.toLocaleString('es-AR')}
          </span>
          {/* Cuotas */}
          <p className="mt-1 text-[12px] font-semibold text-emerald-600">
            {CUOTAS} cuotas sin interés de ${cuotaPrice.toLocaleString('es-AR')}
          </p>
        </div>

        {/* Stock badge */}
        <div className="mt-1.5">
          {product.stock <= 0 ? (
            <span className="text-[11px] font-semibold text-red-500">Sin stock</span>
          ) : product.stock <= 3 ? (
            <span className="text-[11px] font-semibold text-amber-600">Últimas {product.stock} unidades</span>
          ) : (
            <span className="text-[11px] text-steel-400">Disponible · Envío por Andreani</span>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-3 flex gap-1.5">
          <button
            onClick={() => addItem({ sku: product.sku, name: product.name, qty: 1, price: product.price })}
            disabled={product.stock <= 0}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-steel-950 px-3 py-2.5 text-[13px] font-bold text-white transition hover:bg-steel-800 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
            Agregar al carrito
          </button>
          <a
            href={inquiryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white transition hover:bg-[#20ba5a] active:scale-[0.98]"
            aria-label={`Consultar ${product.name} por WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
