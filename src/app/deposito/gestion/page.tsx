'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DEPOSITO_STAFF, canGestionZonas, type DepositoPin } from '@/lib/deposito';
import ZonasGestionClient from '@/components/deposito/ZonasGestionClient';
import FotosGestionClient from '@/components/deposito/FotosGestionClient';
import UbicacionesGestionClient from '@/components/deposito/UbicacionesGestionClient';
import DepositoPushButton from '@/components/deposito/DepositoPushButton';

type ZonaApi = { id: string; parent_id: string | null; tipo: string; codigo: string; nombre: string; active: boolean };
type LocationApi = { id: string; zona_id: string; quantity: number };
type ProductoApi = {
  id: string;
  sku: string;
  name: string;
  stock: number;
  images?: string[] | null;
  product_locations?: LocationApi[] | null;
};

export default function DepositoGestionPage() {
  const [pendingPin, setPendingPin] = useState<DepositoPin | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authing, setAuthing] = useState(false);

  const [pin, setPin] = useState<DepositoPin | null>(null);
  const [code, setCode] = useState('');

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

  async function confirmCode() {
    if (pendingPin === null || codeInput.trim().length < 4) return;
    setAuthing(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/deposito/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pendingPin, code: codeInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Código incorrecto.');
        return;
      }
      setPin(pendingPin);
      setCode(codeInput.trim());
      setCodeInput('');
    } catch {
      setAuthError('No se pudo validar. Probá de nuevo.');
    } finally {
      setAuthing(false);
    }
  }

  function logout() {
    setPin(null);
    setPendingPin(null);
    setCode('');
    setCodeInput('');
    setAuthError(null);
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Gestión de depósito</h1>
        </div>

        {pin === null && pendingPin === null && (
          <div>
            <p className="text-sm text-white/60 mb-3">¿Quién sos?</p>
            <div className="grid grid-cols-2 gap-3">
              {DEPOSITO_STAFF.map((s) => (
                <button
                  key={s.pin}
                  onClick={() => setPendingPin(s.pin)}
                  className="rounded-xl2 bg-steel-900 border border-steel-800 py-6 text-lg font-bold hover:border-amber-500 hover:text-amber-400"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {pin === null && pendingPin !== null && (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6">
            <p className="text-sm text-white/60 mb-1">
              Hola <span className="font-semibold text-white">{DEPOSITO_STAFF.find((s) => s.pin === pendingPin)?.name}</span>,
              ingresá tu código secreto
            </p>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmCode()}
              placeholder="Código"
              className="w-full rounded-lg px-3 py-3 text-steel-900 mb-3"
              autoFocus
            />
            {authError && <p className="text-sm text-red-400 mb-3">{authError}</p>}
            <div className="flex gap-2">
              <button
                onClick={confirmCode}
                disabled={authing || codeInput.trim().length < 4}
                className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white"
              >
                {authing ? 'Verificando…' : 'Entrar'}
              </button>
              <button
                onClick={() => {
                  setPendingPin(null);
                  setCodeInput('');
                  setAuthError(null);
                }}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white/70"
              >
                Volver
              </button>
            </div>
          </div>
        )}

        {pin !== null && !canGestionZonas(pin) && (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6 text-center">
            <p className="text-white/70 mb-3">Esta sección es solo para Gabriel.</p>
            <button onClick={logout} className="text-xs text-amber-400 underline">
              Elegir otra persona
            </button>
          </div>
        )}

        {pin !== null && canGestionZonas(pin) && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">
                Entraste como <span className="font-semibold text-white">Gabriel</span>
              </p>
              <button onClick={logout} className="text-xs text-amber-400 underline">
                Cambiar
              </button>
            </div>

            {loadError && <p className="text-sm text-red-400">No se pudo cargar. Reintentando…</p>}

            <div>
              <DepositoPushButton pin={pin} code={code} />
            </div>

            <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
              <ZonasGestionClient pin={pin} code={code} zonas={zonas} onChanged={load} />
            </div>

            <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
              <UbicacionesGestionClient pin={pin} code={code} products={products} zonas={zonas} onChanged={load} />
            </div>

            <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-4">
              <FotosGestionClient pin={pin} code={code} products={products} onChanged={load} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
