import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { productLocationWriteSchema, canGestionZonas } from '@/lib/deposito';
import { verifyDepositoCode } from '@/lib/deposito-auth';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: solo PIN de Gabriel, con su código secreto, puede reubicar
// stock desde /deposito/gestion (celular). El admin hace lo mismo vía
// Server Action (upsertProductLocation en actions.ts) sobre la misma tabla.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-ubicaciones:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = productLocationWriteSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, code, id, productId, zonaId, quantity } = parsed.data;

  if (!canGestionZonas(pin)) {
    return NextResponse.json({ error: 'No autorizado para gestionar ubicaciones.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  if (!(await verifyDepositoCode(supabase, pin, code))) {
    return NextResponse.json({ error: 'Código incorrecto.' }, { status: 401 });
  }

  const { error } = id
    ? await supabase.from('product_locations').update({ quantity }).eq('id', id)
    : await supabase.from('product_locations').insert({ product_id: productId, zona_id: zonaId, quantity });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
