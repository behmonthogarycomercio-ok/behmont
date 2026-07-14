// Cliente de la Instagram API de Meta (Instagram API with Instagram Login /
// Business Login for Instagram — developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login).
// Login directo con Instagram (sin pasar por Facebook Pages): la cuenta
// profesional de Instagram se autentica directo contra instagram.com y todas
// las llamadas posteriores van a graph.instagram.com con un único token.
// Flujo: 1) el admin conecta la cuenta una vez vía OAuth (/admin/contenido > Conexión)
//           con state anti-CSRF atado a cookie httpOnly — ver /api/instagram/oauth/start
//        2) guardamos el token en instagram_connection (tabla separada, sin
//           policy de SELECT pública — ver nota de seguridad en migration_021/022)
//        3) el cron / botón "Sincronizar ahora" llama a fetchIgProfile/fetchIgInsights/fetchIgMedia

const IG_OAUTH_DOMAIN = 'https://api.instagram.com';
const IG_GRAPH_API = 'https://graph.instagram.com';

type IgShortLivedTokenEntry = { access_token: string; user_id: string; permissions?: string[] };
type IgLongLivedTokenResponse = { access_token: string; token_type: string; expires_in: number };

/** Intercambia el `code` del callback de Instagram por un access_token de corta duración + el ig_user_id. */
export async function exchangeShortLivedToken(
  code: string
): Promise<{ accessToken: string; igUserId: string }> {
  const res = await fetch(`${IG_OAUTH_DOMAIN}/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.IG_APP_ID!,
      client_secret: process.env.IG_APP_SECRET!,
      grant_type: 'authorization_code',
      redirect_uri: process.env.IG_REDIRECT_URI!,
      code,
    }),
  });
  if (!res.ok) throw new Error(`Instagram OAuth exchange falló: ${await res.text()}`);
  const data = await res.json();
  // La respuesta viene envuelta en "data": [{ access_token, user_id }]
  const entry: IgShortLivedTokenEntry = Array.isArray(data.data) ? data.data[0] : data;
  return { accessToken: entry.access_token, igUserId: String(entry.user_id) };
}

/** Intercambia un token de corta duración por uno de larga duración (~60 días). */
export async function exchangeLongLivedToken(shortLivedToken: string): Promise<IgLongLivedTokenResponse> {
  const url = new URL(`${IG_GRAPH_API}/access_token`);
  url.searchParams.set('grant_type', 'ig_exchange_token');
  url.searchParams.set('client_secret', process.env.IG_APP_SECRET!);
  url.searchParams.set('access_token', shortLivedToken);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Instagram long-lived token exchange falló: ${await res.text()}`);
  return res.json();
}

/** Renueva el reloj de un token de larga duración ya existente (antes de que venza). */
export async function refreshLongLivedToken(longLivedToken: string): Promise<IgLongLivedTokenResponse> {
  const url = new URL(`${IG_GRAPH_API}/refresh_access_token`);
  url.searchParams.set('grant_type', 'ig_refresh_token');
  url.searchParams.set('access_token', longLivedToken);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Instagram token refresh falló: ${await res.text()}`);
  return res.json();
}

export type IgProfile = { username: string; followers_count?: number; media_count?: number };

/** Trae username y contadores básicos del perfil de Instagram Business/Creator. */
export async function fetchIgProfile(igUserId: string, accessToken: string): Promise<IgProfile> {
  const url = new URL(`${IG_GRAPH_API}/${igUserId}`);
  url.searchParams.set('fields', 'username,followers_count,media_count');
  url.searchParams.set('access_token', accessToken);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Instagram profile fetch falló: ${await res.text()}`);
  return res.json();
}

/**
 * Trae métricas de cuenta a nivel día (reach, profile_views, accounts_engaged,
 * total_interactions). Si el endpoint rechaza alguna métrica (cuentas nuevas o
 * sin datos suficientes), esa métrica queda ausente del mapa en vez de tirar
 * error — no vale la pena cortar todo el sync por una sola métrica sin datos.
 */
export async function fetchIgInsights(
  igUserId: string,
  accessToken: string,
  metrics: string[]
): Promise<Record<string, number>> {
  try {
    const url = new URL(`${IG_GRAPH_API}/${igUserId}/insights`);
    url.searchParams.set('metric', metrics.join(','));
    url.searchParams.set('period', 'day');
    url.searchParams.set('metric_type', 'total_value');
    url.searchParams.set('access_token', accessToken);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    const result: Record<string, number> = {};
    for (const entry of data.data || []) {
      if (entry.total_value?.value !== undefined) result[entry.name] = entry.total_value.value;
    }
    return result;
  } catch (err) {
    console.warn('[instagram] fetchIgInsights falló, se continúa sin esas métricas:', err);
    return {};
  }
}

export type IgMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
};

/** Trae los últimos posts publicados en la cuenta. */
export async function fetchIgMedia(igUserId: string, accessToken: string, limit = 25): Promise<IgMedia[]> {
  const url = new URL(`${IG_GRAPH_API}/${igUserId}/media`);
  url.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count'
  );
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('access_token', accessToken);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Instagram media fetch falló: ${await res.text()}`);
  const data = await res.json();
  return data.data || [];
}

/**
 * Devuelve el ig_user_id y access_token vigentes, renovando el token si está
 * por vencer (a menos de 10 días). Persiste el token nuevo en instagram_connection.
 */
export async function getValidIgConnection(): Promise<{
  igUserId: string;
  accessToken: string;
} | null> {
  const { createServiceSupabase } = await import('./supabase/server');
  const supabase = createServiceSupabase();

  const { data: connection } = await supabase
    .from('instagram_connection')
    .select('*')
    .eq('id', 'main')
    .maybeSingle();
  if (!connection) return null;

  const expiresAt = new Date(connection.token_expires_at).getTime();
  const tenDaysMs = 10 * 24 * 60 * 60 * 1000;
  if (expiresAt - Date.now() > tenDaysMs) {
    return { igUserId: connection.ig_user_id, accessToken: connection.access_token };
  }

  const refreshed = await refreshLongLivedToken(connection.access_token);
  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000);
  await supabase
    .from('instagram_connection')
    .update({
      access_token: refreshed.access_token,
      token_expires_at: newExpiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', 'main');

  return { igUserId: connection.ig_user_id, accessToken: refreshed.access_token };
}
