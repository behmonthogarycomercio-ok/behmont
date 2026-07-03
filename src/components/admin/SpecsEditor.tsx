'use client';

import { Plus, X } from 'lucide-react';
import type { ProductSpec } from '@/lib/types';

export default function SpecsEditor({
  value,
  onChange,
}: {
  value: ProductSpec[];
  onChange: (specs: ProductSpec[]) => void;
}) {
  function update(i: number, field: 'label' | 'value', text: string) {
    const next = value.map((s, idx) => (idx === i ? { ...s, [field]: text } : s));
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {value.map((spec, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={spec.label}
            onChange={(e) => update(i, 'label', e.target.value)}
            placeholder="Ej: Potencia"
            className="w-1/3 rounded-lg border border-plate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            value={spec.value}
            onChange={(e) => update(i, 'value', e.target.value)}
            placeholder="Ej: 1.5 HP"
            className="flex-1 rounded-lg border border-plate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-steel-400 hover:text-red-600"
            aria-label="Quitar característica"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { label: '', value: '' }])}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-steel-600 hover:text-amber-600"
      >
        <Plus className="h-3.5 w-3.5" /> Agregar característica
      </button>
    </div>
  );
}
