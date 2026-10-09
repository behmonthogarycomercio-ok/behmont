import type { SupabaseClient } from '@supabase/supabase-js';
import {
  fetchMLOrders,
  fetchMLOrderDetail,
  fetchMLShipment,
  getValidMLAccessToken,
} from './mercadolibre';
import { buildShipmentRow, buildSkuMap, mapMlShipmentStatus, STATUS_RANK, type ShipmentStatus } from './envios';
import { notifyDrivers } from './push';

// Antes esto solo corría una vez al día (cron de /api/ml/sync a las 9 UTC) --
// si se perdía el webhook de una venta de ayer, recién se veía hoy a la
// mañana, y encima arrancaba siempre en "pendiente" aunque ya estuviera en
// camino según ML. Esta función se cuelga (con throttle) de las páginas que
// abren repartidores/vendedores (/envios, /envios/vendedor) para que haya un
// chequeo real contra ML cada vez que alguien la usa durante su turno, sin
// depender de un cron de pago más frecuente (Vercel Hobby limita a 1/día).
const THROTTLE_MS = 10 * 60 * 1000;
const LAST_SYNC_KEY = 'ml_shipments_last_sync_at';

export async function maybeSyncShipments(supabase: SupabaseClient): Promise<void> {
  try {
    const { data: row } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', LAST_SYNC_KEY)
      .maybeSingle();
    const lastSync = row?.value ? new Date(row.value).getTime() : 0;
    if (Date.now() - lastSync < THROTTLE_MS) return;

    // Se marca el timestamp antes de arrancar (no al final) para que dos
    // requests casi simultáneas (dos repartidores abriendo /envios a la vez)
    // no disparen el sync dos veces en paralelo.
    await supabase.from('site_settings').upsert({ key: LAST_SYNC_KEY, value: new Date().toISOString() });

    const auth = await getValidMLAccessToken();
    if (!auth) return;

    await syncMissingShipments(supabase, auth.sellerId, auth.accessToken);
    await refreshActiveShipmentStatuses(supabase, auth.accessToken);
  } catch (err) {
    // Nunca debe tirar abajo la página que lo dispara (son endpoints sin
    // login que usan repartidores/vendedores) -- el cron diario sigue de red
    // de seguridad si esto falla.
    console.error('[envios-sync] fallo el sync oportunista:', err);
  }
}

/** Busca ventas pagadas recientes que todavía no tengan fila en ml_shipments
 * (se perdió el webhook) y las crea. */
export async function syncMissingShipments(
  supabase: SupabaseClient,
  sellerId: string,
  accessToken: string
): Promise<void> {
  const { orders } = await fetchMLOrders(sellerId, accessToken, 2);
  if (orders.length === 0) return;

  const { data: existingRows } = await supabase
    .from('ml_shipments')
    .select('ml_order_id')
    .in('ml_order_id', orders.map((o) => o.id));
  const existingIds = new Set((existingRows || []).map((r: { ml_order_id: number }) => r.ml_order_id));

  for (const order of orders) {
    if (existingIds.has(order.id)) continue;
    try {
      const detail = await fetchMLOrderDetail(order.id, accessToken);
      if (detail.status !== 'paid' || !detail.shipping?.id) continue;
      const shipment = await fetchMLShipment(detail.shipping.id, accessToken);
      const skuMap = await buildSkuMap(supabase, detail);
      const row = buildShipmentRow(detail, shipment, skuMap);
      const { error } = await supabase.from('ml_shipments').insert(row);
      if (error) {
        console.error(`[envios-sync] no se pudo guardar el envío pendiente ${order.id}:`, error);
        continue;
      }
      const items = row.items as { title: string; quantity: number }[];
      const firstTitle = items[0]?.title || 'Producto';
      const extra = items.length > 1 ? ` + ${items.length - 1} más` : '';
      await notifyDrivers({
        title: '📦 Nuevo envío pendiente',
        body: `${firstTitle}${extra}`,
        url: '/envios',
      });
    } catch (err) {
      console.error(`[envios-sync] no se pudo procesar el pendiente de envío de la orden ${order.id}:`, err);
    }
  }
}

/** Refresca el status real de ML para los envíos que todavía no están en un
 * paso terminal -- si ML ya lo muestra despachado/entregado/cancelado pero
 * nuestro status interno quedó atrás (nadie lo tapeó a mano todavía), lo
 * adelanta. Nunca retrocede un paso que el repartidor ya marcó a mano. */
export async function refreshActiveShipmentStatuses(
  supabase: SupabaseClient,
  accessToken: string
): Promise<void> {
  const { data: activeRows } = await supabase
    .from('ml_shipments')
    .select('id, status, ml_shipment_id, transportista, numeros_seguimiento')
    .not('status', 'in', '(entregado,cancelado)')
    .not('ml_shipment_id', 'is', null);

  type ActiveRow = {
    id: string;
    status: ShipmentStatus;
    ml_shipment_id: string;
    transportista: string | null;
    numeros_seguimiento: string[];
  };

  for (const row of (activeRows || []) as ActiveRow[]) {
    try {
      const shipment = await fetchMLShipment(row.ml_shipment_id, accessToken);
      const payload: Record<string, unknown> = {};

      const mapped = mapMlShipmentStatus(shipment.status);
      if (mapped && STATUS_RANK[mapped] > STATUS_RANK[row.status]) {
        payload.status = mapped;
        payload.ml_status = shipment.status;
        if (mapped === 'en_camino') payload.en_camino_at = new Date().toISOString();
        if (mapped === 'entregado') payload.delivered_at = new Date().toISOString();
      }

      // El tracking number no siempre está desde que se crea el envío -- ML
      // lo asigna recién cuando el transportista lo recibe. Se actualiza acá
      // cada vez que aparece o cambia, no solo cuando avanza el status.
      if (shipment.tracking_method && shipment.tracking_method !== row.transportista) {
        payload.transportista = shipment.tracking_method;
      }
      if (shipment.tracking_number && !row.numeros_seguimiento.includes(String(shipment.tracking_number))) {
        payload.numeros_seguimiento = [...row.numeros_seguimiento, String(shipment.tracking_number)];
      }

      if (Object.keys(payload).length === 0) continue;

      const { error } = await supabase.from('ml_shipments').update(payload).eq('id', row.id);
      if (error) console.error(`[envios-sync] no se pudo actualizar el status del envío ${row.id}:`, error);
    } catch (err) {
      console.error(`[envios-sync] no se pudo refrescar el status del envío ${row.id}:`, err);
    }
  }
}
