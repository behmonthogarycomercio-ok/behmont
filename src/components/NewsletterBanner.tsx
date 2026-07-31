import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function NewsletterBanner() {
  return (
    <section className="bg-steel-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-full sm:w-[420px] md:w-[520px] h-20 sm:h-24 shrink-0 overflow-hidden rounded-lg">
            <Image
              src="/images/banner-suscripcion.webp"
              alt="¡No te pierdas nada! Suscribite y recibí promos exclusivas"
              fill
              sizes="(max-width: 640px) 100vw, 520px"
              className="object-cover object-left"
            />
          </div>
          <div className="w-full sm:flex-1 flex sm:justify-end">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
