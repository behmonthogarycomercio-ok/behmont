'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [children]);

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector(':scope > *')?.getBoundingClientRect().width ?? 240;
    el.scrollBy({ left: dir === 'left' ? -(cardW * 2 + 32) : cardW * 2 + 32, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      {canLeft && (
        <button onClick={() => scroll('left')} aria-label="Anterior"
          className="hidden sm:flex absolute -left-4 top-1/3 z-20 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-plate-200 text-steel-600 hover:text-[#0B1C3A] hover:border-steel-300 transition">
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {canRight && (
        <button onClick={() => scroll('right')} aria-label="Siguiente"
          className="hidden sm:flex absolute -right-4 top-1/3 z-20 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-plate-200 text-steel-600 hover:text-[#0B1C3A] hover:border-steel-300 transition">
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
