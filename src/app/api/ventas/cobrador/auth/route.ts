import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { cobradorAuthSchema, COBRADOR_LABELS } from '@/lib/preventas';
import { verifyCobradorCode } from '@/lib/cobrador-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: primer paso al entrar a /ventas/cobrador/[cobrador] -- valida
// el código secreto antes de mostrar nada. Mismo patrón que /api/deposito/auth.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-cobrador-auth:${ip}`, 15, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = cobradorAuthSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code } = parsed.data;

  const supabase = createServiceSupabase();
  if (!(await verifyCobradorCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, name: COBRADOR_LABELS[pin] });
}
