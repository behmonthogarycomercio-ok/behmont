import type { Product } from './types';

/**
 * Código a mostrar al público. Para productos sincronizados desde ML sin
 * seller_custom_field, la columna `sku` cae al ID interno de ML — en ese caso
 * el código real del vendedor vive en `specs` bajo el label "SKU".
 */
export function getProductCode(product: Pick<Product, 'sku' | 'ml_item_id' | 'specs'>): string | null {
  const skuSpec = product.specs?.find((s) => s.label.trim().toLowerCase() === 'sku');
  if (skuSpec?.value) return skuSpec.value;
  if (product.sku && product.sku !== product.ml_item_id) return product.sku;
  return null;
}
