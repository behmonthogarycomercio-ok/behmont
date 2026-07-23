-- Migracion 086: corrige un merge incorrecto detectado en el audit de SKU
-- real (verificacion exhaustiva pedida por el usuario: "que esten todas por
-- sku?"). Ya aplicado directamente via service role key.
--
-- En la migracion 078, MLA3081809124 ("Patillera Trimmer Inalambrica +
-- Accesorios 6500rpm Kemei Gris") se trato como una segunda publicacion
-- duplicada de LFJ-KM-1784, porque su campo "Modelo" (specs) decia
-- "KM-1784" -- igual que MLA1714142711 -- y ambas tenian stock exacto (60).
-- Al revisar la pagina de Publicaciones de ML se descubrio que su SKU real
-- (asignado por el vendedor, visible solo ahi) es "LFJ-KM-657", un SKU de
-- distribuidor totalmente distinto que estaba vacio (sin fotos).
--
-- LFJ-KM-1784 no se toca: ya tenia los datos correctos de MLA1714142711
-- (confirmado, su propio SKU real es LFJ-KM-1784).
--
-- La fila de MLA3081809124 nunca perdio sus datos originales (el merge de
-- 078 solo puso active=false y ml_item_id=null), asi que se movieron intactos
-- a LFJ-KM-657. Stock ya coincidia (60=60), no hizo falta sync de stock.

update products set
  images = (select images from products where sku = 'MLA3081809124'),
  specs = (select specs from products where sku = 'MLA3081809124'),
  description = (select description from products where sku = 'MLA3081809124')
where sku = 'LFJ-KM-657';
