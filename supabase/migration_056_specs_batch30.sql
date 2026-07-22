-- Migracion 056: tanda 30 de specs/descripcion investigados (skill
-- product-specs-research). Cuarta tanda de "Gastronomia", enfocada en
-- marcas con presencia web verificable (Best Cold, Llanos, Morelli,
-- Codini, Danda, Hogaris, Kanji, Santini, Nakan, La Exibidora) evitando
-- por ahora Calabro y Sol Real (26 y 62 productos pendientes
-- respectivamente, mayoristas sin fichas individuales online, ya
-- documentado en tandas previas). 24 confirmados de 41 candidatos
-- investigados.
--
-- Excluidos de esta tanda (17, no tocados por este SQL):
-- Ceico: 7 (Churrera estrella), 11 (Cortapapas vertical) - ya excluidos
-- en tanda 29 por falta de fuente confiable, se reconfirma el mismo
-- resultado. Empanadora chica manual (SKU '1,65161E+11', codigo
-- corrupto de origen) y 66651651 (Empanadora 80kg/h) - sin ficha
-- especifica de marca encontrada.
-- Behmont/Tra (linea propia, sin fuente externa verificable): LC01AC,
-- LC01P (Licuadoras Anion), FS8R, FD16R (Freidoras), SP30R, SP30S
-- (Pancheras), 1651651 (Churrera 6kg).
-- Magi: 12361 (Churrera tacho plastico 2kg) - mismo problema que 12362
-- (ya excluido en tanda 29): specs genericas de la categoria, no
-- especificas de la marca.
-- Sol Mayo: 231 (Salamandra 5000-6000 cal) - existen variantes Redonda
-- y Cuadrada con dimensiones distintas para el mismo rango de calorias,
-- no se pudo determinar cual corresponde a este SKU. 234 (Salamandra
-- Romana 6000-7000 cal) - los modelos "Romana" encontrados son de 8000 o
-- 11000 cal, ninguno coincide con el rango declarado en la base.
-- Solei: B-60CE (Horno 50L) - existen variantes B-60CA (con anafes) y
-- S-60C (sin anafes) con specs distintas; el codigo exacto B-60CE no
-- tiene ficha propia encontrada.
-- Usman: 500 (Horno Pizzero Acero Black) - existen modelos H6 y H12 con
-- capacidades y potencias distintas, el nombre no especifica cual.
-- Motta: 860PVN (Multi Horno) - se encontraron variantes de 4 y 6
-- hornallas sin poder confirmar cual corresponde a este codigo exacto.

-- 1200WE: Vitrina mostrador Best Cold Winnipeg 450L (fuente: MercadoLibre, gastrofer, bazardelgastronomico)
update products set
  description = 'Vitrina mostrador refrigerada de la linea Winnipeg, con mesada de acero inoxidable y estructura curvada, pensada para exhibir fiambres, lacteos y bebidas en comercios. Su compresor de 1/3 HP y evaporador de aire forzado mantienen una temperatura constante.',
  specs = '[{"label":"Marca","value":"Best Cold"},{"label":"Modelo","value":"1200WE (linea Winnipeg)"},{"label":"Material","value":"Mesada acero inoxidable AISI 430, laterales plastico inyectado"},{"label":"Dimensiones","value":"1200 x 740 x 1190 mm"},{"label":"Capacidad","value":"450 L"},{"label":"Potencia","value":"1/3 HP"},{"label":"Función","value":"Temperatura 2°C a 6°C, refrigeración por aire forzado, luz interior, estantes regulables"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '1200WE';

-- 1400WE: Vitrina mostrador Best Cold Winnipeg 530L (fuente: MercadoLibre - mastersupply.com.ar, misma linea)
update products set
  description = 'Vitrina mostrador refrigerada de la linea Winnipeg, con mesada de acero inoxidable y estructura curvada, pensada para exhibir fiambres, lacteos y bebidas en comercios. Su compresor de 1/3 HP y evaporador de aire forzado mantienen una temperatura constante.',
  specs = '[{"label":"Marca","value":"Best Cold"},{"label":"Modelo","value":"1400WE (linea Winnipeg)"},{"label":"Material","value":"Mesada acero inoxidable AISI 430, laterales plastico inyectado"},{"label":"Dimensiones","value":"1400 x 740 x 1190 mm"},{"label":"Capacidad","value":"530 L"},{"label":"Potencia","value":"1/3 HP"},{"label":"Función","value":"Temperatura 2°C a 6°C, refrigeración por aire forzado, luz interior, estantes regulables"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '1400WE';

