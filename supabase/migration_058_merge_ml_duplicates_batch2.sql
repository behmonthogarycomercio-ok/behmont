-- Migracion 058: fusiona 44 productos duplicados adicionales entre el
-- catalogo del distribuidor y el sync de MercadoLibre, mismo criterio y
-- tratamiento que migration_057 (transferir fotos/specs/descripcion
-- faltantes del lado ML a la fila del distribuidor, desactivar la fila
-- ML duplicada). Deteccion por similitud de nombre + verificacion manual
-- (coincidencia exacta de stock, precio o codigo de modelo en la mayoria
-- de los casos). Se corrigieron varios emparejamientos que el algoritmo
-- automatico habia hecho mal por nombres genericos parecidos (ej. varios
-- sillones peluquero distintos que comparten casi todas las palabras).

-- 25-YXH116 "Gorro termico aluminio para tratamientos capilares" <- MLA1829432587 "Gorro Térmico Aluminio Tratamientos Capilares Peluquería Gris"
update products set
  specs = '[{"label":"Marca","value":"Gorro"},{"label":"Material del gorro","value":"Aluminio"},{"label":"Color","value":"Gris"},{"label":"Usos recomendados","value":"Tratamientos"},{"label":"Incluye aguja","value":"No"},{"label":"Es eléctrico","value":"No"},{"label":"Es perforado","value":"No"},{"label":"Es reutilizable","value":"Sí"},{"label":"Es térmico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Gris"},{"label":"Modelo","value":"Gorro Térmico"},{"label":"Tipo de alimentación","value":"Operación manual"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"},{"label":"Voltaje","value":"0V"}]'::jsonb,
  description = 'El Gorro Térmico de Aluminio de Behmont potencia cualquier tratamiento capilar al retener el calor y maximizar la absorción de productos. Se usa junto a secador o vaporizador para acelerar mascarillas, tintes y tratamientos de nutrición.

* Marca: Behmont
* Material: Aluminio térmico
* Retiene el calor del secador o vaporizador
* Potencia la absorción de mascarillas
* Para tintes, tratamientos y nutrición
* Desechable para higiene total
* Precio accesible por unidad
* Ideal para compra por mayor'
where sku = '25-YXH116';
update products set active = false where sku = 'MLA1829432587';

-- 517-8 "Lavacabeza portatil - C/tacho y grifería" <- MLA1830036415 "Lavacabeza Portátil Con Tacho Y Grifería Profesional Behmont"
update products set
  specs = '[{"label":"Accesorios incluidos","value":"Grifería y tacho recolector"},{"label":"Marca","value":"BEHMONT"},{"label":"Es monomando","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Mobiliario de peluquería"},{"label":"Modelo","value":"517-8"},{"label":"Color de la bacha","value":"Negro"},{"label":"Material de la bacha","value":"Plástico"},{"label":"Color de la estructura","value":"Negro"},{"label":"Material de la estructura","value":"Plástico"},{"label":"Color del tapizado","value":"Negro"},{"label":"Material del tapizado","value":"PVC"},{"label":"Con bacha reclinable","value":"Sí"}]'::jsonb,
  description = 'El Lavacabeza Portátil Premium de Behmont incluye tacho recolector y grifería, permitiendo usarlo sin conexión a desagüe. Ideal para peluquerías a domicilio, eventos o cualquier espacio donde no haya instalación de agua.

* Marca: Behmont
* Portátil con tacho recolector
* Grifería incluida
* No requiere conexión a desagüe
* Ideal para peluquería a domicilio
* Para eventos y trabajos en exteriores
* Autónomo e independiente
* Máxima versatilidad'
where sku = '517-8';
update products set active = false where sku = 'MLA1830036415';

-- 611 "Silla de oficina Gotland - Tela mesh - Altura regulable - Negro" <- MLA1908152773 "Silla De Oficina Gotland Tela Mesh Behmont Negro Tela Mesh"
update products set
  specs = '[{"label":"Altura del respaldo","value":"60 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"611"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"142 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"611"},{"label":"Tipo de silla de oficina","value":"CONRUEDAS"},{"label":"Ancho de la silla","value":"60 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"70 cm"},{"label":"Altura del paquete del seller","value":"40 cm"},{"label":"Largo del paquete del seller","value":"13 cm"},{"label":"Peso del paquete del seller","value":"17000 g"},{"label":"Ancho del paquete del seller","value":"30 cm"},{"label":"SKU","value":"611"},{"label":"Materiales de la estructura","value":"Hierro"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Tela Mesh"},{"label":"IVA","value":"21 %"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La silla de oficina GOTLAND de BEHMONT está pensada para acompañar jornadas de trabajo, estudio o uso en casa con una postura más cómoda. Su diseño ergonómico ayuda a sostener mejor el cuerpo durante períodos prolongados frente al escritorio.

El respaldo de tela mesh favorece una sensación más fresca y ligera, mientras el relleno de espuma aporta apoyo al sentarse. Con una altura de respaldo de 60 cm y un ancho de 60 cm, ofrece un formato equilibrado para quienes buscan comodidad sin ocupar demasiado espacio.

Su estructura de hierro brinda firmeza al conjunto y soporta hasta 120 kg, lo que la convierte en una opción confiable para uso diario. Además, cuenta con altura ajustable y giro, dos funciones muy útiles para adaptar la silla a distintas mesas y rutinas de trabajo.

También incorpora apoyabrazos para sumar descanso a los brazos durante el uso continuado. No incluye apoyacabezas, apoya pies ni respaldo reclinable, por lo que mantiene una propuesta simple y funcional, enfocada en la practicidad.

El asiento tiene una profundidad de 70 cm y la altura total puede llegar a 142 cm, medidas que ayudan a entender mejor su presencia en el ambiente. Requiere armado y está orientada a quienes valoran una silla estable, cómoda y con estética sobria para el día a día.'
where sku = '611';
update products set active = false where sku = 'MLA1908152773';

-- BX-3099B-2 "Sillon barbero hidraulico Apex - C/reposapies - Negro" <- MLA3443909816 "Sillón Barbero Hidráulico Apex Reposapies Negro Behmont Negro Tapizado Redonda"
update products set
  specs = '[{"label":"Tipo de respaldo","value":"Tapizado"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"BEHMONT"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Fabricante","value":"Behmont"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"Apex"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'El Sillón Barbero Hidráulico Apex de Behmont es la elección ideal para barberías y peluquerías profesionales que buscan comodidad, diseño y durabilidad. Su sistema hidráulico permite regular la altura con facilidad, adaptándose a cualquier profesional. Incluye reposapies integrado y tapizado premium en color negro.

* Marca: Behmont
* Modelo: Apex
* Color: Negro
* Sistema hidráulico de altura regulable
* Reposapies integrado
* Tapizado resistente y fácil de limpiar
* Base circular estable
* Ideal para barbería y peluquería profesional

Invertí en equipamiento de calidad para tu negocio. El Apex combina estética moderna con funcionalidad de nivel profesional.'
where sku = 'BX-3099B-2';
update products set active = false where sku = 'MLA3443909816';

