-- Migracion 034: tanda 16 de specs/descripcion investigados (skill
-- product-specs-research). Categoria "Electrodomesticos", con fuerte
-- presencia de Kanji/Westinghouse, Crivel, Smartlife, Samsung, Oster,
-- Philco, BGH, Everest, Siam, Midea, Longvie, Eiffel, Codini. 44 productos
-- confirmados de un pool de 44 candidatos (100% de confirmacion esta tanda).
-- Solo toca specs/description de estos 44 SKU puntuales, no pisa nada mas.

-- KJH-FH1211: Turboventilador Kanji 20" 90W reclinable (fuente: Kanji oficial, Fravega, Megatone)
update products set
  description = 'Turboventilador de 20 pulgadas pensado para colocarse en el piso, con funcion de inclinacion para dirigir el aire hacia donde se necesite. Sus 5 aspas plasticas y motor de 90W ofrecen buen caudal en 3 velocidades, con proteccion termica y patas de cano estables.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-FH1211"},{"label":"Peso","value":"4 kg"},{"label":"Diámetro","value":"20\" (50 cm)"},{"label":"Dimensiones","value":"53 x 63 x 20 cm"},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Inclinación regulable, protección térmica"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-FH1211';

-- SL-VC16BAG: Aspiradora Smartlife con bolsa 1600W (fuente: Smartlife oficial, Fravega, Megatone)
update products set
  description = 'Aspiradora trineo con bolsa lavable de 2.5 litros, pensada para la limpieza general del hogar. Cuenta con regulador de succion en la manguera, enrollacable automatico e indicador de bolsa llena, con accesorios de tubos telescopicos, cepillo multiuso y boquilla rinconera.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-VC16BAG"},{"label":"Color","value":"Gris"},{"label":"Voltaje","value":"220-240V, 50/60Hz"},{"label":"Potencia","value":"1600 W"},{"label":"Capacidad","value":"2.5 L (bolsa lavable)"},{"label":"Función","value":"Enrollacable automático, indicador de bolsa llena, regulador de succión"},{"label":"Accesorios incluidos","value":"2 tubos telescópicos, cepillo multiuso, boquilla rinconera"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-VC16BAG';

-- AM610: Procesadora Liliana MAXIMIX 650W (fuente: Mercado Libre, Photostore, Redconfiar)
update products set
  description = 'Procesadora compacta con exprimidor de citricos incorporado, pensada para tareas basicas de preparacion de alimentos. Su bowl de 1 litro y discos intercambiables permiten rallar y rebanar, con traba de seguridad para un uso confiable.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AM610 (Maximix)"},{"label":"Color","value":"Rojo"},{"label":"Voltaje","value":"220-240V"},{"label":"Potencia","value":"650 W"},{"label":"Capacidad","value":"Bowl de 1 L"},{"label":"Velocidades","value":"3 velocidades + pulsador"},{"label":"Accesorios incluidos","value":"Exprimidor de cítricos, cuchilla picadora, discos ralladora/rebanadora"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AM610';

