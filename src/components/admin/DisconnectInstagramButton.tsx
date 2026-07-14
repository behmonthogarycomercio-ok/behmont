'use client';

import { useState, useTransition } from 'react';
import { disconnectInstagram } from '@/lib/actions';

export default function DisconnectInstagramButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!confirm('¿Desconectar la cuenta de Instagram? Vas a tener que volver a autorizarla para sincronizar de nuevo.')) return;
    setError(null);
    startTransition(async () => {
      const result = await disconnectInstagram();
      if (result?.error) setError(result.error);
    });
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        onClick={handleClick}
        disabled={pending}
        className="rounded-lg border border-plate-300 px-4 py-2.5 text-sm font-semibold text-steel-700 hover:bg-plate-50 disabled:opacity-50"
      >
        {pending ? 'Desconectando...' : 'Desconectar cuenta'}
      </button>
      {error && <span role="alert" className="text-xs font-medium text-danger-600">{error}</span>}
    </span>
  );
}
