-- Migracion 074: 10 duplicados mas, encontrados comparando codigo por
-- codigo la lista completa de productos Kemei (KM-xxxx) del distribuidor
-- contra los que quedaban en Peluqueria y Barberia. Todos con stock
-- exacto entre ambas filas. Ya aplicado con la service role key.

-- JFB-KM-3124 "Rizador buclera" <- MLA1835405825 "Buclera Rizadora Kemei Km-3124 Cerámica 230°c Profesional Negro"
-- Buclera Rizadora KM-3124 (codigo+stock exactos)
-- (sin cambios de datos)
update products set active = false, ml_item_id = null where sku = 'MLA1835405825';

-- LFJ-KM-1858A "Clipper inalambrico - 10 posiciones - 1.5 a 24 mm - Lubricante, cepillo de limpieza y base de carga" <- MLA3643939654 "Clipper Con Patillera De Pelo Kemei Lfj-km-1858a Dorado Oscuro"
-- Clipper con Patillera KM-1858A (codigo+stock exactos)
update products set
  specs = '[{"label":"Altura del paquete del seller","value":"20 cm"},{"label":"Largo del paquete del seller","value":"3 cm"},{"label":"Peso del paquete del seller","value":"90 g"},{"label":"Ancho del paquete del seller","value":"14 cm"},{"label":"Accesorios incluidos","value":"2 peines magneticos,8 peines plasticos,Aceite lubricante,Cepillo,Pantalla"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Dorado oscuro"},{"label":"Cantidad de peines","value":"10"},{"label":"Funciones","value":"Corte y perfilado de cabello y barba"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Tipos de cabezales","value":"Removible"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es marca destacada","value":"No"},{"label":"Es apta para bebés","value":"No"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es marca TOM","value":"No"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"LFJ-KM-1858A"},{"label":"Cantidad de posiciones","value":"3"},{"label":"Tipo de alimentación","value":"USB"},{"label":"SKU","value":"LFJ-KM-1858A"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'El clipper con patillera de Pelo Kemei LFJ-KM-1858A está pensado para mantener cabello y barba con un acabado prolijo en casa. Su diseño inalámbrico facilita el uso en sesiones rápidas y también resulta práctico para llevar en viaje.

Funciona con alimentación USB y cuenta con batería recargable, lo que ayuda a usarlo con comodidad sin depender siempre del cable. La pantalla aporta una lectura clara del estado del equipo para seguir la rutina con mayor control.

Dispone de cabezales removibles y lavables, algo útil para simplificar el cuidado después de cada uso. Además, ofrece 3 posiciones de ajuste para adaptar el trabajo al estilo buscado con mayor precisión.

Incluye 10 peines para ampliar las opciones de longitud y lograr un resultado más uniforme en distintas zonas. Entre sus accesorios se suman aceite lubricante, cepillo, 8 peines plásticos y 2 peines magnéticos, pensados para acompañar el mantenimiento y el orden del equipo.

Es una opción adecuada para quienes buscan una herramienta versátil para cabello y barba, con enfoque en practicidad y control. El conjunto de funciones favorece una experiencia cómoda, ordenada y útil para el uso frecuente.

Su formato portátil y sin cable suma libertad de movimiento y ayuda a resolver el cuidado personal con menos interrupciones. Kemei propone aquí una solución funcional para quienes valoran un perfil limpio y una rutina simple.'
where sku = 'LFJ-KM-1858A';
update products set active = false, ml_item_id = null where sku = 'MLA3643939654';

-- LFJ-KM-2293 "Clipper inalambrico - 3 posiciones - 1 a 3 mm - Lubricante, cepillo de limpieza" <- MLA3643897476 "Kemei Patillera Lfj-km-2293 Máquina De Cortar Pelo Negro"
-- Patillera KM-2293 (codigo+stock exactos)
-- (sin cambios de datos)
update products set active = false, ml_item_id = null where sku = 'MLA3643897476';

