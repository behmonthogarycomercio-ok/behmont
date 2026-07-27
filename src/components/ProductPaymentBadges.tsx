import { Wallet, CreditCard, Landmark, Percent } from 'lucide-react';

const METHODS = [
  { icon: Wallet, label: 'Efectivo', sub: 'con descuento al retirar' },
  { icon: CreditCard, label: 'Débito y crédito', sub: 'todas las tarjetas' },
  { icon: Landmark, label: 'Transferencia', sub: 'o Mercado Pago' },
  { icon: Percent, label: 'Financiación propia', sub: 'diaria, semanal o mensual' },
];

export default function ProductPaymentBadges() {
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-steel-400 mb-2">
        Medios de pago
      </p>
      <div className="grid grid-cols-2 gap-px bg-plate-200 rounded-xl overflow-hidden">
        {METHODS.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-plate-50 px-4 py-3.5 flex items-start gap-2.5">
            <Icon className="h-4 w-4 text-steel-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-steel-900 leading-tight">{label}</p>
              <p className="text-[10px] text-steel-400 mt-0.5 leading-tight">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
