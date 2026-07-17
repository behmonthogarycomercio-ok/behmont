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
  seller_custom_field?: string | null;
  pictures?: { secure_url: string }[];
  attributes?: { id: string; name?: string; value_name: string | null }[];
};

/**
 * Devuelve un access_token válido, refrescándolo si hace falta, y persiste
 * los tokens nuevos en site_settings. Centraliza esta lógica para que la
 * usen tanto el sync (ML → web) como el push (web → ML).
 */
export async function getValidMLAccessToken(): Promise<{
  accessToken: string;
  sellerId: string;
} | null> {
  // Import diferido para evitar dependencia circular con supabase/server.
  const { createServiceSupabase } = await import('./supabase/server');
  const supabase = createServiceSupabase();

  const { data: rows } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['ml_seller_id', 'ml_refresh_token']);

  const settings = Object.fromEntries(
    (rows || []).map((r: { key: string; value: string }) => [r.key, r.value])
  );
  if (!settings.ml_seller_id || !settings.ml_refresh_token) return null;

  const refreshed = await refreshMLToken(settings.ml_refresh_token);
  await supabase.from('site_settings').upsert([
    { key: 'ml_access_token', value: refreshed.access_token },
    { key: 'ml_refresh_token', value: refreshed.refresh_token },
  ]);

  return { accessToken: refreshed.access_token, sellerId: settings.ml_seller_id };
}

/** Empuja precio y/o stock hacia una publicación de MercadoLibre (web → ML). */
export async function updateMLItemPriceStock(
  itemId: string,
  accessToken: string,
  changes: { price?: number; availableQuantity?: number }
): Promise<void> {
  const body: Record<string, number> = {};
  if (changes.price !== undefined) body.price = changes.price;
  if (changes.availableQuantity !== undefined) body.available_quantity = changes.availableQuantity;
  if (Object.keys(body).length === 0) return;

  const res = await fetch(`${ML_API}/items/${itemId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ML item update failed (${itemId}): ${await res.text()}`);
}

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
      if (entry.code === 200) {
        items.push(entry.body);
      } else {
        // No lo tiramos ni cortamos el sync de los demás, pero antes esto
        // se descartaba en silencio total — sin este log era imposible
        // saber por qué una publicación puntual "no traía imagen" (en
        // realidad ni siquiera se estaba sincronizando).
        console.warn(`[ml] item ${entry.body?.id ?? '?'} excluido del sync, code=${entry.code}`);
      }
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

/**
 * Trae la descripción completa de una publicación (endpoint separado en la API de ML).
 * Devuelve '' si el item no tiene descripción cargada o si falla la consulta —
 * nunca tira error, para no cortar el sync de todos los demás productos.
 */
export async function fetchItemDescription(itemId: string, accessToken: string): Promise<string> {
  try {
    const res = await fetch(`${ML_API}/items/${itemId}/description`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return '';
    const data = await res.json();
    return (data.plain_text || data.text || '').trim();
  } catch {
    return '';
  }
}

export type MLOrder = {
  id: number;
  date_created: string;
  total_amount: number;
  status: string;
  buyer?: { nickname?: string };
  order_items?: { item: { title: string }; quantity: number; unit_price: number }[];
};

/** Pedidos pagados de los últimos `days` días (para el panel de métricas). */
export async function fetchMLOrders(
  sellerId: string,
  accessToken: string,
  days: number
): Promise<{ orders: MLOrder[]; total: number }> {
  const from = new Date(Date.now() - days * 86400000).toISOString();
  const to = new Date().toISOString();
  const params = new URLSearchParams({
    seller: sellerId,
    'order.status': 'paid',
    'order.date_created.from': from,
    'order.date_created.to': to,
    sort: 'date_desc',
    limit: '50',
  });
  const res = await fetch(`${ML_API}/orders/search?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`ML orders/search failed: ${await res.text()}`);
  const data = await res.json();
  return { orders: data.results || [], total: data.paging?.total ?? (data.results || []).length };
}

export type MLReputation = {
  levelId: string | null;
  powerSellerStatus: string | null;
  transactions: { completed: number; canceled: number; total: number };
  claimsRate: number;
  cancellationsRate: number;
};

/** Nivel de reputación y métricas de calidad del vendedor ("Mi reputación" en ML). */
export async function fetchMLReputation(sellerId: string, accessToken: string): Promise<MLReputation> {
  const res = await fetch(`${ML_API}/users/${sellerId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`ML users/${sellerId} failed: ${await res.text()}`);
  const data = await res.json();
  const rep = data.seller_reputation || {};
  return {
    levelId: rep.level_id ?? null,
    powerSellerStatus: rep.power_seller_status ?? null,
    transactions: {
      completed: rep.transactions?.completed ?? 0,
      canceled: rep.transactions?.canceled ?? 0,
      total: rep.transactions?.total ?? 0,
    },
    claimsRate: rep.metrics?.claims?.rate ?? 0,
    cancellationsRate: rep.metrics?.cancellations?.rate ?? 0,
  };
}

/** Cantidad de preguntas de compradores todavía sin responder. */
export async function fetchMLUnansweredQuestionsCount(
  sellerId: string,
  accessToken: string
): Promise<number> {
  const params = new URLSearchParams({ seller_id: sellerId, status: 'UNANSWERED', limit: '1' });
  const res = await fetch(`${ML_API}/questions/search?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`ML questions/search failed: ${await res.text()}`);
  const data = await res.json();
  return data.total ?? 0;
}

/** Visitas totales a las publicaciones del vendedor en los últimos `days` días. */
export async function fetchMLVisits(sellerId: string, accessToken: string, days: number): Promise<number> {
  const res = await fetch(
    `${ML_API}/users/${sellerId}/items_visits/time_window?last=${days}&unit=day`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) throw new Error(`ML items_visits failed: ${await res.text()}`);
  const data = await res.json();
  return data.total_visits ?? 0;
}

export type MLMetricsSummary = {
  connected: boolean;
  orders?: { orders: MLOrder[]; total: number };
  reputation?: MLReputation;
  unansweredQuestions?: number;
  visits?: number;
  error?: string;
};

/**
 * Junta ventas, reputación, preguntas sin responder y visitas en una sola llamada
 * para el panel de métricas. "Best effort" por sección: si una parte falla (por
 * ejemplo, un endpoint que cambió), las demás igual se muestran.
 */
export async function getMLMetricsSummary(days = 30): Promise<MLMetricsSummary> {
  const auth = await getValidMLAccessToken();
  if (!auth) return { connected: false };

  const { accessToken, sellerId } = auth;
  const [orders, reputation, unansweredQuestions, visits] = await Promise.allSettled([
    fetchMLOrders(sellerId, accessToken, days),
    fetchMLReputation(sellerId, accessToken),
    fetchMLUnansweredQuestionsCount(sellerId, accessToken),
    fetchMLVisits(sellerId, accessToken, days),
  ]);

  return {
    connected: true,
    orders: orders.status === 'fulfilled' ? orders.value : undefined,
    reputation: reputation.status === 'fulfilled' ? reputation.value : undefined,
    unansweredQuestions: unansweredQuestions.status === 'fulfilled' ? unansweredQuestions.value : undefined,
    visits: visits.status === 'fulfilled' ? visits.value : undefined,
  };
}
