import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { exchangeMLCode } from '@/lib/mercadolibre';

// El admin hace clic en "Conectar MercadoLibre" (/admin/marcas), pasa por
// /api/ml/oauth/start, autoriza en mercadolibre.com y ML redirige acá con ?code=...
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const codeVerifier = request.headers
    .get('cookie')
    ?.split('; ')
    .find((c) => c.startsWith('ml_pkce_verifier='))
    ?.split('=')[1];

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/marcas?ml_error=sin_codigo`);
  }
  if (!codeVerifier) {
    return NextResponse.redirect(`${origin}/admin/marcas?ml_error=sesion_expirada_reintenta`);
  }

  try {
    const tokens = await exchangeMLCode(code, codeVerifier);
    const supabase = createServiceSupabase();

    await supabase.from('site_settings').upsert([
      { key: 'ml_access_token', value: tokens.access_token },
      { key: 'ml_refresh_token', value: tokens.refresh_token },
      { key: 'ml_seller_id', value: String(tokens.user_id) },
    ]);

    const response = NextResponse.redirect(`${origin}/admin/marcas?ml_connected=1`);
    response.cookies.delete('ml_pkce_verifier');
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error_desconocido';
    const response = NextResponse.redirect(
      `${origin}/admin/marcas?ml_error=${encodeURIComponent(message)}`
    );
    response.cookies.delete('ml_pkce_verifier');
    return response;
  }
}
