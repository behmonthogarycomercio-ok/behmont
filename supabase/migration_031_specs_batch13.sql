-- Migracion 031: tanda 13 de specs/descripcion investigados (skill
-- product-specs-research). Categoria "Electrodomesticos" (pavas, lavarropas,
-- exprimidores, batidoras, calefones, ventiladores de pie, cocinas mini
-- semiindustriales). 14 productos confirmados de un pool de 23 candidatos.
-- Fuentes: sitios oficiales de fabricante (Columbia, Santini, Oster, Embassy,
-- Smartlife, Kanji, Crivel, Sol Real) y tiendas reconocidas (Fravega,
-- Megatone, Garbarino, Cetrogar, Musimundo, Petenatti Hogar).
-- Solo toca specs/description de estos 14 SKU puntuales, no pisa nada mas.
--
-- Excluidos de esta tanda (9, reportados aparte, no tocados por este SQL):
-- LCF912B (Kenwick cafetera filtro: sin fuente confiable para ese modelo
-- exacto) - P78 (Crivel plancha a vapor: existen PV-9020/PV8010/PAS2150 pero
-- ningun modelo "P78" real) - 42096 (Tresso pava: no existe ese numero de
-- modelo, se confunde con productos no relacionados) - XP090 (Dielfe centro
-- de planchado: sin fuente confiable) - HE-CR1800 (Copalus pava: no se pudo
-- confirmar marca+modelo exacto juntos en ninguna fuente) - LML601B (Kenwick
-- licuadora de mano: solo aparece el modelo LML653B, distinto) - 315KHON
-- (Orbis calefon: la familia 315K*O tiene variantes por tipo de encendido
-- que no se pueden asumir iguales, no se confirma cual es la "N") -
-- C2000BNRV (Neba caloventor: no coincide con NCA2000N/B ni C2000B) -
-- H09-10016 (Hudson bateria de cocina: solo aparece "09-10016N" en tiendas
-- mexicanas, no se pudo confirmar que sea el mismo producto del catalogo
-- argentino).

-- E606: Pava Electrica Eiffel Vidrio Corte Mate y Cafe (fuente: Pixel Store, Tienda Ultra, Voxx)
update products set
  description = 'Pava electrica de vidrio templado pensada para quienes preparan mate o cafe a diario, con corte automatico que evita que hierva de mas. Su luz indicadora permite ver el nivel de agua y saber cuando esta en funcionamiento. Un diseno practico y liviano para la mesada de la cocina.',
  specs = '[{"label":"Marca","value":"Eiffel"},{"label":"Modelo","value":"E-606"},{"label":"Material","value":"Vidrio templado"},{"label":"Capacidad","value":"1.7 L"},{"label":"Función","value":"Corte automático, apto para mate y café, 2 niveles de temperatura, luz indicadora"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E606';

-- LSC7000: Lavarropas semiautomático Columbia 7 kg (fuente: Columbia oficial, Fravega, Grupo Marquez)
update products set
  description = 'Lavarropas semiautomatico de carga superior con capacidad para 7 kg, ideal para el lavado semanal de una familia chica o mediana. Cuenta con triple dispenser para jabon, suavizante y blanqueador, y tecnologia turbo para remover manchas dificiles en los 7 programas disponibles. Su diseno incluye filtro de pelusa y manijas para facilitar el traslado.',
  specs = '[{"label":"Marca","value":"Columbia"},{"label":"Modelo","value":"LSC7000"},{"label":"Color","value":"Blanco/Celeste"},{"label":"Dimensiones","value":"88.5 x 51.5 x 53 cm"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"7 kg"},{"label":"Tipo de carga","value":"Superior"},{"label":"Función","value":"Triple dispenser, tecnología turbo, 7 programas de lavado, filtro de pelusa"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LSC7000';