-- C05 "Silla de oficina Uppland - Tela mesh - Altura regulable - Negro" <- MLA1908156473 "Silla De Oficina Uppland De Tela Mesh Behmont Negro Tela Mesh"
update products set
  specs = '[{"label":"Altura del respaldo","value":"60 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"C05"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"142 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"611"},{"label":"Tipo de silla de oficina","value":"CONRUEDAS"},{"label":"Ancho de la silla","value":"60 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"70 cm"},{"label":"Altura del paquete del seller","value":"78 cm"},{"label":"Largo del paquete del seller","value":"50 cm"},{"label":"Peso del paquete del seller","value":"17000 g"},{"label":"Ancho del paquete del seller","value":"60 cm"},{"label":"SKU","value":"C05"},{"label":"Materiales de la estructura","value":"Hierro"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Tela Mesh"},{"label":"IVA","value":"21 %"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'Esta silla BEHMONT está pensada para acompañar jornadas de trabajo, estudio o uso diario frente al escritorio con una postura más cómoda. Su diseño en tela mesh favorece la ventilación y ayuda a mantener una sensación fresca durante más tiempo.

El respaldo de 60 cm y el apoyacabezas aportan soporte en la zona superior del cuerpo, mientras el relleno de espuma suma suavidad al asiento. La forma ergonómica busca acompañar mejor la postura en tareas prolongadas sin perder practicidad.

Cuenta con altura ajustable y giro de 360 grados, dos funciones que facilitan adaptarse a distintas mesas y moverse con soltura entre actividades. También incorpora ruedas para desplazarse con mayor fluidez dentro del espacio de trabajo.

La estructura de hierro aporta firmeza y estabilidad, con una carga máxima soportada de 120 kg. Sus medidas de 60 cm de ancho y 70 cm de profundidad ayudan a ubicarla con facilidad en escritorios y ambientes de uso frecuente.

Con altura total de hasta 142 cm, esta silla ofrece una presencia equilibrada y funcional para quienes buscan comodidad sin elementos innecesarios. Los apoyabrazos suman descanso en brazos y hombros, aunque no son ajustables ni incorpora apoya pies.

Es una opción práctica para quienes valoran una silla con respaldo alto, ventilación en el contacto y ajustes esenciales para el día a día. Su conjunto prioriza confort, movilidad y soporte en una propuesta clara para el hogar o el trabajo.'
where sku = 'C05';
update products set active = false where sku = 'MLA1908156473';

-- A985 "Silla de oficina Pankow - Tela mesh - Altura regulable - Negro" <- MLA1902564507 "Silla De Oficina Pankow Behmont Tela Mesh Negro Mesh"
update products set
  specs = '[{"label":"Altura del respaldo","value":"50 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"PANKOW"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Incluye manual de ensamblado","value":"Sí"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"120 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"A985"},{"label":"Tipo de silla de oficina","value":"Silla de oficina"},{"label":"Ancho de la silla","value":"45 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"45 cm"},{"label":"Materiales de la estructura","value":"Metal y plástico"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Mesh"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La silla de oficina Pankow Behmont está pensada para acompañar jornadas de trabajo o estudio con una postura más cómoda y estable. Su diseño ergonómico y el tapizado mesh ayudan a mantener una sensación fresca durante el uso diario.

Cuenta con estructura de metal y plástico, relleno de espuma y un respaldo de 50 cm de alto que brinda apoyo en la zona dorsal. El asiento tiene 45 cm de profundidad y 45 cm de ancho, medidas que favorecen una posición cómoda en tareas prolongadas.

Incorpora altura ajustable, giro y ruedas para facilitar el movimiento dentro del área de trabajo. También incluye apoyabrazos para sumar apoyo adicional en la rutina, manteniendo una postura más relajada frente al escritorio.

Con una altura máxima de 120 cm y capacidad de soporte de hasta 120 kg, ofrece una propuesta práctica para distintos usuarios que buscan una silla funcional y de aspecto sobrio. El color negro aporta versatilidad y se adapta con facilidad a ambientes laborales o de estudio.

Su formato requiere armado y trae manual de ensamblado, lo que facilita el proceso de preparación en casa o en el lugar de trabajo. El conjunto está orientado a quienes valoran comodidad, movilidad y un diseño discreto que se integra sin esfuerzo al entorno.

La Pankow Behmont A985 reúne materiales resistentes, ventilación en el respaldo y funciones útiles para el uso cotidiano, convirtiéndose en una opción confiable para renovar el puesto de trabajo.'
where sku = 'A985';
update products set active = false where sku = 'MLA1902564507';

-- JA25-180 "Sillon peluquero hidraulico Orbit - C/reposapies - Base cuadrada - Negro" <- MLA3013467880 "Sillón Peluquero Orbit Hidráulico, Reclinable Y Reposapiés Negro Reclinable Redonda"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013467880-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013467880-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013467880-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013467880-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013467880-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013467880-6.webp"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"BEHMONT"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Modelo","value":"Orbit"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb
where sku = 'JA25-180';
update products set active = false where sku = 'MLA3013467880';

-- SF-300 "Equipamientos - Selladora manual 30 cm 280 W - Hierro" <- MLA3481752068 "Selladora Manual 30cm 280w Hierro Bolsas Behmont Verde Lima"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Verde lima"},{"label":"Tipo de selladora","value":"Selladora manual de calor"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"selladora de bolsas"},{"label":"Modelo","value":"SF-300"},{"label":"Potencia","value":"280 W"},{"label":"Largo de sellado","value":"30 cm"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'La Selladora Manual de 30cm de Behmont es la opción intermedia para sellar bolsas de mayor tamaño. Estructura de hierro robusta y barra de sellado de 30cm. Ideal para comercios que envasan productos de distintos tamaños con sello hermético.

* Marca: Behmont
* Largo de sellado: 30 cm
* Potencia: 280 W
* Estructura de hierro robusta
* Sellado hermético por calor
* Para bolsas medianas y grandes
* Para comercios y almacenes
* Operación simple por palanca'
where sku = 'SF-300';
update products set active = false where sku = 'MLA3481752068';

-- BX-2947-2 "Sillon barbero hidraulico Vertex - C/apoyacabeza y reposapies - Negro" <- MLA3443909814 "Sillón Barbero Hidráulico Vertex Apoyacabeza Reposapies Neg. Negro Tapizado Reclinable Redonda"
update products set
  specs = '[{"label":"Tipo de respaldo","value":"Tapizado reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"Behmont"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Fabricante","value":"Behmont"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"Vertex"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'El Sillón Barbero Vertex de Behmont es una pieza exclusiva para barberías de alto nivel. Su diseño sofisticado con apoyacabeza y reposapies, sumado al mecanismo reclinable y sistema hidráulico de precisión, lo convierten en un equipamiento premium.

* Marca: Behmont
* Modelo: Vertex
* Apoyacabeza ajustable
* Reposapies retráctil
* Reclinable multiposición
* Sistema hidráulico premium
* Tapizado negro de alta resistencia
* Diseño exclusivo para barbería'
where sku = 'BX-2947-2';
update products set active = false where sku = 'MLA3443909814';

