'use client';

import { Wallet, CreditCard, Landmark, Percent } from 'lucide-react';
import { useLocation } from '@/lib/location-context';

const BASE_METHODS = [
  { icon: Wallet, label: 'Efectivo', sub: '10% al 15% al retirar en el local' },
  { icon: CreditCard, label: 'Débito y crédito', sub: 'todas las tarjetas' },
  { icon: Landmark, label: 'Transferencia', sub: 'o Mercado Pago' },
];

const FINANCING_METHOD = { icon: Percent, label: 'Financiación propia', sub: 'diaria, semanal o mensual' };

// Fuera de zona de financiación no se ofrece "Financiación propia" -- ahí
// el único beneficio real es el descuento en efectivo al retirar en el
// local, así que ese badge no se muestra para no prometer algo que esa
// zona no tiene disponible.
export default function ProductPaymentBadges() {
  const { allowed } = useLocation();
  const methods = allowed ? [...BASE_METHODS, FINANCING_METHOD] : BASE_METHODS;

  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-steel-400 mb-2">
        Medios de pago
      </p>
      <div className="grid grid-cols-2 gap-px bg-plate-200 rounded-xl overflow-hidden">
        {methods.map(({ icon: Icon, label, sub }, i) => (
          <div
            key={label}
            className={`bg-plate-50 px-4 py-3.5 flex items-start gap-2.5 ${
              methods.length % 2 === 1 && i === methods.length - 1 ? 'col-span-2' : ''
            }`}
          >
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
