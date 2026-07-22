-- Migracion 062: mas duplicados de MercadoLibre encontrados en un
-- segundo escaneo (esta vez sin restringir por categoria y con umbral
-- de similitud mas bajo, comparando por nombre + stock identico o
-- casi identico + precio). 30 productos del distribuidor fusionados
-- con 32 filas de MercadoLibre (2 casos tenian DOS publicaciones de ML
-- para el mismo producto: la cafetera Liliana Cofix Bar y el kit de
-- herramientas 499 piezas).
--
-- Igual que antes: se copian solo los campos que el distribuidor no
-- tenia ya cargados, y se desactiva + desvincula (ml_item_id = null)
-- cada fila de ML para que el sync no la reactive.

-- HB3 "Silla de peluqueria fija Malmo - Tela mesh - Negro" <- MLA1830999265 "Silla Fija Malmo Tela Mesh Negro Behmont Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-6.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1830999265-7.webp"]'::jsonb,
  specs = '[{"label":"Modelo alfanumérico","value":"Malmo"},{"label":"Altura del respaldo","value":"0 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"0 cm"},{"label":"Modelo","value":"Malmo"},{"label":"Ancho de la silla","value":"0 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Profundidad del asiento","value":"0 cm"}]'::jsonb,
  description = 'La Silla Fija Malmo de Behmont ofrece la comodidad que el cliente necesita. Tapizado en tela mesh transpirable, estructura robusta de acero negro. Apilable para ahorrar espacio en el salón.

* Marca: Behmont
* Modelo: Malmo
* Tapizado en tela mesh transpirable
* Estructura de acero negro
* Apilable para mayor practicidad
* Ideal para sala de espera y puesto de trabajo
* Alta resistencia al uso diario
* Alta disponibilidad de stock'
where sku = 'HB3';
update products set active = false, ml_item_id = null where sku = 'MLA1830999265';

-- 25-YXH98 "Torno electrico para uñas - 3000 a 20000 RPM" <- MLA1827632255 "Torno Eléctrico Uñas 3000 A 20000 Rpm Profesional Behmont Negro"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA1827632255';

-- 25-YXH121 "Cepillo cerdas duras - Mango madera" <- MLA3471132260 "Cepillo Cerdas Duras Mango Madera Básico Behmont Natural"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3471132260';

-- 25-YXH116 "Gorro termico aluminio para tratamientos capilares" <- MLA3472945214 "Gorro Térmico Aluminio Gris Para Tratamientos Capilares No Eléctrico"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3472945214';

-- MT-189/3015 "Mesa para manicura - Melamina - Blanco" <- MLA3126101014 "Mesa Para Manicura Nails Profesional Melamina Con Cajones Blanco"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3126101014-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Cantidad de cajones","value":"3"},{"label":"Incluye asiento","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Blanco"},{"label":"Material","value":"Melamina"},{"label":"Modelo","value":"3015"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Con ruedas","value":"No"}]'::jsonb
where sku = 'MT-189/3015';
update products set active = false, ml_item_id = null where sku = 'MLA3126101014';

-- MP-37 "Silla de peluqueria fija Orebro - Negro" <- MLA1830947549 "Silla Fija Orebro Negro Behmont Profesional Negro"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA1830947549';