-- SF-400 "Equipamientos - Selladora manual 40 cm 480 W - Hierro" <- MLA3481752060 "Selladora Manual 40cm 480w Hierro Bolsas Behmont Verde Lima"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Verde lima"},{"label":"Tipo de selladora","value":"Selladora manual de calor"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"selladora de bolsas"},{"label":"Modelo","value":"SF-400"},{"label":"Potencia","value":"480 W"},{"label":"Largo de sellado","value":"40 cm"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'La Selladora Manual de 40cm de Behmont es la de mayor capacidad de la línea, para sellar bolsas grandes en un solo movimiento. Estructura de hierro reforzada y 480W de potencia. Para comercios que envasan grandes volúmenes con sello perfecto.

* Marca: Behmont
* Largo de sellado: 40 cm
* Potencia: 480 W
* Estructura de hierro reforzada
* Sellado hermético por calor
* Para bolsas grandes
* Para alto volumen de envasado
* Operación simple por palanca'
where sku = 'SF-400';
update products set active = false where sku = 'MLA3481752060';

-- 25-YXH105 "Alfombra antideslizante barberia Supreme - Cuadrados imantados" <- MLA1827736223 "Alfombra Antideslizante Barbería Supreme Cuadros Imantados Rojo"
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Estilo de la alfombra","value":"Modular profesional"},{"label":"Color","value":"Rojo"},{"label":"Diseño de la tela","value":"Cuadros imantados"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Multicolor"},{"label":"Materiales","value":"EVA premium"},{"label":"Modelo","value":"Supreme"},{"label":"Ambientes recomendados","value":"Barbería y peluquería"}]'::jsonb,
  description = 'La Alfombra Antideslizante Supreme de Behmont cuenta con cuadros imantados que permiten armar configuraciones personalizadas según el espacio de tu barbería. Fácil de limpiar, antideslizante y de alta resistencia al tráfico profesional.

* Marca: Behmont
* Modelo: Supreme
* Cuadros imantados modulares
* Armado personalizable
* Antideslizante
* Alta resistencia al tráfico
* Fácil limpieza
* Para barberías con diseño propio'
where sku = '25-YXH105';
update products set active = false where sku = 'MLA1827736223';

-- HB-4 "Silla de oficina Halland - Cuero - Altura regulable - Negro" <- MLA1908154009 "Silla De Oficina Halland De Cuero Behmont Negro Cuero"
update products set
  specs = '[{"label":"Altura del respaldo","value":"60 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"HB-4"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"142 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"611"},{"label":"Tipo de silla de oficina","value":"CONRUEDAS"},{"label":"Ancho de la silla","value":"60 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"70 cm"},{"label":"Altura del paquete del seller","value":"79 cm"},{"label":"Largo del paquete del seller","value":"12 cm"},{"label":"Peso del paquete del seller","value":"17000 g"},{"label":"Ancho del paquete del seller","value":"50 cm"},{"label":"SKU","value":"HB-4"},{"label":"Materiales de la estructura","value":"Hierro"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Cuero"},{"label":"IVA","value":"21 %"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'Pensada para quienes necesitan una silla de oficina cómoda y firme durante la jornada, la HALLAND de BEHMONT combina cuero y estructura de hierro para ofrecer una presencia sobria y funcional en el espacio de trabajo. Su diseño con ruedas y giro facilita moverse entre tareas sin perder fluidez.

El respaldo de 60 cm, junto con el apoyacabezas y el relleno de espuma, acompaña mejor la postura en uso prolongado. Además, su carácter ergonómico ayuda a mantener una posición más cómoda cuando se alternan reuniones, estudio o trabajo frente al escritorio.

Cuenta con altura regulable y una altura total que puede llegar a 142 cm, lo que permite adaptarla mejor a distintas mesas y preferencias de uso. El asiento ofrece una profundidad de 70 cm y un ancho general de 60 cm, medidas que aportan amplitud para sentarse con mayor soltura.

Los apoyabrazos están presentes para sumar descanso en brazos y hombros, aunque no cuentan con ajuste independiente. También soporta hasta 120 kg, un dato útil para valorar su uso en entornos domésticos o de oficina donde se busca una silla resistente.

Su armado es necesario antes de comenzar a usarla, y no incorpora reclinado del respaldo ni apoya pies. En conjunto, es una opción pensada para quienes valoran una silla con ruedas, giro, apoyacabezas y materiales que transmiten solidez.

La HALLAND modelo HB-4 reúne comodidad, soporte y practicidad en una propuesta adecuada para espacios de trabajo donde importa sentarse mejor y mover la silla con facilidad. Es una alternativa funcional para oficina, estudio o escritorio personal.'
where sku = 'HB-4';
update products set active = false where sku = 'MLA1908154009';

-- 25-YXH121 "Cepillo cerdas duras - Mango madera" <- MLA3471132264 "Cepillo Cerdas Duras Mango Madera Barbería Behmont Natural"
update products set
  specs = '[{"label":"Material del cuerpo","value":"Madera"},{"label":"Marca","value":"Behmont"},{"label":"Material de las cerdas","value":"Cerdas Duras"},{"label":"Cantidad de cepillos","value":"1"},{"label":"Tipo de cepillo","value":"Cepillo de limpieza herramientas"},{"label":"Color","value":"Natural"},{"label":"Material del mango","value":"Madera"},{"label":"Forma del cepillo","value":"Alargada"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Cepillo Cerdas Duras Barber"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"}]'::jsonb,
  description = 'El Cepillo de Cerdas Duras con Mango de Madera de Behmont está pensado para remover el cabello, polvo y residuos de las navajas, clippers y tijeras. Sus cerdas de alta firmeza limpian los instrumentos en profundidad para un mantenimiento óptimo.

* Marca: Behmont
* Cerdas duras de alta firmeza
* Mango de madera resistente
* Para limpiar herramientas de corte
* Limpieza profunda de navajas y clippers
* Durabilidad garantizada
* Indispensable en mantenimiento de herramientas
* Alta disponibilidad de stock'
where sku = '25-YXH121';
update products set active = false where sku = 'MLA3471132264';

