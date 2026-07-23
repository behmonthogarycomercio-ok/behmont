-- Migracion 076: resuelve todo el cluster restante de "Cortadora de
-- Fiambre" (4 filas de ML -> 2 productos del distribuidor). Cada
-- tamano (250mm y 300mm) tenia 2 publicaciones de ML con precio
-- identico entre si, una con el titulo enfocado en "Aluminio" (cuerpo)
-- y la otra en "Acero al Carbono" (hoja) -- la ficha real del
-- distribuidor tiene ambos materiales a la vez (cuerpo aluminio, hoja
-- acero al carbono), confirmando que es el mismo producto fisico
-- listado dos veces. Ya aplicado con la service role key.

-- 300ES-12 "Equipamientos - Cortadora de fiambres 300 mm - 02 a 16 mm - Cuerpo aluminio - Hoja acero al carbono" <- MLA3481764848 "Cortadora De Fiambre 300mm Aluminio Hoja Acero Behmont Plateado" + MLA1753138131 "Cortadora De Fiambre 300mm Acero Al Carbono 02-16mm Behmont Plateado"
-- Cortadora de fiambre 300mm - 2 publicaciones de ML con precio identico entre si ($1.150.000), una enfatiza "Aluminio" y otra "Acero al Carbono" pero la ficha del distribuidor dice ambos materiales (cuerpo aluminio, hoja acero al carbono)
update products set active = false, ml_item_id = null where sku = 'MLA3481764848';
update products set active = false, ml_item_id = null where sku = 'MLA1753138131';

-- 250ES-10 "Equipamientos - Cortadora de fiambres 250 mm - 02 a 15 mm - Cuerpo aluminio - Hoja acero al carbono" <- MLA3204809250 "Cortadora De Fiambre 250mm Acero Al Carbono 02-15mm Behmont Plateado" + MLA3481764864 "Cortadora De Fiambre 250mm Aluminio Hoja Acero Behmont Plateado"
-- Cortadora de fiambre 250mm - mismo patron, 2 publicaciones con precio identico ($890.000)
update products set
  specs = '[{"label":"Grosor ajustable","value":"Sí"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Material de la cuchilla de corte","value":"acero al carbono"},{"label":"Diámetro del disco","value":"25 cm"},{"label":"Frecuencia","value":"50Hz"},{"label":"Es industrial","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material","value":"Aluminio"},{"label":"Modelo","value":"250ES-10"},{"label":"Tipo de alimentación","value":"Eléctrica"},{"label":"Voltaje","value":"220V"},{"label":"Con afilador","value":"Sí"}]'::jsonb,
  description = 'La Cortadora de Fiambre de 250mm de Behmont es la aliada de fiambrerías, almacenes y rotiserías. Hoja de acero al carbono de 250mm que corta de 0 a 15mm de espesor. Cuerpo de aluminio resistente y afilador integrado para mantener el filo siempre a punto.

* Marca: Behmont
* Hoja: 250 mm acero al carbono
* Espesor de corte: 0 a 15 mm
* Cuerpo de aluminio resistente
* Afilador integrado
* Espesor de corte ajustable
* Para fiambrerías y almacenes
* Alta disponibilidad de stock'
where sku = '250ES-10';
update products set active = false, ml_item_id = null where sku = 'MLA3204809250';
update products set active = false, ml_item_id = null where sku = 'MLA3481764864';

