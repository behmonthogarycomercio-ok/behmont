import Image from 'next/image';
import { Instagram, Facebook, MessageCircle, MapPin, Mail, ArrowUpRight, Clock } from 'lucide-react';
import { buildWhatsAppLink, buildQuickInquiryMessage } from '@/lib/whatsapp';
import NewsletterForm from './NewsletterForm';

type FooterProps = {
  whatsappNumber: string;
  whatsappNumber2?: string;
  contactEmail?: string;
  contactAddress?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  mlStoreUrl?: string;
};

export default function Footer({
  whatsappNumber,
  whatsappNumber2,
  contactEmail,
  contactAddress,
  instagramUrl,
  facebookUrl,
  mlStoreUrl,
}: FooterProps) {
  return (
    <footer className="bg-steel-950 text-plate-100 mt-10">

      {/* Suscripción */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-white text-lg">
              Enterate primero de nuestras promociones
            </h3>
            <p className="text-sm text-plate-100/60 mt-0.5">
              Ofertas y novedades por mail, sin spam.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Columnas */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

        {/* Marca */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="relative h-16 w-36">
            <Image
              src="/images/logo-behmont-oval.png"
              alt="BEHMONT — Comercio y Hogar"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="mt-4 font-mono text-[11px] font-medium tracking-wide text-plate-100/50 uppercase">
            Concordia · Entre Ríos · Desde 1995
          </p>
          {contactAddress && (
            <p className="mt-4 flex items-start gap-2 text-sm text-plate-100/70 max-w-xs">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500/70" />
              {contactAddress}
            </p>
          )}
          <p className="mt-3 flex items-start gap-2 text-sm text-plate-100/70">
            <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500/70" />
            <span>
              Lun a Vie 08:00–12:30 · 16:00–20:00<br />
              Sábados 08:00–13:00
            </span>
          </p>
          {(instagramUrl || facebookUrl) && (
            <div className="mt-5 flex items-center gap-2">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-plate-100/60 transition hover:border-amber-500 hover:text-amber-400"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-plate-100/60 transition hover:border-amber-500 hover:text-amber-400"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-plate-100/40 mb-4">
            Institucional
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/mayorista" className="text-plate-100/70 hover:text-amber-400 transition-colors">Ventas mayoristas</a></li>
            <li><a href="/#ubicacion" className="text-plate-100/70 hover:text-amber-400 transition-colors">Cómo llegar</a></li>
            <li><a href="/faq" className="text-plate-100/70 hover:text-amber-400 transition-colors">Preguntas frecuentes</a></li>
            <li><a href="/guia-de-compras" className="text-plate-100/70 hover:text-amber-400 transition-colors">Guía de compras</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-plate-100/40 mb-4">
            Seguimiento
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="https://www.andreani.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-plate-100/70 hover:text-amber-400 transition-colors"
              >
                Rastrear mi pedido <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
            {mlStoreUrl && (
              <li>
                <a
                  href={mlStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-plate-100/70 hover:text-amber-400 transition-colors"
                >
                  Tienda MercadoLibre <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-plate-100/40 mb-4">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm">
            {whatsappNumber && (
              <li>
                <a
                  href={buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-plate-100/70 hover:text-amber-400 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                  Lucas: +{whatsappNumber}
                </a>
              </li>
            )}
            {whatsappNumber2 && (
              <li>
                <a
                  href={buildWhatsAppLink(whatsappNumber2, buildQuickInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-plate-100/70 hover:text-amber-400 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                  Luz: +{whatsappNumber2}
                </a>
              </li>
            )}
            {contactEmail && (
              <li className="flex items-center gap-2 text-plate-100/70 break-all">
                <Mail className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                {contactEmail}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-[22px] px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-mono text-[10px] text-plate-100/30 uppercase tracking-wide">
            © {new Date().getFullYear()} BEHMONT — Comercio y Hogar
          </p>
          <p className="font-mono text-[10px] text-plate-100/30 uppercase tracking-wide">
            Concordia, Entre Ríos · Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
