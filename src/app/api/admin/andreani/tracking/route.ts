import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buscarTrackingNumber } from '@/lib/andreani';

const bodySchema = z.object({ orderId: z.string().uuid() });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'orderId inválido' }, { status: 400 });
  }
  const { orderId } = parsed.data;

  try {
    const trackingNumber = await buscarTrackingNumber(orderId);
    if (!trackingNumber) {
      return NextResponse.json({ ok: true, trackingNumber: '', pending: true });
    }

    const supabase = createServiceSupabase();
    await supabase
      .from('whatsapp_orders')
      .update({ andreani_tracking_number: trackingNumber })
      .eq('id', orderId);

    return NextResponse.json({ ok: true, trackingNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al buscar el número de seguimiento';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
