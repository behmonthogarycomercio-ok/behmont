import { NextResponse } from 'next/server';
import { createServiceSupabase, createServerSupabase } from '@/lib/supabase/server';
import { fetchAllSellerItems, fetchItemDescription, refreshMLToken } from '@/lib/mercadolibre';
import { guessCategorySlug } from '@/lib/categorize';

// El sync recorre todas las publicaciones activas de forma secuencial
// (una consulta de descripción por producto) — con catálogos grandes puede
// tardar más que el timeout por defecto de las funciones serverless. Sube
// el límite explícitamente (en plan Hobby de Vercel el techo real es 60s
// igual, pero no hace daño declararlo).
export const maxDuration = 60;

/**
 * Sincroniza precio, stock y datos básicos de todas las publicaciones activas
 * de MercadoLibre hacia la tabla `products` (match por ml_item_id).
 *
 * Se puede llamar:
 *  - manualmente desde /admin/marcas (botón "Sincronizar ahora")
 *  - automáticamente vía Vercel Cron (ver vercel.json), enviando el header
 *    Authorization: Bearer <CRON_SECRET>
 */
// Vercel Cron llama por GET y agrega automáticamente `Authorization: Bearer $CRON_SECRET`
// cuando existe esa variable de entorno. El botón "Sincronizar ahora" del admin llama por POST.
export async function GET(request: Request) {
  return runSync(request, true);
}

export async function POST(request: Request) {
  return runSync(request, false);
}

async function runSync(request: Request, fromCron: boolean) {
  const authHeader = request.headers.get('authorization');
  const isCron = fromCron && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (fromCron && !isCron) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  if (!fromCron) {
    const sessionSupabase = createServerSupabase();
    const { data: { user } } = await sessionSupabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = createServiceSupabase();

  try {
    const { data: settingsRows } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['ml_seller_id', 'ml_access_token', 'ml_refresh_token']);

    const settings = Object.fromEntries(
      (settingsRows || []).map((r: { key: string; value: string }) => [r.key, r.value])
    );

    if (!settings.ml_seller_id || !settings.ml_refresh_token) {
      return NextResponse.json(
        { error: 'MercadoLibre no está conectado. Autorizá la app desde /admin/marcas.' },
        { status: 400 }
      );
    }

    // El access_token de ML expira cada 6hs — lo renovamos siempre antes de sincronizar.
    const refreshed = await refreshMLToken(settings.ml_refresh_token);
    await supabase
      .from('site_settings')
      .upsert([
        { key: 'ml_access_token', value: refreshed.access_token },
        { key: 'ml_refresh_token', value: refreshed.refresh_token },
      ]);

    const items = await fetchAllSellerItems(settings.ml_seller_id, refreshed.access_token);

    // Categorías del sitio, para poder mapear slug -> id al categorizar automáticamente
    const { data: categoryRows } = await supabase.from('categories').select('id, slug');
    const categoryIdBySlug = Object.fromEntries(
      (categoryRows || []).map((c: { id: string; slug: string }) => [c.slug, c.id])
    );

    // Productos ya sincronizados antes — para no pisar el código SKU que el
    // dueño haya cargado a mano en el admin. El SKU de ML solo se usa una vez,
    // al crear el producto por primera vez.
    const { data: existingRows } = await supabase
      .from('products')
      .select('ml_item_id')
      .not('ml_item_id', 'is', null);
    const existingMlItemIds = new Set((existingRows || []).map((r: { ml_item_id: string }) => r.ml_item_id));

    let synced = 0;
    for (const item of items) {
      const images =
        item.pictures && item.pictures.length > 0
          ? item.pictures.map((p) => p.secure_url)
          : item.thumbnail
            ? [item.thumbnail]
            : [];

      // Descripción y características: se traen de ML pero NUNCA pisan lo que ya
      // esté cargado con contenido vacío — si ML no tiene nada, se omite el campo
      // del upsert y el valor existente (manual o de un sync anterior) queda igual.
      const description = await fetchItemDescription(item.id, refreshed.access_token);
      const specs = (item.attributes || [])
        .filter((a) => a.value_name)
        .map((a) => ({ label: a.name || a.id, value: a.value_name as string }));

      const payload: Record<string, unknown> = {
        ml_item_id: item.id,
        ml_permalink: item.permalink,
        ml_last_synced_at: new Date().toISOString(),
        name: item.title,
        slug: slugify(item.title, item.id),
        price: item.price,
        stock: item.available_quantity,
        images,
        active: true,
      };
      // El código SKU solo se completa la primera vez que se sincroniza este
      // item (producto nuevo) — en syncs siguientes se deja intacto el valor
      // que ya esté en la base, sea el original de ML o uno editado a mano.
      if (!existingMlItemIds.has(item.id)) {
        payload.sku = item.seller_custom_field?.trim() || item.id;
      }
      if (description) payload.description = description;
      if (specs.length > 0) payload.specs = specs;

      const { error } = await supabase
        .from('products')
        .upsert(payload, { onConflict: 'ml_item_id', ignoreDuplicates: false });
      if (!error) {
        synced++;
      } else {
        // Antes esto se descartaba en silencio total — si TODOS los upserts
        // fallaban (ej. por una restricción de esquema), el sync terminaba
        // "sin errores" pero con 0 productos sincronizados y sin ninguna
        // pista de por qué.
        console.error(`[ml/sync] no se pudo guardar el item ${item.id}:`, error);
      }

      // Categorización automática por palabra clave — SOLO si el producto todavía
      // no tiene categoría asignada (no pisa una categoría puesta a mano en el admin).
      const guessedSlug = guessCategorySlug(item.title);
      const categoryId = guessedSlug ? categoryIdBySlug[guessedSlug] : null;
      if (categoryId) {
        await supabase
          .from('products')
          .update({ category_id: categoryId })
          .eq('ml_item_id', item.id)
          .is('category_id', null);
      }
    }

    const { error: logError } = await supabase.from('ml_sync_log').insert({
      status: 'ok',
      items_synced: synced,
      detail: isCron ? 'Sincronización automática (cron)' : 'Sincronización manual',
    });
    // El insert al log no debe tirar abajo un sync que ya funcionó, pero si
    // falla queremos verlo en los logs de Vercel en vez de perderlo en
    // silencio (antes no se chequeaba el resultado de este insert).
    if (logError) console.error('[ml/sync] no se pudo escribir ml_sync_log:', logError);

    return NextResponse.json({ synced, total: items.length });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[ml/sync] fallo la sincronización:', detail);
    const { error: logError } = await supabase
      .from('ml_sync_log')
      .insert({ status: 'error', items_synced: 0, detail });
    if (logError) console.error('[ml/sync] no se pudo escribir ml_sync_log (error path):', logError);
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}

function slugify(title: string, fallbackId: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return base ? `${base}-${fallbackId.toLowerCase()}` : fallbackId.toLowerCase();
}
