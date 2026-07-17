import Image from 'next/image';

export default function ReviewsBanner({ reviewUrl }: { reviewUrl?: string }) {
  if (!reviewUrl) return null;

  return (
    <section>
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block min-h-[110px] bg-steel-950 sm:min-h-0 sm:aspect-[2400/380] overflow-hidden"
      >
        <Image
          src="/images/banner-resenas.webp"
          alt="Dejanos tu opinión en Google — Calificanos con 5 estrellas"
          fill
          sizes="100vw"
          className="object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
      </a>
    </section>
  );
}
