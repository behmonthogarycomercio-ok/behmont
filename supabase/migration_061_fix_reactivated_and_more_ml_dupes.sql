-- Migracion 061: dos correcciones sobre el trabajo de duplicados ML.
--
-- 1) BUG: 5 productos ya fusionados en migration_058 (Gotland, Uppland,
--    Halland, Oland, Heladera 3 puertas) se reactivaron solos: el sync
--    corrio una vez con ml_item_id todavia puesto (antes de que
--    migration_059 lo desvinculara) y el sync fuerza active=true en cada
--    fila que sigue vinculada. Los datos (fotos/specs) siguen intactos en
--    el distribuidor, solo hay que volver a desactivar el duplicado ML.
--
-- 2) Nuevos duplicados encontrados en un escaneo completo de los 168
--    productos activos con SKU estilo MercadoLibre contra el catalogo del
--    distribuidor (similitud de nombre + categoria + stock identico):
--    silla Spandau, rack 120.40 Negro, estante NB-210 Blanco, cepillo
--    cerdas duras, kit peines guia, pulverizador, kit atornillador y
--    heladera exhibidora 2 puertas (esta ultima con diferencia de 1
--    unidad de stock entre las dos filas -- 4 vs 5 -- probablemente por
--    una venta entre mediciones; el resto del match es exacto asi que se
--    incluye, pero avisar si el stock real difiere).

-- ── 1) Re-desactivar los 5 reactivados (datos ya estaban completos) ──
update products set active = false where sku in (
  'MLA1908152773','MLA1908154009','MLA1908156473','MLA1908175845','MLA1910440141'
);

-- YM-7/A-05 "Sillon de oficina Spandau - Cuero - Altura regulable - Negro" <- MLA1902624955 "Silla De Oficina Spandau Behmont 5 Ruedas Negro Cuero"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1902624955-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1902624955-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1902624955-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1902624955-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1902624955-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1902624955-6.jpg"]'::jsonb,
  specs = '[{"label":"Altura del respaldo","value":"60 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"SPANDAU"},{"label":"Materiales del relleno","value":"Espuma de alta densidad"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"110 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"YM-7"},{"label":"Tipo de silla de oficina","value":"Silla de oficina estándar"},{"label":"Ancho de la silla","value":"49 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"49 cm"},{"label":"Materiales de la estructura","value":"Metal y plástico"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Cuero"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La silla de oficina SPANDAU BEHMONT está pensada para acompañar jornadas de trabajo, estudio o tareas frente al escritorio con una postura más cómoda. Su diseño giratorio y la altura ajustable ayudan a adaptarla con facilidad a distintas rutinas de uso.

Cuenta con respaldo de 60 cm, apoyacabezas y apoyabrazos, lo que suma apoyo en momentos prolongados de trabajo. Como no se reclina, mantiene una propuesta práctica y sencilla para quienes prefieren una estructura estable.

El asiento mide 49 cm de ancho y 49 cm de profundidad, con una altura total que llega hasta 110 cm. También soporta hasta 120 kg, un dato útil para valorar su solidez en el uso cotidiano.

Su estructura combina metal y plástico, mientras que el relleno de espuma de alta densidad aporta una sensación más agradable al sentarse. Las cinco ruedas facilitan el desplazamiento y ayudan a moverse con libertad dentro del área de trabajo.

El modelo YM-7 requiere ensamblado e incluye manual para seguir el proceso con orden. Es una alternativa funcional para espacios de oficina o para quienes buscan una silla estándar con apoyo, movilidad y medidas equilibradas.'
where sku = 'YM-7/A-05';
update products set active = false, ml_item_id = null where sku = 'MLA1902624955';

-- 120.40-IN "Rack 200 x 120 x 40 inicial - 5 estantes - 100 kg por estante - Negro" <- MLA3644781174 "Rack Inicial Behmont 120.40-ib Acero 200x120x40 Negro"
update products set
  images = '["https://http2.mlstatic.com/D_649503-MLA114956073001_072026-O.webp","https://http2.mlstatic.com/D_851739-MLA114929353005_072026-O.webp","https://http2.mlstatic.com/D_866950-MLA113648507018_072026-O.webp","https://http2.mlstatic.com/D_764280-MLA114954324573_072026-O.jpg","https://http2.mlstatic.com/D_608620-MLA113671274710_072026-O.webp","https://http2.mlstatic.com/D_792470-MLA113670156838_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"40 cm"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Acabado","value":"Acero"},{"label":"Altura","value":"120 cm"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Incluye kit de instalación","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"200 cm"},{"label":"Fabricante","value":"BEHMONT"},{"label":"Material","value":"Acero"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Modelo","value":"120.40-I"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Altura del paquete del seller","value":"44 cm"},{"label":"Largo del paquete del seller","value":"14 cm"},{"label":"Peso del paquete del seller","value":"2935 g"},{"label":"Ancho del paquete del seller","value":"20 cm"},{"label":"SKU","value":"120.40-IN"},{"label":"Forma","value":"Rectangular"},{"label":"Tipo de estante","value":"De piso"},{"label":"Estilo","value":"Industrial"},{"label":"Unidades por pack","value":"1"},{"label":"IVA","value":"21 %"},{"label":"Peso","value":"100 kg"}]'::jsonb,
  description = 'Rack Inicial Behmont 120.40-IN pensado para sumar orden en espacios de trabajo, depósito o hogar. Su formato rectangular y su estética negra con estilo industrial ayudan a integrar la pieza en ambientes sobrios y funcionales.

