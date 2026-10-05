'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { StaffName } from '@/lib/push';
import { STAFF_LABELS, type Relation } from '@/lib/turnero';

type Step = 'intro' | 'staff' | 'relation' | 'sending' | 'done' | 'adminInfo' | 'error';

const BUTTON_RED = 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600';

const RESET_DELAY_MS = 7000;

export default function TurneroPage() {
  const [step, setStep] = useState<Step>('intro');
  const [attendedBy, setAttendedBy] = useState<StaffName | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(resetTimer.current);
  }, []);

  function reset() {
    clearTimeout(resetTimer.current);
    setStep('intro');
    setAttendedBy(null);
  }

  function chooseStaff(staff: StaffName) {
    setAttendedBy(staff);
    setStep('relation');
  }

  async function chooseRelation(relation: Relation) {
    if (!attendedBy) return;
    setStep('sending');
    try {
      const res = await fetch('/api/turnero/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitType: 'ventas', attendedBy, relation }),
      });
      if (!res.ok) throw new Error();
      setStep('done');
    } catch {
      setStep('error');
    }
    resetTimer.current = setTimeout(reset, RESET_DELAY_MS);
  }

  async function chooseAdministracion() {
    setStep('adminInfo');
    resetTimer.current = setTimeout(reset, RESET_DELAY_MS);
    try {
      await fetch('/api/turnero/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitType: 'administracion' }),
      });
    } catch {
      // el cartel ya se muestra igual -- esto es solo para el conteo del reporte
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-steel-950 px-6 py-12 text-center select-none">
      <div className="relative h-24 w-56 mb-10">
        <Image src="/images/logo-behmont-turnero.png" alt="BEHMONT" fill className="object-contain" priority />
      </div>

      {step === 'intro' && (
        <>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-12 max-w-3xl">
            VENÍS A:
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
            <button
              onClick={() => setStep('staff')}
              className={`${BUTTON_RED} rounded-xl2 py-16 text-3xl sm:text-4xl font-display font-bold text-white shadow-card transition-colors`}
            >
              VENTAS
            </button>
            <button
              onClick={chooseAdministracion}
              className={`${BUTTON_RED} rounded-xl2 py-16 text-2xl sm:text-3xl font-display font-bold text-white shadow-card transition-colors`}
            >
              ADMINISTRACIÓN / PAGOS
            </button>
          </div>
        </>
      )}

      {step === 'staff' && (
        <>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-12 max-w-3xl">
            ELEGÍ POR QUIÉN SER ATENDIDO
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
            {(Object.keys(STAFF_LABELS) as StaffName[]).map((staff) => (
              <button
                key={staff}
                onClick={() => chooseStaff(staff)}
                className={`${BUTTON_RED} rounded-xl2 py-16 text-3xl sm:text-4xl font-display font-bold text-white shadow-card transition-colors`}
              >
                {STAFF_LABELS[staff].toUpperCase()}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'relation' && attendedBy && (
        <>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-12 max-w-3xl">
            ¿YA NOS CONOCÉS?
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
            <button
              onClick={() => chooseRelation('same')}
              className={`${BUTTON_RED} rounded-xl2 py-10 px-4 text-xl sm:text-2xl font-display font-bold text-white shadow-card transition-colors`}
            >
              Ya soy cliente de {STAFF_LABELS[attendedBy].toUpperCase()}
            </button>
            <button
              onClick={() => chooseRelation('social')}
              className={`${BUTTON_RED} rounded-xl2 py-10 px-4 text-xl sm:text-2xl font-display font-bold text-white shadow-card transition-colors`}
            >
              Le consulté por redes
            </button>
            <button
              onClick={() => chooseRelation('new')}
              className={`${BUTTON_RED} rounded-xl2 py-10 px-4 text-xl sm:text-2xl font-display font-bold text-white shadow-card transition-colors`}
            >
              No soy cliente
            </button>
          </div>
        </>
      )}

      {step === 'sending' && (
        <p className="text-2xl text-white/80 font-display">Avisando…</p>
      )}

      {step === 'done' && attendedBy && (
        <div className="max-w-2xl">
          <p className="text-6xl mb-6">✅</p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
            ¡Listo! Avisamos a {STAFF_LABELS[attendedBy]}
          </h1>
          <p className="text-lg text-white/70">En un momento te atiende. Gracias por elegirnos.</p>
        </div>
      )}

      {step === 'adminInfo' && (
        <div className="max-w-2xl">
          <p className="text-6xl mb-6">🧾</p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Por favor anunciate en ventanilla al final de la escalera
          </h1>
        </div>
      )}

      {step === 'error' && (
        <div className="max-w-2xl">
          <p className="text-6xl mb-6">⚠️</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            No pudimos avisar automáticamente
          </h1>
          <p className="text-lg text-white/70">Contanos en el mostrador quién te va a atender.</p>
        </div>
      )}
    </main>
  );
}
