-- Migracion 015: octava tanda (31 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: catalogo de importados del
-- distribuidor (BEHMONT, 9 productos), sitios de fabricante oficial y tiendas
-- grandes reconocidas (Allure/Atma, Hisense, BGH, Inelro, Kanji/Westinghouse,
-- Oster, Liliana, Philips, Siam, Samsung, RCA, Gafa, Neba). Solo toca
-- specs/description de estos 31 SKU puntuales, no pisa nada mas.
--
-- Notas:
-- * WH-CH120CONV: brand "Kanji" en la base, pero codigo y specs son de
--   Westinghouse (igual que WH-CH108 de la tanda anterior). Mismo caso, se
--   completa igual.
-- * BSH26WCP: la base dice "2250 frig." pero la ficha oficial de BGH para
--   ese codigo exacto figura con 2300 frigorias (2600W, misma unidad F/C).
--   Diferencia menor de redondeo entre fuentes, no es un modelo distinto -
--   se carga el dato de la fuente oficial.

-- SHY: Sillon peluquero hidraulico Behmont (fuente: catalogo de importados)
update products set
  description = 'Sillon de barberia modelo Shy con estructura de hierro cromado y base redonda antideslizante, tapizado en eco-cuero premium color negro. Es reclinable, gira 360 grados y cuenta con regulador de altura hidraulico y apoyapies, ideal para un puesto de trabajo profesional en barberias y peluquerias.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"SHY"},
    {"label":"Color","value":"Negro"},
    {"label":"Estructura","value":"Hierro cromado, base redonda antideslizante"},
    {"label":"Material tapizado","value":"Eco-cuero premium"},
    {"label":"Regulación de altura","value":"Hidráulica"},
    {"label":"Giro","value":"360°, reclinable"},
    {"label":"Apoyapiés","value":"Sí"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'SHY';

-- 300ES-12: Cortadora de fiambres Behmont 300mm (fuente: catalogo de importados)
update products set
  description = 'Cortadora de fiambres de 300 mm de diametro, con cuerpo de aluminio y hoja de acero al carbono. Permite regular el grosor de corte entre 2 y 16 mm, pensada para uso en fiambrerias, almacenes y comercios gastronomicos.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"300ES-12"},
    {"label":"Tipo","value":"Cortadora de fiambres"},
    {"label":"Diámetro de hoja","value":"300 mm"},
    {"label":"Grosor de corte","value":"2 a 16 mm"},
    {"label":"Cuerpo","value":"Aluminio"},
    {"label":"Hoja","value":"Acero al carbono"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '300ES-12';

-- 25-JAY01: Exprimidor de citricos manual Behmont (fuente: catalogo de importados)
update products set
  description = 'Exprimidor de citricos industrial de accionamiento manual con palanca, fabricado en acero inoxidable. Pensado para bares, almacenes y comercios que necesitan exprimir grandes volumenes de naranjas o pomelos de forma rapida y resistente.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-JAY01"},
    {"label":"Tipo","value":"Exprimidor de cítricos industrial manual"},
    {"label":"Accionamiento","value":"Con palanca"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Medidas","value":"45 x 18 x 28 cm (Alto x Largo x Prof)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-JAY01';

-- 25-YXH98: Torno electrico para uñas Behmont (fuente: catalogo de importados)
update products set
  description = 'Torno electrico para unas con velocidad regulable de 3.000 a 20.000 RPM, ideal para lijado, pulido y decoracion en manicuria y pedicuria profesional. Incluye un kit de 6 fresas intercambiables y cable de conexion USB.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-YXH98"},
    {"label":"Tipo","value":"Torno eléctrico para uñas"},
    {"label":"Voltaje","value":"5-9V"},
    {"label":"Velocidad","value":"3.000 a 20.000 RPM"},
    {"label":"Cable","value":"90 cm + conexión USB"},
    {"label":"Accesorios","value":"Kit de 6 fresas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-YXH98';

-- 25-YXH102: Esterilizador UV Behmont (fuente: catalogo de importados)
update products set
  description = 'Esterilizador UV con rejilla de 8 W, pensado para desinfectar instrumental de manicuria, pedicuria y peluqueria tanto de plastico como de metal. Su ciclo estimado de esterilizacion es de 45 minutos.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-YXH102"},
    {"label":"Tipo","value":"Esterilizador con rejilla y luz UV"},
    {"label":"Potencia","value":"8 W"},
    {"label":"Tiempo de esterilización","value":"~45 minutos"},
    {"label":"Uso","value":"Instrumental plástico y metálico"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-YXH102';

-- 200.60-IB: Rack inicial Behmont 200x200x60 blanco (fuente: catalogo de importados)
update products set
  description = 'Tramo inicial de rack metalico encastrable, con 4 estantes de 200 kg de capacidad cada uno. Su sistema de agujero mariposa permite sumar tramos continuos para ampliar la instalacion en depositos y locales comerciales.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"200.60-IB"},
    {"label":"Color","value":"Blanco"},
    {"label":"Tipo","value":"Rack metálico, tramo inicial"},
    {"label":"Medidas","value":"200 x 200 x 60 cm"},
    {"label":"Estantes","value":"4 estantes"},
    {"label":"Capacidad","value":"200 kg por estante"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '200.60-IB';

-- 200.60-CB: Rack continuo Behmont 200x200x60 blanco (fuente: catalogo de importados)
update products set
  description = 'Tramo continuo de rack metalico encastrable, pensado para ampliar una instalacion ya iniciada. Cuenta con 4 estantes de 200 kg de capacidad cada uno y sistema de agujero mariposa para encastrar nuevos modulos.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"200.60-CB"},
    {"label":"Color","value":"Blanco"},
    {"label":"Tipo","value":"Rack metálico, tramo continuo"},
    {"label":"Medidas","value":"200 x 200 x 60 cm"},
    {"label":"Estantes","value":"4 estantes"},
    {"label":"Capacidad","value":"200 kg por estante"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '200.60-CB';

-- MR-10SILVER: Espejo LED Behmont octogonal (fuente: catalogo de importados)
update products set
  description = 'Espejo con forma octogonal y marco plateado, con iluminacion LED integrada. Sus medidas de 170 x 70 cm y su diseno con luz perimetral lo hacen ideal para salones de peluqueria, barberias y centros de estetica.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-10SILVER"},
    {"label":"Forma","value":"Octogonal"},
    {"label":"Marco","value":"Color plata"},
    {"label":"Iluminación","value":"LED integrada"},
    {"label":"Medidas","value":"170 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-10SILVER';

-- MR-15BLACK: Mesa flotante + espejo LED Behmont (fuente: catalogo de importados)
update products set
  description = 'Set de cajonera flotante de melamina simil marmol con espejo LED integrado de marco negro, pensado para puestos de peluqueria y barberia. La mesa mide 70 x 26 x 14 cm y el espejo 100 x 70 cm, sumando iluminacion y espacio de guardado en un mismo mueble.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-15BLACK"},
    {"label":"Color","value":"Marco negro"},
    {"label":"Tipo","value":"Cajonera flotante + espejo LED"},
    {"label":"Material cajonera","value":"Melamina símil mármol"},
    {"label":"Medidas mesa","value":"70 x 26 x 14 cm"},
    {"label":"Medidas espejo","value":"100 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-15BLACK';

-- SP1050AN: Secador de pelo Allure 2200W (fuente: Atma oficial, Fravega)
update products set
  description = 'Secador de pelo profesional con motor AC de 2200 W y tecnologia Pro Ion que ayuda a reducir el frizz. Cuenta con 6 combinaciones de velocidad y temperatura, funcion de aire frio (cool shot) y viene con difusor y boquilla concentradora.',
  specs = '[
    {"label":"Marca","value":"Allure"},
    {"label":"Modelo","value":"SP1050AN"},
    {"label":"Potencia","value":"2200 W"},
    {"label":"Tecnología","value":"Pro Ion"},
    {"label":"Combinaciones vel./temp.","value":"6 combinaciones"},
    {"label":"Función","value":"Cool shot (aire frío)"},
    {"label":"Accesorios","value":"Difusor y boquilla concentradora"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'SP1050AN';

-- HLE5517RTUI: Smart TV Hisense 55 4K (fuente: Fravega)
update products set
  description = 'Smart TV de 55" con resolucion 4K UHD y tasa de refresco de 120 Hz, con acceso a aplicaciones como Netflix y YouTube mediante conexion WiFi. Cuenta con 4 entradas HDMI y 3 puertos USB para conectar multiples dispositivos.',
  specs = '[
    {"label":"Marca","value":"Hisense"},
    {"label":"Modelo","value":"HLE5517RTUI"},
    {"label":"Pantalla","value":"55\" 4K UHD (3840x2160)"},
    {"label":"Tasa de refresco","value":"120 Hz"},
    {"label":"Contraste","value":"4000:1"},
    {"label":"Conectividad","value":"4 HDMI, 3 USB, WiFi"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HLE5517RTUI';

-- PIA205009: Termotanque electrico BGH 80L (fuente: AllCell, Fravega)
update products set
  description = 'Termotanque electrico de 80 litros con carga inferior y potencia de 1.5 kW, con esmalte interior anticorrosivo para mayor vida util. Incluye valvula de seguridad y alcanza una temperatura media de agua de 59 grados.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"PIA205009 (BTE-080CM15MC)"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"80 L"},
    {"label":"Carga","value":"Inferior"},
    {"label":"Potencia","value":"1.5 kW"},
    {"label":"Dimensiones","value":"Altura 75.4 cm, diámetro 45 cm"},
    {"label":"Peso","value":"24.3 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PIA205009';

-- MT120: Exhibidora vertical Inelro 106L (fuente: Megatone, Fravega)
update products set
  description = 'Exhibidora vertical de 106 litros pensada para bebidas, con puerta de doble vidrio templado e iluminacion LED interior. Cuenta con 3 estantes ajustables y condensacion estatica, con capacidad para unas 76 latas de 473cc.',
  specs = '[
    {"label":"Marca","value":"Inelro"},
    {"label":"Modelo","value":"MT120"},
    {"label":"Capacidad","value":"106 L"},
    {"label":"Estantes","value":"3 estantes ajustables"},
    {"label":"Puerta","value":"1 puerta, doble vidrio templado"},
    {"label":"Iluminación","value":"Tubo LED 7.5 W"},
    {"label":"Condensación","value":"Estática"},
    {"label":"Refrigerante","value":"R-134a"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MT120';

-- HE60008RA: Horno electrico convector Kanji 65L (fuente: Garbarino, Attain)
update products set
  description = 'Horno electrico de 65 litros con funcion de conveccion y spiedo para asados, mas 2 anafes incorporados de distinta potencia. Incluye timer programable, termostato regulable hasta 250 grados y accesorios como bandeja, rejilla y set de spiedo.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"HE60008RA"},
    {"label":"Capacidad","value":"65 L"},
    {"label":"Potencia","value":"2000 W"},
    {"label":"Anafes","value":"2 anafes (1000W y 600W)"},
    {"label":"Funciones","value":"Convección, spiedo, timer, termostato"},
    {"label":"Temperatura máxima","value":"250 °C"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HE60008RA';

-- FPSTSMPL2B: Batidora planetaria Oster 850W (fuente: Oster oficial, Megatone)
update products set
  description = 'Batidora planetaria de pie con motor de 850 W, 12 velocidades y arranque suave, con bowl de acero inoxidable de 4 litros de capacidad. Incluye 3 accesorios intercambiables para mezclar, amasar y batir, ademas de tapa protectora contra salpicaduras.',
  specs = '[
    {"label":"Marca","value":"Oster"},
    {"label":"Modelo","value":"FPSTSMPL2B"},
    {"label":"Color","value":"Negro"},
    {"label":"Potencia","value":"850 W"},
    {"label":"Velocidades","value":"12 velocidades, arranque suave"},
    {"label":"Capacidad bowl","value":"4 L"},
    {"label":"Material bowl","value":"Acero inoxidable"},
    {"label":"Accesorios","value":"3 batidores intercambiables"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FPSTSMPL2B';

-- AL115/116: Licuadora portatil Liliana Deporlic/Sportlic (fuente: Torca, Domador de Precios)
update products set
  description = 'Licuadora portatil con botella deportiva de 600 ml y motor de 350 W, ideal para preparar batidos y licuados para llevar. Su tapa hermetica con pico deportivo y cuchilla removible facilitan tanto el uso como la limpieza.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AL115 / AL116 (Deporlic/Sportlic)"},
    {"label":"Capacidad","value":"600 ml"},
    {"label":"Potencia","value":"350 W"},
    {"label":"Material botella","value":"Acero inoxidable"},
    {"label":"Tapa","value":"Hermética con pico deportivo"},
    {"label":"Cuchilla","value":"Removible"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AL115/116';

-- HR7200/02: Batidora de mano Philips 400W (fuente: Philips oficial, Fravega)
update products set
  description = 'Batidora de mano con pedestal y bowl de 3.5 litros, con motor de 400 W y 5 velocidades mas funcion turbo. Su sistema de suspension FlexiMix ajusta las varillas a las esquinas del bowl para una mezcla mas pareja, y puede separarse del pedestal para uso manual.',
  specs = '[
    {"label":"Marca","value":"Philips"},
    {"label":"Modelo","value":"HR7200/02 (Viva Collection)"},
    {"label":"Potencia","value":"400 W"},
    {"label":"Capacidad bowl","value":"3.5 L"},
    {"label":"Velocidades","value":"5 velocidades + turbo"},
    {"label":"Tecnología","value":"Sistema de suspensión FlexiMix"},
    {"label":"Accesorios","value":"Batidores y ganchos para masa"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HR7200/02';

-- HSI-EV329B2: Exhibidora vertical Siam 329L (fuente: Megatone, Siam oficial)
update products set
  description = 'Exhibidora vertical de 329 litros con puerta de doble vidrio templado y cerradura de seguridad, ideal para comercios y almacenes. Cuenta con estantes rejilla removibles, iluminacion interior y termostato regulable entre 0 y 10 grados.',
  specs = '[
    {"label":"Marca","value":"Siam"},
    {"label":"Modelo","value":"HSI-EV329B2"},
    {"label":"Capacidad","value":"329 L"},
    {"label":"Color","value":"Blanco"},
    {"label":"Estantes","value":"4 estantes"},
    {"label":"Puerta","value":"Doble vidrio templado, con cerradura"},
    {"label":"Refrigerante","value":"R600A"},
    {"label":"Rango de temperatura","value":"0° a 10°C"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HSI-EV329B2';

-- WH-CH120CONV: Convector Westinghouse 2000W (fuente: Fravega, Garbarino)
update products set
  description = 'Convector de 2000 W con resistencia de aluminio y calentamiento inmediato por conveccion, sin generar humo, olor ni ruido. Cuenta con termostato, 2 niveles de calor y bloqueo para ninos, rindiendo hasta 60 m3 de ambiente.',
  specs = '[
    {"label":"Marca","value":"Westinghouse"},
    {"label":"Modelo","value":"WH-CH120CONV"},
    {"label":"Color","value":"Negro/Gris"},
    {"label":"Potencia","value":"2000 W"},
    {"label":"Niveles de calor","value":"2 niveles"},
    {"label":"Sistema","value":"Convección, resistencia de aluminio"},
    {"label":"Medidas","value":"35 x 60 x 11 cm"},
    {"label":"Peso","value":"7 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'WH-CH120CONV';

-- BSH26WCP: Aire acondicionado Split BGH 2600W F/C (fuente: BGH oficial, Fravega)
update products set
  description = 'Aire acondicionado Split frio/calor de 2600 W y aproximadamente 2300 frigorias, con eficiencia energetica Clase A y gas refrigerante ecologico R410A. Incluye control remoto con display LCD, filtro antipolvo, timer programable y arranque automatico.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"BSH26WCP"},
    {"label":"Potencia","value":"2600 W"},
    {"label":"Capacidad frigorífica","value":"~2300 frigorías"},
    {"label":"Ciclo","value":"Frío/Calor"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Refrigerante","value":"R410A"},
    {"label":"Funciones","value":"Control remoto LCD, filtro antipolvo, timer"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BSH26WCP';

-- YM3010: Yogurtera Atma 7 frascos (fuente: Fravega, Megatone)
update products set
  description = 'Yogurtera con 7 frascos de vidrio de 200 ml cada uno y pantalla LCD con temporizador digital programable hasta 15 horas. Al finalizar el ciclo se apaga automaticamente, e incluye un recetario para empezar a preparar yogures caseros.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"YM3010"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"7 frascos de 200 ml (1.4 L total)"},
    {"label":"Potencia","value":"15 W"},
    {"label":"Pantalla","value":"LCD con timer digital, hasta 15 hs"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'YM3010';

-- S26ULTRA: Celular Samsung Galaxy S26 Ultra (fuente: Samsung oficial, Xataka)
update products set
  description = 'Celular de gama alta con pantalla LTPO AMOLED de 6.9" y 120Hz de refresco, procesador Snapdragon 8 Elite Gen 5 y 12 GB de RAM con 256 GB de almacenamiento. Su sistema de camaras cuadruple de hasta 200 MP y bateria de 5000 mAh con carga rapida de 60W lo posicionan como buque insignia de Samsung.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy S26 Ultra"},
    {"label":"Memoria RAM","value":"12 GB"},
    {"label":"Almacenamiento","value":"256 GB"},
    {"label":"Pantalla","value":"6.9\" LTPO AMOLED, 120Hz"},
    {"label":"Procesador","value":"Snapdragon 8 Elite Gen 5"},
    {"label":"Cámaras","value":"200+50+50+10 MP (trasera), 12 MP (frontal)"},
    {"label":"Batería","value":"5000 mAh, carga 60W"},
    {"label":"Sistema operativo","value":"Android 16"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'S26ULTRA';

-- AO932/AO132: Horno electrico Liliana Facilcook 32L (fuente: Brandimia, Otero Hogar)
update products set
  description = 'Horno electrico de 32 litros con potencia de 1750 W y rango de temperatura de 100 a 250 grados, con coccion por resistencia superior o ambas. Incluye timer programable con alarma sonora, luz interior y accesorios removibles para facilitar la limpieza.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AO932 / AO132 (Facilcook)"},
    {"label":"Capacidad","value":"32 L"},
    {"label":"Potencia","value":"1750 W"},
    {"label":"Temperatura","value":"100°C a 250°C"},
    {"label":"Timer","value":"Programable con alarma sonora"},
    {"label":"Accesorios","value":"Bandeja antiadherente y rejilla"},
    {"label":"Luz interior","value":"Sí"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AO932/AO132';

-- BPAT22RP: Batidora planetaria Atma 1800W (fuente: Garbarino, Dogil)
update products set
  description = 'Batidora planetaria de pie con motor de 1800 W, 6 velocidades mas funcion pulso y bowl de acero inoxidable de 7 litros. Incluye 3 accesorios intercambiables (batidor eliptico, batidor plano y gancho amasador) y protector antisalpicaduras con ventana.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"BPAT22RP"},
    {"label":"Color","value":"Rojo"},
    {"label":"Potencia","value":"1800 W"},
    {"label":"Velocidades","value":"6 velocidades + pulso"},
    {"label":"Capacidad bowl","value":"7 L"},
    {"label":"Material bowl","value":"Acero inoxidable"},
    {"label":"Accesorios","value":"Batidor elíptico, batidor plano y gancho amasador"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BPAT22RP';

-- FIH550PI: Freezer exhibidor Inelro 455L (fuente: Inelro oficial, Megatone)
update products set
  description = 'Freezer exhibidor horizontal de 455 litros con tapa de vidrio curvo corredizo e iluminacion LED interior, ideal para heladerias y comercios. Incluye 3 canastos removibles y ruedas giratorias de alta resistencia para facilitar su desplazamiento.',
  specs = '[
    {"label":"Marca","value":"Inelro"},
    {"label":"Modelo","value":"FIH550PI (FIH-550 PI Plus)"},
    {"label":"Capacidad","value":"455 L"},
    {"label":"Canastos","value":"3 canastos"},
    {"label":"Tapa","value":"Vidrio curvo corredizo"},
    {"label":"Iluminación","value":"LED interior"},
    {"label":"Potencia","value":"230 W"},
    {"label":"Refrigerante","value":"R290"},
    {"label":"Dimensiones","value":"166.5 x 62.4 x 83.1 cm"},
    {"label":"Peso","value":"67.5 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FIH550PI';

-- F310: Freezer horizontal Neba 305L (fuente: Neba oficial, Megatone)
update products set
  description = 'Freezer horizontal de 305 litros con exclusivo sistema TRIAL que combina 3 funciones: enfriador de botellas, congelador y freezer. Cuenta con canastos removibles, aislacion de poliuretano de alta densidad y eficiencia energetica Clase B.',
  specs = '[
    {"label":"Marca","value":"Neba"},
    {"label":"Modelo","value":"F310"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"305 L"},
    {"label":"Sistema","value":"TRIAL (enfriador, congelador y freezer)"},
    {"label":"Eficiencia energética","value":"Clase B"},
    {"label":"Medidas","value":"85 x 100 x 65 cm (Al x An x Prof)"},
    {"label":"Peso","value":"58 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'F310';

-- AND65P7UHD-F: Smart TV RCA 65 4K (fuente: Fravega, RCA oficial)
update products set
  description = 'Smart TV de 65" con resolucion 4K UHD, tecnologia Dolby Vision y sonido Dolby Atmos, con sistema operativo Google TV y Google Assistant integrado. Cuenta con 3 entradas HDMI, 2 puertos USB y conectividad WiFi y Bluetooth.',
  specs = '[
    {"label":"Marca","value":"RCA"},
    {"label":"Modelo","value":"AND65P7UHD-F"},
    {"label":"Pantalla","value":"65\" 4K UHD (3840x2160)"},
    {"label":"Sistema operativo","value":"Google TV"},
    {"label":"HDR","value":"Dolby Vision"},
    {"label":"Audio","value":"Dolby Atmos"},
    {"label":"Conectividad","value":"3 HDMI, 2 USB, WiFi, Bluetooth"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AND65P7UHD-F';

-- AB700: Batidora planetaria multifuncion Liliana Speedchef (fuente: Fravega, Megatone)
update products set
  description = 'Batidora planetaria multifuncion con motor de 1200 W, 8 velocidades mas pulso y bowl de acero inoxidable de 4 litros. Suma procesadora de 1.2 litros y licuadora de 1.8 litros con discos intercambiables, resolviendo en un solo equipo batido, amasado, picado, rallado, rebanado y licuado.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AB700 (Speedchef)"},
    {"label":"Potencia","value":"1200 W"},
    {"label":"Velocidades","value":"8 velocidades + pulso"},
    {"label":"Capacidad bowl batidora","value":"4 L (acero inoxidable)"},
    {"label":"Capacidad procesadora","value":"1.2 L"},
    {"label":"Capacidad licuadora","value":"1.8 L"},
    {"label":"Accesorios","value":"Discos para rallar y rebanar, ganchos y batidores"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AB700';

-- HGF388AFP: Heladera Gafa 375L ciclica plata (fuente: Gafa oficial, Fravega)
update products set
  description = 'Heladera ciclica con freezer arriba y 374 litros de capacidad total, con tecnologia Cycle Defrost que preserva la humedad natural de los alimentos. Incluye cubetera giratoria Ice Twister, cajon para frutas y verduras y bandejas para 12 huevos, con eficiencia energetica Clase A.',
  specs = '[
    {"label":"Marca","value":"Gafa"},
    {"label":"Modelo","value":"HGF388AFP"},
    {"label":"Color","value":"Plata"},
    {"label":"Capacidad","value":"374 L (heladera 254 L + freezer 120 L)"},
    {"label":"Sistema de frío","value":"Cíclico (Cycle Defrost)"},
    {"label":"Formato","value":"Freezer arriba"},
    {"label":"Dimensiones","value":"1.80 x 0.614 x 0.621 m"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HGF388AFP';

-- HGF388AFB: Heladera Gafa 375L ciclica blanco (fuente: Gafa oficial, Fravega)
update products set
  description = 'Heladera ciclica con freezer arriba y 374 litros de capacidad total, en version blanca. Con tecnologia Cycle Defrost, cubetera giratoria Ice Twister, cajon para frutas y verduras y bandeja para 12 huevos, alcanzando eficiencia energetica Clase A.',
  specs = '[
    {"label":"Marca","value":"Gafa"},
    {"label":"Modelo","value":"HGF388AFB"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"374 L (heladera 254 L + freezer 120 L)"},
    {"label":"Sistema de frío","value":"Cíclico (Cycle Defrost)"},
    {"label":"Formato","value":"Freezer arriba"},
    {"label":"Dimensiones","value":"1.80 x 0.621 x 0.614 m"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HGF388AFB';

-- B223D: Microondas BGH con grill 23L (fuente: Fravega, Estacion Confort)
update products set
  description = 'Microondas digital de 23 litros con funcion grill de hasta 1000 W y tecnologia 3D Gourmet para una coccion mas pareja. Incluye bandeja giratoria, 10 niveles de potencia, panel digital con funciones predefinidas y bloqueo de seguridad para ninos.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"B223D"},
    {"label":"Capacidad","value":"23 L"},
    {"label":"Potencia microondas","value":"800 W"},
    {"label":"Potencia grill","value":"1000 W"},
    {"label":"Niveles de potencia","value":"10 niveles + 3 de descongelamiento"},
    {"label":"Dimensiones","value":"29.2 x 48.5 x 35.3 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'B223D';
