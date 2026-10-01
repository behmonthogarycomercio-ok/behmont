import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';
import { staffSchema } from '@/lib/turnero';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

const subscribeSchema = z.object({
  staff: staffSchema,
  subscription: z.object({
    endpoint: z.string().url(),
    keys: z.object({ p256dh: z.string(), auth: z.string() }),
  }),
});

const unsubscribeSchema = z.object({ endpoint: z.string().url() });

// Sin login: este endpoint lo llama la página privada /turnero/<nombre>/activar
// que Lucas/Luz/Lito abren una vez en su propio celular (no hay cuenta de
// admin para ellos). El límite por IP es para evitar abuso del endpoint.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (await isRateLimited(`turnero-subscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }
  const { staff, subscription } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase.from('staff_push_subscriptions').upsert(
    {
      staff,
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
  if (await isRateLimited(`turnero-unsubscribe:${ip}`, 20, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const parsed = unsubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Falta el endpoint' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from('staff_push_subscriptions')
    .delete()
    .eq('endpoint', parsed.data.endpoint);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
