-- Migracion 082: 5 duplicados mas via campo Modelo, incluye el
-- descubrimiento de que los kits de camaras de seguridad SI tienen
-- equivalente en el distribuidor (no eran unicos de ML como se penso
-- antes). Ya aplicado con la service role key.

-- JFD "Climazon infrarrojo" <- MLA1747096227 "Climazón Giratorio Profesional 360° Para Peluquería Blanco"
-- Climazon giratorio 360 (Modelo confirmado en specs)
update products set
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Modelo detallado","value":"JFD"},{"label":"Es iónico","value":"Sí"},{"label":"Es profesional","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Color principal","value":"Blanco"},{"label":"Modelo","value":"JFD"},{"label":"Cantidad de velocidades","value":"1"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'El Climazón Giratorio Profesional 360° de Behmont es la herramienta ideal para los profesionales de la peluquería que buscan resultados excepcionales. Su diseño innovador permite un secado uniforme y eficiente, gracias a su tecnología iónica que reduce el frizz y aporta brillo al cabello. 

Con un modelo JFD que combina funcionalidad y estilo, este secador es perfecto para todo tipo de cabellos. Su capacidad de rotación de 360° facilita el acceso a todas las áreas de la cabeza, asegurando un secado rápido y cómodo.

El secador cuenta con una velocidad, lo que lo hace fácil de manejar y perfecto para quienes buscan simplicidad sin sacrificar calidad. Su construcción cerámica garantiza una distribución del calor más uniforme, protegiendo la salud del cabello durante el proceso de secado.

Ideal para salones de belleza y uso profesional, el Climazón Giratorio Profesional 360° es una inversión que transformará la experiencia de secado. Mejora la calidad del servicio ofrecido a tus clientes y destaca en el competitivo mundo de la peluquería con esta herramienta de alto rendimiento.'
where sku = 'JFD';
update products set active = false, ml_item_id = null where sku = 'MLA1747096227';

-- RMJ-500 "Sobadora de pie - 4 HP - Rodillos 118 x 490 mm - Apertura 5 a 25 mm" <- MLA3481777806 "Sobadora De Pie Panadería 4hp Rodillos 490mm Acero Behmont"
-- Sobadora de pie 4HP rodillos 490mm (Modelo+HP+medida+stock exactos)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Gris"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material de la máquina","value":"Acero"},{"label":"Modelo","value":"RMJ-500"},{"label":"Largo de los rodillos","value":"49 cm"},{"label":"Material de los rodillos","value":"ACERO"},{"label":"Voltaje","value":"220V"}]'::jsonb,
  description = 'La Sobadora de Pie RMJ-500 de Behmont es la máquina premium de la línea: motor de 4 HP y rodillos de 118x490mm para sobar grandes volúmenes de masa. Apertura de 5 a 25mm. Construcción reforzada de pie para fábricas de pan y producción industrial.

* Marca: Behmont
* Motor: 4 HP
* Rodillos: 118 x 490 mm
* Apertura regulable: 5 a 25 mm
* Construcción reforzada industrial
* Para grandes volúmenes de masa
* Para fábricas de pan
* Producción industrial intensiva'
where sku = 'RMJ-500';
update products set active = false, ml_item_id = null where sku = 'MLA3481777806';

-- TR-31S "Rebanadora de pan 12 mm - Tamaño pan 37 x 25 x 15 cm - Acero inox" <- MLA3481744892 "Rebanadora De Pan 12mm Acero Inoxidable Panadería Behmont"
-- Rebanadora de pan 12mm acero inox (Modelo confirmado en specs)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"TR-31S"}]'::jsonb,
  description = 'La Rebanadora de Pan TR-31S de Behmont corta el pan en rebanadas parejas de 12mm de forma rápida y segura. Construcción en acero inoxidable apta para uso intensivo en panaderías. Procesa panes de hasta 37x25x15 cm con cortes uniformes en cada pasada.

* Marca: Behmont
* Espesor de rebanada: 12 mm
* Construcción en acero inoxidable
* Tamaño de pan: 37x25x15 cm
* Rebanadas parejas y uniformes
* Para panaderías profesionales
* Operación rápida y segura
* Fácil de limpiar'
where sku = 'TR-31S';
update products set active = false, ml_item_id = null where sku = 'MLA3481744892';

-- TS-8854C "Kit de Camaras Inalambricas x4 - Sin memoria - C/DVR - Resol. 5 MP con voz y nocturno a color" <- MLA3624351780 "Kit Seguridad 4 Cámaras Wifi Nvr Exterior Visión Nocturna Blanco"
-- Kit Seguridad 4 Camaras (Modelo confirmado + stock exacto)
update products set
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Locaciones de la cámara","value":"Exterior"},{"label":"Color","value":"Blanco"},{"label":"Conectividad","value":"Wi-Fi"},{"label":"Es motorizada","value":"No"},{"label":"Es resistente al agua","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Inalambrica"},{"label":"Color principal","value":"Blanco"},{"label":"Modelo","value":"TS-8854C"},{"label":"Lugares de montaje","value":"Exterior"},{"label":"Tipo de movimiento","value":"Fijo"},{"label":"Calidad de resolución","value":"5MP"},{"label":"Tipo de resolución","value":"HD"},{"label":"Formato de venta","value":"Unidad"},{"label":"Tipo de cámara de vigilancia","value":"Cámara de seguridad"},{"label":"Unidades por pack","value":"1"},{"label":"Con alarma","value":"No"},{"label":"Con visión nocturna a color","value":"Sí"},{"label":"Con sensor de movimiento","value":"No"},{"label":"Con visión nocturna","value":"Sí"},{"label":"Con audio bidireccional","value":"Sí"},{"label":"Con Wi-Fi","value":"Sí"}]'::jsonb,
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
where sku = 'TS-8854C';
update products set active = false, ml_item_id = null where sku = 'MLA3624351780';

-- HX-A05L8-BT2 "Kit de Camaras x8 - Sin memoria - C/DVR, cable 15 m - Resolucion 5 MP con voz y nocturno a color" <- MLA3624355068 "Kit Seguridad 8 Cámaras Wifi Nvr Exterior Visión Nocturna Blanco"
-- Kit Seguridad 8 Camaras (Modelo confirmado + cantidad de camaras + stock exactos)
update products set active = false, ml_item_id = null where sku = 'MLA3624355068';

