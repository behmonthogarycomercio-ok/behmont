import type { Metadata } from 'next';
import Link from 'next/link';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import FaqAccordion, { type FaqCategory } from '@/components/FaqAccordion';
import { getSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Guía de compras | BEHMONT',
  description: 'Medios de pago, financiación propia, envíos y políticas de venta de BEHMONT, Concordia, Entre Ríos.',
};

const POLICY_FAQ: FaqCategory[] = [
  {
    title: 'Preguntas Frecuentes y Políticas de Venta',
    items: [
      {
        q: '¿Cuál es la política de garantías?',
        a: 'Todos los productos de nuestro catálogo cuentan con garantía. Algunos productos tienen garantía oficial de fábrica y otros garantía de vendedor, según corresponda a cada artículo. Ante un reclamo, la unidad queda sujeta a una revisión técnica bajo los términos específicos de la garantía para determinar si el defecto corresponde a una falla de fabricación o a una negligencia por uso indebido del cliente.\n\nEn caso de que se corrobore una falla cubierta por la garantía, el cliente deberá abonar el costo del envío de retorno del producto hacia nuestras instalaciones, mientras que nuestra empresa asumirá la totalidad del costo logístico para reenviar el producto reparado o el nuevo cambio hacia el domicilio del comprador.',
      },
      {
        q: '¿Se emiten comprobantes fiscales?',
        a: 'Sí, realizamos la facturación correspondiente por cada operación comercial efectuada, adaptándonos a la condición fiscal que requiera el cliente o su comercio.',
      },
      {
        q: '¿Se pueden realizar cancelaciones?',
        a: 'Debido a que los pedidos ingresan de forma automática al sector de preparación y logística para cumplir con los plazos de despacho de 48 horas, las órdenes de compra no podrán ser canceladas ni modificadas una vez que el pago haya sido acreditado o el crédito haya sido aprobado.',
      },
      {
        q: '¿Qué sucede si no me encuentro en el domicilio al momento de la entrega?',
        a: 'Para envíos nacionales mediante Andreani, si el personal de correo no encuentra a nadie en el domicilio asignado, procederá a contactarse con el destinatario o, en su defecto, derivará el paquete a la sucursal de Andreani más cercana para que pueda ser retirado de forma presencial por el titular.',
      },
    ],
  },
];

export default async function GuiaDeComprasPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <div className="border-b border-plate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <nav className="font-mono text-[11px] text-steel-400 mb-4">
            <Link href="/" className="hover:text-steel-700 transition-colors">Inicio</Link>
            <span className="mx-2 text-steel-300">/</span>
            <span className="font-semibold text-steel-700">Guía de compras</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-steel-950 tracking-tight">
            Guía de compras
          </h1>
          <p className="mt-2 text-sm text-steel-400">
            Financiación y condiciones del servicio
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-10">
        <section>
          <h2 className="font-display text-xl font-bold text-steel-950 tracking-tight mb-4">
            1. Medios de Pago y Financiación
          </h2>
          <p className="text-sm text-steel-600 leading-relaxed mb-5">
            Disponemos de diferentes alternativas de pago adaptadas a su ubicación geográfica y necesidades financieras.
          </p>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-steel-900 text-sm mb-2">
                A. Financiación Propia y Préstamos — Exclusivo Zona de Cobertura
              </h3>
              <p className="text-sm text-steel-600 leading-relaxed mb-3">
                Para residentes de Concordia, Chajarí, Federal, Federación, Concepción del Uruguay y Gualeguaychú, ofrecemos sistemas de crédito propio y préstamos de dinero en efectivo.
              </p>
              <ul className="space-y-1.5 text-sm text-steel-600 pl-4 border-l-2 border-plate-200">
                <li><span className="font-semibold text-steel-900">Pagos diarios o semanales:</span> aplicables de forma estándar.</li>
                <li><span className="font-semibold text-steel-900">Pagos mensuales:</span> exclusivo para clientes que presenten recibo de sueldo.</li>
              </ul>
              <div className="mt-4 rounded-xl border border-plate-200 bg-plate-50 px-5 py-4 text-sm text-steel-600">
                <span className="font-semibold text-steel-900">Requisitos:</span> DNI frente y dorso · Factura de servicio a nombre del solicitante · Comprobante de ingresos.
              </div>
              <p className="mt-3 text-xs text-steel-400 leading-relaxed">
                El otorgamiento de cualquier línea de crédito queda sujeto a la previa revisión del perfil crediticio del solicitante.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-steel-900 text-sm mb-2">B. Pago Online — Resto del País</h3>
              <p className="text-sm text-steel-600 leading-relaxed">
                Los pagos se procesan a través de Mercado Pago. Se aceptan tarjetas de crédito, débito y saldo en cuenta.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-steel-900 text-sm mb-2">C. Beneficios por Pago en Efectivo</h3>
              <p className="text-sm text-steel-600 leading-relaxed">
                Se aplican descuentos especiales para compras abonadas en efectivo, tanto en nuestra sucursal física como al momento de la entrega en zonas con cobertura propia.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-steel-950 tracking-tight mb-4">
            2. Logística, Envíos y Despachos
          </h2>
          <ul className="space-y-2 text-sm text-steel-600 pl-4 border-l-2 border-plate-200">
            <li><span className="font-semibold text-steel-900">Zonas con financiación propia:</span> entregas sin cargo de envío.</li>
            <li><span className="font-semibold text-steel-900">Resto del país:</span> envíos por Andreani — costo a consultar con el asesor al momento de la compra.</li>
            <li><span className="font-semibold text-steel-900">Plazos de despacho:</span> dentro de las 48 horas hábiles posteriores a la validación del pago.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-steel-950 tracking-tight mb-4">
            3. Seguimiento de Pedidos
          </h2>
          <p className="text-sm text-steel-600 leading-relaxed">
            Una vez que el paquete ha sido entregado a Andreani, se le proporcionará al cliente un código de seguimiento único. Podés usarlo en la sección de rastreo del footer del sitio.
          </p>
        </section>

        <section>
          <FaqAccordion categories={POLICY_FAQ} />
        </section>
      </div>

      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
