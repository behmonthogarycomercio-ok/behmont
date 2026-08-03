'use client';

import { useState } from 'react';
import { ChevronDown, Percent } from 'lucide-react';
import { useLocation } from '@/lib/location-context';
import {
  DAILY_PLANS, MONTHLY_PLANS,
  calcDaily, calcWeekly, calcMonthly, fmtARS,
  type DailyPlan, type MonthlyPlan,
} from '@/lib/financing';

type Freq = 'daily' | 'weekly' | 'monthly';
type AnyPlan = DailyPlan | MonthlyPlan;

const FREQ_OPTIONS: { key: Freq; label: string }[] = [
  { key: 'daily',   label: 'Por día' },
  { key: 'weekly',  label: 'Por semana' },
  { key: 'monthly', label: 'Por mes' },
];

// Desplegable con vista previa de cuotas, pegado a "Medios de pago" en la
// ficha de producto -- para que el cliente vea cómo le quedaría antes de
// agregar al carrito. Solo se muestra en zonas con financiación propia
// habilitada (mismo gate que el badge "Financiación propia").
export default function ProductFinancingPreview({ price }: { price: number }) {
  const { allowed } = useLocation();
  const [open, setOpen] = useState(false);
  const [freq, setFreq] = useState<Freq>('daily');
  const [planIdx, setPlanIdx] = useState(0);

  if (!allowed) return null;

  const activePlans: AnyPlan[] = freq === 'monthly' ? MONTHLY_PLANS : DAILY_PLANS;
  const safeIdx = Math.min(planIdx, activePlans.length - 1);
  const currentPlan = activePlans[safeIdx];

  function getPlanAmount(plan: AnyPlan): number {
    if ('months' in plan) return calcMonthly(price, plan.surcharge, plan.months);
    if (freq === 'weekly') return calcWeekly(price, plan.surcharge, plan.days);
    return calcDaily(price, plan.surcharge, plan.days);
  }

  function getPlanLabel(plan: AnyPlan): string {
    if ('months' in plan) return `${plan.months} meses`;
    if (freq === 'weekly') return `${plan.weeks} semanas`;
    return `${plan.days} días`;
  }

  const cuota = getPlanAmount(currentPlan);
  const totalDevolver = price * (1 + currentPlan.surcharge);
  const freqLabel = freq === 'daily' ? 'día' : freq === 'weekly' ? 'semana' : 'mes';

  return (
    <div className="mt-3 rounded-xl border border-plate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-plate-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-amber-600 shrink-0" />
          <span className="text-sm font-semibold text-steel-900">¿Cómo te queda financiado?</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-steel-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="border-t border-plate-200 p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {FREQ_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setFreq(key); setPlanIdx(0); }}
                className={`rounded-lg py-2 font-mono text-[11px] font-semibold uppercase tracking-wide border transition-colors ${
                  freq === key
                    ? 'bg-steel-950 text-white border-steel-950'
                    : 'bg-white text-steel-500 border-plate-200 hover:border-steel-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={safeIdx}
            onChange={(e) => setPlanIdx(Number(e.target.value))}
            className="w-full rounded-lg border border-plate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-steel-400 bg-white"
          >
            {activePlans.map((plan, i) => (
              <option key={i} value={i}>
                {getPlanLabel(plan)} (+{Math.round(plan.surcharge * 100)}%) — ${fmtARS(getPlanAmount(plan))} por {freqLabel}
              </option>
            ))}
          </select>

          <div className="rounded-xl bg-steel-950 text-white p-4 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Total a devolver</span>
              <span className="font-mono text-sm font-semibold text-amber-400">${fmtARS(totalDevolver)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-white/10 pt-2 mt-1">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Cuota por {freqLabel}</span>
              <span className="font-display text-2xl font-bold">${fmtARS(cuota)}</span>
            </div>
          </div>

          <p className="text-xs text-steel-400">
            Sin tarjeta ni banco. Coordinamos la documentación y la primera cuota al agregarlo a tu pedido.
          </p>
        </div>
      )}
    </div>
  );
}
