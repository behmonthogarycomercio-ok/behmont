import Image from 'next/image';
import { MapPin, MessageCircle, Clock } from 'lucide-react';
import { buildWhatsAppLink, buildQuickInquiryMessage } from '@/lib/whatsapp';
import { buttonClasses } from '@/components/ui/Button';

export default function LocationSection({
  address,
  whatsappNumber,
  businessHours,
}: {
  address: string;
  whatsappNumber: string;
  businessHours?: string;
}) {
  if (!address) return null;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const whatsappLink = whatsappNumber
    ? buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage())
    : '';

  return (
    <section id="ubicacion" className="mx-auto max-w-7xl px-4 sm:px-6 py-[88px] border-t border-steel-100 scroll-mt-20">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-[60px] items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-300 mb-2.5">
            Visitanos
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight mb-6">
            Dónde estamos
          </h2>
          <div className="flex items-start gap-2 text-steel-800">
            <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="font-medium">{address}</p>
          </div>
          <div className="flex items-start gap-2 text-steel-600 text-sm mt-3">
            <Clock className="h-4 w-4 shrink-0 mt-0.5" />
            {businessHours ? (
              <p className="whitespace-pre-line">{businessHours}</p>
            ) : (
              <p className="text-steel-500">Consultá nuestros horarios de atención por WhatsApp</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: 'outline', size: 'md', className: 'rounded-full' })}
            >
              <MapPin className="h-4 w-4" /> Cómo llegar
            </a>
            {whatsappNumber && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: 'tactile-navy', size: 'md', className: 'rounded-full' })}
              >
                <MessageCircle className="h-4 w-4" /> Escribinos por WhatsApp
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[14px]">
          <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden">
            <Image src="/images/ubicacion-fachada.png" alt="Fachada BEHMONT" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden border border-steel-100">
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
