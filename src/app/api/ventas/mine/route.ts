import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { preventaMineSchema } from '@/lib/preventas';
import { canVenderPreventa, type DepositoPin } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: lista de preventas del vendedor, filtrada server-side por
// vendedor_pin -- nunca expone preventas (ni datos de clientes) de otro
// vendedor, aunque alguien adivine un ID ajeno.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`ventas-mine:${ip}`, 60, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = preventaMineSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { vendedorPin, vendedorCode } = parsed.data;
  const pin = vendedorPin as DepositoPin;

  if (!canVenderPreventa(pin)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, vendedorCode))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('preventas')
    .select('*')
    .eq('vendedor_pin', pin)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'No se pudo cargar la lista' }, { status: 500 });
  }

  return NextResponse.json({ preventas: data });
}
