'use client';

import { useState, useTransition } from 'react';
import { reviewPreventaDocumentacion } from '@/lib/actions';

// Gabriel confirma acá que recibió la documentación física (DNI, comprobante
// de domicilio, proveedor -- todo en papel) o rechaza con motivo. La acción
// toma argumentos posicionales, no FormData, por eso no usa AdminActionForm
// (mismo patrón que ProductsTable.tsx llamando updateStockAndPrice directo).
export default function PreventaDocReview({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [rejecting, setRejecting] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState<string | null>(null);

  function confirmarOk() {
    setError(null);
    startTransition(async () => {
      const result = await reviewPreventaDocumentacion(id, 'ok');
      if (result?.error) setError(result.error);
    });
  }

  function confirmarRechazo() {
    if (!motivo.trim()) {
      setError('El motivo es obligatorio.');
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await reviewPreventaDocumentacion(id, 'rechazar', motivo);
      if (result?.error) setError(result.error);
    });
  }

  if (rejecting) {
    return (
      <div className="flex flex-col gap-1.5">
        <input
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Motivo (ej. está en el Veraz)"
          className="rounded border border-plate-200 px-2 py-1 text-xs"
        />
        <div className="flex gap-1.5">
          <button
            onClick={confirmarRechazo}
            disabled={pending}
            className="rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 px-2 py-1 text-xs font-semibold"
          >
            Confirmar rechazo
          </button>
          <button onClick={() => { setRejecting(false); setError(null); }} className="text-xs text-steel-500 underline">
            Cancelar
          </button>
        </div>
        {error && <p className="text-xs font-medium text-danger-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1.5">
        <button
          onClick={confirmarOk}
          disabled={pending}
          className="rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold"
        >
          Documentación OK
        </button>
        <button
          onClick={() => setRejecting(true)}
          disabled={pending}
          className="rounded-lg border border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold"
        >
          Rechazar
        </button>
      </div>
      {error && <p className="text-xs font-medium text-danger-600">{error}</p>}
    </div>
  );
}
