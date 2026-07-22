-- Migracion 060: fusiona 3 productos nuevos de MercadoLibre (recien
-- sincronizados) que duplican racks/estantes ya cargados del
-- distribuidor. Mismo tratamiento que 057/058, y esta vez incluye la
-- desvinculacion (ml_item_id = null) en el mismo paso para que el sync
-- no los reactive el proximo dia.

-- 120.40-IB "Rack 200 x 120 x 40 inicial - 5 estantes - 100 kg por estante - Blanco" <- MLA1913766279 "Rack Inicial Behmont 120.40-ib Acero 200x120x40 Blanco"
update products set
  images = '["https://http2.mlstatic.com/D_733866-MLA113671044300_072026-O.webp","https://http2.mlstatic.com/D_628961-MLA113670429126_072026-O.webp","https://http2.mlstatic.com/D_928861-MLA113670979880_072026-O.jpg","https://http2.mlstatic.com/D_893649-MLA113671159582_072026-O.jpg","https://http2.mlstatic.com/D_839243-MLA113671160536_072026-O.webp","https://http2.mlstatic.com/D_774171-MLA113670280578_072026-O.jpg"]'::jsonb,
  specs = '[{"label":"Color","value":"Blanco"},{"label":"Profundidad","value":"40 cm"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Acabado","value":"Acero"},{"label":"Altura","value":"120 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye kit de instalación","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Color principal","value":"Blanco"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Acero"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Modelo","value":"120.40-I"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Altura del paquete del seller","value":"56 cm"},{"label":"Largo del paquete del seller","value":"17 cm"},{"label":"Peso del paquete del seller","value":"2935 g"},{"label":"Ancho del paquete del seller","value":"34 cm"},{"label":"SKU","value":"120.40-IB"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"100 kg"}]'::jsonb,
  description = 'Rack Inicial Behmont 120.40-IB pensado para sumar orden en espacios de trabajo, depósito o hogar. Su formato rectangular y su estética blanca con estilo industrial ayudan a integrar la pieza en ambientes claros y funcionales.

Tiene 200 cm de largo, 120 cm de altura y 40 cm de profundidad, medidas que brindan una superficie amplia para ubicar mercaderías, cajas o elementos de uso frecuente. Al ser una estructura de acero, ofrece una presencia firme y resistente para organización cotidiana.

Soporta hasta 100 kg, dato útil para quienes necesitan una estantería pensada para carga moderada y orden estable. Esta capacidad permite aprovechar mejor el espacio sin depender de muebles livianos.

Requiere armado, por lo que resulta conveniente para usuarios que prefieren armar su estructura según las necesidades del lugar. El modelo 120.40-IB mantiene una propuesta directa y práctica, sin agregados innecesarios.

Por su tamaño, puede funcionar en áreas de guardado, talleres, locales o ambientes domésticos donde se busque organización visible y acceso rápido. El color blanco ayuda a conservar una imagen prolija y luminosa.

Es una opción útil para quien valora una estantería amplia, de acero y con formato recto para ordenar mejor distintos elementos. Su diseño combina capacidad, presencia y uso versátil en una sola pieza.'
where sku = '120.40-IB';
update products set active = false, ml_item_id = null where sku = 'MLA1913766279';

-- 120.40-I "Rack 200 x 120 x 40 inicial - 5 estantes - 100 kg por estante - Azul-naranja" <- MLA1913805821 "Rack Inicial Behmont 120.40-ib Acero 200x120x40 Naranja"
update products set
  images = '["https://http2.mlstatic.com/D_967325-MLA114956967987_072026-O.jpg","https://http2.mlstatic.com/D_695932-MLA113670760096_072026-O.jpg","https://http2.mlstatic.com/D_841395-MLA113671077482_072026-O.jpg","https://http2.mlstatic.com/D_867542-MLA113671169028_072026-O.webp","https://http2.mlstatic.com/D_982654-MLA113670641848_072026-O.webp","https://http2.mlstatic.com/D_603647-MLA113670903678_072026-O.jpg"]'::jsonb,
  specs = '[{"label":"Color","value":"Naranja"},{"label":"Profundidad","value":"40 cm"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Acabado","value":"Acero"},{"label":"Altura","value":"120 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye kit de instalación","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Color principal","value":"Naranja"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Acero"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Modelo","value":"120.40-I"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Altura del paquete del seller","value":"41 cm"},{"label":"Largo del paquete del seller","value":"10 cm"},{"label":"Peso del paquete del seller","value":"3638 g"},{"label":"Ancho del paquete del seller","value":"30 cm"},{"label":"SKU","value":"120.40-I"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"100 kg"}]'::jsonb,
  description = 'Rack Inicial Behmont 120.40-I pensado para sumar orden en espacios de trabajo, depósito o hogar. Su formato rectangular y su estética naranja con estilo industrial ayudan a destacar la pieza en ambientes de taller o depósito.

