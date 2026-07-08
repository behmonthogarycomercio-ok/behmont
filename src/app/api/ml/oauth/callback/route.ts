import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { exchangeMLCode } from '@/lib/mercadolibre';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const stateB64 = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/marcas?ml_error=sin_codigo`);
  }

  // El verifier viaja en el parámetro state (base64url) que ML devuelve intacto
  const codeVerifier = stateB64
    ? Buffer.from(stateB64, 'base64url').toString('utf-8')
    : undefined;

  if (!codeVerifier) {
    return NextResponse.redirect(`${origin}/admin/marcas?ml_error=sesion_expirada`);
  }

  try {
    const tokens = await exchangeMLCode(code, codeVerifier);
    const supabase = createServiceSupabase();

    await supabase.from('site_settings').upsert([
      { key: 'ml_access_token', value: tokens.access_token },
      { key: 'ml_refresh_token', value: tokens.refresh_token },
      { key: 'ml_seller_id', value: String(tokens.user_id) },
    ]);

    return NextResponse.redirect(`${origin}/admin/marcas?ml_connected=1`);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error_desconocido';
    return NextResponse.redirect(
      `${origin}/admin/marcas?ml_error=${encodeURIComponent(message)}`
    );
  }
}
