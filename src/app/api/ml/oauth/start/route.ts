import { NextResponse } from 'next/server';
import { generatePKCEPair } from '@/lib/mercadolibre';

// El admin hace clic en "Conectar con MercadoLibre" (/admin/marcas) → llega acá →
// lo mandamos a auth.mercadolibre.com.ar con PKCE → ML redirige a /api/ml/oauth/callback
export async function GET() {
  const { codeVerifier, codeChallenge } = generatePKCEPair();

  const authUrl = new URL('https://auth.mercadolibre.com.ar/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', process.env.ML_CLIENT_ID!);
  authUrl.searchParams.set('redirect_uri', process.env.ML_REDIRECT_URI!);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  const response = NextResponse.redirect(authUrl.toString());
  // Cookie de corta duración: solo sobrevive el ida-y-vuelta del login en ML (~10 min alcanza).
  response.cookies.set('ml_pkce_verifier', codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 10,
    path: '/',
  });
  return response;
}