Tiene 200 cm de largo, 120 cm de altura y 40 cm de profundidad, medidas que brindan una superficie amplia para ubicar mercaderías, cajas o elementos de uso frecuente. Al ser una estructura de acero, ofrece una presencia firme y resistente para organización cotidiana.

Soporta hasta 100 kg, dato útil para quienes necesitan una estantería pensada para carga moderada y orden estable. Esta capacidad permite aprovechar mejor el espacio sin depender de muebles livianos.

Requiere armado, por lo que resulta conveniente para usuarios que prefieren armar su estructura según las necesidades del lugar. El modelo 120.40-IN mantiene una propuesta directa y práctica, sin agregados innecesarios.

Por su tamaño, puede funcionar en áreas de guardado, talleres, locales o ambientes domésticos donde se busque organización visible y acceso rápido. El color negro ayuda a conservar una imagen prolija y uniforme.

Es una opción útil para quien valora una estantería amplia, de acero y con formato recto para ordenar mejor distintos elementos. Su diseño combina capacidad, presencia y uso versátil en una sola pieza.'
where sku = '120.40-IN';
update products set active = false, ml_item_id = null where sku = 'MLA3644781174';

-- NB-210-B "Estante modulo 200 x 90 x 30 - 5 estantes - 50 kg por estante - Encastrable - Blanco" <- MLA1911343677 "Estante Módulo Nb-210-b 200x90x30 Acero Esmerilado Blanco"
update products set
  images = '["https://http2.mlstatic.com/D_857607-MLA113644743512_072026-O.webp","https://http2.mlstatic.com/D_715519-MLA114926079877_072026-O.jpg","https://http2.mlstatic.com/D_706142-MLA113644624220_072026-O.webp","https://http2.mlstatic.com/D_864572-MLA113644566070_072026-O.jpg","https://http2.mlstatic.com/D_631350-MLA114926108721_072026-O.webp","https://http2.mlstatic.com/D_810107-MLA114925931001_072026-O.webp"]'::jsonb
where sku = 'NB-210-B';
update products set active = false, ml_item_id = null where sku = 'MLA1911343677';

-- 25-YXH122 "Cepillo cerdas duras - Mango madera" <- MLA3471119098 "Cepillo Cerdas Duras Mango Madera Peluquería Pro Behmont Natural"
update products set
  specs = '[{"label":"Material del cuerpo","value":"Madera"},{"label":"Marca","value":"Behmont"},{"label":"Material de las cerdas","value":"Cerdas Duras"},{"label":"Cantidad de cepillos","value":"1"},{"label":"Tipo de cepillo","value":"Cepillo de limpieza"},{"label":"Color","value":"Natural"},{"label":"Material del mango","value":"Madera"},{"label":"Forma del cepillo","value":"Alargada"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Cepillo Cerdas Duras Pro"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"}]'::jsonb,
  description = 'El Cepillo de Cerdas Duras Pro de Behmont con mango de madera es la herramienta de mantenimiento para peluqueros exigentes. Ideal para limpiar peines, brochas, difusores y superficies de trabajo. Alta firmeza y durabilidad.

* Marca: Behmont
* Cerdas duras resistentes
* Mango de madera de calidad
* Para limpieza de accesorios y superficies
* Alta firmeza de cerdas
* Para peluquería profesional
* Durabilidad superior
* Alta disponibilidad de stock'
where sku = '25-YXH122';
update products set active = false, ml_item_id = null where sku = 'MLA3471119098';

-- 25-YXH125 "Peines guia para maquina de corte - Magneticos - 1.5, 3 y 4.5 mm" <- MLA3471133544 "Kit 3 Peines Guía Magnéticos 1.5/3/4.5mm Clipper Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"Peines guía magnéticos"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Guía magnética de altura"},{"label":"Material","value":"PlásticoImán"},{"label":"Modelo","value":"Kit 3 Magnéticos 1.5-4.5mm"},{"label":"Usos recomendados","value":"barbería profesional"},{"label":"Formato de venta","value":"Pack"},{"label":"Unidades por pack","value":"3"},{"label":"Unidades por envase","value":"3"}]'::jsonb,
  description = 'El Kit de 3 Peines Guía Magnéticos de Behmont (1.5, 3 y 4.5 mm) amplía la cobertura de degradés cortos. Sistema magnético para un ajuste que no falla. Compatibles con clippers estándar para máxima versatilidad.

* Marca: Behmont
* Sistema magnético
* Alturas: 1.5 / 3 / 4.5 mm
* Cobertura de degradés cortos completa
* Ajuste seguro sin aflojarse
* Compatibles con clippers estándar
* Alta disponibilidad de stock
* Kit de 3 unidades'
where sku = '25-YXH125';
update products set active = false, ml_item_id = null where sku = 'MLA3471133544';

