import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const STATE_COOKIE = 'ig_oauth_state';

export async function GET() {
  const state = randomBytes(24).toString('base64url');

  const authUrl = new URL('https://www.facebook.com/v21.0/dialog/oauth');
  authUrl.searchParams.set('client_id', process.env.META_APP_ID!);
  authUrl.searchParams.set('redirect_uri', process.env.META_REDIRECT_URI!);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set(
    'scope',
    'instagram_basic,instagram_manage_insights,pages_show_list,pages_read_engagement'
  );

  const response = NextResponse.redirect(authUrl.toString());
  // httpOnly + sameSite:'lax' (no 'strict' — el callback vuelve como navegación
  // top-level GET desde facebook.com, y 'strict' no mandaría la cookie de vuelta).
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/instagram/oauth',
    maxAge: 600,
  });
  return response;
}
