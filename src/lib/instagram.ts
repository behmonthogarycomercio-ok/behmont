// Cliente de la Instagram API de Meta (Instagram API with Facebook Login for
// Business — developers.facebook.com/docs/instagram-platform).
// Flujo: 1) el admin conecta la cuenta una vez vía OAuth (/admin/contenido > Conexión)
//           con state anti-CSRF atado a cookie httpOnly — ver /api/instagram/oauth/start
//        2) guardamos los tokens en instagram_connection (tabla separada, sin
//           policy de SELECT pública — ver nota de seguridad en migration_021)
//        3) el cron / botón "Sincronizar ahora" llama a fetchIgProfile/fetchIgInsights/fetchIgMedia

const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

type FbTokenResponse = { access_token: string; token_type?: string; expires_in?: number };

async function graphGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${GRAPH_API}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Instagram Graph API falló (${path}): ${await res.text()}`);
  return res.json();
}

/** Intercambia el `code` del callback de Facebook por un access_token de usuario de corta duración. */
export async function exchangeShortLivedToken(code: string): Promise<FbTokenResponse> {
  return graphGet<FbTokenResponse>('/oauth/access_token', {
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    redirect_uri: process.env.META_REDIRECT_URI!,
    code,
  });
}

/**
 * Intercambia un token de corta duración por uno de larga duración (~60 días).
 * También sirve para "renovar el reloj" de un token largo ya existente pasándolo
 * como `token` — es el mismo endpoint que documenta Meta para ambos casos.
 */
export async function exchangeLongLivedToken(token: string): Promise<FbTokenResponse> {
  return graphGet<FbTokenResponse>('/oauth/access_token', {
    grant_type: 'fb_exchange_token',
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    fb_exchange_token: token,
  });
}

export type FacebookPage = { id: string; name: string; access_token: string };

/** Lista las páginas de Facebook que administra el usuario autenticado. */
export async function fetchFacebookPages(userAccessToken: string): Promise<FacebookPage[]> {
  const data = await graphGet<{ data: FacebookPage[] }>('/me/accounts', {
    access_token: userAccessToken,
  });
  return data.data || [];
}

/** Resuelve la cuenta de Instagram profesional vinculada a una Page, si existe. */
export async function fetchPageInstagramAccount(
  pageId: string,
  pageAccessToken: string
): Promise<{ igUserId: string; pageName: string } | null> {
  const data = await graphGet<{ name: string; instagram_business_account?: { id: string } }>(
    `/${pageId}`,
    { fields: 'name,instagram_business_account', access_token: pageAccessToken }
  );
  if (!data.instagram_business_account?.id) return null;
  return { igUserId: data.instagram_business_account.id, pageName: data.name };
}

export type IgProfile = { username: string; followers_count?: number; media_count?: number };

/** Trae username y contadores básicos del perfil de Instagram Business/Creator. */
export async function fetchIgProfile(igUserId: string, pageAccessToken: string): Promise<IgProfile> {
  return graphGet<IgProfile>(`/${igUserId}`, {
    fields: 'username,followers_count,media_count',
    access_token: pageAccessToken,
  });
}

/**
 * Trae métricas de cuenta a nivel día (reach, profile_views, accounts_engaged,
 * total_interactions). Devuelve un mapa métrica → valor total del período.
 * Si el endpoint rechaza alguna métrica (cuentas nuevas o sin datos suficientes),
 * esa métrica queda ausente del mapa en vez de tirar error — no vale la pena
 * cortar todo el sync por una sola métrica sin datos.
 */
export async function fetchIgInsights(
  igUserId: string,
  pageAccessToken: string,
  metrics: string[]
): Promise<Record<string, number>> {
  try {
    const data = await graphGet<{
      data: { name: string; total_value?: { value: number } }[];
    }>(`/${igUserId}/insights`, {
      metric: metrics.join(','),
      period: 'day',
      metric_type: 'total_value',
      access_token: pageAccessToken,
    });
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
export async function fetchIgMedia(
  igUserId: string,
  pageAccessToken: string,
  limit = 25
): Promise<IgMedia[]> {
  const data = await graphGet<{ data: IgMedia[] }>(`/${igUserId}/media`, {
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
    limit: String(limit),
    access_token: pageAccessToken,
  });
  return data.data || [];
}

export type InstagramConnectionRow = {
  id: string;
  page_id: string;
  page_name: string | null;
  ig_user_id: string;
  ig_username: string | null;
  user_access_token: string;
  user_token_expires_at: string;
  page_access_token: string;
  connected_at: string;
  updated_at: string;
};

/**
 * Devuelve el ig_user_id y page_access_token vigentes, renovando el token de
 * usuario si está por vencer (a menos de 10 días) y refrescando el page token
 * asociado. Persiste los valores nuevos en instagram_connection.
 */
export async function getValidIgConnection(): Promise<{
  igUserId: string;
  pageAccessToken: string;
} | null> {
  const { createServiceSupabase } = await import('./supabase/server');
  const supabase = createServiceSupabase();

  const { data: connection } = await supabase
    .from('instagram_connection')
    .select('*')
    .eq('id', 'main')
    .maybeSingle();
  if (!connection) return null;

  const conn = connection as InstagramConnectionRow;
  const expiresAt = new Date(conn.user_token_expires_at).getTime();
  const tenDaysMs = 10 * 24 * 60 * 60 * 1000;

  if (expiresAt - Date.now() > tenDaysMs) {
    return { igUserId: conn.ig_user_id, pageAccessToken: conn.page_access_token };
  }

  // Token de usuario por vencer: se renueva y se vuelve a resolver el page token.
  const renewed = await exchangeLongLivedToken(conn.user_access_token);
  const pages = await fetchFacebookPages(renewed.access_token);
  const page = pages.find((p) => p.id === conn.page_id) || pages[0];
  if (!page) throw new Error('No se encontró la Página de Facebook al renovar el token.');

  const newExpiresAt = new Date(Date.now() + (renewed.expires_in ?? 60 * 24 * 60 * 60) * 1000);
  await supabase
    .from('instagram_connection')
    .update({
      user_access_token: renewed.access_token,
      user_token_expires_at: newExpiresAt.toISOString(),
      page_access_token: page.access_token,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 'main');

  return { igUserId: conn.ig_user_id, pageAccessToken: page.access_token };
}
