import Link from 'next/link';

const RUBROS = [
  {
    slug: 'gastronomia',
    name: 'Gastronomía',
    desc: 'Hornos, freidoras, batidoras, exhibidoras y todo el equipamiento para tu restorán o bar.',
  },
  {
    slug: 'panaderia',
    name: 'Panadería',
    desc: 'Amasadoras, divisoras, cámaras de fermentación y hornos de piso.',
  },
  {
    slug: 'carniceria',
    name: 'Carnicería',
    desc: 'Sierras, embutidoras, balanzas con impresora y mesadas de acero inoxidable.',
  },
  {
    slug: 'peluqueria-barberia',
    name: 'Peluquería y Barbería',
    desc: 'Sillones hidráulicos, lavacabezas, cortadoras y mobiliario completo.',
  },
  {
    slug: 'frio',
    name: 'Frío Comercial',
    desc: 'Heladeras exhibidoras, freezers, cámaras frigoríficas y mesas frías.',
  },
  {
    slug: 'almacen',
    name: 'Almacén',
    desc: 'Estanterías metálicas, balanzas digitales, cajas registradoras y góndolas.',
  },
];

export default function BusinessSection() {
  return (
    <section className="bg-plate-50 border-y border-plate-200 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight mb-10">
          Equipamos tu negocio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-plate-200">
          {RUBROS.map((rubro, i) => (
            <Link
              key={rubro.slug}
              href={`/categoria/${rubro.slug}`}
              className="group relative bg-white px-7 py-8 flex flex-col gap-3 hover:bg-steel-950 transition-colors duration-200"
            >
              <span className="font-mono text-[11px] font-semibold text-steel-300 group-hover:text-amber-500 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-bold text-steel-950 group-hover:text-white transition-colors leading-tight">
                {rubro.name}
              </h3>
              <p className="text-sm text-steel-500 group-hover:text-plate-100/70 transition-colors leading-relaxed flex-1">
                {rubro.desc}
              </p>
              <span className="mt-2 text-xs font-semibold text-steel-400 group-hover:text-amber-400 transition-colors">
                Ver productos →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