-- MP-1/1BLACK "Mesa de manicura portatil plegable - 91.5 x 76 - Negro" <- MLA1678752929 "Mesa Profesional Para Manicura Plegable Y Portátil Manicuría Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678752929-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678752929-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678752929-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678752929-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678752929-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678752929-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"40 cm"},{"label":"Cantidad de cajones","value":"1"},{"label":"Altura","value":"75 cm"},{"label":"Incluye asiento","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Madera"},{"label":"Modelo","value":"MP-1/1"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Peso","value":"7 kg"},{"label":"Ancho","value":"90 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La Mesa Profesional Para Manicura Plegable y Portátil de Behmont es la solución ideal para quienes buscan funcionalidad y estilo en su espacio de trabajo. Con un diseño elegante y práctico, esta mesa cuenta con dimensiones de 90 cm de ancho, 40 cm de profundidad y 75 cm de altura, lo que la convierte en un mueble versátil que se adapta a cualquier entorno.

Su estructura de madera garantiza durabilidad y resistencia, mientras que su peso de solo 7 kg permite un fácil transporte y almacenamiento. Equipado con ruedas, este modelo facilita el movimiento, permitiendo que los profesionales de la manicura optimicen su tiempo y espacio.

La mesa incluye un cajón, perfecto para organizar herramientas y productos, manteniendo todo al alcance de la mano. Aunque requiere ensamblado, su diseño intuitivo asegura que el proceso sea rápido y sencillo, permitiendo que puedas comenzar a trabajar en poco tiempo.

Ideal para salones de belleza, estéticas o uso personal, esta mesa es una inversión en comodidad y eficiencia. Con su diseño plegable, podrás guardarla sin ocupar mucho espacio, convirtiéndola en una opción práctica para quienes valoran la funcionalidad en su día a día.'
where sku = 'MP-1/1BLACK';
update products set active = false, ml_item_id = null where sku = 'MLA1678752929';

-- MP-1/1WHITE "Mesa de manicura portatil plegable - 91.5 x 76 - Blanco" <- MLA2867451534 "Mesa Profesional Para Manicura Plegable Y Portátil Manicuría Blanco"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2867451534-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2867451534-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2867451534-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2867451534-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2867451534-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2867451534-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Profundidad","value":"40 cm"},{"label":"Cantidad de cajones","value":"1"},{"label":"Altura","value":"75 cm"},{"label":"Incluye asiento","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Blanco"},{"label":"Material","value":"Madera"},{"label":"Modelo","value":"MP-1/1"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Peso","value":"7 kg"},{"label":"Ancho","value":"90 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La Mesa Profesional Para Manicura Plegable y Portátil de Behmont es la solución ideal para quienes buscan funcionalidad y estilo en su espacio de trabajo. Con un diseño elegante y práctico, esta mesa cuenta con dimensiones de 90 cm de ancho, 40 cm de profundidad y 75 cm de altura, lo que la convierte en un mueble versátil que se adapta a cualquier entorno.

Su estructura de madera garantiza durabilidad y resistencia, mientras que su peso de solo 7 kg permite un fácil transporte y almacenamiento. Equipado con ruedas, este modelo facilita el movimiento, permitiendo que los profesionales de la manicura optimicen su tiempo y espacio.

La mesa incluye un cajón, perfecto para organizar herramientas y productos, manteniendo todo al alcance de la mano. Aunque requiere ensamblado, su diseño intuitivo asegura que el proceso sea rápido y sencillo, permitiendo que puedas comenzar a trabajar en poco tiempo.

Ideal para salones de belleza, estéticas o uso personal, esta mesa es una inversión en comodidad y eficiencia. Con su diseño plegable, podrás guardarla sin ocupar mucho espacio, convirtiéndola en una opción práctica para quienes valoran la funcionalidad en su día a día.'
where sku = 'MP-1/1WHITE';
update products set active = false, ml_item_id = null where sku = 'MLA2867451534';

-- JB-KM-3137 "Planchita de pelo ceramica 510 °C - Placas super anchas - Placas flotantes" <- MLA1835405823 "Planchita Pelo Kemei Km-3137 Cerámica 510°c Placas Anchas Negro"
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Es iónica","value":"No"},{"label":"Es mini","value":"No"},{"label":"Es apta para cabello seco y húmedo","value":"No"},{"label":"Es inalámbrica","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Temperatura máxima","value":"510 °C"},{"label":"Temperatura mínima","value":"150 °C"},{"label":"Modelo","value":"KM-3137"},{"label":"Materiales de las placas","value":"Cerámica"},{"label":"Voltaje","value":"220V"},{"label":"Con emisión de vapor","value":"No"},{"label":"Con regulador de temperatura","value":"Sí"}]'::jsonb,
  description = 'La Planchita Kemei KM-3137 tiene placas super anchas de cerámica y llega hasta 510°C para el alisado más intensivo. Sus placas flotantes se adaptan a cualquier cabello logrando alisado perfecto en menos pasadas.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-3137
* Placas super anchas de cerámica
* Temperatura hasta 510°C
* Placas flotantes adaptables
* Alisado intensivo en menos pasadas
* Para todo tipo de cabello
* Resultado profesional garantizado'
where sku = 'JB-KM-3137';
update products set active = false, ml_item_id = null where sku = 'MLA1835405823';

-- 25-YXH99 "Cabina UV para uñas - 90 s." <- MLA1827632253 "Cabina Uv Secado Uñas 90 Segundos Profesional Behmont Blanco"
update products set
  specs = '[{"label":"Accesorios incluidos","value":"INCLUYE BANDEJA"},{"label":"Zonas de aplicación","value":"Manos y pies"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Tipos de lámparas","value":"UV"},{"label":"Línea","value":"CABINA UV/LED"},{"label":"Color principal","value":"Blanco"},{"label":"Modelo","value":"UV 90s"},{"label":"Potencia","value":"30"},{"label":"Voltaje","value":"220V"},{"label":"Con temporizador","value":"Sí"}]'::jsonb,
  description = 'La Cabina UV para Uñas de 90 segundos de Behmont cura geles y esmaltes semipermanentes de forma rápida y uniforme. Diseño compacto que cabe en cualquier mesa de manicura. Temporizador integrado para un secado preciso y seguro.

* Marca: Behmont
* Temporizador: 90 segundos
* Tecnología UV de alta potencia
* Cura gel, semipermanente y acrílico
* Diseño compacto y liviano
* Temporizador automático
* Para manicura y pedicura profesional
* Alta disponibilidad de stock'
where sku = '25-YXH99';
update products set active = false, ml_item_id = null where sku = 'MLA1827632253';

-- CFJB-KM-6910 "Planchita de pelo ceramica 120 °C" <- MLA3458937532 "Planchita Pelo Kemei Km-6910 Cerámica 120°c Profesional Negro"
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Largo del cable","value":"1.6 m"},{"label":"Color","value":"Negro"},{"label":"Tipo de pantalla","value":"LCD"},{"label":"Es iónica","value":"No"},{"label":"Es mini","value":"No"},{"label":"Es apta para cabello seco y húmedo","value":"No"},{"label":"Es inalámbrica","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Temperatura máxima","value":"120 °C"},{"label":"Temperatura mínima","value":"120 °C"},{"label":"Modelo","value":"KM-6910"},{"label":"Materiales de las placas","value":"Cerámica"},{"label":"Voltaje","value":"220V"},{"label":"Con emisión de vapor","value":"No"},{"label":"Con regulador de temperatura","value":"Sí"}]'::jsonb,
  description = 'La Planchita de Pelo Kemei KM-6910 con placas de cerámica es la herramienta profesional para alisado suave sin daños. Su temperatura de 120°C es ideal para cabellos finos, teñidos o tratados. Deslizamiento suave y brillo garantizado.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-6910
* Placas de cerámica
* Temperatura: 120°C
* Ideal para cabellos finos y tratados
* Deslizamiento suave y uniforme
* Sin daños por exceso de calor
* Para peluquería y uso personal'
where sku = 'CFJB-KM-6910';
update products set active = false, ml_item_id = null where sku = 'MLA3458937532';

-- 25-YXH100 "Cabina UV para uñas - 99 s." <- MLA1827736227 "Cabina Uv Secado Uñas 99 Segundos Profesional Behmont Blanco"
update products set
  specs = '[{"label":"Línea","value":"CABINA UV/LED"},{"label":"Accesorios incluidos","value":"INCLUYE BANDEJA"},{"label":"Zonas de aplicación","value":"Manos y pies"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Tipos de lámparas","value":"UV"},{"label":"Color principal","value":"Blanco"},{"label":"Modelo","value":"UV 99s Premium"},{"label":"Potencia","value":"36"},{"label":"Voltaje","value":"220V"},{"label":"Con temporizador","value":"Sí"}]'::jsonb,
  description = 'La Cabina UV Premium de 99 segundos de Behmont ofrece mayor potencia para curado rápido y uniforme de todos los tipos de gel y semipermanente. Motor de alta eficiencia, temporizador de 99 segundos y diseño ergonómico para la comodidad de la técnica y el cliente.

* Marca: Behmont
* Temporizador: 99 segundos
* Alta potencia UV
* Mayor capacidad de curado
* Compatible con gel, semipermanente y acrílico
* Diseño ergonómico
* Temporizador automático
* Resultado profesional garantizado'
where sku = '25-YXH100';
update products set active = false, ml_item_id = null where sku = 'MLA1827736227';

-- 517-15-6.5 "Tijera de corte 6.5." <- MLA1841718127 "Tijera De Corte Peluquería 6.5 Pulgadas Acero Inox Behmont Plateado"
update products set
  specs = '[{"label":"Material de la hoja","value":"Acero inoxidable"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Forma","value":"Recta"},{"label":"Tipo","value":"De corte"},{"label":"Orientación de la mano","value":"Ambidiestro"},{"label":"Incluye estuche","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"17 cm"},{"label":"Color principal","value":"Plateado"},{"label":"Modelo","value":"Corte 6.5\""},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Con tornillo ajustable","value":"Sí"},{"label":"Con reposa dedos","value":"Sí"}]'::jsonb,
  description = 'La Tijera de Corte 6.5" de Behmont es la elección de peluqueros que prefieren mayor cobertura en cada pasada. Acero inoxidable de alta dureza, filo de larga duración y tornillo ajustable para adaptar la tensión a cada técnica de corte.

* Marca: Behmont
* Largo: 6.5 pulgadas
* Mayor cobertura por pasada
* Acero inoxidable premium
* Filo de larga duración
* Tornillo ajustable de precisión
* Para peluquería y barbería
* Alta disponibilidad de stock'
where sku = '517-15-6.5';
update products set active = false, ml_item_id = null where sku = 'MLA1841718127';

-- 517-15-5.5 "Tijera de corte 5.5." <- MLA3473086680 "Tijera De Corte Peluquería 5.5 Pulgadas Acero Inox Behmont Plateado"
update products set
  specs = '[{"label":"Material de la hoja","value":"Acero inoxidable"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Forma","value":"Recta"},{"label":"Tipo","value":"De corte"},{"label":"Orientación de la mano","value":"Ambidiestro"},{"label":"Incluye estuche","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"14 cm"},{"label":"Color principal","value":"Plateado"},{"label":"Modelo","value":"Corte 5.5\""},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Con tornillo ajustable","value":"Sí"},{"label":"Con reposa dedos","value":"Sí"}]'::jsonb,
  description = 'La Tijera de Corte 5.5" de Behmont es la herramienta de precisión ideal para peluqueros y barberos profesionales. Fabricada en acero inoxidable de alta calidad, ofrece un corte limpio y preciso en todo tipo de cabello. Su tamaño compacto la hace perfecta para detalles y acabados finos.

* Marca: Behmont
* Largo: 5.5 pulgadas
* Acero inoxidable de alta calidad
* Corte limpio y preciso
* Ideal para detalles y acabados
* Tornillo ajustable para tensión personalizada
* Para peluquería y barbería profesional
* Alta disponibilidad de stock'
where sku = '517-15-5.5';
update products set active = false, ml_item_id = null where sku = 'MLA3473086680';

-- 517-14 "Tijera de entresacar 6." <- MLA1841718123 "Tijera Entresacar 6 Pulgadas Acero Inox Peluquería Behmont Plateado"
update products set
  specs = '[{"label":"Material de la hoja","value":"Entresacadora"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Plateado"},{"label":"Forma","value":"Recta"},{"label":"Tipo","value":"De entresacar"},{"label":"Orientación de la mano","value":"Ambidiestro"},{"label":"Incluye estuche","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"16 cm"},{"label":"Color principal","value":"Plateado"},{"label":"Modelo","value":"Entresacar 6''"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Con tornillo ajustable","value":"Sí"},{"label":"Con reposa dedos","value":"Sí"}]'::jsonb,
  description = 'La Tijera de Entresacar 6" de Behmont es la herramienta indispensable para despeinar, texturizar y dar volumen al cabello. Sus dientes permiten entresacar capas con naturalidad, eliminando el peso sin perder la forma del corte. Acero inoxidable de alta durabilidad.

* Marca: Behmont
* Largo: 6 pulgadas
* Tijera de entresacar / dientes
* Acero inoxidable premium
* Texturizado y despeinado natural
* Elimina peso sin perder forma
* Para todo tipo de cabello
* Alta disponibilidad de stock'
where sku = '517-14';
update products set active = false, ml_item_id = null where sku = 'MLA1841718123';

-- MP-10 "Camilla portatil plegable 180 x 60 x 50-78 - Negro" <- MLA1829420185 "Camilla Portátil Plegable Estética 180x60 Negro Behmont Negro"
update products set
  specs = '[{"label":"Tipo de producto","value":"Camilla"},{"label":"Usos recomendados","value":"Masajes y estética a domicilio"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Altura","value":"60 cm"},{"label":"Es plegable","value":"Sí"},{"label":"Es portátil","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"1.8 m"},{"label":"Tipo de camilla de masajes","value":"Portátil"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"Portátil Negro"},{"label":"Ancho","value":"60 cm"},{"label":"Con orificio para la cara","value":"No"}]'::jsonb,
  description = 'La Camilla Portátil Plegable MP-10 de Behmont es la solución perfecta para profesionales que trabajan a domicilio o en múltiples locaciones. Liviana, plegable y resistente, se lleva a cualquier lado sin sacrificar calidad ni comodidad para el cliente.

* Marca: Behmont
* Portátil y plegable
* Dimensiones: 180 x 60 cm
* Altua regulable: 50 a 78 cm
* Tapizado negro resistente
* Estructura de aluminio liviana
* Ideal para masajistas a domicilio
* Fácil transporte y almacenamiento'
where sku = 'MP-10';
update products set active = false, ml_item_id = null where sku = 'MLA1829420185';

-- G2 "Camilla portatil plegable 185 x 60 x 60 - Soporta 150 kg - Blanco" <- MLA1829420187 "Camilla Portátil Plegable 185x60 - 150kg Blanco Behmont Blanco"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA1829420187';

-- LFJ-KM-3520 "Clipper para bebe inalambrico - Lubricante, cepillo de limpieza" <- MLA3642393094 "Clipper Para Bebe Inalambrico Con Accesorios Kemei Blanco"
update products set
  specs = '[{"label":"Accesorios incluidos","value":"2 peines guía,Aceite lubricante,Cable USB,Cepillo de limpieza"},{"label":"Voltaje de la batería","value":"12V"},{"label":"Marca","value":"Kemei"},{"label":"Tipo de pila","value":"Ion de litio"},{"label":"Color","value":"Blanco"},{"label":"Cantidad de peines","value":"2"},{"label":"Funciones","value":"Corte de pelo"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Tipos de cabezales","value":"Removible"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es marca destacada","value":"No"},{"label":"Es apta para bebés","value":"Sí"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es marca TOM","value":"No"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Blanco"},{"label":"Modelo","value":"KM-3520"},{"label":"Cantidad de posiciones","value":"2"},{"label":"Tipo de alimentación","value":"USB Recargable"},{"label":"Altura del paquete del seller","value":"21 cm"},{"label":"Largo del paquete del seller","value":"5 cm"},{"label":"Peso del paquete del seller","value":"587 g"},{"label":"Ancho del paquete del seller","value":"14 cm"},{"label":"SKU","value":"LFJ-KM-3520"},{"label":"IVA","value":"21 %"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La Kemei KM-3520 es una recortadora inalámbrica pensada para mantener el cabello de los bebés con una rutina práctica y cuidadosa. Su formato sin cable facilita el manejo y aporta mayor libertad de movimiento durante el uso.

Funciona con batería recargable de ion de litio y alimentación por USB, una combinación útil para quienes buscan una herramienta fácil de recargar en distintos entornos. También resulta apropiada para llevar en viajes, ya que su diseño portátil ayuda a usarla con comodidad fuera de casa.

Incluye dos peines guía que permiten elegir entre dos posiciones de uso según el resultado deseado. Esto ayuda a adaptar la longitud del cabello con mayor control y a trabajar de forma más ordenada en cada sesión.

Los cabezales removibles y lavables aportan practicidad en el mantenimiento diario, mientras que el cepillo de limpieza y el aceite lubricante facilitan el cuidado del equipo. El cable USB completa el contenido para que la recargada sea simple y directa.

Por sus características, es una opción útil para el cuidado personal de bebés y para quienes prefieren una herramienta sencilla de usar en casa. Su diseño inalámbrico, junto con los accesorios incluidos, ofrece una experiencia más cómoda y funcional.

La Kemei KM-3520 reúne portabilidad, recargada por USB y detalles de mantenimiento que ayudan a conservar su desempeño en el tiempo.'
where sku = 'LFJ-KM-3520';
update products set active = false, ml_item_id = null where sku = 'MLA3642393094';

-- XFJ-01A "Secador casco de pared - Estructura plegable" <- MLA3154435684 "Secador Capilar De Pared Estructura Extensible Profesional Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154435684-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154435684-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154435684-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154435684-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154435684-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154435684-6.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"XFJ-01A"},{"label":"Es cerámico","value":"No"},{"label":"Es iónico","value":"Sí"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"XFJ-01A"},{"label":"Cantidad de velocidades","value":"1"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"No"}]'::jsonb
where sku = 'XFJ-01A';
update products set active = false, ml_item_id = null where sku = 'MLA3154435684';

-- 25-YXH114 "Brocha para cabello - Mango madera" <- MLA3471132280 "Brocha Pelo Mango Madera Premium Peluquería Behmont Natural"
update products set
  specs = '[{"label":"Material del cuerpo","value":"Madera"},{"label":"Marca","value":"Behmont"},{"label":"Material de las cerdas","value":"Nylon suave"},{"label":"Cantidad de cepillos","value":"1"},{"label":"Tipo de cepillo","value":"Brocha para cabello"},{"label":"Color","value":"Natural"},{"label":"Material del mango","value":"Madera"},{"label":"Forma del cepillo","value":"Alargada"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Brocha Mango Madera Premium"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"}]'::jsonb,
  description = 'La Brocha de Cabello con Mango de Madera Premium de Behmont combina la funcionalidad de un accesorio de peluquería con el estilo artesanal de la madera natural. Ideal para barberías que cuidan la estética de cada detalle de su equipamiento.

* Marca: Behmont
* Mango de madera natural premium
* Cerdas suaves
* Aspecto artesanal y elegante
* Para peluquería y barbería de estilo
* Limpiar cabello post-corte
* Alta durabilidad
* El más elegante de la línea'
where sku = '25-YXH114';
update products set active = false, ml_item_id = null where sku = 'MLA3471132280';

-- LFJTXD-KM-8559 "Kit clipper + trimmer + shaver inalambrico - Lubricante, cepillo de limpieza, base carga y baterias (x2)" <- MLA1835431487 "Kit Clipper Trimmer Shaver Kemei Km-8559 2 Baterías Behmont"
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Incluye estuche","value":"No"},{"label":"Incluye rizadora","value":"No"},{"label":"Incluye secador de pelo","value":"No"},{"label":"Incluye planchita de pelo","value":"No"},{"label":"Es un kit de fábrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"KM-8559"},{"label":"Cantidad de piezas","value":"3"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'El Kit Kemei KM-8559 combina clipper, trimmer y shaver inalámbricos con 2 baterías intercambiables para jornadas sin interrupciones. Lubricante y cepillo incluidos. La autonomía que todo barbero profesional necesita.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-8559
* Incluye: clipper + trimmer + shaver
* 2 baterías intercambiables
* Jornada completa sin cortes
* Base de carga incluida
* Lubricante y cepillo de limpieza
* Autonomía máxima para barbería'
where sku = 'LFJTXD-KM-8559';
update products set active = false, ml_item_id = null where sku = 'MLA1835431487';

-- CFS-KM-6909 "Secador de pelo 900 W - 5 en 1 cabezas intercambiables" <- MLA1835443899 "Secador Pelo Kemei Km-6909 900w 5 En 1 Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Es cerámico","value":"Sí"},{"label":"Es iónico","value":"No"},{"label":"Es profesional","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"KM-6909"},{"label":"Potencia","value":"900 W"},{"label":"Cantidad de velocidades","value":"2"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"Sí"}]'::jsonb,
  description = 'El Secador Kemei KM-6909 5 en 1 incluye 5 cabezas intercambiables para secar, alisar, rizar, difuminar y modelar en un solo equipo. La herramienta todo-en-uno para estilistas que quieren versatilidad total.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-6909 | Potencia: 900W
* 5 en 1: 5 cabezas intercambiables
* Seca, alisa, riza, difumina y modela
* Un solo equipo para todo
* Tecnología cerámica
* Ideal para estilistas versátiles
* Para peluquería y uso personal'
where sku = 'CFS-KM-6909';
update products set active = false, ml_item_id = null where sku = 'MLA1835443899';

-- AC970 "Cafetera Express COFIX BAR 1.5 L. Espumador de leche. Presión 15 bares" <- MLA3203261992 "Cafetera Express Liliana Modelo 15 Bares" + MLA3164826878 "Cafetera Eléctrica Liliana Cofix Bar Eficiente Y Práctica Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3164826878-6.jpg"]'::jsonb
where sku = 'AC970';
update products set active = false, ml_item_id = null where sku = 'MLA3203261992';
update products set active = false, ml_item_id = null where sku = 'MLA3164826878';

