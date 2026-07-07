'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function SearchInput({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-xl">
      <div className="flex flex-1 items-center gap-3 rounded-full border border-plate-200 bg-plate-50 px-5 py-3 transition focus-within:border-steel-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/30">
        <svg className="h-4 w-4 shrink-0 text-steel-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          name="q"
          defaultValue={defaultValue}
          placeholder="Buscar productos, marcas o categorías..."
          autoFocus
          className="w-full bg-transparent text-sm text-steel-900 placeholder:text-steel-400 outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-steel-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-steel-800 active:scale-[0.97]"
      >
        Buscar
      </button>
    </form>
  );
}
