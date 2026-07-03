import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import FaqAccordion, { type FaqCategory } from '@/components/FaqAccordion';
import { getCategories, getSiteSettings } from '@/lib/data';

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: '📦 Envíos y Entregas',
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
    title: '💳 Métodos de Pago y Facturación',
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
    title: '🛠️ Garantía, Cambios y Soporte',
    items: [
      {
        q: '¿Los productos tienen garantía?',
        a: 'Sí, todos nuestros productos de equipamiento comercial, hogar y electrónica cuentan con garantía oficial de fábrica.',
      },
      {
        q: '¿Qué hago si tengo un problema con mi compra o necesito asesoramiento?',
        a: 'Podés escribirnos directamente a nuestro mail behmont.equipamientos@gmail.com, llamarnos o mandarnos un WhatsApp al +54 9 3454 01-5358. ¡Estamos para ayudarte!',
      },
    ],
  },
  {
    title: '🕒 Horarios de Atención',
    items: [
      {
        q: '¿En qué horarios puedo encontrarlos?',
        a: 'Te esperamos en nuestro local o respondemos tus consultas online en los siguientes horarios:\nLunes a Viernes: de 08:00 a 12:30 hs y de 16:00 a 20:00 hs.\nSábados: de 08:00 a 13:00 hs.',
      },
    ],
  },
];

export default async function FaqPage() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <>
      <Navbar categories={categories} />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 mb-2">
          Preguntas frecuentes
        </h1>
        <p className="text-steel-500 text-sm mb-8">
          Todo lo que necesitás saber antes de comprar. Si tenés otra duda, escribinos por
          WhatsApp y te respondemos al toque.
        </p>
        <FaqAccordion categories={FAQ_CATEGORIES} />
      </main>
      <Footer
        whatsappNumber={settings.whatsappNumber}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={settings.contactAddress}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        mlStoreUrl={settings.mlStoreUrl}
      />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
