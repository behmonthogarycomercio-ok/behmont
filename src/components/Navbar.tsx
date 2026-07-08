'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Category } from '@/lib/types';

export default function Navbar({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const navScrollRef    = useRef<HTMLElement>(null);
  const mobileNavRef    = useRef<HTMLDivElement>(null);
  const [canLeft,       setCanLeft]       = useState(false);
  const [canRight,      setCanRight]      = useState(false);
  const [mobileCanLeft,  setMobileCanLeft]  = useState(false);
  const [mobileCanRight, setMobileCanRight] = useState(false);

  function makeArrowUpdater(
    ref: React.RefObject<HTMLElement | HTMLDivElement>,
    setL: (v: boolean) => void,
    setR: (v: boolean) => void
  ) {
    return () => {
      const el = ref.current;
      if (!el) return;
      setL(el.scrollLeft > 4);
      setR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
  }

  const updateNavArrows    = makeArrowUpdater(navScrollRef,  setCanLeft,       setCanRight);
  const updateMobileArrows = makeArrowUpdater(mobileNavRef,  setMobileCanLeft, setMobileCanRight);

  useEffect(() => {
    updateNavArrows();
    const el = navScrollRef.current;
    el?.addEventListener('scroll', updateNavArrows, { passive: true });
    window.addEventListener('resize', updateNavArrows, { passive: true });
    return () => {
      el?.removeEventListener('scroll', updateNavArrows);
      window.removeEventListener('resize', updateNavArrows);
    };
  }, [categories]);

  useEffect(() => {
    updateMobileArrows();
    const el = mobileNavRef.current;
    el?.addEventListener('scroll', updateMobileArrows, { passive: true });
    window.addEventListener('resize', updateMobileArrows, { passive: true });
    return () => {
      el?.removeEventListener('scroll', updateMobileArrows);
      window.removeEventListener('resize', updateMobileArrows);
    };
  }, [categories]);

  function scrollNav(dir: 'left' | 'right') {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -240 : 240 });
  }

  function scrollMobileNav(dir: 'left' | 'right') {
    const el = mobileNavRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -180 : 180 });
  }

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

        <div className="hidden md:flex items-center relative">
          {canLeft && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scrollNav('left')}
                aria-label="Categorías anteriores"
                className="absolute left-0 z-20 grid h-7 w-7 place-items-center rounded-full border border-plate-200 bg-white text-steel-500 shadow-sm transition hover:bg-steel-950 hover:text-white hover:border-steel-950"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </>
          )}
          <nav ref={navScrollRef} className="flex items-center gap-1 h-10 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          </nav>
          {canRight && (
            <>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scrollNav('right')}
                aria-label="Más categorías"
                className="absolute right-0 z-20 grid h-7 w-7 place-items-center rounded-full border border-steel-700 bg-steel-950 text-white shadow-sm transition hover:bg-black"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile category strip */}
      <div className="md:hidden relative border-t border-plate-100">
        {mobileCanLeft && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <button
              onClick={() => scrollMobileNav('left')}
              aria-label="Categorías anteriores"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 grid h-6 w-6 place-items-center rounded-full border border-plate-200 bg-white text-steel-500 shadow-sm transition hover:bg-steel-950 hover:text-white"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
          </>
        )}
        <div
          ref={mobileNavRef}
          className="flex items-center gap-1.5 h-9 px-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="whitespace-nowrap rounded-full border border-plate-200 px-3 py-1 text-xs font-medium text-steel-700 transition-colors hover:border-steel-700 hover:bg-steel-950 hover:text-white active:scale-[0.95]"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/ofertas" className="whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-500 hover:text-white hover:border-amber-500 active:scale-[0.95]">
            Ofertas
          </Link>
          <Link href="/mayorista" className="whitespace-nowrap rounded-full border border-plate-200 px-3 py-1 text-xs font-medium text-steel-700 transition-colors hover:border-steel-700 hover:bg-steel-950 hover:text-white active:scale-[0.95]">
            Mayorista
          </Link>
        </div>
        {mobileCanRight && (
          <>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <button
              onClick={() => scrollMobileNav('right')}
              aria-label="Más categorías"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 grid h-6 w-6 place-items-center rounded-full border border-steel-700 bg-steel-950 text-white shadow-sm transition hover:bg-black"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </>
        )}
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
          </div>
        </div>
      </div>
    </header>
  );
}
