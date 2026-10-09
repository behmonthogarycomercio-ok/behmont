import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { createServerSupabase } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/price';

const PAGE_W = 297; // A4 apaisado, mm
const PAGE_H = 210;
const MARGIN = 10;
const ROW_H = 6;
const HEADER_H = 8;

// Ancho de cada columna en mm -- suman menos que PAGE_W - 2*MARGIN para dejar aire.
const COLS = [
  { label: 'SKU', width: 28 },
  { label: 'Nombre', width: 120 },
  { label: 'Marca', width: 35 },
  { label: 'Categoría', width: 35 },
  { label: 'Precio', width: 25 },
  { label: 'Stock', width: 18 },
  { label: 'Estado', width: 18 },
] as const;

function truncate(doc: jsPDF, text: string, maxWidth: number): string {
  if (doc.getTextWidth(text) <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 1 && doc.getTextWidth(truncated + '…') > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + '…';
}

function drawHeader(doc: jsPDF, y: number) {
  doc.setFillColor(17, 28, 56);
  doc.rect(MARGIN, y, PAGE_W - 2 * MARGIN, HEADER_H, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  let x = MARGIN + 2;
  for (const col of COLS) {
    doc.text(col.label, x, y + HEADER_H - 2.5);
    x += col.width;
  }
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
}

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
    .select('sku, name, price, stock, active, category:categories(name), brand:brands(name)')
    .order('name');

  if (error) {
    return NextResponse.json({ error: 'No se pudo leer los productos' }, { status: 500 });
  }

  const rows = (products || []).map((p) => {
    const category = Array.isArray(p.category) ? p.category[0] : p.category;
    const brand = Array.isArray(p.brand) ? p.brand[0] : p.brand;
    return [
      p.sku,
      p.name,
      brand?.name || '—',
      category?.name || '—',
      `$${formatPrice(Number(p.price || 0))}`,
      String(p.stock),
      p.active ? 'Activo' : 'Inactivo',
    ];
  });

  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
  doc.setProperties({ title: 'Catálogo BEHMONT' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(17, 28, 56);
  doc.text('BEHMONT — Catálogo de productos', MARGIN, MARGIN + 2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `${rows.length} productos — generado el ${new Date().toLocaleDateString('es-AR')}`,
    MARGIN,
    MARGIN + 7
  );

  let y = MARGIN + 12;
  drawHeader(doc, y);
  y += HEADER_H;

  doc.setFontSize(8);
  rows.forEach((row, i) => {
    if (y + ROW_H > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
      drawHeader(doc, y);
      y += HEADER_H;
      doc.setFontSize(8);
    }
    if (i % 2 === 0) {
      doc.setFillColor(245, 246, 248);
      doc.rect(MARGIN, y, PAGE_W - 2 * MARGIN, ROW_H, 'F');
    }
    let x = MARGIN + 2;
    row.forEach((cell, colIndex) => {
      const width = COLS[colIndex].width - 3;
      doc.text(truncate(doc, cell, width), x, y + ROW_H - 2);
      x += COLS[colIndex].width;
    });
    y += ROW_H;
  });

  const buffer = Buffer.from(doc.output('arraybuffer'));

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="behmont-productos-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf"`,
    },
  });
}
