import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { shipmentStatusSchema } from '@/lib/envios';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

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

  const supabase = createServiceSupabase();
  const { error } = await supabase.from('ml_shipments').update(payload).eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'No se pudo actualizar el estado' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
