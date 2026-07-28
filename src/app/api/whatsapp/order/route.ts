import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceSupabase } from '@/lib/supabase/server';
import { buildOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Ingresá tu nombre'),
  customerPhone: z.string().min(6, 'Ingresá un teléfono válido'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  customerAddress: z.string().min(3, 'Ingresá tu dirección'),
  customerCity: z.string().min(2, 'Ingresá tu ciudad'),
  customerProvince: z.string().min(2, 'Ingresá tu provincia'),
  customerPostalCode: z.string().min(3, 'Ingresá tu código postal'),
  shippingMethod: z.enum(['sucursal', 'domicilio', 'retiro'], { errorMap: () => ({ message: 'Elegí una opción de envío' }) }),
  customerNote: z.string().optional(),
  financingPlan: z.string().optional(),
  wantsInstallments3: z.boolean().optional(),
  financingDocuments: z
    .array(z.object({ label: z.string(), path: z.string() }))
    .optional(),
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

  const {
    customerName, customerPhone, customerEmail, customerAddress, customerCity, customerProvince,
    customerPostalCode, shippingMethod, customerNote, financingPlan, wantsInstallments3,
    financingDocuments, items,
  } = parsed.data;
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const supabase = createServiceSupabase();

  // Los documentos se guardan en un bucket privado -- para que se puedan ver
  // desde el mensaje de WhatsApp se genera un link firmado con vencimiento,
  // sin exponer el archivo publicamente.
  let financingDocsWithUrl: { label: string; url: string }[] | undefined;
  if (financingDocuments && financingDocuments.length > 0) {
    const signed = await Promise.all(
      financingDocuments.map(async (doc) => {
        const { data } = await supabase.storage
          .from('financing-documents')
          .createSignedUrl(doc.path, 60 * 60 * 24 * 7); // 7 dias
        return { label: doc.label, url: data?.signedUrl || '' };
      })
    );
    financingDocsWithUrl = signed.filter((d) => d.url);
  }

  const message = buildOrderMessage({
    customerName, customerPhone, customerAddress, customerCity, customerProvince, customerPostalCode,
    shippingMethod, customerNote, financingPlan, wantsInstallments3,
    financingDocuments: financingDocsWithUrl, items,
  });

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
    customer_address: customerAddress,
    customer_city: customerCity,
    customer_province: customerProvince,
    customer_postal_code: customerPostalCode,
    shipping_method: shippingMethod,
    customer_note: noteParts.join('\n') || null,
    items,
    total,
    message_text: message,
    financing_documents: financingDocuments && financingDocuments.length > 0 ? financingDocuments : null,
  });

  if (error) {
    return NextResponse.json({ error: 'No se pudo registrar el pedido' }, { status: 500 });
  }

  return NextResponse.json({
    whatsappUrl: buildWhatsAppLink(whatsappNumber, message),
  });
}
