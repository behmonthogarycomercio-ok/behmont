'use client';

import { useState, useTransition } from 'react';
import { COBRADORES, type CobradorPin } from '@/lib/preventas';
import { setCobradorStaffSecret } from '@/lib/actions';

const EMPTY_VALUES: Record<CobradorPin, string> = Object.fromEntries(
  COBRADORES.map((c) => [c.pin, ''])
) as Record<CobradorPin, string>;

export default function CobradorStaffSecrets() {
  const [values, setValues] = useState<Record<CobradorPin, string>>(EMPTY_VALUES);
  const [pending, startTransition] = useTransition();
  const [savedPin, setSavedPin] = useState<CobradorPin | null>(null);
  const [errors, setErrors] = useState<Record<number, string>>({});

  function save(pin: CobradorPin) {
    setErrors((prev) => ({ ...prev, [pin]: '' }));
    startTransition(async () => {
      const result = await setCobradorStaffSecret(pin, values[pin]);
      if (result?.error) {
        setErrors((prev) => ({ ...prev, [pin]: result.error! }));
        return;
      }
      setValues((prev) => ({ ...prev, [pin]: '' }));
      setSavedPin(pin);
      setTimeout(() => setSavedPin(null), 1500);
    });
  }

  const porCiudad = new Map<string, typeof COBRADORES[number][]>();
  for (const c of COBRADORES) {
    const list = porCiudad.get(c.ciudad) || [];
    list.push(c);
    porCiudad.set(c.ciudad, list);
  }

  return (
    <div className="rounded-xl2 border border-plate-200 bg-white shadow-card p-5 mb-8">
      <h2 className="font-display text-lg font-bold text-steel-950 mb-1">Códigos de los cobradores</h2>
      <p className="text-sm text-steel-500 mb-3">
        Cada cobrador necesita su código secreto para poder aprobar/rechazar preventas en{' '}
        <span className="font-mono">/ventas/cobrador</span>. Definilo acá y contaselo en persona; no se
        puede volver a ver una vez guardado.
      </p>
      <div className="flex flex-col gap-4 max-w-md">
        {Array.from(porCiudad.entries()).map(([ciudad, personas]) => (
          <div key={ciudad}>
            <p className="text-xs font-semibold uppercase tracking-wide text-steel-400 mb-1.5">{ciudad}</p>
            <div className="flex flex-col gap-2">
              {personas.map((c) => (
                <div key={c.pin} className="flex items-center gap-2">
                  <span className="w-24 text-sm font-medium text-steel-700">{c.name}</span>
                  <input
                    type="text"
                    value={values[c.pin]}
                    onChange={(e) => setValues((prev) => ({ ...prev, [c.pin]: e.target.value }))}
                    placeholder="código nuevo"
                    className="flex-1 rounded-lg border border-plate-200 px-3 py-1.5 text-sm"
                  />
                  <button
                    onClick={() => save(c.pin)}
                    disabled={pending || values[c.pin].trim().length < 4}
                    className="rounded-lg bg-steel-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-steel-800 disabled:opacity-40"
                  >
                    {savedPin === c.pin ? 'Guardado ✓' : 'Guardar'}
                  </button>
                </div>
              ))}
            </div>
            {personas.some((c) => errors[c.pin]) && (
              <p role="alert" className="mt-1 text-xs font-medium text-danger-600">
                {personas.map((c) => errors[c.pin]).find(Boolean)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
