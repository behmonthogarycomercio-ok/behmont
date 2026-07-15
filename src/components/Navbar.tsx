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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-plate-200">

      {/* ── Barra principal ─────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-[72px] flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="relative h-10 w-36 shrink-0">
          <Image src="/images/logo-behmont.png" alt="BEHMONT" fill priority sizes="160px"
            className="object-contain object-left" />
        </Link>

        {/* Search — desktop */}
        <form action="/buscar" className="hidden md:flex flex-1 max-w-md items-center h-[46px] rounded-full border border-plate-200 bg-plate-50 pl-5 pr-1.5 focus-within:border-[#0B1C3A] transition-colors">
          <input
            name="q" value={q} onChange={e => setQ(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button type="submit"
            className="shrink-0 h-9 w-9 rounded-full bg-[#0B1C3A] text-white flex items-center justify-center hover:bg-[#162040] transition-colors">
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Acciones */}
        <div className="ml-auto flex items-center gap-2">
          {/* Carrito */}
          <Link href="/pedido"
            className="relative flex items-center gap-2 rounded-full bg-gradient-to-b from-[#182548] to-[#0B1C3A] px-5 h-11 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_16px_-6px_rgba(10,18,38,0.5)] hover:from-[#213262] hover:to-[#182548] hover:-translate-y-px transition-all active:translate-y-px active:scale-[0.97]">
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
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Barra de categorías desktop ─────────────── */}
      <div className="hidden md:block border-t border-plate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative flex items-center h-11">
          {canL && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <button onClick={() => navRef.current?.scrollBy({ left: -220 })}
                className="absolute left-2 z-20 h-6 w-6 flex items-center justify-center rounded-full text-steel-400 hover:text-steel-900 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}
          <nav ref={navRef}
            className="flex h-full items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`}
                className="shrink-0 flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium text-steel-500 hover:bg-plate-50 hover:text-[#0B1C3A] transition-colors whitespace-nowrap">
                {cat.name}
              </Link>
            ))}
            <Link href="/ofertas"
              className="shrink-0 flex items-center px-3 py-1.5 rounded-full text-[13px] font-bold text-amber-500 hover:bg-amber-50 hover:text-amber-600 transition-colors whitespace-nowrap">
              Ofertas
            </Link>
            <Link href="/mayorista"
              className="shrink-0 flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium text-steel-500 hover:bg-plate-50 hover:text-[#0B1C3A] transition-colors whitespace-nowrap">
              Mayorista
            </Link>
          </nav>
          {canR && (
            <>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <button onClick={() => navRef.current?.scrollBy({ left: 220 })}
                className="absolute right-2 z-20 h-6 w-6 flex items-center justify-center rounded-full text-steel-400 hover:text-steel-900 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Strip categorías mobile ──────────────────── */}
      <div className="md:hidden bg-plate-50 border-t border-plate-100 relative">
        {mobL && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-plate-50 to-transparent z-10 pointer-events-none" />
        )}
        <div ref={mobRef}
          className="flex h-9 px-2 gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(cat => (
            <Link key={cat.id} href={`/categoria/${cat.slug}`}
              className="shrink-0 flex items-center px-3 text-xs font-medium text-steel-500 hover:text-[#0B1C3A] whitespace-nowrap">
              {cat.name}
            </Link>
          ))}
          <Link href="/ofertas" className="shrink-0 flex items-center px-3 text-xs font-bold text-amber-500 whitespace-nowrap">
            Ofertas
          </Link>
          <Link href="/mayorista" className="shrink-0 flex items-center px-3 text-xs font-medium text-steel-500 whitespace-nowrap">
            Mayorista
          </Link>
        </div>
        {mobR && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-plate-50 to-transparent z-10 pointer-events-none" />
        )}
      </div>

      {/* ── Menú mobile expandible ───────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <form action="/buscar" className="flex h-11 rounded-full border border-plate-200 bg-plate-50 overflow-hidden">
            <input name="q" placeholder="¿Qué estás buscando?" className="flex-1 pl-4 pr-2 text-sm bg-transparent outline-none" />
            <button className="w-11 h-11 shrink-0 rounded-full bg-[#0B1C3A] text-white flex items-center justify-center m-0">
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
              className="flex-1 text-center py-2.5 rounded-full bg-amber-500 text-sm font-bold text-white">
              Ofertas
            </Link>
            <Link href="/mayorista" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full bg-[#0B1C3A] text-sm font-bold text-white">
              Mayorista
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
