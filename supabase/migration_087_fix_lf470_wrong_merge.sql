-- Migracion 087: corrige otro merge incorrecto, encontrado por el usuario
-- al controlar manualmente la lista de pendientes (migracion 064).
--
-- MLA3637385756 ("Heladera Exhibidora Vertical 1 Puerta Full Glass Negra")
-- se habia fusionado con "4300FG" (Exhibidora vertical 417 L, 4 estantes,
-- parrillas cromadas) por la heuristica de precio ML >= distribuidor. Los
-- propios specs copiados de esa publicacion ya traian "SKU: LF-470" y
-- "Capacidad en volumen: 470 L" -- nunca se leyeron con cuidado.
--
-- El SKU real (confirmado en la pagina de Publicaciones de ML) es
-- LF-470 "Exhibidora vertical 470 L Full Glass - Marco aluminio - 6
-- estantes - Negro", que ya tenia sus propias fotos reales (no ML) pero
-- sin specs/descripcion. Se movieron specs + descripcion a LF-470 (sin
-- tocar sus fotos existentes) y se limpio 4300FG (vuelve a su estado
-- original sin foto, en vez de mostrar datos de un producto distinto).
-- Stock sincronizado con ML: 3 u.

-- Nota: el subquery de abajo asume que 4300FG todavia tiene los datos
-- incorrectos (specs/descripcion de MLA3637385756) sin limpiar. Si se
-- corre este archivo despues de la limpieza en vivo, hay que pegar el
-- specs/description a mano (quedan documentados en el historial del PR).
update products set
  specs = (select specs from products where sku = '4300FG'),
  description = (select description from products where sku = '4300FG'),
  stock = 3
where sku = 'LF-470';

update products set images = '[]'::jsonb, specs = '[]'::jsonb, description = null
where sku = '4300FG';