-- 25-YXH129 "Peine pua fibra de carbono N8612" <- MLA1841130185 "Peine Púa Fibra De Carbono N8612 Barbería Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"Peine de púa"},{"label":"Es anti-frizz","value":"Sí"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Dar volumen y textura"},{"label":"Material","value":"Fibra de carbono"},{"label":"Modelo","value":"N8612"},{"label":"Usos recomendados","value":"Peluquería afro y barbería"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"}]'::jsonb,
  description = 'El Peine de Púa de Fibra de Carbono N8612 de Behmont está diseñado para dar volumen, textura y estilo afro o con cuerpo. Sus dientes espaciados levantan el cabello sin enredarlo. Fibra de carbono resistente al calor y antiestática.

* Marca: Behmont
* Diseño de púa para volumen
* Fibra de carbono
* Antiestático
* Para cabello afro y con cuerpo
* Levanta sin enredar
* Resistente al calor
* Para barbería y uso personal'
where sku = '25-YXH129';
update products set active = false where sku = 'MLA1841130185';

-- JA25-182 "Sillon barbero hidraulico Summit - C/reposapies - Negro" <- MLA3016766284 "Sillón Peluquero Hidráulico Summit Apoyacabezas Y Reposapiés Negro Reclinable Redonda"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3016766284-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3016766284-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3016766284-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3016766284-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3016766284-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3016766284-6.webp"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"BEHMONT"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"Summit"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb
where sku = 'JA25-182';
update products set active = false where sku = 'MLA3016766284';

-- 517-9 "Lavacabeza portatil - C/griferia" <- MLA3443909812 "Lavacabeza Portátil Con Grifería Peluquería Behmont"
-- (517-9 ya tenia fotos/specs/descripcion completos, no se toca)
update products set active = false where sku = 'MLA3443909812';

-- 25-YXH05 "Vaporizador casco de pared - Estructura extensible" <- MLA1736576061 "Vaporizador Capilar De Pared Estructura Extensible Gris"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1736576061-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1736576061-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1736576061-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1736576061-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1736576061-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1736576061-6.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Gris"},{"label":"Modelo detallado","value":"25-YXH05"},{"label":"Es cerámico","value":"No"},{"label":"Es iónico","value":"Sí"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Gris"},{"label":"Modelo","value":"25-YXH05"},{"label":"Cantidad de velocidades","value":"1"},{"label":"Voltaje","value":"220V"},{"label":"Con aire frío","value":"No"}]'::jsonb
where sku = '25-YXH05';
update products set active = false where sku = 'MLA1736576061';

-- 517-3 "Ayudante de peluqueria Premium - 6 cajones" <- MLA1825241657 "Carro Ayudante Peluquería Premium 6 Cajones Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"6"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Acero"},{"label":"Modelo","value":"Premium"},{"label":"Usos recomendados","value":"Peluquería y barbería"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Ayudante de Peluquería Premium de Behmont es el más completo de la línea: 6 cajones para organizar absolutamente todo tu instrumental. Con cierre, mayor capacidad y ruedas resistentes. Para profesionales que no quieren sacrificar nada.

* Marca: Behmont
* Modelo: Premium
* 6 cajones de alta capacidad
* Con cierre de seguridad
* Ruedas de calidad premium
* Mayor organización y espacio
* Para peluqueros y barberos exigentes
* La versión más completa del mercado'
where sku = '517-3';
update products set active = false where sku = 'MLA1825241657';

-- 517-1 "Ayudante de peluqueria Fashion - 5 cajones" <- MLA3436246864 "Carro Ayudante Peluquería Fashion 5 Cajones Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"5"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Acero"},{"label":"Modelo","value":"Fashion"},{"label":"Usos recomendados","value":"Peluquería y barbería"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Ayudante de Peluquería Fashion de Behmont une estilo y practicidad. Sus 5 cajones organizan perfectamente todo el instrumental del profesional. Diseño fashion para salones modernos que cuidan cada detalle de su equipamiento.

* Marca: Behmont
* Modelo: Fashion
* 5 cajones organizadores
* Diseño moderno fashion
* Ruedas para movilidad
* Acabado negro elegante
* Para peluquerías y barberías modernas
* Optimizá tu organización diaria'
where sku = '517-1';
update products set active = false where sku = 'MLA3436246864';

-- HB-1 "Silla fija apilable Oland - Tapizada - Negro" <- MLA1908175845 "Silla Fija Apilable Oland Negra Behmont Negro Goma"
update products set
  specs = '[{"label":"Altura del respaldo","value":"60 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"HB-1"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"142 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"HB-1"},{"label":"Tipo de silla de oficina","value":"Fija"},{"label":"Ancho de la silla","value":"60 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"60 cm"},{"label":"Altura del paquete del seller","value":"57 cm"},{"label":"Largo del paquete del seller","value":"21 cm"},{"label":"Peso del paquete del seller","value":"17000 g"},{"label":"Ancho del paquete del seller","value":"39 cm"},{"label":"SKU","value":"HB-1"},{"label":"Materiales de la estructura","value":"Hierro"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Goma"},{"label":"IVA","value":"21 %"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"No"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"No"}]'::jsonb,
  description = 'La Silla Fija Apilable Oland Negra de BEHMONT está pensada para espacios donde se valora la practicidad sin perder presencia. Su diseño sobrio en color negro la vuelve una opción versátil para oficinas, salas de espera, reuniones o áreas de trabajo compartidas.

Al ser una silla fija, ofrece una experiencia estable y simple de usar durante jornadas cotidianas. No cuenta con ruedas ni regulación de altura, lo que favorece una postura más definida y un uso directo en entornos que requieren asientos firmes y ordenados.

El respaldo de 60 cm aporta un apoyo cómodo para la espalda, mientras que el asiento de 60 cm de profundidad brinda una superficie amplia para sentarse con mayor confort. El tapizado en goma y el relleno de espuma suman una sensación agradable al uso, con una estructura de hierro que acompaña la solidez del conjunto.

También incorpora apoyabrazos, un detalle útil para descansar mejor los brazos y mejorar la comodidad en pausas breves o reuniones prolongadas. Su diseño ergonómico ayuda a acompañar el cuerpo de forma equilibrada dentro de un formato fijo y funcional.

Con capacidad para soportar hasta 120 kg, esta silla responde bien a una rutina de uso frecuente en ámbitos profesionales o institucionales. Su altura máxima de 142 cm y su ancho de 60 cm completan un formato pensado para integrarse con facilidad en distintos ambientes.

Requiere armado y se entrega en un paquete de 57 cm de alto, 39 cm de ancho y 21 cm de largo, con un peso total de 17000 g. La BEHMONT HB-1 combina presencia, firmeza y practicidad en una propuesta clara para equipar espacios de trabajo y atención.'
where sku = 'HB-1';
update products set active = false where sku = 'MLA1908175845';

-- 25-YXH104 "Alfombra antideslizante barberia Tru Barber - Cuadrados imantados" <- MLA3441599960 "Alfombra Antideslizante Tru Barber Cuadro Imantado Barbería"
update products set
  specs = '[{"label":"Marca","value":"tru"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"EVA premium"}]'::jsonb,
  description = 'La Alfombra Tru Barber de Behmont está diseñada específicamente para barberías profesionales. Sus cuadros imantados modulares permiten personalizar la forma y el tamaño según tu puesto de trabajo. Antideslizante y de alta resistencia.

* Marca: Behmont
* Modelo: Tru Barber
* Diseñada para barbería profesional
* Cuadros imantados modulares
* Personalizable en forma y tamaño
* Antideslizante de alta resistencia
* Fácil de limpiar
* El equipamiento que todo barbero necesita'
where sku = '25-YXH104';
update products set active = false where sku = 'MLA3441599960';

-- BC-10 "Sillon barbero hidraulico reclinable Quantum - C/reposapies - Negro" <- MLA3013468882 "Sillón Barbero Hidráulico Quantum Súper Premium Limitado Negro Reclinable Redonda"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013468882-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013468882-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013468882-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013468882-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013468882-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013468882-6.webp"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"BEHMONT"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Peso máximo soportado","value":"250 kg"},{"label":"Modelo","value":"Quantum"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'El Sillón Barbero Hidráulico Quantum Súper Premium de Behmont es la elección ideal para profesionales de la barbería que buscan calidad y confort. Su estructura de acero garantiza durabilidad y resistencia, soportando hasta 250 kg, lo que lo convierte en una opción versátil para todo tipo de clientes.

Este modelo cuenta con un sistema hidráulico que permite ajustar la altura de manera sencilla, facilitando el trabajo del barbero y mejorando la experiencia del cliente. Además, incluye un apoyacabezas y un apoya pies, proporcionando un soporte adicional que asegura comodidad durante el servicio.

Diseñado específicamente para barberías, el Quantum combina funcionalidad y estilo, adaptándose a cualquier ambiente. Su diseño ergonómico no solo mejora la postura del cliente, sino que también optimiza el tiempo de trabajo del profesional, haciendo de cada corte una experiencia placentera. 

Invierte en un sillón que no solo cumple con las expectativas, sino que las supera, elevando tu espacio de trabajo a un nuevo nivel de profesionalismo y confort.'
where sku = 'BC-10';
update products set active = false where sku = 'MLA3013468882';

-- XC-16 "Sillon peluquero hidraulico Ion - C/reposapies - Hierro dorado - Beige" <- MLA3154172020 "Sillon Peluquero Ion + Reposapiés Y Estructura Hierro Dorado Dorado Fijo Redonda"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154172020-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154172020-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154172020-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154172020-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154172020-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3154172020-6.webp"]'::jsonb,
  specs = '[{"label":"Tipo de respaldo","value":"Fijo"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"Behmont"},{"label":"Usos recomendados de la silla","value":"Peluquería,Barbería"},{"label":"Color","value":"Dorado"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Dorado"},{"label":"Fabricante","value":"Behmont"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"XC-16"},{"label":"Materiales de la estructura","value":"Hierro"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'El Sillón Peluquero Ion de Behmont es la elección ideal para profesionales de la peluquería y barbería que buscan calidad y estilo. Su estructura de hierro dorado no solo aporta un toque de elegancia, sino que también garantiza durabilidad y resistencia, soportando hasta 150 kg. 

Este modelo XC-16 cuenta con un sistema hidráulico que permite ajustar la altura de manera sencilla, adaptándose a las necesidades de cada cliente y facilitando el trabajo del estilista. Además, incluye un reposapiés que brinda comodidad adicional durante los tratamientos.

Diseñado para ofrecer una experiencia placentera, el sillón combina funcionalidad y estética, convirtiéndose en un elemento esencial en cualquier salón. Su diseño moderno y sofisticado hará que tus clientes se sientan especiales y bien atendidos. 

Invierte en un sillón que no solo cumple con los estándares de calidad, sino que también realza la imagen de tu espacio de trabajo. Con el Sillón Peluquero Ion, cada corte y tratamiento se transforma en una experiencia única.'
where sku = 'XC-16';
update products set active = false where sku = 'MLA3154172020';

-- 25-JAY03 "Embutidora vertical manual 15 L" <- MLA3481777808 "Embutidora Vertical Manual 15 Litros Acero Gastronomía Beh."
-- (25-JAY03 ya tenia fotos/specs/descripcion completos, no se toca)
update products set active = false where sku = 'MLA3481777808';

-- 25-YJ02 "Alfombra antifatiga para barberia - 150 x 90 - Negro" <- MLA1678855925 "Alfombra Antifatiga Antideslizante 150x90cm Barbería Negro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678855925-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678855925-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678855925-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678855925-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678855925-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1678855925-6.webp"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Es resistente a la grasa","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"9 cm"},{"label":"Materiales","value":"Eco Cuero"},{"label":"Modelo","value":"25-YJ02"},{"label":"Ancho","value":"15 cm"}]'::jsonb
where sku = '25-YJ02';
update products set active = false where sku = 'MLA1678855925';

