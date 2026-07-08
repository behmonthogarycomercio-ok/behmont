-- Migracion 012: quinta tanda (15 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: sitios de fabricante/distribuidor
-- oficial (BGH, Usman, Danda, Sol Real, Calabro), catalogo de importados del
-- distribuidor (BEHMONT), tiendas grandes reconocidas (ver detalle en el chat).
-- Solo toca specs/description de estos 15 SKU puntuales, no pisa nada mas.

-- M008: Sillon Ancona Mascardi
update products set
  description = 'Sillon Ancona Mascardi, fabricado en resina sintetica color blanco, apto para uso en interiores y exteriores.',
  specs = '[
    {"label":"Marca","value":"Mascardi"},
    {"label":"Modelo","value":"Ancona"},
    {"label":"Material","value":"Resina sintética"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"40 x 40 x 87 cm (an x prof x alto)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'M008';

-- HX-A05L8-BT2: Kit de camaras Behmont x8 (fuente: catalogo de importados)
update products set
  description = 'Kit de videovigilancia Behmont con 8 camaras de 5 megapixeles, audio bidireccional y vision nocturna a color. Incluye DVR y 15 metros de cable, sin tarjeta de memoria.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"HX-A05L8-BT2"},
    {"label":"Cámaras","value":"8"},
    {"label":"Resolución","value":"5 MP"},
    {"label":"Cable incluido","value":"15 m"},
    {"label":"Audio","value":"Con voz (bidireccional)"},
    {"label":"Visión nocturna","value":"A color"},
    {"label":"Grabador","value":"DVR incluido"},
    {"label":"Almacenamiento","value":"Sin memoria (no incluida)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HX-A05L8-BT2';

-- J01SA3004NEG: Living combo Sueño Austral
update products set
  description = 'Juego de living Sueño Austral compuesto por sillon de 2 cuerpos, mesa y 2 puffs, tapizados en ecocuero negro sobre estructura de madera con relleno de espuma.',
  specs = '[
    {"label":"Marca","value":"Sueño Austral"},
    {"label":"Color","value":"Negro"},
    {"label":"Material","value":"Ecocuero sobre base de madera"},
    {"label":"Relleno","value":"Espuma"},
    {"label":"Sillón","value":"77 x 70 x 134 cm"},
    {"label":"Mesa","value":"86 x 89 x 71 cm"},
    {"label":"Puffs","value":"48 x 43 x 95 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'J01SA3004NEG';

-- C601: Cocina Danda Siena Multiple
update products set
  description = 'Cocina industrial Danda Siena Multiple de 2 hornallas, con plancha de hierro de 3mm y carlitera incluida. Estructura de acero inoxidable con rejas de fundicion, horno enlozado con valvula de seguridad y pirometro en la puerta.',
  specs = '[
    {"label":"Marca","value":"Danda"},
    {"label":"Modelo","value":"Siena C601"},
    {"label":"Hornallas","value":"2"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Rejas","value":"Fundición de aluminio"},
    {"label":"Plancha","value":"Hierro, 3mm"},
    {"label":"Quemadores hornallas","value":"1800 kcal + 2200 kcal"},
    {"label":"Quemador plancha","value":"2000 kcal"},
    {"label":"Horno","value":"2200 kcal, enlozado"},
    {"label":"Dimensiones","value":"60 x 58 x 93 cm (an x prof x alto)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'C601';

-- B120D: Microondas BGH Quick Chef
update products set
  description = 'Microondas BGH Quick Chef B120D de 20 litros, con control digital, plato giratorio y 10 niveles de potencia. Cuenta con funcion de descongelado automatico, coccion automatica y traba para niños.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"B120D"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Color","value":"Blanco"},
    {"label":"Control","value":"Digital"},
    {"label":"Niveles de potencia","value":"10"},
    {"label":"Funciones","value":"Descongelado automático, cocción automática, traba para niños"},
    {"label":"Dimensiones","value":"44 x 33.7 x 25.9 cm"},
    {"label":"Peso","value":"10.2 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'B120D';

-- 235: Salamandra redonda Sol Mayo
update products set
  description = 'Salamandra redonda Sol Mayo de fundicion gris, con potencia de hasta 5000 Kcal para calefaccionar ambientes amplios. Tiene salida de gases de 4 pulgadas y capacidad para 4.5 kg de leña por carga.',
  specs = '[
    {"label":"Marca","value":"Sol Mayo"},
    {"label":"Modelo","value":"235"},
    {"label":"Material","value":"Fundición gris"},
    {"label":"Potencia","value":"4000 a 5000 Kcal"},
    {"label":"Dimensiones","value":"57 x 35 x 40 cm (alto x frente x prof)"},
    {"label":"Peso","value":"35 kg"},
    {"label":"Salida de gases","value":"4 pulgadas"},
    {"label":"Capacidad de leña","value":"4.5 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '235';

-- LKS35WCCR: Aire acondicionado split Likon
update products set
  description = 'Aire acondicionado split Likon LKS35WCCR frio/calor, con 3500 W de capacidad (3000 frigorias) y gas refrigerante R-410A. Incluye control remoto con LCD, filtro antipolvo, funcion sueño, deshumectacion y timer programable de 24 horas.',
  specs = '[
    {"label":"Marca","value":"Likon"},
    {"label":"Modelo","value":"LKS35WCCR"},
    {"label":"Tipo","value":"Split, frío/calor"},
    {"label":"Capacidad","value":"3500 W (3000 frigorías)"},
    {"label":"Eficiencia energética","value":"Clase A (frío), Clase B (calor)"},
    {"label":"Gas refrigerante","value":"R-410A"},
    {"label":"Dimensiones unidad exterior","value":"71.5 x 24 x 48.2 cm"},
    {"label":"Dimensiones unidad interior","value":"95 x 20.7 x 27.2 cm"},
    {"label":"Peso","value":"8.5 kg (interior), 29 kg (exterior)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LKS35WCCR';

-- TO8016RE: Tostadora Atma roja
update products set
  description = 'Tostadora electrica Atma TO8016RE roja, para 2 rebanadas con boca extra ancha y 7 niveles de tostado. Tiene funciones de calentar, descongelar y cancelar, con bandeja recolectora de migas.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"TO8016RE"},
    {"label":"Color","value":"Rojo"},
    {"label":"Capacidad","value":"2 rebanadas"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Niveles de tostado","value":"7"},
    {"label":"Funciones","value":"Calentar, descongelar, cancelar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'TO8016RE';

-- 53: Freidora de mesa Sol Real 7L
update products set
  description = 'Freidora de mesa Sol Real de 7 litros a gas, con 1 canasto de acero inoxidable y gabinete esmerilado. Cuenta con sistema de 3 inyectores verticales y valvula de seguridad.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"53"},
    {"label":"Capacidad","value":"7 L (solo aceite)"},
    {"label":"Potencia térmica","value":"4800 Kcal/h"},
    {"label":"Material","value":"Acero inoxidable esmerilado"},
    {"label":"Canasto","value":"1, medidas 24x24x12 cm"},
    {"label":"Seguridad","value":"Válvula de seguridad"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '53';

-- 517-9: Lavacabeza portatil Behmont (fuente: catalogo de importados)
update products set
  description = 'Lavacabeza portatil Behmont de plastico con estructura cromada color plata y griferia monomando incluida. Su altura es ajustable y no requiere instalacion fija, ideal para peluquerias con espacio reducido.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"517-9"},
    {"label":"Material","value":"Plástico"},
    {"label":"Estructura","value":"Cromada"},
    {"label":"Grifería","value":"Monomando, incluida"},
    {"label":"Altura","value":"Ajustable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '517-9';

-- 928: Horno pastelero Calabro 12 moldes
update products set
  description = 'Horno pastelero Calabro de 12 moldes, con exterior de chapa doble decapada pintada en epoxi negro microtexturado. El interior esta revestido en tejuelas refractarias y tiene puerta con pirometro y 2 rejillas desmontables.',
  specs = '[
    {"label":"Marca","value":"Calabro"},
    {"label":"Modelo","value":"928"},
    {"label":"Moldes","value":"12"},
    {"label":"Exterior","value":"Chapa doble decapada, epoxi negro"},
    {"label":"Interior","value":"Tejuelas refractarias"},
    {"label":"Quemadores","value":"4 tubulares, 3000 cal c/u"},
    {"label":"Accesorios","value":"2 rejillas desmontables, base desarmable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '928';

-- 57RT: Lavarropas semiautomatico Patriot
update products set
  description = 'Lavarropas semiautomatico Patriot 57RT de carga superior, con capacidad de 5 kg y 7 programas para distintos tipos de tela. Su cuba plastica y ruedas incorporadas facilitan la limpieza y el traslado.',
  specs = '[
    {"label":"Marca","value":"Patriot"},
    {"label":"Modelo","value":"57RT"},
    {"label":"Capacidad","value":"5 kg"},
    {"label":"Tipo","value":"Semiautomático, carga superior"},
    {"label":"Programas","value":"7"},
    {"label":"Cuba","value":"Plástica"},
    {"label":"Dimensiones","value":"53.5 x 53.5 x 85 cm"},
    {"label":"Color","value":"Blanco"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '57RT';

-- 654612: Batea Behmont 2.00m vidrio recto
update products set
  description = 'Batea exhibidora Behmont de 2.00 m con vidrio recto, sistema de frio estatico y terminaciones en acero inoxidable. Cuenta con plano de trabajo en madera, cenefa con iluminacion LED y patas plasticas de alto impacto.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"654612"},
    {"label":"Ancho","value":"2.00 m"},
    {"label":"Sistema de frío","value":"Estático"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Dimensiones","value":"200 x 102 x 132 cm (an x prof x alto)"},
    {"label":"Iluminación","value":"LED"},
    {"label":"Rango de temperatura","value":"0°C a 5°C"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '654612';

-- CS8100: Sommier Behmont 1 plaza doble pillow
update products set
  description = 'Sommier Behmont de 1 plaza con colchon doble pillow, recomendado para hasta 100 kg de peso por plaza. Su base de madera con 6 patas plasticas incluye aireadores y manijas para facilitar el traslado.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"CS8100"},
    {"label":"Plazas","value":"1"},
    {"label":"Tipo colchón","value":"Doble pillow"},
    {"label":"Altura colchón","value":"29 cm"},
    {"label":"Peso máximo recomendado","value":"100 kg"},
    {"label":"Base","value":"Madera, 6 patas plásticas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CS8100';

-- 3240: Cocina multifuncion Usman 90cm
update products set
  description = 'Cocina multifuncion Usman de 90 cm con 4 hornallas, plancha de hierro fundido y rejas de fundicion. Tiene puerta de vidrio, horno con piso de tejuelas refractarias y estructura de acero inoxidable.',
  specs = '[
    {"label":"Marca","value":"Usman"},
    {"label":"Modelo","value":"3240"},
    {"label":"Hornallas","value":"4"},
    {"label":"Ancho","value":"90 cm"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Rejas","value":"Fundición"},
    {"label":"Plancha","value":"Hierro fundido"},
    {"label":"Puerta horno","value":"Vidrio"},
    {"label":"Piso horno","value":"Tejuelas refractarias"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '3240';
