'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';

export default function MayoristaForm() {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
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
        <FormField label="Nombre del negocio" error={errors.businessName}>
          <Input
            required
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </FormField>
        <FormField label="Tu nombre" error={errors.contactName}>
          <Input
            required
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          />
        </FormField>
        <FormField label="Teléfono" error={errors.phone}>
          <Input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+54 9 3454..."
          />
        </FormField>
        <FormField label="Email (opcional)">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </FormField>
        <FormField label="Dirección del negocio">
          <Input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </FormField>
        <FormField label="Rubro">
          <Input
            value={form.rubro}
            onChange={(e) => setForm({ ...form, rubro: e.target.value })}
            placeholder="Ej: gastronomía, hotelería, reventa..."
          />
        </FormField>
        <FormField label="Volumen estimado">
          <Input
            value={form.volume}
            onChange={(e) => setForm({ ...form, volume: e.target.value })}
            placeholder="Ej: 10-20 unidades/mes"
          />
        </FormField>
      </div>

      <FormField label="Contanos qué necesitás">
        <Textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
        />
      </FormField>

      <Button type="submit" variant="primary" size="lg" disabled={sending} className="w-full">
        {sending ? 'Enviando...' : 'Enviar consulta mayorista'}
      </Button>
    </form>
  );
}
