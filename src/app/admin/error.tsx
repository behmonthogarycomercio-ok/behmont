'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-display text-xl font-bold text-steel-950 mb-2">No se pudo guardar</h1>
      <p className="text-sm text-steel-600 mb-6">{error.message || 'Ocurrió un error inesperado.'}</p>
      <button
        onClick={reset}
        className="rounded-lg bg-steel-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-steel-800"
      >
        Volver a intentar
      </button>
    </div>
  );
}