-- KJT-VLKITATRD "Kit de herramientas 499 piezas - Con valija y atornillador eléctrico" <- MLA3191361860 "Kit 499 Herramientas Combinadas + Valija Metálica Con Ruedas Negro" + MLA3448462564 "Valija Kit De Herramientas Kanji Tools Kjt-vlkitatrd Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-6.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-7.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3191361860-8.jpg"]'::jsonb,
  specs = '[{"label":"Accesorios incluidos","value":"Herramientas combinadas variadas"},{"label":"Marca","value":"Kanji"},{"label":"Color","value":"Negro"},{"label":"Altura","value":"45 cm"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Es un kit de fábrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"17 cm"},{"label":"Modelo","value":"KJT-VLKITRD"},{"label":"Tipo de envase","value":"Maletín"},{"label":"Cantidad de piezas","value":"499"},{"label":"Peso","value":"11.4 kg"},{"label":"Ancho","value":"37 m"}]'::jsonb,
  description = 'El Kit De Herramientas Kanji Tools 499 Piezas es la solución ideal para quienes buscan un conjunto completo y versátil para sus proyectos. 

Con un diseño práctico en una valija, este producto permite un fácil transporte y almacenamiento, asegurando que todas las herramientas estén organizadas y al alcance de la mano.

Con un total de 499 elementos, este conjunto abarca una amplia gama de herramientas que satisfacen las necesidades tanto de aficionados como de profesionales.

