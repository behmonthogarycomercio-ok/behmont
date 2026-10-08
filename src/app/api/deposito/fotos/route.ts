import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { pinSchema, canGestionZonas } from '@/lib/deposito';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: solo PIN 1 (Gabriel) puede subir fotos de producto desde
// /deposito/gestion. Usa service role porque no hay sesión del navegador acá
// (a diferencia de ImageUploader.tsx, que sí sube con la sesión del admin) --
// el bucket product-images exige is_admin() por RLS, así que un cliente
// anon/sin cookie no podría subir directo.
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-fotos:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const formData = await request.formData();
  const pinResult = pinSchema.safeParse(formData.get('pin'));
  const productId = formData.get('productId');
  const files = formData.getAll('files').filter((f): f is File => f instanceof File);

  if (!pinResult.success || typeof productId !== 'string' || files.length === 0) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  if (!canGestionZonas(pinResult.data)) {
    return NextResponse.json({ error: 'No autorizado para subir fotos.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  const { data: product } = await supabase.from('products').select('images').eq('id', productId).maybeSingle();
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  const uploaded: string[] = [];
  for (const file of files) {
    const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file);
    if (!uploadError) {
      const { data } = supabase.storage.from('product-images').getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
  }

  if (uploaded.length === 0) {
    return NextResponse.json({ error: 'No se pudo subir ninguna imagen' }, { status: 500 });
  }

  const currentImages: string[] = Array.isArray(product.images) ? product.images : [];
  const newImages = [...currentImages, ...uploaded];
  const { error: updateError } = await supabase.from('products').update({ images: newImages }).eq('id', productId);
  if (updateError) {
    return NextResponse.json({ error: 'Las imágenes se subieron pero no se pudieron guardar en el producto' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, images: newImages });
}
