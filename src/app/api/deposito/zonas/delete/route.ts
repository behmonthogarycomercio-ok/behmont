import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { zonaDeleteSchema, canGestionZonas } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: solo PIN de Gabriel, con su código secreto. Bloquea el borrado
// si hay stock asignado a la zona, mismo criterio que deleteZona() en
// actions.ts.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-zonas-delete:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = zonaDeleteSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code, id } = parsed.data;

  if (!canGestionZonas(pin)) {
    return NextResponse.json({ error: 'No autorizado para gestionar zonas.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { count } = await supabase
    .from('product_locations')
    .select('id', { count: 'exact', head: true })
    .eq('zona_id', id);
  if (count && count > 0) {
    return NextResponse.json({ error: 'Hay stock asignado a esta zona. Movelo primero.' }, { status: 400 });
  }

  const { error } = await supabase.from('zonas').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
