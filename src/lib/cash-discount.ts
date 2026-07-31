// Descuento por pago en efectivo al retirar en el local -- varía según el
// rubro del producto: equipamiento de comercio (gastronomía, negocios,
// carnicería, panadería, frío, peluquería/barbería, estética, decoración
// -- incluye espejos y mobiliario de salón, que son equipamiento comercial
// -- almacenamiento, oficina, herramientas) tiene más descuento que los
// productos de uso hogareño/personal.
const COMERCIO_PCT = 15;
const HOGAR_PCT = 10;

const COMERCIO_SLUGS = new Set([
  'gastronomia',
  'almacen', // Negocios
  'carniceria',
  'panaderia',
  'frio',
  'peluqueria-barberia',
  'estetica',
  'decoracion',
  'almacenamiento',
  'oficina',
  'herramientas',
]);

const HOGAR_SLUGS = new Set([
  'hogar',
  'electronica',
  'muebles',
  'electrodomesticos',
  'climatizacion',
  'deportes-aire-libre',
  'motos',
  'bebes-ninos',
  'blanqueria',
]);

export function getCashDiscountPct(categorySlug: string | null | undefined): number | null {
  if (!categorySlug) return null;
  if (COMERCIO_SLUGS.has(categorySlug)) return COMERCIO_PCT;
  if (HOGAR_SLUGS.has(categorySlug)) return HOGAR_PCT;
  return null;
}
