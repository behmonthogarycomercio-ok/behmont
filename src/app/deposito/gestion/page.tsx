'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DEPOSITO_STAFF, canGestionZonas, type DepositoPin } from '@/lib/deposito';
import ZonasGestionClient from '@/components/deposito/ZonasGestionClient';
import FotosGestionClient from '@/components/deposito/FotosGestionClient';

type ZonaApi = { id: string; parent_id: string | null; tipo: string; codigo: string; nombre: string; active: boolean };
type ProductoApi = { id: string; sku: string; name: string; images?: string[] | null };

export default function DepositoGestionPage() {
  const [pin, setPin] = useState<DepositoPin | null>(null);
  const [zonas, setZonas] = useState<ZonaApi[]>([]);
  const [products, setProducts] = useState<ProductoApi[]>([]);
  const [loadError, setLoadError] = useState(false);

  async function load() {
    try {
      const res = await fetch('/api/deposito/productos');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setZonas(data.zonas);
      setProducts(data.products);
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }

  useEffect(() => {
    if (pin !== null && canGestionZonas(pin)) load();
  }, [pin]);

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Gestión de depósito</h1>
        </div>

        {pin === null ? (
          <div>
            <p className="text-sm text-white/60 mb-3">¿Quién sos?</p>
            <div className="grid grid-cols-2 gap-3">
              {DEPOSITO_STAFF.map((s) => (
                <button
                  key={s.pin}
                  onClick={() => setPin(s.pin)}
                  className="rounded-xl2 bg-steel-900 border border-steel-800 py-6 text-lg font-bold hover:border-amber-500 hover:text-amber-400"
                >
                  {s.pin} — {s.name}
                </button>
              ))}
            </div>
          </div>
        ) : !canGestionZonas(pin) ? (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6 text-center">
            <p className="text-white/70 mb-3">Esta sección es solo para Gabriel.</p>
            <button onClick={() => setPin(null)} className="text-xs text-amber-400 underline">
              Elegir otra persona
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">
                Entraste como <span className="font-semibold text-white">Gabriel</span>
              </p>
              <button onClick={() => setPin(null)} className="text-xs text-amber-400 underline">
                Cambiar
              </button>
            </div>

            {loadError && <p className="text-sm text-red-400">No se pudo cargar. Reintentando…</p>}

            <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
              <ZonasGestionClient pin={pin} zonas={zonas} onChanged={load} />
            </div>

            <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
              <FotosGestionClient pin={pin} products={products} onChanged={load} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