Ya sea que estés comenzando en el mundo del bricolaje o seas un experto en la materia, este conjunto te proporcionará las herramientas necesarias para llevar a cabo tus proyectos con confianza.
No dejes pasar la oportunidad de equiparte con un producto que combina calidad, funcionalidad y un diseño pensado para el usuario.

Lo que necesitas saber
- Marca : Kanji
- Modelo : KJT-VLKITRD
- EAN : 7273731536688
- Piezas del set : 1 alicate de punta, 1 llave francesa , 1 llave ajustable pico de loro.
1 pinza de punta , 1 pinza , 9 llaves combinadas de 8 a 17 mm, 9 llaves hexagonales Alem de 1.5 a 10 mm.,15 llave tubo 1/4" (4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13, 14 mm).
,14 llave tubo 1/2" (8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30 mm).,2 conector llave tubo de 1/2" de 16 y 21 mm.,2 llave cricket 1/2" y 1/4".
,2 junta universal 1/2" y 1/4".
, 2 barra deslizante en T 1/2" y 1/4".
, 1 barra de extensión de 1/2" con accionamiento: 5"., 2 barra de extensión de 1/2" con accionamiento: 2", 4".
,1 extensor flexible 1/4".
- Destornilladores 14 : 5 planos (3x75 mm | 4x100 mm | 5x75 mm| 6x38 mm | 6x100 mm)., 5 philips (3x75 mm | 4x100 mm | 5x75 mm| 6x38 mm | 6x100 mm).
,2 planos aislados (8x150 mm | 4x100 mm)., 2 philips aislados (4x100 mm | 5,5x125 mm).
- Destornilladores de precisión 6 : 4 planos (1.4 | 1.8 | 2.4 | 3.0)., 2 philips (2.4 | 3.0).
- 1 mango adaptador para puntas.
- 1 porta puntas.
- 24 puntas para destornillador eléctrico.
- 2 grampas de nylon 90mm.
- 1 martillo.
- 1 tijera.
- 1 pinza pela cables.
- 1 cutter.
- 1 cinta aisladora.
- 1 nivel.
- 2 barras para pistola encoladora.
- 1 mango giratorio con accionamiento de 1/4" y 150 mm.
- 1 medidor de presión para neumáticos.
- 1 tester medidor de voltaje.
- 2 guantes de tela.
- 200 precintos.
- 172 cierres (tarugos, clavos, tornillos, alfileres).
- Medidas de la valija porta herramientas : Ancho 37 cm , Alto 45 cm, Profundidad 17 cm
- Peso: 11.4 Kg (cargada).
- Aleación cromo vanadio.
- Herramientas combinadas para realizar todo tipo de trabajos.
- 4 contenedores totalmente desmontables.
- Exterior de la valija métalico, con ruedas para facilitar su transporte.
- 1 Atornillador electrico KJT-AT121PB'
where sku = 'KJT-VLKITATRD';
update products set active = false, ml_item_id = null where sku = 'MLA3191361860';
update products set active = false, ml_item_id = null where sku = 'MLA3448462564';

