import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { cobradorAuthSchema } from '@/lib/preventas';
import { verifyCobradorCode } from '@/lib/cobrador-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { maybeNotifyOverdueCobradores } from '@/lib/preventas-sync';

// Sin login: lista de preventas asignadas a ESE cobrador, filtrada server-
// side por cobrador_pin -- nunca expone las asignadas a otro cobrador,
// aunque sea de la misma ciudad.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-cobrador-list:${ip}`, 60, 600)) {
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

  await maybeNotifyOverdueCobradores(supabase);

  const { data, error } = await supabase
    .from('preventas')
    .select('*')
    .eq('cobrador_pin', pin)
    .in('status', ['pendiente_cobrador', 'aprobada', 'rechazada_cobrador'])
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'No se pudo cargar la lista' }, { status: 500 });
  }

  return NextResponse.json({ preventas: data });
}