-- 25-YJ01 "Pulverizador pistola automatico" <- MLA3471132254 "Pulverizador Pistola Automático Barbería Profesional Behmont Blanco"
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs/descripcion)
update products set active = false, ml_item_id = null where sku = 'MLA3471132254';

-- 25-JAY08 "Kit Atornillador y Atornillador de Impacto Inalambricos - C/2 baterias de 1500 mAh" <- MLA1513008469 "Kit Atornillador Y At. Impacto Inalámbricos + 2 Bat Recargab Amarillo"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1513008469-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1513008469-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1513008469-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1513008469-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1513008469-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1513008469-6.jpg"]'::jsonb,
  specs = '[{"label":"Tipo de cabezal","value":"Intercambiable"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Encastre","value":"Destornilladores eléctricos y llaves de impacto"},{"label":"Con luz LED","value":"Sí"},{"label":"Accesorios incluidos","value":"2 baterías recargables"},{"label":"Tipo de batería","value":"Batería recargable"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Amarillo"},{"label":"Modelo detallado","value":"25-JAY08"},{"label":"Tipo de destornillador eléctrico","value":"Inalámbrico"},{"label":"Es inalámbrico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Profesional"},{"label":"Color principal","value":"Amarillo"},{"label":"Tamaño del mandril","value":"10 mm"},{"label":"Velocidad máxima de rotación","value":"4500 rpm"},{"label":"Modelo","value":"25-JAY08"},{"label":"Tipo de alimentación","value":"Batería recargable"},{"label":"Características del producto","value":"Sin vencimiento,No volable"},{"label":"Tipo de producto","value":"Destornillador"},{"label":"Voltaje","value":"98"}]'::jsonb,
  description = 'El Atornillador y Atornillador de Impacto Inalámbricos es una herramienta profesional diseñada para satisfacer las demandas de los más exigentes.

Atornillador.
Atornillador de Impacto.
Alimentación a batería recargable.
Libertad de movimiento.
Velocidad máxima de rotación de 4500 rpm.
Incluye dos baterías recargables.
Tamaño de mandril de 10 mm.

Ideal para proyectos en casa, reparaciones y trabajos más complejos, este destornillador se convierte en un aliado imprescindible.'
where sku = '25-JAY08';
update products set active = false, ml_item_id = null where sku = 'MLA1513008469';

-- FC-850-12 "Exhibidora vertical 850 L - 2 puertas - Con cenefa - 8 estantes" <- MLA1910436061 "Heladera Exhibidora Vertical 2 Puertas Con Cenefa Blanca Blanco"
update products set
  specs = '[{"label":"Altura del paquete del seller","value":"180 cm"},{"label":"Largo del paquete del seller","value":"55 cm"},{"label":"Peso del paquete del seller","value":"50000 g"},{"label":"Ancho del paquete del seller","value":"65 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Blanco"},{"label":"Profundidad","value":"59 cm"},{"label":"Cantidad de puertas","value":"2"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Altura","value":"1.92 m"},{"label":"Impuesto interno","value":"0 %"},{"label":"Es cervecera","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Blanco"},{"label":"Temperatura máxima","value":"6 °C"},{"label":"Temperatura mínima","value":"1 °C"},{"label":"Orientación","value":"Vertical"},{"label":"SKU","value":"FC-850-12"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"850 L"},{"label":"Ancho","value":"120 m"},{"label":"Con luz interior","value":"Sí"},{"label":"Con control de temperatura","value":"Sí"}]'::jsonb,
  description = 'La Heladera Exhibidora Vertical BEHMONT FC-850-12 está pensada para mantener bebidas frías a la vista y listas para servir en espacios de atención al público. Su formato de dos puertas facilita el acceso y permite organizar mejor el contenido en un equipo de gran capacidad.

Con un volumen de 850 L, ofrece espacio suficiente para acompañar la demanda de comercios, barras y locales gastronómicos. Su diseño vertical aprovecha mejor el espacio disponible y ayuda a mantener una presentación ordenada del producto almacenado.

Trabaja con un rango de temperatura que va de 1 °C a 6 °C, ideal para conservar cervezas y otras bebidas que requieren refrigeración constante. Además, incorpora control de temperatura, lo que permite ajustar el funcionamiento según la necesidad del uso diario.

La luz interior mejora la visibilidad del contenido y favorece una exhibición más clara, incluso en ambientes con poca iluminación. La cenefa blanca aporta una terminación prolija en el frente y suma presencia visual al conjunto.

En cuanto a medidas, presenta 1.92 m de alto y 59 cm de profundidad, dimensiones que ayudan a ubicarla con mayor precisión en el lugar destinado. Su formato vertical acompaña una distribución interna práctica para un uso comercial intenso.

Es una opción adecuada para quien busca una heladera cervecera amplia, funcional y con una presentación cuidada. Su combinación de capacidad, control térmico e iluminación interior la convierte en una solución eficiente para exhibir bebidas con orden y buena visibilidad.'
where sku = 'FC-850-12';
update products set active = false, ml_item_id = null where sku = 'MLA1910436061';