-- C10 "Camilla articulada hidraulica 182 x 62 x 55-75 - Soporta 150 kg - Blanco" <- MLA3441651244 "Camilla Articulada Hidráulica 182x62 - 150kg Blanco Behmont"
update products set
  specs = '[{"label":"Tipo de producto","value":"Estética"},{"label":"Usos recomendados","value":"Masajes,estética y tratamientos estéticos"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Altura","value":"60 cm"},{"label":"Es plegable","value":"No"},{"label":"Es portátil","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"1.82 m"},{"label":"Tipo de camilla de masajes","value":"Portátil"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"Hidráulica Blanco"},{"label":"Ancho","value":"62 cm"},{"label":"Con orificio para la cara","value":"Sí"}]'::jsonb,
  description = 'La Camilla Articulada Hidráulica C10 de Behmont lleva la comodidad y funcionalidad a otro nivel. Sistema hidráulico para regular la altura de 55 a 75 cm, 182 cm de largo y capacidad de 150 kg. Para centros estéticos y clínicas que exigen lo mejor.

* Marca: Behmont
* Sistema hidráulico: altura de 55 a 75 cm
* Dimensiones: 182 x 62 cm
* Soporta hasta 150 kg
* Tapizado blanco premium
* Articulada para tratamientos complejos
* Para centros estéticos y clínicas
* Estructura robusta de acero'
where sku = 'C10';
update products set active = false, ml_item_id = null where sku = 'MLA3441651244';

