import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/data';
import FinancingCalculator from '@/components/FinancingCalculator';

export const metadata: Metadata = {
  title: 'Financiación en cuotas | BEHMONT',
  description:
    'Financiá tu compra en cuotas diarias, semanales o mensuales. Sin tarjeta. Entrega sin cargo en Concordia, Federación, Federal, Chajarí, Concepción del Uruguay y Gualeguaychú.',
};

export default async function FinanciacionPage({
  searchParams,
}: {
  searchParams: { amount?: string; products?: string };
}) {
  const settings = await getSiteSettings();
  const initialAmount = searchParams.amount ? parseFloat(searchParams.amount) : undefined;
  const productsSummary = searchParams.products;

  return (
    <main>
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-7 pb-8">
          <nav className="font-mono text-[11px] text-steel-400 mb-4">
            <Link href="/" className="hover:text-steel-700 transition-colors">Inicio</Link>
            <span className="mx-2 text-steel-300">/</span>
            <span className="font-semibold text-steel-700">Financiación</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight">
            Financiá tu compra
          </h1>
          <p className="mt-2 text-sm text-steel-400 leading-relaxed max-w-lg">
            Sin tarjeta de crédito. Pagás en cuotas diarias, semanales o mensuales. Entrega sin cargo en las zonas habilitadas.
          </p>

          {/* How it works — compact strip */}
          <div className="mt-6 grid grid-cols-3 gap-px bg-plate-200 rounded-xl overflow-hidden text-center">
            <div className="bg-plate-50 px-3 py-3.5">
              <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">1. Calculá</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">Elegí tu plan</p>
            </div>
            <div className="bg-plate-50 px-3 py-3.5">
              <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">2. Enviá</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">Solicitud por WhatsApp</p>
            </div>
            <div className="bg-plate-50 px-3 py-3.5">
              <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">3. Recibís</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">Y pagás la primera cuota</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <FinancingCalculator
          mode="financing"
          initialAmount={initialAmount}
          productsSummary={productsSummary}
          whatsappNumber={settings.whatsappNumber}
        />
      </div>
    </main>
  );
}
