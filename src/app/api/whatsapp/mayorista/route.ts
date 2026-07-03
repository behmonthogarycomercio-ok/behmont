import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const wholesaleSchema = z.object({
  businessName: z.string().min(2, 'Ingresá el nombre de tu negocio'),
  contactName: z.string().min(2, 'Ingresá tu nombre'),
  phone: z.string().min(6, 'Ingresá un teléfono válido'),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  rubro: z.string().optional(),
  volume: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = wholesaleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { businessName, contactName, phone, email, address, rubro, volume, message } = parsed.data;

  const lines = [
    '🏢 *Consulta mayorista — BEHMONT*',
    '',
    `Negocio: ${businessName}`,
    `Contacto: ${contactName}`,
    `Teléfono: ${phone}`,
  ];
  if (email) lines.push(`Email: ${email}`);
  if (address) lines.push(`Dirección: ${address}`);
  if (rubro) lines.push(`Rubro: ${rubro}`);
  if (volume) lines.push(`Volumen estimado: ${volume}`);
  if (message) lines.push(`Mensaje: ${message}`);
  const whatsappMessage = lines.join('\n');

  const supabase = createServiceSupabase();
  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('key', 'whatsapp_number')
    .maybeSingle();

  const whatsappNumber = settings?.value || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  await supabase.from('whatsapp_orders').insert({
    customer_name: `${businessName} (${contactName})`,
    customer_phone: phone,
    customer_email: email || null,
    customer_address: address || null,
    customer_note: `[MAYORISTA] rubro: ${rubro || '-'} | volumen: ${volume || '-'} | ${message || ''}`,
    items: [],
    total: 0,
    message_text: whatsappMessage,
  });

  return NextResponse.json({ whatsappUrl: buildWhatsAppLink(whatsappNumber, whatsappMessage) });
}
