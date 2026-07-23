-- Migracion 084: 3 productos nuevos que el usuario acaba de cargar en
-- MercadoLibre ("Racktramo Continuo Para Tamo Inicial 200x120x40 100kg"),
-- duplicados de la linea Continuo de racks ya cargada del distribuidor
-- (120.40-C/CB/CN), confirmados por color + stock exacto. Ya aplicado.

-- 120.40-CB "Rack 200 x 120 x 40 continuo - 5 estantes - 100 kg por estante - Blanco" <- MLA1917000403 "Racktramo Continuo Para Tamo Inicial 200x120x40 100kg Blanco"
-- Blanco, stock exacto (6)
update products set
  images = '["https://http2.mlstatic.com/D_961206-MLA115016532817_072026-O.webp","https://http2.mlstatic.com/D_710202-MLA115016564447_072026-O.webp","https://http2.mlstatic.com/D_732641-MLA113725208190_072026-O.jpg","https://http2.mlstatic.com/D_870913-MLA113725179676_072026-O.jpg","https://http2.mlstatic.com/D_904571-MLA113724794592_072026-O.jpg","https://http2.mlstatic.com/D_846315-MLA113725085024_072026-O.webp"]'::jsonb
where sku = '120.40-CB';
update products set active = false, ml_item_id = null where sku = 'MLA1917000403';

-- 120.40-CN "Rack 200 x 120 x 40 continuo - 5 estantes - 100 kg por estante - Negro" <- MLA1917066945 "Racktramo Continuo Para Tamo Inicial 200x120x40 100kg Negro"
-- Negro, stock exacto (4)
update products set
  images = '["https://http2.mlstatic.com/D_900295-MLA115017057517_072026-O.webp","https://http2.mlstatic.com/D_773405-MLA115016094419_072026-O.webp","https://http2.mlstatic.com/D_728093-MLA115016242145_072026-O.webp","https://http2.mlstatic.com/D_840470-MLA115016854373_072026-O.jpg","https://http2.mlstatic.com/D_637997-MLA115016477797_072026-O.jpg","https://http2.mlstatic.com/D_727286-MLA115016825583_072026-O.jpg"]'::jsonb,
  specs = '[{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"40 cm"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Acabado","value":"Pintura electrostática"},{"label":"Altura","value":"120 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye kit de instalación","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Color principal","value":"Negro"},{"label":"Fabricante","value":"behmont"},{"label":"Material","value":"Metal"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Modelo","value":"120.40-C"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Altura del paquete del seller","value":"33 cm"},{"label":"Largo del paquete del seller","value":"13 cm"},{"label":"Peso del paquete del seller","value":"2581 g"},{"label":"Ancho del paquete del seller","value":"25 cm"},{"label":"SKU","value":"120.40-CN"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"100 kg"}]'::jsonb,
  description = 'RackTramo Continuo para Tamo Inicial 200x120x40 100 kg es una solución de almacenamiento pensada para ordenar cargas en espacios de trabajo, depósitos y áreas de organización. Su formato rectangular y su estructura metálica ofrecen una presencia firme y funcional para quienes necesitan aprovechar mejor el espacio disponible.

Con 200 cm de largo, 120 cm de alto y 40 cm de profundidad, brinda una superficie amplia sin ocupar demasiado lugar. Estas medidas lo vuelven una opción útil para ubicar insumos, cajas y otros elementos de uso frecuente con acceso cómodo y orden visual.

El acabado con pintura electrostática aporta una terminación prolija y ayuda a conservar mejor la apariencia de la estructura en el uso cotidiano. Su estilo industrial encaja muy bien en ambientes donde se valora una imagen sobria y resistente.

Está diseñado para soportar hasta 100 kg, por lo que resulta adecuado para organizar carga liviana a media dentro de un entorno estable. Al ser una unidad de apoyo al suelo, ofrece una disposición práctica para mantener el contenido distribuido y accesible.

El armado requiere ensamblaje, una característica habitual en este tipo de estanterías cuando se busca una estructura funcional y bien definida. Su formato continuo lo convierte en una alternativa conveniente para acompañar una línea de almacenamiento ya existente.

Es una elección útil para quienes necesitan orden, aprovechamiento del espacio y una estructura de metal con medidas claras. RackTramo Continuo combina presencia, resistencia y practicidad en un diseño pensado para el trabajo diario.'
where sku = '120.40-CN';
update products set active = false, ml_item_id = null where sku = 'MLA1917066945';

-- 120.40-C "Rack 200 x 120 x 40 continuo - 5 estantes - 100 kg por estante - Azul-naranja" <- MLA3655612140 "Racktramo Continuo Para Tamo Inicial 200x120x40 100kg Naranja"
-- Azul-naranja, stock exacto (20)
update products set
  images = '["https://http2.mlstatic.com/D_689705-MLA115009849215_072026-O.webp","https://http2.mlstatic.com/D_776398-MLA114979508949_072026-O.webp","https://http2.mlstatic.com/D_712071-MLA115010308719_072026-O.webp","https://http2.mlstatic.com/D_631901-MLA115010395829_072026-O.webp","https://http2.mlstatic.com/D_797213-MLA115009966797_072026-O.jpg"]'::jsonb,
  specs = '[{"label":"Altura del paquete del seller","value":"43 cm"},{"label":"Largo del paquete del seller","value":"23 cm"},{"label":"Peso del paquete del seller","value":"6550 g"},{"label":"Ancho del paquete del seller","value":"32 cm"},{"label":"Color","value":"Naranja"},{"label":"Profundidad","value":"40 cm"},{"label":"Acabado","value":"Pintura electrostática"},{"label":"Altura","value":"120 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye kit de instalación","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Color principal","value":"Naranja"},{"label":"Fabricante","value":"behmont"},{"label":"Material","value":"Metal"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Modelo","value":"120.40-C"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"SKU","value":"120.40-C"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"100 kg"}]'::jsonb,
  description = 'RackTramo Continuo para Tamo Inicial 200x120x40 100 kg es una solución de almacenamiento pensada para ordenar cargas en espacios de trabajo, depósitos y áreas de organización. Su formato rectangular y su estructura metálica ofrecen una presencia firme y funcional para quienes necesitan aprovechar mejor el espacio disponible.

Con 200 cm de largo, 120 cm de alto y 40 cm de profundidad, brinda una superficie amplia sin ocupar demasiado lugar. Estas medidas lo vuelven una opción útil para ubicar insumos, cajas y otros elementos de uso frecuente con acceso cómodo y orden visual.

El acabado con pintura electrostática aporta una terminación prolija y ayuda a conservar mejor la apariencia de la estructura en el uso cotidiano. Su estilo industrial encaja muy bien en ambientes donde se valora una imagen sobria y resistente.

Está diseñado para soportar hasta 100 kg, por lo que resulta adecuado para organizar carga liviana a media dentro de un entorno estable. Al ser una unidad de apoyo al suelo, ofrece una disposición práctica para mantener el contenido distribuido y accesible.

El armado requiere ensamblaje, una característica habitual en este tipo de estanterías cuando se busca una estructura funcional y bien definida. Su formato continuo lo convierte en una alternativa conveniente para acompañar una línea de almacenamiento ya existente.

Es una elección útil para quienes necesitan orden, aprovechamiento del espacio y una estructura de metal con medidas claras. RackTramo Continuo combina presencia, resistencia y practicidad en un diseño pensado para el trabajo diario.'
where sku = '120.40-C';
update products set active = false, ml_item_id = null where sku = 'MLA3655612140';

