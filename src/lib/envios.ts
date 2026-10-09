import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MLOrderDetail, MLShipment } from './mercadolibre';
import { STAFF, STAFF_LABELS, staffSchema } from './turnero';

export const DESTINO_LABELS: Record<string, string> = {
  domicilio: 'Entregar en domicilio',
  sucursal_andreani: 'Llevar a sucursal de transporte',
  otro: 'Ver detalle',
};

// Pasos del envío, en orden: el repartidor busca el producto en depósito y
// lo retira, queda en camino, y lo entrega. "pendiente"/"cancelado" no los
// pone el repartidor (los crea el sistema o los corrige un admin).
export const SHIPMENT_STATUSES = ['pendiente', 'retirado', 'en_camino', 'entregado', 'cancelado'] as const;
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  pendiente: 'Pendiente',
  retirado: 'Retirado de depósito',
  en_camino: 'En camino',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

// Próximo paso que puede tomar el repartidor desde cada estado -- null si no
// hay acción de repartidor disponible (recién creado por el sistema espera
// "retirado", por ejemplo, nunca al revés).
export const NEXT_DRIVER_STATUS: Partial<Record<ShipmentStatus, ShipmentStatus>> = {
  pendiente: 'retirado',
  retirado: 'en_camino',
  en_camino: 'entregado',
};

// Orden de avance de los pasos -- se usa para nunca retroceder un estado que
// ya avanzó el repartidor a mano cuando se refresca el status real de ML
// (ver syncShipmentStatus en envios-sync.ts).
export const STATUS_RANK: Record<ShipmentStatus, number> = {
  pendiente: 0,
  retirado: 1,
  en_camino: 2,
  entregado: 3,
  cancelado: 4,
};

// Mapeo del status crudo que devuelve la API de Shipments de ML a nuestros
// pasos internos. Solo cubre los 3 que podemos confiar que reflejan la
// realidad sin intervención del repartidor (ML nunca sabe que "se retiró
// del depósito" -- eso es un paso puramente interno). "pending"/"handling"/
// "ready_to_ship" no mapean a nada: se deja el estado como está.
export function mapMlShipmentStatus(mlStatus: string | null | undefined): ShipmentStatus | null {
  switch (mlStatus) {
    case 'shipped':
      return 'en_camino';
    case 'delivered':
      return 'entregado';
    case 'cancelled':
      return 'cancelado';
    default:
      return null;
  }
}

// Link público para consultar el estado de un envío por transportista.
// Solo se incluyen los que se confirmaron a mano (abriendo el sitio real y
// viendo el buscador) -- mejor no mostrar link que mostrar uno roto. Hoy
// todos los envíos de ML de la cuenta salen por Andreani, así que cubre el
// caso real; si aparece otro transportista, se agrega acá cuando se
// confirme su URL.
export function getTrackingUrl(transportista: string | null | undefined): string | null {
  if (!transportista) return null;
  if (/andreani/i.test(transportista)) return 'https://www.andreani.com/?tab=seguir-envio';
  return null;
}

/** Convierte lo que se tipeó en el input de "números de seguimiento" (uno o
 * varios, separados por coma o salto de línea -- las ventas con envío
 * nacional por Andreani a veces se despachan en más de un paquete) en la
 * lista que se guarda en la base. */
export function parseTrackingNumbers(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return [...new Set(raw.split(/[,\n]/).map((s) => s.trim()).filter(Boolean))];
}

export const DRIVER_ACTION_LABELS: Record<string, string> = {
  retirado: 'Retiré del depósito',
  en_camino: 'Salió en camino',
  entregado: 'Marcar entregado',
};

export const shipmentStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['retirado', 'en_camino', 'entregado']),
  by: z.string().trim().min(1).max(100).optional(),
});

