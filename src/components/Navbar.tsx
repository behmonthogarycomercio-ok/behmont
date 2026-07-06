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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-plate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-4">
          <Link href="/" className="relative h-10 w-40 shrink-0">
            <Image
              src="/images/logo-behmont.png"
              alt="BEHMONT — Comercio y Hogar"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          <form
            action="/buscar"
            className="hidden md:flex flex-1 items-center gap-2 rounded-full border border-plate-200 bg-plate-50 px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500"
          >
            <Search className="h-4 w-4 text-steel-600 shrink-0" />
            <input
              name="q"
              placeholder="¿Qué estás buscando?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-steel-600/60"
            />
          </form>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/pedido"
              className="relative grid h-10 w-10 place-items-center rounded-full transition active:scale-[0.95] hover:bg-plate-100"
              aria-label="Ver pedido"
            >
              <ShoppingCart className="h-5 w-5 text-steel-800" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-[11px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden grid h-10 w-10 place-items-center rounded-full transition active:scale-[0.95] hover:bg-plate-100"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 h-11 text-sm font-medium text-steel-800 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="whitespace-nowrap hover:text-amber-600 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/ofertas" className="whitespace-nowrap text-amber-600 hover:text-amber-700">
            Ofertas
          </Link>
          <Link href="/mayorista" className="whitespace-nowrap hover:text-amber-600 transition-colors">
            Mayorista
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
          <div className="border-t border-plate-200 px-4 py-3 space-y-3">
            <form action="/buscar" className="flex items-center gap-2 rounded-full border border-plate-200 bg-plate-50 px-4 py-2">
              <Search className="h-4 w-4 text-steel-600" />
              <input name="q" placeholder="¿Qué estás buscando?" className="w-full bg-transparent text-sm outline-none" />
            </form>
            <div className="flex flex-col gap-2 text-sm font-medium text-steel-800">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/categoria/${cat.slug}`} onClick={() => setMenuOpen(false)}>
                  {cat.name}
                </Link>
              ))}
              <Link href="/ofertas" className="text-amber-600" onClick={() => setMenuOpen(false)}>
                Ofertas
              </Link>
              <Link href="/mayorista" onClick={() => setMenuOpen(false)}>
                Mayorista
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
