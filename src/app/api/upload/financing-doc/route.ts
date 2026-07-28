import { NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase/server';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
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