-- ES-180: Exprimidor de citricos electrico Santini industrial 180W (fuente: Santini oficial, Usacord, Gastrohogar)
update products set
  description = 'Exprimidor de citricos electrico de uso industrial, pensado para bares, panaderias y comercios gastronomicos que necesitan exprimir grandes volumenes de naranja, limon o pomelo. Su motor de 180 W a 1500 rpm y los tres conos intercambiables permiten adaptarse a citricos de distinto tamano, mientras el filtro de semillas mantiene el jugo limpio. Cuerpo de aluminio inyectado que le da resistencia para uso frecuente.',
  specs = '[{"label":"Marca","value":"Santini"},{"label":"Modelo","value":"ES-180"},{"label":"Material","value":"Aluminio inyectado"},{"label":"Peso","value":"4.77 kg"},{"label":"Dimensiones","value":"21.7 x 30.5 x 34.5 cm"},{"label":"Potencia","value":"180 W"},{"label":"Velocidad","value":"1500 rpm"},{"label":"Accesorios incluidos","value":"3 conos plásticos de distinto tamaño, filtro de semillas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ES-180';

-- 3532: Batidora de mano Oster 250W (fuente: Oster oficial, Fravega, Coopehogar, Falabella)
update products set
  description = 'Batidora de mano con 6 velocidades y funcion turbo para adaptarse desde mezclas livianas hasta masas mas pesadas. Incluye batidores de metal y ganchos amasadores intercambiables mediante el boton de expulsion, y su mango ergonomico facilita el manejo prolongado. Pensada para el uso diario en la cocina de cualquier hogar.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"3532"},{"label":"Color","value":"Blanco"},{"label":"Potencia","value":"250 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"6 velocidades + turbo"},{"label":"Accesorios incluidos","value":"Batidores de metal, ganchos amasadores"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '3532';

-- 1040103: Calefon electrico Indelplas D20 Max 20L 1100W Enlozado (fuente: Garbarino, Ferreteria El Molino, Casa Lorenzo)
update products set
  description = 'Calefon electrico de 20 litros pensado para hogares sin conexion a gas, con terminacion enlozada blanca resistente a la corrosion. Incorpora un visor de nivel de agua integrado y corta la energia automaticamente si detecta falta de agua, para mayor seguridad de uso. Se entrega con conexion entrerosca, ducha y grifo para una instalacion completa.',
  specs = '[{"label":"Marca","value":"Indelplas"},{"label":"Modelo","value":"D20 Max"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Enlozado"},{"label":"Dimensiones","value":"33 x 23 x 33 cm"},{"label":"Potencia","value":"1100 W"},{"label":"Capacidad","value":"20 L"},{"label":"Función","value":"Interruptor bipolar luminoso, corte por falta de agua, visor de nivel, cable de 1 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '1040103';

-- FY-18A: Ventilador 3 en 1 Embassy 18" 90W (fuente: Coluccie Equipamiento, Grupo Marquez, Cordoba Digital)
update products set
  description = 'Ventilador versatil que se puede usar como ventilador de pie, de mesa o montado en la pared, ideal para adaptarse al espacio disponible en cada ambiente. Sus 5 aspas de metal y motor de 90 W ofrecen buen caudal de aire en 3 velocidades, con oscilacion de 180 grados para cubrir un area mas amplia. Fabricado en Argentina.',
  specs = '[{"label":"Marca","value":"Embassy"},{"label":"Modelo","value":"FY-18A"},{"label":"Color","value":"Estructura negra, aspas plateadas"},{"label":"Material","value":"Aspas de metal"},{"label":"Diámetro","value":"18\" (45.72 cm)"},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Uso 3 en 1 (pie, mesa y pared), oscilación 180°, altura ajustable hasta 1.70 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'FY-18A';