// Datos del envío de las cargas manuales (transportista + seguimiento +
// precio asegurado) -- a veces se saben al cargar la venta, pero muchas
// veces se termina despachando como "encomienda en mostrador" (se decide en
// la agencia del transportista) y recién ahí se sabe. Por eso este schema se
// usa tanto al crear el pendiente como para que el repartidor los complete
// después desde /envios (ver /api/envios/tracking).
export const trackingSchema = z.object({
  id: z.string().uuid(),
  transportista: z.string().trim().max(100).optional(),
  numerosSeguimiento: z.string().trim().max(500).optional(),
  precioAsegurado: z.coerce.number().min(0).optional(),
});

// Las ventas de MercadoLibre siempre llegan ya pagadas (el pendiente se crea
// recién cuando ML confirma el pago) -- esto es solo relevante para lo
// cargado a mano, que puede ser contra entrega.
export const PAYMENT_STATUSES = ['abonado', 'pendiente_pago'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  abonado: 'Abonado',
  pendiente_pago: 'Pendiente de abonar',
};

export const paymentStatusSchema = z.object({
  id: z.string().uuid(),
  paymentStatus: z.enum(PAYMENT_STATUSES),
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
  sku: z.string().trim().max(60).optional(),
  buyerNickname: z.string().trim().max(100).optional(),
  destinoTipo: z.enum(['domicilio', 'sucursal_andreani', 'otro']),
  destinoDetalle: z.string().trim().max(1000).optional(),
  paymentStatus: z.enum(PAYMENT_STATUSES).default('abonado'),
  transportista: z.string().trim().max(100).optional(),
  numerosSeguimiento: z.string().trim().max(500).optional(),
  precioAsegurado: z.coerce.number().min(0).optional(),
});

/** Carga de un vendedor (Lucas/Luz/Lito) desde /envios/vendedor -- venta hecha
 * fuera del sistema (ej. en el local, sin pasar por MercadoLibre), sin cuenta
 * de admin. Agrega los datos del comprador que no vienen de MercadoLibre
 * (ahí ya los trae la API) y que el repartidor necesita para entregar o
 * identificar a la persona: DNI, contacto y código postal; el email es solo
 * para registro, no hace falta para la entrega. */
export const vendorManualShipmentSchema = manualShipmentSchema.extend({
  addedBy: staffSchema,
  dni: z.string().trim().max(20).optional(),
  contacto: z.string().trim().max(50).optional(),
  email: z.string().trim().max(150).optional(),
  codigoPostal: z.string().trim().max(15).optional(),
});

/** Arma el texto final de destino combinando la dirección con los datos
 * del comprador cargados a mano -- mismo campo que usan todas las vistas. */
export function formatManualDestino(parts: {
  destinoDetalle?: string;
  dni?: string;
  contacto?: string;
  email?: string;
  codigoPostal?: string;
}): string | null {
  const bits = [
    parts.destinoDetalle,
    parts.codigoPostal ? `CP: ${parts.codigoPostal}` : null,
    parts.contacto ? `Tel: ${parts.contacto}` : null,
    parts.dni ? `DNI: ${parts.dni}` : null,
    parts.email ? `Email: ${parts.email}` : null,
  ].filter(Boolean);
  return bits.length > 0 ? bits.join(' — ') : null;
}

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

/** Texto legible con todos los items de un envío y su cantidad cada uno --
 * antes solo se mostraba el título del primero + "+N más" sin aclarar
 * cuántas unidades de cada producto se vendieron. La cantidad siempre se
 * muestra (incluso "1x"), para que no haya que inferirla por ausencia. */
export function itemsSummary(items: { title: string; quantity: number }[]): string {
  if (items.length === 0) return 'Producto';
  return items.map((i) => `${i.quantity}x ${i.title}`).join(' + ');
}

