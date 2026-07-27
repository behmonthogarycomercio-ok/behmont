import type { Product } from './types';

// Códigos con forma "MLA123456789" son el ID interno de la publicación de
// MercadoLibre, no el SKU real del distribuidor -- nunca se muestran al
// público como si fueran el código de producto.
const ML_ID_PATTERN = /^MLA\d+$/i;

function isRealCode(value: string | null | undefined): value is string {
  return !!value && !ML_ID_PATTERN.test(value.trim());
}

/**
 * Código a mostrar al público. Para productos sincronizados desde ML sin
 * seller_custom_field, la columna `sku` cae al ID interno de ML (a veces
 * literalmente "MLA...", con o sin `ml_item_id` seteado) — en ese caso el
 * código real del distribuidor vive en `specs` bajo el label "SKU". Si
 * ninguno de los dos es un código real, no se muestra nada -- mejor sin
 * código que mostrar el ID de MercadoLibre como si fuera el SKU.
 */
export function getProductCode(product: Pick<Product, 'sku' | 'ml_item_id' | 'specs'>): string | null {
  const skuSpec = product.specs?.find((s) => s.label.trim().toLowerCase() === 'sku');
  if (isRealCode(skuSpec?.value)) return skuSpec!.value;
  if (isRealCode(product.sku) && product.sku !== product.ml_item_id) return product.sku;
  return null;
}