-- LFQ-KM-1949 "Clipper inalambrico - 3 posiciones - 1 a 3 mm - Lubricante, cepillo de limpieza" <- MLA1911272971 "Kemei Patillera Ljf-km-1949 Recortadora De Pelo Plateado"
-- Patillera KM-1949 (codigo+stock exactos)
update products set
  specs = '[{"label":"Accesorios incluidos","value":"4 peines guía plásticos,Aceite lubricante,Cepillo"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Plateado"},{"label":"Cantidad de peines","value":"4"},{"label":"Funciones","value":"Corte y perfilado de cabello y barba"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Tipos de cabezales","value":"Removible"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es marca destacada","value":"No"},{"label":"Es apta para bebés","value":"No"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es marca TOM","value":"No"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Plateado"},{"label":"Modelo","value":"LFQ-KM-1949"},{"label":"Cantidad de posiciones","value":"4"},{"label":"Tipo de alimentación","value":"USB"},{"label":"Altura del paquete del seller","value":"20 cm"},{"label":"Largo del paquete del seller","value":"3 cm"},{"label":"Peso del paquete del seller","value":"90 g"},{"label":"Ancho del paquete del seller","value":"14 cm"},{"label":"SKU","value":"LFQ-KM-1949"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La patillera Kemei LJF-KM-1949 está pensada para cuidar el aspecto del cabello y la barba con un manejo práctico y cómodo. Su formato inalámbrico facilita el uso diario en casa y también resulta útil para llevar en viajes.

Funciona con alimentación USB y cuenta con batería recargable, lo que ayuda a usarla sin depender de un cable durante la rutina. El diseño con cabezales removibles aporta practicidad al momento de limpiarla y mantenerla lista para el siguiente uso.

Incluye 4 peines guía plásticos y ofrece 4 posiciones para adaptar el largo según el estilo que se quiera lograr. Esto permite trabajar con mayor control en zonas de acabado, contornos y mantenimiento del look.

Los cabezales lavables suman facilidad de cuidado y hacen más simple la limpieza después de cada sesión. Además, viene con aceite lubricante y cepillo, accesorios útiles para conservar el desempeño y el orden del equipo.

Por su propuesta compacta y portátil, resulta una buena opción para quienes buscan una recortadora funcional, fácil de transportar y con accesorios básicos incluidos. Es una alternativa práctica para el arreglo personal frecuente, con la versatilidad necesaria para cabello y barba.'
where sku = 'LFQ-KM-1949';
update products set active = false, ml_item_id = null where sku = 'MLA1911272971';

-- LFJ-KM-1449 "Clipper inalambrico - 4 posiciones - 1 a 7 mm - Lubricante, cepillo de limpieza" <- MLA3643577694 "Trimmer Kemei Lfj-km-1449 Máquina De Cortar Pelo Negro"
-- Trimmer KM-1449 (codigo+stock exactos)
update products set
  specs = '[{"label":"Accesorios incluidos","value":"3 peines guía plásticos,Aceite lubricante,Cepillo"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Cantidad de peines","value":"3"},{"label":"Funciones","value":"Corte y perfilado de cabello y barba"},{"label":"Tipos de cabezales","value":"Removible"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es marca destacada","value":"No"},{"label":"Es apta para bebés","value":"No"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es marca TOM","value":"No"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"LFJ-KM-1449"},{"label":"Cantidad de posiciones","value":"3"},{"label":"Tipo de alimentación","value":"USB"},{"label":"Altura del paquete del seller","value":"22 cm"},{"label":"Largo del paquete del seller","value":"7 cm"},{"label":"Peso del paquete del seller","value":"120 g"},{"label":"Ancho del paquete del seller","value":"14 cm"},{"label":"SKU","value":"LFJ-KM-1449"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La Trimmer Kemei LFJ-KM-1449 está pensada para quienes buscan una herramienta práctica para el cuidado del cabello y la barba en casa. Su formato inalámbrico brinda libertad de movimiento y ayuda a trabajar con mayor comodidad en rutinas diarias o arreglos rápidos.

