import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';

const schema = z.object({
  email: z.string().email('Ingresá un email válido'),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors.email?.[0] ?? 'Email inválido' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email: parsed.data.email.toLowerCase().trim() }, { onConflict: 'email', ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: 'No se pudo registrar el email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
