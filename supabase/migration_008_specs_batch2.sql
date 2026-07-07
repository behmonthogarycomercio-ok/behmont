-- Migracion 008: segunda tanda (15 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: sitios oficiales (HP, BGH), catalogo
-- de importados del distribuidor (BEHMONT), tiendas grandes reconocidas
-- (Fravega, Musimundo, Megatone, Giudice, etc. - ver detalle en el chat).
-- Solo toca specs/description de estos 15 SKU puntuales, no pisa nada mas.

-- CSP2950: Autoestereo Philco 50W x4 Bluetooth
update products set
  description = 'Autoestereo Philco CSP2950 con Bluetooth 5.0, dos entradas USB, lector de tarjeta SD y entrada auxiliar, ideal para reproducir musica desde el celular o dispositivos externos en el auto. Entrega 50 W de potencia distribuidos en 4 canales, incluye microfono para manos libres y panel frontal desmontable como proteccion antirrobo.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"CSP2950"},
    {"label":"Potencia","value":"50 W x 4 canales"},
    {"label":"Conectividad","value":"Bluetooth 5.0, USB x2, SD, AUX, AM/FM"},
    {"label":"Pantalla","value":"LCD"},
    {"label":"Alimentacion","value":"12V DC (auto)"},
    {"label":"Accesorios","value":"Control remoto, microfono manos libres"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CSP2950';

-- AHWB20: Minipimer Liliana Whitenblack 450W
update products set
  description = 'Minipimer Liliana Whitenblack AHWB20 de 450 W con 2 velocidades, pensado para triturar, licuar y emulsionar directamente en la olla. Incluye vaso medidor de 900 ml, ideal para preparar salsas, pures, sopas y cremas sin ensuciar varios recipientes.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"Whitenblack AHWB20"},
    {"label":"Potencia","value":"450 W"},
    {"label":"Velocidades","value":"2"},
    {"label":"Accesorios","value":"Vaso medidor 900 ml"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Peso","value":"460 g"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AHWB20';

-- JFB-KM-3124: Buclera Kemei con pinzas (fuente: catalogo de importados)
update products set
  description = 'Buclera de ceramica Kemei con temperatura regulable hasta 200°C, pensada para rizos definidos y duraderos. Incorpora dos pinzas para sujetar el cabello mientras se trabaja cada mechon.',
  specs = '[
    {"label":"Marca","value":"Kemei"},
    {"label":"Modelo","value":"JFB-KM-3124"},
    {"label":"Tipo","value":"Buclera"},
    {"label":"Material placas","value":"Ceramica"},
    {"label":"Temperatura máxima","value":"200°C"},
    {"label":"Accesorios","value":"2 pinzas para cabello"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'JFB-KM-3124';

-- FC-400-105: Exhibidora Behmont 420L con cenefa (fuente: catalogo de importados)
update products set
  description = 'Exhibidora vertical Behmont de 420 litros con puerta batiente, 4 estantes regulables y luz interior, pensada para la exhibicion de bebidas y productos refrigerados en comercios. Incorpora ruedas para facilitar su traslado y cenefa superior para carteleria.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"FC-400-105"},
    {"label":"Capacidad","value":"420 L"},
    {"label":"Puertas","value":"1 puerta batiente"},
    {"label":"Estantes","value":"4"},
    {"label":"Iluminación","value":"Luz interior"},
    {"label":"Movilidad","value":"Con ruedas"},
    {"label":"Dimensiones","value":"1920 x 600 x 590 mm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FC-400-105';

-- PNB045373: Aire acondicionado BGH ventana 5100W frio solo
update products set
  description = 'Aire acondicionado de ventana BGH, frio solo, con una capacidad de 5100 W (4300 frigorias) y clase de eficiencia energetica A. Cuenta con funcion de enfriado rapido, deshumectacion, temporizador y modo sleep, ideal para ambientes medianos y grandes.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"PNB045373"},
    {"label":"Tipo","value":"Ventana"},
    {"label":"Capacidad de frío","value":"5100 W (4300 frigorías)"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Dimensiones","value":"42.8 x 66 x 68 cm"},
    {"label":"Peso","value":"53 kg"},
    {"label":"Funciones","value":"Deshumectación, temporizador, modo sleep"},
    {"label":"Accesorios","value":"Control remoto"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PNB045373';

-- PRINTER3775: Impresora HP DeskJet Ink Advantage 3775
update products set
  description = 'Impresora multifuncion HP DeskJet Ink Advantage 3775 que imprime, copia y escanea de forma inalambrica. Alcanza hasta 8 ppm en blanco y negro y 5,5 ppm en color, con conexion WiFi y compatibilidad con impresion desde el celular via HP Smart y AirPrint.',
  specs = '[
    {"label":"Marca","value":"HP"},
    {"label":"Modelo","value":"DeskJet Ink Advantage 3775"},
    {"label":"Funciones","value":"Impresión, copia, escaneo"},
    {"label":"Velocidad","value":"8 ppm (negro), 5.5 ppm (color)"},
    {"label":"Resolución","value":"Hasta 1200x1200 dpi (negro), 4800x1200 dpi (color)"},
    {"label":"Conectividad","value":"USB 2.0, WiFi 802.11 b/g/n"},
    {"label":"Compatibilidad móvil","value":"AirPrint, HP Smart"},
    {"label":"Tamaño de papel","value":"A4, B5, A6, sobres"},
    {"label":"Peso","value":"2.33 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PRINTER3775';

-- 3535: Silla de comer Infanti HC15B
update products set
  description = 'Silla de comer plegable Infanti HC15B, apta para bebes de 6 a 36 meses (hasta 15 kg), con bandeja desmontable con porta vaso y arnes de 3 puntos de seguridad. Su tapizado de PVC es facil de limpiar y su plegado compacto facilita guardarla.',
  specs = '[
    {"label":"Marca","value":"Infanti"},
    {"label":"Modelo","value":"HC15B"},
    {"label":"Edad recomendada","value":"6 a 36 meses"},
    {"label":"Peso máximo","value":"15 kg"},
    {"label":"Material tapizado","value":"PVC"},
    {"label":"Seguridad","value":"Arnés de 3 puntos, patas antideslizantes"},
    {"label":"Dimensiones","value":"64.13 x 53.34 x 12.06 cm"},
    {"label":"Peso","value":"3.92 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '3535';

-- CEAT5403GP: Cafetera espresso Atma digital
update products set
  description = 'Cafetera espresso digital Atma CEAT5403GP de 1100 W con 20 bar de presion, compatible con cafe molido y capsulas de 37 mm de diametro. Cuenta con espumador de alta presion y calienta tazas, con capacidad de agua de 1.5 litros.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"CEAT5403GP"},
    {"label":"Potencia","value":"1100 W"},
    {"label":"Presión","value":"20 bar"},
    {"label":"Capacidad de agua","value":"1.5 L"},
    {"label":"Panel","value":"Digital"},
    {"label":"Compatibilidad","value":"Café molido y cápsulas (37mm)"},
    {"label":"Dimensiones","value":"27.4 x 30 x 22.7 cm"},
    {"label":"Peso","value":"3.9 kg"},
    {"label":"Accesorios","value":"Prensador, cuchara dosificadora, accesorio para cápsula"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CEAT5403GP';

-- 300USADO: Freezer horizontal Philco 300L (usado)
update products set
  description = 'Freezer horizontal Philco de 300 litros de capacidad bruta, con funcion de refrigerador y congelador, 8 niveles de temperatura y rango de -5°C a -24°C. Esta unidad se vende usada, en funcionamiento.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Capacidad","value":"300 L (280 L netos)"},
    {"label":"Funciones","value":"Refrigerador y congelador"},
    {"label":"Rango de temperatura","value":"-5°C a -24°C"},
    {"label":"Niveles de temperatura","value":"8"},
    {"label":"Dimensiones","value":"112 x 85 x 67 cm"},
    {"label":"Peso","value":"42 kg"},
    {"label":"Gas refrigerante","value":"R600a"},
    {"label":"Condición del ítem","value":"Usado"}
  ]'::jsonb
where sku = '300USADO';

-- 25-YXH124: Peines guia magneticos Behmont 1.5/3mm (fuente: catalogo de importados)
update products set
  description = 'Peines guia magneticos Behmont para maquina de corte, de plastico resistente, en las medidas 1.5 y 3 mm. Se acoplan de forma rapida y segura gracias a su sistema magnetico, ideal para trabajos de precision en barberia.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-YXH124"},
    {"label":"Tipo","value":"Peines guía magnéticos"},
    {"label":"Material","value":"Plástico"},
    {"label":"Medidas incluidas","value":"1.5 mm y 3 mm"},
    {"label":"Compatibilidad","value":"Máquinas de corte"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-YXH124';

-- PNB045371: Aire acondicionado BGH ventana 2600W frio solo
update products set
  description = 'Aire acondicionado de ventana BGH, frio solo, con 2600 W de capacidad (2236 frigorias) y clase de eficiencia A. Incluye control remoto, temporizador, funcion sleep y deshumectacion, con un nivel de ruido de 46 a 50 dB.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"PNB045371"},
    {"label":"Tipo","value":"Ventana"},
    {"label":"Capacidad de frío","value":"2600 W (2236 frigorías)"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Gas refrigerante","value":"R410"},
    {"label":"Dimensiones","value":"38 x 60 x 56 cm"},
    {"label":"Peso","value":"34.7 kg"},
    {"label":"Nivel de ruido","value":"46-50 dB"},
    {"label":"Accesorios","value":"Control remoto"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PNB045371';

-- 1661651: Combo cocina Delos 1.20 (bajo mesada + alacena + mesada)
update products set
  description = 'Combo de cocina Delos de 1.20 m compuesto por bajo mesada con 2 puertas y 3 cajones con correderas metalicas, alacena de 3 puertas y mesada de acero inoxidable con pileta central. Fabricado en melamina de 15mm, con herrajes plasticos y bisagras metalicas; no incluye griferia.',
  specs = '[
    {"label":"Marca","value":"Delos"},
    {"label":"Ancho","value":"1.20 m"},
    {"label":"Bajo mesada","value":"2 puertas, 3 cajones con correderas metálicas"},
    {"label":"Alacena","value":"3 puertas"},
    {"label":"Mesada","value":"Acero inoxidable con pileta central"},
    {"label":"Material","value":"Melamina 15mm"},
    {"label":"Color","value":"Blanco"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '1661651';

-- 14467: Mesa plastica cuadrada Laury Quality 70cm
update products set
  description = 'Mesa plastica cuadrada Laury Quality de 70x70 cm, con patas desmontables y orificio para sombrilla. Reforzada y facil de limpiar, es practica tanto para uso en interiores como en el patio o jardin.',
  specs = '[
    {"label":"Marca","value":"Laury"},
    {"label":"Modelo","value":"14467 (Quality)"},
    {"label":"Material","value":"Plástico"},
    {"label":"Medidas","value":"70 x 70 cm"},
    {"label":"Altura","value":"72 cm"},
    {"label":"Peso","value":"4 kg"},
    {"label":"Color","value":"Blanco"},
    {"label":"Características","value":"Patas desmontables, orificio para sombrilla"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '14467';

-- 211-2: Comoda Inmacol Pacifico Caoba 4 cajones
update products set
  description = 'Comoda Inmacol Pacifico de 4 cajones con correderas metalicas, fabricada en pino macizo con terminacion color caoba. Sus manijas ocultas talladas en la parte superior le dan una estetica prolija sin herrajes salientes.',
  specs = '[
    {"label":"Marca","value":"Inmacol"},
    {"label":"Modelo","value":"Pacífico 211-2"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Color","value":"Caoba"},
    {"label":"Cajones","value":"4, con correderas metálicas"},
    {"label":"Dimensiones","value":"80 x 90 x 40 cm (alto x ancho x profundidad)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '211-2';

-- 4300BT: Freezer exhibidor vertical Briket 417L
update products set
  description = 'Freezer exhibidor vertical Briket de 417 litros para productos congelados, con puerta de triple vidrio templado, marco de aluminio y resistencia antiempañante. Cuenta con 4 estantes ajustables y ruedas para reubicarlo con facilidad.',
  specs = '[
    {"label":"Marca","value":"Briket"},
    {"label":"Modelo","value":"4300BT"},
    {"label":"Capacidad","value":"417 L"},
    {"label":"Temperatura","value":"-18°C"},
    {"label":"Puerta","value":"Triple vidrio templado"},
    {"label":"Marco","value":"Aluminio"},
    {"label":"Estantes","value":"4, ajustables"},
    {"label":"Dimensiones","value":"655 x 600 x 2030 mm (an x prof x alto)"},
    {"label":"Peso","value":"88 kg"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Movilidad","value":"Con ruedas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '4300BT';
