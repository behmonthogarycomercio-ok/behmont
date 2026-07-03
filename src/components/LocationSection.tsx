import { MapPin, MessageCircle, Clock } from 'lucide-react';
import { buildWhatsAppLink, buildQuickInquiryMessage } from '@/lib/whatsapp';

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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h2 className="font-display text-xl font-semibold text-steel-900 mb-5">Dónde estamos</h2>
      <div className="grid gap-4 md:grid-cols-[1fr_1.3fr] rounded-xl2 border border-plate-200 bg-white shadow-card overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col justify-center">
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
          <div className="flex flex-wrap gap-3 mt-5">
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-steel-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-steel-800"
            >
              <MapPin className="h-4 w-4" /> Cómo llegar
            </a>
            {whatsappNumber && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" /> Consultar
              </a>
            )}
          </div>
        </div>
        <div className="min-h-[280px]">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 280 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de BEHMONT — Comercio y Hogar"
          />
        </div>
      </div>
    </section>
  );
}
