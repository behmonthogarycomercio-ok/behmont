import type { Metadata } from 'next';
import Link from 'next/link';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import FaqAccordion, { type FaqCategory } from '@/components/FaqAccordion';
import { getSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | BEHMONT',
  description: 'Envíos, formas de pago, garantías y horarios de atención. Todo lo que necesitás saber antes de comprar en BEHMONT, Concordia.',
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Envíos y Entregas',
    items: [
      {
        q: '¿Hacen envíos?',
        a: 'Sí, hacemos envíos locales en Concordia y despachamos a todo el país. Al momento de la compra coordinamos el método de transporte que mejor se adapte a tu localidad y al tipo de producto (especialmente para equipamiento comercial pesado).',
      },
      {
        q: '¿Puedo retirar mi pedido personalmente?',
        a: '¡Claro que sí! Podés retirar tu compra sin costo en nuestro local comercial ubicado en San Lorenzo Oeste 380, Concordia, Entre Ríos.',
      },
    ],
  },
  {
    title: 'Métodos de Pago y Facturación',
    items: [
      {
        q: '¿Cuáles son las formas de pago?',
        a: 'Aceptamos efectivo, tarjetas de débito y crédito, transferencias bancarias y Mercado Pago.',
      },
      {
        q: '¿Emiten Factura A?',
        a: 'Sí, emitimos Factura A y B. Si necesitás Factura A, recordá ingresar o enviarnos tu CUIT y los datos fiscales correspondientes al momento de realizar la compra.',
      },
    ],
  },
  {
    title: 'Garantía, Cambios y Soporte',
    items: [
      {
        q: '¿Los productos tienen garantía?',
        a: 'Sí, todos nuestros productos cuentan con garantía. Algunos tienen garantía oficial de fábrica y otros garantía de vendedor — el tipo de garantía correspondiente se detalla en cada producto.',
      },
      {
        q: '¿Qué hago si tengo un problema con mi compra o necesito asesoramiento?',
        a: 'Podés escribirnos directamente a nuestro mail behmont.equipamientos@gmail.com, llamarnos o mandarnos un WhatsApp al +54 9 3454 01-5358. ¡Estamos para ayudarte!',
      },
    ],
  },
  {
    title: 'Horarios de Atención',
    items: [
      {
        q: '¿En qué horarios puedo encontrarlos?',
        a: 'Te esperamos en nuestro local o respondemos tus consultas online en los siguientes horarios:\nLunes a Viernes: de 08:00 a 12:30 hs y de 16:00 a 20:00 hs.\nSábados: de 08:00 a 13:00 hs.',
      },
    ],
  },
];

export default async function FaqPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <nav className="font-mono text-[11px] text-steel-400 mb-4">
            <Link href="/" className="hover:text-steel-700 transition-colors">Inicio</Link>
            <span className="mx-2 text-steel-300">/</span>
            <span className="font-semibold text-steel-700">Preguntas frecuentes</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight">
            Preguntas frecuentes
          </h1>
          <p className="mt-2 text-sm text-steel-400 leading-relaxed">
            Si tenés otra duda, escribinos por WhatsApp y te respondemos al toque.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <FaqAccordion categories={FAQ_CATEGORIES} />
      </div>

      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
