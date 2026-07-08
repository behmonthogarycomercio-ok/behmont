import { NextResponse } from 'next/server';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase/server';
import { refreshMLToken } from '@/lib/mercadolibre';

const ML_API = 'https://api.mercadolibre.com';

/**
 * Endpoint de solo lectura para diagnosticar por qué el sync trae 0
 * productos aunque la cuenta tenga publicaciones activas en MercadoLibre.
 * No sincroniza ni modifica nada — solo repregunta a la API de ML con el
 * token guardado y devuelve la respuesta cruda para poder comparar contra
 * lo que se ve en el panel de MercadoLibre.
 *
 * Uso: entrar logueado como admin a /api/ml/debug
 * Borrar este archivo una vez resuelto el problema de sync (no es para
 * dejar en producción de forma permanente).
 */
export async function GET() {
  const sessionSupabase = createServerSupabase();
  const {
    data: { user },
  } = await sessionSupabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const supabase = createServiceSupabase();
  const { data: rows, error: settingsError } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['ml_seller_id', 'ml_refresh_token']);

  if (settingsError) {
    return NextResponse.json({ step: 'leer site_settings', error: settingsError }, { status: 500 });
  }

  const settings = Object.fromEntries((rows || []).map((r: { key: string; value: string }) => [r.key, r.value]));
  if (!settings.ml_seller_id || !settings.ml_refresh_token) {
    return NextResponse.json({ error: 'MercadoLibre no está conectado en site_settings.' }, { status: 400 });
  }

  let accessToken: string;
  try {
    const refreshed = await refreshMLToken(settings.ml_refresh_token);
    accessToken = refreshed.access_token;
    // Persistimos el token refrescado como hace el sync real, para no dejar
    // el refresh_token viejo invalidado sin el nuevo guardado.
    await supabase.from('site_settings').upsert([
      { key: 'ml_access_token', value: refreshed.access_token },
      { key: 'ml_refresh_token', value: refreshed.refresh_token },
    ]);
  } catch (err) {
    return NextResponse.json(
      { step: 'refresh_token', seller_id_guardado: settings.ml_seller_id, error: String(err) },
      { status: 500 }
    );
  }

  const result: Record<string, unknown> = { seller_id_guardado: settings.ml_seller_id };

  // 1) ¿Quién es esta cuenta según ML?
  const meRes = await fetch(`${ML_API}/users/${settings.ml_seller_id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  result.cuenta = {
    http_status: meRes.status,
    body: meRes.ok ? await meRes.json() : await meRes.text(),
  };

  // 2) Conteo de publicaciones por estado
  const estados = ['active', 'paused', 'under_review', 'closed', 'inactive'];
  const porEstado: Record<string, unknown> = {};
  for (const status of estados) {
    const res = await fetch(
      `${ML_API}/users/${settings.ml_seller_id}/items/search?status=${status}&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    porEstado[status] = {
      http_status: res.status,
      body: res.ok ? await res.json() : await res.text(),
    };
  }
  result.publicaciones_por_estado = porEstado;

  // 3) Búsqueda sin filtro de estado (para comparar contra el total del panel)
  const anyRes = await fetch(`${ML_API}/users/${settings.ml_seller_id}/items/search?limit=1`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  result.busqueda_sin_filtro = {
    http_status: anyRes.status,
    body: anyRes.ok ? await anyRes.json() : await anyRes.text(),
  };

  return NextResponse.json(result, { status: 200 });
}
