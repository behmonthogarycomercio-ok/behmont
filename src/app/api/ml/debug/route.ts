import { NextResponse } from 'next/server';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase/server';
import { refreshMLToken } from '@/lib/mercadolibre';

const ML_API = 'https://api.mercadolibre.com';

/**
 * Endpoint de solo lectura para diagnosticar por qué el sync no guarda
 * productos aunque la API de ML devuelva las publicaciones activas bien
 * (esto último ya se confirmó: 188 activas, coincide con el panel de ML).
 * Ahora el foco es el segundo paso: intenta el mismo upsert que hace el
 * sync real contra la tabla `products`, con UN item real, y devuelve el
 * error de Supabase tal cual si falla — para no seguir adivinando.
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

  // 1) Traer UN item activo real
  const searchRes = await fetch(
    `${ML_API}/users/${settings.ml_seller_id}/items/search?status=active&limit=1`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!searchRes.ok) {
    return NextResponse.json({ step: 'items/search', http_status: searchRes.status, body: await searchRes.text() }, { status: 500 });
  }
  const searchBody = await searchRes.json();
  const itemId = searchBody.results?.[0];
  if (!itemId) {
    return NextResponse.json({ step: 'items/search', error: 'No devolvió ningún item activo', body: searchBody }, { status: 500 });
  }

  // 2) Traer el detalle completo de ese item (mismo endpoint que usa el sync real)
  const detailRes = await fetch(`${ML_API}/items?ids=${itemId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const detailBody = await detailRes.json();
  const entry = detailBody[0];
  if (!detailRes.ok || entry?.code !== 200) {
    return NextResponse.json(
      { step: 'items multiget', http_status: detailRes.status, body: detailBody },
      { status: 500 }
    );
  }
  const item = entry.body;

  // 3) Armar el mismo payload que arma el sync real (versión simplificada)
  const images =
    item.pictures && item.pictures.length > 0
      ? item.pictures.map((p: { secure_url: string }) => p.secure_url)
      : item.thumbnail
        ? [item.thumbnail]
        : [];

  const { data: existing } = await supabase
    .from('products')
    .select('id, slug')
    .eq('ml_item_id', item.id)
    .maybeSingle();

  const payload: Record<string, unknown> = {
    ml_item_id: item.id,
    ml_permalink: item.permalink,
    ml_last_synced_at: new Date().toISOString(),
    name: item.title,
    // Si ya existe, reusamos su slug para no romper la URL pública de este
    // producto de prueba; si es nuevo, uno provisorio alcanza para el test.
    slug: existing?.slug || `producto-${item.id}`.toLowerCase(),
    price: item.price,
    stock: item.available_quantity,
    images,
    active: true,
  };
  if (!existing) {
    payload.sku = item.seller_custom_field?.trim() || item.id;
  }

  // 4) EL PASO CLAVE: intentar el upsert real y devolver el error tal cual.
  const { data: upsertData, error: upsertError } = await supabase
    .from('products')
    .upsert(payload, { onConflict: 'ml_item_id', ignoreDuplicates: false })
    .select();

  return NextResponse.json(
    {
      item_probado: item.id,
      ya_existia_en_productos: !!existing,
      payload_enviado: payload,
      upsert_resultado: upsertData,
      upsert_error: upsertError,
    },
    { status: 200 }
  );
}
