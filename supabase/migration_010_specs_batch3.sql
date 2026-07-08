-- Migracion 010: tercera tanda (12 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: sitios de fabricante/distribuidor
-- oficial (Philco, Inelro, Ceico, Kanji), catalogo de importados del
-- distribuidor (BEHMONT), tiendas grandes reconocidas (ver detalle en el chat).
-- Solo toca specs/description de estos 12 SKU puntuales, no pisa nada mas.

-- MH-I312: Auricular deportivo Moonki
update products set
  description = 'Auriculares deportivos Moonki Sound MH-I312, tipo in ear con diseño ergonomico y microfono incorporado para atender llamadas. Con drivers de 10mm entregan graves marcados, ideales para hacer actividad fisica.',
  specs = '[
    {"label":"Marca","value":"Moonki"},
    {"label":"Modelo","value":"MH-I312"},
    {"label":"Tipo","value":"In ear"},
    {"label":"Driver","value":"10mm"},
    {"label":"Respuesta de frecuencia","value":"20Hz-20KHz"},
    {"label":"Sensibilidad","value":"102dB"},
    {"label":"Impedancia","value":"16 Ohms"},
    {"label":"Conector","value":"3.5mm"},
    {"label":"Micrófono","value":"Sí"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MH-I312';

-- E-4002: Balanza de cocina digital Eiffel
update products set
  description = 'Balanza de cocina digital Eiffel E-4002 con bowl removible, pensada para pesar ingredientes con precision al preparar recetas. Tiene funcion tara para descontar el peso del recipiente y capacidad de hasta 4 kg.',
  specs = '[
    {"label":"Marca","value":"Eiffel"},
    {"label":"Modelo","value":"E-4002"},
    {"label":"Capacidad","value":"4 kg"},
    {"label":"Precisión","value":"1 gramo"},
    {"label":"Función","value":"Tara"},
    {"label":"Bowl","value":"Removible"},
    {"label":"Alimentación","value":"A pilas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'E-4002';

-- FIH350PI: Freezer exhibidor horizontal Inelro 279L
update products set
  description = 'Freezer exhibidor horizontal Inelro FIH-350 PI Plus de 279 litros, con tapa de vidrio curvo inclinado y 2 canastos organizadores. Usa gas refrigerante ecologico R290 y su diseño con LED interior ayuda a ahorrar hasta un 20% de energia.',
  specs = '[
    {"label":"Marca","value":"Inelro"},
    {"label":"Modelo","value":"FIH-350 PI Plus"},
    {"label":"Capacidad","value":"279 L"},
    {"label":"Rango de temperatura","value":"-21°C a -18°C"},
    {"label":"Potencia","value":"230 W"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Gas refrigerante","value":"R290"},
    {"label":"Dimensiones","value":"1127 x 627 x 837 mm"},
    {"label":"Peso","value":"53.5 kg"},
    {"label":"Accesorios","value":"2 canastos, ruedas dobles"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FIH350PI';

-- 9004: Cocina La Magica Euro Acero 4 hornallas
update products set
  description = 'Cocina La Magica Euro Acero de 4 hornallas, terminacion grafito, con luz interior en el horno, encendido electrico y timer. Cuenta con doble vidrio en la puerta del horno y funciona tanto con gas natural como envasado.',
  specs = '[
    {"label":"Marca","value":"La Mágica"},
    {"label":"Modelo","value":"Euro Acero"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"56 cm"},
    {"label":"Encendido","value":"Eléctrico (un solo toque)"},
    {"label":"Funciones","value":"Timer, luz interior, horno autolimpiante"},
    {"label":"Gas","value":"Natural o envasado"},
    {"label":"Dimensiones","value":"56 x 85 x 59 cm"},
    {"label":"Peso","value":"45 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '9004';

-- 200.60-I: Rack Behmont tramo inicial (fuente: catalogo de importados)
update products set
  description = 'Tramo inicial de rack industrial Behmont, encastrable con otros tramos para armar estanterias mas largas. Tiene 4 estantes con capacidad de 200 kg cada uno y agujero mariposa para regular la altura.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"200.60-I"},
    {"label":"Tipo","value":"Rack, tramo inicial"},
    {"label":"Medidas","value":"200 x 200 x 60 cm"},
    {"label":"Estantes","value":"4"},
    {"label":"Capacidad por estante","value":"200 kg"},
    {"label":"Sistema","value":"Encastrable, agujero mariposa"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '200.60-I';

-- 3100: Vitrina exhibidora vertical La Exhibidora 1.60m
update products set
  description = 'Vitrina exhibidora vertical de 1.60 m con estructura de acero inoxidable, 6 estantes y puertas corredizas de vidrio. Incorpora ruedas para trasladarla con facilidad dentro del local.',
  specs = '[
    {"label":"Marca","value":"La Exhibidora"},
    {"label":"Modelo","value":"3100"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Dimensiones","value":"160 x 90 x 40 cm"},
    {"label":"Estantes","value":"6"},
    {"label":"Puertas","value":"Corredizas de vidrio"},
    {"label":"Movilidad","value":"Con ruedas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '3100';

-- 94FM18P29AM211: Bicicleta MTB Philco rodado 29
update products set
  description = 'Bicicleta mountain bike Philco rodado 29, talle 18, con 21 velocidades y frenos a disco. Cuadro de aluminio, horquilla con suspension y llantas doble pared para un andar firme en distintos terrenos.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Tipo","value":"Mountain bike"},
    {"label":"Rodado","value":"29"},
    {"label":"Talle","value":"18"},
    {"label":"Velocidades","value":"21 (3x7)"},
    {"label":"Frenos","value":"A disco"},
    {"label":"Cuadro","value":"Aluminio"},
    {"label":"Horquilla","value":"Con suspensión"},
    {"label":"Llantas","value":"Doble pared"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '94FM18P29AM211';

-- 8-2: Tabla de corte Ceico 400x300x10mm
update products set
  description = 'Tabla de corte Ceico de polietileno, tamaño 400 x 300 x 10 mm, pensada para uso gastronomico profesional. Su superficie lisa facilita la limpieza y resiste el desgaste del uso diario en cocina.',
  specs = '[
    {"label":"Marca","value":"Ceico"},
    {"label":"Modelo","value":"8-2 (tamaño #1)"},
    {"label":"Material","value":"Polietileno"},
    {"label":"Medidas","value":"400 x 300 x 10 mm"},
    {"label":"Uso","value":"Gastronómico profesional"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '8-2';

-- V39: Ventilador de pie industrial Crivel
update products set
  description = 'Ventilador de pie industrial Crivel V39 de 30 pulgadas y 220 W, con 3 aspas metalicas tipo helice y base circular metalica. Tiene cabezal reclinable, funcion oscilante y vara cromada regulable en altura hasta 1.80 m.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"V39"},
    {"label":"Tamaño","value":"30 pulgadas"},
    {"label":"Potencia","value":"220 W"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Funciones","value":"Oscilante, cabezal reclinable"},
    {"label":"Altura regulable","value":"Hasta 1.80 m"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'V39';

-- 8316B: Silla Luna blanca Tizi Deco
update products set
  description = 'Silla Luna blanca fabricada en resina sintetica de alta densidad y fibra de vidrio ultrarresistente, apilable y resistente a la intemperie. Soporta hasta 150 kg y sus patas tienen regatones de goma antideslizantes.',
  specs = '[
    {"label":"Marca","value":"Tizi Deco"},
    {"label":"Modelo","value":"Luna"},
    {"label":"Material","value":"Resina sintética + fibra de vidrio"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad de peso","value":"150 kg"},
    {"label":"Características","value":"Apilable, resistente a la intemperie"},
    {"label":"Dimensiones","value":"58 x 54 x 77.7 cm (an x prof x alto)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '8316B';

-- X32: Autoestereo Blackpoint
update products set
  description = 'Autoestereo Blackpoint X32 con Bluetooth, USB, lector de tarjeta SD, radio FM digital y entrada auxiliar. Entrega 10 W x 4 canales, tiene ecualizador de bandas incorporado y panel frontal desmontable.',
  specs = '[
    {"label":"Marca","value":"Blackpoint"},
    {"label":"Modelo","value":"X32"},
    {"label":"Potencia","value":"10 W x 4 canales"},
    {"label":"Conectividad","value":"Bluetooth, USB, SD, AUX, FM"},
    {"label":"Pantalla","value":"LCD"},
    {"label":"Dimensiones","value":"17.8 x 5 x 8.5 cm"},
    {"label":"Accesorios","value":"Cargador para celular, panel desmontable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'X32';

-- AM600: Multiprocesadora Liliana Simply
update products set
  description = 'Multiprocesadora Liliana Simply AM600 de 650 W con 3 velocidades y funcion pulsador. Incluye cuchilla picadora, disco rallador, disco rebanador y emulsionador de acero inoxidable, con traba de seguridad para evitar accidentes.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"Simply AM600"},
    {"label":"Potencia","value":"650 W"},
    {"label":"Capacidad","value":"1 L"},
    {"label":"Velocidades","value":"3 + pulsador"},
    {"label":"Accesorios","value":"Cuchilla picadora, disco rallador, disco rebanador, emulsionador"},
    {"label":"Material cuchillas","value":"Acero inoxidable"},
    {"label":"Dimensiones","value":"36.7 x 33 x 20.3 cm"},
    {"label":"Seguridad","value":"Traba de seguridad"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AM600';
