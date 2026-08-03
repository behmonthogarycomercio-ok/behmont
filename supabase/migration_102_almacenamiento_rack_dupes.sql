-- Migracion 102: unifica por SKU los 8 productos de la categoria
-- Almacenamiento que estaban duplicados entre el catalogo del
-- distribuidor (rack 200x200, profundidad 60/80/100 cm, continuo/inicial)
-- y su republicacion en MercadoLibre (misma medida, mismo color, mismo
-- peso soportado -> mismo producto fisico cargado dos veces).
--
-- Criterio: la fila del distribuidor conserva su precio real (mas bajo)
-- y su stock; se le transfieren las fotos de la publicacion de ML (las
-- filas del distribuidor no tenian fotos propias). En los 5 casos donde
-- la fila del distribuidor solo tenia un placeholder de specs ("Detalle")
-- y sin descripcion, tambien se copian specs + descripcion reales de ML.
-- En los 3 casos donde la fila del distribuidor ya tenia specs y
-- descripcion propias bien cargadas (200.60-CB/IB/I) se dejan como estan
-- y solo se agregan las fotos. La fila de ML se desactiva (active=false)
-- y se le limpia ml_item_id para que el sync diario no la reactive.
--
-- Nota: la publicacion de ML de "200.60-C" (naranja, tramo continuo)
-- tenia un error propio -su campo "Modelo" y el texto de la descripcion
-- decian "200.60-I" (el tramo inicial)-, asi que en vez de copiar esa
-- descripcion con el dato mal cargado se armaron specs/descripcion
-- corregidos, en el mismo estilo ya usado para su par 200.60-CB.
--
-- Ya aplicado directamente con la service role key.

-- 200.100-C "Rack 200 x 200 x 100 continuo" <- MLA1926771003 "Rack Continuo Metálico Reforzado 4 Estant 200x200x100 400kg Naranja"
update products set
  images = '["https://http2.mlstatic.com/D_895093-MLA115206133367_072026-O.jpg","https://http2.mlstatic.com/D_952416-MLA113900523766_072026-O.jpg","https://http2.mlstatic.com/D_836082-MLA113900200716_072026-O.webp","https://http2.mlstatic.com/D_617592-MLA115206435459_072026-O.jpg","https://http2.mlstatic.com/D_673137-MLA115206697695_072026-O.jpg","https://http2.mlstatic.com/D_891814-MLA113900464442_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Color","value":"Naranja"},{"label":"Profundidad","value":"100 cm"},{"label":"Acabado","value":"Pintura electrostática"},{"label":"Altura","value":"200 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Metal"},{"label":"Peso máximo soportado","value":"400 kg"},{"label":"Modelo","value":"200.100-C"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"}]'::jsonb,
  description = 'La estantería metálica reforzada de formato continuo está pensada para ordenar mercancía, herramientas o insumos en espacios donde se necesita aprovechar mejor la capacidad de guardado. Su diseño de estilo industrial ofrece una presencia firme y funcional, adecuada para uso intensivo en áreas de trabajo o almacenamiento.

Con una altura de 200 cm, un largo de 200 cm y una profundidad de 100 cm, brinda una superficie amplia para distribuir objetos de distintos tamaños. Su forma rectangular ayuda a organizar mejor el espacio disponible y a mantener una disposición más ordenada y accesible.

Cuenta con cuatro niveles de apoyo que permiten separar productos por tipo, frecuencia de uso o peso. Soporta hasta 400 kg, lo que la convierte en una opción práctica para cargas exigentes dentro de entornos donde la resistencia es un factor clave.

Está fabricada en metal y cuenta con acabado en pintura electrostática. Requiere ensamblado y está diseñada para adaptarse a distintas necesidades de organización, siempre sobre una superficie firme.'
where sku = '200.100-C';
update products set active = false, ml_item_id = null where sku = 'MLA1926771003';

-- 200.80-C "Rack 200 x 200 x 80 continuo" <- MLA3678748888 "Rack Continuo Metálico Reforzado 4 Estantes 200x200x80 400kg Naranja"
update products set
  images = '["https://http2.mlstatic.com/D_952945-MLA115194833533_072026-O.webp","https://http2.mlstatic.com/D_680207-MLA113890437074_072026-O.jpg","https://http2.mlstatic.com/D_866742-MLA115195733633_072026-O.webp","https://http2.mlstatic.com/D_767798-MLA113890487424_072026-O.webp","https://http2.mlstatic.com/D_612708-MLA113890635164_072026-O.jpg","https://http2.mlstatic.com/D_624878-MLA113890436106_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Color","value":"Naranja"},{"label":"Profundidad","value":"80 cm"},{"label":"Acabado","value":"Pintura electrostática"},{"label":"Altura","value":"200 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Metal"},{"label":"Peso máximo soportado","value":"400 kg"},{"label":"Modelo","value":"200.80-C"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"}]'::jsonb,
  description = 'Esta estantería metálica está pensada para ordenar cargas y elementos de uso frecuente con una estructura amplia y resistente. Su formato rectangular y su estilo industrial aportan una presencia sobria, útil en talleres, garajes, depósitos y espacios de trabajo.

