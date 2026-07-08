import Link from 'next/link';

const METHODS = [
  {
    value: 'Financiación en cuotas',
    label: 'Diaria, semanal o mensual. Sin tarjeta.',
    href: '/financiacion',
    cta: 'Calculá tu cuota →',
  },
  {
    value: 'Préstamos en efectivo',
    label: 'Crédito personal rápido para Concordia y zona.',
    href: '/prestamos',
    cta: 'Ver condiciones →',
  },
  {
    value: 'Mercado Pago',
    label: 'Pagá con tu cuenta, transferencia o QR.',
    href: null,
    cta: null,
  },
  {
    value: 'Factura A y B',
    label: 'Facturación completa para empresa o consumidor final.',
    href: null,
    cta: null,
  },
];

export default function PaymentSection() {
  return (
    <section className="border-y border-plate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 tracking-tight">
            Todos los medios de pago
          </h2>
          <p className="text-sm text-steel-400 max-w-xs leading-snug">
            Financiación propia sin banco ni tarjeta. Entrega sin cargo en las zonas habilitadas.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-plate-200">
          {METHODS.map(({ value, label, href, cta }) => {
            const inner = (
              <>
                <p className="font-display text-lg font-bold text-steel-950 leading-tight group-hover:text-amber-700 transition-colors">
                  {value}
                </p>
                <p className="mt-2 text-sm text-steel-400 leading-snug">{label}</p>
                {cta && (
                  <p className="mt-3 font-mono text-[11px] font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
                    {cta}
                  </p>
                )}
              </>
            );
            return href ? (
              <Link key={value} href={href} className="group bg-white px-6 py-7 hover:bg-amber-50 transition-colors">
                {inner}
              </Link>
            ) : (
              <div key={value} className="bg-white px-6 py-7">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