Tiene 200 cm de largo, 120 cm de altura y 40 cm de profundidad, medidas que brindan una superficie amplia para ubicar mercaderías, cajas o elementos de uso frecuente. Al ser una estructura de acero, ofrece una presencia firme y resistente para organización cotidiana.

Soporta hasta 100 kg, dato útil para quienes necesitan una estantería pensada para carga moderada y orden estable. Esta capacidad permite aprovechar mejor el espacio sin depender de muebles livianos.

Requiere armado, por lo que resulta conveniente para usuarios que prefieren armar su estructura según las necesidades del lugar. El modelo 120.40-I mantiene una propuesta directa y práctica, sin agregados innecesarios.

Por su tamaño, puede funcionar en áreas de guardado, talleres, locales o ambientes domésticos donde se busque organización visible y acceso rápido. El color naranja le da una identidad visual destacada y fácil de ubicar.

Es una opción útil para quien valora una estantería amplia, de acero y con formato recto para ordenar mejor distintos elementos. Su diseño combina capacidad, presencia y uso versátil en una sola pieza.'
where sku = '120.40-I';
update products set active = false, ml_item_id = null where sku = 'MLA1913805821';

-- NB-210-N "Estante modulo 200 x 90 x 30 - 5 estantes - 50 kg por estante - Encastrable - Negro" <- MLA3648105324 "Estante Módulo Nb-210-b 200x90x30 Acero Esmerilado Negro"
update products set
  images = '["https://http2.mlstatic.com/D_641277-MLA113670414504_072026-O.webp","https://http2.mlstatic.com/D_775093-MLA114954204689_072026-O.jpg","https://http2.mlstatic.com/D_815629-MLA114954735147_072026-O.webp","https://http2.mlstatic.com/D_708374-MLA114954174061_072026-O.jpg","https://http2.mlstatic.com/D_667429-MLA114954974201_072026-O.webp","https://http2.mlstatic.com/D_984301-MLA114954737417_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"30 cm"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Acabado","value":"Acero Esmerilado"},{"label":"Altura","value":"90 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye kit de instalación","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Color principal","value":"Negro"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Acero"},{"label":"Peso máximo soportado","value":"50 kg"},{"label":"Modelo","value":"NB-210-B"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Altura del paquete del seller","value":"120 cm"},{"label":"Largo del paquete del seller","value":"32 cm"},{"label":"Peso del paquete del seller","value":"14200 g"},{"label":"Ancho del paquete del seller","value":"43 cm"},{"label":"SKU","value":"NB-210-N"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"Estante"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"12 kg"}]'::jsonb,
  description = 'Este estante de acero negro está pensado para ordenar y dar apoyo visual en ambientes de trabajo, depósitos domésticos o espacios de uso frecuente. Su formato rectangular y sus 200 cm de largo aprovechan bien la pared, mientras que la profundidad de 30 cm ayuda a mantener un perfil contenido.

La estructura de acero con acabado esmerilado aporta una presencia sobria y de línea industrial, fácil de integrar con mobiliario oscuro o más técnico. El color negro le da un aspecto prolijo y resistente a la suciedad visible.

Soporta hasta 50 kg, por lo que resulta adecuado para ubicar objetos de uso cotidiano, insumos livianos, cajas o elementos decorativos según la necesidad del ambiente. La altura de 90 cm ofrece una ubicación accesible y práctica para tomar y volver a dejar cada objeto con comodidad.

Requiere armado, una característica habitual en este tipo de pieza cuando se busca una solución firme y de formato amplio. Su peso total de 12 kg facilita el manejo previo al armado sin perder solidez una vez montado.

Puede ser una buena elección para quienes buscan sumar orden en talleres, lavaderos, locales, áreas de guardado o ambientes donde se necesite una superficie de apoyo amplia. También funciona bien en espacios donde conviene priorizar una imagen limpia y una estructura de apariencia robusta.

El modelo NB-210-N combina medidas generosas, material metálico y una estética sencilla para resolver necesidades de organización con un diseño claro y funcional.'
where sku = 'NB-210-N';
update products set active = false, ml_item_id = null where sku = 'MLA3648105324';
