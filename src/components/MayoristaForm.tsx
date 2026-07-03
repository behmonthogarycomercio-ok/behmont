'use client';

import { useState } from 'react';

export default function MayoristaForm() {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    rubro: '',
    volume: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSending(true);

    try {
      const res = await fetch('/api/whatsapp/mayorista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl2 border border-plate-200 bg-white p-8 text-center shadow-card">
        <p className="text-steel-900 font-semibold mb-1">¡Listo! Te abrimos WhatsApp</p>
        <p className="text-steel-500 text-sm">
          Terminá de enviar el mensaje ahí y te contactamos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl2 border border-plate-200 bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Nombre del negocio</label>
          <input
            required
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          {errors.businessName && <p className="text-xs text-red-600 mt-1">{errors.businessName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Tu nombre</label>
          <input
            required
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          {errors.contactName && <p className="text-xs text-red-600 mt-1">{errors.contactName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Teléfono</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+54 9 3454..."
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
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
          <label className="block text-sm font-medium text-steel-700 mb-1">Rubro</label>
          <input
            value={form.rubro}
            onChange={(e) => setForm({ ...form, rubro: e.target.value })}
            placeholder="Ej: gastronomía, hotelería, reventa..."
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-steel-700 mb-1">Volumen estimado</label>
          <input
            value={form.volume}
            onChange={(e) => setForm({ ...form, volume: e.target.value })}
            placeholder="Ej: 10-20 unidades/mes"
            className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-steel-700 mb-1">Contanos qué necesitás</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-lg bg-steel-900 py-3 text-sm font-semibold text-white hover:bg-steel-800 disabled:opacity-50 transition-colors"
      >
        {sending ? 'Enviando...' : 'Enviar consulta mayorista'}
      </button>
    </form>
  );
}
