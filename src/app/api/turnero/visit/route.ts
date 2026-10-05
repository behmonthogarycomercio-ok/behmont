import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { notifyStaff } from '@/lib/push';
import { visitSchema, STAFF_LABELS, type Relation } from '@/lib/turnero';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

const RELATION_NOTIFICATION_BODY: Record<Relation, string> = {
  same: 'Tu cliente ya está en el salón.',
  other: 'Cliente de la casa (no tuyo) — hoy te eligió a vos.',
  social: 'Te consultó antes por redes — ya está en el salón.',
  new: 'Cliente nuevo en BEHMONT te espera.',
};

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
  const data = parsed.data;

  const supabase = createServiceSupabase();

  if (data.visitType === 'administracion') {
    const { error } = await supabase.from('turnero_visits').insert({ visit_type: 'administracion' });
    if (error) {
      return NextResponse.json({ error: 'No se pudo registrar el turno' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  const { attendedBy, relation } = data;
  const { error } = await supabase.from('turnero_visits').insert({
    visit_type: 'ventas',
    attended_by: attendedBy,
    relation,
  });
  if (error) {
    return NextResponse.json({ error: 'No se pudo registrar el turno' }, { status: 500 });
  }

  await notifyStaff(attendedBy, {
    title: `🏪 CLIENTE EN SALÓN — ${STAFF_LABELS[attendedBy]}`,
    body: RELATION_NOTIFICATION_BODY[relation],
    url: '/',
    image: '/images/logo-behmont-turnero.png',
  });

  return NextResponse.json({ ok: true });
}
