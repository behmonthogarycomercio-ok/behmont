import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { paymentStatusSchema } from '@/lib/envios';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: lo llama /envios cuando el repartidor cobra un envío contra
// entrega (pendiente_pago -> abonado), o /envios/vendedor y /admin/envios
// al cargar o corregir el estado de pago de una venta.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`envios-payment:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = paymentStatusSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { id, paymentStatus } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase.from('ml_shipments').update({ payment_status: paymentStatus }).eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'No se pudo actualizar el estado de pago' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