-- 24871: Campana Llanos Milenica 60 (fuente: llanosacero.com.ar, cocinasonline.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana extractora circular de la linea Milenica, con comando pulsante y regulador de tres velocidades. Su motor interno de doble compresor ofrece buen rendimiento con bajo nivel sonoro para cocinas domesticas o gastronomicas chicas.',
  specs = '[{"label":"Marca","value":"Llanos"},{"label":"Modelo","value":"Milénica LC 60 (cod. 24871)"},{"label":"Material","value":"Acero inoxidable esmerilado"},{"label":"Dimensiones","value":"60 cm ancho x 50-52 cm profundidad"},{"label":"Potencia","value":"175 W (motor 150W + luz 25W)"},{"label":"Función","value":"Comando pulsante 3 velocidades, caudal 500 m³/h, no admite filtro de carbón activo"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Origen","value":"Argentina"}]'::jsonb
where sku = '24871';

-- 24903: Campana Llanos Circular Milenica 90 (fuente: cetrogar.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana extractora circular de la linea Milenica en formato de 90 cm, pensada para cocinas mas amplias. Incorpora filtros de aluminio de triple malla lavables y comando pulsante de tres velocidades.',
  specs = '[{"label":"Marca","value":"Llanos"},{"label":"Modelo","value":"Circular Milénica 90 (cod. 24903)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"90 cm ancho"},{"label":"Potencia","value":"150 W"},{"label":"Función","value":"3 velocidades, caudal 500 m³/h, filtro de aluminio triple malla lavable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '24903';

-- 24914: Campana Llanos Clasic 60 (fuente: dogil.com.ar, sirhome.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana de pared de la linea Clasic, con comando pulsante y filtro de aluminio de triple malla lavable, pensada para uso residencial.',
  specs = '[{"label":"Marca","value":"Llanos"},{"label":"Modelo","value":"Clasic 60 (cod. 24914)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"60 cm ancho"},{"label":"Potencia","value":"150 W"},{"label":"Función","value":"3 velocidades, caudal 500 m³/h, luz incandescente, filtro aluminio triple malla lavable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '24914';

-- 24930: Campana Llanos Classic 90 (fuente: foschia.com.ar, cocinasonline.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana de pared de la linea Classic en formato de 90 cm, con filtro metalico lavable y comando pulsante de tres velocidades, pensada para cocinas mas amplias.',
  specs = '[{"label":"Marca","value":"Llanos"},{"label":"Modelo","value":"Classic 90 (cod. 24930)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"90 cm ancho"},{"label":"Función","value":"Comando pulsante 3 velocidades, filtro metálico lavable, luz"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '24930';

-- 304: Campana Llanos SuperEco 60 sin motor (fuente: cetrogar.com.ar, gammahogar.com.ar, ideahogar.com.ar)
update products set
  description = 'Campana extractora de linea economica, sin motor ni accesorios incluidos (luz, filtros o rejilla grasera), pensada para quien ya cuenta con un extractor propio o busca solo la cubierta.',
  specs = '[{"label":"Marca","value":"Llanos"},{"label":"Modelo","value":"SuperEco 60 (cod. 304)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"59.5 x 51 x 17 cm"},{"label":"Función","value":"Sin motor, sin luz, sin filtros - para instalación mural"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '304';

-- 800601: Campana Morelli Ferro 600 (fuente: dualequipamientos.com.ar, tosellihogar.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana extractora de pared de acero inoxidable, con motor de tres velocidades y luz LED, pensada para cocinas de 60 cm de ancho. Su filtro metalico removible facilita la limpieza periodica.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Ferro 600 (cod. 800601)"},{"label":"Material","value":"Acero inoxidable AISI 430"},{"label":"Dimensiones","value":"60 cm ancho x 51 cm profundidad x 45-85 cm altura regulable"},{"label":"Potencia","value":"100 W"},{"label":"Función","value":"Capacidad de aspiración 900 m³/h, 3 velocidades, luz LED, filtro metálico removible, salida exterior"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '800601';

-- 800604: Campana Morelli Ferro 900 (fuente: tosellihogar.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana extractora de pared de acero inoxidable en formato de 90 cm, con motor de tres velocidades y luz LED, pensada para cocinas mas amplias.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Ferro 900 (cod. 800604)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"90 x 85 x 51 cm"},{"label":"Función","value":"Capacidad de aspiración 900 m³/h, 3 velocidades, luz LED, filtro metálico removible, salida exterior"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '800604';

-- 800602: Campana Morelli Prego 600 Tactil (fuente: hendel.com, aguirrezabala.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana extractora de pared de la linea Prego, con comando tactil digital, tres velocidades y temporizador de apagado. Su motor de doble turbina ofrece alto rendimiento con bajo nivel sonoro.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Prego 600 Touch (cod. 800602)"},{"label":"Material","value":"Acero inoxidable esmerilado con frente de vidrio"},{"label":"Dimensiones","value":"60 cm ancho x 51 cm profundidad x 45-85 cm altura regulable"},{"label":"Función","value":"Comando táctil digital 3 velocidades con temporizador, motor doble turbina 900 m³/h reales, luz LED, control remoto, filtro metálico lavable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '800602';

-- 800603: Campana Morelli Prego 900 Tactil (fuente: fravega.com, volpatocentro.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Campana extractora de pared de la linea Prego en formato de 90 cm, con comando tactil digital, tres velocidades y temporizador de apagado. Su motor de doble turbina ofrece alto rendimiento con bajo nivel sonoro.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Prego 900 Touch (cod. 800603)"},{"label":"Material","value":"Acero inoxidable esmerilado con frente de vidrio"},{"label":"Dimensiones","value":"90 cm ancho x 51 cm profundidad x 45-85 cm altura regulable"},{"label":"Voltaje","value":"220V-50Hz"},{"label":"Potencia","value":"105 W"},{"label":"Función","value":"Comando táctil digital 3 velocidades con temporizador, motor doble turbina 900 m³/h reales, control remoto, para instalación con salida exterior"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '800603';

-- 18011: Cocina Morelli Doppia 550 (fuente: centrogar.com.ar, ferromar.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Cocina industrial de doble horno, con horno superior electrico tipo pizzero y horno inferior a gas, pensada para panaderias y pizzerias que necesitan cocciones simultaneas de distinto tipo. Sus rejas de fundicion y mecheros de aluminio permiten uso intensivo.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Doppia 550 (cod. 18011)"},{"label":"Material","value":"Rejas de fundición esmaltada"},{"label":"Dimensiones","value":"55 cm ancho x 94-98 cm alto x 63 cm profundidad"},{"label":"Voltaje","value":"Multigas (envasado/natural) + eléctrico 2050W"},{"label":"Función","value":"4 hornallas, horno superior eléctrico pizzero 27.7L, horno inferior a gas 61L, encendido eléctrico, luz interior, puerta con visor"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '18011';

-- 10010: Freidora Morelli F-15 (fuente: dualequipamientos.com.ar, rribaceta.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Freidora a gas de uso profesional, con cuba enlozada y frente de acero inoxidable, pensada para cocinas gastronomicas que requieren rendimiento y recuperacion rapida de temperatura.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"F-15 (cod. 10010)"},{"label":"Material","value":"Frente acero inoxidable esmerilado, cuba enlozada"},{"label":"Dimensiones","value":"46 x 75 x 51 cm"},{"label":"Peso","value":"20 kg"},{"label":"Potencia","value":"9.000 Kcal/h (gas natural)"},{"label":"Capacidad","value":"15 L (12L aceite + 1.5L agua), hasta 2kg por carga"},{"label":"Función","value":"Sistema multigas, pirómetro, esclusa de desagote, válvula de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '10010';

-- 10015: Freidora Morelli F-35 (fuente: friosur.com.ar, giraudoequipamiento.com - coincidencia exacta de codigo)
update products set
  description = 'Freidora a gas de uso profesional con dos canastos, cuba enlozada y frente de acero inoxidable, pensada para cocinas de alto volumen de produccion.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"F-35 (cod. 10015)"},{"label":"Material","value":"Gabinete acero inoxidable, cuba enlozada"},{"label":"Dimensiones","value":"58 x 75 x 65 cm"},{"label":"Peso","value":"25 kg"},{"label":"Potencia","value":"13.842 Kcal/h (solo gas natural)"},{"label":"Capacidad","value":"35 L, 2 canastos"},{"label":"Función","value":"Sistema multigas, pirómetro, válvula de seguridad, llave esclusa de drenaje, 8 inyectores"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '10015';

-- 700613: Horno Convector Morelli 4 bandejas (fuente: centerhogar.com.ar, hendel.com, gastroquil.com - coincidencia exacta de codigo)
update products set
  description = 'Horno electrico a conveccion con turbina forzadora, pensado para panaderias y pastelerias que necesitan coccion pareja incluso con productos congelados. Su puerta de doble vidrio templado permite controlar la coccion sin abrir el horno.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Dorato (cod. 700613)"},{"label":"Material","value":"Exterior acero inoxidable, interior enlozado"},{"label":"Dimensiones","value":"545 x 550 x 550 mm (bandejas de 420 x 285 mm)"},{"label":"Voltaje","value":"220V monofásico"},{"label":"Potencia","value":"2700 W (turbina)"},{"label":"Capacidad","value":"4 bandejas"},{"label":"Función","value":"Temperatura 50°C a 280°C, termostato de seguridad, puerta doble vidrio templado, luz interior"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '700613';

-- 101610: Horno pizzero Morelli Saho H6 (fuente: universogastronomico.com.ar, dismaarg.com.ar)
update products set
  description = 'Horno pizzero de piso refractario, con cuerpo de acero inoxidable mate y capacidad para seis moldes o tres bandejas. Su sistema de calor envolvente combinado con circulacion de aire logra una coccion pareja similar a la de un horno por conveccion.',
  specs = '[{"label":"Marca","value":"Morelli"},{"label":"Modelo","value":"Saho H6"},{"label":"Material","value":"Acero inoxidable mate, techo enlozado, piso baldosas refractarias"},{"label":"Dimensiones","value":"93 x 47 x 56 cm sin base (140 cm con base)"},{"label":"Capacidad","value":"6 moldes o 3 bandejas de 72 x 39 cm"},{"label":"Función","value":"Base desarmable, válvula de seguridad, 3 rejillas, calor envolvente con circulación de aire"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '101610';

-- 46CL: Horno electrico Codini 33L (fuente: cetrogar.com.ar, megatone.net, codini.com.ar)
update products set
  description = 'Horno electrico compacto con temperatura regulable y temporizador, pensado para uso hogareño o de kioscos y comercios chicos. Incluye grill y bandeja de horneado.',
  specs = '[{"label":"Marca","value":"Codini"},{"label":"Modelo","value":"33 Litros"},{"label":"Dimensiones","value":"350 x 530 x 400 mm (profundidad interna 320 mm)"},{"label":"Peso","value":"8 kg"},{"label":"Potencia","value":"2000 W"},{"label":"Capacidad","value":"33 L"},{"label":"Función","value":"Temperatura regulable 100°C-250°C, 3 posiciones de rejilla, timer, incluye grill y bandeja, clase energética B"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '46CL';

-- C872C: Cocina Danda Siena Multiple (fuente: misparrillas.com.ar, myacomercial.com)
update products set
  description = 'Cocina industrial multifuncion con cuatro hornallas, carlitero (grill) y plancha, construida en acero inoxidable cepillado. Su horno enlozado con valvula de seguridad y rejas de fundicion la hacen apta para uso comercial intensivo.',
  specs = '[{"label":"Marca","value":"Danda"},{"label":"Modelo","value":"Siena Multiple (cod. C872C)"},{"label":"Material","value":"100% acero inoxidable cepillado"},{"label":"Dimensiones","value":"86 x 93 x 58 cm aprox."},{"label":"Función","value":"4 hornallas, carlitero con plancha de 3mm, horno enlozado con válvula de seguridad, rejas de fundición, quemadores de aluminio fundido, pirómetro en puerta, apta multigas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'C872C';

-- FAMILIAR: Fabrica de pastas Hogaris Familiar (fuente: fravega.com, riverahogar.com.ar, reig.com.ar)
update products set
  description = 'Fabrica de pastas manual de la linea Familiar, con rodillos de material plastico tratado para cortar fideos y engranajes de acero para amasar. Pensada para uso domestico frecuente.',
  specs = '[{"label":"Marca","value":"Hogaris"},{"label":"Modelo","value":"Pasta Nova Familiar"},{"label":"Material","value":"Rodillos de plástico tratado, cilindros de acero con teflón, engranajes de acero"},{"label":"Dimensiones","value":"22 x 27 x 20 cm (rodillo de 20 cm de ancho)"},{"label":"Función","value":"9 graduaciones de espesor, estira masa hasta 20cm, corta fideos, soporte para accesorio raviolero, incluye mordaza de fijación"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'FAMILIAR';

-- KJH-HE600013600RAC: Horno Kanji 60L (fuente: aloise.com.ar, mercadolibre.com.ar - coincidencia exacta de codigo)
update products set
  description = 'Horno electrico de mesa con dos anafes incorporados, funcion conveccion y spiedo giratorio, pensado para cocinar y asar en simultaneo. Incluye bandeja, rejilla, pinzas y accesorios para spiedo.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-HE600013600RAC"},{"label":"Dimensiones","value":"Externas 61 x 40 x 36 cm (internas 45.5 x 34.5 x 32.5 cm)"},{"label":"Peso","value":"14.1 kg"},{"label":"Potencia","value":"2000 W (horno) + anafe chico 600W / anafe grande 1000W"},{"label":"Capacidad","value":"60 L"},{"label":"Función","value":"Convección, spiedo, termostato hasta 250°C, timer 60 min, incluye bandeja, rejilla, pinzas y accesorios spiedo"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-HE600013600RAC';

-- MC-600: Horno convector Santini (fuente: manual oficial santini-equipment.com/uploads/products/documents/Manual MC-600.pdf)
update products set
  description = 'Horno convector electrico profesional, con doble turbina y motores independientes para una coccion pareja. Incluye cuatro bandejas y puerta de doble vidrio templado con mango aislante.',
  specs = '[{"label":"Marca","value":"Santini"},{"label":"Modelo","value":"MC-600"},{"label":"Material","value":"Exterior acero inoxidable, interior enlozado"},{"label":"Dimensiones","value":"Externas 59.5 x 61.5 x 61.5 cm (internas 45 x 40 x 34 cm)"},{"label":"Voltaje","value":"220V monofásico"},{"label":"Potencia","value":"2670 W (doble turbina)"},{"label":"Capacidad","value":"66 L, 4 bandejas de 43.7 x 31.5 cm"},{"label":"Función","value":"Temperatura 50°C-300°C, timer analógico 120 min, luz interior, puerta doble vidrio templado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MC-600';

-- H-PIZZERO: Horno portatil pizzero Nakan (fuente: fravega.com, nakan.com.ar - coincidencia exacta de codigo en URL)
update products set
  description = 'Horno pizzero portatil con piedra de cordierita, esmaltado y con pirometro incorporado, pensado para cocinar pizzas y horneados directamente sobre la piedra. Es desarmable para facilitar su limpieza y transporte.',
  specs = '[{"label":"Marca","value":"Nakan"},{"label":"Modelo","value":"H-Pizzero"},{"label":"Material","value":"Acero esmaltado, piedra de cordierita"},{"label":"Dimensiones","value":"39 x 39 x 14 cm"},{"label":"Peso","value":"6.8 kg"},{"label":"Función","value":"Pirómetro hasta 500°C, desarmable, incluye piedra de cordierita"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'H-PIZZERO';

-- 3EN1: Horno portatil 3 en 1 Nakan (fuente: fravega.com, nakan.com.ar, dualequipamientos.com.ar)
update products set
  description = 'Horno portatil 3 en 1 que combina piedra pizzera de cordierita, plancha enlozada y parrilla enlozada con recolector de grasa, pensado para versatilidad en espacios chicos con bajo consumo de gas.',
  specs = '[{"label":"Marca","value":"Nakan"},{"label":"Modelo","value":"3 en 1"},{"label":"Material","value":"Acero esmaltado, tapa protectora acero inoxidable, mango de madera"},{"label":"Dimensiones","value":"40 x 39 x 17.5 cm"},{"label":"Peso","value":"13.5 kg"},{"label":"Función","value":"Piedra cordierita para pizza, plancha enlozada 2.5mm, parrilla enlozada con recolector de grasa, termómetro hasta 500°C, desarmable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '3EN1';

-- 10000: Horno mantenedor La Exibidora (fuente: ortigoza.com.ar - coincide 70°C y 2 bandejas)
update products set
  description = 'Estacion calefactora con dos bandejas deslizables, pensada para mantener alimentos calientes y listos para servir en el punto de venta. Su puerta batiente permite un acceso rapido minimizando la perdida de calor.',
  specs = '[{"label":"Marca","value":"La Exibidora"},{"label":"Modelo","value":"Horno mantenedor de temperatura"},{"label":"Dimensiones","value":"60 x 35 x 55 cm (ancho x profundidad x alto)"},{"label":"Función","value":"Temperatura regulable hasta 70°C, 2 bandejas deslizables, puerta batiente"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '10000';
