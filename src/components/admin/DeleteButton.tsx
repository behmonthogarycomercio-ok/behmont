'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import type { ActionResult } from '@/lib/actions';

export default function DeleteButton({
  id,
  action,
  label,
}: {
  id: string;
  action: (id: string) => Promise<ActionResult>;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!confirm(`¿Eliminar este ${label}? Esta acción no se puede deshacer.`)) return;
    setError(null);
    startTransition(async () => {
      const result = await action(id);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center gap-1 text-xs font-semibold text-steel-500 hover:text-danger-600 disabled:opacity-40"
      >
        <Trash2 className="h-3.5 w-3.5" /> {pending ? 'Eliminando...' : 'Eliminar'}
      </button>
      {error && <span role="alert" className="text-xs font-medium text-danger-600">{error}</span>}
    </span>
  );
}
