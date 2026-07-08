import type { Metadata } from 'next';
import Link from 'next/link';
import MpConfirmCTA from '@/components/MpConfirmCTA';

export const metadata: Metadata = { title: 'Confirmación de pago | BEHMONT' };

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: { status?: string; payment_id?: string };
}) {
  const status = searchParams.status ?? 'pending';
  const paymentId = searchParams.payment_id;

  const states = {
    approved: {
      emoji: '✓',
      color: 'bg-emerald-100 text-emerald-700',
      title: '¡Pago aprobado!',
      body: 'Recibimos tu pago correctamente. Te vamos a contactar a la brevedad para coordinar la entrega.',
      sub: paymentId ? `Número de operación: ${paymentId}` : null,
    },
    pending: {
      emoji: '⏳',
      color: 'bg-amber-100 text-amber-700',
      title: 'Pago en proceso',
      body: 'Tu pago está siendo procesado. Te avisamos por WhatsApp cuando se confirme y coordinamos la entrega.',
      sub: paymentId ? `Número de operación: ${paymentId}` : null,
    },
    rejected: {
      emoji: '✕',
      color: 'bg-red-100 text-red-700',
      title: 'Pago no aprobado',
      body: 'No pudimos procesar tu pago. Podés intentarlo de nuevo o enviarnos el pedido por WhatsApp.',
      sub: null,
    },
  };

  const s = states[status as keyof typeof states] ?? states.pending;

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center space-y-5">
        <div className={`mx-auto h-16 w-16 rounded-full grid place-items-center text-2xl font-bold ${s.color}`}>
          {s.emoji}
        </div>

        <div>
          <h1 className="font-display text-2xl font-bold text-steel-950 tracking-tight">{s.title}</h1>
          <p className="mt-2 text-sm text-steel-400 leading-relaxed">{s.body}</p>
          {s.sub && (
            <p className="mt-3 font-mono text-[11px] text-steel-300">{s.sub}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {(status === 'approved' || status === 'pending') && (
            <MpConfirmCTA paymentId={paymentId} status={status} />
          )}
          <Link
            href="/"
            className="w-full rounded-xl bg-steel-950 py-3.5 text-sm font-bold text-white hover:bg-steel-800 transition-colors text-center block"
          >
            Seguir comprando
          </Link>
          {status === 'rejected' && (
            <Link
              href="/pedido"
              className="w-full rounded-xl border border-plate-200 py-3.5 text-sm font-semibold text-steel-700 hover:bg-plate-50 transition-colors text-center block"
            >
              Volver al pedido
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
