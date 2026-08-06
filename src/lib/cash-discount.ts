// Descuento por pago en efectivo al retirar en el local -- el % se
// configura por categoria desde /admin/categorias (columna
// cash_discount_pct), no esta hardcodeado aca. Categorias sin valor
// cargado no muestran descuento.
import type { Category } from './types';

export function getCashDiscountPct(category: Pick<Category, 'cash_discount_pct'> | null | undefined): number | null {
  return category?.cash_discount_pct ?? null;
}
