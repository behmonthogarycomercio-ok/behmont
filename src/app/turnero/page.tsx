'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { StaffName } from '@/lib/push';
import { STAFF_LABELS } from '@/lib/turnero';

type Step = 'staff' | 'relation' | 'sending' | 'done' | 'error';

const STAFF_COLORS: Record<StaffName, string> = {
  lucas: 'bg-steel-800 hover:bg-steel-700 active:bg-steel-900',
  luz: 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600',
  lito: 'bg-steel-600 hover:bg-steel-500 active:bg-steel-700',
};

const RESET_DELAY_MS = 7000;

export default function TurneroPage() {
  const [step, setStep] = useState<Step>('staff');
  const [attendedBy, setAttendedBy] = useState<StaffName | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(resetTimer.current);
  }, []);

  function reset() {
    clearTimeout(resetTimer.current);
    setStep('staff');
    setAttendedBy(null);
  }

  function chooseStaff(staff: StaffName) {
    setAttendedBy(staff);
    setStep('relation');
  }

  async function chooseRelation(regularOf: StaffName | null) {
    if (!attendedBy) return;
    setStep('sending');
    try {
      const res = await fetch('/api/turnero/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendedBy, regularOf }),
      });
      if (!res.ok) throw new Error();
      setStep('done');
    } catch {
      setStep('error');
    }
    resetTimer.current = setTimeout(reset, RESET_DELAY_MS);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-steel-950 px-6 py-12 text-center select-none">
      <div className="relative h-16 w-40 mb-10">
        <Image src="/images/logo-behmont.png" alt="BEHMONT" fill className="object-contain" priority />
      </div>

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
                className={`${STAFF_COLORS[staff]} rounded-xl2 py-16 text-3xl sm:text-4xl font-display font-bold text-white shadow-card transition-colors`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
            {(Object.keys(STAFF_LABELS) as StaffName[]).map((staff) => (
              <button
                key={staff}
                onClick={() => chooseRelation(staff)}
                className="rounded-xl2 py-8 px-4 text-xl sm:text-2xl font-display font-bold text-steel-950 bg-white hover:bg-plate-100 active:bg-plate-200 shadow-card transition-colors"
              >
                Ya soy cliente de {STAFF_LABELS[staff].toUpperCase()}
              </button>
            ))}
            <button
              onClick={() => chooseRelation(null)}
              className="sm:col-span-2 rounded-xl2 py-8 px-4 text-xl sm:text-2xl font-display font-bold text-white bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-card transition-colors"
            >
              PRIMERA VEZ EN BEHMONT
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
