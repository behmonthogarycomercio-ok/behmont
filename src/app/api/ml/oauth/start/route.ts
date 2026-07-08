import { NextResponse } from 'next/server';
import { generatePKCEPair } from '@/lib/mercadolibre';

export async function GET() {
  const { codeVerifier, codeChallenge } = generatePKCEPair();

  const authUrl = new URL('https://auth.mercadolibre.com.ar/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', process.env.ML_CLIENT_ID!);
  authUrl.searchParams.set('redirect_uri', process.env.ML_REDIRECT_URI!);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  // El verifier viaja en state — ML lo devuelve intacto en el callback
  authUrl.searchParams.set('state', Buffer.from(codeVerifier).toString('base64url'));

  return NextResponse.redirect(authUrl.toString());
}
