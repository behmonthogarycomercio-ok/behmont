const METHODS = [
  {
    value: 'Cuotas sin interés',
    label: 'Financiación diaria y semanal para tu negocio',
  },
  {
    value: 'Mercado Pago',
    label: 'Pagá con tu cuenta, transferencia o QR',
  },
  {
    value: 'Débito y crédito',
    label: 'Todas las tarjetas sin recargo adicional',
  },
  {
    value: 'Factura A y B',
    label: 'Facturación completa para empresa o consumidor final',
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
            Consultá opciones de financiación para tu compra por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-plate-200">
          {METHODS.map(({ value, label }) => (
            <div key={value} className="bg-white px-6 py-7">
              <p className="font-display text-lg font-bold text-steel-950 leading-tight">
                {value}
              </p>
              <p className="mt-2 text-sm text-steel-400 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
