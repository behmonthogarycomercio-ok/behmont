-- Migracion 017: decima tanda (30 productos) con specs/descripcion investigados
-- (skill product-specs-research). A partir de esta tanda se trabaja por
-- categoria para mayor orden: esta tanda cubre la categoria
-- "Electrodomesticos" (lavarropas, microondas, ventiladores, pequenos
-- electrodomesticos de cocina y pelo). Fuentes: sitios de fabricante oficial
-- y tiendas grandes reconocidas (Whirlpool, Philips, Philco, Atma, Kanji,
-- Drean, Liliana, BGH, Hitachi, Codini, Crivel, Embassy, Everest). Solo toca
-- specs/description de estos 30 SKU puntuales, no pisa nada mas.
--
-- Nota sobre PAS1217 (Atma, plancha seca): se excluye de esta tanda. La base
-- dice "Base aluminio" pero todas las fuentes oficiales para ese codigo
-- exacto (PAS1217E/PAS1217PI) tienen base de ceramica, no aluminio -
-- contradiccion de datos, se reporta aparte para que el dueno revise el
-- codigo.

-- WLF75AB: Lavarropas Whirlpool 7.5kg Inverter (fuente: Whirlpool oficial, Fravega)
update products set
  description = 'Lavarropas automatico de carga frontal con motor Sense Inverter, capacidad de 7.5 kg y centrifugado de 1000 rpm. Cuenta con 14 programas de lavado, tambor de acero inoxidable, funcion Fresh Care+ que mantiene la ropa fresca hasta 6 horas despues del ciclo y carga autoadaptativa.',
  specs = '[
    {"label":"Marca","value":"Whirlpool"},
    {"label":"Modelo","value":"WLF75AB"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"7.5 kg"},
    {"label":"Centrifugado","value":"1000 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"14 programas"},
    {"label":"Eficiencia energética","value":"A+"},
    {"label":"Dimensiones","value":"84.5 x 59.5 x 63 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'WLF75AB';

-- HR2030/10: Licuadora Philips 600W (fuente: Philips oficial, Fravega)
update products set
  description = 'Licuadora de mesa con jarra plastica reforzada de 2 litros y motor de 600 W, con 3 velocidades mas funcion turbo y cuchillas de acero inoxidable de larga duracion. Incluye espatula, tapa transparente y panel tactil de facil limpieza.',
  specs = '[
    {"label":"Marca","value":"Philips"},
    {"label":"Modelo","value":"HR2030/10"},
    {"label":"Potencia","value":"600 W"},
    {"label":"Capacidad","value":"2 L"},
    {"label":"Material jarra","value":"Plástico (SAN)"},
    {"label":"Velocidades","value":"3 velocidades + turbo"},
    {"label":"Accesorios","value":"Espátula"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HR2030/10';

-- PHSS010BM: Lavarropas semiautomatico Philco 10kg (fuente: Fravega, Aranduhogar)
update products set
  description = 'Lavarropas semiautomatico de carga superior con capacidad de 10 kg, tapa transparente para ver el proceso de lavado y desagote mecanico. Incluye 5 programas de lavado y dispenser con medidor y selector para jabon en polvo y suavizante.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"PHSS010BM"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"10 kg"},
    {"label":"Carga","value":"Superior"},
    {"label":"Programas","value":"5 programas"},
    {"label":"Desagote","value":"Mecánico"},
    {"label":"Dimensiones","value":"90 x 54.5 x 66 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PHSS010BM';

-- BM8737DH: Batidora de mano Atma 300W (fuente: Atma oficial, Megatone)
update products set
  description = 'Batidora de mano con motor de 300 W y 5 velocidades mas funcion turbo, ideal para batidos, cremas y masas livianas. Incluye batidores y amasadores cromados con boton eyector para un desmonte facil.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"BM8737DH"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"300 W"},
    {"label":"Velocidades","value":"5 velocidades + turbo"},
    {"label":"Accesorios","value":"2 batidores, 2 ganchos amasadores"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BM8737DH';

-- KJH-BL0600LA01: Licuadora Retro Kanji 600W (fuente: Kanji oficial, Fravega)
update products set
  description = 'Licuadora de mesa estilo retro 2 en 1, con jarra de vidrio de 1.5 litros y motor de 600 W. Cuenta con 4 velocidades mas funcion pulso, 6 cuchillas de acero inoxidable, traba de seguridad y base antideslizante.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-BL0600LA01"},
    {"label":"Potencia","value":"600 W"},
    {"label":"Capacidad","value":"1.5 L"},
    {"label":"Material jarra","value":"Vidrio"},
    {"label":"Velocidades","value":"4 velocidades + pulso"},
    {"label":"Cuchillas","value":"6 cuchillas de acero inoxidable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-BL0600LA01';

-- NEXT6.06: Lavarropas Drean 6kg 600rpm carga frontal (fuente: Drean oficial, Fravega)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad de 6 kg y centrifugado de 600 rpm, con 29 combinaciones de lavado para todo tipo de telas. Cuenta con tambor de acero inoxidable, display LED, bloqueo para ninos y eficiencia energetica A+.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Next 6.06 Eco"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Centrifugado","value":"600 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"29 combinaciones"},
    {"label":"Eficiencia energética","value":"A+"},
    {"label":"Dimensiones","value":"85 x 59.5 x 50 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NEXT6.06';

-- PHLF112BN: Lavarropas Philco 11kg Inverter (fuente: Nuevas Hogar, Fravega)
update products set
  description = 'Lavarropas automatico de carga frontal con motor Inverter, capacidad de 11 kg y centrifugado de 1400 rpm, ideal para familias numerosas. Cuenta con 16 programas automaticos, display LED digital, arranque diferido y tambor de acero inoxidable.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"PHLF112BN"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"11 kg"},
    {"label":"Centrifugado","value":"1400 rpm"},
    {"label":"Motor","value":"Inverter"},
    {"label":"Programas","value":"16 programas"},
    {"label":"Eficiencia energética","value":"A"},
    {"label":"Dimensiones","value":"84.7 x 60 x 63.6 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PHLF112BN';

-- RPV401/301: Plancha con vapor Liliana Prince 2000W (fuente: Cetrogar, Disco)
update products set
  description = 'Plancha a vapor con base de ceramica y potencia de 2000 W, con golpe de vapor, vapor regulable y rociador para prendas dificiles. Cuenta con termostato regulable para distintos tipos de tela, luz de encendido y borde salva botones.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"RPV401 (Prince) / RPV301 (Ceramic)"},
    {"label":"Potencia","value":"2000 W"},
    {"label":"Base","value":"Cerámica"},
    {"label":"Función","value":"Golpe de vapor, vapor regulable, rociador"},
    {"label":"Regulación","value":"Termostato para distintos tipos de tela"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'RPV401/301';

-- 6510-B: Lavarropas Codini 6kg 1000rpm (fuente: Codini oficial, Fravega)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad de 6 kg y centrifugado de hasta 1000 rpm, con 28 alternativas de lavado y 12 programas. Cuenta con panel de control con display LED, arranque diferido, bloqueo para ninos e indicador de falla.',
  specs = '[
    {"label":"Marca","value":"Codini"},
    {"label":"Modelo","value":"6510-B"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Centrifugado","value":"1000 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"12 programas (28 combinaciones)"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Peso","value":"53 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '6510-B';

-- B55-655S: Lavasecarropas semiautomatico Kanji (fuente: Fravega, Aloise)
update products set
  description = 'Lavasecarropas semiautomatico 2 en 1 de carga superior, con capacidad de lavado de 5.5 kg y de secado de 4.5 kg. Su centrifuga alcanza 1600 rpm para reducir el tiempo de secado, ideal para espacios reducidos.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"B55-655S"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad de lavado","value":"5.5 kg"},
    {"label":"Capacidad de secado","value":"4.5 kg"},
    {"label":"Centrifugado","value":"1600 rpm"},
    {"label":"Carga","value":"Superior"},
    {"label":"Dimensiones","value":"65.5 x 37.5 x 80.2 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'B55-655S';

-- VTHB114: Ventilador de techo Liliana (fuente: Fravega, Megatone)
update products set
  description = 'Ventilador de techo de 4 aspas metalicas y 65 W de potencia, con 5 velocidades y luz LED incorporada. Su diametro de 1.20 m y regulador de pared para controlar la velocidad lo hacen ideal para ambientes medianos.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"VTHB114"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"65 W"},
    {"label":"Aspas","value":"4 aspas metálicas"},
    {"label":"Diámetro","value":"1.20 m"},
    {"label":"Velocidades","value":"5 velocidades"},
    {"label":"Iluminación","value":"Luz LED"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'VTHB114';

-- BL0800LA01: Licuadora de mesa Kanji 800W (fuente: Fravega, Megatone)
update products set
  description = 'Licuadora de mesa con jarra de vidrio de 1.5 litros y motor de 800 W, con 4 velocidades mas pulsador y 6 cuchillas de acero inoxidable capaces de triturar hielo. Incluye traba de seguridad, base antideslizante y pico vertedor.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"BL0800LA01"},
    {"label":"Potencia","value":"800 W"},
    {"label":"Capacidad","value":"1.5 L"},
    {"label":"Material jarra","value":"Vidrio"},
    {"label":"Velocidades","value":"4 velocidades + pulso"},
    {"label":"Cuchillas","value":"6 cuchillas de acero inoxidable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BL0800LA01';

-- B228D: Microondas BGH con grill 28L (fuente: Fravega, BGH)
update products set
  description = 'Microondas digital de 28 litros con funcion grill de 1 kW y tecnologia 3D Gourmet para una coccion mas pareja. Cuenta con 10 niveles de potencia, descongelado automatico, bandeja giratoria y bloqueo de seguridad.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"B228D"},
    {"label":"Capacidad","value":"28 L"},
    {"label":"Potencia microondas","value":"900 W"},
    {"label":"Potencia grill","value":"1000 W"},
    {"label":"Niveles de potencia","value":"10 niveles"},
    {"label":"Dimensiones","value":"52 x 32.6 x 43.5 cm"},
    {"label":"Peso","value":"14.9 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'B228D';

-- VPD20R: Ventilador de pie Liliana 20 con control remoto (fuente: Megatone, Fravega)
update products set
  description = 'Ventilador de pie de 20" y 90 W con comando digital y control remoto, con timer programable hasta 7:30 horas. Su sistema orbital distribuye la brisa moviendo el cabezal en forma horizontal y vertical, y cuenta con funcion brisa y modo sleep.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"VPD20R"},
    {"label":"Potencia","value":"90 W"},
    {"label":"Diámetro","value":"20\""},
    {"label":"Aspas","value":"3 aspas metálicas"},
    {"label":"Velocidades","value":"3 velocidades"},
    {"label":"Control","value":"Comando digital y control remoto"},
    {"label":"Timer","value":"Hasta 7:30 hs"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'VPD20R';

-- EX8220N: Exprimidor de citricos Atma (fuente: Fravega, Cetrogar)
update products set
  description = 'Exprimidor de citricos electrico con cuerpo de acero inoxidable y filtro de pulpa desmontable, con 2 conos exprimidores de distinto tamano para adaptarse a naranjas, limones o pomelos. Incluye tapa protectora y es de facil limpieza.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"EX8220N"},
    {"label":"Potencia","value":"30 W"},
    {"label":"Capacidad","value":"0.8 L"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Accesorios","value":"2 conos exprimidores, tapa protectora"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'EX8220N';

-- CEAT5418P: Cafetera espresso Atma 20 bar (fuente: Fravega, Megatone)
update products set
  description = 'Cafetera espresso manual de 20 bares de presion y 1100 W, compatible con cafe molido y capsulas. Cuenta con espumador de leche de alta presion, calentador de tazas, tanque de agua extraible de 1 litro y reloj indicador de presion.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"CEAT5418P"},
    {"label":"Capacidad","value":"1 L"},
    {"label":"Presión","value":"20 bar"},
    {"label":"Potencia","value":"1100 W"},
    {"label":"Control","value":"Manual"},
    {"label":"Tipo de café","value":"Molido y cápsulas"},
    {"label":"Funciones","value":"Espumador de leche, calentador de tazas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CEAT5418P';

-- MPHDW20UAP: Microondas digital Philco 20L (fuente: Fravega, Aloise)
update products set
  description = 'Microondas digital de 20 litros y 700 W, con bandeja giratoria, 8 programas y descongelado automatico por peso. Cuenta con 5 niveles de potencia, timer de hasta 95 minutos, modo ECO y luz interior LED.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"MPHDW20UAP"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Niveles de potencia","value":"5 niveles"},
    {"label":"Programas","value":"8 programas"},
    {"label":"Dimensiones","value":"44 x 35.8 x 25.8 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MPHDW20UAP';

-- MATRB20UAP: Microondas mecanico Atma 20L (fuente: Fravega, Megatone)
update products set
  description = 'Microondas mecanico de 20 litros y 700 W, con plato giratorio, descongelado automatico por peso y luz interior. Su control a perilla y timer de hasta 35 minutos lo hacen simple de operar para uso domestico diario.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"MATRB20UAP"},
    {"label":"Color","value":"Negro"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Niveles de potencia","value":"5 niveles"},
    {"label":"Control","value":"Mecánico (perilla)"},
    {"label":"Dimensiones","value":"44 x 25.9 x 35.6 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MATRB20UAP';

-- WBVP18M: Ventilador de pie Liliana Whitenblack 18 3en1 (fuente: Megatone, Garbarino)
update products set
  description = 'Ventilador 3 en 1 (pie, pared y turbo) de 18" y 75 W, con 3 aspas metalicas tipo trebol y cabezal reclinable. Su barral es regulable en altura hasta 1.65 m y su pie plastico redondo le da estabilidad.',
  specs = '[
    {"label":"Marca","value":"Liliana (Whitenblack)"},
    {"label":"Modelo","value":"WBVP18M"},
    {"label":"Color","value":"Negro"},
    {"label":"Potencia","value":"75 W"},
    {"label":"Aspas","value":"3 aspas metálicas"},
    {"label":"Velocidades","value":"3 velocidades"},
    {"label":"Tipo","value":"3 en 1 (pie, pared, turbo)"},
    {"label":"Altura","value":"Regulable hasta 1.65 m"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'WBVP18M';

-- APWB17: Pava electrica Liliana Whitenblack 1.7L (fuente: Fravega, Garbarino)
update products set
  description = 'Pava electrica de 1.7 litros y 2000 W, con base giratoria para usar comodamente desde cualquier angulo. Cuenta con apagado automatico, indicador de nivel de agua, luz de funcionamiento y proteccion contra sobrecalentamiento.',
  specs = '[
    {"label":"Marca","value":"Liliana (Whitenblack)"},
    {"label":"Modelo","value":"APWB17"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"1.7 L"},
    {"label":"Potencia","value":"2000 W"},
    {"label":"Material","value":"Plástico"},
    {"label":"Función","value":"Apagado automático, base giratoria"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'APWB17';

-- CM206D: Microondas Hitachi HITPLUS 20L (fuente: Fravega, Garbarino)
update products set
  description = 'Microondas digital de 20 litros y 700 W, con 6 programas de coccion y 10 niveles de potencia. Cuenta con plato giratorio de vidrio, coccion en varias etapas, alarma de fin de coccion y bloqueo de seguridad para ninos.',
  specs = '[
    {"label":"Marca","value":"Hitachi"},
    {"label":"Modelo","value":"CM206D (HITPLUS)"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Niveles de potencia","value":"10 niveles"},
    {"label":"Programas","value":"6 programas"},
    {"label":"Dimensiones","value":"43.8 x 33.7 x 25.6 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CM206D';

-- AM700: Procesadora Liliana Simplix 700W (fuente: Fravega, Hendel)
update products set
  description = 'Procesadora Simplix 5 en 1 con motor de 700 W: pica, ralla, rebana, amasa y bate a punto nieve. Incluye vaso de 1.2 litros, discos intercambiables de acero inoxidable y base con patas antideslizantes.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AM700 (Simplix)"},
    {"label":"Color","value":"Negro"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Velocidades","value":"2 velocidades + pulsador"},
    {"label":"Capacidad","value":"1.2 L"},
    {"label":"Funciones","value":"Pica, ralla, rebana, amasa, bate punto nieve"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AM700';

-- HR7615/00: Procesadora Philips 600W (fuente: Philips oficial, Fravega)
update products set
  description = 'Procesadora 3 en 1 con motor de 600 W, 2 velocidades y funcion pulso, con tecnologia PowerChop para un picado preciso. Incluye vaso de 1.3 litros y discos de acero inoxidable para rebanar y rallar, aptos para lavavajillas.',
  specs = '[
    {"label":"Marca","value":"Philips"},
    {"label":"Modelo","value":"HR7615/00"},
    {"label":"Potencia","value":"600 W"},
    {"label":"Capacidad","value":"1.3 L"},
    {"label":"Velocidades","value":"2 velocidades + pulso"},
    {"label":"Accesorios","value":"Cuchilla, disco rebanador grueso, disco rallador grueso"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HR7615/00';

-- AH950/150: Minipimer Liliana Fastmix 850W (fuente: Liliana oficial, Cetrogar)
update products set
  description = 'Minipimer Fastmix 4 en 1 con motor de 850 W, regulador electronico de potencia y funcion turbo. Incluye chopper picador de 500 cm3, vaso medidor de 600 cm3 y batidor whisker, ideal para licuados, pures, cremas y salsas.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AH950 / AH150 (Fastmix)"},
    {"label":"Color","value":"Negro"},
    {"label":"Potencia","value":"850 W"},
    {"label":"Velocidades","value":"2 velocidades + turbo"},
    {"label":"Material varilla","value":"Acero inoxidable"},
    {"label":"Accesorios","value":"Chopper 500 cm³, vaso 600 cm³, batidor whisker"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AH950/150';

-- NEXT8.12: Lavarropas Drean 8kg 1200rpm (fuente: Drean oficial, Fravega)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad de 8 kg y centrifugado regulable hasta 1200 rpm, con 34 programas de lavado. Cuenta con tambor de acero inoxidable, eficiencia energetica A++ y ahorra hasta un 70% de agua.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Next 8.12 Eco"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"8 kg"},
    {"label":"Centrifugado","value":"Hasta 1200 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"34 programas"},
    {"label":"Eficiencia energética","value":"A++"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NEXT8.12';

-- P18MAN: Pava electrica Codini 1.8L corte mate (fuente: Codini oficial, Megatone)
update products set
  description = 'Pava electrica de acero inoxidable con capacidad de 1.8 litros y funcion mate, que permite elegir entre modo pava tradicional o modo mate manteniendo el agua a la temperatura ideal para el cebado. Incluye corte automatico de seguridad.',
  specs = '[
    {"label":"Marca","value":"Codini"},
    {"label":"Modelo","value":"P18MAN"},
    {"label":"Capacidad","value":"1.8 L"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Función","value":"Corte mate"},
    {"label":"Corte automático","value":"Sí"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'P18MAN';

-- C67: Caloventor Crivel CV-13 (fuente: Fravega, Center Hogar)
update products set
  description = 'Caloventor compacto con 2 niveles de potencia (1000/2000 W), termostato regulable y proteccion contra sobrecalentamiento. Cuenta con luz indicadora de encendido y funcion de aire frio o caliente segun necesidad.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"C67 (CV-13)"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"2 niveles: 1000/2000 W"},
    {"label":"Termostato","value":"Regulable"},
    {"label":"Medidas","value":"28 x 24 x 15 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'C67';

-- FP-26: Ventilador industrial de pie Embassy 26 (fuente: Domador de Precios, Ama Hogar)
update products set
  description = 'Ventilador de pie tipo industrial con aspas plasticas de alta resistencia de 26" y motor de 230 W termoprotegido y reforzado. Su altura de hasta 1.80 m y funcion oscilante lo hacen ideal para locales comerciales, talleres y galpones.',
  specs = '[
    {"label":"Marca","value":"Embassy"},
    {"label":"Modelo","value":"FP-26"},
    {"label":"Potencia","value":"230 W"},
    {"label":"Diámetro","value":"26\" (66 cm)"},
    {"label":"Material aspas","value":"Plástico de alta resistencia"},
    {"label":"Velocidades","value":"3 velocidades"},
    {"label":"Altura","value":"Hasta 1.80 m"},
    {"label":"Peso","value":"8.8 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FP-26';

-- KJH-FH2010: Turboventilador Kanji 20 (fuente: Fravega, Megatone)
update products set
  description = 'Turboventilador de 20" con 5 aspas plasticas, cabezal reclinable y 3 velocidades. Cuenta con proteccion termica y estructura resistente, ideal para dirigir el flujo de aire hacia un punto especifico del ambiente.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FH2010"},
    {"label":"Color","value":"Negro"},
    {"label":"Potencia","value":"80 W"},
    {"label":"Diámetro","value":"20\" (50.8 cm)"},
    {"label":"Aspas","value":"5 aspas plásticas"},
    {"label":"Velocidades","value":"3 velocidades"},
    {"label":"Función","value":"Reclinable, protección térmica"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FH2010';

-- AX-800N: Purificador de aire Everest para cocina (fuente: Electromisiones, Axelsa)
update products set
  description = 'Purificador extractor de aire para cocina con funciones de extraccion y purificado, con motor de 3 velocidades y visor movil. Cuenta con panel de botonera con indicadores LED y luz incorporada, con opcion de filtro de carbon activado.',
  specs = '[
    {"label":"Marca","value":"Everest"},
    {"label":"Modelo","value":"AX-800N"},
    {"label":"Color","value":"Negro"},
    {"label":"Potencia","value":"100 W"},
    {"label":"Caudal de aire","value":"250 m³/h"},
    {"label":"Velocidades","value":"3 velocidades"},
    {"label":"Control","value":"Botonera con indicadores LED"},
    {"label":"Medidas","value":"60 x 14 x 50 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AX-800N';
