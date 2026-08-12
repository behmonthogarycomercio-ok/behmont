'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { buildQuickInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { formatPrice } from '@/lib/price';
import { getProductCode } from '@/lib/product-display';
import { getCashDiscountPct } from '@/lib/cash-discount';
import type { Product } from '@/lib/types';

const CUOTAS = 3;

export default function ProductCard({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  const { addItem }   = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav           = isFavorite(product.sku);

  const discountPct = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round(100 - (product.price / product.compare_at_price) * 100) : null;

  const cuotaPrice = Math.ceil(product.price / CUOTAS);
  const cashDiscountPct = getCashDiscountPct(product.category);
  const cashPrice = cashDiscountPct !== null ? Math.round(product.price * (1 - cashDiscountPct / 100)) : null;
  const inquiryLink = buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage());
  const code = getProductCode(product);

  return (
    <div className="group flex flex-col bg-white border border-plate-200 rounded-[18px] overflow-hidden transition-all duration-200 hover:shadow-[0_20px_40px_-14px_rgba(10,18,38,0.2)] hover:-translate-y-1 hover:border-steel-300">

      {/* Imagen */}
      <Link href={`/producto/${encodeURIComponent(product.sku)}`} className="relative bg-gray-50 overflow-hidden" style={{ paddingBottom: '68%' }}>
        <div className="absolute inset-0">
          {product.images?.[0] ? (
            <>
              <Image src={product.images[0]} alt={product.name} fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                className={`object-contain p-2.5 transition-opacity duration-300 ${product.images[1] ? 'group-hover:opacity-0' : ''}`} />
              {product.images[1] && (
                <Image src={product.images[1]} alt={product.name} fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  className="object-contain p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              )}
            </>
          ) : (
            <div className="placeholder-pattern h-full w-full flex items-center justify-center text-steel-300 text-[10px] uppercase tracking-wider">
              Foto producto
            </div>
          )}
        </div>
        {/* Badges */}
        {discountPct && (
          <span className="absolute top-3 left-3 -rotate-6 bg-[#ED3237] text-white text-lg font-extrabold px-4 py-2 rounded-md shadow-lg border-2 border-white">
            -{discountPct}%
          </span>
        )}
        {product.stock > 0 && product.stock <= 3 && (
          <span className="absolute bottom-3 left-3 bg-warning-500/15 text-warning-600 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg">
            Últimas {product.stock}
          </span>
        )}
        {/* Favorito */}
        <button onClick={e => { e.preventDefault(); toggleFavorite(product.sku); }}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Favorito">
          <Heart className={`h-4 w-4 ${fav ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-2.5 gap-0.5">
        {product.brand && (
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{product.brand.name}</p>
        )}
        <Link href={`/producto/${encodeURIComponent(product.sku)}`}
          className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 hover:text-[#0B1C3A] transition-colors">
          {product.name}
        </Link>
        {code && (
          <p className="font-mono text-[10px] text-gray-400">SKU: {code}</p>
        )}

        {/* Precio */}
        <div className="mt-1.5">
          {discountPct && product.compare_at_price && (
            <p className="text-xs text-gray-400 line-through">${formatPrice(product.compare_at_price)}</p>
          )}
          <p className="text-xl font-extrabold text-[#0B1C3A] leading-none">
            ${formatPrice(product.price)}
          </p>
          <p className="text-xs font-semibold text-green-600 mt-1">
            {CUOTAS}x ${formatPrice(cuotaPrice)} sin interés
          </p>
          {cashPrice !== null && (
            <p className="mt-1.5 inline-block w-fit bg-[#ED3237]/10 text-[#ED3237] text-xs font-extrabold px-2.5 py-1 rounded-lg">
              Contado efectivo: ${formatPrice(cashPrice)}
            </p>
          )}
        </div>

        {/* Stock */}
        {product.stock <= 0 && (
          <p className="text-xs font-semibold text-red-500">Sin stock</p>
        )}

        {/* CTAs */}
        <div className="mt-2 flex gap-1.5">
          <button
            onClick={() => addItem({ sku: code ?? product.sku, name: product.name, qty: 1, price: product.price, image: product.images?.[0] })}
            disabled={product.stock <= 0}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-b from-[#182548] to-[#0B1C3A] hover:from-[#213262] hover:to-[#182548] text-white text-xs font-bold py-2 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_14px_-6px_rgba(10,18,38,0.5)] transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:translate-y-px active:scale-[.98]">
            <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
            Agregar al pedido
          </button>
          <a href={inquiryLink} target="_blank" rel="noopener noreferrer"
            className="h-8 w-8 shrink-0 rounded-xl bg-[#25D366] hover:bg-[#1eb358] text-white flex items-center justify-center transition active:scale-[.97]"
            aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
