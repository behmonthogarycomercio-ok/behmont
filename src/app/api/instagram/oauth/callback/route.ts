import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import {
  exchangeShortLivedToken,
  exchangeLongLivedToken,
  fetchFacebookPages,
  fetchPageInstagramAccount,
  fetchIgProfile,
} from '@/lib/instagram';

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
  // se corta acá — este es el fix al gap de CSRF que tenía el flujo de ML (que
  // nunca ataba el state a una sesión/cookie propia).
  if (!code || !state || !cookieState || state !== cookieState) {
    return redirectClearingCookie('/admin/contenido?view=conexion&ig_error=estado_invalido');
  }

  try {
    const shortLived = await exchangeShortLivedToken(code);
    const longLived = await exchangeLongLivedToken(shortLived.access_token);

    const pages = await fetchFacebookPages(longLived.access_token);
    const page = pages[0];
    if (!page) {
      return redirectClearingCookie('/admin/contenido?view=conexion&ig_error=sin_pagina_vinculada');
    }

    const igAccount = await fetchPageInstagramAccount(page.id, page.access_token);
    if (!igAccount) {
      return redirectClearingCookie('/admin/contenido?view=conexion&ig_error=sin_cuenta_instagram_business');
    }

    const profile = await fetchIgProfile(igAccount.igUserId, page.access_token);

    const expiresAt = new Date(Date.now() + (longLived.expires_in ?? 60 * 24 * 60 * 60) * 1000);
    const supabase = createServiceSupabase();
    await supabase.from('instagram_connection').upsert({
      id: 'main',
      page_id: page.id,
      page_name: page.name,
      ig_user_id: igAccount.igUserId,
      ig_username: profile.username,
      user_access_token: longLived.access_token,
      user_token_expires_at: expiresAt.toISOString(),
      page_access_token: page.access_token,
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
