import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Ingresá tu nombre'),
  customerPhone: z.string().min(6, 'Ingresá un teléfono válido'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  customerAddress: z.string().optional(),
  customerNote: z.string().optional(),
  financingPlan: z.string().optional(),
  wantsInstallments3: z.boolean().optional(),
  items: z
    .array(
      z.object({
        sku: z.string(),
        name: z.string(),
        qty: z.number().int().positive(),
        price: z.number().nonnegative(),
      })
    )
    .min(1, 'Agregá al menos un producto'),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { customerName, customerPhone, customerEmail, customerAddress, customerNote, financingPlan, wantsInstallments3, items } = parsed.data;
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const message = buildOrderMessage({ customerName, customerPhone, customerAddress, customerNote, financingPlan, wantsInstallments3, items });

  const supabase = createServiceSupabase();
  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('key', 'whatsapp_number')
    .maybeSingle();

  const whatsappNumber = settings?.value || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  const noteParts = [];
  if (financingPlan) noteParts.push(`[FINANCIACION] ${financingPlan}`);
  if (wantsInstallments3) noteParts.push('[3CUOTAS] Quiere pagar en 3 cuotas sin interés');
  if (customerNote) noteParts.push(customerNote);

  const { error } = await supabase.from('whatsapp_orders').insert({
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_email: customerEmail || null,
    customer_address: customerAddress || null,
    customer_note: noteParts.join('\n') || null,
    items,
    total,
    message_text: message,
  });

  if (error) {
    return NextResponse.json({ error: 'No se pudo registrar el pedido' }, { status: 500 });
  }

  return NextResponse.json({
    whatsappUrl: buildWhatsAppLink(whatsappNumber, message),
  });
}
