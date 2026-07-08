import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServiceSupabase } from '@/lib/supabase/server';
import { exchangeMLCode } from '@/lib/mercadolibre';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const stateParam = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/marcas?ml_error=sin_codigo`);
  }

  // Verificar CSRF: el estado debe coincidir con la cookie
  const cookieStore = cookies();
  const savedState = cookieStore.get('ml_oauth_state')?.value;

  // Si no hay cookie (ej. ya expiró) lo dejamos pasar igualmente,
  // pero si hay cookie y no coincide bloqueamos.
  if (savedState && stateParam !== savedState) {
    return NextResponse.redirect(`${origin}/admin/marcas?ml_error=estado_invalido`);
  }

  try {
    const tokens = await exchangeMLCode(code);
    const supabase = createServiceSupabase();

    await supabase.from('site_settings').upsert([
      { key: 'ml_access_token', value: tokens.access_token },
      { key: 'ml_refresh_token', value: tokens.refresh_token },
      { key: 'ml_seller_id', value: String(tokens.user_id) },
    ]);

    const res = NextResponse.redirect(`${origin}/admin/marcas?ml_connected=1`);
    // Limpiamos la cookie de estado
    res.cookies.set('ml_oauth_state', '', { maxAge: 0, path: '/' });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error_desconocido';
    return NextResponse.redirect(
      `${origin}/admin/marcas?ml_error=${encodeURIComponent(message)}`
    );
  }
}
