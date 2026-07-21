'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CreditCard, Wallet, ShieldCheck, Store, Truck, FileText } from 'lucide-react';

const BENEFITS = [
  {
    icon: CreditCard,
    title: 'Cuotas sin interés',
    text: 'Hasta 3 cuotas sin interés en toda la web.',
    href: null,
  },
  {
    icon: Wallet,
    title: 'Financiación propia',
    text: 'Sin banco ni tarjeta. Pagás diario, semanal o mensual.',
    href: '/financiacion',
  },
  {
    icon: ShieldCheck,
    title: 'Compra segura',
    text: 'Atención directa por WhatsApp en cada paso de tu compra.',
    href: 'https://wa.me/5493454015358?text=Hola,%20Lucas.%20Quisiera%20realizar%20una%20consulta%20sobre%20sus%20productos.',
  },
  {
    icon: Store,
    title: 'Retirá en el local',
    text: 'San Lorenzo Oeste 380, Concordia. Lo tenés el mismo día.',
    href: '/#ubicacion',
  },
  {
    icon: Truck,
    title: 'Envíos a todo el país',
    text: 'Con Andreani, a domicilio en toda Argentina.',
    href: null,
  },
  {
    icon: FileText,
    title: 'Factura A y B',
    text: 'Facturación completa para empresa o consumidor final.',
    href: null,
  },
];

export default function BenefitsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const canRightRef = useRef(false);
  const pausedRef = useRef(false);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setCanRight(right);
    canRightRef.current = right;
  }

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector('a, div[data-card]')?.getBoundingClientRect().width ?? 220;
    el.scrollBy({ left: dir === 'left' ? -(cardW * 2) : cardW * 2, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  // Avance automático: cada 3.5s pasa al siguiente grupo de tarjetas y vuelve al inicio al llegar al final.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    const resumeDelayed = () => { setTimeout(resume, 2500); };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeDelayed, { passive: true });

    const interval = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      if (canRightRef.current) {
        scroll('right');
      } else {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3500);

    return () => {
      clearInterval(interval);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeDelayed);
    };
  }, [scroll]);

  const cardClasses = 'group flex shrink-0 w-[calc(50%-1px)] sm:w-[calc(33.333%-1px)] lg:w-[calc(16.666%-1px)] flex-col items-center gap-2 px-4 py-2 text-center';

  return (
    <section className="border-y border-plate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-9 relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth divide-x divide-plate-100 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {BENEFITS.map(({ icon: Icon, title, text, href }) => {
            const inner = (
              <>
                <Icon className="h-7 w-7 text-steel-800 group-hover:text-amber-600 transition-colors" strokeWidth={1.5} />
                <p className="font-display text-sm font-bold text-steel-950 leading-tight mt-1">{title}</p>
                <p className="text-xs text-steel-400 leading-snug">{text}</p>
              </>
            );
            const isExternal = href?.startsWith('http');
            return href ? (
              isExternal ? (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>{inner}</a>
              ) : (
                <Link key={title} href={href} className={cardClasses}>{inner}</Link>
              )
            ) : (
              <div key={title} data-card className={cardClasses}>{inner}</div>
            );
          })}
        </div>

        {canLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label="Anterior"
            className="hidden sm:grid absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 place-items-center rounded-full border-2 border-plate-200 bg-white text-steel-600 shadow-sm transition hover:border-steel-700 hover:bg-steel-950 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canRight && (
          <button
            onClick={() => scroll('right')}
            aria-label="Siguiente"
            className="hidden sm:grid absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 place-items-center rounded-full border-2 border-plate-200 bg-white text-steel-600 shadow-sm transition hover:border-steel-700 hover:bg-steel-950 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
