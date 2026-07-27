import { BadgePercent } from 'lucide-react';

export default function PickupDiscountBanner() {
  return (
    <div className="bg-amber-500 text-steel-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2.5 sm:gap-3 text-center">
        <BadgePercent className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
        <p className="text-sm sm:text-lg font-bold leading-tight">
          Retirando tu pedido en el local accedés a <span className="underline decoration-2 underline-offset-2">descuentos en efectivo del 10% al 15%</span> según el producto
        </p>
      </div>
    </div>
  );
}
