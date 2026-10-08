import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { createServerSupabase } from '@/lib/supabase/server';
import { getProductCode } from '@/lib/product-display';

export async function GET() {
  const supabase = createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { data: products, error } = await supabase
    .from('products')
    .select('sku, name, specs, ml_item_id, price, stock, active, category:categories(name), brand:brands(name)')
    .order('name');

  if (error) {
    return NextResponse.json({ error: 'No se pudo leer los productos' }, { status: 500 });
  }

  const rows = (products || []).map((p) => {
    const category = Array.isArray(p.category) ? p.category[0] : p.category;
    const brand = Array.isArray(p.brand) ? p.brand[0] : p.brand;
    return {
      Código: getProductCode(p) ?? p.sku,
      Nombre: p.name,
      Marca: brand?.name || '',
      Categoría: category?.name || '',
      Precio: Number(p.price || 0),
      Stock: p.stock,
      Estado: p.active ? 'Activo' : 'Inactivo',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 16 }, // Código
    { wch: 45 }, // Nombre
    { wch: 18 }, // Marca
    { wch: 20 }, // Categoría
    { wch: 12 }, // Precio
    { wch: 10 }, // Stock
    { wch: 10 }, // Estado
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="behmont-productos-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx"`,
    },
  });
}
