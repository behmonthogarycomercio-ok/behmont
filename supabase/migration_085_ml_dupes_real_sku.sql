-- Migracion 085: 18 duplicados de MercadoLibre resueltos usando el SKU
-- REAL del vendedor (visible solo en el panel de gestion de
-- publicaciones de ML, no en los datos que trae el sync), en vez del
-- campo "Modelo" auto-generado por ML que en varios casos era generico,
-- estaba mal copiado entre publicaciones, o directamente no existia
-- (ej: "Auckland", "Atena", "Tokio" eran solo nombres de fantasia sin
-- codigo real). Incluye la resolucion del misterio "Silla Steglitz":
-- el SKU real es 1007 "Silla fija apilable Narke" -- el titulo de la
-- publicacion de ML tenia el nombre de modelo incorrecto.
-- Ya aplicado directamente con la service role key.

-- 25-YXH10 "Ayudante de peluqueria Steel - 5 cajones" <- MLA1511069411 "Carrito Auxiliar Barbería/peluquería Behmont Auckland Negro Negro" + MLA2898547506 "Carro Auxiliar Con Rueditas 5 Cajones Reforzado Con Metal Negro"
-- SKU real confirmado en el panel de vendedor de ML (no "Auckland" como decia el titulo)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511069411-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511069411-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511069411-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511069411-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511069411-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511069411-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"4"},{"label":"Altura","value":"95 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"37 cm"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"Auckland"},{"label":"Usos recomendados","value":"Barbería,Peluquería,Salón de belleza"},{"label":"Ancho","value":"37 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Auxiliar Barbería/Peluquería Behmont Auckland es la solución ideal para profesionales del estilismo que buscan eficacia y organización en su espacio de trabajo. Con un diseño elegante y moderno, este carrito es perfecto para barberías, peluquerías y salones de belleza, permitiendo un acceso rápido a los utensilios y productos necesarios durante cada servicio.

37 cm de largo, 37 cm de ancho y 95 cm de altura.
Estructura fabricada en metal.
Fabricado en plástico resistente.
Cuenta con un total de cuatro cajones.
Amplio almacenamiento para herramientas y cosméticos.
Posee ruedas para desplazarlo con facilidad entre estaciones. .
Combina funcionalidad y estilo.
Mejora la organización en tu espacio.'
where sku = '25-YXH10';
update products set active = false, ml_item_id = null where sku = 'MLA1511069411';
update products set active = false, ml_item_id = null where sku = 'MLA2898547506';

-- X11-5 "Ayudante de peluqueria Skinny - 5 cajones" <- MLA1511108297 "Carrito Ayudante 6 Cajones Barbería/peluquería Behmont Atena Negro"
-- SKU real confirmado en ML (no "Atena")
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511108297-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511108297-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511108297-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511108297-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511108297-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1511108297-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"6"},{"label":"Altura","value":"96 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"37 cm"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"Atena"},{"label":"Usos recomendados","value":"Ayudante para barbería y peluquería,Barbería,Carrito Ayudante,Peluquería,Salón de belleza,cajonera"},{"label":"Ancho","value":"40 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Ayudante Barbería/Peluquería Behmont Atena Negro es la solución perfecta para profesionales en el cuidado del cabello que buscan maximizar su eficiencia y organización. Con una altura de 96 cm y 6 cajones súper amplios, este carrito está diseñado para ofrecer comodidad y fácil acceso a las herramientas necesarias durante el trabajo en barberías y peluquerías.

Fabricado en plástico resistente.
Diseño moderno y amplio almacenamiento.
40 cm de ancho y un largo de 37 cm.
Equipado con seis cajones súper amplios.
Las ruedas incorporadas facilitan su movilidad.

Transforme su espacio de trabajo con el Carrito Ayudante Behmont Atena Negro y descubra la comodidad de tener todo lo necesario a la mano y organizado.'
where sku = 'X11-5';
update products set active = false, ml_item_id = null where sku = 'MLA1511108297';

-- 517-2 "Ayudante de peluqueria Grafiti - 5 cajones" <- MLA2194305160 "Carrito Ayudante Barbería/peluquería Behmont Tokyo Negro Negro"
-- SKU real confirmado en ML (no "Tokio")
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2194305160-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"4"},{"label":"Altura","value":"96 cm"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"37 cm"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"Tokio"},{"label":"Usos recomendados","value":"Ayudante para barbería y peluquería,Barbería,Carrito Ayudante,Peluquería,Salón de belleza"},{"label":"Ancho","value":"37 cm"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Ayudante Barbería/Peluquería Behmont Tokio Negro es la solución ideal para profesionales del estilismo que buscan una herramienta práctica y funcional. Este carrito está diseñado específicamente para atender las necesidades de barberías, peluquerías y salones de belleza, brindando un soporte eficaz en cada servicio. 

Fabricado en plástico resistente.
Base metálica. 
Fácil de mover gracias a sus ruedas.
Cuenta con cuatro cajones amplios.
Almacenamiento organizado para productos, herramientas y accesorios.

37 cm de largo, 37 cm de ancho y 96 cm de altura

Con el Carrito Ayudante Behmont Tokio, maximiza tu eficiencia y brinda a tus clientes un servicio de calidad superior.'
where sku = '517-2';
update products set active = false, ml_item_id = null where sku = 'MLA2194305160';

-- 25-YXH11 "Ayudante de peluqueria B&W - 5 cajones" <- MLA2898599882 "Carro Auxiliar Reforzado Metálico Con Rueditas Y 5 Cajones Negro"
-- SKU real confirmado en ML
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898599882-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898599882-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898599882-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898599882-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898599882-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898599882-6.jpg"]'::jsonb
where sku = '25-YXH11';
update products set active = false, ml_item_id = null where sku = 'MLA2898599882';

-- 25-JAY10 "Equipamientos - Cortapapas Horizontal" <- MLA2205134254 "Cortador De Papas Súper Filoso Horizontal De Mesa Behmont Plateado"
-- Tercera publicacion de ML para el mismo cortapapas (SKU real confirmado)
update products set active = false, ml_item_id = null where sku = 'MLA2205134254';

-- HX-A05L4-BT2 "Kit de Camaras x4 - Sin memoria - C/DVR, cable 15 m - Resolucion 5 MP con voz y nocturno a color" <- MLA3624451566 "Kit Seguridad 4 Cámaras Wifi Nvr Exterior Visión Nocturna Blanco"
-- SKU real confirmado (kit 4 camaras, no 8 como decia el Modelo mal leido)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Diámetro del lente de la cámara","value":"4 mm"},{"label":"Locaciones de la cámara","value":"Exterior"},{"label":"Color","value":"Blanco"},{"label":"Conectividad","value":"Wi-Fi"},{"label":"Zoom digital","value":"4x"},{"label":"Es motorizada","value":"No"},{"label":"Es resistente al agua","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Camara de Seguridad"},{"label":"Color principal","value":"Blanco"},{"label":"Temperatura máxima soportada","value":"50 °C"},{"label":"Modelo","value":"HX-A05L8-BT2"},{"label":"Lugares de montaje","value":"Exterior"},{"label":"Tipo de movimiento","value":"Fijo"},{"label":"Calidad de resolución","value":"5MP"},{"label":"Tipo de resolución","value":"HD"},{"label":"Formato de venta","value":"Unidad"},{"label":"Tipo de cámara de vigilancia","value":"Cámara de seguridad"},{"label":"Unidades por pack","value":"1"},{"label":"Campo visual","value":"90°"},{"label":"Con alarma","value":"No"},{"label":"Con visión nocturna a color","value":"Sí"},{"label":"Con sensor de movimiento","value":"No"},{"label":"Con visión nocturna","value":"Sí"},{"label":"Con audio bidireccional","value":"No"},{"label":"Con Wi-Fi","value":"Sí"}]'::jsonb,
  description = 'Kit de seguridad completo con 4 cámaras inalámbricas y grabador NVR para monitoreo exterior. Ideal para proteger tu hogar o negocio con tecnología WiFi que facilita la instalación sin cables.

CARACTERÍSTICAS PRINCIPALES
- Incluye 4 cámaras de vigilancia con conexión WiFi.
- Grabador NVR con antenas para mejor recepción inalámbrica.
- Visión nocturna para monitoreo 24/7 en condiciones de baja luz.
- Diseño resistente para uso en exteriores.

RECOMENDACIONES
- Instalar las cámaras en lugares estratégicos para máxima cobertura.
- Asegurar una buena señal WiFi para evitar interrupciones en la transmisión.
- Consultar el manual para configuración y acceso remoto desde dispositivos compatibles.'
where sku = 'HX-A05L4-BT2';
update products set active = false, ml_item_id = null where sku = 'MLA3624451566';

-- 25-JAY05 "Picadora de carne manual 22." <- MLA1511166839 "Picadora Carne N° 22 Fundición De Aluminio A Manija Behmont"
-- Segunda publicacion de ML para el mismo producto (SKU real confirmado)
update products set active = false, ml_item_id = null where sku = 'MLA1511166839';

-- 25-JAY04 "Picadora de carne manual 32." <- MLA1511231921 "Picadora Carne N° 32 Manual De Fundición Con Manija Behmont" + MLA3481752072 "Picadora De Carne Manual N32 Acero Gastronomía Behmont"
-- SKU real confirmado en ML para ambas publicaciones de picadora N32
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Profundidad","value":"18 cm"},{"label":"Altura","value":"13 cm"},{"label":"Producción por hora","value":"50"},{"label":"Es industrial","value":"Sí"},{"label":"Es lavable","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material","value":"Fundición de Metal"},{"label":"Tipo de picadora de carne","value":"Manual"},{"label":"Modelo","value":"N° 32"},{"label":"Tipo de alimentación","value":"Manual"},{"label":"Peso","value":"9 kg"},{"label":"Ancho","value":"24 cm"}]'::jsonb,
  description = 'La Picadora de Carne N° 32 Manual de Fundición con Manija Behmont es la herramienta ideal para los amantes de la cocina que buscan una opción robusta y eficiente para la preparación de carnes. 

Pica Carne, Pollo, etc.
Formato Vintage/Rústico.
Fundición de Hierro con baño de Cromo.
Fácil de Limpiar.
Fácil de Desarmar.
Contrarresta la presencia de bacterias.
Incluye Cuchilla, Cabezal, Husillo y Manija.
Cuchilla y Placa fabricada en Acero.

Ya sea para la elaboración de hamburguesas caseras, carne molida para guisos o embutidos, o para carnicería, esta picadora manual es un recurso valioso, permitiendo seleccionar el tipo de carne y el tamaño de picado según sus preferencias.'
where sku = '25-JAY04';
update products set active = false, ml_item_id = null where sku = 'MLA1511231921';
update products set active = false, ml_item_id = null where sku = 'MLA3481752072';

-- BASE37 "Reposapies - Acero inox." <- MLA1511046247 "Reposapies Cromado Para Barberia/peluquería Behmont"
-- SKU real confirmado (coincide con el reposapies ya cargado)
update products set active = false, ml_item_id = null where sku = 'MLA1511046247';

-- 517-12 "Secador casco" <- MLA2213445526 "Seca Pelo Estructura Telescópica Con 4 Ruedas Behmont Negro" + MLA3164610282 "Secador Capilar Profesional De Pié Con Ruedas Premium Negro"
-- SKU real confirmado para ambas publicaciones
update products set active = false, ml_item_id = null where sku = 'MLA2213445526';
update products set active = false, ml_item_id = null where sku = 'MLA3164610282';

-- 1007 "Silla fija apilable Narke - Tela mesh - Cromada - Negro" <- MLA1902633005 "Silla De Oficina Steglitz Apilable Behmont Tela Mesh Negro Negro 1007"
-- SKU real confirmado: es "Silla fija apilable Narke", no "Steglitz" como decia el titulo de ML (listado con nombre incorrecto)
update products set
  specs = '[{"label":"Altura del respaldo","value":"50 cm"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Negro"},{"label":"Modelo detallado","value":"PVC apilable"},{"label":"Materiales del relleno","value":"Espuma de alta densidad"},{"label":"Incluye manual de ensamblado","value":"No"},{"label":"Es ergonómica","value":"Sí"},{"label":"Es gamer","value":"No"},{"label":"Es giratoria","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Altura máxima de la silla","value":"45 cm"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Modelo","value":"25-JA31"},{"label":"Tipo de silla de oficina","value":"Silla de oficina estándar"},{"label":"Ancho de la silla","value":"50 cm"},{"label":"Requiere ensamblado","value":"Sí"},{"label":"Formato de venta","value":"Unidad"},{"label":"Profundidad del asiento","value":"50 cm"},{"label":"Materiales de la estructura","value":"Metal y plástico"},{"label":"Unidades por pack","value":"1"},{"label":"Material del tapizado","value":"1007"},{"label":"Con apoyabrazos ajustable","value":"No"},{"label":"Con altura ajustable","value":"No"},{"label":"Con apoyabrazos","value":"Sí"},{"label":"Con apoya pies","value":"No"},{"label":"Con aro para pies","value":"No"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con luces","value":"No"},{"label":"Con respaldo reclinable","value":"No"},{"label":"Con ruedas","value":"No"}]'::jsonb,
  description = 'Esta silla de oficina BEHMONT está pensada para puestos de trabajo, recepciones y áreas donde se necesita una opción práctica y firme para sentarse durante la jornada. Su diseño apilable ayuda a optimizar el espacio cuando no está en uso.

El respaldo de 50 cm aporta apoyo en la espalda, mientras que el asiento de 50 cm de ancho y 50 cm de profundidad brinda una superficie amplia para el uso diario. El tapizado en tela mesh negra favorece una sensación más fresca y cómoda.

Cuenta con relleno de espuma de alta densidad y apoyabrazos, lo que mejora la comodidad en pausas breves o tareas continuas. La estructura combina metal y plástico para ofrecer una construcción estable y funcional.

Es una silla ergonómica, sin sistema giratorio, sin ruedas y sin respaldo reclinable, pensada para una experiencia simple y directa. Esa configuración la vuelve adecuada para entornos donde se prioriza la practicidad y el orden.

Soporta hasta 120 kg, un dato útil para valorar su resistencia en uso cotidiano. Requiere armado, por lo que conviene prever ese paso antes de ponerla en servicio.

Por sus medidas y su formato apilable, resulta una alternativa útil para oficinas, salas de espera o espacios compartidos que necesitan soluciones versátiles. La combinación de respaldo alto, asiento amplio y acabado en negro facilita integrarla en distintos ambientes profesionales.'
where sku = '1007';
update products set active = false, ml_item_id = null where sku = 'MLA1902633005';

-- 25-YXH09 "Ayudante de peluqueria Basic - Altura regulable" <- MLA2898521520 "Tintorero Carro Auxiliar Con Rueditas Y Mesa Metálica Negro"
-- SKU real confirmado (el unico de los 4 candidatos "25-YXH09" que realmente lo es)
update products set active = false, ml_item_id = null where sku = 'MLA2898521520';

-- 517-7 "Aspiradora de cabello" <- MLA1511072353 "Aspiradora Para Peluquería Hair Vacuum Stylance Aut. 1400 W"
-- Segunda publicacion de ML para la misma aspiradora (SKU real confirmado)
update products set active = false, ml_item_id = null where sku = 'MLA1511072353';

-- B17 "Ayudante de peluqueria Metal - 5 cajones" <- MLA2898419144 "Carrito Auxiliar Y Tintorero Con Rueditas Con 6 Cajones Negro"
-- SKU real confirmado en ML
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898419144-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898419144-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898419144-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898419144-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898419144-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2898419144-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Cantidad de cajones","value":"6"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Negro"},{"label":"Material","value":"Plástico"},{"label":"Modelo","value":"17"},{"label":"Usos recomendados","value":"uso auxiliar para tintorería o almacenamiento móvil"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Carrito Auxiliar y Tintorero Con Rueditas de la marca Behmont es la solución ideal para quienes buscan optimizar el espacio y la organización en tintorerías o en cualquier entorno que requiera almacenamiento móvil. Fabricado en plástico resistente, este carrito combina durabilidad y ligereza, facilitando su traslado y uso diario.

Con un diseño funcional, cuenta con seis cajones que permiten clasificar y almacenar diversos artículos de manera eficiente. Se adapta a diferentes necesidades, ofreciendo un acceso rápido y sencillo a los elementos que se requieran en cada momento.

Las ruedas incorporadas garantizan una movilidad fluida, permitiendo que el carrito se desplace sin esfuerzo por cualquier superficie. Este producto es perfecto para profesionales que buscan mejorar su flujo de trabajo y mantener un ambiente ordenado y accesible.'
where sku = 'B17';
update products set active = false, ml_item_id = null where sku = 'MLA2898419144';

-- 517-13 "Vaporizador casco" <- MLA1513250103 "Humificador Vapo Estructura Telescópica Con Ruedas Behmont Negro"
-- SKU real confirmado (no 517-12 como decia el Modelo mal leido)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Frecuencia","value":"50 Hz"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Materiales","value":"Metal,Plástico"},{"label":"Modelo","value":"517-12"},{"label":"Tipo de montaje","value":"de apoyo"},{"label":"Potencia","value":"240 W"},{"label":"Voltaje","value":"1000V"},{"label":"Capacidad del tanque de agua","value":"200 mL"},{"label":"Peso","value":"6100 g"},{"label":"Con temperatura regulable","value":"Sí"},{"label":"Con apagado automático","value":"Sí"},{"label":"Con temporizador","value":"No"},{"label":"Con ruedas","value":"Sí"}]'::jsonb,
  description = 'El Humificador / Vaporizador de Pelo Estructura Telescópica con Ruedas Behmont, modelo 517-13, es el aliado perfecto para los profesionales del estilismo que buscan versatilidad y eficiencia.

Potencia de hasta 240 W.
Panel de control.
Tecnología iónica.
Reduce el frizz
Permite fijar peinados de manera efectiva.
El diseño telescópico.

517-13
Bulto: 78x38x40.
Peso: 6 Kg.

Este secador es una herramienta profesional que elevará la calidad del servicio que ofreces, asegurando la satisfacción de tus clientes.'
where sku = '517-13';
update products set active = false, ml_item_id = null where sku = 'MLA1513250103';