Funciona con batería recargable y alimentación por USB, lo que facilita mantenerla lista para usar en distintos momentos. Además, su diseño apto para viaje la convierte en una opción conveniente para llevar en traslados, escapadas o uso fuera de casa.

Este modelo permite realizar perfilado y recorte con un acabado prolijo, adaptándose a diferentes estilos y necesidades de cuidado personal. La presencia de 3 peines guía plásticos y 3 posiciones ofrece más control al momento de definir el largo deseado y mantener un resultado uniforme.

También incorpora cabezales removibles y lavables, un detalle útil para simplificar la limpieza después de cada uso. Junto con el cepillo y el aceite lubricante incluidos, resulta más sencillo conservar el equipo en buenas condiciones y listo para el siguiente uso.

La marca Kemei respalda una propuesta orientada a la practicidad, con una herramienta pensada para el mantenimiento habitual del cabello y la barba. Su funcionamiento sin cable y su formato de recarga por USB aportan comodidad a quienes valoran una rutina más simple y ordenada.

Es una alternativa funcional para usuarios que buscan precisión, facilidad de mantenimiento y una experiencia de uso cómoda en un solo equipo.'
where sku = 'LFJ-KM-1449';
update products set active = false, ml_item_id = null where sku = 'MLA3643577694';

-- LFJ-KM-291 "Trimmer inalambrico - 4 posiciones - 1 a 7 mm - Lubricante, cepillo de limpieza" <- MLA1911283377 "Kemei Patillera Lfj-km-229 Inalambrica Con Accesorios Negro"
-- Patillera KM-229/291 (codigo casi exacto -typo probable en ML-, stock exacto, unico candidato)
update products set
  images = '["https://http2.mlstatic.com/D_685949-MLA114918474227_072026-O.webp","https://http2.mlstatic.com/D_671080-MLA114918474013_072026-O.webp","https://http2.mlstatic.com/D_852767-MLA113638303712_072026-O.webp","https://http2.mlstatic.com/D_800234-MLA114918073617_072026-O.webp","https://http2.mlstatic.com/D_983232-MLA113638274360_072026-O.jpg","https://http2.mlstatic.com/D_889431-MLA114918073619_072026-O.webp"]'::jsonb,
  specs = '[{"label":"Accesorios incluidos","value":"3 peines guias platicos,Aceite lubricante,Cepillo"},{"label":"Materiales de las cuchillas","value":"Acero inoxidable"},{"label":"Marca","value":"Kemei"},{"label":"Largo del cable","value":"25 cm"},{"label":"Tiempo de carga","value":"3 h"},{"label":"Color","value":"Negro"},{"label":"Cantidad de peines","value":"3"},{"label":"Funciones","value":"Corte y perfilado de cabello y barba"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Cantidad de cabezales","value":"1"},{"label":"Tipos de cabezales","value":"Removible"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es marca destacada","value":"No"},{"label":"Es silenciosa","value":"No"},{"label":"Es apta para bebés","value":"No"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es marca TOM","value":"No"},{"label":"Es resistente al agua","value":"No"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Función principal","value":"Cortadora de pelo"},{"label":"Altura máxima de corte","value":"3 mm"},{"label":"Altura mínima de corte","value":"0.5 mm"},{"label":"Modelo","value":"LFJ-KM-2299"},{"label":"Tipos de motor","value":"Rotativo"},{"label":"Tiempo de funcionamiento","value":"120 m"},{"label":"Cantidad de posiciones","value":"3"},{"label":"Potencia","value":"5 W"},{"label":"Tipo de alimentación","value":"USB"},{"label":"Altura del paquete del seller","value":"20 cm"},{"label":"Largo del paquete del seller","value":"5 cm"},{"label":"Peso del paquete del seller","value":"120 g"},{"label":"Ancho del paquete del seller","value":"11 cm"},{"label":"SKU","value":"LFJ-KM-2299"},{"label":"Sistema de afeitado","value":"Láminas"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Peso","value":"210 g"},{"label":"Con conversión de voltaje automática","value":"Sí"},{"label":"Con pantalla digital","value":"No"},{"label":"Con cuchilla autoafilables","value":"No"},{"label":"Con cabezal inclinable","value":"No"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La Kemei LFJ-KM-2299 es una patillera inalámbrica pensada para quienes buscan mantener barba y cabello con una terminación prolija desde casa. Su diseño sin cable facilita moverla con comodidad y la hace práctica para sesiones rápidas de arreglo.

