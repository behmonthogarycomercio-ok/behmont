'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Category } from '@/lib/types';

export default function Navbar({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const navScrollRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [canLeft,        setCanLeft]        = useState(false);
  const [canRight,       setCanRight]       = useState(false);
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
    navScrollRef.current?.scrollBy({ left: dir === 'left' ? -240 : 240 });
  }
  function scrollMobileNav(dir: 'left' | 'right') {
    mobileNavRef.current?.scrollBy({ left: dir === 'left' ? -180 : 180 });
  }

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* ── Fila principal: navy oscuro ─────────────────────────── */}
      <div className="bg-steel-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="relative h-10 w-36 shrink-0">
              <Image
                src="/images/logo-behmont.png"
                alt="BEHMONT — Comercio y Hogar"
                fill
                priority
                sizes="144px"
                className="object-contain object-left"
              />
            </Link>

            {/* Buscador desktop */}
            <form
              action="/buscar"
              className="hidden md:flex flex-1 items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 transition focus-within:bg-white/20 focus-within:border-white/40"
            >
              <Search className="h-4 w-4 text-white/60 shrink-0" />
              <input
                name="q"
                placeholder="¿Qué estás buscando?"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
              />
            </form>

            <div className="ml-auto flex items-center gap-3">
              {/* Teléfono — solo desktop */}
              <a
                href="tel:+5493454015358"
                className="hidden lg:flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>0345 401-5358</span>
              </a>

              {/* Carrito */}
              <Link
                href="/pedido"
                className={clsx(
                  'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.95]',
                  count > 0
                    ? 'bg-amber-500 text-white hover:bg-amber-400'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                )}
                aria-label="Ver pedido"
              >
                <ShoppingCart className="h-4 w-4 shrink-0" />
                {count > 0 ? (
                  <span className="hidden sm:inline font-bold">Pedido ({count})</span>
                ) : null}
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 sm:hidden grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>

              {/* Hamburguesa mobile */}
              <button
                className="md:hidden grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10 transition active:scale-[0.95]"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Abrir menú"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Franja de categorías desktop ────────────────────────── */}
      <div className="hidden md:block bg-[#162040] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative flex items-center">
            {canLeft && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#162040] to-transparent z-10 pointer-events-none" />
                <button
                  onClick={() => scrollNav('left')}
                  aria-label="Categorías anteriores"
                  className="absolute left-0 z-20 grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/70 border border-white/10 transition hover:bg-white/20 hover:text-white"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
              </>
            )}

            <nav
              ref={navScrollRef}
              className="flex items-center h-10 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  className="whitespace-nowrap px-3 py-1 text-[13px] font-medium text-white/75 hover:text-white rounded transition-colors hover:bg-white/10"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/ofertas"
                className="whitespace-nowrap px-3 py-1 text-[13px] font-semibold text-amber-400 hover:text-amber-300 rounded transition-colors hover:bg-white/10"
              >
                Ofertas
              </Link>
              <Link
                href="/mayorista"
                className="whitespace-nowrap px-3 py-1 text-[13px] font-medium text-white/75 hover:text-white rounded transition-colors hover:bg-white/10"
              >
                Mayorista
              </Link>
            </nav>

            {canRight && (
              <>
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#162040] to-transparent z-10 pointer-events-none" />
                <button
                  onClick={() => scrollNav('right')}
                  aria-label="Más categorías"
                  className="absolute right-0 z-20 grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/70 border border-white/10 transition hover:bg-white/20 hover:text-white"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Franja de categorías mobile (strip scrolleable) ─────── */}
      <div className="md:hidden bg-[#162040] border-t border-white/5 relative">
        {mobileCanLeft && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#162040] to-transparent z-10 pointer-events-none" />
            <button
              onClick={() => scrollMobileNav('left')}
              aria-label="Categorías anteriores"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
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
              className="whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/75 transition-colors hover:border-white/40 hover:text-white active:scale-[0.95]"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/ofertas"
            className="whitespace-nowrap rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 transition-colors hover:bg-amber-500 hover:text-white hover:border-amber-500 active:scale-[0.95]"
          >
            Ofertas
          </Link>
          <Link
            href="/mayorista"
            className="whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/75 transition-colors hover:border-white/40 hover:text-white active:scale-[0.95]"
          >
            Mayorista
          </Link>
        </div>
        {mobileCanRight && (
          <>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#162040] to-transparent z-10 pointer-events-none" />
            <button
              onClick={() => scrollMobileNav('right')}
              aria-label="Más categorías"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </>
        )}
      </div>

      {/* ── Menú mobile expandible ──────────────────────────────── */}
      <div
        className={clsx(
          'md:hidden bg-steel-950 grid transition-[grid-template-rows] duration-300 ease-in-out',
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-4 py-4 space-y-4">
            <form action="/buscar" className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2.5">
              <Search className="h-4 w-4 text-white/50" />
              <input name="q" placeholder="¿Qué estás buscando?" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40" />
            </form>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 pt-1 border-t border-white/10">
              <Link
                href="/ofertas"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-amber-500 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-amber-400 transition-colors"
              >
                Ofertas
              </Link>
              <Link
                href="/mayorista"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-white/10 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/20 transition-colors"
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
