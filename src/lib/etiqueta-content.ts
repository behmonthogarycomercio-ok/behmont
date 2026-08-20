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

/** Hasta 2 características (sin repetir la marca, que ya se muestra arriba como título). */
export function getSpecItems(p: LabelProduct): { label: string; value: string }[] {
  return p.specs.filter((s) => s.label.trim().toLowerCase() !== 'marca').slice(0, 2);
}

export function getDescriptionFallback(p: LabelProduct): string | null {
  if (p.specs.length > 0 || !p.description) return null;
  const clean = p.description.replace(/\s+/g, ' ').trim();
  return clean.length > 160 ? clean.slice(0, 160) + '…' : clean;
}