/** Resuelve el SKU propio de cada item de una orden de ML para que el
 * repartidor/vendedor puedan buscarlo en la terminal de depósito.
 * ml_item_id quedó sin poblar en casi todo el catálogo (se perdió en algún
 * sync viejo), así que no alcanza con matchear solo por ahí -- products.sku
 * también sirve de match directo cuando el producto no tenía SKU propio
 * del vendedor y el sync de ML usó el item.id de MercadoLibre como sku
 * (ver payload.sku en /api/ml/sync). */
export async function buildSkuMap(supabase: SupabaseClient, order: MLOrderDetail): Promise<Map<string, string>> {
  const itemIds = (order.order_items || []).map((oi) => oi.item.id).filter(Boolean);
  if (itemIds.length === 0) return new Map();
  const map = new Map<string, string>();
  const [byMlItemId, bySku] = await Promise.all([
    supabase.from('products').select('ml_item_id, sku').in('ml_item_id', itemIds),
    supabase.from('products').select('sku').in('sku', itemIds),
  ]);
  for (const p of (byMlItemId.data || []) as { ml_item_id: string; sku: string }[]) map.set(p.ml_item_id, p.sku);
  for (const p of (bySku.data || []) as { sku: string }[]) map.set(p.sku, p.sku);
  return map;
}

/** Arma la fila lista para upsert en ml_shipments a partir de la orden + el envío de ML.
 * `skuByMlItemId` resuelve el SKU propio de cada item (vía products.ml_item_id) para que
 * el repartidor/vendedor puedan buscarlo en la terminal de depósito -- opcional porque el
 * caller puede no tener el mapeo a mano (en ese caso queda sin sku, no rompe nada). */
export function buildShipmentRow(
  order: MLOrderDetail,
  shipment: MLShipment,
  skuByMlItemId?: Map<string, string>
) {
  const destino = deriveDestino(shipment);
  // Si el sync (webhook o cron) se enteró tarde de la venta -- ej. se perdió el
  // webhook y recién la trae el cron del día siguiente -- la fila no debe
  // aparentar que "recién ingresó": se usa la fecha real de la orden en ML,
  // no el momento en que se inserta la fila. Mismo motivo para el status: si
  // ML ya la muestra despachada/en camino, arranca ahí en vez de "pendiente".
  const mappedStatus = mapMlShipmentStatus(shipment.status);
  return {
    ml_order_id: order.id,
    ml_shipment_id: String(shipment.id),
    ...(mappedStatus ? { status: mappedStatus } : {}),
    destino_tipo: destino.destinoTipo,
    destino_detalle: destino.destinoDetalle,
    buyer_nickname: order.buyer?.nickname ?? null,
    items: (order.order_items || []).map((oi) => ({
      title: oi.item.title,
      quantity: oi.quantity,
      sku: skuByMlItemId?.get(oi.item.id) ?? null,
    })),
    total: order.total_amount,
    logistic_type: shipment.logistic_type,
    ml_status: shipment.status,
    transportista: shipment.tracking_method || null,
    numeros_seguimiento: shipment.tracking_number ? [shipment.tracking_number] : [],
    estimated_delivery_date: destino.estimatedDeliveryDate,
    payment_status: 'abonado' as const, // ML solo crea el pendiente cuando ya se pagó
    created_at: order.date_created,
  };
}

/** Un envío está retrasado si todavía no se entregó (en cualquiera de sus
 * pasos: pendiente, retirado o en camino) y ya pasó la fecha estimada de ML,
 * o (sin fecha) pasaron más de 3 días desde que se creó. */
export function isRetrasado(row: { status: string; created_at: string; estimated_delivery_date: string | null }): boolean {
  if (row.status === 'entregado' || row.status === 'cancelado') return false;
  const today = new Date().toISOString().slice(0, 10);
  if (row.estimated_delivery_date) return row.estimated_delivery_date < today;
  const FALLBACK_DAYS = 3;
  const ageMs = Date.now() - new Date(row.created_at).getTime();
  return ageMs > FALLBACK_DAYS * 86400000;
}