Mide 200 cm de largo, 200 cm de alto y 80 cm de profundidad, lo que ofrece una superficie generosa para organizar cajas, herramientas, insumos o materiales diversos. Sus cuatro estantes ayudan a distribuir el contenido con mejor acceso visual y una disposición más ordenada.

La fabricación en metal refuerza la estabilidad del conjunto, mientras que el acabado con pintura electrostática suma una terminación pareja y una mejor protección de la superficie. Soporta hasta 400 kg, una capacidad pensada para quienes necesitan aprovechar al máximo el espacio sin perder firmeza.

El producto requiere armado y su diseño continuo favorece una disposición ordenada de los objetos sobre cada nivel.'
where sku = '200.80-C';
update products set active = false, ml_item_id = null where sku = 'MLA3678748888';

-- 200.60-CB "Rack 200 x 200 x 60 continuo Blanco" <- MLA1921819251 "Rack Continuo Metálico Reforzado 4 Estantes De 200kg Blanco"
-- Ya tenia specs/descripcion propias correctas; solo se agregan fotos.
update products set
  images = '["https://http2.mlstatic.com/D_695213-MLA113833420138_072026-O.webp","https://http2.mlstatic.com/D_927803-MLA113833383550_072026-O.webp","https://http2.mlstatic.com/D_743104-MLA113833063202_072026-O.webp","https://http2.mlstatic.com/D_953818-MLA113833382566_072026-O.jpg","https://http2.mlstatic.com/D_884149-MLA113833323646_072026-O.webp","https://http2.mlstatic.com/D_794727-MLA113832612890_072026-O.jpg"]'::jsonb
where sku = '200.60-CB';
update products set active = false, ml_item_id = null where sku = 'MLA1921819251';

-- 200.60-C "Rack 200 x 200 x 60 continuo Azul-naranja" <- MLA3668462378 "Rack Continuo Metálico Reforzado 4 Estantes De 200kg Naranja"
-- [ojo: la publicacion de ML tenia "Modelo: 200.60-I" (el tramo inicial)
-- por error propio de esa ficha; se corrige a 200.60-C, en el mismo
-- estilo de specs/descripcion ya usado para el par 200.60-CB]
update products set
  images = '["https://http2.mlstatic.com/D_865078-MLA113833200048_072026-O.webp","https://http2.mlstatic.com/D_609275-MLA113832660740_072026-O.webp","https://http2.mlstatic.com/D_636770-MLA113831238680_072026-O.jpg","https://http2.mlstatic.com/D_733975-MLA113831268396_072026-O.jpg","https://http2.mlstatic.com/D_837515-MLA113831103688_072026-O.jpg","https://http2.mlstatic.com/D_697335-MLA115129945935_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Modelo","value":"200.60-C"},{"label":"Color","value":"Azul-naranja"},{"label":"Tipo","value":"Rack metálico, tramo continuo"},{"label":"Medidas","value":"200 x 200 x 60 cm"},{"label":"Estantes","value":"4 estantes"},{"label":"Capacidad","value":"200 kg por estante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb,
  description = 'Tramo continuo de rack metalico encastrable, pensado para ampliar una instalacion ya iniciada. Cuenta con 4 estantes de 200 kg de capacidad cada uno y sistema de agujero mariposa para encastrar nuevos modulos.'
where sku = '200.60-C';
update products set active = false, ml_item_id = null where sku = 'MLA3668462378';

-- 200.100-I "Rack 200 x 200 x 100 inicial" <- MLA1926645045 "Rack Inicial Metálico Reforzado 4 Estantes 200x200x100 400kg Naranja"
update products set
  images = '["https://http2.mlstatic.com/D_617027-MLA113899966068_072026-O.jpg","https://http2.mlstatic.com/D_643016-MLA113899324432_072026-O.webp","https://http2.mlstatic.com/D_976935-MLA115205387793_072026-O.jpg","https://http2.mlstatic.com/D_824528-MLA115205655615_072026-O.webp","https://http2.mlstatic.com/D_976927-MLA113899737376_072026-O.jpg","https://http2.mlstatic.com/D_730568-MLA115204963199_072026-O.jpg"]'::jsonb,
  specs = '[{"label":"Color","value":"Naranja"},{"label":"Profundidad","value":"100 cm"},{"label":"Acabado","value":"Pintura electrostática"},{"label":"Altura","value":"200 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Metal"},{"label":"Peso máximo soportado","value":"400 kg"},{"label":"Modelo","value":"200.100-I"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"}]'::jsonb,
  description = 'Estantería metálica reforzada pensada para mantener en orden herramientas, insumos y cajas en espacios de trabajo o en el hogar. Su formato rectangular y de gran tamaño ayuda a aprovechar mejor zonas amplias de depósito, taller o garaje.

