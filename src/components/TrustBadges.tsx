import { Truck, ShieldCheck, CreditCard, Receipt } from 'lucide-react';

const ITEMS = [
  {
    icon: Truck,
    title: 'Envíos a todo el país',
    text: 'Retirá en el local o coordinamos el despacho',
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
    text: 'Facturación para tu negocio o consumidor final',
  },
];

export default function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-2 rounded-xl2 border border-plate-200 bg-white p-4 text-center shadow-card sm:flex-row sm:items-start sm:text-left"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-plate-50 text-amber-600">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-steel-900">{title}</p>
              <p className="text-xs text-steel-500 mt-0.5">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
