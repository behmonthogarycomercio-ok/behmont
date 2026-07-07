const MESSAGES = [
  'Envíos a todo el país por Andreani',
  'Financiación diaria y semanal',
  'Factura A y B · +54 345 401-5358',
];

export default function PromoBar() {
  return (
    <div className="bg-steel-950 text-plate-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-center gap-0 h-9 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MESSAGES.map((text, i) => (
            <span key={text} className="flex shrink-0 items-center">
              {i > 0 && <span className="mx-4 text-plate-100/25">·</span>}
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
