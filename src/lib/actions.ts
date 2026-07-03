'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabase } from './supabase/server';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── PRODUCTOS ────────────────────────────────────────────
export async function upsertProduct(formData: FormData) {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const imagesRaw = formData.get('images') as string;

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
    active: formData.get('active') === 'on',
    featured: formData.get('featured') === 'on',
  };

  if (id) {
    await supabase.from('products').update(payload).eq('id', id);
  } else {
    await supabase.from('products').insert(payload);
  }

  revalidatePath('/admin/productos');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  const supabase = createServerSupabase();
  await supabase.from('products').delete().eq('id', id);
  revalidatePath('/admin/productos');
  revalidatePath('/');
}

export async function updateStockAndPrice(id: string, stock: number, price: number) {
  const supabase = createServerSupabase();
  await supabase.from('products').update({ stock, price }).eq('id', id);
  revalidatePath('/admin/stock');
  revalidatePath('/');
}

// ── CATEGORÍAS ───────────────────────────────────────────
export async function upsertCategory(formData: FormData) {
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
    await supabase.from('categories').update(payload).eq('id', id);
  } else {
    await supabase.from('categories').insert(payload);
  }

  revalidatePath('/admin/categorias');
  revalidatePath('/');
}

export async function deleteCategory(id: string) {
  const supabase = createServerSupabase();
  await supabase.from('categories').delete().eq('id', id);
  revalidatePath('/admin/categorias');
  revalidatePath('/');
}

// ── PROMOCIONES ──────────────────────────────────────────
export async function upsertPromotion(formData: FormData) {
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
    await supabase.from('promotions').update(payload).eq('id', id);
  } else {
    await supabase.from('promotions').insert(payload);
  }

  revalidatePath('/admin/promociones');
  revalidatePath('/');
}

export async function deletePromotion(id: string) {
  const supabase = createServerSupabase();
  await supabase.from('promotions').delete().eq('id', id);
  revalidatePath('/admin/promociones');
  revalidatePath('/');
}

// ── MARCAS ───────────────────────────────────────────────
export async function upsertBrand(formData: FormData) {
  const supabase = createServerSupabase();
  const id = formData.get('id') as string;

  const payload = {
    name: formData.get('name') as string,
    logo_url: (formData.get('logo_url') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
  };

  if (id) {
    await supabase.from('brands').update(payload).eq('id', id);
  } else {
    await supabase.from('brands').insert(payload);
  }

  revalidatePath('/admin/marcas');
  revalidatePath('/');
}

export async function deleteBrand(id: string) {
  const supabase = createServerSupabase();
  await supabase.from('brands').delete().eq('id', id);
  revalidatePath('/admin/marcas');
  revalidatePath('/');
}

// ── CONFIGURACIÓN DEL SITIO ──────────────────────────────
export async function updateSiteSetting(key: string, value: string) {
  const supabase = createServerSupabase();
  await supabase.from('site_settings').upsert({ key, value });
  revalidatePath('/admin/marcas');
  revalidatePath('/');
}
