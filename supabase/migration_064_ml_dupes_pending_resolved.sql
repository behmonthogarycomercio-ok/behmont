-- Migracion 064: 4 duplicados de MercadoLibre resueltos de los 8 que
-- habian quedado pendientes por evidencia ambigua. Se uso una señal
-- adicional: en TODAS las fusiones confirmadas hasta ahora, el precio de
-- ML siempre es igual o mayor al del distribuidor (nunca al reves). Eso
-- permitio confirmar 4 pares con precio dentro del rango tipico (16-34%
-- de margen) y features especificos que coinciden exacto, pese a que el
-- stock no calzaba perfecto en ninguno de los 4 (se detalla en cada caso).
-- Ya aplicado directamente con la service role key.

-- MP-31 "Lavacabeza de plastico - C/griferia y ducha - Base plastico" <- MLA1830026551 "Lavacabeza Cerámica Base Plástica Grifería Ducha Behmont"
-- CORREGIDO: esto NO era un duplicado. El titulo de ML dice "Cerámica"
-- (pileta de ceramica) mientras que MP-31 es "de plastico" (pileta y base
-- de plastico) -- cuerpos de material distinto, se coincidio solo por la
-- frase compartida "base plastica" sin notar la palabra "Cerámica".
-- Revertido: MLA1830026551 vuelve a active=true (no se le habia tocado
-- ningun dato a MP-31, asi que no hubo nada que deshacer ahi).
-- update products set active = false, ml_item_id = null where sku = 'MLA1830026551';
update products set active = true where sku = 'MLA1830026551';

-- LF-910 "Exhibidora vertical 910 L Full Glass - 2 puertas - Marco aluminio - 5 estantes - Negro" <- MLA3640794968 "Heladera Exhibidora Vertical 2 Puerta Full Glass Negra Negro"
-- Heladera 2 puertas Full Glass (precio +34%, Full Glass+2 puertas+Negro exacto; stock 45 vs 42)
update products set
  specs = '[{"label":"Altura del paquete del seller","value":"180 cm"},{"label":"Largo del paquete del seller","value":"55 cm"},{"label":"Peso del paquete del seller","value":"37400 g"},{"label":"Ancho del paquete del seller","value":"65 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"60 cm"},{"label":"Cantidad de puertas","value":"2"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Altura","value":"2.01 m"},{"label":"Impuesto interno","value":"0 %"},{"label":"Es cervecera","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Temperatura máxima","value":"6 °C"},{"label":"Temperatura mínima","value":"1 °C"},{"label":"Modelo","value":"LF-910"},{"label":"Orientación","value":"Vertical"},{"label":"SKU","value":"LF-910"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"910 L"},{"label":"Ancho","value":"1.1 m"},{"label":"Con luz interior","value":"Sí"},{"label":"Con control de temperatura","value":"Sí"}]'::jsonb,
  description = 'La heladera exhibidora vertical BEHMONT LF-910 está pensada para conservar bebidas a la vista y mantener una presentación ordenada en espacios de atención al público. Sus dos puertas de vidrio facilitan el acceso y ayudan a mostrar el contenido con claridad.

Su formato vertical permite aprovechar mejor el espacio disponible sin perder capacidad de guardado. Con 110 cm de ancho, 60 cm de profundidad y 2,01 m de alto, ofrece 910 L para organizar botellas y latas con comodidad.

Este equipo trabaja con un rango de temperatura que va de 1 °C a 6 °C, lo que resulta útil para mantener bebidas frías en servicio continuo. El control de temperatura aporta un ajuste sencillo según el tipo de producto que se quiera conservar.

La luz interior mejora la visibilidad del contenido y contribuye a una exhibición más clara durante toda la jornada. Esto facilita la selección rápida por parte de clientes y también la revisión del stock visible por parte del personal.

Su terminación negra le da una presencia sobria y profesional, adecuada para barras, salones, cafeterías y locales gastronómicos. La orientación vertical suma practicidad cuando se busca combinar capacidad, orden y buena lectura del contenido en un mismo equipo.

BEHMONT LF-910 reúne capacidad, control térmico y visibilidad en una solución pensada para bebidas de uso frecuente. Es una opción funcional para quienes necesitan exhibir y conservar con una misma heladera.'
where sku = 'LF-910';
update products set active = false, ml_item_id = null where sku = 'MLA3640794968';

-- LF-1440 "Exhibidora vertical 1440 L Full Glass - 3 puertas - Marco aluminio - 5 estantes - Negro" <- MLA3640757526 "Heladera Exhibidora Vertical 3 Puerta Full Glass Negra Negro"
-- Heladera 3 puertas Full Glass (precio +19%, Full Glass+3 puertas exacto; stock 4 vs 2. Se descarto MT42 pese a stock exacto porque no es Full Glass y su precio da al reves)
update products set
  specs = '[{"label":"Altura del paquete del seller","value":"180 cm"},{"label":"Largo del paquete del seller","value":"55 cm"},{"label":"Peso del paquete del seller","value":"50000 g"},{"label":"Ancho del paquete del seller","value":"65 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"60 cm"},{"label":"Cantidad de puertas","value":"3"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Altura","value":"2.01 m"},{"label":"Impuesto interno","value":"0 %"},{"label":"Es cervecera","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Temperatura máxima","value":"6 °C"},{"label":"Temperatura mínima","value":"1 °C"},{"label":"Modelo","value":"LF-1440"},{"label":"Orientación","value":"Vertical"},{"label":"SKU","value":"LF-1440"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"1440 L"},{"label":"Ancho","value":"1.68 m"},{"label":"Con luz interior","value":"Sí"},{"label":"Con control de temperatura","value":"Sí"}]'::jsonb,
  description = 'La Heladera Exhibidora Vertical BEHMONT LF-1440 está pensada para mantener bebidas frías y bien visibles en espacios de atención al público. Su diseño de tres puertas con frente vidriado facilita la exposición del contenido y ayuda a aprovechar mejor el área disponible.

