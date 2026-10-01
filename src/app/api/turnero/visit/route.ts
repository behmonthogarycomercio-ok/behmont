import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { notifyStaff } from '@/lib/push';
import { visitSchema, STAFF_LABELS } from '@/lib/turnero';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`turnero-visit:${ip}`, 100, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = visitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { attendedBy, regularOf } = parsed.data;

  const supabase = createServiceSupabase();
  const { error } = await supabase.from('turnero_visits').insert({
    attended_by: attendedBy,
    regular_of: regularOf,
  });
  if (error) {
    return NextResponse.json({ error: 'No se pudo registrar el turno' }, { status: 500 });
  }

  const attendedLabel = STAFF_LABELS[attendedBy];
  const body2 =
    regularOf === attendedBy
      ? 'Tu cliente ya está en el salón.'
      : regularOf
        ? `Cliente de ${STAFF_LABELS[regularOf]} — hoy te eligió a vos.`
        : 'Cliente nuevo en BEHMONT te espera.';

  await notifyStaff(attendedBy, {
    title: `🔔 ${attendedLabel}, te están esperando`,
    body: body2,
    url: '/',
  });

  return NextResponse.json({ ok: true });
}