-- SF-200 "Selladora Manual 20cm 220w Hierro Bolsas Behmont Verde Lima" <- MLA2489317902 "Termoselladoras Behmont Sf-200 Cuerpo De Hierro 20cm 220w"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA2489317902';

-- 25-JAY01 "Equipamientos - Exprimidor de citricos manual" <- MLA2205146912 "Exprimidor Manual De Cítricos Con Palanca Acero Inox Behmont Plateado"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA2205146912';

-- JA25-184 "Taburete giratorio con ruedas - Con respaldo - Negro" <- MLA2861719898 "Banqueta Taburete Con Respaldo Ecocuero Cómodo Cromado Negro Cromado Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2861719898-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2861719898-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2861719898-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2861719898-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2861719898-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2861719898-6.jpg"]'::jsonb,
  specs = '[{"label":"Color de la estructura","value":"Plateado"},{"label":"Marca","value":"BEHMONT"},{"label":"Color del asiento","value":"Negro"},{"label":"Profundidad","value":"40 cm"},{"label":"Incluye manual de ensamblado","value":"Sí"},{"label":"Incluye almohadón","value":"No"},{"label":"Es plegable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Cantidad de patas","value":"4"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima","value":"45 cm"},{"label":"Modelo","value":"JA25-184"},{"label":"Origen","value":"Brasil"},{"label":"Tipo de producto","value":"Banqueta"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Material del asiento","value":"Ecocuero"},{"label":"Cantidad de banquetas y bancos","value":"30"},{"label":"Acabado de la estructura","value":"Cromado"},{"label":"Materiales de la estructura","value":"Cromado"},{"label":"Estilo","value":"Moderno"},{"label":"Material del tapizado","value":"Ecocuero"},{"label":"Peso","value":"5 kg"},{"label":"Ancho","value":"33 cm"},{"label":"Con rotación de 360 grados","value":"Sí"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"No"},{"label":"Con respaldo","value":"Sí"},{"label":"Con pintura epoxi","value":"No"},{"label":"Con apoya pies","value":"No"},{"label":"Con baulera","value":"No"},{"label":"Con tapizado","value":"Sí"},{"label":"Con ruedas","value":"Sí"}]'::jsonb
