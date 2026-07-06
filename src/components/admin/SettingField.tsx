'use client';

import { useState, useTransition } from 'react';
import { updateSiteSetting } from '@/lib/actions';

export default function SettingField({
  settingKey,
  defaultValue,
  placeholder,
}: {
  settingKey: string;
  defaultValue: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSave() {
    setError(null);
    startTransition(async () => {
      try {
        await updateSiteSetting(settingKey, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo guardar.');
      }
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-plate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          onClick={handleSave}
          disabled={pending}
          className="rounded-lg bg-steel-900 px-4 py-2 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50"
        >
          {saved ? 'Guardado ✓' : 'Guardar'}
        </button>
      </div>
      {error && <p role="alert" className="mt-1 text-xs font-medium text-danger-600">{error}</p>}
    </div>
  );
}
