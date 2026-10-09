'use client';

import { useState, useTransition } from 'react';
import { DEPOSITO_STAFF, type DepositoPin } from '@/lib/deposito';
import { setDepositoStaffSecret } from '@/lib/actions';

export default function DepositoStaffSecrets() {
  const [values, setValues] = useState<Record<DepositoPin, string>>({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' });
  const [pending, startTransition] = useTransition();
  const [savedPin, setSavedPin] = useState<DepositoPin | null>(null);
  const [errors, setErrors] = useState<Record<number, string>>({});

  function save(pin: DepositoPin) {
    setErrors((prev) => ({ ...prev, [pin]: '' }));
    startTransition(async () => {
      const result = await setDepositoStaffSecret(pin, values[pin]);
      if (result?.error) {
        setErrors((prev) => ({ ...prev, [pin]: result.error! }));
        return;
      }
      setValues((prev) => ({ ...prev, [pin]: '' }));
      setSavedPin(pin);
      setTimeout(() => setSavedPin(null), 1500);
    });
  }

  return (
    <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5 mb-8">
      <h2 className="font-display text-lg font-bold text-steel-950 mb-1">Códigos de acceso a la terminal</h2>
      <p className="text-sm text-steel-500 mb-3">
        Cada persona necesita su código secreto (no solo elegir su nombre) para poder retirar/ingresar
        stock en <span className="font-mono">/deposito</span> -- así nadie puede operar a nombre de otro.
        Definilo acá y contaselo en persona; no se puede volver a ver una vez guardado.
      </p>
      <div className="flex flex-col gap-2 max-w-md">
        {DEPOSITO_STAFF.map((s) => (
          <div key={s.pin} className="flex items-center gap-2">
            <span className="w-24 text-sm font-medium text-steel-700">{s.name}</span>
            <input
              type="text"
              value={values[s.pin]}
              onChange={(e) => setValues((prev) => ({ ...prev, [s.pin]: e.target.value }))}
              placeholder="código nuevo"
              className="flex-1 rounded-lg border border-plate-200 px-3 py-1.5 text-sm"
            />
            <button
              onClick={() => save(s.pin)}
              disabled={pending || values[s.pin].trim().length < 4}
              className="rounded-lg bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800 disabled:opacity-40"
            >
              {savedPin === s.pin ? 'Guardado ✓' : 'Guardar'}
            </button>
          </div>
        ))}
      </div>
      {Object.entries(errors).map(([pin, msg]) =>
        msg ? (
          <p key={pin} role="alert" className="mt-2 text-xs font-medium text-danger-600">{msg}</p>
        ) : null
      )}
    </div>
  );
}
