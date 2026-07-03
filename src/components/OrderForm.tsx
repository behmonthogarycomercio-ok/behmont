'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function OrderForm() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

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
      clear();
    } finally {
      setSending(false);
    }
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
                className="grid h-6 w-6 place-items-center rounded hover:bg-plate-100"
                aria-label="Restar"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-5 text-center text-sm">{item.qty}</span>
              <button
                onClick={() => updateQty(item.sku, item.qty + 1)}
                className="grid h-6 w-6 place-items-center rounded hover:bg-plate-100"
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
              className="text-steel-400 hover:text-red-600"
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

        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Nombre y apellido</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          {errors.customerName && <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Teléfono</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+54 9 3416..."
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          {errors.customerPhone && <p className="text-xs text-red-600 mt-1">{errors.customerPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Email (opcional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Nota (opcional)</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {sending ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
        </button>
      </form>
    </div>
  );
}
