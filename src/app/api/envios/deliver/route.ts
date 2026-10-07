import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { deliverSchema } from '@/lib/envios';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-deliver:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = deliverSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { id, deliveredBy } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from('ml_shipments')
    .update({ status: 'entregado', delivered_at: new Date().toISOString(), delivered_by: deliveredBy })
    .eq('id', id)
    .eq('status', 'pendiente'); // evita reprocesar uno ya marcado por el otro repartidor

  if (error) {
    return NextResponse.json({ error: 'No se pudo marcar como entregado' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
