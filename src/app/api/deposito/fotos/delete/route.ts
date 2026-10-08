import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { fotoDeleteSchema, canGestionZonas } from '@/lib/deposito';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

// Sin login: solo PIN 1 (Gabriel). Saca la URL del array products.images --
// no borra el archivo del bucket (mismo comportamiento diferido que
// ImageUploader.tsx, que tampoco borra de storage al quitar una imagen).
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`deposito-fotos-delete:${ip}`, 30, 3600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en un rato.' }, { status: 429 });
  }

  const parsed = fotoDeleteSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { pin, productId, imageUrl } = parsed.data;

  if (!canGestionZonas(pin)) {
    return NextResponse.json({ error: 'No autorizado para editar fotos.' }, { status: 403 });
  }

  const supabase = createServiceSupabase();
  const { data: product } = await supabase.from('products').select('images').eq('id', productId).maybeSingle();
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  const currentImages: string[] = Array.isArray(product.images) ? product.images : [];
  const newImages = currentImages.filter((url) => url !== imageUrl);
  const { error } = await supabase.from('products').update({ images: newImages }).eq('id', productId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, images: newImages });
}
