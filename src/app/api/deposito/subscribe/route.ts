import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { depositoSubscribeSchema, depositoUnsubscribeSchema, canGestionZonas } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: solo PIN de Gabriel, con su código secreto, puede suscribir/
// desuscribir su propio dispositivo a los avisos de retiro/ingreso.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (await isRateLimited(`deposito-subscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = depositoSubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }
  const { pin, code, subscription } = parsed.data;

  if (!canGestionZonas(pin)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = await supabase.from('deposito_push_subscriptions').upsert(
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
  if (await isRateLimited(`deposito-unsubscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = depositoUnsubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code, endpoint } = parsed.data;

  if (!canGestionZonas(pin)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = await supabase.from('deposito_push_subscriptions').delete().eq('endpoint', endpoint);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
