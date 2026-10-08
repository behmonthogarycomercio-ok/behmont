import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { maybeSyncShipments } from '@/lib/envios-sync';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: lo llama /envios/vendedor para que Lucas/Luz/Lito vean el estado
// de los envíos (pendiente/retrasado/entregado) de sus ventas -- solo lectura,
// sin acciones de entrega (eso lo hace el repartidor desde /envios).
export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-list:${ip}`, 60, 60)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const supabase = createServiceSupabase();
  await maybeSyncShipments(supabase);

  const { data, error } = await supabase
    .from('ml_shipments')
    .select('id, status, payment_status, destino_tipo, destino_detalle, buyer_nickname, items, total, estimated_delivery_date, delivered_at, delivered_by, created_at, transportista, numeros_seguimiento')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: 'No se pudo cargar la lista' }, { status: 500 });
  }

  return NextResponse.json({ shipments: data });
}
