import Image from 'next/image';
import { MapPin, MessageCircle, Clock } from 'lucide-react';
import { buildWhatsAppLink, buildQuickInquiryMessage } from '@/lib/whatsapp';
import { buttonClasses } from '@/components/ui/Button';

export default function LocationSection({
  address,
  whatsappNumber,
  whatsappNumber2,
  businessHours,
}: {
  address: string;
  whatsappNumber: string;
  whatsappNumber2?: string;
  businessHours?: string;
}) {
  if (!address) return null;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const whatsappLink = whatsappNumber
    ? buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage())
    : '';
  const whatsappLink2 = whatsappNumber2
    ? buildWhatsAppLink(whatsappNumber2, buildQuickInquiryMessage())
    : '';

  return (
    <section id="ubicacion" className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 lg:py-16 border-t border-steel-100 scroll-mt-20">
      <div className="grid gap-6 sm:gap-10 md:grid-cols-2 lg:gap-[60px]">
        <div className="flex flex-col h-full md:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-300 mb-2">
            Visitanos
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-steel-950 tracking-tight mb-3 sm:mb-5">
            Dónde estamos
          </h2>
          <p className="text-steel-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-5 sm:mb-8">
            Te esperamos en nuestro local a la calle, con atención personalizada para asesorarte
            en la compra del equipamiento que tu negocio o tu hogar necesitan.
          </p>

          <div className="flex flex-col gap-4 border-t border-steel-100 pt-5 sm:pt-8">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <MapPin className="h-5 w-5 text-amber-500" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-steel-400">Dirección</p>
                <p className="font-medium text-steel-900 text-base sm:text-lg mt-0.5">{address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Clock className="h-5 w-5 text-amber-500" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-steel-400">Horarios</p>
                {businessHours ? (
                  <p className="whitespace-pre-line font-medium text-steel-900 text-base sm:text-lg mt-0.5">{businessHours}</p>
                ) : (
                  <p className="text-steel-500 mt-0.5">Consultá nuestros horarios de atención por WhatsApp</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5 sm:mt-8">
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: 'outline', size: 'lg', className: 'rounded-full' })}
            >
              <MapPin className="h-4 w-4" /> Cómo llegar
            </a>
            {whatsappNumber && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: whatsappLink2 ? 'brand-red' : 'tactile-navy', size: 'lg', className: 'rounded-full' })}
              >
                <MessageCircle className="h-4 w-4" /> {whatsappLink2 ? 'Escribile a Lucas' : 'Escribinos por WhatsApp'}
              </a>
            )}
            {whatsappLink2 && (
              <a
                href={whatsappLink2}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: 'whatsapp', size: 'lg', className: 'rounded-full' })}
              >
                <MessageCircle className="h-4 w-4" /> Escribile a Luz
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-[14px]">
          <div className="relative aspect-square sm:aspect-[3/4] rounded-[20px] overflow-hidden">
            <Image src="/images/ubicacion-fachada.png" alt="Fachada BEHMONT" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className="relative aspect-square sm:aspect-[3/4] rounded-[20px] overflow-hidden border border-steel-100">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de BEHMONT — Comercio y Hogar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
