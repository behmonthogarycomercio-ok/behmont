'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';

export default function OrderForm() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', note: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState('');

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
      clear();
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
        <button
          onClick={() => setSent(false)}
          className="font-mono text-[11px] text-steel-300 hover:text-steel-600 transition-colors"
        >
          Hacer otro pedido
        </button>
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
      </form>

      {/* Financing option */}
      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-plate-200" />
        <span className="font-mono text-[11px] text-steel-300 uppercase tracking-wide">o</span>
        <div className="flex-1 border-t border-plate-200" />
      </div>
      <button
        onClick={() => {
          const productsSummary = items.map((i) => `${i.name} (x${i.qty})`).join(', ');
          router.push(`/financiacion?amount=${total}&products=${encodeURIComponent(productsSummary)}`);
        }}
        className="w-full rounded-xl border border-steel-200 py-3.5 text-sm font-semibold text-steel-700 hover:bg-plate-50 transition-colors"
      >
        Financiar este pedido →
      </button>
    </div>
  );
}
