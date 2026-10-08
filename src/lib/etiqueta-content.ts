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

// Atributos que trae el sync de MercadoLibre para uso interno (impuestos,
// motivo de GTIN vacío, código de barras, dimensiones del paquete para el
// envío) -- no le sirven al cliente en el cartel de precio. Si quedan
// primeros en el array de specs (orden en que los manda ML) y no se
// filtran, terminan ocupando las 4 viñetas del cartel con cosas como
// "El producto no tiene código registrado" en vez de specs reales.
const NOISE_SPEC_PATTERNS = [/gtin/i, /impuesto interno/i, /^iva$/i, /^sku$/i, /paquete del seller/i];

// Dato valido pero generico (todo el catálogo es "Nuevo") -- se muestra
// solo si sobra lugar entre las primeras 4, nunca antes que una spec
// especifica del producto.
const LOW_PRIORITY_SPEC_LABELS = new Set(['condición del ítem']);

/** Hasta 4 características, mostradas como texto plano en viñetas (sin "Label:" delante). */
export function getSpecItems(p: LabelProduct): { label: string; value: string }[] {
  const usable = p.specs.filter((s) => {
    const label = s.label.trim().toLowerCase();
    return !EXCLUDED_SPEC_LABELS.has(label) && !NOISE_SPEC_PATTERNS.some((re) => re.test(label));
  });
  const primary = usable.filter((s) => !LOW_PRIORITY_SPEC_LABELS.has(s.label.trim().toLowerCase()));
  const lowPriority = usable.filter((s) => LOW_PRIORITY_SPEC_LABELS.has(s.label.trim().toLowerCase()));
  return [...primary, ...lowPriority].map((s) => ({ label: '', value: s.value })).slice(0, 4);
}

export function getDescriptionFallback(p: LabelProduct): string | null {
  if (p.specs.length > 0 || !p.description) return null;
  const clean = p.description.replace(/\s+/g, ' ').trim();
  return clean.length > 160 ? clean.slice(0, 160) + '…' : clean;
}
