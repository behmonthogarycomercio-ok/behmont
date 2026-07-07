import { Truck, ShieldCheck, CreditCard, Receipt } from 'lucide-react';

const ITEMS = [
  {
    icon: Truck,
    title: 'Envíos a todo el país',
    text: 'Retirá en el local o despachamos por Andreani',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía oficial',
    text: 'Todos los productos con garantía de fábrica',
  },
  {
    icon: CreditCard,
    title: 'Financiación',
    text: 'Tarjetas de débito, crédito y Mercado Pago',
  },
  {
    icon: Receipt,
    title: 'Factura A y B',
    text: 'Para tu negocio o consumidor final',
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-plate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 divide-x divide-y divide-plate-200 sm:grid-cols-4 sm:divide-y-0">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="flex items-start gap-3 px-4 py-5 sm:px-6"
            >
              <Icon className="h-5 w-5 shrink-0 mt-0.5 text-amber-500" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-semibold text-steel-900 leading-snug">{title}</p>
                <p className="text-xs text-steel-500 mt-0.5 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
