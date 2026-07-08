'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Category } from '@/lib/types';

export default function Navbar({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/97 backdrop-blur-md border-b border-plate-200 shadow-[0_1px_0_0_rgba(11,18,32,0.06)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-4">
          <Link href="/" className="relative h-9 w-36 shrink-0">
            <Image
              src="/images/logo-behmont.png"
              alt="BEHMONT — Comercio y Hogar"
              fill
              priority
              sizes="144px"
              className="object-contain object-left"
            />
          </Link>

          <form
            action="/buscar"
            className="hidden md:flex flex-1 items-center gap-2 rounded-full border border-plate-200 bg-plate-50 px-4 py-2 transition focus-within:border-steel-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/30"
          >
            <Search className="h-4 w-4 text-steel-400 shrink-0" />
            <input
              name="q"
              placeholder="¿Qué estás buscando?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-steel-400"
            />
          </form>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/pedido"
              className={clsx(
                'relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition active:scale-[0.95]',
                count > 0
                  ? 'bg-steel-900 text-white hover:bg-steel-800'
                  : 'hover:bg-plate-100 text-steel-800'
              )}
              aria-label="Ver pedido"
            >
              <ShoppingCart className="h-4 w-4 shrink-0" />
              {count > 0 ? (
                <span className="hidden sm:inline">Pedido ({count})</span>
              ) : null}
              {count > 0 && (
                <span className="absolute -top-1 -right-1 sm:hidden grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden grid h-10 w-10 place-items-center rounded-full transition active:scale-[0.95] hover:bg-plate-100 text-steel-700"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 h-10 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="relative whitespace-nowrap px-2.5 py-1 text-sm font-medium text-steel-700 rounded transition-colors hover:text-steel-950 hover:bg-plate-100 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:rounded-full after:bg-amber-500 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/ofertas"
            className="relative whitespace-nowrap px-2.5 py-1 text-sm font-semibold text-amber-600 rounded transition-colors hover:text-amber-700 hover:bg-amber-50 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:rounded-full after:bg-amber-500 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
          >
            Ofertas
          </Link>
          <Link
            href="/mayorista"
            className="relative whitespace-nowrap px-2.5 py-1 text-sm font-medium text-steel-700 rounded transition-colors hover:text-steel-950 hover:bg-plate-100 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:rounded-full after:bg-amber-500 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
          >
            Mayorista
          </Link>
          <Link
            href="/financiacion"
            className="relative whitespace-nowrap px-2.5 py-1 text-sm font-medium text-steel-700 rounded transition-colors hover:text-steel-950 hover:bg-plate-100 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:rounded-full after:bg-amber-500 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
          >
            Financiación
          </Link>
        </nav>
      </div>

      <div
        className={clsx(
          'md:hidden grid transition-[grid-template-rows] duration-300 ease-in-out',
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-plate-200 px-4 py-4 space-y-4">
            <form action="/buscar" className="flex items-center gap-2 rounded-full border border-plate-200 bg-plate-50 px-4 py-2.5 focus-within:ring-2 focus-within:ring-amber-500/30">
              <Search className="h-4 w-4 text-steel-400" />
              <input name="q" placeholder="¿Qué estás buscando?" className="w-full bg-transparent text-sm outline-none" />
            </form>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-steel-800 hover:bg-plate-100 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 pt-1 border-t border-plate-100">
              <Link
                href="/ofertas"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-amber-50 px-3 py-2.5 text-center text-sm font-semibold text-amber-700"
              >
                Ofertas
              </Link>
              <Link
                href="/mayorista"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-plate-100 px-3 py-2.5 text-center text-sm font-semibold text-steel-800"
              >
                Mayorista
              </Link>
            </div>
            <div className="flex gap-2 border-t border-plate-100 pt-1">
              <Link
                href="/financiacion"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-plate-100 px-3 py-2.5 text-center text-sm font-semibold text-steel-800"
              >
                Financiación
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
