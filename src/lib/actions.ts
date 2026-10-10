'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabase } from './supabase/server';
import { parseTrackingNumbers } from './envios';
import { pushToMLIfLinked } from './ml-sync';
import { hashSecretCode } from './deposito-auth';
import { notifyCobrador } from './push';
import { COBRADOR_LABELS, type CobradorPin } from './preventas';

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

const SESSION_EXPIRED_ERROR =
  'No se guardó: la sesión puede haber vencido. Recargá la página e iniciá sesión de nuevo.';

/**
 * Hace un update() y lo trata como fallido si RLS lo bloqueó en silencio: sin
 * esto, un update() a 0 filas (sesión vencida / no admin) no tira error y el
 * cliente lo toma como guardado con éxito aunque nada haya cambiado en la DB.
 */
async function updateChecked(
  supabase: ReturnType<typeof createServerSupabase>,
  table: string,
  payload: Record<string, unknown>,
  matchColumn: string,
  matchValue: string | number
): Promise<ActionResult> {
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .eq(matchColumn, matchValue)
    .select(matchColumn);
  if (error) return { error: friendlyDbError(error) };
  if (!data || data.length === 0) return { error: SESSION_EXPIRED_ERROR };
  return {};
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
    const result = await updateChecked(supabase, 'products', payload, 'id', id);
    if (result.error) return result;
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

/** Edición rápida de specs desde /admin/etiquetas -- a diferencia de
 * upsertProduct, no toca nombre/precio/stock/slug, solo las características
 * que se imprimen en la etiqueta. */
export async function updateProductSpecs(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const specsRaw = formData.get('specs') as string;

  let specs: { label: string; value: string }[] = [];
  try {
    specs = specsRaw ? JSON.parse(specsRaw) : [];
  } catch {
    return { error: 'No se pudieron leer las características' };
  }

  const result = await updateChecked(supabase, 'products', { specs }, 'id', id);
  if (result.error) return result;
  revalidatePath('/admin/etiquetas');
  revalidatePath('/admin/productos');
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

  const result = await updateChecked(supabase, 'products', { stock, price }, 'id', id);
  if (result.error) return result;

  if (existing?.ml_item_id) {
    await pushToMLIfLinked(existing.ml_item_id, { price, stock });
  }

  revalidatePath('/admin/productos');
  revalidatePath('/');
  return {};
}

// ── CATEGORÍAS ───────────────────────────────────────────
export async function upsertCategory(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  const cashDiscountRaw = formData.get('cash_discount_pct') as string;
  const basePayload = {
    name,
    icon_url: (formData.get('icon_url') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
    active: formData.get('active') === 'on',
    cash_discount_pct: cashDiscountRaw ? Number(cashDiscountRaw) : null,
  };

  if (id) {
    // El slug NO se regenera al editar: cambia el nombre visible sin
    // romper links, subcategorías o fotos ya asociadas a ese slug.
    const result = await updateChecked(supabase, 'categories', basePayload, 'id', id);
    if (result.error) return result;
  } else {
    const { error } = await supabase.from('categories').insert({ ...basePayload, slug: slugify(name) });
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
    const result = await updateChecked(supabase, 'promotions', payload, 'id', id);
    if (result.error) return result;
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
    const result = await updateChecked(supabase, 'brands', payload, 'id', id);
    if (result.error) return result;
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
  const { data, error } = await supabase.from('site_settings').upsert({ key, value }).select('key');
  if (error) return { error: friendlyDbError(error) };
  if (!data || data.length === 0) return { error: SESSION_EXPIRED_ERROR };
  revalidatePath('/admin/marcas');
  revalidatePath('/');
  return {};
}

// ── PEDIDOS ──────────────────────────────────────────────
export async function updateOrderStatus(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  const result = await updateChecked(supabase, 'whatsapp_orders', { status }, 'id', id);
  if (result.error) return result;
  revalidatePath('/admin/pedidos');
  revalidatePath('/admin/dashboard');
  return {};
}

export async function deleteOrder(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('whatsapp_orders').delete().eq('id', id);
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
    const result = await updateChecked(supabase, 'content_sources', payload, 'id', id);
    if (result.error) return result;
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
    const result = await updateChecked(supabase, 'content_pieces', payload, 'id', id);
    if (result.error) return result;
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
  const result = await updateChecked(
    supabase,
    'content_pieces',
    { stage, updated_at: new Date().toISOString() },
    'id',
    id
  );
  if (result.error) return result;
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

// ── CUPONES ──────────────────────────────────────────────
export async function upsertCoupon(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;

  const payload = {
    code: (formData.get('code') as string).trim().toUpperCase(),
    description: formData.get('description') as string,
    discount_pct: formData.get('discount_pct') ? Number(formData.get('discount_pct')) : null,
    valid_until: (formData.get('valid_until') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
    active: formData.get('active') === 'on',
  };

  if (id) {
    const result = await updateChecked(supabase, 'coupons', payload, 'id', id);
    if (result.error) return result;
  } else {
    const { error } = await supabase.from('coupons').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }

  revalidatePath('/admin/cupones');
  revalidatePath('/');
  return {};
}

export async function deleteCoupon(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('coupons').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/cupones');
  revalidatePath('/');
  return {};
}

// ── ENVÍOS (MercadoLibre → repartidor) ──────────────────
/** El admin puede forzar cualquier paso (retirado/en_camino/entregado) como override manual. */
export async function updateShipmentStatus(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  const by = (formData.get('by') as string) || 'Admin';

  // Misma regla que /api/envios/status: no se puede entregar sin haber
  // cobrado antes.
  if (status === 'entregado') {
    const { data: current } = await supabase.from('ml_shipments').select('payment_status').eq('id', id).maybeSingle();
    if (current?.payment_status !== 'abonado') {
      return { error: 'Primero hay que marcar el pago como cobrado.' };
    }
  }

  const payload: Record<string, unknown> = { status };
  if (status === 'retirado') {
    payload.retirado_at = new Date().toISOString();
    payload.retirado_by = by;
  } else if (status === 'en_camino') {
    payload.en_camino_at = new Date().toISOString();
  } else if (status === 'entregado') {
    payload.delivered_at = new Date().toISOString();
    payload.delivered_by = by;
  }

  const result = await updateChecked(supabase, 'ml_shipments', payload, 'id', id);
  if (result.error) return result;
  revalidatePath('/admin/envios');
  return {};
}

export async function updateShipmentPayment(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const paymentStatus = formData.get('paymentStatus') as string;
  const result = await updateChecked(supabase, 'ml_shipments', { payment_status: paymentStatus }, 'id', id);
  if (result.error) return result;
  revalidatePath('/admin/envios');
  return {};
}

export async function updateShipmentDestino(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const payload = {
    destino_tipo: formData.get('destino_tipo') as string,
    destino_detalle: (formData.get('destino_detalle') as string) || null,
    notes: (formData.get('notes') as string) || null,
  };
  const result = await updateChecked(supabase, 'ml_shipments', payload, 'id', id);
  if (result.error) return result;
  revalidatePath('/admin/envios');
  return {};
}

/** Válvula de escape si el webhook/cron se perdió una venta, o es un caso fuera de ML. */
export async function createManualShipment(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const productTitle = (formData.get('productTitle') as string)?.trim();
  if (!productTitle) return { error: 'Falta el producto' };

  const sku = (formData.get('sku') as string)?.trim();
  const precioAseguradoRaw = (formData.get('precioAsegurado') as string)?.trim();

  const payload = {
    ml_order_id: -Date.now(), // negativo para no chocar nunca con un id real de ML
    status: 'pendiente',
    destino_tipo: formData.get('destino_tipo') as string,
    destino_detalle: (formData.get('destino_detalle') as string) || null,
    buyer_nickname: (formData.get('buyerNickname') as string) || null,
    items: [{ title: productTitle, quantity: 1, sku: sku || null }],
    payment_status: (formData.get('paymentStatus') as string) || 'abonado',
    transportista: (formData.get('transportista') as string)?.trim() || null,
    numeros_seguimiento: parseTrackingNumbers(formData.get('numerosSeguimiento') as string),
    precio_asegurado: precioAseguradoRaw ? Number(precioAseguradoRaw) : null,
  };
  const { error } = await supabase.from('ml_shipments').insert(payload);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/envios');
  return {};
}

export async function updateShipmentTracking(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const precioAseguradoRaw = (formData.get('precioAsegurado') as string)?.trim();

  const payload = {
    transportista: (formData.get('transportista') as string)?.trim() || null,
    numeros_seguimiento: parseTrackingNumbers(formData.get('numerosSeguimiento') as string),
    precio_asegurado: precioAseguradoRaw ? Number(precioAseguradoRaw) : null,
  };
  const result = await updateChecked(supabase, 'ml_shipments', payload, 'id', id);
  if (result.error) return result;
  revalidatePath('/admin/envios');
  return {};
}

// ── DEPÓSITO (zonas y ubicación de productos) ────────────
export async function upsertZona(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const parentIdRaw = formData.get('parent_id') as string;
  const payload = {
    parent_id: parentIdRaw || null,
    tipo: formData.get('tipo') as string,
    codigo: (formData.get('codigo') as string).trim(),
    nombre: (formData.get('nombre') as string).trim(),
    sort_order: Number(formData.get('sort_order') || 0),
    active: formData.get('active') === 'on',
  };

  if (id) {
    const result = await updateChecked(supabase, 'zonas', payload, 'id', id);
    if (result.error) return result;
  } else {
    const { error } = await supabase.from('zonas').insert(payload);
    if (error) return { error: friendlyDbError(error) };
  }
  revalidatePath('/admin/depositos');
  return {};
}

export async function deleteZona(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { count } = await supabase
    .from('product_locations')
    .select('id', { count: 'exact', head: true })
    .eq('zona_id', id);
  if (count && count > 0) {
    return { error: 'No se puede eliminar: hay stock asignado a esta zona. Movelo primero.' };
  }
  const { error } = await supabase.from('zonas').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/depositos');
  return {};
}

export async function upsertProductLocation(formData: FormData): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const quantity = Number(formData.get('quantity'));

  if (id) {
    const result = await updateChecked(supabase, 'product_locations', { quantity }, 'id', id);
    if (result.error) return result;
  } else {
    const { error } = await supabase.from('product_locations').insert({
      product_id: formData.get('product_id') as string,
      zona_id: formData.get('zona_id') as string,
      quantity,
    });
    if (error) return { error: friendlyDbError(error) };
  }
  revalidatePath('/admin/depositos');
  revalidatePath('/admin/productos');
  revalidatePath('/');
  return {};
}

export async function deleteProductLocation(id: string): Promise<ActionResult> {
  const supabase = createServerSupabase();
  const { error } = await supabase.from('product_locations').delete().eq('id', id);
  if (error) return { error: friendlyDbError(error) };
  revalidatePath('/admin/depositos');
  revalidatePath('/admin/productos');
  revalidatePath('/');
  return {};
}

/** Define o resetea el código secreto de una persona de la terminal de
 * depósito (admin only) -- la persona lo usa después para probar que es
 * ella, no solo un número público. */
export async function setDepositoStaffSecret(pin: number, code: string): Promise<ActionResult> {
  if (!code || code.trim().length < 4) {
    return { error: 'El código debe tener al menos 4 caracteres.' };
  }
  const supabase = createServerSupabase();
  const { hash, salt } = hashSecretCode(code.trim());
  const { error } = await supabase
    .from('deposito_staff_secrets')
    .upsert({ pin, secret_hash: hash, secret_salt: salt, updated_at: new Date().toISOString() });
  if (error) return { error: friendlyDbError(error) };
  return {};
}

/** Define o resetea el código secreto de un cobrador (admin only) -- mismo
 * mecanismo que setDepositoStaffSecret, tabla distinta. */
export async function setCobradorStaffSecret(pin: number, code: string): Promise<ActionResult> {
  if (!code || code.trim().length < 4) {
    return { error: 'El código debe tener al menos 4 caracteres.' };
  }
  const supabase = createServerSupabase();
  const { hash, salt } = hashSecretCode(code.trim());
  const { error } = await supabase
    .from('cobrador_staff_secrets')
    .upsert({ pin, secret_hash: hash, secret_salt: salt, updated_at: new Date().toISOString() });
  if (error) return { error: friendlyDbError(error) };
  return {};
}

/** Gabriel (gerente, admin real) confirma que recibió la documentación
 * física de una preventa (DNI, comprobante de domicilio, proveedor -- todo
 * en papel, nada se sube acá) o la rechaza con un motivo (ej. "está en el
 * Veraz"). La fecha de esta confirmación es la que arranca las 48hs del
 * cobrador -- por eso se graba gabriel_revisado_at acá, no en la carga de
 * la preventa. */
export async function reviewPreventaDocumentacion(
  id: string,
  decision: 'ok' | 'rechazar',
  motivo?: string
): Promise<ActionResult> {
  const supabase = createServerSupabase();

  if (decision === 'rechazar') {
    if (!motivo || !motivo.trim()) {
      return { error: 'El motivo de rechazo es obligatorio.' };
    }
    const result = await updateChecked(
      supabase,
      'preventas',
      { status: 'rechazada_gabriel', gabriel_motivo_rechazo: motivo.trim() },
      'id',
      id
    );
    if (result.error) return result;
    revalidatePath('/admin/envios');
    return {};
  }

  const { data: preventa } = await supabase
    .from('preventas')
    .select('cobrador_pin, cobrador_nombre, cliente_nombre')
    .eq('id', id)
    .maybeSingle();
  if (!preventa) return { error: 'No se encontró la preventa.' };

  const result = await updateChecked(
    supabase,
    'preventas',
    { status: 'pendiente_cobrador', gabriel_revisado_at: new Date().toISOString() },
    'id',
    id
  );
  if (result.error) return result;

  await notifyCobrador(preventa.cobrador_pin, {
    title: '📋 Nueva preventa para controlar',
    body: `${preventa.cliente_nombre} te espera -- tenés 48hs para controlar el local`,
    url: `/ventas/cobrador/${COBRADOR_LABELS[preventa.cobrador_pin as CobradorPin]?.toLowerCase()}`,
  });

  revalidatePath('/admin/envios');
  return {};
}
