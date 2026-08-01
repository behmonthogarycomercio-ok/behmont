import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function NewsletterBanner() {
  return (
    <section className="bg-steel-950">
      <div className="relative w-full aspect-[2400/380] overflow-hidden">
        <Image
          src="/images/banner-suscripcion.webp"
          alt="¡No te pierdas nada! Suscribite y recibí promos exclusivas y cuotas sin interés"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* El formulario real se superpone justo sobre el cartel "Tu correo / Suscribirme"
            dibujado en la imagen -- por eso usa posiciones en % y aspect-ratio fijo en
            todos los tamaños, para que siempre calce con los mismos pixeles del banner. */}
        <div
          className="absolute"
          style={{ left: '75.8%', right: '2.2%', top: '43%', bottom: '43%' }}
        >
          <NewsletterForm compact />
        </div>
      </div>
    </section>
  );
}
