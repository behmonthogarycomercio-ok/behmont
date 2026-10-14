import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { secretCodeSchema } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const SUPERVISOR_PIN = 1; // Alejandro -- único PIN con acceso a /ventas/supervisor

const schema = z.object({ code: secretCodeSchema });

// Sin login: lista de preventas esperando la segunda opinión de Alejandro --
// no está filtrada por cobrador/ciudad, él supervisa a todos.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-supervisor-list:${ip}`, 60, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, SUPERVISOR_PIN, parsed.data.code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('preventas')
    .select('*')
    .eq('status', 'pendiente_supervisor')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'No se pudo cargar la lista' }, { status: 500 });
  }

  return NextResponse.json({ preventas: data });
}
