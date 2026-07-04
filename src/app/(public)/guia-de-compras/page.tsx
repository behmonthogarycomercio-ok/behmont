import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import FaqAccordion, { type FaqCategory } from '@/components/FaqAccordion';
import { getSiteSettings } from '@/lib/data';

const POLICY_FAQ: FaqCategory[] = [
  {
    title: '4. Preguntas Frecuentes y Políticas de Venta',
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
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 mb-2">
        Guía de Compras
      </h1>
      <p className="text-steel-500 text-sm mb-8">Financiación y condiciones del servicio</p>

      <p className="text-steel-700 leading-relaxed mb-10">
        Bienvenido a nuestra plataforma. Con el objetivo de brindar total transparencia y
        seguridad en sus transacciones, detallamos a continuación los términos, condiciones y
        modalidades de compra para productos del hogar y comercios, así como nuestras líneas de
        créditos y préstamos.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-steel-900 mb-3">
          1. Medios de Pago y Financiación
        </h2>
        <p className="text-steel-700 leading-relaxed mb-5">
          Disponemos de diferentes alternativas de pago adaptadas a su ubicación geográfica y
          necesidades financieras:
        </p>

        <h3 className="font-display font-semibold text-steel-900 mb-2">
          A. Financiación Propia y Préstamos (Exclusivo Zona de Cobertura)
        </h3>
        <p className="text-steel-700 leading-relaxed mb-3">
          Para residentes de Concordia, Chajarí, Federal, Federación, Concepción del Uruguay y
          Gualeguaychú, ofrecemos sistemas de crédito propio y préstamos de dinero en efectivo.
        </p>
        <p className="text-steel-700 leading-relaxed mb-2">
          Las modalidades de pago para la adquisición de productos o cancelación de préstamos se
          definen según la documentación presentada:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-steel-700 mb-4">
          <li>
            <span className="font-medium text-steel-900">Pagos diarios o semanales:</span>{' '}
            aplicables de forma estándar.
          </li>
          <li>
            <span className="font-medium text-steel-900">Pagos mensuales:</span> opción exclusiva
            para aquellos clientes que presenten recibo de sueldo.
          </li>
        </ul>

        <p className="text-steel-700 leading-relaxed mb-2">
          Requisitos obligatorios para acceder al crédito o préstamo:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-steel-700 mb-4">
          <li>Copia fotográfica de Documento Nacional de Identidad (DNI), frente y dorso.</li>
          <li>
            Factura de un servicio público o privado a nombre del solicitante (luz, agua,
            internet, entre otros) cuyo domicilio coincida con el declarado.
          </li>
          <li>
            Comprobante de ingresos demostrable: recibo de sueldo, constancia de inscripción
            laboral/comercial o factura de compra que respalde la actividad del negocio.
          </li>
        </ul>

        <div className="rounded-xl2 border border-plate-200 bg-plate-50 p-4 text-sm text-steel-700 mb-6">
          <span className="font-semibold text-steel-900">Nota de aprobación:</span> el
          otorgamiento de cualquier línea de crédito o préstamo de dinero queda sujeto a la previa
          revisión y análisis del perfil crediticio del solicitante por parte de nuestro
          departamento de evaluación.
        </div>

        <h3 className="font-display font-semibold text-steel-900 mb-2">
          B. Pago Online (Resto del País)
        </h3>
        <p className="text-steel-700 leading-relaxed mb-6">
          Para compras desde localidades fuera de la zona de cobertura mencionada, los pagos se
          procesan de manera digital a través de la plataforma Mercado Pago, integrada
          directamente en el sitio web. Se aceptan tarjetas de crédito, débito y saldo en cuenta.
        </p>

        <h3 className="font-display font-semibold text-steel-900 mb-2">
          C. Beneficios por Pago en Efectivo
        </h3>
        <p className="text-steel-700 leading-relaxed">
          Se aplican descuentos especiales sobre el valor del producto para aquellas compras
          abonadas en efectivo (cash). Este beneficio es válido tanto en nuestra sucursal física
          como al momento de la entrega en las zonas con cobertura de financiación propia.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-steel-900 mb-3">
          2. Logística, Envíos y Despachos
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-steel-700">
          <li>
            <span className="font-medium text-steel-900">Zonas con financiación propia:</span>{' '}
            las entregas en las localidades bajo nuestra área de cobertura financiera se realizan
            sin cargo de envío.
          </li>
          <li>
            <span className="font-medium text-steel-900">Resto del país:</span> los envíos a todo
            el territorio nacional se efectúan a través de la empresa de logística Andreani. El
            costo del flete debe ser consultado directamente con el asesor comercial al momento de
            procesar la compra.
          </li>
          <li>
            <span className="font-medium text-steel-900">Plazos de despacho:</span> la mercadería
            se despacha dentro de las 48 horas hábiles posteriores a la validación del pago o a la
            aprobación final del crédito.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-steel-900 mb-3">
          3. Seguimiento de Pedidos
        </h2>
        <p className="text-steel-700 leading-relaxed">
          Una vez que el paquete ha sido entregado a la empresa de transporte, se le proporcionará
          al cliente un código de seguimiento único. Para verificar el estado del envío, se debe
          ingresar dicho código en la sección de consulta ubicada en el menú inferior (footer) de
          nuestra página web.
        </p>
      </section>

      <section>
        <FaqAccordion categories={POLICY_FAQ} />
      </section>

      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
