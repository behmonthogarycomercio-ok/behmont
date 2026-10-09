import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { authSchema, DEPOSITO_STAFF_LABELS } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: primer paso al entrar a /deposito o /deposito/gestion -- valida
// el código secreto antes de mostrar nada. Límite más estricto que el resto
// porque es el punto natural para intentar adivinar un código por fuerza
// bruta.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-auth:${ip}`, 15, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = authSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code } = parsed.data;

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, name: DEPOSITO_STAFF_LABELS[pin] });
}
