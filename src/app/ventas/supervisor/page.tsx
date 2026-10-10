'use client';

import { useState } from 'react';
import Image from 'next/image';
import SupervisorPushButton from '@/components/preventas/SupervisorPushButton';

// Alejandro (supervisor de cobradores, PIN 1 del roster de depósito) activa
// acá los avisos de escalada de 24/48hs. Reusa su código secreto de
// /deposito -- misma tabla, mismo mecanismo.
export default function VentasSupervisorPage() {
  const [codeInput, setCodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authing, setAuthing] = useState(false);
  const [code, setCode] = useState('');
  const [authed, setAuthed] = useState(false);

  async function confirmCode() {
    if (codeInput.trim().length < 4) return;
    setAuthing(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/deposito/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: 1, code: codeInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Código incorrecto.');
        return;
      }
      setCode(codeInput.trim());
      setAuthed(true);
    } catch {
      setAuthError('No se pudo validar. Probá de nuevo.');
    } finally {
      setAuthing(false);
    }
  }

  return (
    <main className="min-h-screen bg-steel-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative h-12 w-28 shrink-0">
            <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
          </div>
          <h1 className="font-display text-2xl font-extrabold">Supervisor</h1>
        </div>

        {!authed ? (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6">
            <p className="text-sm text-white/60 mb-1">
              Hola <span className="font-semibold text-white">Alejandro</span>, ingresá tu código secreto
            </p>
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmCode()}
              placeholder="Código"
              className="w-full rounded-lg px-3 py-3 text-steel-900 mb-3 mt-3"
              autoFocus
            />
            {authError && <p className="text-sm text-red-400 mb-3">{authError}</p>}
            <button
              onClick={confirmCode}
              disabled={authing || codeInput.trim().length < 4}
              className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white"
            >
              {authing ? 'Verificando…' : 'Entrar'}
            </button>
          </div>
        ) : (
          <div className="rounded-xl2 bg-steel-900 border border-steel-800 p-6">
            <p className="text-sm text-white/60 mb-4">
              Te vamos a avisar si una preventa queda 24 o 48hs sin que el cobrador la resuelva.
            </p>
            <SupervisorPushButton code={code} />
          </div>
        )}
      </div>
    </main>
  );
}
