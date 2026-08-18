import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { subscription } = await req.json();
  const endpoint = subscription?.endpoint as string | undefined;
  const p256dh = subscription?.keys?.p256dh as string | undefined;
  const auth = subscription?.keys?.auth as string | undefined;
  if (!endpoint || !p256dh || !auth) {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .upsert({ endpoint, p256dh, auth }, { onConflict: 'endpoint' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { endpoint } = await req.json();
  if (!endpoint) return NextResponse.json({ error: 'Falta el endpoint' }, { status: 400 });

  const { error } = await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
