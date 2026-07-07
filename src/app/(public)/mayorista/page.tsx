import type { Metadata } from 'next';
import MayoristaForm from '@/components/MayoristaForm';

export const metadata: Metadata = {
  title: 'Canal Mayorista | BEHMONT',
  description: 'Precios y condiciones especiales para comercios, revendedores e instituciones. Financiación y factura A y B. Concordia, Entre Ríos.',
};

const BENEFICIOS = [
  { value: 'Precios especiales', label: 'Por volumen y frecuencia de compra' },
  { value: 'Financiación', label: 'Cuotas diarias, semanales o mensuales' },
  { value: 'Factura A y B', label: 'Facturación completa para tu negocio' },
];

export default function MayoristaPage() {
  return (
    <main>
      {/* Header dark */}
      <div className="bg-steel-950 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400 mb-4">
            Canal mayorista
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Comprá al por mayor.
          </h1>
          <p className="mt-5 text-steel-300 text-sm leading-relaxed max-w-lg">
            Precios y condiciones especiales para comercios, revendedores e instituciones.
            Contanos qué necesitás y armamos una propuesta a medida.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
            {BENEFICIOS.map(({ value, label }) => (
              <div key={value} className="bg-steel-900 px-4 py-4">
                <p className="font-display text-sm font-bold text-white leading-tight">{value}</p>
                <p className="mt-1 font-mono text-[10px] text-steel-400 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <MayoristaForm />
      </div>
    </main>
  );
}
