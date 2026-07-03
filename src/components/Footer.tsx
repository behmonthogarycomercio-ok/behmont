import { Instagram, MessageCircle, MapPin, Mail, ExternalLink } from 'lucide-react';

type FooterProps = {
  whatsappNumber: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  instagramUrl?: string;
  mlStoreUrl?: string;
};

export default function Footer({
  whatsappNumber,
  contactEmail,
  contactPhone,
  contactAddress,
  instagramUrl,
  mlStoreUrl,
}: FooterProps) {
  return (
    <footer className="bg-steel-900 text-plate-100 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display font-semibold text-white mb-3">Institucional</h3>
          <ul className="space-y-2 text-sm text-plate-100/80">
            <li><a href="/nosotros" className="hover:text-amber-400">Nosotros</a></li>
            <li><a href="/mayorista" className="hover:text-amber-400">Ventas mayoristas</a></li>
            <li><a href="/sucursales" className="hover:text-amber-400">Sucursales</a></li>
            <li><a href="/contacto" className="hover:text-amber-400">Sumate al equipo</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white mb-3">Ayuda</h3>
          <ul className="space-y-2 text-sm text-plate-100/80">
            <li><a href="/faq" className="hover:text-amber-400">Preguntas frecuentes</a></li>
            <li><a href="/guia-de-compras" className="hover:text-amber-400">Guía de compras</a></li>
            <li><a href="/seguimiento" className="hover:text-amber-400">Seguimiento de mi pedido</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white mb-3">Encontranos también en</h3>
          <ul className="space-y-2 text-sm text-plate-100/80">
            {mlStoreUrl && (
              <li>
                <a
                  href={mlStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-amber-400"
                >
                  MercadoLibre <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            )}
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-amber-400"
                >
                  Instagram <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white mb-3">Contacto</h3>
          <ul className="space-y-2.5 text-sm text-plate-100/80">
            {(contactPhone || whatsappNumber) && (
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0" /> {contactPhone || `+${whatsappNumber}`}
              </li>
            )}
            {contactEmail && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> {contactEmail}
              </li>
            )}
            {contactAddress && (
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> {contactAddress}
              </li>
            )}
          </ul>
          {instagramUrl && (
            <div className="flex gap-3 mt-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amber-500"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-plate-100/60">
          © {new Date().getFullYear()} BEHMONT — Comercio y Hogar. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
