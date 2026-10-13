import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { preventaVendedorSubscribeSchema, preventaVendedorUnsubscribeSchema } from '@/lib/preventas';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { canVenderPreventa, type DepositoPin } from '@/lib/deposito';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: cada vendedor suscribe/desuscribe su propio dispositivo a los
// avisos de SUS preventas (rechazo de Gabriel, resolución del cobrador) --
// mismo mecanismo que /api/ventas/cobrador/subscribe pero con el roster y
// la auth de depósito (vendedorPin/vendedorCode reusan ese sistema).
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (await isRateLimited(`ventas-subscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = preventaVendedorSubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }
  const { pin, code, subscription } = parsed.data;
  if (!canVenderPreventa(pin as DepositoPin)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin as DepositoPin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = await supabase.from('vendedor_push_subscriptions').upsert(
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
  if (await isRateLimited(`ventas-unsubscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = preventaVendedorUnsubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code, endpoint } = parsed.data;

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin as DepositoPin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = await supabase.from('vendedor_push_subscriptions').delete().eq('endpoint', endpoint);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
