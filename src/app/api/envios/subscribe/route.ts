import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { subscribeSchema, unsubscribeSchema } from '@/lib/envios';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: lo llama la página privada /envios que los 2 repartidores
// abren en su propio celular (no hay cuenta de admin para ellos). No se
// guarda a nombre de quién es -- cualquiera de los 2 puede tomar cualquier
// entrega, así que ambos dispositivos reciben todos los avisos.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (await isRateLimited(`envios-subscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }
  const { subscription } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase.from('driver_push_subscriptions').upsert(
    {
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
    { onConflict: 'endpoint' }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const ip = getClientIp(req);
  if (await isRateLimited(`envios-unsubscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = unsubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Falta el endpoint' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from('driver_push_subscriptions')
    .delete()
    .eq('endpoint', parsed.data.endpoint);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
