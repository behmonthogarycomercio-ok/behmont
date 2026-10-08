import { createServiceSupabase } from './supabase/server';
import { getValidMLAccessToken, updateMLItemPriceStock } from './mercadolibre';

/**
 * Empuja precio/stock hacia MercadoLibre cuando el producto editado viene de
 * una publicación sincronizada (tiene ml_item_id). "Best effort": si falla,
 * lo deja registrado en ml_sync_log pero NO bloquea el guardado que lo llamó.
 *
 * Sin 'use server' arriba a propósito -- a diferencia de actions.ts, este
 * archivo se importa tanto desde Server Actions (admin, con sesión) como
 * desde API routes sin login (terminal de depósito), por eso usa
 * createServiceSupabase() en vez de createServerSupabase(): no hay cookie/
 * sesión en el segundo caso, y ml_sync_log exige is_admin() por RLS.
 */
export async function pushToMLIfLinked(mlItemId: string | null, changes: { price?: number; stock?: number }) {
  if (!mlItemId) return;
  const supabase = createServiceSupabase();
  try {
    const auth = await getValidMLAccessToken();
    if (!auth) return;
    await updateMLItemPriceStock(mlItemId, auth.accessToken, {
      price: changes.price,
      availableQuantity: changes.stock,
    });
    await supabase.from('ml_sync_log').insert({
      status: 'ok',
      items_synced: 1,
      detail: `Push web → ML (${mlItemId})`,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Error desconocido';
    await supabase.from('ml_sync_log').insert({
      status: 'error',
      items_synced: 0,
      detail: `Push web → ML falló (${mlItemId}): ${detail}`,
    });
  }
}
