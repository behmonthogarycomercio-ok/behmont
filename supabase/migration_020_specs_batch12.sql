-- Migracion 020: doceava tanda de specs/descripcion investigados (skill
-- product-specs-research). Sigue cubriendo la categoria "Electrodomesticos"
-- (termotanques, calefones, lavarropas, ventiladores, pequenos
-- electrodomesticos de cocina y cuchillos de cocina). Esta tanda junta 42
-- productos confirmados de un pool de 45 candidatos investigados en paralelo
-- (dos agentes de 23 y 22 respectivamente).
-- Fuentes: sitios oficiales de fabricante (Drean, Orbis, Escorial, Sol Real,
-- Atma, Liliana, Kanji, Codini, Philips, Magiclick, Columbia, Electrolux) y
-- tiendas reconocidas (Fravega, Megatone, Garbarino, Cetrogar, Musimundo).
-- Solo toca specs/description de estos 42 SKU puntuales, no pisa nada mas.
--
-- Excluidos de esta tanda (3, reportados aparte, no tocados por este SQL):
-- 08Q2LO (Orbis termotanque 80L: codigo no localizado en ninguna fuente,
-- existen codigos similares 08Q2IO/08QBIO pero ninguno coincide exacto) -
-- 1615 (MT/Nativa exprimidor: no hay fuente que cite ese codigo interno
-- puntual, aunque el producto generico "Nativa" si existe) - 05Q2LO (Orbis
-- termotanque 50L: mismo problema que 08Q2LO, existe 05Q2IO pero el caracter
-- central del modelo no es un sufijo menor, no se puede asumir).