-- SL-HM5035: Batidora de pie 2 en 1 Smartlife 300W (fuente: Smartlife oficial, Fravega, Megatone)
update products set
  description = 'Batidora 2 en 1 que funciona tanto de pie, apoyada sobre su pedestal con bowl giratorio de 3.4 litros, como de mano para mayor libertad de movimiento. Sus 5 velocidades mas funcion turbo permiten batir, mezclar y amasar distintas preparaciones, desde merengues livianos hasta masas mas consistentes. Incluye batidores y ganchos amasadores intercambiables.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-HM5035"},{"label":"Potencia","value":"300 W"},{"label":"Velocidades","value":"5 velocidades + turbo"},{"label":"Capacidad","value":"Bowl de 3.4 L"},{"label":"Material","value":"Bowl plástico rotativo"},{"label":"Accesorios incluidos","value":"Batidores y ganchos amasadores"},{"label":"Función","value":"Pedestal desmontable (uso de pie o de mano)"},{"label":"Garantía","value":"24 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-HM5035';

-- SL-VC18BLB: Aspiradora sin bolsa Smartlife 1800W (fuente: Smartlife oficial, Fravega, Garbarino)
update products set
  description = 'Aspiradora sin bolsa de 1800 W con sistema de filtrado HEPA multiciclonico, que retiene polvo fino, polen y acaros sin perder potencia de succion. Su tanque de 3 litros es removible y lavable, y el tubo telescopico metalico se ajusta en altura para limpiar tanto pisos como zonas altas. Incluye cepillo multiuso y boquilla para rincones, con rebobinado automatico de cable para guardarla con comodidad.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-VC18BLB"},{"label":"Color","value":"Gris con detalles azules"},{"label":"Potencia","value":"1800 W"},{"label":"Voltaje","value":"220-240V"},{"label":"Capacidad","value":"Tanque de 3 L"},{"label":"Material","value":"Filtro HEPA multiciclónico"},{"label":"Peso","value":"5.8 kg"},{"label":"Dimensiones","value":"26 x 28 x 45 cm"},{"label":"Accesorios incluidos","value":"Cepillo multiuso, boquilla para rincones"},{"label":"Función","value":"Tanque removible y lavable, tubo telescópico 46-74 cm, rebobinado automático de cable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-VC18BLB';

-- KJH-FH2012: Ventilador de pie Kanji 20" 95W con control remoto (fuente: Kanji oficial, Fravega, Musimundo)
update products set
  description = 'Ventilador de pie de 20 pulgadas con control remoto para manejar velocidad y apagado sin necesidad de acercarse al equipo. Su base metalica le da estabilidad, mientras que la funcion de oscilacion e inclinacion ayuda a distribuir mejor el aire en el ambiente. Incluye timer programable y altura regulable para adaptarse a distintos usos.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-FH2012"},{"label":"Color","value":"Estructura plateada, aspas negras"},{"label":"Material","value":"Aspas de plástico, base metálica"},{"label":"Diámetro","value":"20\" (50.8 cm)"},{"label":"Potencia","value":"95 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Control remoto, timer, oscilante e inclinable, altura ajustable hasta 1.60 m"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-FH2012';

-- KJH-FH1212: Ventilador de pie Kanji 20" 95W con timer (fuente: Kanji oficial, Fravega, Casa del Audio)
update products set
  description = 'Ventilador de pie de 20 pulgadas con 3 velocidades y timer programable, pensado para climatizar ambientes medianos. Permite usarse en modo giratorio para cubrir mas superficie o fijarlo en una sola direccion segun la necesidad. Su altura es regulable hasta 1.60 m para adaptarse a distintos espacios.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-FH1212"},{"label":"Color","value":"Estructura blanca, aspas negras"},{"label":"Material","value":"Aspas de plástico"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"95 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Dimensiones","value":"58 x 57 x 18.5 cm"},{"label":"Función","value":"Timer programable, altura ajustable hasta 1.60 m, giratorio o fijo"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-FH1212';

-- V9: Ventilador de pie Crivel 20" 90W 3 aspas metálicas (fuente: Megatone, Fravega, Petenatti Hogar, Novogar)
update products set
  description = 'Ventilador de pie con 3 aspas de metal tipo helice y base circular tambien metalica, que le da estabilidad y un funcionamiento silencioso. Cuenta con 3 velocidades y oscilacion automatica, ademas de altura regulable hasta 1.70 metros. Fabricacion nacional con rejilla de proteccion de metal.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"V9"},{"label":"Material","value":"Aspas de metal, base metálica"},{"label":"Diámetro","value":"20\" (50.8 cm)"},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante, altura ajustable hasta 1.70 m, rejilla de protección metálica"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V9';