Con formato vertical, ofrece una capacidad de 1440 L, ideal para quienes necesitan una solución amplia para conservar y mostrar gran cantidad de botellas o latas. Sus medidas de 1,68 m de ancho, 60 cm de profundidad y 2,01 m de alto permiten ubicarla con criterio en salones, barras o áreas de exhibición.

El rango de temperatura, entre 1 °C y 6 °C, permite conservar las bebidas en una condición fresca y agradable para el servicio. El control de temperatura suma precisión para adaptar el funcionamiento a las necesidades del momento.

La luz interior mejora la visibilidad del contenido y aporta una presentación más clara durante la jornada. Este detalle resulta útil cuando se busca reconocer rápidamente cada sector sin abrir de forma innecesaria las puertas.

Su estructura en color negro ofrece una imagen sobria y fácil de integrar en distintos entornos comerciales. Por su capacidad y distribución, es una opción adecuada para bares, minimercados, restaurantes y otros espacios donde la exhibición de bebidas forma parte del trabajo diario.

BEHMONT propone aquí una cervecera vertical de gran presencia, con desempeño orientado a la conservación y a la exhibición simultáneas. El resultado es un equipo práctico para ordenar, enfriar y mostrar bebidas con buena lectura visual.'
where sku = 'LF-1440';
update products set active = false, ml_item_id = null where sku = 'MLA3640757526';

-- 4300FG "Exhibidora vertical 417 L Full Glass - 4 estantes - Parrilas cromadas - Negro" <- MLA3637385756 "Heladera Exhibidora Vertical 1 Puerta Full Glass Negra Negro"
-- Heladera 1 puerta Full Glass (precio +17%, Full Glass+Negro, tamano chico acorde a 1 puerta; stock 1 vs 3)
update products set
  images = '["https://http2.mlstatic.com/D_697533-MLA114862756431_072026-O.webp","https://http2.mlstatic.com/D_992883-MLA114863248177_072026-O.jpg","https://http2.mlstatic.com/D_969108-MLA113588385082_072026-O.jpg","https://http2.mlstatic.com/D_852658-MLA113587852892_072026-O.jpg","https://http2.mlstatic.com/D_667218-MLA113586223418_072026-O.webp","https://http2.mlstatic.com/D_985902-MLA113586607214_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Altura del paquete del seller","value":"180 cm"},{"label":"Largo del paquete del seller","value":"55 cm"},{"label":"Peso del paquete del seller","value":"50000 g"},{"label":"Ancho del paquete del seller","value":"65 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Profundidad","value":"60 cm"},{"label":"Cantidad de puertas","value":"1"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Altura","value":"2.01 m"},{"label":"Impuesto interno","value":"0 %"},{"label":"Es cervecera","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Temperatura máxima","value":"6 °C"},{"label":"Temperatura mínima","value":"1 °C"},{"label":"Modelo","value":"LF-470"},{"label":"Orientación","value":"Vertical"},{"label":"SKU","value":"LF-470"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"470 L"},{"label":"Ancho","value":"60 cm"},{"label":"Con luz interior","value":"Sí"},{"label":"Con control de temperatura","value":"Sí"}]'::jsonb,
  description = 'La heladera exhibidora vertical BEHMONT LF-470 está pensada para mantener bebidas frías y visibles en un solo equipo. Su frente vidriado y su diseño de una puerta facilitan la exhibición del contenido con una presentación prolija y ordenada.

Con una capacidad de 470 litros, ofrece espacio suficiente para organizar productos de manera práctica en comercios, barras, restaurantes o áreas de atención al público. Sus medidas de 60 cm de ancho, 60 cm de profundidad y 201 cm de alto permiten aprovechar bien el espacio en vertical.

El control de temperatura ayuda a mantener el interior dentro de un rango de 1 °C a 6 °C, adecuado para conservar bebidas listas para servir. Esa regulación aporta estabilidad y permite ajustar el funcionamiento según la necesidad del uso diario.

La luz interior mejora la visibilidad del contenido y hace más fácil identificar lo almacenado sin abrir la puerta con frecuencia. Esto suma comodidad en momentos de atención continua y favorece una exhibición más clara de cada producto.

Su formato vertical y su terminación en negro brindan una presencia sobria, fácil de integrar en distintos ambientes comerciales. Es una opción práctica para quienes buscan capacidad, buena visualización y una conservación constante en un mismo equipo.'
where sku = '4300FG';
update products set active = false, ml_item_id = null where sku = 'MLA3637385756';

