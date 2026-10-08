import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { maybeSyncShipments } from '@/lib/envios-sync';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: la llama la página privada /envios que abren los repartidores
// en su propio celular (no hay cuenta de admin para ellos). El límite por
// IP es para evitar abuso del endpoint.
export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-pending:${ip}`, 60, 60)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const supabase = createServiceSupabase();

  // Sync oportunista (con su propio throttle interno) para que esta pantalla
  // muestre lo que ML ya tiene como despachado/en camino sin esperar al cron
  // diario -- ver contexto en envios-sync.ts.
  await maybeSyncShipments(supabase);

  const { data, error } = await supabase
    .from('ml_shipments')
    .select('id, ml_order_id, status, payment_status, destino_tipo, destino_detalle, buyer_nickname, items, total, estimated_delivery_date, created_at, transportista, numero_seguimiento, precio_asegurado')
    .in('status', ['pendiente', 'retirado', 'en_camino'])
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'No se pudo cargar la lista' }, { status: 500 });
  }

  return NextResponse.json({ shipments: data });
}
