import Image from 'next/image';

export default function ReviewsBanner({ reviewUrl }: { reviewUrl?: string }) {
  if (!reviewUrl) return null;

  return (
    <section>
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[3/1] overflow-hidden"
      >
        <Image
          src="/images/banner-resenas.webp"
          alt="Dejanos tu opinión en Google — Calificanos con 5 estrellas"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
      </a>
    </section>
  );
}
