import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function NewsletterBanner() {
  return (
    <section className="bg-steel-950">
      <div className="relative min-h-[70px] sm:min-h-0 sm:aspect-[2400/380] overflow-hidden">
        <Image
          src="/images/banner-suscripcion.webp"
          alt="¡No te pierdas nada! Suscribite y recibí promos exclusivas y cuotas sin interés"
          fill
          sizes="100vw"
          className="object-contain sm:object-cover"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex justify-center">
        <NewsletterForm />
      </div>
    </section>
  );
}
