-- Migracion 066: 7 duplicados mas de MercadoLibre, encontrados en un
-- nuevo escaneo completo. Se resolvio limpiamente una familia de "kits
-- de peines guia" comparando la cantidad de medidas listadas en el
-- nombre del distribuidor contra el numero declarado en el titulo de ML
-- (Kit 2/8/10 Peines), mas 2 "capa de corte" por color. Todos con stock
-- exacto entre ambas filas. Ya aplicado directamente con la service
-- role key.

-- 25-YXH123 "Peines guia para maquina de corte - 1.5, 3, 4.5, 6, 10, 13, 16, 19,  22 y 25 mm" <- MLA3471120538 "Kit 10 Peines Guía Máquina Corte 1.5-25mm Behmont Varios"
-- Kit 10 Peines Guia (10 medidas listadas = Kit 10) (stock 64=64)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Varios"},{"label":"Tipos de peines","value":"Peines guía"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Función principal","value":"Guía de altura de corte"},{"label":"Material","value":"Plástico ABS"},{"label":"Modelo","value":"Kit 10 Peines Guía"},{"label":"Usos recomendados","value":"Barbería y peluquería"},{"label":"Formato de venta","value":"Pack"},{"label":"Unidades por pack","value":"10"},{"label":"Unidades por envase","value":"10"}]'::jsonb,
  description = 'El Kit de 10 Peines Guía de Behmont cubre todas las alturas de corte: 1.5, 3, 4.5, 6, 10, 13, 16, 19, 22 y 25 mm. Compatibles con la mayoría de las máquinas clipper del mercado. Plástico resistente de alta dureza para un ajuste firme y preciso.

* Marca: Behmont
* Kit completo: 10 peines guía
* Alturas: 1.5 / 3 / 4.5 / 6 / 10 / 13 / 16 / 19 / 22 / 25 mm
* Compatibles con la mayoría de clippers
* Plástico de alta dureza
* Ajuste firme y preciso
* Para barbería y peluquería profesional
* Alta disponibilidad de stock'
where sku = '25-YXH123';
update products set active = false, ml_item_id = null where sku = 'MLA3471120538';

-- 25-YXH124 "Peines guia para maquina de corte - Magneticos - 1.5 y 3 mm" <- MLA3471120522 "Kit 2 Peines Guía Magnéticos 1.5 Y 3mm Clipper Behmont Negro"
-- Kit 2 Peines Guia Magneticos (1.5 y 3mm = 2 medidas = Kit 2) (stock 300=300)
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3471120522';

-- 25-YXH102 "Esterilizador UV" <- MLA1720864441 "Esterilizador Portátil Uv 8w Apto Para Plástico Y Metal"
-- Esterilizador UV portatil (unico candidato, stock exacto) (stock 49=49)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720864441-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720864441-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720864441-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720864441-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720864441-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720864441-6.webp"]'::jsonb
where sku = '25-YXH102';
update products set active = false, ml_item_id = null where sku = 'MLA1720864441';

-- 25-YXH117 "Capa de corte" <- MLA1829367777 "Capa De Corte Peluquería Profesional Behmont Liso Negro"
-- Capa de corte Negro (stock 100=100)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Es descartable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Poliéster"},{"label":"Modelo","value":"Profesional"},{"label":"Nombre del diseño","value":"Liso"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"}]'::jsonb,
  description = 'La Capa de Corte Profesional de Behmont protege al cliente durante el corte, colorimetría y tratamientos. Fabricada en material resistente y de fácil limpieza. Diseño clásico que se adapta a cualquier salón de peluquería o barbería.

* Marca: Behmont
* Capa de corte profesional
* Material resistente y liviano
* Fácil limpieza y mantenimiento
* Protege la ropa del cliente
* Para corte, color y tratamientos
* Diseño clásico universal
* Ideal para peluquería y barbería'
where sku = '25-YXH117';
update products set active = false, ml_item_id = null where sku = 'MLA1829367777';