where sku = 'JA25-184';
update products set active = false, ml_item_id = null where sku = 'MLA2861719898';

-- JA25-183 "Taburete giratorio con ruedas - Tapizado capitone - Negro" <- MLA2862108836 "Banqueta Taburete Capitoné Con Apoyapié Base Cromada Negro Cromado Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862108836-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862108836-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862108836-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862108836-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862108836-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862108836-6.jpg"]'::jsonb,
  specs = '[{"label":"Color de la estructura","value":"Plateado"},{"label":"Marca","value":"Behmont"},{"label":"Color del asiento","value":"Negro"},{"label":"Profundidad","value":"40 cm"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye almohadón","value":"No"},{"label":"Es plegable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima","value":"50 cm"},{"label":"Modelo","value":"JA25-183"},{"label":"Origen","value":"Argentina"},{"label":"Tipo de producto","value":"Banqueta"},{"label":"Requiere ensamblado","value":"No"},{"label":"Material del asiento","value":"Cuero ecológico"},{"label":"Cantidad de banquetas y bancos","value":"25"},{"label":"Acabado de la estructura","value":"Cromado"},{"label":"Materiales de la estructura","value":"Base cromada"},{"label":"Estilo","value":"Moderno"},{"label":"Material del tapizado","value":"Capitone"},{"label":"Peso","value":"6 kg"},{"label":"Ancho","value":"35 cm"},{"label":"Con rotación de 360 grados","value":"Sí"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"No"},{"label":"Con respaldo","value":"No"},{"label":"Con pintura epoxi","value":"No"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con baulera","value":"No"},{"label":"Con tapizado","value":"Sí"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La Banqueta Taburete Capitoné con Apoyapié Base Cromada Negro de Behmont es la elección perfecta para quienes buscan un toque moderno y funcional en su espacio. Con un diseño elegante y contemporáneo, este taburete se adapta a diversas decoraciones, desde cocinas hasta bares y oficinas.

