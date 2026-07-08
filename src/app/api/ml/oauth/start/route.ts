import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function GET() {
  // Estado CSRF — sin PKCE para máxima compatibilidad con ambas versiones de la app ML
  const state = randomBytes(16).toString('hex');

  const authUrl = new URL('https://auth.mercadolibre.com.ar/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', process.env.ML_CLIENT_ID!);
  authUrl.searchParams.set('redirect_uri', process.env.ML_REDIRECT_URI!);
  authUrl.searchParams.set('state', state);

  const res = NextResponse.redirect(authUrl.toString());

  // SameSite=lax: se envía en navegaciones GET cross-site (el redirect de ML hacia acá)
  res.cookies.set('ml_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
  });

  return res;
}
