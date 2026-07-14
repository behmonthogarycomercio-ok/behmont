'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabase } from './supabase/server';
import { getValidMLAccessToken, updateMLItemPriceStock } from './mercadolibre';

/**
 * Resultado de una accion. Se devuelve en vez de "throw" porque Next.js oculta
 * el mensaje de los errores tirados desde Server Actions en produccion — con
 * un valor de retorno normal el mensaje si llega al cliente.
 */
export type ActionResult = { error?: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Traduce errores comunes de Postgres a un mensaje entendible; si no reconoce el codigo, usa el mensaje original. */
function friendlyDbError(error: { code?: string; message: string }): string {
  if (error.code === '23505') {
    return 'Ya existe otro registro con ese mismo código/nombre. Cambialo por uno distinto.';
  }
  return error.message;
}

/**
 * Empuja precio/stock hacia MercadoLibre cuando el producto editado en el panel
 * viene de una publicación sincronizada (tiene ml_item_id). "Best effort": si falla,
 * lo deja registrado en ml_sync_log pero NO bloquea el guardado local del admin.
 */
async function pushToMLIfLinked(mlItemId: string | null, changes: { price?: number; stock?: number }) {
  if (!mlItemId) return;
  const supabase = createServerSupabase();
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

// ── PRODUCTOS ────────────────────────────────────────────
export async function upsertProduct(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const imagesRaw = formData.get('images') as string;
  const specsRaw = formData.get('specs') as string;

  let specs: { label: string; value: string }[] = [];
  try {
    specs = specsRaw ? JSON.parse(specsRaw) : [];
  } catch {
    specs = [];
  }

  const payload = {
    sku: formData.get('sku') as string,
    name,
    slug: slugify(name) + '-' + (formData.get('sku') as string).toLowerCase(),
    description: formData.get('description') as string,
    category_id: (formData.get('category_id') as string) || null,
    brand_id: (formData.get('brand_id') as string) || null,
    price: Number(formData.get('price')),
    compare_at_price: formData.get('compare_at_price')
      ? Number(formData.get('compare_at_price'))
      : null,
    stock: Number(formData.get('stock')),
    images: imagesRaw ? imagesRaw.split(',').map((s) => s.trim()).filter(Boolean) : [],
    specs,
    active: formData.get('active') === 'on',
    featured: formData.get('featured') === 'on',
  };

  let mlItemId: string | null = null;
  if (id) {
    const { data: existing } = await supabase
      .from('products')
      .select('ml_item_id')
      .eq('id', id)
      .maybeSingle();
    mlItemId = existing?.ml_item_id || null;
    const { error } = await supabase.from('products').update(payload).eq('id', id);
    if (error) return { error: friendlyDbError(error) };
  } else {
    const { error } = await supabase.from('products').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  if (mlItemId) {
    await pushToMLIfLinked(mlItemId, { price: payload.price, stock: payload.stock });
  }

  revalidatePath('/admin/productos');
  revalidatePath('/');
  return {};
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/productos');
  revalidatePath('/');
  return {};
}

export async function updateStockAndPrice(id: string, stock: number, price: number): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { data: existing } = await supabase
    .from('products')
    .select('ml_item_id')
    .eq('id', id)
    .maybeSingle();

  const { error } = await supabase.from('products').update({ stock, price }).eq('id', id);
  if (error) return { error: friendlyDbError(error) };

  if (existing?.ml_item_id) {
    await pushToMLIfLinked(existing.ml_item_id, { price, stock });
  }

  revalidatePath('/admin/stock');
  revalidatePath('/');
  return {};
}

// ── CATEGORÍAS ───────────────────────────────────────────
export async function upsertCategory(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  const payload = {
    name,
    slug: slugify(name),
    icon_url: (formData.get('icon_url') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
    active: formData.get('active') === 'on',
  };

  if (id) {
    const { error } = await supabase.from('categories').update(payload).eq('id', id);
    if (error) return { error: friendlyDbError(error) };
  } else {
    const { error } = await supabase.from('categories').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  revalidatePath('/admin/categorias');
  revalidatePath('/');
  return {};
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/categorias');
  revalidatePath('/');
  return {};
}

// ── PROMOCIONES ──────────────────────────────────────────
export async function upsertPromotion(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;

  const payload = {
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    cta_text: (formData.get('cta_text') as string) || 'Ver productos',
    cta_link: (formData.get('cta_link') as string) || null,
    placement: formData.get('placement') as string,
    sort_order: Number(formData.get('sort_order') || 0),
    active: formData.get('active') === 'on',
  };

  if (id) {
    const { error } = await supabase.from('promotions').update(payload).eq('id', id);
    if (error) return { error: friendlyDbError(error) };
  } else {
    const { error } = await supabase.from('promotions').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  revalidatePath('/admin/promociones');
  revalidatePath('/');
  return {};
}

export async function deletePromotion(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('promotions').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/promociones');
  revalidatePath('/');
  return {};
}

// ── MARCAS ───────────────────────────────────────────────
export async function upsertBrand(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;

  const payload = {
    name: formData.get('name') as string,
    logo_url: (formData.get('logo_url') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
  };

  if (id) {
    const { error } = await supabase.from('brands').update(payload).eq('id', id);
    if (error) return { error: friendlyDbError(error) };
  } else {
    const { error } = await supabase.from('brands').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  revalidatePath('/admin/marcas');
  revalidatePath('/');
  return {};
}

export async function deleteBrand(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/marcas');
  revalidatePath('/');
  return {};
}

// ── CONFIGURACIÓN DEL SITIO ──────────────────────────────
export async function updateSiteSetting(key: string, value: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('site_settings').upsert({ key, value });
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/marcas');
  revalidatePath('/');
  return {};
}

// ── PEDIDOS ──────────────────────────────────────────────
export async function updateOrderStatus(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  const { error } = await supabase.from('whatsapp_orders').update({ status }).eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/pedidos');
  revalidatePath('/admin/dashboard');
  return {};
}

// ── CONTENIDO / INSTAGRAM ────────────────────────────────
export async function upsertContentSource(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;

  const payload = {
    type: formData.get('type') as string,
    title: formData.get('title') as string,
    url: (formData.get('url') as string) || null,
    summary: (formData.get('summary') as string) || null,
  };

  if (id) {
    const { error } = await supabase.from('content_sources').update(payload).eq('id', id);
    if (error) return { error: friendlyDbError(error) };
  } else {
    const { error } = await supabase.from('content_sources').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  revalidatePath('/admin/contenido');
  return {};
}

export async function deleteContentSource(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('content_sources').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/contenido');
  return {};
}

export async function upsertContentPiece(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const scheduledAt = formData.get('scheduled_at') as string;

  const payload = {
    title: formData.get('title') as string,
    format: formData.get('format') as string,
    stage: (formData.get('stage') as string) || 'idea',
    objective: (formData.get('objective') as string) || null,
    hook: (formData.get('hook') as string) || null,
    diagnostico: (formData.get('diagnostico') as string) || null,
    reframe: (formData.get('reframe') as string) || null,
    cta: (formData.get('cta') as string) || null,
    script: (formData.get('script') as string) || null,
    source_id: (formData.get('source_id') as string) || null,
    owner: (formData.get('owner') as string) || null,
    scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
    notes: (formData.get('notes') as string) || null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from('content_pieces').update(payload).eq('id', id);
    if (error) return { error: friendlyDbError(error) };
  } else {
    const { error } = await supabase.from('content_pieces').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  revalidatePath('/admin/contenido');
  return {};
}

export async function deleteContentPiece(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('content_pieces').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/contenido');
  return {};
}

export async function updateContentPieceStage(id: string, stage: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase
    .from('content_pieces')
    .update({ stage, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/contenido');
  return {};
}

export async function disconnectInstagram(): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('instagram_connection').delete().eq('id', 'main');
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/contenido');
  return {};
}
