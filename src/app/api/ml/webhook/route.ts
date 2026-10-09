import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { getValidMLAccessToken, fetchMLOrderDetail, fetchMLShipment } from '@/lib/mercadolibre';
import { buildShipmentRow } from '@/lib/envios';
import { notifyDrivers } from '@/lib/push';

// Configurar en developers.mercadolibre.com.ar > Notificaciones:
//   https://tu-dominio.com/api/ml/webhook
// ML espera un 200 rápido; por eso el sync de catálogo (precio/stock) NO se
// hace acá, corre por cron contra /api/ml/sync. Pero las notificaciones de
// "orders_v2" sí se procesan acá adentro de forma síncrona (2 llamadas a la
// API de ML + un insert) para que el pendiente de entrega quede creado al
// toque -- es liviano y, si ML reintenta el webhook por tardanza, el chequeo
// de "ya existe" lo hace no-op. El fallback del cron diario (/api/ml/sync)
// solo cubre el caso de que este webhook se pierda un evento.
export async function POST(request: Request) {
  let payload: { topic?: string; resource?: string } = {};
  try {
    payload = await request.json();
  } catch {
    // payload vacío o inválido — igual respondemos 200 para que ML no reintente en loop
    return NextResponse.json({ received: true });
  }

  if (payload.topic === 'orders_v2' && payload.resource) {
    try {
      await handleOrderNotification(payload.resource);
    } catch (err) {
      // Nunca tira el ack abajo por un fallo de ML/DB -- el cron diario es la red de seguridad.
      console.error('[ml webhook] no se pudo procesar la orden:', err);
    }
  }

  return NextResponse.json({ received: true });
}

async function handleOrderNotification(resource: string) {
  const orderId = resource.split('/').pop();
  if (!orderId) return;

  const auth = await getValidMLAccessToken();
  if (!auth) return;

  const order = await fetchMLOrderDetail(orderId, auth.accessToken);
  if (order.status !== 'paid' || !order.shipping?.id) return;

  const supabase = createServiceSupabase();
  const { data: existing } = await supabase
    .from('ml_shipments')
    .select('id')
    .eq('ml_order_id', order.id)
    .maybeSingle();
  if (existing) return; // ya está creado -- evita duplicar en reintentos del webhook

  const shipment = await fetchMLShipment(order.shipping.id, auth.accessToken);

  const itemIds = (order.order_items || []).map((oi) => oi.item.id).filter(Boolean);
  const skuMap = new Map<string, string>();
  if (itemIds.length > 0) {
    const { data: matchingProducts } = await supabase.from('products').select('ml_item_id, sku').in('ml_item_id', itemIds);
    for (const p of (matchingProducts || []) as { ml_item_id: string; sku: string }[]) skuMap.set(p.ml_item_id, p.sku);
  }
  const row = buildShipmentRow(order, shipment, skuMap);

  const { error } = await supabase.from('ml_shipments').insert(row);
  if (error) {
    console.error('[ml webhook] no se pudo guardar el envío pendiente:', error);
    return;
  }

  const items = row.items as { title: string; quantity: number }[];
  const firstTitle = items[0]?.title || 'Producto';
  const extra = items.length > 1 ? ` + ${items.length - 1} más` : '';
  await notifyDrivers({
    title: '📦 Nuevo envío pendiente',
    body: `${firstTitle}${extra}`,
    url: '/envios',
  });
}