Su estructura de base cromada garantiza estabilidad y durabilidad. El tapizado en cuero ecológico con acabado capitoné no solo aporta estilo, sino que también es fácil de limpiar y mantener, ideal para un uso diario.'
where sku = 'JA25-183';
update products set active = false, ml_item_id = null where sku = 'MLA2862108836';

-- JA25-185 "Taburete giratorio con ruedas - Negro" <- MLA2862043402 "Banqueta Taburete Con Apoyapié Ecocuero Cómodo Cromado Negro Cromado Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862043402-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862043402-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2862043402-3.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color del asiento","value":"Negro"},{"label":"Profundidad","value":"40 cm"},{"label":"Incluye manual de ensamblado","value":"Sí"},{"label":"Incluye almohadón","value":"No"},{"label":"Es plegable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Cantidad de patas","value":"4"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima","value":"45 cm"},{"label":"Modelo","value":"JA25-185"},{"label":"Origen","value":"Argentina"},{"label":"Tipo de producto","value":"Banqueta"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Material del asiento","value":"Ecocuero"},{"label":"Cantidad de banquetas y bancos","value":"25"},{"label":"Color de la estructura","value":"Negro y plateado"},{"label":"Acabado de la estructura","value":"Cromado"},{"label":"Materiales de la estructura","value":"Cromado"},{"label":"Estilo","value":"Moderno"},{"label":"Material del tapizado","value":"Ecocuero"},{"label":"Peso","value":"5 kg"},{"label":"Ancho","value":"33 cm"},{"label":"Con rotación de 360 grados","value":"Sí"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"No"},{"label":"Con respaldo","value":"Sí"},{"label":"Con pintura epoxi","value":"No"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con baulera","value":"No"},{"label":"Con tapizado","value":"Sí"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La Banqueta Taburete con Apoyapiés de la marca Behmont es la elección ideal para quienes buscan un toque moderno y funcional en su espacio. Con una altura máxima de 45 cm y un diseño elegante en ecocuero negro, se adapta perfectamente a cualquier ambiente, ya sea en el hogar o en un bar.

Su estructura cromada no solo aporta resistencia, sino que también garantiza un estilo contemporáneo. Con un peso de solo 5 kg, es fácil de mover y reubicar según tus necesidades. Además, su capacidad de rotación de 360 grados y altura ajustable la convierten en una opción versátil para diferentes usuarios.'
where sku = 'JA25-185';
update products set active = false, ml_item_id = null where sku = 'MLA2862043402';

