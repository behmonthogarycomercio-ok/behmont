import type { WhatsAppOrderItem } from './types';

type BuildOrderMessageInput = {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerNote?: string;
  items: WhatsAppOrderItem[];
};

export function buildOrderMessage({
  customerName,
  customerPhone,
  customerAddress,
  customerNote,
  items,
}: BuildOrderMessageInput): string {
  const lines: string[] = [];
  lines.push('🛒 *Nuevo pedido — BEHMONT-IMP*');
  lines.push('');
  lines.push(`👤 Cliente: ${customerName}`);
  lines.push(`📞 Teléfono: ${customerPhone}`);
  if (customerAddress) lines.push(`📍 Dirección: ${customerAddress}`);
  if (customerNote) lines.push(`📝 Nota: ${customerNote}`);
  lines.push('');
  lines.push('📦 Productos:');

  let total = 0;
  for (const item of items) {
    const subtotal = item.price * item.qty;
    total += subtotal;
    lines.push(
      `• (${item.sku}) ${item.name} — x${item.qty} — $${item.price.toLocaleString('es-AR')} c/u`
    );
  }

  lines.push('');
  lines.push(`💰 Total estimado: $${total.toLocaleString('es-AR')}`);
  lines.push('');
  lines.push('_Pedido generado desde behmont-imp.com_');

  return lines.join('\n');
}

/** Arma el link wa.me con el mensaje codificado, listo para abrir. */
export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensaje rápido de "Consultar por WhatsApp" para un solo producto, sin pasar por el carrito. */
export function buildQuickInquiryMessage(productName: string, sku: string): string {
  return `Hola BEHMONT-IMP 👋, quiero consultar por *${productName}* (código ${sku}). ¿Me pasan precio y disponibilidad?`;
}
