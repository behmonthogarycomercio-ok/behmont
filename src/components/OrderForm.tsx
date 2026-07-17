'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, Wallet, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLocation } from '@/lib/location-context';
import {
  DAILY_PLANS, MONTHLY_PLANS,
  calcDaily, calcWeekly, calcMonthly, fmtARS,
  type DailyPlan, type MonthlyPlan,
} from '@/lib/financing';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';

type Freq = 'daily' | 'weekly' | 'monthly';
type AnyPlan = DailyPlan | MonthlyPlan;

const FREQ_OPTIONS: { key: Freq; label: string }[] = [
  { key: 'daily',   label: 'Por día' },
  { key: 'weekly',  label: 'Por semana' },
  { key: 'monthly', label: 'Por mes' },
];

export default function OrderForm() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const { allowed } = useLocation();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', note: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState('');
  const [mpLoading, setMpLoading] = useState(false);
  const [mpError, setMpError] = useState('');

  // Vista previa de financiación (solo para el pedido por WhatsApp, no aplica a MercadoPago)
  const [wantsFinancing, setWantsFinancing] = useState(false);
  const [freq, setFreq] = useState<Freq>('daily');
  const [planIdx, setPlanIdx] = useState(0);

  const activePlans: AnyPlan[] = freq === 'monthly' ? MONTHLY_PLANS : DAILY_PLANS;
  const safeIdx = Math.min(planIdx, activePlans.length - 1);
  const currentPlan = activePlans[safeIdx];

  function getPlanAmount(plan: AnyPlan): number {
    if ('months' in plan) return calcMonthly(total, plan.surcharge, plan.months);
    if (freq === 'weekly') return calcWeekly(total, plan.surcharge, plan.days);
    return calcDaily(total, plan.surcharge, plan.days);
  }

  function getPlanLabel(plan: AnyPlan): string {
    if ('months' in plan) return `${plan.months} meses`;
    if (freq === 'weekly') return `${plan.weeks} semanas`;
    return `${plan.days} días`;
  }

  const cuota = total > 0 ? getPlanAmount(currentPlan) : 0;
  const totalDevolver = total * (1 + currentPlan.surcharge);
  const freqLabel = freq === 'daily' ? 'día' : freq === 'weekly' ? 'semana' : 'mes';

  function financingSummary(): string | undefined {
    if (!wantsFinancing) return undefined;
    return `${getPlanLabel(currentPlan)} (+${Math.round(currentPlan.surcharge * 100)}%) — Cuota por ${freqLabel}: $${fmtARS(cuota)} — Total a devolver: $${fmtARS(totalDevolver)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSending(true);

    try {
      const res = await fetch('/api/whatsapp/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          customerAddress: form.address,
          customerNote: form.note,
          financingPlan: financingSummary(),
          items,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        const fieldErrors: Record<string, string> = {};
        for (const [key, msgs] of Object.entries(data.error || {})) {
          fieldErrors[key] = Array.isArray(msgs) ? (msgs[0] as string) : String(msgs);
        }
        setErrors(fieldErrors);
        return;
      }

      window.open(data.whatsappUrl, '_blank');
      setSentName(form.name.split(' ')[0]);
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-12 px-4 space-y-5">
        <div className="h-16 w-16 rounded-full bg-emerald-100 grid place-items-center">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-steel-950 tracking-tight">
            ¡Pedido enviado, {sentName}!
          </h2>
          <p className="mt-2 text-sm text-steel-400 leading-relaxed max-w-sm mx-auto">
            Se abrió WhatsApp con el detalle de tu pedido. En cuanto lo enviés, lo procesamos y te confirmamos a la brevedad.
          </p>
          <p className="mt-1 text-xs text-steel-300 leading-relaxed max-w-sm mx-auto">
            Por las dudas, dejamos tu pedido guardado acá hasta que confirmes que se envió.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-px bg-plate-200 rounded-xl overflow-hidden w-full max-w-sm text-center mt-2">
          <div className="bg-plate-50 px-3 py-3">
            <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">1</p>
            <p className="font-mono text-[10px] text-steel-400 mt-0.5">Pedido enviado</p>
          </div>
          <div className="bg-plate-50 px-3 py-3">
            <p className="font-mono text-[10px] font-bold text-steel-400 uppercase tracking-wide">2</p>
            <p className="font-mono text-[10px] text-steel-300 mt-0.5">Confirmación</p>
          </div>
          <div className="bg-plate-50 px-3 py-3">
            <p className="font-mono text-[10px] font-bold text-steel-400 uppercase tracking-wide">3</p>
            <p className="font-mono text-[10px] text-steel-300 mt-0.5">Entrega</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-2 rounded-xl bg-steel-950 px-8 py-3 text-sm font-bold text-white hover:bg-steel-800 transition-colors"
        >
          Seguir comprando
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSent(false)}
            className="font-mono text-[11px] text-steel-300 hover:text-steel-600 transition-colors"
          >
            Editar pedido
          </button>
          <button
            onClick={() => { clear(); setSent(false); }}
            className="font-mono text-[11px] text-steel-300 hover:text-steel-600 transition-colors"
          >
            Ya se envió, vaciar carrito
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-plate-200 p-10 text-center">
        <p className="text-steel-500 mb-4">Todavía no agregaste productos a tu pedido.</p>
        <Link href="/" className="text-amber-600 font-semibold hover:underline">
          Ver catálogo →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="divide-y divide-plate-200 rounded-xl2 border border-plate-200">
        {items.map((item) => (
          <li key={item.sku} className="flex items-center gap-4 p-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-steel-900 text-sm truncate">{item.name}</p>
              <p className="text-xs text-steel-500">Código: {item.sku}</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-plate-200 px-1.5 py-1">
              <button
                onClick={() => updateQty(item.sku, item.qty - 1)}
                className="grid h-6 w-6 place-items-center rounded transition active:scale-[0.95] hover:bg-plate-100"
                aria-label="Restar"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-5 text-center text-sm">{item.qty}</span>
              <button
                onClick={() => updateQty(item.sku, item.qty + 1)}
                className="grid h-6 w-6 place-items-center rounded transition active:scale-[0.95] hover:bg-plate-100"
                aria-label="Sumar"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <span className="w-24 text-right font-semibold text-sm text-steel-900">
              ${(item.price * item.qty).toLocaleString('es-AR')}
            </span>
            <button
              onClick={() => removeItem(item.sku)}
              className="text-steel-400 hover:text-danger-600"
              aria-label={`Quitar ${item.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <p className="font-display text-lg font-bold text-steel-950">
          Total: ${total.toLocaleString('es-AR')}
        </p>
      </div>

      {/* Vista previa de financiación — solo zonas habilitadas, solo aplica al pedido por WhatsApp */}
      {allowed && (
        <div className="rounded-xl2 border border-plate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setWantsFinancing((v) => !v)}
            className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-plate-50 transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Wallet className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="font-display font-semibold text-steel-900">¿Querés financiar este pedido?</span>
            </span>
            <ChevronDown className={`h-4 w-4 text-steel-400 shrink-0 transition-transform ${wantsFinancing ? 'rotate-180' : ''}`} />
          </button>

          {wantsFinancing && (
            <div className="border-t border-plate-200 p-5 space-y-4">
              <p className="text-xs text-steel-500 -mt-1">
                Sin tarjeta. Elegí un plan y mirá cómo te queda antes de enviar el pedido.
              </p>

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
                className="w-full rounded-lg border border-plate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-steel-400"
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
                Este plan se incluye en el mensaje al enviar tu pedido por WhatsApp. Coordinamos ahí la documentación y confirmamos la primera cuota.
              </p>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl2 border border-plate-200 p-6">
        <h2 className="font-display font-semibold text-steel-900">Tus datos</h2>

        <FormField label="Nombre y apellido" error={errors.customerName}>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormField>

        <FormField label="Teléfono" error={errors.customerPhone}>
          <Input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+54 9 3416..."
          />
        </FormField>

        <FormField label="Email (opcional)">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </FormField>

        <FormField label="Dirección de entrega (opcional)">
          <Input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Calle, número, localidad"
          />
        </FormField>

        <FormField label="Nota (opcional)">
          <Textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={3}
          />
        </FormField>

        <Button type="submit" variant="whatsapp" size="lg" disabled={sending} className="w-full">
          {sending ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
        </Button>

        {/* MercadoPago */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 border-t border-plate-200" />
          <span className="font-mono text-[11px] text-steel-300 uppercase tracking-wide">o pagá online</span>
          <div className="flex-1 border-t border-plate-200" />
        </div>

        {mpError && <p className="text-xs text-red-600">{mpError}</p>}

        <button
          type="button"
          disabled={mpLoading}
          onClick={async () => {
            if (!form.name || !form.phone) {
              setMpError('Completá tu nombre y teléfono antes de continuar.');
              return;
            }
            setMpError('');
            setMpLoading(true);
            try {
              const res = await fetch('/api/mp/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  items: items.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
                  payer: { name: form.name, phone: form.phone, email: form.email },
                }),
              });
              const data = await res.json();
              if (!res.ok || !data.init_point) throw new Error(data.error ?? 'Error');
              sessionStorage.setItem('behmont-mp-pending', JSON.stringify({
                items: items.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
                payer: { name: form.name, phone: form.phone },
              }));
              window.location.href = data.init_point;
            } catch (err: unknown) {
              setMpError(err instanceof Error ? err.message : 'No se pudo iniciar el pago. Intentá de nuevo.');
            } finally {
              setMpLoading(false);
            }
          }}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#009EE3] py-3.5 text-sm font-bold text-white hover:bg-[#0088c7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mpLoading ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M10.509 14.342H8.295l1.374-8.634h2.214l-1.374 8.634zm9.801-8.43a5.411 5.411 0 00-1.956-.36c-2.155 0-3.672 1.142-3.682 2.779-.018 1.206 1.087 1.877 1.915 2.28.847.411 1.133.679 1.133 1.046-.009.563-.681.822-1.31.822-.874 0-1.338-.134-2.052-.447l-.285-.134-.304 1.876c.509.232 1.445.438 2.418.447 2.285 0 3.771-1.124 3.789-2.869.009-.956-.572-1.681-1.832-2.28-.759-.386-1.224-.644-1.224-1.037.009-.357.394-.723 1.25-.723.705-.018 1.222.151 1.614.322l.196.089.295-1.812zm5.58-.204h-1.685c-.518 0-.911.15-1.138.697l-3.227 7.937h2.283s.375-.999.456-1.214h2.79c.063.286.259 1.214.259 1.214h2.016L25.89 5.708zm-2.66 5.834c.179-.483.867-2.332.867-2.332-.009.018.179-.492.286-.804l.151.724s.411 1.989.5 2.412h-1.804zM6.995 5.708L4.858 11.87l-.232-1.161C4.22 9.056 2.987 7.394 1.594 6.555l1.949 7.778h2.302l3.44-8.625H6.995z"/>
            </svg>
          )}
          {mpLoading ? 'Redirigiendo...' : 'Pagar con MercadoPago'}
        </button>
      </form>
    </div>
  );
}
