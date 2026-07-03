// Cliente de la API oficial de MercadoLibre (developers.mercadolibre.com.ar)
// Flujo: 1) el admin autoriza la app una vez vía OAuth (/admin/marcas > MercadoLibre),
//           con PKCE (recomendado por ML) — ver /api/ml/oauth/start
//        2) guardamos access_token + refresh_token en site_settings
//        3) el cron / botón "Sincronizar ahora" llama a syncMercadoLibreProducts()

import { createHash, randomBytes } from 'crypto';

const ML_API = 'https://api.mercadolibre.com';

type MLTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user_id: number;
};

/** Genera el par verifier/challenge para el flujo PKCE (S256). */
export function generatePKCEPair() {
  const codeVerifier = randomBytes(32).toString('base64url');
  const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url');
  return { codeVerifier, codeChallenge };
}

export async function exchangeMLCode(code: string, codeVerifier: string): Promise<MLTokenResponse> {
  const res = await fetch(`${ML_API}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ML_CLIENT_ID!,
      client_secret: process.env.ML_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.ML_REDIRECT_URI!,
      code_verifier: codeVerifier,
    }),
  });
  if (!res.ok) throw new Error(`ML OAuth exchange failed: ${await res.text()}`);
  return res.json();
}

export async function refreshMLToken(refreshToken: string): Promise<MLTokenResponse> {
  const res = await fetch(`${ML_API}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ML_CLIENT_ID!,
      client_secret: process.env.ML_CLIENT_SECRET!,
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) throw new Error(`ML token refresh failed: ${await res.text()}`);
  return res.json();
}

export type MLItem = {
  id: string;
  title: string;
  price: number;
  available_quantity: number;
  permalink: string;
  thumbnail: string;
  pictures?: { secure_url: string }[];
  attributes?: { id: string; value_name: string | null }[];
};

/** Trae todos los item IDs publicados por el vendedor (paginado de a 50). */
async function fetchSellerItemIds(sellerId: string, accessToken: string): Promise<string[]> {
  const ids: string[] = [];
  let offset = 0;
  const limit = 50;

  while (true) {
    const res = await fetch(
      `${ML_API}/users/${sellerId}/items/search?status=active&offset=${offset}&limit=${limit}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!res.ok) throw new Error(`ML items/search failed: ${await res.text()}`);
    const data = await res.json();
    ids.push(...data.results);
    if (data.paging.offset + data.results.length >= data.paging.total) break;
    offset += limit;
  }
  return ids;
}

/** Trae el detalle completo de items en tandas de 20 (multiget). */
async function fetchItemsDetail(ids: string[], accessToken: string): Promise<MLItem[]> {
  const items: MLItem[] = [];
  for (let i = 0; i < ids.length; i += 20) {
    const batch = ids.slice(i, i + 20);
    const res = await fetch(`${ML_API}/items?ids=${batch.join(',')}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error(`ML items multiget failed: ${await res.text()}`);
    const data = await res.json();
    for (const entry of data) {
      if (entry.code === 200) items.push(entry.body);
    }
  }
  return items;
}

export async function fetchAllSellerItems(
  sellerId: string,
  accessToken: string
): Promise<MLItem[]> {
  const ids = await fetchSellerItemIds(sellerId, accessToken);
  return fetchItemsDetail(ids, accessToken);
}
