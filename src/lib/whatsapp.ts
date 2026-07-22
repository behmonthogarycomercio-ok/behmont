import type { WhatsAppOrderItem } from './types';

type BuildOrderMessageInput = {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerNote?: string;
  financingPlan?: string;
  wantsInstallments3?: boolean;
  items: WhatsAppOrderItem[];
};

export function buildOrderMessage({
  customerName,
  customerPhone,
  customerAddress,
  customerNote,
  financingPlan,
  wantsInstallments3,
  items,
}: BuildOrderMessageInput): string {
  const lines: string[] = [];
  lines.push('*Nuevo pedido — BEHMONT*');
  lines.push('');
  lines.push(`Cliente: ${customerName}`);
  lines.push(`Telefono: ${customerPhone}`);
  if (customerAddress) lines.push(`Direccion: ${customerAddress}`);
  if (customerNote) lines.push(`Nota: ${customerNote}`);
  lines.push('');
  lines.push('Productos:');

  let total = 0;
  for (const item of items) {
    const subtotal = item.price * item.qty;
    total += subtotal;
    lines.push(
      `• (${item.sku}) ${item.name} — x${item.qty} — $${item.price.toLocaleString('es-AR')} c/u`
    );
  }

  lines.push('');
  lines.push(`Total estimado: $${total.toLocaleString('es-AR')}`);
  if (financingPlan) {
    lines.push('');
    lines.push(`Quiere financiar: ${financingPlan}`);
  }
  if (wantsInstallments3) {
    lines.push('');
    lines.push('Quiere pagar en 3 cuotas sin interés — coordinar link de pago.');
  }
  lines.push('');
  lines.push('_Pedido generado desde behmont.com.ar_');

  return lines.join('\n');
}

type BuildMpOrderMessageInput = {
  customerName: string;
  customerPhone: string;
  paymentId?: string;
  items: { name: string; price: number; qty: number }[];
};

export function buildMpOrderMessage({
  customerName,
  customerPhone,
  paymentId,
  items,
}: BuildMpOrderMessageInput): string {
  const lines: string[] = [];
  lines.push('*Pedido pagado por MercadoPago — BEHMONT*');
  lines.push('');
  lines.push(`Cliente: ${customerName}`);
  lines.push(`Telefono: ${customerPhone}`);
  if (paymentId) lines.push(`Nro de operacion: ${paymentId}`);
  lines.push('');
  lines.push('Productos:');

  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
    lines.push(`• ${item.name} — x${item.qty} — $${item.price.toLocaleString('es-AR')} c/u`);
  }

  lines.push('');
  lines.push(`Total: $${total.toLocaleString('es-AR')}`);
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
