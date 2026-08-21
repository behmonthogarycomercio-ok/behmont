export type LabelProduct = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  ml_item_id: string | null;
  specs: { label: string; value: string }[];
  category: { name: string; cash_discount_pct: number | null } | null;
  brand: { name: string } | null;
};

/** Título grande de la etiqueta: marca real del producto, spec "Marca" si no está la relación, o la categoría como último respaldo. */
export function getBrandName(p: LabelProduct): string | null {
  if (p.brand?.name) return p.brand.name;
  const spec = p.specs.find((s) => s.label.trim().toLowerCase() === 'marca');
  if (spec?.value) return spec.value;
  return p.category?.name || null;
}

// Se excluyen: "Marca" (ya es el título grande) y "Modelo" (es el mismo
// código que ya se muestra en la esquina inferior de la etiqueta).
const EXCLUDED_SPEC_LABELS = new Set(['marca', 'modelo']);

/** Hasta 4 características, mostradas como texto plano en viñetas (sin "Label:" delante). */
export function getSpecItems(p: LabelProduct): { label: string; value: string }[] {
  return p.specs
    .filter((s) => !EXCLUDED_SPEC_LABELS.has(s.label.trim().toLowerCase()))
    .map((s) => ({ label: '', value: s.value }))
    .slice(0, 4);
}

export function getDescriptionFallback(p: LabelProduct): string | null {
  if (p.specs.length > 0 || !p.description) return null;
  const clean = p.description.replace(/\s+/g, ' ').trim();
  return clean.length > 160 ? clean.slice(0, 160) + '…' : clean;
}