-- 25-YXH103 "Capa de corte" <- MLA1829406513 "Capa De Corte Peluquería Profesional Behmont Liso Rojo"
-- Capa de corte Rojo (stock 15=15)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Rojo"},{"label":"Es descartable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Rojo"},{"label":"Material","value":"Poliéster"},{"label":"Modelo","value":"Profesional"},{"label":"Nombre del diseño","value":"Liso"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"}]'::jsonb,
  description = 'La Capa de Corte Profesional de Behmont protege al cliente durante el corte, colorimetría y tratamientos. Fabricada en material resistente y de fácil limpieza. Diseño clásico que se adapta a cualquier salón de peluquería o barbería.

* Marca: Behmont
* Capa de corte profesional
* Material resistente y liviano
* Fácil limpieza y mantenimiento
* Protege la ropa del cliente
* Para corte, color y tratamientos
* Diseño clásico universal
* Ideal para peluquería y barbería'
where sku = '25-YXH103';
update products set active = false, ml_item_id = null where sku = 'MLA1829406513';

-- 25-YXH126 "Peines guia para maquina de corte - Magneticos - 1.5, 3, 4.5, 6, 10, 13, 19 y 25 mm - Negro" <- MLA1841130183 "Kit 8 Peines Guía Magnéticos Negro 1.5-25mm Barbería Behmont Negro"
-- Kit 8 Peines Guia Magneticos Negro (8 medidas = Kit 8) (stock 64=64)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"Peines guía magnéticos"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Guía magnética de altura"},{"label":"Material","value":"PlásticoImán"},{"label":"Modelo","value":"Kit 8 Magnéticos Negro"},{"label":"Usos recomendados","value":"barbería profesional"},{"label":"Formato de venta","value":"Pack"},{"label":"Unidades por pack","value":"8"},{"label":"Unidades por envase","value":"8"}]'::jsonb,
  description = 'El Kit de 8 Peines Guía Magnéticos en negro de Behmont es la versión clásica que cubre de 1.5 a 25 mm. Sistema magnético confiable y diseño uniforme negro para una imagen profesional en el puesto de trabajo.

* Marca: Behmont
* Kit de 8 peines guía magnéticos
* Alturas: 1.5 / 3 / 4.5 / 6 / 10 / 13 / 19 / 25 mm
* Todos en color negro
* Sistema magnético — ajuste firme
* Aspecto profesional uniforme
* Para barbería
* Alta disponibilidad de stock'
where sku = '25-YXH126';
update products set active = false, ml_item_id = null where sku = 'MLA1841130183';

-- 25-YXH127 "Peines guia para maquina de corte - Magneticos - 1.5, 3, 4.5, 6, 10, 13, 19 y 25 mm - Colores" <- MLA3471120516 "Kit 8 Peines Guía Magnéticos Colores 1.5-25mm Behmont Multicolor"
-- Kit 8 Peines Guia Magneticos Colores (8 medidas = Kit 8) (stock 64=64)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Multicolor"},{"label":"Tipos de peines","value":"Peines guía magnéticos colores"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Multicolor"},{"label":"Función principal","value":"Guía magnética de altura con código de color"},{"label":"Material","value":"PlásticoImán"},{"label":"Modelo","value":"Kit 8 Magnéticos Colores"},{"label":"Usos recomendados","value":"barbería profesional"},{"label":"Formato de venta","value":"Pack"},{"label":"Unidades por pack","value":"8"},{"label":"Unidades por envase","value":"8"}]'::jsonb,
  description = 'El Kit de 8 Peines Guía Magnéticos en colores de Behmont cubre de 1.5 a 25 mm. El código de colores permite identificar al instante la altura correcta sin perder tiempo. Sistema magnético seguro para un trabajo fluido y profesional.

* Marca: Behmont
* Kit de 8 peines guía magnéticos
* Alturas: 1.5 / 3 / 4.5 / 6 / 10 / 13 / 19 / 25 mm
* Código de colores para identificación rápida
* Sistema magnético — no se sueltan
* Cobertura total de alturas
* Para barbería profesional
* Alta disponibilidad de stock'
where sku = '25-YXH127';
update products set active = false, ml_item_id = null where sku = 'MLA3471120516';

