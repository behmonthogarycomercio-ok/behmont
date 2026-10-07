import { z } from 'zod';
import type { MLOrderDetail, MLShipment } from './mercadolibre';
import { STAFF, STAFF_LABELS, staffSchema } from './turnero';

export const DESTINO_LABELS: Record<string, string> = {
  domicilio: 'Entregar en domicilio',
  sucursal_andreani: 'Llevar a sucursal de transporte',
  otro: 'Ver detalle',
};

export const deliverSchema = z.object({
  id: z.string().uuid(),
  deliveredBy: z.string().trim().min(1).max(100),
});

export const subscribeSchema = z.object({
  subscription: z.object({
    endpoint: z.string().url(),
    keys: z.object({ p256dh: z.string(), auth: z.string() }),
  }),
});

export const unsubscribeSchema = z.object({ endpoint: z.string().url() });

export const manualShipmentSchema = z.object({
  productTitle: z.string().trim().min(1).max(300),
  buyerNickname: z.string().trim().max(100).optional(),
  destinoTipo: z.enum(['domicilio', 'sucursal_andreani', 'otro']),
  destinoDetalle: z.string().trim().max(1000).optional(),
});

/** Carga de un vendedor (Lucas/Luz/Lito) desde /envios/vendedor -- venta hecha
 * fuera del sistema (ej. en el local, sin pasar por MercadoLibre), sin cuenta
 * de admin. Igual que manualShipmentSchema pero identifica quién la cargó. */
export const vendorManualShipmentSchema = manualShipmentSchema.extend({
  addedBy: staffSchema,
});

export { STAFF, STAFF_LABELS };

// Tipos de logística de ML: self_service (Flex) y custom se entregan directo
// en el domicilio del comprador; drop_off y cross_docking son cuando el
// repartidor deja el paquete en la sucursal del transporte (Andreani, etc.)
// y de ahí lo termina de llevar el transportista.
const DOMICILIO_LOGISTIC_TYPES = new Set(['self_service', 'custom']);
const SUCURSAL_LOGISTIC_TYPES = new Set(['drop_off', 'cross_docking', 'xd_drop_off']);

function formatAddress(addr: NonNullable<MLShipment['receiver_address']>): string {
  const parts: string[] = [];
  const street = [addr.street_name, addr.street_number].filter(Boolean).join(' ');
  if (street) parts.push(street);
  if (addr.city?.name) parts.push(addr.city.name);
  const header = parts.join(', ');

  const contact = [addr.receiver_name, addr.receiver_phone ? `Tel: ${addr.receiver_phone}` : null]
    .filter(Boolean)
    .join(' — ');

  return [header, contact, addr.comment].filter(Boolean).join(' — ');
}

export type DerivedDestino = {
  destinoTipo: 'domicilio' | 'sucursal_andreani' | 'otro';
  destinoDetalle: string | null;
  estimatedDeliveryDate: string | null; // YYYY-MM-DD
};

/** Deriva a dónde tiene que llevar el repartidor el paquete, a partir del shipment de ML. */
export function deriveDestino(shipment: MLShipment): DerivedDestino {
  const estimatedRaw =
    shipment.shipping_option?.estimated_delivery_time?.date ??
    shipment.shipping_option?.estimated_delivery_limit?.date ??
    null;
  const estimatedDeliveryDate = estimatedRaw ? estimatedRaw.slice(0, 10) : null;

  if (DOMICILIO_LOGISTIC_TYPES.has(shipment.logistic_type)) {
    return {
      destinoTipo: 'domicilio',
      destinoDetalle: shipment.receiver_address ? formatAddress(shipment.receiver_address) : null,
      estimatedDeliveryDate,
    };
  }

  if (SUCURSAL_LOGISTIC_TYPES.has(shipment.logistic_type)) {
    const carrier = shipment.tracking_method || 'transporte';
    const receiver = shipment.receiver_address;
    const contact = receiver
      ? [receiver.receiver_name, receiver.receiver_phone ? `Tel: ${receiver.receiver_phone}` : null]
          .filter(Boolean)
          .join(' — ')
      : '';
    return {
      destinoTipo: 'sucursal_andreani',
      destinoDetalle: [`Sucursal: ${carrier}`, contact || null].filter(Boolean).join(' — '),
      estimatedDeliveryDate,
    };
  }

  return {
    destinoTipo: 'otro',
    destinoDetalle: shipment.receiver_address ? formatAddress(shipment.receiver_address) : null,
    estimatedDeliveryDate,
  };
}

/** Arma la fila lista para upsert en ml_shipments a partir de la orden + el envío de ML. */
export function buildShipmentRow(order: MLOrderDetail, shipment: MLShipment) {
  const destino = deriveDestino(shipment);
  return {
    ml_order_id: order.id,
    ml_shipment_id: String(shipment.id),
    destino_tipo: destino.destinoTipo,
    destino_detalle: destino.destinoDetalle,
    buyer_nickname: order.buyer?.nickname ?? null,
    items: (order.order_items || []).map((oi) => ({ title: oi.item.title, quantity: oi.quantity })),
    total: order.total_amount,
    logistic_type: shipment.logistic_type,
    ml_status: shipment.status,
    estimated_delivery_date: destino.estimatedDeliveryDate,
  };
}

/** Un pendiente está retrasado si ya pasó la fecha estimada de ML, o (sin fecha) a los 3 días de creado. */
export function isRetrasado(row: { status: string; created_at: string; estimated_delivery_date: string | null }): boolean {
  if (row.status !== 'pendiente') return false;
  const today = new Date().toISOString().slice(0, 10);
  if (row.estimated_delivery_date) return row.estimated_delivery_date < today;
  const FALLBACK_DAYS = 3;
  const ageMs = Date.now() - new Date(row.created_at).getTime();
  return ageMs > FALLBACK_DAYS * 86400000;
}
