import { Truck, CreditCard, Phone } from 'lucide-react';

const MESSAGES = [
  { icon: Truck, text: 'Envíos a todo el país por Andreani' },
  { icon: CreditCard, text: 'Financiación diaria y semanal' },
  { icon: Phone, text: 'Consultá por WhatsApp · +54 345 401-5358' },
];

export default function PromoBar() {
  return (
    <div className="bg-steel-950 text-plate-100/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-center gap-6 sm:gap-10 h-9 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MESSAGES.map(({ icon: Icon, text }) => (
            <span key={text} className="flex shrink-0 items-center gap-1.5">
              <Icon className="h-3 w-3 text-amber-400 shrink-0" strokeWidth={2} />
              <span className="font-mono text-[10px] font-medium tracking-wide whitespace-nowrap">
                {text}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