Ofrece recorte y perfilado para acompañar rutinas de cuidado personal en distintas zonas del rostro y del cabello. Al contar con cabezales removibles, el mantenimiento resulta más simple y el uso diario más cómodo.

Incluye tres posiciones y tres peines guía plásticos, lo que permite adaptar el largo de trabajo según el estilo deseado. Esta variedad ayuda a lograr un acabado más controlado, ya sea para detalles finos o para un perfilado más uniforme.

La batería recargable y la carga por USB suman practicidad en el día a día. También es una opción conveniente para llevar de viaje, ya que no depende de un enchufe durante el uso.

Los cabezales lavables aportan higiene y facilitan la limpieza después de cada uso. Además, se acompaña con aceite lubricante y cepillo, elementos útiles para conservar el rendimiento y mantener la patillera en buen estado.

Por sus prestaciones, resulta una buena elección para quienes buscan una herramienta compacta, versátil y fácil de integrar en la rutina de arreglo personal. Su enfoque está en ofrecer control, comodidad y practicidad en un solo equipo.'
where sku = 'LFJ-KM-291';
update products set active = false, ml_item_id = null where sku = 'MLA1911283377';

-- LFJ-KM-2362 "Clipper inalambrico - 3 posiciones - 1 a 3 mm - Lubricante, cepillo de limpieza" <- MLA3643543058 "Trimmer Kemei Lfj-km-2362 Máquina Patillera Naranja"
-- Trimmer KM-2362 (codigo+stock exactos)
update products set
  specs = '[{"label":"Accesorios incluidos","value":"3 peines guía plásticos,Aceite lubricante,Cepillo"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Naranja"},{"label":"Cantidad de peines","value":"3"},{"label":"Funciones","value":"Corte y perfilado de cabello y barba"},{"label":"Transportabilidad Hazmat","value":"Exceptuado"},{"label":"Tipos de cabezales","value":"Removible"},{"label":"Impuesto interno","value":"0 %"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es marca destacada","value":"No"},{"label":"Es apta para bebés","value":"No"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es marca TOM","value":"No"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Naranja"},{"label":"Modelo","value":"LFJ-KM-2362"},{"label":"Cantidad de posiciones","value":"4"},{"label":"Tipo de alimentación","value":"USB"},{"label":"Altura del paquete del seller","value":"22 cm"},{"label":"Largo del paquete del seller","value":"9 cm"},{"label":"Peso del paquete del seller","value":"120 g"},{"label":"Ancho del paquete del seller","value":"14 cm"},{"label":"SKU","value":"LFJ-KM-2362"},{"label":"IVA","value":"21 %"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La patillera Kemei LFJ-KM-2362 está pensada para quienes buscan mantener barba y cabello con un aspecto prolijo en casa. Su formato inalámbrico facilita el manejo y permite trabajar con mayor libertad en distintas rutinas de arreglo personal.

Funciona con alimentación USB y cuenta con batería recargable, una combinación práctica para usarla en diferentes momentos y llevarla con facilidad en viajes. Sus cabezales removibles ayudan a simplificar la limpieza y el mantenimiento luego de cada uso.

