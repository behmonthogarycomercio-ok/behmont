'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo suscribir.');
        setStatus('error');
        return;
      }
      setStatus('sent');
      setEmail('');
    } catch {
      setError('No se pudo suscribir. Probá de nuevo.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p className={`flex items-center gap-1.5 font-semibold text-emerald-500 ${compact ? 'text-[2.4vw] sm:text-xs' : 'text-sm'}`}>
        <Check className={compact ? 'h-3 w-3 shrink-0' : 'h-4 w-4'} />
        <span className={compact ? 'truncate' : ''}>¡Listo! Ya estás suscripto.</span>
      </p>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-[1%] w-full h-full">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo"
          className="min-w-0 flex-1 h-full rounded-full bg-white px-[6%] text-[2.4vw] sm:text-xs text-steel-900 placeholder:text-steel-400 outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="shrink-0 h-full rounded-full bg-[#ED3237] hover:bg-[#c9282c] px-[5%] text-[2vw] sm:text-[11px] font-bold text-white transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <span className="hidden sm:inline">{status === 'sending' ? '...' : 'SUSCRIBIRME'}</span>
          <Mail className="h-[2.6vw] w-[2.6vw] sm:h-3.5 sm:w-3.5 sm:hidden" />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm">
      <div className="relative flex-1">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-plate-100/40" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
          className="w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-plate-100/40 outline-none focus:border-amber-500 transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="shrink-0 rounded-full bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Enviando...' : 'Suscribirme'}
      </button>
      {error && <p className="text-xs text-red-400 sm:absolute sm:mt-10">{error}</p>}
    </form>
  );
}
