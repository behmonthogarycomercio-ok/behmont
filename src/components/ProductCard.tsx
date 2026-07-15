'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { buildQuickInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import type { Product } from '@/lib/types';

const CUOTAS = 3;

export default function ProductCard({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  const { addItem }   = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav           = isFavorite(product.sku);

  const discountPct = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round(100 - (product.price / product.compare_at_price) * 100) : null;

  const cuotaPrice = Math.ceil(product.price / CUOTAS);
  const inquiryLink = buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage());

  return (
    <div className="group flex flex-col bg-white border border-plate-200 rounded-[18px] overflow-hidden transition-all duration-200 hover:shadow-[0_20px_40px_-14px_rgba(10,18,38,0.2)] hover:-translate-y-1 hover:border-steel-300">

      {/* Imagen */}
      <Link href={`/producto/${product.slug}`} className="relative bg-gray-50 overflow-hidden" style={{ paddingBottom: '100%' }}>
        <div className="absolute inset-0">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.name} fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-wider">
              Sin imagen
            </div>
          )}
        </div>
        {/* Badges */}
        {discountPct && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            -{discountPct}%
          </span>
        )}
        {product.stock > 0 && product.stock <= 3 && (
          <span className="absolute bottom-3 left-3 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg">
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
      <div className="flex flex-col flex-1 p-3 gap-1">
        {product.brand && (
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{product.brand.name}</p>
        )}
        <Link href={`/producto/${product.slug}`}
          className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 hover:text-[#0B1C3A] transition-colors">
          {product.name}
        </Link>

        {/* Precio */}
        <div className="mt-2">
          {discountPct && product.compare_at_price && (
            <p className="text-xs text-gray-400 line-through">${product.compare_at_price.toLocaleString('es-AR')}</p>
          )}
          <p className="text-2xl font-extrabold text-[#0B1C3A] leading-none">
            ${product.price.toLocaleString('es-AR')}
          </p>
          <p className="text-xs font-semibold text-green-600 mt-0.5">
            {CUOTAS}x ${cuotaPrice.toLocaleString('es-AR')} sin interés
          </p>
        </div>

        {/* Stock */}
        {product.stock <= 0 && (
          <p className="text-xs font-semibold text-red-500">Sin stock</p>
        )}

        {/* CTAs */}
        <div className="mt-3 flex gap-1.5">
          <button
            onClick={() => addItem({ sku: product.sku, name: product.name, qty: 1, price: product.price })}
            disabled={product.stock <= 0}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-b from-[#182548] to-[#0B1C3A] hover:from-[#213262] hover:to-[#182548] text-white text-xs font-bold py-2.5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_14px_-6px_rgba(10,18,38,0.5)] transition-all hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:translate-y-px active:scale-[.98]">
            <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
            Agregar al carrito
          </button>
          <a href={inquiryLink} target="_blank" rel="noopener noreferrer"
            className="h-9 w-9 shrink-0 rounded-xl bg-[#25D366] hover:bg-[#1eb358] text-white flex items-center justify-center transition active:scale-[.97]"
            aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