Los tres peines guía plásticos y las cuatro posiciones disponibles ofrecen un ajuste cómodo para definir el estilo según la longitud preferida. Esto resulta útil para realizar un perfilado más preciso en barba y cabello sin depender de herramientas complejas.

También incorpora cabezales lavables, algo que suma higiene y practicidad en el uso frecuente. El cepillo y el aceite lubricante incluidos acompañan la rutina de cuidado y ayudan a conservar el desempeño del equipo.

Es una opción funcional para personas que valoran un equipo sencillo, portátil y orientado al arreglo personal, con un manejo directo y accesorios útiles. El modelo LFJ-KM-2362 de Kemei reúne practicidad, movilidad y detalles pensados para un uso cotidiano.

La combinación de peines guía, alimentación USB y estructura inalámbrica favorece una experiencia cómoda y ordenada. Es una herramienta útil para quienes buscan un equipo fácil de llevar y sencillo de mantener.'
where sku = 'LFJ-KM-2362';
update products set active = false, ml_item_id = null where sku = 'MLA3643543058';

-- TXQ-KM-1102 "Shaver inalambrico - Con trimmer - Uso humedo/seco - Cepillo de limpieza" <- MLA1714139819 "Afeitadora Shaver 2 Rodillos Inalámbrica Kemei Negro"
-- Afeitadora Shaver 2 Rodillos (stock exacto, unico candidato st39)
update products set
  specs = '[{"label":"Accesorios incluidos","value":"Cargador,Cuchillas de acero,Peines guía"},{"label":"Voltaje de la batería","value":"220V"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Negro"},{"label":"Cantidad de peines","value":"4"},{"label":"Funciones","value":"Cortadora de pelo,Afeitadora"},{"label":"Tipos de cabezales","value":"Ergónomicos,Removibles"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es apta para bebés","value":"Sí"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Modelo","value":"KM-1102"},{"label":"Cantidad de posiciones","value":"4"},{"label":"Tipo de alimentación","value":"Batería recargable"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La Afeitadora Shaver 2 rodillos Inalámbrica Kemei es la herramienta ideal para quienes buscan un afeitado eficiente y cómodo. Con su diseño ergonómico y cabezales removibles, se adapta perfectamente a las curvas del rostro, garantizando un corte preciso en cada uso. Su batería recargable de 220V permite un uso prolongado sin la molestia de cables, lo que la convierte en una opción perfecta para llevar de viaje.

Incluye un cargador y cuchillas de acero de alta calidad, asegurando durabilidad y un rendimiento excepcional. Además, cuenta con cuatro peines guía que permiten ajustar la longitud del corte según tus preferencias. Esta afeitadora es apta para toda la familia, incluyendo bebés, lo que la hace versátil y práctica para el cuidado personal.

Los cabezales lavables facilitan la limpieza, manteniendo la afeitadora en óptimas condiciones. Con cuatro posiciones de corte, puedes personalizar tu experiencia de afeitado para obtener resultados profesionales en la comodidad de tu hogar. La Afeitadora Shaver Kemei es la elección perfecta para quienes valoran la calidad y la comodidad en su rutina de cuidado personal.'
where sku = 'TXQ-KM-1102';
update products set active = false, ml_item_id = null where sku = 'MLA1714139819';

