import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/data';
import FinancingCalculator from '@/components/FinancingCalculator';

export const metadata: Metadata = {
  title: 'Préstamos en efectivo | BEHMONT',
  description:
    'Crédito personal en efectivo, rápido y flexible. Pagás en cuotas diarias o semanales. Disponible en Concordia y zona.',
};

export default async function PrestamosPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-7 pb-8">
          <nav className="font-mono text-[11px] text-steel-400 mb-4">
            <Link href="/" className="hover:text-steel-700 transition-colors">Inicio</Link>
            <span className="mx-2 text-steel-300">/</span>
            <span className="font-semibold text-steel-700">Préstamos</span>
          </nav>

          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">
            Crédito personal
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight">
            Préstamos en efectivo
          </h1>
          <p className="mt-2 text-sm text-steel-400 leading-relaxed max-w-lg">
            Sin trámites bancarios. Efectivo en mano y pagás en cuotas diarias o semanales. Disponible en las zonas habilitadas.
          </p>

          {/* Benefits strip */}
          <div className="mt-6 grid grid-cols-3 gap-px bg-plate-200 rounded-xl overflow-hidden text-center">
            <div className="bg-plate-50 px-3 py-3.5">
              <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">Rápido</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">Gestión ágil</p>
            </div>
            <div className="bg-plate-50 px-3 py-3.5">
              <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">Flexible</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">Adelantás cuotas</p>
            </div>
            <div className="bg-plate-50 px-3 py-3.5">
              <p className="font-mono text-[10px] font-bold text-steel-700 uppercase tracking-wide">Sin banco</p>
              <p className="font-mono text-[10px] text-steel-400 mt-0.5">Trámite directo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <FinancingCalculator
          mode="loan"
          whatsappNumber={settings.whatsappNumber}
        />
      </div>
    </main>
  );
}