-- TC-22 "Picadora de carne electrica 2 en 1 - 22 y 12" - 1.5 HP - 200 kg/h - Acero inox." <- MLA1549261549 "Picadora Industrial Eléctrica Ajustable 12 - 22 Acero Inox"
update products set
  specs = '[{"label":"Tamaño de la navaja","value":"22"},{"label":"Marca","value":"Behmont"},{"label":"Tamaño del disco","value":"22"},{"label":"Es industrial","value":"Sí"},{"label":"Es lavable","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material","value":"Acero inoxidable"},{"label":"Tipo de picadora de carne","value":"Eléctrica"},{"label":"Modelo","value":"TC-22"},{"label":"Potencia","value":"0.217 kW"},{"label":"Tipo de alimentación","value":"Corriente eléctrica"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'Dimensiones: 410x240x450mm
Calibre 22''''
Acero Inoxidable
Fácil de usar y lavable.
Con embudo.

¡Tu compra tiene ENVÍO GRATIS a todo el país!
No importa dónde estés, tu pedido llega a tu puerta sin pagar de más.

Nuestros clientes hablan por nosotros: tenemos 100% reseñas positivas. Eso significa que podés comprar con total confianza.

Productos de calidad y a la vanguardia: elegimos lo mejor para que recibas artículos modernos, prácticos y duraderos.

Comprá TRANQUILO, ¡nos ocupamos de que tu experiencia sea excelente!'
where sku = 'TC-22';
update products set active = false where sku = 'MLA1549261549';

-- BX-615A "Lavacabeza de ceramica - C/griferia y ducha - Base fibra de vidrio - Apoyabrazos madera - Blanco" <- MLA1830015657 "Lavacabeza Cerámica Base Fibra Vid. Apoyabrazos Made. Blanco"
update products set
  specs = '[{"label":"Accesorios incluidos","value":"Grifería y ducha"},{"label":"Marca","value":"Behmont"},{"label":"Es monomando","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Lavacabezas de peluquería"},{"label":"Modelo","value":"BX-615A"},{"label":"Color de la bacha","value":"Blanca"},{"label":"Material de la bacha","value":"Cerámica"},{"label":"Color de la estructura","value":"Blanco"},{"label":"Material de la estructura","value":"Fibra de vidrio"},{"label":"Color del tapizado","value":"Blanco/Madera"},{"label":"Material del tapizado","value":"Madera"},{"label":"Con bacha reclinable","value":"Sí"}]'::jsonb,
  description = 'El Lavacabeza BX-615A de Behmont en color blanco aporta luminosidad y elegancia natural. Base de fibra de vidrio con apoyabrazos de madera, bacha de cerámica y grifería incluida. Para salones que buscan un estilo natural y sofisticado.

* Marca: Behmont
* Color: Blanco
* Bacha de cerámica
* Base fibra de vidrio
* Apoyabrazos de madera natural
* Grifería y ducha incluidas
* Diseño nórdico y natural
* Para salones femeninos y modernos'
where sku = 'BX-615A';
update products set active = false where sku = 'MLA1830015657';

-- BX-31205 "Sillon peluquero hidraulico Exclusive - C/reposapies - Negro" <- MLA1830036385 "Sillón Barbero Hidráulico Exclusive Reposapies Negro Behmont Negro Tapizado Redonda"
update products set
  specs = '[{"label":"Tipo de respaldo","value":"Tapizado"},{"label":"Forma de la base","value":"Redonda"},{"label":"Marca","value":"Behmont"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Fabricante","value":"Behmont"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Modelo","value":"Exclusive"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"}]'::jsonb,
  description = 'El Sillón Peluquero Exclusive de Behmont está pensado para salones de peluquería que valoran la elegancia y funcionalidad. Base redonda cromada, sistema hidráulico suave y tapizado premium en negro. Reposapies incluido para la comodidad del cliente durante los tratamientos.

* Marca: Behmont
* Modelo: Exclusive
* Sistema hidráulico de altura regulable
* Reposapies integrado
* Tapizado negro premium
* Base circular cromada
* Ideal para peluquería profesional
* Diseño moderno y atemporal'
where sku = 'BX-31205';
update products set active = false where sku = 'MLA1830036385';

-- SHY "Sillon peluquero hidraulico Shy - C/reposapies - Negro" <- MLA3013611366 "Sillón Peluquero Hidráulico Shy Con Apoyacabezas Y Reposapié Negro Reclinable Redonda"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013611366-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013611366-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013611366-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013611366-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013611366-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013611366-6.webp"]'::jsonb
where sku = 'SHY';
update products set active = false where sku = 'MLA3013611366';

-- BX-3112 "Sillon peluquero hidraulico Zenit - C/reposapies - Negro" <- MLA3443909818 "Sillón Barbero Hidráulico Zenit Con Reposapies Negro Behmont Negro Tapizado Redonda"
-- (BX-3112 ya tenia fotos/specs/descripcion completos, no se toca)
update products set active = false where sku = 'MLA3443909818';

-- 25-JA31 "Silla fija apilable Steglitz - PVC - Negro" <- MLA3624803648 "Silla De Oficina Apilable Behmont Pvc Negro Negro Pvc"
update products set
  specs = '[{"label":"Altura del respaldo","value":"50 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"PVC apilable"},{"label":"Materiales del relleno","value":"Espuma de alta densidad"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"45 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"25-JA31"},{"label":"Tipo de silla de oficina","value":"Silla de oficina estándar"},{"label":"Ancho de la silla","value":"50 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"50 cm"},{"label":"Materiales de la estructura","value":"Metal y plástico"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"PVC"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"No"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"No"}]'::jsonb,
  description = 'La silla de oficina BEHMONT en PVC negro está pensada para espacios de trabajo donde se busca una solución práctica y ordenada. Su formato apilable la vuelve útil para salas de reunión, áreas de espera o ambientes con necesidad de reacomodar asientos con facilidad.

El asiento incorpora espuma de alta densidad, lo que aporta una sensación de apoyo más firme durante la jornada. Además, su diseño ergonómico acompaña una postura más cómoda en usos prolongados.

La estructura combina metal y plástico para ofrecer una construcción sólida, con capacidad de soporte de hasta 120 kg. También cuenta con apoyabrazos fijos que suman comodidad en tareas de escritorio o en momentos de pausa.

Sus medidas ayudan a ubicarla con facilidad en distintos entornos: 50 cm de ancho, 50 cm de profundidad y un respaldo de 50 cm de alto. El acabado en PVC negro facilita integrarla en oficinas, consultorios o ambientes corporativos con una imagen sobria.

Este modelo no incluye ruedas, giro, altura ajustable ni respaldo reclinable, por lo que ofrece una experiencia simple y directa. Esa configuración resulta conveniente para quienes prefieren una silla estable, de uso cotidiano y sin mecanismos adicionales.

Requiere armado y está orientada a quienes necesitan una silla estándar, funcional y fácil de ubicar en espacios de trabajo. BEHMONT combina practicidad, apoyo y una presencia discreta en un solo producto.'
where sku = '25-JA31';
update products set active = false where sku = 'MLA3624803648';

-- 25-YXH131 "Peine fibra de carbono N06500" <- MLA3471120520 "Peine Fibra De Carbono N06500 Anticalor Peluquería Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"Peine de Dientes Finos"},{"label":"Es anti-frizz","value":"Sí"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Peinar y seccionar"},{"label":"Material","value":"Fibra de carbono"},{"label":"Modelo","value":"N06500"},{"label":"Usos recomendados","value":"Peluquería y uso personal"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"}]'::jsonb,
  description = 'El Peine de Fibra de Carbono N06500 de Behmont resiste el calor de secadores y planchas sin deformarse. Dientes finos que deslizan suavemente por el cabello sin enredos. Antiestático para un acabado más prolijo y brillante.

* Marca: Behmont
* Fibra de carbono resistente al calor
* Antiestático
* Dientes finos de precisión
* No se deforma con el calor
* Para peluquería y uso personal
* Deslizamiento suave
* Alta disponibilidad de stock'
where sku = '25-YXH131';
update products set active = false where sku = 'MLA3471120520';

-- 25-YXH130 "Peine fibra de carbono N166" <- MLA3471133546 "Peine Fibra De Carbono N166 Anticalor Peluquería Behmont Negro"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"Peine combinado"},{"label":"Es anti-frizz","value":"Sí"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Desenredar y seccionar"},{"label":"Material","value":"Fibra de carbono"},{"label":"Modelo","value":"N166"},{"label":"Usos recomendados","value":"Peluquería y uso personal"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"}]'::jsonb,
  description = 'El Peine de Fibra de Carbono N166 de Behmont combina dientes anchos y finos en un solo peine para mayor versatilidad. Resistente al calor de hasta 280°C, antiestático y de larga duración. El favorito para desenredar y seccionar.

* Marca: Behmont
* Dientes combinados: anchos y finos
* Fibra de carbono hasta 280°C
* Antiestático
* Para desenredar y seccionar
* Larga durabilidad
* Para peluquería y uso personal
* Alta disponibilidad de stock'
where sku = '25-YXH130';
update products set active = false where sku = 'MLA3471133546';

-- 25-YJ01 "Pulverizador pistola automatico" <- MLA3472964262 "Pulverizador Pistola Automático Barbería Profesional Behmont"
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Pistola Automático"}]'::jsonb,
  description = 'El Pulverizador Pistola Automático de Behmont revoluciona la forma de humedecer el cabello. Su mecanismo automático libera la niebla con solo apretar el gatillo, sin necesidad de bombear. Ergonómico, de gran capacidad y con pulverización ultrafina.

* Marca: Behmont
* Diseño pistola ergonómico
* Mecanismo automático — sin bombeo
* Pulverización ultrafina uniforme
* Gran capacidad
* Para barbería y peluquería profesional
* Reduce el cansancio en jornadas largas
* El más avanzado de la línea'
where sku = '25-YJ01';
update products set active = false where sku = 'MLA3472964262';

-- 25-YXH106 "Pulverizador plastico rectangular" <- MLA3473084234 "Pulverizador Plástico Rectangular Peluquería Behmont Transparente"
update products set
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Transparente"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Rectangular"}]'::jsonb,
  description = 'El Pulverizador Rectangular de Behmont tiene un diseño ergonómico que facilita el agarre y el apoyo en superficies planas. Spray uniforme y resistente para el uso profesional diario en barbería y peluquería. Precio imbatible.

* Marca: Behmont
* Diseño rectangular ergonómico
* Fácil agarre y apoyo estable
* Spray uniforme
* Plástico resistente
* Para peluquería y barbería
* El precio más bajo de la línea
* Alta disponibilidad de stock'
where sku = '25-YXH106';
update products set active = false where sku = 'MLA3473084234';

-- A-08-N "Sillon de oficina Mitte - Cuero - Altura regulable - Reclinable - C/apoya pies y masajeador - Negro" <- MLA1902589631 "Silla De Oficina Con Apoya Pies Mitte Behmont De Cuero Negro Cuero"
update products set
  specs = '[{"label":"Altura del respaldo","value":"86 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"MITTE"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Incluye manual de ensamblado","value":"Sí"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"120 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"A-08-N"},{"label":"Tipo de silla de oficina","value":"Silla de oficina"},{"label":"Ancho de la silla","value":"60 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"50 cm"},{"label":"Materiales de la estructura","value":"Metal y plástico"},{"label":"Material del tapizado","value":"Cuero"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"Sí"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La silla de oficina MITTE de BEHMONT combina una presencia elegante con una propuesta pensada para el trabajo diario. Su tapizado en cuero aporta una imagen cuidada y facilita mantener un entorno ordenado y profesional.

Está diseñada para acompañar jornadas extensas con apoyo ergonómico, respaldo reclinable y apoyacabezas, ayudando a encontrar una postura más cómoda durante el uso. También incluye apoya pies, un detalle útil para quienes buscan mayor descanso al permanecer sentados por más tiempo.

Su estructura en metal y plástico ofrece una sensación firme, mientras que el relleno de espuma suma confort al asiento y al respaldo. Es giratoria, cuenta con ruedas y permite ajuste de altura, lo que facilita adaptarla a distintas mesas y rutinas de trabajo.

En cuanto a proporciones, presenta un ancho de 60 cm, profundidad de asiento de 50 cm y altura de respaldo de 86 cm. La altura máxima de la silla es de 120 cm y soporta hasta 120 kg, datos que ayudan a evaluar su uso antes de elegirla.

Por sus funciones y diseño, resulta adecuada para oficina en casa, despachos y espacios de estudio donde se busca comodidad sin perder una imagen sobria. Sus apoyabrazos integrados suman apoyo adicional, aunque no son regulables.

Requiere ensamblado y se entrega con manual para facilitar ese proceso, por lo que es una opción práctica para quien busca una silla funcional, cómoda y con recursos pensados para el uso cotidiano.'
where sku = 'A-08-N';
update products set active = false where sku = 'MLA1902589631';

-- FC-1250-19 "Exhibidora vertical 1350 L - 3 puertas - Con cenefa - 4 estantes" <- MLA1910440141 "Heladera Exhibidora Vertical 3 Puertas Con Cenefa Blanca Blanco"
update products set
  specs = '[{"label":"Altura del paquete del seller","value":"180 cm"},{"label":"Largo del paquete del seller","value":"55 cm"},{"label":"Peso del paquete del seller","value":"50000 g"},{"label":"Ancho del paquete del seller","value":"65 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Blanco"},{"label":"Profundidad","value":"60 cm"},{"label":"Cantidad de puertas","value":"3"},{"label":"Motivo de GTIN vacío","value":"Otra razón"},{"label":"Altura","value":"1.93 m"},{"label":"Impuesto interno","value":"0 %"},{"label":"Es cervecera","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Blanco"},{"label":"Temperatura máxima","value":"6 °C"},{"label":"Temperatura mínima","value":"1 °C"},{"label":"Modelo","value":"FC-1250-19"},{"label":"Orientación","value":"Vertical"},{"label":"SKU","value":"FC-1250-19"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad en volumen","value":"1350 L"},{"label":"Ancho","value":"180 m"},{"label":"Con luz interior","value":"Sí"},{"label":"Con control de temperatura","value":"Sí"}]'::jsonb,
  description = 'Heladera exhibidora vertical pensada para mantener bebidas y productos a la vista y en orden. Su formato de tres puertas y cenefa blanca facilita una presentación prolija en espacios de atención y venta.

Con capacidad de 1350 L, ofrece un interior amplio para trabajar con carga variada y rotación frecuente. Es una solución útil para comercios gastronómicos, bares y puntos de servicio que necesitan acceso rápido al contenido.

El rango térmico va de 1 °C a 6 °C, lo que permite conservar el producto en condiciones adecuadas para exposición. El control de temperatura ayuda a ajustar el funcionamiento según la necesidad del día.

La luz interior mejora la visibilidad del contenido y aporta una lectura más clara de la exhibición. Esto suma practicidad al momento de organizar, reponer y localizar cada artículo.

Su diseño vertical aprovecha mejor el espacio disponible y la profundidad de 60 cm favorece una presencia compacta. La altura de 1,93 m le da una silueta firme y funcional para ambientes de uso intensivo.

El modelo FC-1250-19 de BEHMONT reúne capacidad, control térmico y presentación cuidada en un solo equipo. Es una alternativa sólida para quienes buscan orden, visibilidad y conservación en un mismo producto.'
where sku = 'FC-1250-19';
update products set active = false where sku = 'MLA1910440141';

-- 25-YXH112 "Peine fibra de carbono N980" <- MLA3471120534 "Peine Fibra De Carbono N980 Dientes Anchos Peluquería Beh. Negro"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"Peine de dientes anchos"},{"label":"Es anti-frizz","value":"Sí"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Desenredar sin romper"},{"label":"Material","value":"Fibra de carbono"},{"label":"Modelo","value":"N980"},{"label":"Usos recomendados","value":"Cabello rizado y texturizado"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"}]'::jsonb,
  description = 'El Peine de Fibra de Carbono N980 de dientes anchos de Behmont es ideal para desenredar cabellos rizados, con textura o post-tratamiento. Su fibra de carbono resiste el calor y es antiestática para un acabado impecable.

* Marca: Behmont
* Dientes anchos para desenredar
* Fibra de carbono resistente al calor
* Antiestático
* Para cabello rizado y con textura
* Ideal post-tratamiento
* Alta durabilidad
* El mejor precio por stock alto'
where sku = '25-YXH112';
update products set active = false where sku = 'MLA3471120534';

-- 25-YXH128 "Peine fibra de carbono N283" <- MLA3471133548 "Peine Fibra De Carbono N283 Cola Profesional Peluquería Beh. Negro"
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Tipos de peines","value":"peine cola de rata"},{"label":"Es anti-frizz","value":"Sí"},{"label":"Es kit","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Seccionar con precisión"},{"label":"Material","value":"Fibra de carbono"},{"label":"Modelo","value":"N283"},{"label":"Usos recomendados","value":"Colorimetría y tratamientos"},{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Unidades por envase","value":"1"}]'::jsonb,
  description = 'El Peine de Fibra de Carbono N283 de Behmont tiene cola de rata para hacer secciones perfectas durante colorimetría y tratamientos. Resistente al calor, antiestático y de fibra de carbono de alta calidad. El aliado indispensable del colorista.

* Marca: Behmont
* Cola de rata para secciones perfectas
* Fibra de carbono resistente al calor
* Antiestático
* Para colorimetría y tratamientos
* Secciones limpias y precisas
* Para peluquería profesional
* Alta disponibilidad de stock'
where sku = '25-YXH128';
update products set active = false where sku = 'MLA3471133548';

-- YM-6/A-10 "Sillon de oficina fijo Neukolln - Cuero - Negro" <- MLA3624704860 "Silla De Oficina Fija Neukolln Behmont De Cuero Negro Cuero"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3624704860-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3624704860-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3624704860-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3624704860-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3624704860-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3624704860-6.webp"]'::jsonb,
  specs = '[{"label":"Altura del respaldo","value":"60 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"NEUKOLLN"},{"label":"Materiales del relleno","value":"Espuma"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"120 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"YM-6/A-10"},{"label":"Tipo de silla de oficina","value":"Silla de oficina"},{"label":"Ancho de la silla","value":"60 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"60 cm"},{"label":"Materiales de la estructura","value":"Metal y plástico"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"Cuero"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"Sí"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'La silla de oficina BEHMONT Neukolln está pensada para acompañar jornadas de trabajo, estudio o tareas frente al escritorio con una postura más cómoda. Su diseño combina apoyo ergonómico y una apariencia sobria que se adapta con facilidad a espacios profesionales y domésticos.

Cuenta con relleno de espuma, apoyacabezas, apoyabrazos y apoya pies, recursos que ayudan a distribuir mejor el apoyo durante el uso. Además, el respaldo reclinable y la altura ajustable permiten adaptar la posición según la preferencia de cada persona.

La estructura combina metal y plástico para ofrecer estabilidad en el uso cotidiano, mientras que las ruedas y el giro facilitan el movimiento dentro del ambiente de trabajo. Soporta hasta 120 kg y alcanza una altura máxima de 120 cm, con 60 cm de ancho, 60 cm de profundidad del asiento y 60 cm de alto del respaldo.

El tapizado en cuero aporta una presencia cuidada y una sensación agradable al contacto, a la vez que ayuda a mantener una estética profesional. Es una opción útil para quienes buscan una silla funcional con detalles pensados para el confort diario.

Requiere ensamblado y viene con manual, lo que facilita dejarla lista para su uso en poco tiempo. Por sus características, resulta adecuada para escritorios de trabajo, zonas de estudio o espacios de atención donde se valore comodidad y soporte.'
where sku = 'YM-6/A-10';
update products set active = false where sku = 'MLA3624704860';

-- 25-YXH109 "Alfombra antideslizante barberia BT" <- MLA1827606431 "Alfombra Antideslizante Barbería Bh Barberholic Negro"
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Estilo de la alfombra","value":"Modular profesional"},{"label":"Color","value":"Negro"},{"label":"Diseño de la tela","value":"Liso"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Multicolor"},{"label":"Materiales","value":"EVA premium"},{"label":"Modelo","value":"BH"},{"label":"Ambientes recomendados","value":"Barbería y peluquería"}]'::jsonb,
  description = 'La Alfombra Antideslizante BT de Behmont es el complemento de seguridad esencial para barberías y peluquerías. Evita resbalones en zonas de trabajo húmedas, es fácil de limpiar y resiste el uso diario intensivo.

* Marca: Behmont
* Antideslizante certificada
* Para uso en barbería y peluquería
* Resistente al agua y productos químicos
* Fácil limpieza
* Superficie firme y cómoda
* Seguridad en cada paso
* Alta disponibilidad de stock'
where sku = '25-YXH109';
update products set active = false where sku = 'MLA1827606431';

-- 25-YXH110 "Pulverizador plastico redondo" <- MLA1841668263 "Pulverizador Plástico Redondo Peluquería Barbería Behmont Transparente"
update products set
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Transparente"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"Redondo"}]'::jsonb,
  description = 'El Pulverizador Redondo de Behmont ofrece el mejor precio de toda la línea sin sacrificar funcionalidad. Diseño redondo de fácil manejo, spray uniforme y plástico resistente para el uso diario en peluquería y barbería. Ideal para compra por mayor.

* Marca: Behmont
* Diseño redondo clásico
* Spray uniforme
* Plástico resistente
* El precio más accesible del mercado
* Ideal para compra por mayor
* Para peluquería y barbería
* El más vendido de la línea'
where sku = '25-YXH110';
update products set active = false where sku = 'MLA1841668263';

-- 25-JAY02 "Embutidora vertical manual 5 L" <- MLA3481752066 "Embutidora Vertical Manual 5 Litros Acero Gastronomía Beh."
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Profundidad","value":"29 cm"},{"label":"Diámetro de los embudos","value":"16 mm,22 mm,32 mm,38mm"},{"label":"Cantidad de embudos","value":"4"},{"label":"Altura","value":"64 cm"},{"label":"Embudos incluidos","value":"si"},{"label":"Incluye abrazaderas","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material","value":"Acero inoxidable"},{"label":"Modelo","value":"5L"},{"label":"Capacidad en volumen","value":"5 L"},{"label":"Peso","value":"12 kg"},{"label":"Capacidad en peso","value":"5 kg"},{"label":"Ancho","value":"29 cm"}]'::jsonb,
  description = 'La Embutidora Vertical Manual de 5 Litros de Behmont es la opción compacta para productores artesanales y uso doméstico. Diseño vertical con manivela para un embutido cómodo y parejo. Acero resistente con embudos de distintos diámetros incluidos.

* Marca: Behmont
* Capacidad: 5 litros
* Diseño vertical compacto
* Embudos de distintos diámetros incluidos
* Construcción en acero resistente
* Para producción artesanal y hogar
* Embutido cómodo y parejo
* Fácil mantenimiento'
where sku = '25-JAY02';
update products set active = false where sku = 'MLA3481752066';

-- LFJTXD-KM-8557 "Kit clipper + trimmer + shaver inalambrico - Regulador RPM - Lubricante, cepillo de limpieza y base de carga" <- MLA3458937526 "Kit Clipper Trimmer Shaver Kemei Km-8557 Regulador Rpm Beh."
update products set
  specs = '[{"label":"Marca","value":"Kemei"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Incluye estuche","value":"No"},{"label":"Incluye rizadora","value":"No"},{"label":"Incluye secador de pelo","value":"No"},{"label":"Incluye planchita de pelo","value":"No"},{"label":"Es un kit de fábrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"KM-8557"},{"label":"Cantidad de piezas","value":"3"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'El Kit Kemei KM-8557 es el set profesional con regulador de RPM para adaptar la velocidad al tipo de cabello. Incluye clipper, trimmer y shaver inalámbricos con base de carga. El control absoluto del corte en tus manos.

* Marca: Kemei | Distribuidor: Behmont
* Modelo: KM-8557
* Incluye: clipper + trimmer + shaver
* Regulador de RPM incorporado
* Base de carga incluida
* Lubricante y cepillo
* Control total del corte
* Para barberos que exigen precisión'
where sku = 'LFJTXD-KM-8557';
update products set active = false where sku = 'MLA3458937526';
