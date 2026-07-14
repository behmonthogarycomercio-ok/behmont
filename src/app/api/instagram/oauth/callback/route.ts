import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { exchangeShortLivedToken, exchangeLongLivedToken, fetchIgProfile } from '@/lib/instagram';

const STATE_COOKIE = 'ig_oauth_state';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieHeader = request.headers.get('cookie') || '';
  const cookieState = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${STATE_COOKIE}=`))
    ?.slice(STATE_COOKIE.length + 1);

  function redirectClearingCookie(path: string) {
    const response = NextResponse.redirect(`${origin}${path}`);
    response.cookies.set(STATE_COOKIE, '', { path: '/api/instagram/oauth', maxAge: 0 });
    return response;
  }

  // Si no hay code, o el state no matchea EXACTAMENTE la cookie que dejó /start,
  // se corta acá (protección anti-CSRF).
  if (!code || !state || !cookieState || state !== cookieState) {
    return redirectClearingCookie('/admin/contenido?view=conexion&ig_error=estado_invalido');
  }

  try {
    const { accessToken: shortLivedToken, igUserId } = await exchangeShortLivedToken(code);
    const longLived = await exchangeLongLivedToken(shortLivedToken);
    const profile = await fetchIgProfile(igUserId, longLived.access_token);

    const expiresAt = new Date(Date.now() + longLived.expires_in * 1000);
    const supabase = createServiceSupabase();
    await supabase.from('instagram_connection').upsert({
      id: 'main',
      ig_user_id: igUserId,
      ig_username: profile.username,
      access_token: longLived.access_token,
      token_expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    });

    return redirectClearingCookie('/admin/contenido?view=conexion&ig_connected=1');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'error_desconocido';
    return redirectClearingCookie(
      `/admin/contenido?view=conexion&ig_error=${encodeURIComponent(message)}`
    );
  }
}
