-- Migracion 104: descuento por pago en efectivo, configurable por categoria
-- desde /admin/categorias en vez de estar hardcodeado en el codigo
-- (src/lib/cash-discount.ts tenia dos listas fijas de slugs -- el riesgo
-- era que una categoria nueva quedara con el % que no corresponde porque
-- nadie actualizo esas listas). Se migran los valores que ya estaban en
-- uso: 15% para las categorias de equipamiento comercial, 10% para las de
-- uso hogareño/personal. Las categorias no listadas quedan en NULL (sin
-- descuento), igual que antes.

alter table categories add column if not exists cash_discount_pct int;

update categories set cash_discount_pct = 15
where slug in (
  'gastronomia', 'almacen', 'carniceria', 'panaderia', 'frio',
  'peluqueria-barberia', 'estetica', 'decoracion', 'almacenamiento',
  'oficina', 'herramientas'
);

update categories set cash_discount_pct = 10
where slug in (
  'hogar', 'electronica', 'muebles', 'electrodomesticos', 'climatizacion',
  'deportes-aire-libre', 'motos', 'bebes-ninos', 'blanqueria'
);
