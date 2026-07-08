-- Migracion 011: cuarta tanda (17 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: sitios de fabricante/distribuidor
-- oficial (Samsung, Briket, Volcan, Escorial), tiendas grandes reconocidas
-- (ver detalle en el chat). Solo toca specs/description de estos 17 SKU
-- puntuales, no pisa nada mas.
--
-- Nota sobre el SKU '7,79801E+12': asi esta guardado literalmente en la
-- base (no es un error de esta migracion). Es un problema de origen: un
-- codigo de barras largo que Excel convirtio a notacion cientifica antes
-- de importar la lista del distribuidor. Hay 28 productos con este mismo
-- problema — queda como pendiente aparte, ver mensaje en el chat.

-- POCOC85: Celular Xiaomi Poco C85
update products set
  description = 'Celular Xiaomi Poco C85 con 8 GB de RAM y 256 GB de almacenamiento, pantalla de 6.9 pulgadas HD+ con hasta 120 Hz de refresco. Su bateria de 6000 mAh con carga rapida de 33 W le da una autonomia extendida para uso intensivo durante todo el dia.',
  specs = '[
    {"label":"Marca","value":"Xiaomi"},
    {"label":"Modelo","value":"Poco C85"},
    {"label":"RAM","value":"8 GB"},
    {"label":"Almacenamiento","value":"256 GB"},
    {"label":"Pantalla","value":"6.9\" HD+ (720x1600), 120Hz"},
    {"label":"Procesador","value":"MediaTek Helio G81 Ultra"},
    {"label":"Cámara trasera","value":"50MP + QVGA"},
    {"label":"Batería","value":"6000 mAh, carga rápida 33W"},
    {"label":"Sistema operativo","value":"Android 15 (HyperOS 2.0)"},
    {"label":"Resistencia","value":"IP64"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'POCOC85';

-- AC970: Cafetera express Liliana Cofix Bar
update products set
  description = 'Cafetera express Liliana Cofix Bar AC970 con bomba de 15 bares de presion y 1200 W de potencia, permite preparar hasta dos pocillos de cafe a la vez. Incluye vaporizador regulable para espumar leche y placa superior calienta tazas.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"Cofix Bar AC970"},
    {"label":"Potencia","value":"1200 W"},
    {"label":"Presión","value":"15 bares"},
    {"label":"Capacidad tanque","value":"1.5 L"},
    {"label":"Filtro","value":"Dual de acero inoxidable"},
    {"label":"Funciones","value":"Vaporizador, calienta tazas"},
    {"label":"Accesorios","value":"Cuchara dosificadora, rasero"},
    {"label":"Seguridad","value":"Protección por sobrecalentamiento y sobrepresión"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AC970';

-- NT-P70: Tablet Northtech 7 pulgadas
update products set
  description = 'Tablet Northtech NT-P70 de 7 pulgadas con 1 GB de RAM y 16 GB de almacenamiento, con sistema Android 8.1 Oreo Go Edition. Cuenta con pantalla tactil capacitiva, ranura microSD y bateria de 2500 mAh.',
  specs = '[
    {"label":"Marca","value":"Northtech"},
    {"label":"Modelo","value":"NT-P70"},
    {"label":"Pantalla","value":"7\" (1024x600)"},
    {"label":"RAM","value":"1 GB"},
    {"label":"Almacenamiento","value":"16 GB"},
    {"label":"Procesador","value":"Quad Core RK3126C"},
    {"label":"Sistema operativo","value":"Android 8.1 Oreo Go"},
    {"label":"Batería","value":"2500 mAh"},
    {"label":"Conectividad","value":"USB, microSD, jack 3.5mm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NT-P70';

-- PVP2453PI: Plancha a vapor Philco
update products set
  description = 'Plancha a vapor Philco PVP2453PI de 2000 W con base de ceramica y tanque de 330 ml. Tiene vapor vertical y variable, funcion spray y golpe de vapor, y sistema antigoteo y antical.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"PVP2453PI"},
    {"label":"Potencia","value":"2000 W"},
    {"label":"Capacidad tanque","value":"330 ml"},
    {"label":"Base","value":"Cerámica"},
    {"label":"Vapor continuo","value":"Hasta 25 g/min"},
    {"label":"Funciones","value":"Vapor vertical, spray, golpe de vapor"},
    {"label":"Sistemas","value":"Antical, antigoteo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PVP2453PI';

-- LFJ-KM-2293: Maquina de corte Kemei
update products set
  description = 'Maquina de corte Kemei KM-2293, inalambrica o con cable, con 3 peines guia de 1, 2 y 3 mm y pantalla LED de estado de bateria. Su bateria de litio de 1200 mAh se carga por USB tipo C y rinde hasta 3 horas de uso continuo.',
  specs = '[
    {"label":"Marca","value":"Kemei"},
    {"label":"Modelo","value":"KM-2293"},
    {"label":"Potencia","value":"10 W"},
    {"label":"Velocidad motor","value":"7000 RPM"},
    {"label":"Batería","value":"1200 mAh, litio"},
    {"label":"Autonomía","value":"3 horas"},
    {"label":"Carga","value":"USB tipo C"},
    {"label":"Peines guía incluidos","value":"1, 2 y 3 mm"},
    {"label":"Pantalla","value":"LED"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LFJ-KM-2293';

-- GL600NUSADA: Bordeadora Black & Decker (usada)
update products set
  description = 'Bordeadora electrica Black & Decker GL600 de 600 W y 11.000 RPM, con cabezal giratorio 180° y sistema de avance de hilo por golpe. Esta unidad se vende usada, en funcionamiento.',
  specs = '[
    {"label":"Marca","value":"Black & Decker"},
    {"label":"Modelo","value":"GL600"},
    {"label":"Potencia","value":"600 W"},
    {"label":"Velocidad","value":"11000 RPM"},
    {"label":"Ancho de corte","value":"27.5 cm"},
    {"label":"Sistema de hilo","value":"Avance por golpe (bump-feed)"},
    {"label":"Peso","value":"2.7 kg"},
    {"label":"Condición del ítem","value":"Usado"}
  ]'::jsonb
where sku = 'GL600NUSADA';

-- HC5010: Cortapelos Braun
update products set
  description = 'Cortapelos Braun HC5010 con 9 ajustes de longitud y uso inalambrico o con cable. Sus baterias Ni-MH se cargan en 8 horas y ofrecen hasta 40 minutos de autonomia, con cuchillas lavables bajo el grifo.',
  specs = '[
    {"label":"Marca","value":"Braun"},
    {"label":"Modelo","value":"HC5010"},
    {"label":"Ajustes de longitud","value":"9"},
    {"label":"Batería","value":"Ni-MH, recargable"},
    {"label":"Autonomía","value":"40 minutos"},
    {"label":"Tiempo de carga","value":"8 horas"},
    {"label":"Uso","value":"Inalámbrico o con cable"},
    {"label":"Características","value":"Cuchillas lavables, sistema SafetyLock"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HC5010';

-- 520PVN: Cocina Sol Real 4 hornallas
update products set
  description = 'Cocina Sol Real de 4 hornallas y 53 cm de ancho, con grill inferior, rejas de fundicion de aluminio y puerta de vidrio templado. El horno tiene piso de tejuelas refractarias, pirometro incorporado y 2 rejillas interiores.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"53 cm"},
    {"label":"Grill","value":"Inferior, incorporado"},
    {"label":"Rejas","value":"Fundición de aluminio"},
    {"label":"Puerta horno","value":"Vidrio templado con pirómetro"},
    {"label":"Piso horno","value":"Tejuelas refractarias"},
    {"label":"Accesorios","value":"2 rejillas interiores (41.5 x 36 cm)"},
    {"label":"Potencia térmica","value":"12300 Kcal/h"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '520PVN';

-- 275: Sierra carnicera Freire
update products set
  description = 'Sierra carnicera Freire de 1 HP con volantes de 280 mm de diametro y hoja de 2.75 m, montada sobre mesada de marmol. Sus guias de hoja en teflon y sistema de doble ajuste facilitan cortes precisos en uso comercial.',
  specs = '[
    {"label":"Marca","value":"Freire"},
    {"label":"Modelo","value":"275"},
    {"label":"Potencia","value":"1 HP"},
    {"label":"Volantes","value":"280 mm de diámetro"},
    {"label":"Hoja","value":"2.75 m"},
    {"label":"Mesada","value":"Mármol"},
    {"label":"Dimensiones","value":"183 x 69 x 61 cm"},
    {"label":"Guías de hoja","value":"Teflón"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '275';

-- ES-LCB140: Soporte de TV Esoporter brazo simple
update products set
  description = 'Soporte de pared para TV Esoporter ES-LCB140, de brazo simple extensible, compatible con televisores de 23 a 42 pulgadas.',
  specs = '[
    {"label":"Marca","value":"Esoporter"},
    {"label":"Modelo","value":"ES-LCB140"},
    {"label":"Tipo","value":"Brazo simple, extensible"},
    {"label":"Compatibilidad","value":"TVs de 23 a 42 pulgadas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'ES-LCB140';

-- 315BRVN: Calefon Volcan 14 litros
update products set
  description = 'Calefon a gas Volcan 315BRVN de tiraje natural, con capacidad de 14 litros por minuto y encendido piezoelectrico. Cuenta con doble sistema de seguridad por termocupla y sensor de gases quemados que corta el suministro ante cualquier anomalia.',
  specs = '[
    {"label":"Marca","value":"Volcán"},
    {"label":"Modelo","value":"315BRVN"},
    {"label":"Capacidad","value":"14 L/min"},
    {"label":"Tiraje","value":"Natural"},
    {"label":"Encendido","value":"Piezoeléctrico"},
    {"label":"Potencia","value":"20000 Kcal/h"},
    {"label":"Dimensiones","value":"370 x 727 x 235 mm"},
    {"label":"Seguridad","value":"Termocupla, sensor de gases quemados"},
    {"label":"Color","value":"Blanco"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '315BRVN';

-- A365G: Celular Samsung Galaxy A36 5G
update products set
  description = 'Celular Samsung Galaxy A36 5G con 8 GB de RAM y 128 GB de almacenamiento, pantalla Super AMOLED de 6.7 pulgadas Full HD+ a 120 Hz. Camara principal de 50 MP con estabilizacion optica, bateria de 5000 mAh con carga rapida de 45 W y resistencia al agua y polvo IP67.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy A36 5G"},
    {"label":"RAM","value":"8 GB"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.7\" Super AMOLED FHD+, 120Hz"},
    {"label":"Procesador","value":"Snapdragon 6 Gen 3"},
    {"label":"Cámara trasera","value":"50MP + 8MP + 5MP"},
    {"label":"Cámara frontal","value":"12MP"},
    {"label":"Batería","value":"5000 mAh, carga rápida 45W"},
    {"label":"Resistencia","value":"IP67"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'A365G';

-- 4500: Freezer horizontal Briket 390L Trial
update products set
  description = 'Freezer horizontal Briket FR4500 de 390 litros con funcion Trial (freezer, enfriador o conservador) y 2 puertas. Incluye canasto organizador, ruedas y tablero con indicador luminico, con clasificacion energetica A.',
  specs = '[
    {"label":"Marca","value":"Briket"},
    {"label":"Modelo","value":"FR4500"},
    {"label":"Capacidad","value":"390 L"},
    {"label":"Función","value":"Trial (freezer/enfriador/conservador)"},
    {"label":"Rango de temperatura","value":"7°C a -22°C"},
    {"label":"Puertas","value":"2"},
    {"label":"Dimensiones","value":"1480 x 700 x 840 mm"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Accesorios","value":"Canasto organizador, ruedas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '4500';

-- MX-T40/ZB: Torre de sonido Samsung
update products set
  description = 'Torre de sonido Samsung Sound Tower MX-T40 de 300 W, con conexion Bluetooth multiple para emparejar dos dispositivos a la vez. Su panel superior es resistente al agua e incluye modos de luces para fiestas.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"MX-T40"},
    {"label":"Potencia","value":"300 W"},
    {"label":"Conectividad","value":"Bluetooth múltiple, USB"},
    {"label":"Formatos compatibles","value":"AAC, WAV, MP3, OGG, FLAC"},
    {"label":"Dimensiones","value":"291.5 x 530.5 x 268 mm"},
    {"label":"Peso","value":"6.8 kg"},
    {"label":"Características","value":"Panel superior resistente al agua, modos de luces"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MX-T40/ZB';

-- HGFA3023PI: Horno electrico Atma 30L
update products set
  description = 'Horno electrico Atma HGFA3023PI de 30 litros con funcion grill y freidora de aire, hasta 1500 W de potencia. Tiene temperatura regulable de 100°C a 250°C, timer de hasta 60 minutos y 6 estantes para cocinar varios alimentos a la vez.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"HGFA3023PI"},
    {"label":"Capacidad","value":"30 L"},
    {"label":"Potencia","value":"1500 W"},
    {"label":"Rango de temperatura","value":"100°C a 250°C"},
    {"label":"Timer","value":"Hasta 60 minutos"},
    {"label":"Funciones","value":"Grill superior/inferior/combinado, convección, freidora de aire"},
    {"label":"Dimensiones","value":"50 x 38.5 x 32 cm"},
    {"label":"Peso","value":"7.22 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HGFA3023PI';

-- 7,79801E+12: Cocina Escorial Candor S2 (Blanco). SKU asi tal cual esta
-- guardado en la base -- ver nota al inicio del archivo.
update products set
  description = 'Cocina Escorial Candor de 4 hornallas y 50 cm de ancho, con horno de 52.6 litros con visor y valvula de seguridad en hornallas y horno. Superficie enlozada en polvo electrostatico de facil limpieza y clasificacion energetica A.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Modelo","value":"Candor S2"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"50 cm"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad horno","value":"52.6 L"},
    {"label":"Dimensiones","value":"50 x 95 x 60 cm"},
    {"label":"Peso","value":"26.5 kg"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Seguridad","value":"Válvula de seguridad en hornallas y horno"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12';

-- PHCH050B: Cocina electrica Philco
update products set
  description = 'Cocina electrica Philco PHCH050B de 4 hornallas y 50 cm de ancho, con horno de 53 litros, luz interior, grill y puerta de vidrio templado con visor. Tiene 3 niveles de coccion en la mesada y encendido electronico.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"PHCH050B"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"50 cm"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad horno","value":"53 L"},
    {"label":"Dimensiones","value":"50 x 85 x 50 cm"},
    {"label":"Peso","value":"37 kg"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Funciones","value":"Grill, luz interior, encendido electrónico"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PHCH050B';
