import Image from 'next/image';

export default function ReviewsBanner({ reviewUrl }: { reviewUrl?: string }) {
  if (!reviewUrl) return null;

  return (
    <section>
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden"
      >
        <Image
          src="/images/banner-resenas.webp"
          alt="Dejanos tu opinión en Google — Calificanos con 5 estrellas"
          width={2352}
          height={1008}
          sizes="100vw"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
        />
      </a>
    </section>
  );
}