-- E-543: Caloventor Eiffel horizontal/vertical (fuente: Megatone, Musimundo, Amyro, Yuhmak)
update products set
  description = 'Caloventor electrico de uso hogareno que calienta ambientes chicos y medianos, con la ventaja de poder ubicarse en posicion vertical u horizontal segun el espacio disponible. Ideal para quien busca un calefactor portatil, liviano y de facil traslado entre habitaciones.',
  specs = '[
    {"label":"Marca","value":"Eiffel"},
    {"label":"Modelo","value":"E-543"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"29 x 25 x 10 cm"},
    {"label":"Peso","value":"1.2 kg"},
    {"label":"Potencia","value":"1000/2000 W, 220V"},
    {"label":"Función","value":"Termostato regulable, uso vertical u horizontal, protección contra sobretensión"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'E-543';

-- VTHB104: Ventilador de techo Liliana sin luz (fuente: Megatone, Fravega, MercadoLibre)
update products set
  description = 'Ventilador de techo pensado para ambientes grandes, con 4 aspas metalicas y 5 velocidades reguladas por control de pared. Es una opcion sin luz incorporada para quienes ya cuentan con iluminacion central y buscan solo climatizar el ambiente.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"VTHB104"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Aspas de metal"},
    {"label":"Dimensiones","value":"Diámetro 1.20 m, cuerpo 54.5 x 24.5 x 20 cm"},
    {"label":"Potencia","value":"65 W, 220V"},
    {"label":"Velocidades","value":"5, con regulador de pared"},
    {"label":"Iluminación","value":"Sin luz"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'VTHB104';

-- CFH450: Caloventor Liliana Blacksun (fuente: Fravega, Garbarino, Ortiz & Ortega)
update products set
  description = 'Caloventor con forzador de aire pensado para calefaccionar ambientes medianos rapidamente, con dos niveles de potencia para ajustar segun la necesidad. Su diseno liviano y compacto facilita trasladarlo de una habitacion a otra.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"CFH450 (Blacksun)"},
    {"label":"Color","value":"Negro"},
    {"label":"Dimensiones","value":"25 x 15 x 26.5 cm"},
    {"label":"Potencia","value":"1200/2400 W, 220V"},
    {"label":"Función","value":"Termostato regulable, forzador de aire, corte por sobrecalentamiento"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CFH450';

-- LSC10000: Lavarropas semiautomático Columbia 10kg (fuente: Fravega, Columbia oficial, Megatone)
update products set
  description = 'Lavarropas semiautomatico de carga superior pensado para hogares que no requieren conexion a desague fijo, ya que la carga y descarga de agua son manuales. Su gran capacidad de 10 kg lo hace apto para familias numerosas o lavados de ropa de cama y blancos grandes.',
  specs = '[
    {"label":"Marca","value":"Columbia"},
    {"label":"Modelo","value":"LSC10000"},
    {"label":"Dimensiones","value":"94 x 51.5 x 54 cm"},
    {"label":"Peso","value":"10.2 kg"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Capacidad","value":"10 kg"},
    {"label":"Función","value":"7 programas, sistema turbo, sin bomba de desagote, triple dispenser"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LSC10000';

-- CFI800: Caloventor industrial Liliana Powerty (fuente: Cetrogar, Fravega, Dacar Hogar)
update products set
  description = 'Caloventor industrial de alta potencia, pensado para calefaccionar galpones, locales o ambientes grandes gracias a su caudal de aire elevado. Cuenta con termostato ambiente y proteccion IP24 que permite usarlo en espacios con humedad o salpicaduras.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"CFI800 (Powerty)"},
    {"label":"Dimensiones","value":"27.5 x 32 x 21 cm"},
    {"label":"Potencia","value":"3000 W"},
    {"label":"Función","value":"Caudal 305 m³/h, resistencia blindada de acero inoxidable, protección IP24, cabezal reclinable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CFI800';

-- PE1821BP: Pava eléctrica Sansei roja (fuente: Fravega, Garbarino, Megatone)
update products set
  description = 'Pava electrica con selector de temperatura, pensada para quienes quieren controlar el punto exacto de calentamiento del agua, incluido el corte especial para cebar mate. Su placa calentadora de acero inoxidable y filtro doble accion facilitan la limpieza y durabilidad.',
  specs = '[
    {"label":"Marca","value":"Sansei"},
    {"label":"Modelo","value":"PE1821BP"},
    {"label":"Color","value":"Rojo"},
    {"label":"Dimensiones","value":"23 x 23 x 17 cm"},
    {"label":"Peso","value":"1 kg"},
    {"label":"Potencia","value":"2200 W, 220V"},
    {"label":"Capacidad","value":"1.7 L"},
    {"label":"Función","value":"Selector de temperatura, corte para mate, filtro doble acción"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PE1821BP';

-- FPA25: Multiprocesadora Electrolux (fuente: Fravega, Garbarino, Megatone, Ceven)
update products set
  description = 'Multiprocesadora de cocina pensada para quienes preparan comidas variadas a diario, ya que en un solo equipo permite cortar, rallar, desmenuzar, rebanar, emulsionar y licuar. Incluye jarra licuadora aparte de la procesadora, lo que suma versatilidad sin ocupar mas espacio en la cocina.',
  specs = '[
    {"label":"Marca","value":"Electrolux"},
    {"label":"Modelo","value":"FPA25"},
    {"label":"Potencia","value":"750 W"},
    {"label":"Capacidad","value":"Jarra procesadora 1.2 L / jarra licuadora 2 L"},
    {"label":"Velocidades","value":"2 + función pulso"},
    {"label":"Accesorios","value":"Discos para rallar, emulsionar, picar, moler"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FPA25';

-- AIAS6007B: Lavarropas automático Codini 6kg (fuente: Megatone, Codini oficial, Galicia)
update products set
  description = 'Lavarropas automatico de carga superior pensado para hogares chicos o medianos, con 8 programas de lavado que cubren desde ropa delicada hasta jeans y acolchados. Su panel con inicio diferido y bloqueo para ninos suma comodidad y seguridad en el uso diario.',
  specs = '[
    {"label":"Marca","value":"Codini"},
    {"label":"Modelo","value":"AIAS6007B"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Metal"},
    {"label":"Dimensiones","value":"52 x 53 x 85 cm"},
    {"label":"Peso","value":"29 kg"},
    {"label":"Voltaje","value":"220-240V, 50Hz"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Función","value":"700 rpm, 8 programas, eficiencia A+, display LED, inicio diferido, bloqueo para niños"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AIAS6007B';

-- CAR-00-4050-25: Cuchillo de cocina Carnic 25cm (fuente: Giraudo Equipamiento, MercadoLibre)
update products set
  description = 'Cuchillo de cocina de uso general con hoja de acero inoxidable de 25 cm, pensado para tareas de corte cotidianas en cocinas domesticas o gastronomicas. Su mango de plastico blanco es liviano y facil de higienizar.',
  specs = '[
    {"label":"Marca","value":"Carnic"},
    {"label":"Modelo","value":"4050/25"},
    {"label":"Color","value":"Blanco (mango)"},
    {"label":"Material","value":"Hoja de acero inoxidable, mango de plástico"},
    {"label":"Dimensiones","value":"Hoja 25 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CAR-00-4050-25';

-- KJH-FI2415001: Ventilador industrial Kanji 2en1 24 (fuente: D'Ricco, otras tiendas)
update products set
  description = 'Ventilador industrial 2 en 1 que puede usarse de pie o montado en pared, ideal para locales, talleres o ambientes grandes que necesitan buena circulacion de aire. Cuenta con 3 velocidades y aspas plasticas resistentes.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FI2415001"},
    {"label":"Material","value":"Aspas plásticas (3 aspas)"},
    {"label":"Diámetro","value":"24\" (61 cm)"},
    {"label":"Peso","value":"7 kg"},
    {"label":"Potencia","value":"150 W"},
    {"label":"Función","value":"3 velocidades, uso pie/pared, altura regulable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FI2415001';

-- 958GPOM: Cocina Orbis C9500 55cm gris grafito (fuente: Caracol Digital, Casa Policella, Orbis oficial)
update products set
  description = 'Cocina multigas de 55 cm pensada para cocinas medianas, con horno autolimpiante de gran capacidad y encendido electronico protegido en las cuatro hornallas. La luz interior del horno y el visor doble vidrio facilitan controlar la coccion sin abrir la puerta.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"958GPOM (línea C9500)"},
    {"label":"Color","value":"Gris grafito"},
    {"label":"Dimensiones","value":"54.8 x 86 x 61 cm"},
    {"label":"Hornallas","value":"4, con válvula de seguridad por termocupla, encendido electrónico"},
    {"label":"Horno","value":"Autolimpiante, 3 niveles de cocción, luz interior, visor doble vidrio"},
    {"label":"Gas","value":"Multigas (GN/GLP)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '958GPOM';

-- SL-WMU061000W: Lavarropas Smartlife slim 6kg (fuente: Fravega, Megatone, Smartlife oficial)
update products set
  description = 'Lavarropas automatico de carga frontal con diseno slim de solo 40 cm de profundidad, pensado para departamentos o espacios reducidos. Ofrece 15 programas de lavado, incluidos ciclos rapidos de 15 y 45 minutos para el dia a dia.',
  specs = '[
    {"label":"Marca","value":"Smartlife"},
    {"label":"Modelo","value":"SL-WMU061000W"},
    {"label":"Dimensiones","value":"59.5 x 40 x 85 cm"},
    {"label":"Potencia","value":"2050 W, 220V"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Función","value":"1000 rpm regulable, 15 programas, inicio diferido, carga frontal"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'SL-WMU061000W';

-- LI8415N: Licuadora de mesa Atma 400W (fuente: Fravega, Otero Hogar, ICBC Mall)
update products set
  description = 'Licuadora de mesa de uso diario para preparar licuados, jugos y salsas, con jarra plastica transparente y cuchilla desmontable para facilitar la limpieza. Su diseno de 2 velocidades alcanza para las tareas habituales de una cocina hogarena.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"LI8415N"},
    {"label":"Material","value":"Jarra plástica"},
    {"label":"Potencia","value":"400 W, 220V"},
    {"label":"Capacidad","value":"1.25 L"},
    {"label":"Función","value":"2 velocidades, cuchilla desmontable, tapa con dosificador"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LI8415N';

-- KJH-TM800SEC01-R: Tostadora Kanji roja (fuente: Saturno Hogar, Fravega, Luciana Hogar)
update products set
  description = 'Tostadora electrica de 2 rodajas con varios niveles de tostado, pensada para el desayuno diario en hogares chicos o medianos. Su bandeja recoge migas desmontable simplifica la limpieza.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-TM800SEC01-R"},
    {"label":"Color","value":"Rojo"},
    {"label":"Dimensiones","value":"23 x 15 x 10 cm"},
    {"label":"Potencia","value":"800 W, 220V"},
    {"label":"Función","value":"Capacidad 2 rodajas, 6 niveles de tostado, bandeja recoge migas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-TM800SEC01-R';

-- CFH500: Caloventor Liliana Zonda doble posición (fuente: Fravega, Galicia, Cálido Hogar)
update products set
  description = 'Caloventor compacto con doble posicion de uso (horizontal y vertical), ideal para ambientes chicos donde se busca ahorrar espacio. Cuenta con selector de temperatura regulable y corte de seguridad por sobrecalentamiento.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"CFH500 (Zonda)"},
    {"label":"Material","value":"Plástico"},
    {"label":"Dimensiones","value":"25.2 x 25.5 x 12.4 cm"},
    {"label":"Potencia","value":"1000/2000 W, 220-240V"},
    {"label":"Función","value":"Doble posición horizontal/vertical, temperatura regulable, protección por sobretensión"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CFH500';

-- BHF20B18: Caloventor BGH (fuente: Chaia Electrodomésticos, Baratometro, MercadoLibre)
update products set
  description = 'Caloventor portatil con giro de 360 grados (diseno omnidireccional) que distribuye el calor en todo el ambiente, con dos niveles de potencia para ajustar segun necesidad. Incluye termostato y proteccion por sobrecalentamiento y por caida.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"BHF20B18"},
    {"label":"Dimensiones","value":"20.5 x 30.5 cm"},
    {"label":"Peso","value":"1.96 kg"},
    {"label":"Potencia","value":"1800 W"},
    {"label":"Función","value":"2 niveles de potencia, giro 360°, termostato, protección por sobrecalentamiento y caída"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BHF20B18';

-- AE920: Exprimidor Liliana Citrijug (fuente: Fravega, Saturno Hogar, Easy)
update products set
  description = 'Exprimidor electrico de citricos pensado para preparar jugo de naranja o pomelo de forma rapida, con encendido por presion e inversion automatica de giro para aprovechar mejor la fruta. Su jarra con tapa permite guardar el jugo directo en la heladera.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AE920 (Citrijug)"},
    {"label":"Color","value":"Negro"},
    {"label":"Dimensiones","value":"25 x 21 x 17 cm"},
    {"label":"Peso","value":"1 kg"},
    {"label":"Potencia","value":"40 W"},
    {"label":"Capacidad","value":"1 L (jarra vertedora)"},
    {"label":"Función","value":"Doble cono, filtro separador de pulpa regulable (5 posiciones)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AE920';

-- AC950: Cafetera Liliana Cofly (fuente: Fravega, Cetrogar, Mercadian)
update products set
  description = 'Cafetera de filtro con capacidad para 12 tazas, pensada para preparar cafe para varias personas en una sola tanda. Mantiene la temperatura despues del ciclo de preparacion y su filtro y jarra son aptos para lavavajillas.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AC950 (Cofly)"},
    {"label":"Color","value":"Negro"},
    {"label":"Peso","value":"1.367 kg"},
    {"label":"Potencia","value":"800 W, 220V"},
    {"label":"Capacidad","value":"1.25 L (12 tazas)"},
    {"label":"Función","value":"Mantiene temperatura, filtro lavable, válvula antigoteo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AC950';

-- AL110: Licuadora Liliana Licuapic (fuente: Fravega, Liliana oficial, Safgol)
update products set
  description = 'Licuadora de vaso con filtro incorporado para jugos con pulpa, pensada para preparar licuados, jugos exprimidos y batidos sin necesidad de colar aparte. Su base antideslizante y traba de seguridad evitan que arranque si no esta bien armada.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AL110 (Licuapic)"},
    {"label":"Color","value":"Negro"},
    {"label":"Dimensiones","value":"24.2 x 29.4 x 16.9 cm"},
    {"label":"Peso","value":"2 kg"},
    {"label":"Potencia","value":"500 W"},
    {"label":"Capacidad","value":"1.5 L"},
    {"label":"Función","value":"2 velocidades + pulso, cuchilla desmontable, filtro de jugo, espátula emulsionadora"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AL110';

-- KJH-PE15006M-S: Pava eléctrica termo Kanji plata (fuente: Garbarino, MercadoLibre, Nuevas Hogar)
update products set
  description = 'Pava electrica tipo termo que mantiene el agua caliente despues del hervor, ideal para quienes ceban mate o toman varios mates/cafes a lo largo del dia sin tener que recalentar. Su exterior se mantiene frio al tacto por seguridad.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-PE15006M-S"},
    {"label":"Color","value":"Plata"},
    {"label":"Dimensiones","value":"Diámetro 13 cm, altura 29 cm"},
    {"label":"Peso","value":"1.5 kg"},
    {"label":"Potencia","value":"1500 W, 220-240V"},
    {"label":"Capacidad","value":"1.8 L"},
    {"label":"Función","value":"Mantiene temperatura ~80°C, exterior frío al tacto, apagado automático al hervir"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-PE15006M-S';

-- NEXT8.14: Lavarropas Drean Next 8.14 8kg (fuente: Drean oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con tecnologia Inverter, pensado para familias numerosas por su capacidad de 8 kg. Su eficiencia energetica A+++ y lavado europeo de alta eficiencia permiten ahorrar agua y electricidad frente a modelos convencionales.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Next 8.14 (línea P ECO)"},
    {"label":"Capacidad","value":"8 kg"},
    {"label":"Centrifugado","value":"1400 rpm regulable"},
    {"label":"Motor","value":"Inverter"},
    {"label":"Eficiencia energética","value":"A+++"},
    {"label":"Función","value":"Display LED, bloqueo para niños, autobalance, lavado rápido 30''"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NEXT8.14';

-- PIA205010: Termotanque eléctrico BGH 100L (fuente: Jumbo, Disco, Cetrogar)
update products set
  description = 'Termotanque electrico de 100 litros pensado para hogares con demanda media-alta de agua caliente. Su tanque vitrificado y aislacion de poliuretano ayudan a mantener la temperatura con bajo consumo, y permite regular la temperatura entre 35 y 75 grados segun la necesidad.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"BTE-100CM15MC (PIA205010)"},
    {"label":"Material","value":"Acero vitrificado, aislación de poliuretano"},
    {"label":"Dimensiones","value":"94 cm alto x 46.5 cm ancho x 45 cm diámetro"},
    {"label":"Peso","value":"32.6 kg"},
    {"label":"Potencia","value":"2600 W máx."},
    {"label":"Capacidad","value":"100 L"},
    {"label":"Conexión","value":"Inferior, instalación vertical de pared"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PIA205010';

-- 7.798.013.730.566: Termotanque a gas Escorial 120L multigas (fuente: Musimundo, Fravega, Megatone, Naldo)
update products set
  description = 'Termotanque a gas multigas de 120 litros para apoyar, pensado para hogares numerosos. Cuenta con piloto analizador de oxigeno como sistema de seguridad y tanque interior enlozado, y viene preparado para funcionar tanto con gas natural como envasado.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"128 cm alto x 42.5 cm ancho x 43 cm profundidad"},
    {"label":"Peso","value":"50 kg"},
    {"label":"Capacidad","value":"120 L"},
    {"label":"Gas","value":"Multigas (Natural/GLP)"},
    {"label":"Conexión","value":"Superior BSP 3/4\""},
    {"label":"Encendido","value":"Piloto"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7.798.013.730.566';

-- NEXT7.09: Lavarropas Drean Next 7.09 Eco (fuente: Drean oficial, Fravega)
update products set
  description = 'Lavarropas de carga frontal de 7 kg pensado para familias medianas que buscan eficiencia energetica y cuidado de la ropa. Incluye 29 programas de lavado, tambor de acero inoxidable y puerta extra grande de 180 grados, con clasificacion A++ en consumo energetico.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Next 7.09 Eco"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Tambor de acero inoxidable"},
    {"label":"Capacidad","value":"7 kg"},
    {"label":"Centrifugado","value":"Hasta 900 rpm"},
    {"label":"Programas","value":"29"},
    {"label":"Eficiencia energética","value":"A++"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NEXT7.09';

-- 56RB: Lavarropas semiautomático Patriot 5kg (fuente: Fravega, Garbarino, Cetrogar)
update products set
  description = 'Lavarropas semiautomatico de carga superior con tambor cilindrico, ideal para quienes buscan un equipo simple y economico en consumo de agua. No centrifuga, por lo que requiere escurrido manual, y cuenta con motor termoprotegido.',
  specs = '[
    {"label":"Marca","value":"Patriot"},
    {"label":"Modelo","value":"56RB"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"85 cm alto x 53.5 cm ancho x 53.5 cm profundidad"},
    {"label":"Peso","value":"11.4 kg"},
    {"label":"Capacidad","value":"5 kg"},
    {"label":"Función","value":"6 programas mecánicos, consumo 15 L para 5 kg de ropa"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '56RB';

-- BLSTMP: Licuadora de mesa Oster 450W (fuente: electroyhogar.com.ar, MercadoLibre)
update products set
  description = 'Licuadora de mesa con jarra plastica de 1.5 litros, adecuada para preparar licuados, batidos y triturar hielo en el dia a dia. Cuenta con 8 velocidades y sistema de acople metalico para mayor durabilidad del motor.',
  specs = '[
    {"label":"Marca","value":"Oster"},
    {"label":"Modelo","value":"BLSTMP (BLSTMP-W00)"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Jarra plástica"},
    {"label":"Potencia","value":"450 W, 220V"},
    {"label":"Capacidad","value":"1.5 L (6 tazas)"},
    {"label":"Función","value":"8 velocidades, cuchilla de acero inoxidable pica hielo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BLSTMP';

-- CA8143N: Cafetera Atma filtro 12 tazas (fuente: Atma oficial, Fravega)
update products set
  description = 'Cafetera de filtro semiautomatica con capacidad para unas 12 tazas, practica para el uso diario familiar. Tiene filtro permanente, sistema antigoteo y base calentadora antiadherente para mantener el cafe caliente.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"CA8143N"},
    {"label":"Color","value":"Negro"},
    {"label":"Material","value":"Plástico"},
    {"label":"Dimensiones","value":"18 cm ancho x 32 cm alto"},
    {"label":"Potencia","value":"850 W"},
    {"label":"Capacidad","value":"1.25 L (12 tazas)"},
    {"label":"Función","value":"Filtro permanente, sistema antigoteo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CA8143N';

-- 535V: Cocina Sol Real 53.5cm puerta vidrio (fuente: solreal.com oficial, Giraudo Equipamiento, Gastromarket)
update products set
  description = 'Cocina semi-industrial de 4 hornallas con rejas de fundicion, puerta de vidrio templado con pirometro incorporado y horno enlozado con piso de tejuelas refractarias. Pensada tanto para uso domestico exigente como gastronomico liviano.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"535V"},
    {"label":"Material","value":"Acero inoxidable (gabinete)"},
    {"label":"Dimensiones","value":"53.5 cm de ancho"},
    {"label":"Hornallas","value":"4, rejas de fundición"},
    {"label":"Horno","value":"2 rejillas 41.5x36 cm, piso de tejuelas refractarias"},
    {"label":"Puerta","value":"Vidrio templado con pirómetro"},
    {"label":"Potencia calórica","value":"12.300 kcal/h"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '535V';

-- V1001: Turboventilador Magiclick 14 (fuente: Fravega, Cetrogar, magiclick.com.ar oficial)
update products set
  description = 'Turboventilador de 14 pulgadas para piso, apto tambien para colgar en pared, con cabezal reclinable e ideal para refrescar ambientes medianos. Sus 5 aspas plasticas y motor de 70W ofrecen buen caudal de aire con bajo consumo.',
  specs = '[
    {"label":"Marca","value":"Magiclick"},
    {"label":"Modelo","value":"V1001"},
    {"label":"Color","value":"Negro"},
    {"label":"Peso","value":"2 kg"},
    {"label":"Diámetro","value":"14\" (38 cm)"},
    {"label":"Potencia","value":"70 W"},
    {"label":"Aspas","value":"5, plásticas"},
    {"label":"Función","value":"3 velocidades, reclinable, apto pared"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'V1001';

-- CAR-00-4050-20: Cuchillo de cocina Carnic 20cm (fuente: vilvi.com.ar, pomatools.com.ar)
update products set
  description = 'Cuchillo de cocina profesional con hoja de acero inoxidable de alta aleacion, pensado para picar y cortar en cocinas domesticas o gastronomicas. Su mango ergonomico antideslizante facilita el agarre firme durante tareas prolongadas.',
  specs = '[
    {"label":"Marca","value":"Carnic"},
    {"label":"Modelo","value":"4050-20"},
    {"label":"Color","value":"Blanco (mango)"},
    {"label":"Material","value":"Hoja de acero inoxidable AISI 420, mango de polipropileno"},
    {"label":"Dimensiones","value":"Hoja 20 cm, largo total 34 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CAR-00-4050-20';

-- 575VP: Cocina mini Sol Real c/parrilla puerta vidrio (fuente: solreal.com oficial, myacomercial.com, Gastromarket)
update products set
  description = 'Cocina mini semi-industrial de 4 hornallas con parrilla retractil incorporada, pensada para espacios reducidos que buscan mayor potencia de coccion. Incluye horno enlozado con piso de tejuelas refractarias y puerta de vidrio con manija metalica.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"575VP"},
    {"label":"Dimensiones","value":"57.5 cm de ancho"},
    {"label":"Peso","value":"40.2 kg"},
    {"label":"Hornallas","value":"4, rejas de fundición"},
    {"label":"Horno","value":"3 rejillas 43x44 cm, piso de tejuelas refractarias"},
    {"label":"Puerta","value":"Vidrio templado"},
    {"label":"Potencia calórica","value":"20.000 kcal/h"},
    {"label":"Función","value":"Parrilla retráctil con recolector de grasa"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '575VP';

-- AS7910: Aspiradora de mano inalámbrica Atma (fuente: Atma oficial, Fravega)
update products set
  description = 'Aspiradora de mano inalambrica y recargable que aspira tanto liquidos como solidos, practica para limpiezas rapidas en auto o cocina. Incluye filtro HEPA y varios accesorios intercambiables para distintas superficies.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"AS7910"},
    {"label":"Peso","value":"1.2 kg"},
    {"label":"Potencia","value":"45 W"},
    {"label":"Capacidad","value":"0.5 L (depósito lavable)"},
    {"label":"Filtro","value":"HEPA"},
    {"label":"Función","value":"Aspira líquidos y sólidos, autonomía 13 min"},
    {"label":"Accesorios","value":"Boquilla para líquidos, cepillo tapicería, soporte de pared"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AS7910';

-- FAMILY096A: Lavarropas semiautomático Drean Family 5.5kg (fuente: Fravega, manual.ar)
update products set
  description = 'Lavarropas semiautomatico de carga superior con tambor de acero inoxidable, apto para hogares chicos o departamentos con bajo consumo de agua. Cuenta con dispenser automatico de jabon y suavizante y 9 programas de lavado y enjuague.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Family 096A"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Tambor de acero inoxidable"},
    {"label":"Dimensiones","value":"87 cm alto x 51 cm ancho x 40 cm profundidad"},
    {"label":"Capacidad","value":"5.5 kg"},
    {"label":"Función","value":"9 programas (no centrífuga), consumo 15 L, dispenser automático"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FAMILY096A';

-- KJH-BL0800HB02: Mixer de mano Kanji 2en1 (fuente: Fravega, tutiendabancor.com)
update products set
  description = 'Mixer de mano 2 en 1 con accesorio batidor incluido, pensado para preparar salsas, pures, cremas y licuados directamente en la olla u otro recipiente. Incluye vaso medidor y accesorios de acero inoxidable intercambiables.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-BL0800HB02"},
    {"label":"Potencia","value":"800 W, 220V"},
    {"label":"Accesorios","value":"Batidor y vaso medidor incluidos"},
    {"label":"Función","value":"2 en 1 (mixer + batidor)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-BL0800HB02';

-- 5516F: Cocina Florencia 4H multigas blanca 56cm (fuente: Megatone, Fravega, cocinasflorencia.com.ar oficial)
update products set
  description = 'Cocina multigas de 56 cm con 4 hornallas, pensada para cocinas pequenas o monoambientes. Cuenta con puerta de doble vidrio templado con visor, sistemas de corte automatico de gas por seguridad y enlozado Easy Clean de facil limpieza.',
  specs = '[
    {"label":"Marca","value":"Florencia"},
    {"label":"Modelo","value":"5516F"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"56 x 85 x 60 cm"},
    {"label":"Hornallas","value":"4 (1 grande, 2 medianas, 1 chica)"},
    {"label":"Gas","value":"Multigas (GN/GLP)"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '5516F';

-- Termotanque a gas Escorial 45L multigas para colgar (fuente: Fravega, escorial.com.ar oficial, naldo.com.ar)
update products set
  description = 'Termotanque a gas multigas de 45 litros para colgar, ideal para hogares chicos o departamentos con demanda de agua caliente moderada. Convertible entre gas natural y envasado mediante cambio de inyectores, con piloto analizador de oxigeno por seguridad.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Material","value":"Acero enlozado"},
    {"label":"Dimensiones","value":"60 cm alto x 42.5 cm diámetro"},
    {"label":"Peso","value":"20 kg"},
    {"label":"Capacidad","value":"45 L"},
    {"label":"Gas","value":"Multigas (convertible)"},
    {"label":"Recuperación","value":"128 L/h (GN) / 135 L/h (GLP)"},
    {"label":"Conexión","value":"Para colgar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12-10';

-- 315BRVE: Calefón Volcan 14L TN piezoeléctrico (fuente: tecnogas.com.ar, Fravega; casatonini.com.ar descartado del análisis por contenido no confiable)
update products set
  description = 'Calefon a gas de tiraje natural con capacidad de 14 litros por minuto, apto para hogares con consumo moderado de agua caliente instantanea. Cuenta con encendido piezoelectrico y sensor que corta el suministro de gas ante falta de ventilacion o llama apagada.',
  specs = '[
    {"label":"Marca","value":"Volcan"},
    {"label":"Modelo","value":"315BRVE"},
    {"label":"Dimensiones","value":"727 x 370 x 235 mm"},
    {"label":"Peso","value":"15 kg"},
    {"label":"Capacidad","value":"14 L/min"},
    {"label":"Gas","value":"Natural, tiraje natural"},
    {"label":"Encendido","value":"Piezoeléctrico"},
    {"label":"Seguridad","value":"Sensor de gases quemados + termocupla"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '315BRVE';

-- KJH-FH1306: Ventilador 3en1 Kanji 10 (fuente: Fravega, brghogar.com.ar)
update products set
  description = 'Ventilador 3 en 1 de 10 pulgadas que puede usarse de pie, de mesa o montado en pared, util para adaptarse a distintos ambientes del hogar. Cuenta con 3 aspas metalicas, 3 velocidades y oscilacion de 120 grados para una cobertura amplia.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FH1306"},
    {"label":"Color","value":"Negro"},
    {"label":"Dimensiones","value":"95 cm alto x 30 cm ancho x 30 cm profundidad"},
    {"label":"Diámetro","value":"10\""},
    {"label":"Potencia","value":"60-65 W"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Función","value":"3 velocidades, 3 en 1 (pie/mesa/pared), oscilación 120°"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FH1306';

-- HR7632/90: Multiprocesadora Philips Viva Collection (fuente: philips.com.ar oficial)
update products set
  description = 'Multiprocesadora 3 en 1 que incluye jarra licuadora, exprimidor y bol procesador, pensada para quienes cocinan variado y quieren un solo equipo para varias tareas. La tecnologia PowerChop mejora el picado tanto de ingredientes blandos como duros.',
  specs = '[
    {"label":"Marca","value":"Philips"},
    {"label":"Modelo","value":"HR7632/90 (línea Viva Collection)"},
    {"label":"Potencia","value":"600 W, 220V"},
    {"label":"Capacidad","value":"Jarra licuadora 1.5 L / bol procesador 1.3 L"},
    {"label":"Función","value":"Ralla, pica, emulsiona, amasa, rebana, licúa, exprime (20.000 rpm licuadora)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HR7632/90';

-- Termotanque eléctrico Escorial EL-90 90L (fuente: musimundo.com, escorial.com.ar oficial, electromisiones.com.ar)
update products set
  description = 'Termotanque electrico de 90 litros para colgar, con tanque de acero vitrificado y anodo de magnesio como proteccion anticorrosiva. Adecuado para hogares medianos que buscan buena recuperacion de agua caliente con instalacion electrica estandar.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Modelo","value":"EL-90"},
    {"label":"Material","value":"Acero vitrificado, ánodo de magnesio"},
    {"label":"Dimensiones","value":"92 cm alto x 42.5 cm ancho x 42 cm profundidad"},
    {"label":"Peso","value":"28 kg"},
    {"label":"Voltaje","value":"230V"},
    {"label":"Potencia","value":"1500 W"},
    {"label":"Capacidad","value":"90 L (85.5 L netos)"},
    {"label":"Conexión","value":"Inferior, para colgar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12-13';

-- AT903: Tostadora Liliana Sandtost (fuente: liliana.com.ar oficial, Fravega)
update products set
  description = 'Tostadora de dos rebanadas con accesorio sandwichero incluido, practica para el desayuno diario o para calentar sandwiches rapidos. Cuenta con 7 niveles de tostado y paredes frias que evitan quemaduras al manipularla.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AT903 (Sandtost)"},
    {"label":"Potencia","value":"800 W"},
    {"label":"Capacidad","value":"2 rebanadas"},
    {"label":"Función","value":"7 niveles de tostado, eyector automático, descongelado, accesorio sandwichero"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AT903';

-- AH101B: Minipimer Liliana Rainbow Mix (fuente: liliana.com.ar oficial, Cetrogar)
update products set
  description = 'Minipimer con vaso medidor incluido, util para preparar salsas, pures, licuados y sopas directamente en la olla. Su varilla de acero inoxidable y 2 velocidades permiten un procesado rapido de distintos alimentos.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AH101B (Rainbow Mix)"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Varilla de acero inoxidable"},
    {"label":"Potencia","value":"450 W"},
    {"label":"Capacidad","value":"Vaso medidor 600 ml"},
    {"label":"Velocidades","value":"2"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AH101B';
