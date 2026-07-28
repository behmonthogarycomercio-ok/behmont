import { formatPrice } from './price';
import type { WhatsAppOrderItem } from './types';

const SHIPPING_METHOD_LABELS: Record<string, string> = {
  sucursal: 'Envío a sucursal',
  domicilio: 'Envío a domicilio',
  retiro: 'Retiro en local',
};

const SHIPPING_METHOD_NOTES: Record<string, string> = {
  sucursal: 'lo abona el cliente al retirar en la sucursal',
  domicilio: 'lo abona el cliente por transferencia',
  retiro: 'coordinar retiro y pago por WhatsApp',
};

type BuildOrderMessageInput = {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerCity?: string;
  customerProvince?: string;
  customerPostalCode?: string;
  shippingMethod?: string;
  customerNote?: string;
  financingPlan?: string;
  wantsInstallments3?: boolean;
  financingDocuments?: { label: string; url: string }[];
  items: WhatsAppOrderItem[];
};

export function buildOrderMessage({
  customerName,
  customerPhone,
  customerAddress,
  customerCity,
  customerProvince,
  customerPostalCode,
  shippingMethod,
  customerNote,
  financingPlan,
  wantsInstallments3,
  financingDocuments,
  items,
}: BuildOrderMessageInput): string {
  const lines: string[] = [];
  lines.push('*Nuevo pedido — BEHMONT*');
  lines.push('');
  lines.push(`Cliente: ${customerName}`);
  lines.push(`Telefono: ${customerPhone}`);
  if (customerAddress) lines.push(`Direccion: ${customerAddress}`);
  if (customerCity) lines.push(`Ciudad: ${customerCity}`);
  if (customerProvince) lines.push(`Provincia: ${customerProvince}`);
  if (customerPostalCode) lines.push(`Codigo postal: ${customerPostalCode}`);
  if (shippingMethod) lines.push(`Envio: ${SHIPPING_METHOD_LABELS[shippingMethod] || shippingMethod} (${SHIPPING_METHOD_NOTES[shippingMethod] || ''})`);
  if (customerNote) lines.push(`Nota: ${customerNote}`);
  lines.push('');
  lines.push('Productos:');

  let total = 0;
  for (const item of items) {
    const subtotal = item.price * item.qty;
    total += subtotal;
    lines.push(
      `• (${item.sku}) ${item.name} — x${item.qty} — $${formatPrice(item.price)} c/u`
    );
  }

  lines.push('');
  lines.push(`Total estimado: $${formatPrice(total)}`);
  if (financingPlan) {
    lines.push('');
    lines.push(`Quiere financiar: ${financingPlan}`);
  }
  if (wantsInstallments3) {
    lines.push('');
    lines.push('Quiere pagar en 3 cuotas sin interés — coordinar link de pago.');
  }
  if (financingDocuments && financingDocuments.length > 0) {
    lines.push('');
    lines.push('Documentacion para financiar:');
    for (const doc of financingDocuments) {
      lines.push(`• ${doc.label}: ${doc.url}`);
    }
  }
  lines.push('');
  lines.push('_Pedido generado desde behmont.com.ar_');

  return lines.join('\n');
}

type BuildMpOrderMessageInput = {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerCity?: string;
  customerProvince?: string;
  customerPostalCode?: string;
  shippingMethod?: string;
  paymentId?: string;
  items: { name: string; price: number; qty: number }[];
};

export function buildMpOrderMessage({
  customerName,
  customerPhone,
  customerAddress,
  customerCity,
  customerProvince,
  customerPostalCode,
  shippingMethod,
  paymentId,
  items,
}: BuildMpOrderMessageInput): string {
  const lines: string[] = [];
  lines.push('*Pedido pagado por MercadoPago — BEHMONT*');
  lines.push('');
  lines.push(`Cliente: ${customerName}`);
  lines.push(`Telefono: ${customerPhone}`);
  if (customerAddress) lines.push(`Direccion: ${customerAddress}`);
  if (customerCity) lines.push(`Ciudad: ${customerCity}`);
  if (customerProvince) lines.push(`Provincia: ${customerProvince}`);
  if (customerPostalCode) lines.push(`Codigo postal: ${customerPostalCode}`);
  if (shippingMethod) lines.push(`Envio: ${SHIPPING_METHOD_LABELS[shippingMethod] || shippingMethod} (${SHIPPING_METHOD_NOTES[shippingMethod] || ''})`);
  if (paymentId) lines.push(`Nro de operacion: ${paymentId}`);
  lines.push('');
  lines.push('Productos:');

  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
    lines.push(`• ${item.name} — x${item.qty} — $${formatPrice(item.price)} c/u`);
  }

  lines.push('');
  lines.push(`Total: $${formatPrice(total)}`);
  lines.push('');
  lines.push('_Pedido generado desde behmont.com.ar_');

  return lines.join('\n');
}

/** Arma el link wa.me con el mensaje codificado, listo para abrir. */
export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensaje corto y profesional para los botones de "Consultar" — identifica que viene del sitio. */
export function buildQuickInquiryMessage(): string {
  return 'Hola, me comunico desde la página web porque quiero hacer una consulta sobre un producto.';
}

/** Mensaje para consultar por una promo puntual del carrusel de financiación, identificándola por título. */
export function buildPromoInquiryMessage(promoTitle: string): string {
  return `Hola, me comunico desde la página web porque me interesa esta promo: "${promoTitle}".`;
}

/** Mensaje para avisar que quiere usar un cupón -- el descuento se aplica manualmente al armar el pedido. */
export function buildCouponInquiryMessage(code: string): string {
  return `Hola, quiero hacer un pedido usando el cupón ${code}.`;
}
