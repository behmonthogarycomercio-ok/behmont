import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

export default function Footer({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <footer className="bg-steel-900 text-plate-100 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display font-semibold text-white mb-3">Institucional</h3>
          <ul className="space-y-2 text-sm text-plate-100/80">
            <li><a href="/nosotros" className="hover:text-amber-400">Nosotros</a></li>
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
          <h3 className="font-display font-semibold text-white mb-3">Legales</h3>
          <ul className="space-y-2 text-sm text-plate-100/80">
            <li><a href="/terminos" className="hover:text-amber-400">Términos y condiciones</a></li>
            <li><a href="/privacidad" className="hover:text-amber-400">Política de privacidad</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white mb-3">Contacto</h3>
          <ul className="space-y-2 text-sm text-plate-100/80">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> +{whatsappNumber}
            </li>
            <li>ventas@behmont-imp.com.ar</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amber-500">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amber-500">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-amber-500">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-plate-100/60">
          © {new Date().getFullYear()} BEHMONT-IMP. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
