'use client';

import { useState } from 'react';
import {
  DAILY_PLANS, MONTHLY_PLANS, LOAN_PLANS, ALLOWED_ZONES,
  getZoneFromPostalCode, calcDaily, calcWeekly, calcMonthly, fmtARS,
  type DailyPlan, type MonthlyPlan,
} from '@/lib/financing';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type Mode = 'financing' | 'loan';
type Freq = 'daily' | 'weekly' | 'monthly';
type AnyPlan = DailyPlan | MonthlyPlan;

const STEP_LABELS = ['Requisitos', 'Calculadora', 'Solicitud'];

const REQS = [
  { key: 'dni',     text: 'Foto de DNI — frente y dorso' },
  { key: 'service', text: 'Servicio a tu nombre: luz, agua o internet (o titular del domicilio de entrega)' },
  { key: 'income',  text: 'Factura de compra a proveedor, garante con recibo de sueldo, o recibo de sueldo propio' },
];

export default function FinancingCalculator({
  mode,
  initialAmount,
  productsSummary,
  whatsappNumber,
}: {
  mode: Mode;
  initialAmount?: number;
  productsSummary?: string;
  whatsappNumber: string;
}) {
  const [step, setStep] = useState(1);

  // Step 1
  const [reqs, setReqs] = useState({ dni: false, service: false, income: false });
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState<string | null>(null);
  const [cpError, setCpError] = useState('');

  // Step 2
  const [amount, setAmount] = useState(initialAmount ? String(initialAmount) : '');
  const [freq, setFreq] = useState<Freq>('daily');
  const [planIdx, setPlanIdx] = useState(0);

  // Step 3
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const allReqsMet = reqs.dni && reqs.service && reqs.income;
  const principal = parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 0;

  const basePlans: DailyPlan[] = mode === 'loan' ? LOAN_PLANS : DAILY_PLANS;
  const activePlans: AnyPlan[] = freq === 'monthly' ? MONTHLY_PLANS : basePlans;
  const safeIdx = Math.min(planIdx, activePlans.length - 1);
  const currentPlan = activePlans[safeIdx];

  function getPlanAmount(plan: AnyPlan): number {
    if ('months' in plan) return calcMonthly(principal, plan.surcharge, plan.months);
    if (freq === 'weekly')  return calcWeekly(principal, plan.surcharge, plan.days);
    return calcDaily(principal, plan.surcharge, plan.days);
  }

  function getPlanLabel(plan: AnyPlan): string {
    if ('months' in plan) return `${plan.months} meses`;
    if (freq === 'weekly')  return `${plan.weeks} semanas`;
    return `${plan.days} días`;
  }

  const cuota = principal > 0 ? getPlanAmount(currentPlan) : 0;
  const totalDevolver = principal * (1 + currentPlan.surcharge);
  const freqLabel = freq === 'daily' ? 'día' : freq === 'weekly' ? 'semana' : 'mes';

  function checkPostalCode() {
    const cp = postalCode.trim();
    if (!cp) { setCpError('Ingresá tu código postal'); return; }
    const found = getZoneFromPostalCode(cp);
    if (!found) {
      setCpError('Solo financiamos en: Concordia, Federación, Federal, Chajarí, Concepción del Uruguay y Gualeguaychú.');
      setCity(null);
    } else {
      setCpError('');
      setCity(found);
    }
  }

  function buildMessage(): string {
    const lines: string[] = [
      mode === 'financing'
        ? '💳 *Solicitud de Financiación — BEHMONT*'
        : '💵 *Solicitud de Préstamo en Efectivo — BEHMONT*',
      '',
      `👤 ${form.name}`,
      `📞 ${form.phone}`,
      `📍 ${form.address || 'No indicó dirección'}`,
      `📮 CP ${postalCode} — ${city}`,
      '',
      ...(mode === 'financing' && productsSummary
        ? [`🛒 Productos: ${productsSummary}`, '']
        : []),
      `💰 Monto: $${fmtARS(principal)}`,
      `📋 Plan: ${getPlanLabel(currentPlan)} (+${Math.round(currentPlan.surcharge * 100)}%)`,
      `💵 Total a devolver: $${fmtARS(totalDevolver)}`,
      `💵 Cuota por ${freqLabel}: $${fmtARS(cuota)}`,
      '',
      '_Solicitud desde behmont.com.ar_',
    ];
    return buildWhatsAppLink(whatsappNumber, lines.join('\n'));
  }

  const freqOptions: { key: Freq; label: string }[] = [
    { key: 'daily',   label: 'Por día' },
    { key: 'weekly',  label: 'Por semana' },
    ...(mode === 'financing' ? [{ key: 'monthly' as Freq, label: 'Por mes' }] : []),
  ];

  return (
    <div className="space-y-5">
      {/* Step indicator */}
      <div className="flex items-center font-mono text-[11px] uppercase tracking-wide">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          return (
            <span key={n} className="flex items-center">
              {i > 0 && <span className="mx-2.5 text-steel-200">/</span>}
              <span className={
                step === n ? 'text-steel-900 font-bold' :
                step > n  ? 'text-amber-600 font-semibold' :
                'text-steel-300'
              }>
                {n}. {label}
              </span>
            </span>
          );
        })}
      </div>

      {/* ── STEP 1: Requirements + Zone ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-plate-200 bg-white p-6 space-y-4">
            <div>
              <h2 className="font-display text-lg font-bold text-steel-950">Requisitos necesarios</h2>
              <p className="mt-1 text-sm text-steel-400">Confirmá que tenés toda la documentación antes de continuar.</p>
            </div>
            {REQS.map(({ key, text }) => (
              <label key={key} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reqs[key as keyof typeof reqs]}
                  onChange={(e) => setReqs((r) => ({ ...r, [key]: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded accent-amber-500 shrink-0"
                />
                <span className={`text-sm leading-snug transition-colors ${reqs[key as keyof typeof reqs] ? 'text-steel-900 font-medium' : 'text-steel-500'}`}>
                  {text}
                </span>
              </label>
            ))}
          </div>

          <div className="rounded-xl border border-plate-200 bg-white p-6 space-y-3">
            <div>
              <h2 className="font-display text-lg font-bold text-steel-950">Zona de entrega</h2>
              <p className="mt-1 text-sm text-steel-400">
                Financiamos y entregamos sin cargo en:{' '}
                <span className="font-medium text-steel-700">
                  {ALLOWED_ZONES.map((z) => z.city).join(', ')}.
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Código postal · Ej: 3200"
                value={postalCode}
                onChange={(e) => { setPostalCode(e.target.value); setCpError(''); setCity(null); }}
                onKeyDown={(e) => e.key === 'Enter' && checkPostalCode()}
                className="flex-1 rounded-lg border border-plate-200 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-steel-400"
              />
              <button
                onClick={checkPostalCode}
                className="rounded-lg bg-steel-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-steel-800 transition-colors"
              >
                Verificar
              </button>
            </div>
            {cpError && <p className="text-xs text-red-600 leading-snug">{cpError}</p>}
            {city && (
              <p className="text-xs font-mono font-semibold text-green-700">
                ✓ Zona habilitada — {city}
              </p>
            )}
          </div>

          <button
            disabled={!allReqsMet || !city}
            onClick={() => setStep(2)}
            className="w-full rounded-xl bg-steel-950 py-3.5 text-sm font-bold text-white transition-colors hover:bg-steel-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Ver opciones de {mode === 'financing' ? 'financiación' : 'préstamo'} →
          </button>
        </div>
      )}

      {/* ── STEP 2: Calculator ── */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Amount input */}
          <div className="rounded-xl border border-plate-200 bg-white p-5 space-y-2">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-wide text-steel-400 block">
              {mode === 'financing' ? 'Monto del pedido' : 'Monto del préstamo'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-steel-400 pointer-events-none">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.,]/g, '')); setPlanIdx(0); }}
                placeholder="50000"
                className="w-full rounded-lg border border-plate-200 pl-8 pr-4 py-3 font-mono text-xl font-bold text-steel-950 focus:outline-none focus:border-steel-400 placeholder:text-steel-200 placeholder:font-normal placeholder:text-base"
              />
            </div>
          </div>

          {/* Frequency tabs */}
          <div className={`grid gap-2 grid-cols-${freqOptions.length}`}>
            {freqOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setFreq(key); setPlanIdx(0); }}
                className={`rounded-lg py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide border transition-colors ${
                  freq === key
                    ? 'bg-steel-950 text-white border-steel-950'
                    : 'bg-white text-steel-500 border-plate-200 hover:border-steel-300 hover:text-steel-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Plans table */}
          <div className="rounded-xl border border-plate-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-plate-50 border-b border-plate-200">
              {['Plazo', 'Recargo', 'Cuota'].map((h, i) => (
                <div key={h} className={`px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-steel-400 ${i === 2 ? 'text-right' : ''}`}>
                  {h}
                </div>
              ))}
            </div>
            {activePlans.map((plan, i) => {
              const result = principal > 0 ? getPlanAmount(plan) : null;
              const selected = safeIdx === i;
              return (
                <button
                  key={i}
                  onClick={() => setPlanIdx(i)}
                  className={`w-full grid grid-cols-3 border-t border-plate-200 transition-colors text-left ${
                    selected ? 'bg-amber-50' : 'bg-white hover:bg-plate-50'
                  }`}
                >
                  <div className={`px-4 py-3 font-mono text-sm font-bold ${selected ? 'text-amber-700' : 'text-steel-900'}`}>
                    {getPlanLabel(plan)}
                  </div>
                  <div className="px-4 py-3 font-mono text-sm text-steel-500">
                    +{Math.round(plan.surcharge * 100)}%
                  </div>
                  <div className={`px-4 py-3 font-mono text-sm font-bold text-right ${selected ? 'text-amber-700' : 'text-steel-900'}`}>
                    {result !== null ? `$${fmtARS(result)}` : '—'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live summary */}
          {principal > 0 && (
            <div className="rounded-xl bg-steel-950 text-white p-5 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Resumen del plan</p>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Monto</span>
                <span className="font-mono text-sm font-semibold">${fmtARS(principal)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Total a devolver</span>
                <span className="font-mono text-sm font-semibold text-amber-400">${fmtARS(totalDevolver)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/10 pt-2 mt-1">
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wide">Cuota por {freqLabel}</span>
                <span className="font-display text-2xl font-bold">${fmtARS(cuota)}</span>
              </div>
              <p className="font-mono text-[10px] text-white/30 mt-1">
                Primera cuota ("de bajada") al recibir el {mode === 'financing' ? 'producto' : 'efectivo'}. Podés adelantar cuotas cuando quieras.
              </p>
            </div>
          )}

          <button
            disabled={!principal}
            onClick={() => setStep(3)}
            className="w-full rounded-xl bg-steel-950 py-3.5 text-sm font-bold text-white transition-colors hover:bg-steel-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuar con este plan →
          </button>

          <button onClick={() => setStep(1)} className="w-full text-sm font-mono text-steel-400 hover:text-steel-700 transition-colors">
            ← Volver
          </button>
        </div>
      )}

      {/* ── STEP 3: Contact + Submit ── */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Plan reminder */}
          <div className="rounded-xl bg-steel-950 text-white p-5 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Plan seleccionado</p>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase">Plazo</span>
              <span className="font-mono text-sm font-bold">{getPlanLabel(currentPlan)}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase">Total a devolver</span>
              <span className="font-mono text-sm font-bold text-amber-400">${fmtARS(totalDevolver)}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-white/50 uppercase">Cuota por {freqLabel}</span>
              <span className="font-display text-2xl font-bold">${fmtARS(cuota)}</span>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-xl border border-plate-200 bg-white p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-steel-950">Tus datos</h2>
            {[
              { key: 'name',    label: 'Nombre y apellido *', type: 'text',  placeholder: 'Juan Pérez',        required: true  },
              { key: 'phone',   label: 'Teléfono / WhatsApp *', type: 'tel', placeholder: '+54 9 3454...',     required: true  },
              { key: 'address', label: 'Dirección de entrega',  type: 'text', placeholder: 'Calle, número, localidad', required: false },
            ].map(({ key, label, type, placeholder, required }) => (
              <div key={key} className="space-y-1.5">
                <label className="font-mono text-[11px] font-semibold uppercase tracking-wide text-steel-400 block">
                  {label}
                </label>
                <input
                  type={type}
                  required={required}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-plate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-steel-400"
                />
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={form.name && form.phone ? buildMessage() : undefined}
            onClick={(e) => { if (!form.name || !form.phone) e.preventDefault(); }}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold transition-colors ${
              form.name && form.phone
                ? 'bg-[#25D366] text-white hover:bg-[#1ebe5a]'
                : 'bg-plate-200 text-steel-400 cursor-not-allowed'
            }`}
          >
            <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar solicitud por WhatsApp
          </a>

          <button onClick={() => setStep(2)} className="w-full text-sm font-mono text-steel-400 hover:text-steel-700 transition-colors">
            ← Cambiar plan
          </button>
        </div>
      )}
    </div>
  );
}
