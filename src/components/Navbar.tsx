'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, MapPin, LifeBuoy, Truck, Phone } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLocation } from '@/lib/location-context';
import type { Category } from '@/lib/types';

export default function Navbar({
  categories,
  contactPhone,
  whatsappNumber,
}: {
  categories: Category[];
  contactPhone?: string;
  whatsappNumber?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [q, setQ] = useState('');
  const { count } = useCart();
  const { city, clearZone } = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);
  const mobRef = useRef<HTMLDivElement>(null);
  const [mobL, setMobL] = useState(false);
  const [mobR, setMobR] = useState(false);

  const phone = contactPhone || whatsappNumber;

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setMegaOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  function arrows(el: HTMLDivElement | null, sL: (v: boolean) => void, sR: (v: boolean) => void) {
    if (!el) return;
    sL(el.scrollLeft > 4);
    sR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }
  const upMob = () => arrows(mobRef.current, setMobL, setMobR);

  useEffect(() => {
    upMob();
    mobRef.current?.addEventListener('scroll', upMob, { passive: true });
    window.addEventListener('resize', upMob, { passive: true });
    return () => { mobRef.current?.removeEventListener('scroll', upMob); window.removeEventListener('resize', upMob); };
  }, [categories]);

  return (
    <header className="sticky top-0 z-50">

      {/* ── Barra principal ─────────────────────────── */}
      <div className="bg-[#0B1C3A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="relative h-16 w-36 shrink-0">
            <Image src="/images/logo-behmont-oval.png" alt="BEHMONT" fill priority sizes="144px"
              className="object-contain object-left" />
          </Link>

          {/* Search — desktop */}
          <form action="/buscar" className="hidden md:flex flex-1 items-center h-12 rounded-full border border-white/15 bg-white/10 pl-5 pr-1.5 focus-within:border-white/30 transition-colors">
            <input
              name="q" value={q} onChange={e => setQ(e.target.value)}
              placeholder="¿Qué estás buscando?"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <button type="submit"
              className="shrink-0 h-9 w-9 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-400 transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Acciones */}
          <div className="ml-auto flex items-center gap-3">
            {/* Carrito */}
            <Link href="/pedido"
              className="relative flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 hover:to-amber-600 px-5 h-12 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_16px_-6px_rgba(0,0,0,0.35)] hover:-translate-y-px transition-all active:translate-y-px active:scale-[0.97]">
              <ShoppingCart className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">
                {count > 0 ? `Pedido (${count})` : 'Pedido'}
              </span>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:hidden h-5 w-5 rounded-full bg-white text-[10px] font-bold text-[#0B1C3A] flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Hamburguesa mobile */}
            <button
              className="md:hidden h-11 w-11 flex items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
              onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Cinta de categorías + info de contacto (navy) + mega-menu ── */}
      <div className="hidden md:block bg-[#0B1C3A] border-t border-white/10 relative" ref={megaRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center h-12 gap-1">
          <button
            onClick={() => setMegaOpen(v => !v)}
            className={`flex items-center gap-2 px-3.5 h-9 rounded-full text-[13px] font-bold transition-colors ${megaOpen ? 'bg-white text-[#0B1C3A]' : 'bg-white/10 text-white hover:bg-white/15'}`}
          >
            <Menu className="h-4 w-4" /> Categorías
          </button>

          <Link href="/ofertas"
            className="shrink-0 flex items-center px-3.5 h-9 rounded-full text-[13px] font-bold text-amber-400 hover:bg-white/10 transition-colors whitespace-nowrap">
            Ofertas
          </Link>
          <Link href="/mayorista"
            className="shrink-0 flex items-center px-3.5 h-9 rounded-full text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap">
            Mayorista
          </Link>

          {city && (
            <button onClick={clearZone}
              className="hidden xl:flex items-center gap-1.5 px-3 h-9 rounded-full text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <MapPin className="h-3.5 w-3.5" /> Estás en: {city}
            </button>
          )}

          <div className="ml-auto hidden lg:flex items-center gap-5 text-[12px] text-white/70">
            <a href="https://www.andreani.com/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Truck className="h-3.5 w-3.5" /> Rastrear mi pedido
            </a>
            <Link href="/faq" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <LifeBuoy className="h-3.5 w-3.5" /> Centro de ayuda
            </Link>
            <Link href="/financiacion" className="hover:text-white transition-colors">Financiación</Link>
            {phone && (
              <span className="flex items-center gap-1.5 text-white/90">
                <Phone className="h-3.5 w-3.5" /> {phone}
              </span>
            )}
          </div>
        </div>

        {/* Mega-menu flyout */}
        {megaOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-plate-200 shadow-xl z-40">
            <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1">
              {categories.map(cat => (
                <Link key={cat.id} href={`/categoria/${cat.slug}`}
                  onClick={() => setMegaOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-steel-700 hover:bg-plate-50 hover:text-[#0B1C3A] transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Strip categorías mobile ──────────────────── */}
      <div className="md:hidden bg-[#0B1C3A] border-t border-white/10 relative">
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
          <form action="/buscar" className="flex h-11 rounded-full border border-plate-200 bg-plate-50 overflow-hidden">
            <input name="q" placeholder="¿Qué estás buscando?" className="flex-1 pl-4 pr-2 text-sm bg-transparent outline-none" />
            <button className="w-11 h-11 shrink-0 rounded-full bg-[#0B1C3A] text-white flex items-center justify-center m-0">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {city && (
            <button onClick={clearZone}
              className="flex items-center gap-1.5 text-xs font-medium text-steel-500">
              <MapPin className="h-3.5 w-3.5" /> Estás en: {city} · cambiar
            </button>
          )}

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