-- 575: Cocina mini Sol Real 4 H. puerta de acero (fuente: solreal.com oficial, M&A Equipamientos, Gastro Market)
update products set
  description = 'Cocina mini de uso semiindustrial con 4 hornallas y horno esmaltado con piso de tejuelas refractarias, pensada para locales gastronomicos o cocinas con espacio reducido que necesitan buena potencia de coccion. Su gabinete de acero inoxidable y la puerta de acero le dan resistencia para uso frecuente, mientras que la aislacion de lana mineral ayuda a mantener la temperatura del horno. Incluye 3 rejillas de hierro fundido y valvula de seguridad.',
  specs = '[{"label":"Marca","value":"Sol Real"},{"label":"Modelo","value":"575"},{"label":"Material","value":"Gabinete de acero inoxidable"},{"label":"Peso","value":"40.2 kg"},{"label":"Potencia térmica","value":"20.000 kcal/h"},{"label":"Hornallas","value":"4, quemadores de aluminio fundido"},{"label":"Accesorios incluidos","value":"3 rejillas de hierro fundido de 43 x 44 cm"},{"label":"Función","value":"Horno esmaltado con piso de tejuelas refractarias, puerta de acero, aislación de lana mineral, válvula de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '575';

-- 575P: Cocina mini Sol Real 4 H. puerta de acero y parrilla (fuente: solreal.com oficial, M&A Equipamientos)
update products set
  description = 'Cocina mini de uso semiindustrial con 4 hornallas, horno esmaltado y parrilla incorporada para asar directamente sobre el fuego. Pensada para locales gastronomicos o cocinas con espacio reducido que necesitan versatilidad entre coccion en hornallas, horno y parrilla. Gabinete de acero inoxidable, puerta de acero y aislacion de lana mineral para uso frecuente.',
  specs = '[{"label":"Marca","value":"Sol Real"},{"label":"Modelo","value":"575P"},{"label":"Material","value":"Gabinete de acero inoxidable"},{"label":"Peso","value":"40.2 kg"},{"label":"Potencia térmica","value":"20.000 kcal/h"},{"label":"Hornallas","value":"4, quemadores de aluminio fundido"},{"label":"Accesorios incluidos","value":"3 rejillas de hierro fundido de 43 x 44 cm, parrilla"},{"label":"Función","value":"Horno esmaltado con piso de tejuelas refractarias, puerta de acero, aislación de lana mineral, válvula de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '575P';

-- 575V: Cocina mini Sol Real 4 H. puerta de vidrio (fuente: solreal.com oficial, M&A Equipamientos)
update products set
  description = 'Cocina mini de uso semiindustrial con 4 hornallas y horno esmaltado con piso de tejuelas refractarias, con puerta de vidrio templado que permite controlar la coccion sin abrirla. Pensada para locales gastronomicos o cocinas con espacio reducido que necesitan buena potencia de coccion. Gabinete de acero inoxidable, aislacion de lana mineral y valvula de seguridad en el horno.',
  specs = '[{"label":"Marca","value":"Sol Real"},{"label":"Modelo","value":"575V"},{"label":"Material","value":"Gabinete de acero inoxidable, puerta de vidrio templado"},{"label":"Peso","value":"40.2 kg"},{"label":"Potencia térmica","value":"20.000 kcal/h"},{"label":"Hornallas","value":"4, quemadores de aluminio fundido"},{"label":"Accesorios incluidos","value":"3 rejillas de hierro fundido de 43 x 44 cm"},{"label":"Función","value":"Horno esmaltado con piso de tejuelas refractarias, aislación de lana mineral, válvula de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '575V';
