-- Migracion 013: sexta tanda (17 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: sitios de fabricante/distribuidor
-- oficial (Hisense, BGH, RCA, Samsung, Orbis, Gamma), catalogo de importados
-- del distribuidor (BEHMONT), tiendas grandes reconocidas (ver detalle en
-- el chat). Solo toca specs/description de estos 17 SKU puntuales, no pisa
-- nada mas.
--
-- Nota sobre G2514-G2518 (hidrolavadora Gamma): el nombre del producto dice
-- "2400W" pero el manual oficial de Gamma confirma que la potencia real es
-- 1900W ("2400" es el nombre de la linea/modelo "Master Wash 2400", no la
-- potencia). Se carga el dato correcto (1900W) en las specs.

-- MR-9SILVER: Espejo LED Behmont arco medio punto (fuente: catalogo de importados)
update products set
  description = 'Espejo Behmont forma arco de medio punto con marco color plata e iluminacion LED integrada, pensado para salones de peluqueria y barberia.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-9SILVER"},
    {"label":"Forma","value":"Arco medio punto"},
    {"label":"Marco","value":"Color plata"},
    {"label":"Iluminación","value":"LED integrada"},
    {"label":"Medidas","value":"170 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-9SILVER';

-- G2514-G2518: Hidrolavadora Gamma Master Wash 2400
update products set
  description = 'Hidrolavadora Gamma Master Wash 2400 de 1900 W, con presion maxima de 150 bar y caudal de hasta 8 l/min. Incluye lanza de espuma, manguera de 5 metros y sistema Autostop que detiene el motor al soltar el gatillo.',
  specs = '[
    {"label":"Marca","value":"Gamma"},
    {"label":"Modelo","value":"Master Wash 2400"},
    {"label":"Potencia","value":"1900 W"},
    {"label":"Presión máxima","value":"150 bar (15 MPa)"},
    {"label":"Caudal máximo","value":"8 L/min"},
    {"label":"Manguera","value":"5 m"},
    {"label":"Protección","value":"IPX5"},
    {"label":"Accesorios","value":"Lanza de espuma, pistola, gancho"},
    {"label":"Sistema","value":"Autostop"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'G2514-G2518';

-- 70A6H: Smart TV Hisense 70 4K
update products set
  description = 'Smart TV Hisense 70 pulgadas 4K UHD con Google TV integrado y tecnologia Dolby Vision HDR. Incluye 4 puertos HDMI, WiFi, Bluetooth y modo gaming de baja latencia.',
  specs = '[
    {"label":"Marca","value":"Hisense"},
    {"label":"Modelo","value":"70A6H"},
    {"label":"Pantalla","value":"70\" LED 4K UHD (3840x2160)"},
    {"label":"Sistema operativo","value":"Google TV (Android)"},
    {"label":"HDR","value":"Dolby Vision"},
    {"label":"Conectividad","value":"4 HDMI, 2 USB, WiFi, Bluetooth, Ethernet"},
    {"label":"Audio","value":"DTS Virtual X"},
    {"label":"Dimensiones","value":"1577 x 883 x 74 mm"},
    {"label":"Peso","value":"21 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '70A6H';

-- GH101: Auricular gamer Panter
update products set
  description = 'Auriculares gamer Panter GH101 con microfono omnidireccional incorporado, ideales para juegos y videollamadas. Conexion por cable auxiliar de 3.5mm de 1.8 metros.',
  specs = '[
    {"label":"Marca","value":"Panter"},
    {"label":"Modelo","value":"GH101"},
    {"label":"Tipo","value":"Over ear, con micrófono"},
    {"label":"Parlante","value":"40mm"},
    {"label":"Respuesta de frecuencia","value":"20Hz-20KHz"},
    {"label":"Impedancia","value":"32 Ω"},
    {"label":"Conector","value":"AUX 3.5mm"},
    {"label":"Largo de cable","value":"1.8 m"},
    {"label":"Color","value":"Negro"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'GH101';

-- 978BCOM: Cocina Orbis C9700 grill electrico
update products set
  description = 'Cocina Orbis C9700 de 4 hornallas y 55 cm de ancho, con grill electrico para dorar y gratinar. Tiene horno de gran capacidad con 3 niveles de coccion, visor doble vidrio y encendido electronico.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"C9700"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"55 cm"},
    {"label":"Color","value":"Blanca"},
    {"label":"Función","value":"Grill eléctrico"},
    {"label":"Horno","value":"3 niveles de cocción, visor doble vidrio"},
    {"label":"Encendido","value":"Electrónico"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '978BCOM';

-- B3225S5A: Smart TV BGH 32 Android
update products set
  description = 'Smart TV BGH 32 pulgadas HD con Android TV 11 y Chromecast integrado. Incluye Google Assistant, sintonizador digital con funcion PVR y 2 puertos HDMI.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"B3225S5A"},
    {"label":"Pantalla","value":"32\" HD (1366x768)"},
    {"label":"Sistema operativo","value":"Android TV 11"},
    {"label":"Procesador","value":"MT9216 1.5GHz Quad Core"},
    {"label":"RAM","value":"1 GB"},
    {"label":"Almacenamiento","value":"8 GB"},
    {"label":"Conectividad","value":"2 HDMI, 2 USB, WiFi, Bluetooth, Ethernet"},
    {"label":"Audio","value":"2x8W, Dolby Audio"},
    {"label":"Dimensiones","value":"71.9 x 19.9 x 47.5 cm"},
    {"label":"Peso","value":"3.32 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'B3225S5A';

-- M020: Silla Presidente Mascardi
update products set
  description = 'Silla Presidente Mascardi de resina sintetica de alta densidad, apilable y con capacidad para mas de 150 kg. Patas de caño color aluminio, ideal para uso en interiores y exteriores.',
  specs = '[
    {"label":"Marca","value":"Mascardi"},
    {"label":"Modelo","value":"Presidente"},
    {"label":"Material","value":"Resina sintética"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"40 x 40 x 85 cm"},
    {"label":"Capacidad de peso","value":"Más de 150 kg"},
    {"label":"Patas","value":"Caño color aluminio"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'M020';

-- EM6603SS: Cafetera Oster PrimaLatte
update products set
  description = 'Cafetera espresso Oster PrimaLatte EM6603SS, automatica, compatible con cafe molido, capsulas o monodosis. Prepara espresso, cappuccino o latte con solo tocar un boton, con deposito de leche removible y funcion de autolimpieza.',
  specs = '[
    {"label":"Marca","value":"Oster"},
    {"label":"Modelo","value":"PrimaLatte EM6603SS"},
    {"label":"Potencia","value":"1050 W"},
    {"label":"Presión","value":"15 bares"},
    {"label":"Capacidad tanque de agua","value":"1500 ml"},
    {"label":"Capacidad depósito de leche","value":"300 ml"},
    {"label":"Compatibilidad","value":"Café molido, cápsulas, monodosis"},
    {"label":"Funciones","value":"Espumador de leche, autolimpieza, control de temperatura"},
    {"label":"Dimensiones","value":"31.2 x 22.5 x 28 cm"},
    {"label":"Peso","value":"4.1 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'EM6603SS';

-- R40AND-F: Smart TV RCA 40 FHD Android
update products set
  description = 'Smart TV RCA 40 pulgadas Full HD con Android TV, procesador Quad Core y sistema de montaje VESA incorporado. Cuenta con WiFi, Bluetooth, 2 puertos HDMI y acceso a Google Play.',
  specs = '[
    {"label":"Marca","value":"RCA"},
    {"label":"Modelo","value":"R40AND-F"},
    {"label":"Pantalla","value":"40\" LED Full HD (1920x1080)"},
    {"label":"Sistema operativo","value":"Android TV"},
    {"label":"Procesador","value":"Quad Core"},
    {"label":"RAM","value":"1 GB"},
    {"label":"Almacenamiento","value":"8 GB"},
    {"label":"Conectividad","value":"2 HDMI, 1 USB, WiFi, Bluetooth, Ethernet"},
    {"label":"Audio","value":"2 parlantes de 5W"},
    {"label":"Dimensiones","value":"89.2 x 18.4 x 55.8 cm"},
    {"label":"Peso","value":"5.17 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'R40AND-F';

-- MPR8520N: Microondas Philco 20L rotativo
update products set
  description = 'Microondas Philco MPR8520N de 20 litros con bandeja giratoria, luz interior y visor en la puerta. Tiene 5 niveles de potencia, descongelado automatico por peso y tiempo, y traba de seguridad para niños.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"MPR8520N"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Color","value":"Blanco"},
    {"label":"Niveles de potencia","value":"5"},
    {"label":"Funciones","value":"Descongelado automático, traba de seguridad para niños"},
    {"label":"Dimensiones","value":"44 x 34.5 x 25.8 cm"},
    {"label":"Peso","value":"10.7 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MPR8520N';

-- UN-40J5200: Smart TV Samsung 40 FHD
update products set
  description = 'Smart TV Samsung 40 pulgadas Full HD con acceso a Netflix y YouTube, WiFi integrado y tecnologia Wide Color Enhancer para colores mas realistas. Incluye 2 puertos HDMI y entrada USB.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"UN40J5200"},
    {"label":"Pantalla","value":"40\" Full HD (1920x1080)"},
    {"label":"Conectividad","value":"2 HDMI, 1 USB, WiFi, LAN"},
    {"label":"Dimensiones","value":"92.2 x 17 x 55.5 cm (con pie)"},
    {"label":"Peso","value":"7.2 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'UN-40J5200';

-- TV-6XST05: Smart TV Kanji 65 QLED 4K
update products set
  description = 'Smart TV Kanji 65 pulgadas 4K UHD con sistema Android TV, procesador Quad Core y 3 puertos HDMI. Cuenta con soporte VESA 400x400 y salida de audio de 2x8W.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"TV-6XST05"},
    {"label":"Pantalla","value":"65\" 4K UHD (3840x2160)"},
    {"label":"Sistema operativo","value":"Android TV"},
    {"label":"Procesador","value":"ARM CA55 Quad Core"},
    {"label":"RAM","value":"1 GB"},
    {"label":"Almacenamiento","value":"8 GB"},
    {"label":"Conectividad","value":"3 HDMI, 2 USB, Ethernet"},
    {"label":"VESA","value":"400x400"},
    {"label":"Audio","value":"2x8W"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'TV-6XST05';

-- 958BC3M: Cocina Orbis C9500
update products set
  description = 'Cocina Orbis C9500 de 4 hornallas y 55 cm de frente curvo, con encendido electronico y luz de horno frontal. Horno autolimpiante con 3 niveles de coccion, visor de doble vidrio y valvula de seguridad por termocupla en todas las hornallas.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"C9500 (958BC3M)"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"54.8 cm"},
    {"label":"Color","value":"Blanca"},
    {"label":"Encendido","value":"Electrónico"},
    {"label":"Horno","value":"Autolimpiante, 3 niveles de cocción, visor doble vidrio"},
    {"label":"Seguridad","value":"Válvula por termocupla en hornallas"},
    {"label":"Dimensiones","value":"54.8 x 56 x 86 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '958BC3M';

-- 4120BON: Calefactor tiro balanceado Orbis
update products set
  description = 'Calefactor de tiro balanceado Orbis de 2500 kcal/h, sin visor, con encendido piezoelectrico y valvula de seguridad termoelectrica. Su camara de combustion enlozada permite uso en ambientes cerrados como habitaciones y baños.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"4120BON"},
    {"label":"Potencia","value":"2500 kcal/h"},
    {"label":"Superficie recomendada","value":"50 m³"},
    {"label":"Encendido","value":"Piezoeléctrico"},
    {"label":"Seguridad","value":"Válvula termoeléctrica, sensor de gases de combustión"},
    {"label":"Dimensiones","value":"590 x 350 x 181 mm"},
    {"label":"Visor","value":"Sin visor"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '4120BON';

-- 80012: Reposera plegable aluminio Descansar
update products set
  description = 'Reposera plegable Descansar de aluminio con tela Coversol y 5 posiciones de reclinado. Tiene apoyabrazos de aluminio y soporta hasta 100 kg, ideal para playa, pileta o jardin.',
  specs = '[
    {"label":"Marca","value":"Descansar"},
    {"label":"Modelo","value":"80012"},
    {"label":"Estructura","value":"Caño de aluminio 7/8\""},
    {"label":"Material asiento","value":"Coversol"},
    {"label":"Posiciones","value":"5"},
    {"label":"Peso máximo","value":"100 kg"},
    {"label":"Dimensiones","value":"82 x 59 x 24 cm"},
    {"label":"Peso","value":"4 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '80012';

-- S34: Parlante Blackpoint BT/TWS
update products set
  description = 'Parlante portatil Blackpoint S34 con Bluetooth, TWS, radio FM y lector USB/tarjeta TF, con luces LED y bateria recargable de litio. Entrega 10W RMS de potencia, ideal para uso tipo karaoke.',
  specs = '[
    {"label":"Marca","value":"Blackpoint"},
    {"label":"Modelo","value":"S34"},
    {"label":"Potencia","value":"10 W RMS"},
    {"label":"Conectividad","value":"Bluetooth, TWS, USB, TF, AUX, FM"},
    {"label":"Batería","value":"1200 mAh, litio"},
    {"label":"Dimensiones","value":"18 x 29 x 8.5 cm"},
    {"label":"Características","value":"Luces LED, pantalla digital"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'S34';

-- PVC: Silla fija Baires4 apilable
update products set
  description = 'Silla fija Baires4 con estructura de hierro oval pintada en negro y casco de PVC de alto impacto en asiento y respaldo. Apilable y resistente, ideal para equipar grandes espacios como salones, colegios o iglesias.',
  specs = '[
    {"label":"Marca","value":"Baires4"},
    {"label":"Material","value":"Estructura de hierro, casco de PVC"},
    {"label":"Color","value":"Negro"},
    {"label":"Dimensiones","value":"43 x 48 x 80 cm (an x prof x alto)"},
    {"label":"Características","value":"Apilable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PVC';
