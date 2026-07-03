import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { createServerSupabase } from '@/lib/supabase/server';
import type { WhatsAppOrderItem } from '@/lib/types';

export async function GET() {
  const supabase = createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { data: orders, error } = await supabase
    .from('whatsapp_orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'No se pudo leer los pedidos' }, { status: 500 });
  }

  const rows = (orders || []).map((o) => {
    const items = (o.items || []) as WhatsAppOrderItem[];
    const productos = items.map((i) => `${i.name} x${i.qty}`).join(' | ');
    return {
      Fecha: new Date(o.created_at).toLocaleString('es-AR'),
      Cliente: o.customer_name,
      Teléfono: o.customer_phone,
      Email: o.customer_email || '',
      Dirección: o.customer_address || '',
      Productos: productos,
      Total: Number(o.total || 0),
      Estado: o.status,
      Nota: o.customer_note || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 18 }, // Fecha
    { wch: 24 }, // Cliente
    { wch: 16 }, // Teléfono
    { wch: 24 }, // Email
    { wch: 30 }, // Dirección
    { wch: 40 }, // Productos
    { wch: 12 }, // Total
    { wch: 12 }, // Estado
    { wch: 30 }, // Nota
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="behmont-ventas-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx"`,
    },
  });
}
