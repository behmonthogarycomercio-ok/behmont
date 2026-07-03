'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({
  id,
  action,
  label,
}: {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm(`¿Eliminar este ${label}? Esta acción no se puede deshacer.`)) {
          startTransition(() => action(id));
        }
      }}
      disabled={pending}
      className="inline-flex items-center gap-1 text-xs font-semibold text-steel-500 hover:text-red-600 disabled:opacity-40"
    >
      <Trash2 className="h-3.5 w-3.5" /> {pending ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
