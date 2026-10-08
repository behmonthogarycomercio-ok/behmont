import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { zonaWriteSchema, canGestionZonas } from '@/lib/deposito';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: solo PIN 1 (Gabriel) puede crear/editar zonas desde
// /deposito/gestion. El admin hace lo mismo vía Server Action (upsertZona
// en actions.ts) sobre la misma tabla.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-zonas:${ip}`, 60, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = zonaWriteSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, id, parentId, tipo, codigo, nombre, sortOrder, active } = parsed.data;

  if (!canGestionZonas(pin)) {
    return NextResponse.json({ error: 'No autorizado para gestionar zonas.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  const payload = { parent_id: parentId, tipo, codigo, nombre, sort_order: sortOrder, active };
  const { error } = id
    ? await supabase.from('zonas').update(payload).eq('id', id)
    : await supabase.from('zonas').insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
