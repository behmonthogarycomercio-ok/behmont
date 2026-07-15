import Image from 'next/image';

const ITEMS = [
  { image: '/images/beneficio-financiacion.png', label: 'Financiación propia' },
  { image: '/images/beneficio-horarios.png', label: 'Horarios de atención' },
  { image: '/images/beneficio-metodos-pago.png', label: 'Métodos de pago' },
  { image: '/images/beneficio-promociones.png', label: 'Promociones activas' },
];

export default function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="rounded-xl2 overflow-hidden border border-plate-200 bg-white shadow-card"
          >
            <div className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                className="object-cover"
              />
            </div>
            <p className="px-4 py-3 text-sm font-semibold text-steel-900">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
