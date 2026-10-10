import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { preventaCobradorSubscribeSchema, preventaCobradorUnsubscribeSchema } from '@/lib/preventas';
import { verifyCobradorCode } from '@/lib/cobrador-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: cada cobrador suscribe/desuscribe su propio dispositivo a los
// avisos de preventas asignadas. A diferencia de /api/deposito/subscribe,
// acá se guarda también el `pin` -- notifyCobrador filtra por esa columna
// para avisarle solo a la persona correspondiente, no a todos los cobradores.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (await isRateLimited(`ventas-cobrador-subscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = preventaCobradorSubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }
  const { pin, code, subscription } = parsed.data;

  const supabase = createServiceSupabase();
  if (!(await verifyCobradorCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = await supabase.from('cobrador_push_subscriptions').upsert(
    {
      pin,
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
  if (await isRateLimited(`ventas-cobrador-unsubscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = preventaCobradorUnsubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code, endpoint } = parsed.data;

  const supabase = createServiceSupabase();
  if (!(await verifyCobradorCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = await supabase.from('cobrador_push_subscriptions').delete().eq('endpoint', endpoint);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
