import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  // Ruta pública sin login (el cliente todavía no tiene cuenta al subir
  // documentos de financiación en el checkout) -- el storage de Supabase
  // está en plan gratuito con 1GB total, así que sin límite un script podría
  // llenarlo en minutos subiendo archivos de 10MB en loop.
  const ip = getClientIp(request);
  if (await isRateLimited(`upload-financing-doc:${ip}`, 10, 600)) {
    return NextResponse.json({ error: 'Demasiados intentos. Probá de nuevo en unos minutos.' }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const label = formData.get('label') as string | null;

  if (!file || !label) {
    return NextResponse.json({ error: 'Falta el archivo o la etiqueta' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Formato no permitido. Usá JPG, PNG, WEBP o PDF.' }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'El archivo pesa demasiado (máximo 10MB).' }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const ext = file.name.split('.').pop() || 'bin';
  const safeLabel = label.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const path = `pendientes/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeLabel}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage
    .from('financing-documents')
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: 'No se pudo subir el archivo' }, { status: 500 });
  }

  return NextResponse.json({ path, label });
}
