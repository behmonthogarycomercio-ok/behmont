const STATS = [
  { value: '2.500+', label: 'Productos en catálogo' },
  { value: '30 años', label: 'En el mercado' },
  { value: 'Andreani', label: 'Envíos a todo el país' },
  { value: 'A y B', label: 'Facturación disponible' },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-plate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-plate-100 sm:divide-y-0">
          {STATS.map(({ value, label }) => (
            <div key={label} className="px-6 py-6 sm:py-7">
              <p className="font-display text-2xl font-bold text-steel-950 tracking-tight leading-none">
                {value}
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-steel-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