-- 94PHTE080B2: Termotanque eléctrico Philco 80L (fuente: Philco/Megatone, Fravega, D'Ricco)
update products set
  description = 'Termotanque electrico de 73 litros de capacidad neta (80 litros brutos), pensado para hogares de consumo alto de agua caliente. Cuenta con resistencia esmaltada anticorrosiva, aislacion termica total y valvula termostatica de seguridad, con instalacion para colgar y conexion inferior.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"94PHTE080B2"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"79.5 x 54.5 x 46.5 cm"},{"label":"Peso","value":"25 kg"},{"label":"Voltaje","value":"220-240V"},{"label":"Potencia","value":"1500 W"},{"label":"Capacidad","value":"80 L (73 L de recuperación)"},{"label":"Función","value":"Resistencia esmaltada anticorrosiva, aislación térmica total, válvula termostática"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '94PHTE080B2';

-- PIA205008: Termotanque eléctrico BGH 50L (fuente: BGH/Cetrogar, Fravega, AllCell)
update products set
  description = 'Termotanque electrico de 50 litros pensado para 1 o 2 personas, con interior vitrificado que minimiza la formacion de sarro. Cuenta con aislacion de poliuretano, valvula de seguridad y regulador de temperatura, con luz LED indicadora de encendido.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"PIA205008 (BTE-050CM15MC)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"56.3 cm alto, 45 cm diámetro"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Capacidad","value":"50 L"},{"label":"Función","value":"Interior vitrificado, aislación de poliuretano, válvula de seguridad, regulador de temperatura"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PIA205008';

-- VC20R: Aspiradora Samsung sin bolsa 2000W (fuente: Samsung oficial, Fravega, Megatone)
update products set
  description = 'Aspiradora sin bolsa compacta y liviana, pensada para la limpieza rapida del hogar. Su tecnologia Cyclone Force separa el aire de las particulas finas evitando que se obstruya el filtro, y el deposito se vacia directamente sin necesidad de bolsas descartables.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"VC20/BG"},{"label":"Peso","value":"4.5 kg"},{"label":"Potencia","value":"2000 W"},{"label":"Capacidad","value":"1.5 L"},{"label":"Función","value":"Tecnología Cyclone Force, sin bolsa, cable largo, ruedas grandes"},{"label":"Accesorios incluidos","value":"Cepillo NB300"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VC20R';

-- SAMG23F3K3TAS: Microondas Samsung digital con grill 23L plata (fuente: Samsung oficial, Fravega, Megatone)
update products set
  description = 'Microondas con grill de 23 litros e interior ceramico, pensado para quienes buscan combinar coccion por microondas con gratinado en un solo equipo. Ofrece 20 modos de coccion preestablecidos, 6 niveles de potencia, modo ECO y traba de seguridad para ninos.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"SAMG23F3K3TAS (MG23F3K3TAS)"},{"label":"Color","value":"Plata"},{"label":"Potencia","value":"800 W microondas, 1050 W grill"},{"label":"Capacidad","value":"23 L"},{"label":"Función","value":"Interior cerámico, 20 modos de cocción, 6 niveles de potencia, modo ECO, timer, traba infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SAMG23F3K3TAS';

-- CMP65R: Cafetera espresso Oster 19 bar manual (fuente: Oster oficial, Fravega, Gastronovo)
update products set
  description = 'Cafetera espresso 2 en 1 compatible con cafe molido y capsulas Nespresso, pensada para preparar hasta 2 tazas de espresso a la vez. Su bomba italiana de 19 bares extrae mas sabor y crema, y la varilla de vapor permite espumar leche para capuchinos y lattes.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"CMP65R (BVSTECMP65)"},{"label":"Color","value":"Rojo"},{"label":"Peso","value":"3.75 kg"},{"label":"Dimensiones","value":"34.2 x 25 x 35 cm"},{"label":"Potencia","value":"1170 W"},{"label":"Capacidad","value":"1.2 L"},{"label":"Presión","value":"19 bar"},{"label":"Función","value":"Compatible con molido y cápsulas Nespresso, varilla de vapor para espumar leche"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CMP65R';

-- BVSTEM5502: Cafetera espresso Oster compacta 15 bar (fuente: Oster oficial, Fravega, Megatone)
update products set
  description = 'Cafetera espresso compacta con bomba italiana de 15 bares, pensada para quienes tienen poco espacio en la mesada. Permite preparar 1 o 2 espressos por ciclo y es compatible con capsulas Dolce Gusto, con tubo de vapor ajustable para espuma de leche.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"BVSTEM5502"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"20.9 x 28.6 x 29.3 cm"},{"label":"Capacidad","value":"1.5 L"},{"label":"Presión","value":"15 bar"},{"label":"Función","value":"Compatible con cápsulas Dolce Gusto, tubo de vapor para espuma de leche"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BVSTEM5502';

-- SL-SI2326: Plancha a vapor Smartlife 2000W base cerámica (fuente: Smartlife oficial, Fravega, Cetrogar)
update products set
  description = 'Plancha a vapor con base ceramica antiadherente, pensada para un planchado comodo y parejo. Cuenta con vapor vertical, golpe de vapor, rociador y regulador de temperatura, ademas de sistema anti-calcareo e indicador luminoso de encendido.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-SIC2326"},{"label":"Color","value":"Celeste"},{"label":"Material","value":"Base cerámica"},{"label":"Peso","value":"1.2 kg"},{"label":"Dimensiones","value":"15 x 13 x 29 cm"},{"label":"Potencia","value":"2000 W"},{"label":"Función","value":"Vapor vertical, golpe de vapor, rociador, anti-calcáreo, cable multidireccional"},{"label":"Garantía","value":"24 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-SI2326';

-- PE0172SN: Pava eléctrica hervidora Kanji Westinghouse 1.8L inox (fuente: Fravega, LH Confort, Kanji)
update products set
  description = 'Pava electrica hervidora de acero inoxidable con corte automatico a los 100 grados, pensada para el uso diario. Cuenta con base giratoria de 360 grados, guardacable, luz indicadora y proteccion de apagado ante falta de agua.',
  specs = '[{"label":"Marca","value":"Kanji (Westinghouse)"},{"label":"Modelo","value":"WH-PE0172SN"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"2 L"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"Corte automático a 100°C, base giratoria 360°, guardacable, luz indicadora"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PE0172SN';

-- SL-JC3400: Exprimidor de cítricos Smartlife 30W (fuente: Smartlife oficial, Fravega, Megatone)
update products set
  description = 'Exprimidor de citricos electrico compacto, pensado para el uso diario en la cocina. Su motor bidireccional y filtro ajustable permiten regular la cantidad de pulpa, con dos tamanos de cono para distintos citricos.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-JC3400"},{"label":"Material","value":"Detalles de acero inoxidable"},{"label":"Capacidad","value":"1 L"},{"label":"Potencia","value":"30 W"},{"label":"Función","value":"Motor bidireccional, filtro ajustable, 2 tamaños de cono"},{"label":"Garantía","value":"24 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-JC3400';

-- LSI-LF6510B2: Lavarropas Siam automático 6.5kg carga frontal (fuente: Siam oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6.5 kg y tecnologia Snowflake Drum que cuida hasta las telas mas delicadas. Ofrece 15 programas, lavado rapido de 15 minutos, bloqueo de seguridad para ninos y comienzo diferido.',
  specs = '[{"label":"Marca","value":"Siam"},{"label":"Modelo","value":"LSI-LF6510B2"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"59.5 x 84.5 x 45 cm"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"6.5 kg"},{"label":"Función","value":"Centrifugado 1000 rpm, tambor inoxidable, 15 programas, bloqueo infantil, comienzo diferido"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LSI-LF6510B2';

-- L18010: Lavarropas Longvie automático 8kg carga frontal (fuente: Longvie oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 8 kg, pensado para familias numerosas que buscan eficiencia energetica. Su tambor de acero inoxidable y sistema Intelligent FIT se combinan con 15 programas, incluyendo lavado rapido y ciclos especiales para bebes y jeans.',
  specs = '[{"label":"Marca","value":"Longvie"},{"label":"Modelo","value":"L18010"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"60 x 85 x 60 cm"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"8 kg"},{"label":"Función","value":"Centrifugado 1000 rpm, tambor inoxidable, 15 programas, display digital, bloqueo infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'L18010';

-- KJH-CMF0800S03: Cafetera de filtro Kanji 6 tazas (fuente: Kanji oficial, Fravega, Megatone)
update products set
  description = 'Cafetera de filtro semiautomatica con jarra de vidrio, pensada para preparar hasta 6 tazas de cafe. Cuenta con sistema antigoteo, filtro permanente lavable, luz indicadora y visor de nivel de agua.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-CMF0800S03"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Jarra de vidrio"},{"label":"Capacidad","value":"0.6 L (6 tazas)"},{"label":"Potencia","value":"800 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Filtro permanente, antigoteo, indicador luminoso, visor de nivel de agua"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-CMF0800S03';

-- EV-750: Purificador de Aire Everest a perilla blanco (fuente: Everest, Electromisiones, Fenix Hogar)
update products set
  description = 'Purificador extractor de aire para cocina con control a perilla, pensado para instalarse sobre la cocina y renovar el aire del ambiente. Cuenta con 3 velocidades, luz incorporada y bajo nivel de ruido para un uso diario mas comodo.',
  specs = '[{"label":"Marca","value":"Everest"},{"label":"Modelo","value":"EV-750"},{"label":"Color","value":"Blanco"},{"label":"Peso","value":"7 kg"},{"label":"Potencia","value":"140 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Caudal 250 m³/h, luz incorporada, extractor y purificador, control a perilla, ruido bajo 50 dB"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'EV-750';

-- EV-790: Purificador de Aire Everest acero inoxidable (fuente: Everest, Electromisiones)
update products set
  description = 'Purificador extractor de aire para cocina con control a perilla, pensado para instalarse sobre la cocina y renovar el aire del ambiente. Cuenta con 3 velocidades y bajo nivel de ruido, en terminacion acero inoxidable.',
  specs = '[{"label":"Marca","value":"Everest"},{"label":"Modelo","value":"EV-790"},{"label":"Color","value":"Acero inoxidable"},{"label":"Potencia","value":"100 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Caudal 250 m³/h, extractor y purificador, control a perilla, ruido bajo 50 dB"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'EV-790';

-- KJH-CFHB001BK: Ventilador de techo Kanji retráctil control remoto (fuente: Kanji/Fravega, Megatone, Hendel)
update products set
  description = 'Ventilador de techo con aspas retractiles que desaparecen contra el cuerpo cuando esta apagado, pensado para ambientes donde se busca un diseno mas discreto. Incluye control remoto con timer, 6 velocidades y lampara LED incorporada.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-CFHB001BK"},{"label":"Color","value":"Estructura negra, aspas transparentes"},{"label":"Material","value":"Aspas de plástico retráctiles"},{"label":"Diámetro","value":"115 cm"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"65 W"},{"label":"Velocidades","value":"6"},{"label":"Función","value":"Control remoto, timer, luz LED integrada, no oscilante, ruido bajo 40 dB"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-CFHB001BK';

-- KJH-FI3017: Ventilador industrial 2 en 1 Kanji 30" 180W (fuente: Kanji oficial, Audiovisión, Natalia Hogar)
update products set
  description = 'Ventilador industrial 2 en 1 que se puede usar de pie o montado en la pared, pensado para espacios grandes como comercios o galpones. Sus 3 aspas de PVC y motor de 180W ofrecen buen caudal de aire con oscilacion y 3 velocidades.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-FI3017"},{"label":"Material","value":"Aspas de PVC, rejilla metálica"},{"label":"Diámetro","value":"30\""},{"label":"Peso","value":"9 kg"},{"label":"Dimensiones","value":"1.40 m de altura"},{"label":"Potencia","value":"180 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Uso 2 en 1 (pie/pared), oscilante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-FI3017';

-- V1000: Turboventilador Magiclick 20" 90W (fuente: Magiclick oficial, Fravega, Atenas Ventilación)
update products set
  description = 'Turboventilador de 20 pulgadas pensado para pisos y paredes, con cabezal inclinable y ajustable en 180 grados para dirigir el aire donde se necesite. Sus 5 aspas plasticas y motor de 90W ofrecen buen caudal en 3 velocidades.',
  specs = '[{"label":"Marca","value":"Magiclick"},{"label":"Modelo","value":"V1000"},{"label":"Color","value":"Negro"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Cabezal inclinable, ajuste 180°, apto para pared"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V1000';

-- WH-CH107: Caloventor Kanji Westinghouse redondo 2000W (fuente: Pierrot, Seel, Casa Lorenzo)
update products set
  description = 'Caloventor redondo y compacto pensado para calefaccionar ambientes chicos rapidamente. Cuenta con 2 niveles de potencia (1000W y 2000W) con selector de temperatura integrado, funcion solo ventilacion y proteccion contra sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Kanji (Westinghouse)"},{"label":"Modelo","value":"WH-CH107"},{"label":"Dimensiones","value":"26 x 23 x 14 cm"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"1000/2000 W"},{"label":"Función","value":"Selector de temperatura, modo ventilación, protección contra sobrecalentamiento, indicador luminoso"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'WH-CH107';

-- WH-CH109: Caloventor de pared Kanji Westinghouse split control remoto (fuente: Casa Lorenzo, Nuevas Hogar, Electromega)
update products set
  description = 'Caloventor de pared tipo split con control remoto, pensado para calefaccionar sin ocupar espacio en el piso. Ofrece dos niveles de potencia (1000W y 2000W) y modo ventilacion, con proteccion contra sobrecalentamiento y timer de hasta 7.5 horas.',
  specs = '[{"label":"Marca","value":"Kanji (Westinghouse)"},{"label":"Modelo","value":"WH-CH109"},{"label":"Color","value":"Blanco"},{"label":"Potencia","value":"1000/2000 W"},{"label":"Función","value":"Control remoto, timer hasta 7.5 h, modo ventilación, protección contra sobrecalentamiento, tipo split"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'WH-CH109';

-- SL-WMI061000W: Lavarropas Smartlife Inverter Slim 6kg (fuente: Smartlife oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con diseno slim para espacios reducidos, con tecnologia inverter de alta eficiencia energetica. Ofrece 15 programas incluyendo lavado a vapor y ciclo rapido de 15 minutos, con tambor de acero inoxidable y funcion de limpieza interna.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-WMI061000W"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"59.5 x 85 x 40 cm"},{"label":"Peso","value":"52 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"2000 W"},{"label":"Capacidad","value":"6 kg"},{"label":"Función","value":"Tecnología Inverter, centrifugado 1000 rpm, tambor inoxidable, 15 programas, panel LED"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-WMI061000W';

-- TO20WP: Tostadora eléctrica Atma 2 rebanadas (fuente: Atma/Fravega, Garbarino, Hendel)
update products set
  description = 'Tostadora de 2 rebanadas con 7 niveles de tostado, pensada para el desayuno diario. Incluye funcion de recalentar, descongelar y cancelar, con bandeja recolectora de migas y base antideslizante.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"TO20WP"},{"label":"Color","value":"Blanco"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"700 W"},{"label":"Capacidad","value":"2 rebanadas"},{"label":"Función","value":"7 niveles de tostado, recalentar, descongelar, cancelar, bandeja para migas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TO20WP';

-- FP-21: Ventilador 3 en 1 Embassy 21" 100W (fuente: Fravega, Teczo, Yuhmak)
update products set
  description = 'Ventilador versatil que se puede usar de pie, en pared o como turbo circulador de piso, pensado para adaptarse al espacio disponible. Sus 5 aspas metalicas y motor de 100W ofrecen buen caudal en 3 velocidades, con oscilacion de 120 grados y altura ajustable hasta 1.75 metros.',
  specs = '[{"label":"Marca","value":"Embassy"},{"label":"Modelo","value":"FP-21"},{"label":"Material","value":"Aspas metálicas"},{"label":"Diámetro","value":"21\""},{"label":"Potencia","value":"100 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Uso 3 en 1 (pie, pared, turbo), oscilación 120°, altura ajustable hasta 1.75 m"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'FP-21';

-- MF100W60/W-A1: Lavarropas Midea automático 6kg blanco (fuente: Midea oficial, Fravega, Naldo)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6 kg, pensado para el lavado semanal de una familia chica o mediana. Ofrece 15 programas de lavado, tambor de acero inoxidable, comienzo diferido y control de temperatura, con display LCD.',
  specs = '[{"label":"Marca","value":"Midea"},{"label":"Modelo","value":"MF100W60/W-A1"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"59.5 x 85 x 40 cm"},{"label":"Peso","value":"52 kg"},{"label":"Potencia","value":"2050 W"},{"label":"Capacidad","value":"6 kg"},{"label":"Función","value":"Centrifugado 1000 rpm, tambor inoxidable, 15 programas, comienzo diferido, display LCD"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MF100W60/W-A1';

-- KJH-FH1405: Turboventilador Kanji 14" 60W (fuente: Kanji oficial)
update products set
  description = 'Turboventilador compacto de 14 pulgadas, pensado para espacios chicos como una oficina o habitacion. Cuenta con base inclinable y 3 velocidades para adaptar el caudal de aire segun la necesidad.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-FH1405"},{"label":"Material","value":"Aspas de plástico"},{"label":"Diámetro","value":"14\""},{"label":"Potencia","value":"60 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Base inclinable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-FH1405';

-- VTI32: Turboventilador Liliana industrial 32" 280W (fuente: Liliana oficial, Bringeri, Monumental Hogar)
update products set
  description = 'Turboventilador industrial de 32 pulgadas con motor reforzado, pensado para espacios grandes o de uso intensivo como locales o talleres. Sus 2 aspas metalicas tipo avion y cabezal reclinable ofrecen gran caudal de aire en 3 velocidades.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VTI32"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aspas metálicas, base y parrilla metálica"},{"label":"Diámetro","value":"32\""},{"label":"Dimensiones","value":"87.8 x 35.1 x 83.8 cm"},{"label":"Potencia","value":"280 W"},{"label":"Voltaje","value":"220V, 50-60Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Cabezal reclinable, motor reforzado"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VTI32';

-- LSI-LF081B: Lavarropas Siam automático 8kg carga frontal (fuente: Siam oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 8 kg, pensado para familias numerosas. Su tambor de acero inoxidable y motor de bajo ruido se combinan con 23 programas, incluyendo un lavado super rapido de 15 minutos.',
  specs = '[{"label":"Marca","value":"Siam"},{"label":"Modelo","value":"LSI-LF081B"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"59.5 x 85 x 56.5 cm"},{"label":"Peso","value":"72 kg"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"8 kg"},{"label":"Función","value":"Centrifugado 1200 rpm, tambor inoxidable, 23 programas, lavado rápido 15 min, motor bajo ruido"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LSI-LF081B';

-- E-511: Estufa Infraroja Fija Eiffel 2 velas (fuente: Eiffel/Fravega, Selex Hogar, Dual Equipamientos)
update products set
  description = 'Estufa electrica infrarroja fija con 2 tubos halogenos, pensada para calefaccionar rapido un espacio chico. Cuenta con 2 niveles de potencia (400W y 800W) y corte de seguridad por vuelco, con gabinete de plastico ignifugo liviano para trasladar.',
  specs = '[{"label":"Marca","value":"Eiffel"},{"label":"Modelo","value":"E-511"},{"label":"Material","value":"Plástico ignífugo"},{"label":"Dimensiones","value":"20 x 40 x 50 cm"},{"label":"Peso","value":"1.5 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"400/800 W"},{"label":"Función","value":"2 tubos halógenos, corte por vuelco, protección contra sobrecalentamiento"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E-511';

-- E-523: Estufa Infraroja Fija Eiffel 3 velas (fuente: Eiffel/Fravega, Center Hogar, Reventon Store)
update products set
  description = 'Estufa electrica infrarroja fija con 3 tubos halogenos, pensada para calefaccionar un ambiente mediano de forma rapida. Cuenta con 2 niveles de potencia (600W y 1200W) que se pueden controlar de forma individual, con corte de seguridad por caida.',
  specs = '[{"label":"Marca","value":"Eiffel"},{"label":"Modelo","value":"E-523"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Plástico resistente"},{"label":"Dimensiones","value":"55 x 30 x 30 cm"},{"label":"Peso","value":"1.5 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"600/1200 W"},{"label":"Función","value":"3 tubos halógenos, termostato, corte por caída, protección contra sobrecalentamiento"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E-523';

-- PHCU18T1N: Estufa de Cuarzo Philco 1800W (fuente: Philco/Megatone, Cetrogar, MercadoLibre)
update products set
  description = 'Estufa de cuarzo con 3 velas y 2 niveles de potencia, pensada para calefaccionar rapido distintos ambientes segun la necesidad. Cuenta con rejilla protectora, corte de seguridad antivuelco y proteccion contra sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PHCU18T1N"},{"label":"Dimensiones","value":"50 x 15 x 25 cm"},{"label":"Voltaje","value":"220-240V, 50Hz"},{"label":"Potencia","value":"1800 W"},{"label":"Función","value":"3 velas de cuarzo, 2 niveles de potencia, rejilla protectora, corte antivuelco"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PHCU18T1N';

-- P18HAN: Pava eléctrica hervidora Codini 1.8L acero inox. (fuente: Codini oficial, Megatone, Cetrogar)
update products set
  description = 'Pava electrica hervidora de acero inoxidable, pensada para el uso diario. Cuenta con base giratoria de 360 grados, corte automatico de seguridad y luz indicadora de encendido.',
  specs = '[{"label":"Marca","value":"Codini"},{"label":"Modelo","value":"P18HAN"},{"label":"Color","value":"Gris"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"1.8 L"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Corte automático, base giratoria 360°, luz indicadora"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'P18HAN';

-- KJH-PE0153S-W: Pava eléctrica hervidora Kanji 2L blanca (fuente: Fabrex, LH Confort, Kanji)
update products set
  description = 'Pava electrica hervidora clasica con interior de acero inoxidable, pensada para el uso diario. Cuenta con base giratoria de 360 grados, proteccion contra sobrecalentamiento, luz indicadora y corte automatico cuando el agua esta lista.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-PE0153S"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Interior de acero inoxidable, exterior plástico"},{"label":"Capacidad","value":"2 L"},{"label":"Potencia","value":"1500 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Corte automático, base giratoria 360°, protección contra sobrecalentamiento, luz indicadora"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-PE0153S-W';

-- EM6801W: Cafetera espresso Oster automática/manual panel táctil (fuente: Oster oficial, Garbarino, Naldo)
update products set
  description = 'Cafetera espresso automatica con panel tactil y bomba de 19 bares, pensada para preparar espresso, capuchino y latte con espumador de leche automatico. Sus depositos de agua (2L) y leche (600ml) son extraibles, y cuenta con ciclo de limpieza automatico para el espumador.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"EM6801W (BVSTEM6801)"},{"label":"Color","value":"Blanco"},{"label":"Capacidad","value":"Depósito de agua 2 L, depósito de leche 600 ml"},{"label":"Potencia","value":"1050 W"},{"label":"Presión","value":"19 bar"},{"label":"Función","value":"Panel táctil, espumador automático, compatible con cápsulas Nespresso y E.S.E., limpieza automática"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'EM6801W';

-- KJH-PL0300HMB01: Batidora de mano c/pedestal Kanji 300W (fuente: Fravega, Megatone, Behmont)
update products set
  description = 'Batidora de mano con pedestal desmontable, pensada para usarse fija sobre su base o de forma manual segun la preparacion. Incluye bowl de 2 litros, ganchos amasadores en espiral y varillas de batir, con 7 velocidades.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-PL0300HMB01"},{"label":"Potencia","value":"300 W"},{"label":"Capacidad","value":"Bowl de 2 L"},{"label":"Velocidades","value":"7"},{"label":"Accesorios incluidos","value":"2 varillas de batir, 2 ganchos amasadores"},{"label":"Función","value":"Cabezal desmontable, base giratoria, uso de mano o con pedestal"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-PL0300HMB01';

-- KJH-JM045: Exprimidor de cítricos Kanji 40W 0.7L (fuente: Kanji oficial, Fravega, Megatone)
update products set
  description = 'Exprimidor de citricos electrico compacto, pensado para el uso diario en la cocina. Su cono con doble sentido de rotacion maximiza la extraccion de jugo, y la jarra con marcas medidoras facilita servir la cantidad justa.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-JM045"},{"label":"Color","value":"Blanco y verde"},{"label":"Peso","value":"1 kg"},{"label":"Dimensiones","value":"15 x 20 x 20 cm"},{"label":"Capacidad","value":"0.7 L"},{"label":"Potencia","value":"40 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Rotación en ambos sentidos, regulador de pulpa, jarra con marcas medidoras"},{"label":"Garantía","value":"6 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-JM045';

-- T10: Turboventilador Crivel 20" 90W reclinable (fuente: Megatone, Genesio Hogar, Fravega)
update products set
  description = 'Turboventilador de 20 pulgadas con aspas tipo avion metalicas, pensado para dar buen caudal de aire en espacios chicos o medianos. Cuenta con patas metalicas, rejilla protectora y cabezal de inclinacion regulable en 3 velocidades.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"T10"},{"label":"Material","value":"Aspas metálicas, patas y rejilla metálica"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Inclinación regulable, altura máxima 0.6 m"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'T10';

-- T11: Turboventilador Crivel 16" 45W fijo rejilla giratoria (fuente: Calatayud, Massei Hogar, Laprida Hogar)
update products set
  description = 'Turboventilador fijo de 16 pulgadas con rejilla giratoria, pensado para espacios chicos como una oficina o habitacion. Incluye timer y 3 velocidades, con aspas de plastico y funcionamiento silencioso.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"T11"},{"label":"Material","value":"Aspas de plástico"},{"label":"Diámetro","value":"16\""},{"label":"Potencia","value":"45 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Rejilla giratoria, timer, base estable, fijo (sin oscilación)"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'T11';

-- P50: Plancha seca Crivel 1100W base aluminio (fuente: Sensei, Centrogar, Alperin)
update products set
  description = 'Plancha seca con base de aluminio que distribuye el calor de manera uniforme, pensada para un planchado rapido y parejo. Cuenta con selector de temperatura segun el tipo de tela, cable multidireccional y resistencia blindada.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"P50 (2150)"},{"label":"Material","value":"Base de aluminio, cuerpo plástico"},{"label":"Potencia","value":"1100 W"},{"label":"Función","value":"Selector de temperatura, cable multidireccional, resistencia blindada, luz indicadora"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'P50';

-- P58: Plancha a vapor Crivel 1100W base aluminio (fuente: Navarrete Hogar, Habitar, Fullone)
update products set
  description = 'Plancha a vapor con base de aluminio para un deslizamiento uniforme, pensada para el planchado frecuente en el hogar. Cuenta con deposito de agua, luz indicadora, cable multidireccional y selector de temperatura ajustable segun la tela.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"P58 (PV8010)"},{"label":"Material","value":"Base de aluminio"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1100 W"},{"label":"Función","value":"Vapor, selector de temperatura, luz indicadora, cable multidireccional"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'P58';

-- V33: Ventilador industrial de pie Crivel 26" 200W (fuente: Genesio Hogar, Fravega, Previsora del Paraná)
update products set
  description = 'Ventilador de pie industrial de 26 pulgadas, pensado para espacios grandes que necesitan buena circulacion de aire. Sus 3 aspas metalicas tipo avion y base metalica ofrecen estabilidad, con altura maxima de 1.80 metros, oscilacion e inclinacion regulable.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"V33"},{"label":"Material","value":"Aspas y base metálica"},{"label":"Diámetro","value":"26\" (0.65 m)"},{"label":"Potencia","value":"200 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante, inclinación regulable, altura máxima 1.80 m"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V33';

-- V34: Ventilador industrial de pared Crivel 26" 200W (fuente: Megatone, Centrogar, Previsora del Paraná)
update products set
  description = 'Ventilador de pared industrial de 26 pulgadas, pensado para locales o espacios grandes donde no hay lugar en el piso. Sus 3 aspas metalicas tipo avion y reja de proteccion ofrecen buen caudal de aire, con oscilacion de 180 grados y soporte para instalar en pared.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"V34"},{"label":"Material","value":"Aspas y rejilla metálica"},{"label":"Diámetro","value":"26\""},{"label":"Potencia","value":"200 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilación 180°, inclinación regulable, soporte para pared incluido"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V34';

-- V40: Ventilador industrial de pared Crivel 30" 220W (fuente: Crivel oficial, Centrogar, Navarrete Hogar)
update products set
  description = 'Ventilador de pared industrial de 30 pulgadas, pensado para locales o espacios grandes donde no hay lugar en el piso. Sus 3 aspas metalicas tipo avion y reja de proteccion ofrecen gran caudal de aire, con motor potenciado y silencioso e inclinacion de cabezal regulable.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"V40"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aspas y rejilla metálica"},{"label":"Diámetro","value":"30\""},{"label":"Potencia","value":"220 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Inclinación de cabezal regulable, ménsula para pared incluida"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V40';
