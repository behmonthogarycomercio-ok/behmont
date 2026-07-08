import Image from 'next/image';
import { Instagram, Facebook, MessageCircle, MapPin, Mail, ExternalLink, ArrowUpRight } from 'lucide-react';

type FooterProps = {
  whatsappNumber: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  mlStoreUrl?: string;
};

export default function Footer({
  whatsappNumber,
  contactEmail,
  contactPhone,
  contactAddress,
  instagramUrl,
  facebookUrl,
  mlStoreUrl,
}: FooterProps) {
  return (
    <footer className="bg-steel-950 text-plate-100 mt-10">

      {/* Franja de marca */}
      <div className="border-b border-white/10 px-4 sm:px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative h-9 w-36 shrink-0">
              <Image
                src="/images/logo-behmont-dark.png"
                alt="BEHMONT — Comercio y Hogar"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="h-7 w-px bg-white/15 hidden sm:block" />
            <p className="hidden sm:block font-mono text-[11px] font-medium tracking-wide text-plate-100/50 uppercase">
              Concordia · Entre Ríos · Desde 1995
            </p>
          </div>
          {(instagramUrl || facebookUrl) && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-plate-100/30 mr-1">
                Seguinos
              </span>
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
      </div>

      {/* Columnas de links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-plate-100/40 mb-4">
            Institucional
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/mayorista" className="text-plate-100/70 hover:text-amber-400 transition-colors">Ventas mayoristas</a></li>
            <li><a href="/financiacion" className="text-plate-100/70 hover:text-amber-400 transition-colors">Financiación en cuotas</a></li>
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
            {(contactPhone || whatsappNumber) && (
              <li className="flex items-center gap-2 text-plate-100/70">
                <MessageCircle className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                {contactPhone || `+${whatsappNumber}`}
              </li>
            )}
            {contactEmail && (
              <li className="flex items-center gap-2 text-plate-100/70">
                <Mail className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                {contactEmail}
              </li>
            )}
            {contactAddress && (
              <li className="flex items-start gap-2 text-plate-100/70">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500/70" />
                {contactAddress}
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-plate-100/40 mb-4">
            Horarios
          </h3>
          <p className="text-sm text-plate-100/70 leading-relaxed">
            Lun a Vie<br />
            <span className="text-plate-100/90 font-medium">08:00–12:30 · 16:00–20:00</span>
          </p>
          <p className="text-sm text-plate-100/70 leading-relaxed mt-2">
            Sábados<br />
            <span className="text-plate-100/90 font-medium">08:00–13:00</span>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-5 px-4 sm:px-6">
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