-- TXD-KM-TX8 "Shaver inalambrico - Con trimmer - Cepillo de limpieza" <- MLA1714162805 "Kit Afeitadora Shaver + Patillera Trimmer + Accesorios Kemei Dorado"
-- Kit Afeitadora+Patillera (descripcion "con trimmer" coincide exacto, stock exacto)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714162805-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714162805-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714162805-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714162805-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714162805-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714162805-6.webp"]'::jsonb,
  specs = '[{"label":"Accesorios incluidos","value":"Cargador,Cuchillas de acero,Peines guía"},{"label":"Voltaje de la batería","value":"220V"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Dorado"},{"label":"Cantidad de peines","value":"4"},{"label":"Funciones","value":"Cortadora de pelo,Afeitadora"},{"label":"Tipos de cabezales","value":"Ergónomicos,Removibles"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es apta para bebés","value":"Sí"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Dorado"},{"label":"Modelo","value":"KM-TX8"},{"label":"Cantidad de posiciones","value":"4"},{"label":"Tipo de alimentación","value":"Batería recargable"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La afeitadora Kemei KM-TX8 es la solución perfecta para quienes buscan un cuidado personal eficiente y versátil. Este dispositivo combina una afeitadora y una patillera en un solo producto, ideal para mantener un estilo impecable en todo momento. Con cuchillas de acero de alta calidad y cabezales ergonómicos, garantiza un corte preciso y cómodo.

El kit incluye cuatro peines guía que permiten ajustar la longitud del corte según tus preferencias. Su diseño inalámbrico y batería recargable de 220V lo hace apto para viajes, asegurando que siempre estés listo para cualquier ocasión. Además, los cabezales son lavables, lo que facilita su mantenimiento y limpieza.

Este producto es apto para toda la familia, incluyendo bebés, lo que lo convierte en una opción segura y práctica para el cuidado del cabello. Con funciones de cortadora de pelo y afeitadora, es ideal para quienes buscan un dispositivo multifuncional que se adapte a sus necesidades. La Kemei KM-TX8 es la herramienta que transformará tu rutina de cuidado personal.'
where sku = 'TXD-KM-TX8';
update products set active = false, ml_item_id = null where sku = 'MLA1714162805';

-- TXD-KM-T396 "Shaver inalambrico - Cepillo de limpieza" <- MLA1714202833 "Afeitadora Shaver 3 Rodillos Usb-c  Kemei Rojo"
-- Afeitadora Shaver 3 Rodillos (por eliminacion tras asignar TXD-KM-TX8, stock exacto)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714202833-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714202833-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714202833-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714202833-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714202833-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1714202833-6.jpg"]'::jsonb,
  specs = '[{"label":"Accesorios incluidos","value":"Cargador,Cuchillas de acero,Peines guía"},{"label":"Voltaje de la batería","value":"220V"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Rojo"},{"label":"Cantidad de peines","value":"4"},{"label":"Funciones","value":"Cortadora de pelo,Afeitadora"},{"label":"Tipos de cabezales","value":"Ergónomicos,Removibles"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es apta para bebés","value":"Sí"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Rojo"},{"label":"Modelo","value":"KM-T396"},{"label":"Cantidad de posiciones","value":"4"},{"label":"Tipo de alimentación","value":"Batería recargable"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La Afeitadora Shaver 3 rodillos USB-C Kemei es la herramienta ideal para quienes buscan un afeitado eficiente y cómodo. Con su diseño ergonómico y cabezales removibles, se adapta perfectamente a las curvas del rostro, garantizando un acabado suave y sin irritaciones. Su batería recargable de 220V permite un uso prolongado, ideal para viajes o para el uso diario en casa.

Incluye un cargador y cuchillas de acero de alta calidad, asegurando un rendimiento duradero. Además, cuenta con cuatro peines guía que ofrecen versatilidad en el corte de cabello, permitiendo personalizar la longitud según tus preferencias. Esta afeitadora es apta para bebés, lo que la convierte en una opción segura para toda la familia.

La función inalámbrica proporciona libertad de movimiento, mientras que los cabezales lavables facilitan la limpieza y el mantenimiento. Con cuatro posiciones de corte, podrás lograr el estilo deseado con facilidad. La Afeitadora Shaver Kemei es la elección perfecta para quienes valoran la calidad y la comodidad en su rutina de cuidado personal.'
where sku = 'TXD-KM-T396';
update products set active = false, ml_item_id = null where sku = 'MLA1714202833';

