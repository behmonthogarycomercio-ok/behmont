'use client';

import { BadgePercent } from 'lucide-react';

// El descuento por retiro en local aplica a cualquier cliente que elija
// esa opcion al comprar, sin importar su ubicacion -- se muestra siempre.
export default function PickupDiscountBanner() {
  return (
    <div className="bg-amber-500 text-steel-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-center gap-2 sm:gap-2.5 text-center">
        <BadgePercent className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
        <p className="text-xs sm:text-base font-bold leading-tight">
          Retirando tu pedido en el local accedés a <span className="underline decoration-2 underline-offset-2">descuentos en efectivo del 10% al 15%</span> según el producto
        </p>
      </div>
    </div>
  );
}