Está fabricada en metal y cuenta con pintura electrostática, un acabado que aporta mejor presencia visual y facilita el cuidado diario.

Sus medidas de 200 cm de alto, 200 cm de largo y 100 cm de profundidad ofrecen una superficie amplia para organizar distintos artículos. La capacidad máxima de 400 kg la convierte en una alternativa adecuada cuando se necesita almacenar objetos de peso considerable.

El diseño con cuatro niveles permite distribuir la carga de manera más ordenada y separar elementos por tamaño o por uso. Requiere armado, por lo que conviene prever el espacio disponible antes de comenzar.'
where sku = '200.100-I';
update products set active = false, ml_item_id = null where sku = 'MLA1926645045';

-- 200.80-I "Rack 200 x 200 x 80 inicial" <- MLA1925989173 "Rack Inicial Metálico Reforzado 4 Estantes 200x200x80 400kg Naranja"
update products set
  images = '["https://http2.mlstatic.com/D_665144-MLA115195274403_072026-O.webp","https://http2.mlstatic.com/D_890658-MLA115193132347_072026-O.webp","https://http2.mlstatic.com/D_891031-MLA113888241782_072026-O.jpg","https://http2.mlstatic.com/D_849186-MLA113887811814_072026-O.webp","https://http2.mlstatic.com/D_698175-MLA113888106636_072026-O.webp","https://http2.mlstatic.com/D_894952-MLA115190691463_072026-O.jpg"]'::jsonb,
  specs = '[{"label":"Color","value":"Naranja"},{"label":"Profundidad","value":"80 cm"},{"label":"Acabado","value":"Pintura electrostática"},{"label":"Altura","value":"200 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Metal"},{"label":"Peso máximo soportado","value":"400 kg"},{"label":"Modelo","value":"200.80-I"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"}]'::jsonb,
  description = 'Este rack metálico reforzado ofrece una solución firme para organizar mercadería, herramientas o insumos en espacios que necesitan orden y acceso rápido. Su formato de cuatro estantes y su diseño rectangular ayudan a aprovechar bien el área disponible sin perder estabilidad.

Con 200 cm de largo, 200 cm de alto y 80 cm de profundidad, brinda una estructura amplia para almacenar distintos tipos de elementos con comodidad. Es una opción adecuada para talleres, depósitos, garajes o áreas de trabajo donde se busca mantener todo visible y separado.

La construcción en metal aporta firmeza para uso frecuente, mientras que el acabado con pintura electrostática mejora la resistencia superficial y facilita el mantenimiento. Está pensado para soportar hasta 400 kg.

Requiere armado y llega como una estructura lista para ser montada según las necesidades del espacio.'
where sku = '200.80-I';
update products set active = false, ml_item_id = null where sku = 'MLA1925989173';

-- 200.60-IB "Rack 200 x 200 x 60 inicial Blanco" <- MLA1921441543 "Rack Inicial Metálico Reforzado 4 Estantes De 200kg Blanco"
-- Ya tenia specs/descripcion propias correctas; solo se agregan fotos.
update products set
  images = '["https://http2.mlstatic.com/D_634554-MLA115129711813_072026-O.webp","https://http2.mlstatic.com/D_794383-MLA115129210075_072026-O.jpg","https://http2.mlstatic.com/D_691537-MLA113830711270_072026-O.jpg","https://http2.mlstatic.com/D_856913-MLA115129480715_072026-O.webp","https://http2.mlstatic.com/D_800230-MLA115129596227_072026-O.webp","https://http2.mlstatic.com/D_683664-MLA113830465034_072026-O.webp"]'::jsonb
where sku = '200.60-IB';
update products set active = false, ml_item_id = null where sku = 'MLA1921441543';

-- 200.60-I "Rack 200 x 200 x 60 inicial Azul-naranja" <- MLA1921441545 "Rack Inicial Metálico Reforzado 4 Estantes De 200kg Naranja"
-- Ya tenia specs/descripcion propias correctas; solo se agregan fotos.
update products set
  images = '["https://http2.mlstatic.com/D_928967-MLA115129323239_072026-O.webp","https://http2.mlstatic.com/D_738035-MLA113830307804_072026-O.webp","https://http2.mlstatic.com/D_808889-MLA113830052398_072026-O.jpg","https://http2.mlstatic.com/D_826931-MLA113830724716_072026-O.webp","https://http2.mlstatic.com/D_600525-MLA115128948619_072026-O.webp","https://http2.mlstatic.com/D_826189-MLA115128660237_072026-O.webp"]'::jsonb
where sku = '200.60-I';
update products set active = false, ml_item_id = null where sku = 'MLA1921441545';
