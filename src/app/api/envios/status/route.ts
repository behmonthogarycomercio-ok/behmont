import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { shipmentStatusSchema, resolveProductIdBySku } from '@/lib/envios';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { pushToMLIfLinked } from '@/lib/ml-sync';

// Sin login: lo llama la página privada /envios cuando el repartidor avanza
// un envío por sus pasos (retiró del depósito -> en camino -> entregado).
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-status:${ip}`, 120, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = shipmentStatusSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { id, status, by } = parsed.data;

  const supabase = createServiceSupabase();

  const { data: current } = await supabase
    .from('ml_shipments')
    .select('status, payment_status, items')
    .eq('id', id)
    .maybeSingle();

  // Regla de negocio: no se puede entregar sin haber cobrado antes -- evita
  // que el repartidor cierre una entrega contra entrega sin cobrar. El botón
  // ya queda oculto en el front cuando falta cobrar, esto es la validación
  // real del lado del servidor.
  if (status === 'entregado' && current?.payment_status !== 'abonado') {
    return NextResponse.json({ error: 'Primero hay que marcar el pago como cobrado.' }, { status: 400 });
  }

  const payload: Record<string, unknown> = { status };
  if (status === 'retirado') {
    payload.retirado_at = new Date().toISOString();
    payload.retirado_by = by || null;
  } else if (status === 'en_camino') {
    payload.en_camino_at = new Date().toISOString();
  } else if (status === 'entregado') {
    payload.delivered_at = new Date().toISOString();
    payload.delivered_by = by || null;
  }

  const { error } = await supabase.from('ml_shipments').update(payload).eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'No se pudo actualizar el estado' }, { status: 500 });
  }

  // Al retirar del depósito, descuenta el stock real por SKU -- conecta el
  // paso del envío con el stock de verdad, que antes quedaban
  // desincronizados hasta que alguien lo retiraba a mano en /deposito. Solo
  // la primera vez que pasa a "retirado" (evita descontar de nuevo si el
  // request se repite). Best-effort: si un item no tiene SKU resoluble o no
  // hay stock suficiente, no bloquea el cambio de estado -- queda para
  // ajuste manual en /admin/depositos.
  if (status === 'retirado' && current?.status !== 'retirado') {
    const items = (current?.items || []) as { title: string; quantity: number; sku?: string | null }[];
    for (const item of items) {
      if (!item.sku) continue;
      try {
        const productId = await resolveProductIdBySku(supabase, item.sku);
        if (!productId) continue;
        const { data: rpcData, error: rpcError } = await supabase.rpc('registrar_retiro_automatico', {
          p_product_id: productId,
          p_quantity: item.quantity,
          p_staff_name: by ? `${by} (envío)` : 'Repartidor (envío)',
          p_note: `Auto desde envío ${id}`,
        });
        if (rpcError) {
          console.error(`[envios status] no se pudo descontar stock automático para sku ${item.sku}:`, rpcError.message);
          continue;
        }
        const newStock = rpcData?.[0]?.new_stock;
        const { data: product } = await supabase.from('products').select('ml_item_id').eq('id', productId).maybeSingle();
        if (product?.ml_item_id && newStock != null) {
          await pushToMLIfLinked(product.ml_item_id, { stock: newStock });
        }
      } catch (err) {
        console.error(`[envios status] no se pudo descontar stock automático para sku ${item.sku}:`, err);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
