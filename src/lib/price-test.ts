// Prueba de diseño temporal: 2 variantes de precio/medio de pago para 3
// productos puntuales, en "Precios que no vas a volver a ver" y su ficha de
// producto. No afecta al resto del catálogo. Sacar (o generalizar) una vez
// que el dueño elija el diseño definitivo.
export type PriceTestVariant = 'cash-highlight' | 'cash-badge';

export const PRICE_TEST_SKUS: Record<string, { cashDiscountPct: number; variant: PriceTestVariant }> = {
  '38670AR': { cashDiscountPct: 15, variant: 'cash-highlight' },
  '16516515': { cashDiscountPct: 15, variant: 'cash-badge' },
};

export const PRICE_TEST_EXTRA_SKUS = Object.keys(PRICE_TEST_SKUS);
