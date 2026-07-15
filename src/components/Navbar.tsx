'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Category } from '@/lib/types';

export default function Navbar({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState('');
  const { count } = useCart();
  const navRef = useRef<HTMLElement>(null);
  const mobRef = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);
  const [mobL, setMobL] = useState(false);
  const [mobR, setMobR] = useState(false);

  function arrows(el: HTMLElement | HTMLDivElement | null, sL: (v:boolean)=>void, sR: (v:boolean)=>void) {
    if (!el) return;
    sL(el.scrollLeft > 4);
    sR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }
  const upNav = () => arrows(navRef.current, setCanL, setCanR);
  const upMob = () => arrows(mobRef.current, setMobL, setMobR);

  useEffect(() => {
    upNav();
    navRef.current?.addEventListener('scroll', upNav, { passive: true });
    window.addEventListener('resize', upNav, { passive: true });
    return () => { navRef.current?.removeEventListener('scroll', upNav); window.removeEventListener('resize', upNav); };
  }, [categories]);

  useEffect(() => {
    upMob();
    mobRef.current?.addEventListener('scroll', upMob, { passive: true });
    window.addEventListener('resize', upMob, { passive: true });
    return () => { mobRef.current?.removeEventListener('scroll', upMob); window.removeEventListener('resize', upMob); };
  }, [categories]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* ── Barra principal ─────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-[68px] flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="relative h-11 w-40 shrink-0">
          <Image src="/images/logo-behmont.png" alt="BEHMONT" fill priority sizes="160px"
            className="object-contain object-left" />
        </Link>

        {/* Search — desktop */}
        <form action="/buscar" className="hidden md:flex flex-1 items-stretch h-11 rounded-lg border-2 border-[#0B1C3A] overflow-hidden">
          <input
            name="q" value={q} onChange={e => setQ(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="flex-1 px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 bg-white"
          />
          <button type="submit"
            className="shrink-0 w-14 bg-[#0B1C3A] text-white flex items-center justify-center hover:bg-[#162040] transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Acciones */}
        <div className="ml-auto flex items-center gap-2">
          {/* Carrito */}
          <Link href="/pedido"
            className="relative flex items-center gap-2 rounded-lg bg-[#0B1C3A] px-4 h-10 text-sm font-bold text-white hover:bg-[#162040] transition-colors active:scale-[0.97]">
            <ShoppingCart className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">
              {count > 0 ? `Pedido (${count})` : 'Pedido'}
            </span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:hidden h-5 w-5 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Hamburguesa mobile */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Barra de categorías desktop ─────────────── */}
      <div className="hidden md:block bg-[#0B1C3A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative flex items-center h-10">
          {canL && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0B1C3A] to-transparent z-10 pointer-events-none" />
              <button onClick={() => navRef.current?.scrollBy({ left: -220 })}
                className="absolute left-2 z-20 h-6 w-6 flex items-center justify-center rounded text-white/60 hover:text-white transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}
          <nav ref={navRef}
            className="flex h-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`}
                className="shrink-0 flex items-center px-3.5 h-full text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap border-r border-white/5 last:border-r-0">
                {cat.name}
              </Link>
            ))}
            <Link href="/ofertas"
              className="shrink-0 flex items-center px-3.5 h-full text-[13px] font-bold text-amber-400 hover:text-amber-300 hover:bg-white/10 transition-colors whitespace-nowrap border-r border-white/5">
              Ofertas
            </Link>
            <Link href="/mayorista"
              className="shrink-0 flex items-center px-3.5 h-full text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap">
              Mayorista
            </Link>
          </nav>
          {canR && (
            <>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0B1C3A] to-transparent z-10 pointer-events-none" />
              <button onClick={() => navRef.current?.scrollBy({ left: 220 })}
                className="absolute right-2 z-20 h-6 w-6 flex items-center justify-center rounded text-white/60 hover:text-white transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Strip categorías mobile ──────────────────── */}
      <div className="md:hidden bg-[#0B1C3A] relative">
        {mobL && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0B1C3A] to-transparent z-10 pointer-events-none" />
        )}
        <div ref={mobRef}
          className="flex h-9 px-2 gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(cat => (
            <Link key={cat.id} href={`/categoria/${cat.slug}`}
              className="shrink-0 flex items-center px-3 text-xs font-medium text-white/70 hover:text-white whitespace-nowrap">
              {cat.name}
            </Link>
          ))}
          <Link href="/ofertas" className="shrink-0 flex items-center px-3 text-xs font-bold text-amber-400 whitespace-nowrap">
            Ofertas
          </Link>
          <Link href="/mayorista" className="shrink-0 flex items-center px-3 text-xs font-medium text-white/70 whitespace-nowrap">
            Mayorista
          </Link>
        </div>
        {mobR && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0B1C3A] to-transparent z-10 pointer-events-none" />
        )}
      </div>

      {/* ── Menú mobile expandible ───────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <form action="/buscar" className="flex h-10 rounded-lg border-2 border-[#0B1C3A] overflow-hidden">
            <input name="q" placeholder="¿Qué estás buscando?" className="flex-1 px-3 text-sm outline-none" />
            <button className="w-12 bg-[#0B1C3A] text-white flex items-center justify-center">
              <Search className="h-4 w-4" />
            </button>
          </form>
          <div className="grid grid-cols-2 gap-0.5">
            {categories.map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <Link href="/ofertas" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-lg bg-amber-500 text-sm font-bold text-white">
              Ofertas
            </Link>
            <Link href="/mayorista" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-lg bg-[#0B1C3A] text-sm font-bold text-white">
              Mayorista
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
