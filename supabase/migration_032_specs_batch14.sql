-- Migracion 032: tanda 14 de specs/descripcion investigados (skill
-- product-specs-research). Categoria "Electrodomesticos", mayormente marcas
-- grandes con ficha oficial disponible (Liliana, Philco, Oster, Atma,
-- Samsung, BGH, Electrolux, Philips, Smartlife, Kanji, Embassy, Gamma).
-- 45 productos confirmados de un pool de 48 candidatos investigados.
-- Fuentes: sitios oficiales de fabricante (liliana.com.ar, philco.com.ar,
-- smartlife.com.ar, osterargentina.com, tienda.electrolux.com.ar,
-- kanji.com.ar) y tiendas reconocidas (Fravega, Megatone, Garbarino,
-- Cetrogar, Musimundo).
-- Solo toca specs/description de estos 45 SKU puntuales, no pisa nada mas.
--
-- Excluidos de esta tanda (3, reportados aparte, no tocados por este SQL):
-- PAS1217 (Atma plancha seca: la base "PAS1217" en nuestra base dice 1300W
-- y base de aluminio, pero las variantes reales encontradas -PAS1217PI,
-- PAS1217N, PAS1217E- son 1200W con base ceramica/antiadherente, contradice
-- los datos ya cargados) - V3 (Crivel ventilador de techo: nuestra base dice
-- "aspas madera reversible" pero el V3 real tiene aspas de metal, contradice
-- lo cargado; el modelo de madera parece ser otro -VTHM- de otra marca) -
-- AP900 (Liliana pava CRISTALMATE: no se encontro ficha propia confirmada,
-- solo datos inferidos de modelos similares AP970/AP980, no cumple la regla
-- de nunca adivinar).

-- E603: Pava Eléctrica Eiffel Acero Inox. Hervidora (fuente: Fravega, Megatone, Garbarino, Ferromar)
update products set
  description = 'Pava electrica hervidora de acero inoxidable con corte automatico y proteccion contra sobrecalentamiento, pensada para el uso diario de mate, te o cafe. Su base giratoria de 360 grados facilita el manejo y el guardacable ayuda a mantener el orden en la mesada. Terminacion resistente que acompana el uso frecuente en la cocina.',
  specs = '[{"label":"Marca","value":"Eiffel"},{"label":"Modelo","value":"E-603"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"1.8 L"},{"label":"Potencia","value":"2200 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Corte automático, protección contra sobrecalentamiento, guardacable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E603';

-- LI8445PP: Licuadora Philco 400W Jarra plastica 1.5L (fuente: Philco oficial, Fravega)
update products set
  description = 'Licuadora de jarra pensada para el uso diario, con capacidad de 1.5 litros y cuchilla de acero inoxidable para preparar jugos, licuados y batidos. Su tapa con dosificador permite agregar liquidos mientras esta en funcionamiento, y la jarra junto con las cuchillas son desmontables para facilitar la limpieza. Cuenta con 2 velocidades mas pulsador para distintos tipos de preparacion.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"LI8445PP"},{"label":"Material","value":"Jarra plástica"},{"label":"Capacidad","value":"1.5 L"},{"label":"Peso","value":"2.6 kg"},{"label":"Potencia","value":"400 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"2 velocidades + pulsador"},{"label":"Función","value":"Tritura hielo, jarra y cuchillas desmontables"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LI8445PP';

-- HR2129/00: Licuadora de mesa Philips 550W Jarra plastica 2L (fuente: Philips/Musimundo, Megatone, Torca)
update products set
  description = 'Licuadora de mesa con jarra de 2 litros pensada para preparar batidos, jugos y salsas en cantidad para toda la familia. Su cuchilla de 4 hojas ProBlend permite triturar hielo y mezclar de forma pareja, mientras que la base con patas antideslizantes le da estabilidad durante el uso. Apta para lavavajillas, excepto el cuerpo motor y las cuchillas.',
  specs = '[{"label":"Marca","value":"Philips"},{"label":"Modelo","value":"HR2129/00"},{"label":"Material","value":"Jarra plástica"},{"label":"Capacidad","value":"2 L"},{"label":"Potencia","value":"550 W"},{"label":"Velocidades","value":"2 velocidades + pulsador"},{"label":"Función","value":"Cuchilla 4 hojas ProBlend, tritura hielo, apta para mayonesa"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HR2129/00';

-- AAM780: Procesadora Liliana FULLPROSSESOR 750W (fuente: Liliana oficial, Fravega, Megatone, Cetrogar)
update products set
  description = 'Procesadora multifuncion que combina bowl procesador y jarra licuadora en un solo equipo, pensada para quienes cocinan seguido y buscan resolver varias tareas con un solo aparato. Permite batir, rallar, rebanar, licuar, picar, amasar, emulsionar y exprimir citricos gracias a sus discos y accesorios intercambiables de acero inoxidable. Base antideslizante y diseno en acero y cromado para mayor durabilidad.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AAM780 (Fullprossesor)"},{"label":"Material","value":"Acero inoxidable y cromados"},{"label":"Capacidad","value":"Bowl 1.2 L, jarra licuadora 2 L"},{"label":"Potencia","value":"750 W"},{"label":"Velocidades","value":"2 velocidades + pulsador"},{"label":"Accesorios incluidos","value":"Discos rallador/rebanador, cuchilla picadora, emulsionador, batidor doble, exprimidor de cítricos"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AAM780';

-- TEB5634LP: Ventilador de techo Philco 56" 38W con luz (fuente: Philco/Fravega, Megatone, Centrogar)
update products set
  description = 'Ventilador de techo de 56 pulgadas con luz LED regulable en intensidad y tono de color, pensado para ambientes grandes que necesitan buena circulacion de aire y una fuente de luz central. Su control remoto con display permite elegir entre 5 velocidades, modo Eco y Sleep, ademas de la funcion reversible para invierno. Incluye timer programable de hasta 12 horas.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TEB5634LP"},{"label":"Material","value":"Aspas de ABS"},{"label":"Diámetro","value":"56\" (1400 mm)"},{"label":"Peso","value":"4.6 kg"},{"label":"Potencia","value":"38 W"},{"label":"Función","value":"Luz LED 20W dimerizable (cálido/natural/frío), control remoto, 5 velocidades, función reversible, timer 12h"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TEB5634LP';

-- PHLF6510P2: Lavarropas automático Philco Predicta 6.5Kg (fuente: Philco/Fravega, Megatone, Hendel)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6.5 kg, pensado para el lavado semanal de una familia mediana. Su tambor de acero inoxidable con tecnologia Snowflake Drum cuida las prendas mientras lava, y ofrece 15 programas incluyendo un ciclo rapido de 15 minutos. Cuenta con bloqueo de proteccion infantil y control de temperatura para agua fria o caliente.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PHLF6510P2 (Predicta)"},{"label":"Color","value":"Plata"},{"label":"Dimensiones","value":"59.5 x 84.5 x 45 cm"},{"label":"Peso","value":"55 kg"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"6.5 kg"},{"label":"Función","value":"Centrifugado 1000 rpm, 15 programas, prelavado, bloqueo infantil, eficiencia energética A"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PHLF6510P2';

-- AAB101: Batidora Manual Liliana VUELTY 450W (fuente: Liliana oficial, Fravega, Coppel)
update products set
  description = 'Batidora manual con 5 velocidades y funcion turbo, pensada para el uso diario en la cocina desde mezclas livianas hasta masas mas consistentes. Sus batidores y ganchos amasadores metalicos se retiran con boton eyector, y el cuerpo recubierto en goma antideslizante facilita el agarre durante el uso prolongado.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB101 (Vuelty)"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"1.3 kg"},{"label":"Potencia","value":"450 W"},{"label":"Velocidades","value":"5 velocidades + turbo"},{"label":"Accesorios incluidos","value":"Batidores y ganchos amasadores metálicos"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AAB101';

-- PHTE100B2: Termotanque eléctrico Philco 100L (fuente: Philco oficial, Petenatti, Megatone)
update products set
  description = 'Termotanque electrico de 93 litros de capacidad neta (100 litros brutos), pensado para hogares con consumo de agua caliente medio a alto. Cuenta con aislacion termica total y resistencia esmaltada anticorrosiva para mayor vida util, ademas de valvula termostatica de seguridad. Se instala para colgar con conexion inferior y encendido electronico.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PHTE100B2"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"93 x 46 x 46 cm"},{"label":"Peso","value":"28 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1500 W"},{"label":"Capacidad","value":"100 L (93 L de recuperación)"},{"label":"Función","value":"Aislación térmica total, resistencia esmaltada anticorrosiva, válvula termostática de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PHTE100B2';

-- G2204: Aspiradora Gamma 35L 1400W polvo y líquido (fuente: Fravega, Hendel, Megachena)
update products set
  description = 'Aspiradora industrial de polvo y liquido con tanque de 35 litros, pensada para talleres, obras o limpiezas de gran volumen. Su motor de 1400W junto con el filtro HEPA le dan buena potencia de succion tanto en superficies secas como humedas. Incluye boquilla multiuso, boquilla para tapizados, 4 ruedas giratorias y 3 tubos de aspiracion.',
  specs = '[{"label":"Marca","value":"Gamma"},{"label":"Modelo","value":"G2204"},{"label":"Peso","value":"7.5 kg"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"1400 W"},{"label":"Capacidad","value":"35 L"},{"label":"Accesorios incluidos","value":"Boquilla multiuso, boquilla para tapizados, 3 tubos, 4 ruedas giratorias"},{"label":"Función","value":"Filtro HEPA, aspira seco y húmedo, cable de 1.8 m, manguera de 1.4 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'G2204';

-- ALWB15: Licuadora Liliana Whitenblack 400W 1.5L (fuente: Fravega, Pintureria Sagitario, Tidi)
update products set
  description = 'Licuadora compacta pensada para tareas basicas de licuado, ideal para preparar smoothies, salsas y sopas en el dia a dia. Cuenta con jarra plastica de 1.5 litros, cuchilla de acero inoxidable y una tapa con pico vertedor que facilita servir sin derrames. Sus 2 velocidades mas pulsador dan control segun el tipo de preparacion.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"ALWB15 (Whitenblack)"},{"label":"Material","value":"Jarra plástica, cuchilla de acero inoxidable"},{"label":"Capacidad","value":"1.5 L"},{"label":"Potencia","value":"400 W"},{"label":"Velocidades","value":"2 velocidades + pulsador"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ALWB15';

-- SAME731KKD: Microondas Samsung digital 20L interior cerámico (fuente: Samsung oficial, Fravega, Brandimia)
update products set
  description = 'Microondas de 20 litros con interior ceramico, mas facil de limpiar y resistente a marcas que el esmalte tradicional. Incluye funcion de descongelado rapido, 3 menues automaticos de coccion y modo ECO para ahorrar energia en espera. Su plato giratorio de vidrio y bloqueo de seguridad lo hacen practico para el uso diario en cualquier cocina.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"SAME731KKD (ME731K-KD)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"27.5 x 48.9 x 32 cm"},{"label":"Peso","value":"11.5 kg"},{"label":"Potencia","value":"800 W"},{"label":"Capacidad","value":"20 L"},{"label":"Función","value":"Interior cerámico, descongelado rápido, 3 menús automáticos, modo ECO, bloqueo de seguridad"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SAME731KKD';

-- VPHP2416: Ventilador de pie Liliana 24" 120W (fuente: Liliana/Fravega, Megatone, Hendel)
update products set
  description = 'Ventilador de pie de 24 pulgadas pensado para ambientes grandes, con motor de doble rodamiento blindado para un funcionamiento silencioso y prolongado. Su cabezal es oscilante y reclinable, con barral extensible hasta 1.7 metros de altura y traba de facil regulacion. Cuenta con rejilla extraible para facilitar la limpieza.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VPHP2416"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aspas de plástico"},{"label":"Diámetro","value":"24\""},{"label":"Potencia","value":"120 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante y reclinable, altura ajustable hasta 1.7 m, rejilla extraíble"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VPHP2416';

-- LM8526: Licuadora de mano Atma 600W (fuente: Atma/Fravega, Cetrogar, Mejores10)
update products set
  description = 'Licuadora de mano con motor DC silencioso de 600W, pensada para licuar, batir o picar directamente en la olla o el recipiente que se este usando. Incluye vaso picador, vaso dosificador de 500ml con tapa y accesorio para batir, todo con varilla y cuchillas de acero inoxidable. Su estructura ergonomica facilita el agarre durante el uso.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"LM8526"},{"label":"Material","value":"Varilla metálica, cuchillas de acero inoxidable"},{"label":"Capacidad","value":"Vaso de 500 ml"},{"label":"Potencia","value":"600 W"},{"label":"Velocidades","value":"2"},{"label":"Accesorios incluidos","value":"Vaso picador, vaso dosificador con tapa, accesorio para batir"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LM8526';

-- RPV400/300: Plancha con Vapor Liliana VAPORE 2000W (fuente: Liliana/Fravega, Cetrogar, Vea)
update products set
  description = 'Plancha a vapor con base de acero inoxidable que desliza suave sobre las telas, pensada para el planchado frecuente en el hogar. Permite regular la intensidad del vapor segun el tipo de tela (algodon, lino, seda, nylon) y cuenta con boton de rociador y golpe de vapor para las arrugas mas dificiles. Termostato regulable y luz indicadora de encendido.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"RPV400 (Vapore)"},{"label":"Material","value":"Base de acero inoxidable"},{"label":"Potencia","value":"2000 W"},{"label":"Función","value":"Control de intensidad de vapor, golpe de vapor, rociador, termostato regulable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'RPV400/300';

-- HR3700/05: Batidora de mano Philips 200W (fuente: Philips/Petenatti, Fravega, Megatone)
update products set
  description = 'Batidora de mano liviana y ergonomica, pensada para el amasado y batido cotidiano en la cocina. Sus varillas conicas de acero inoxidable trabajan hasta un 20% mas rapido que las tradicionales y son aptas para lavavajillas. Cuenta con boton expulsor para retirar los batidores y selector de 3 velocidades segun la preparacion.',
  specs = '[{"label":"Marca","value":"Philips"},{"label":"Modelo","value":"HR3700/05"},{"label":"Dimensiones","value":"20 x 21 x 10.5 cm"},{"label":"Peso","value":"1.1 kg"},{"label":"Potencia","value":"200 W"},{"label":"Velocidades","value":"3"},{"label":"Accesorios incluidos","value":"2 varillas cónicas de acero inoxidable"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HR3700/05';

-- SAWW65M0NHWU: Lavarropas automático Samsung 6.5Kg (fuente: Samsung oficial, Fravega, Garbarino)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6.5 kg y tambor diamante que reduce el dano en las telas gracias a sus orificios mas pequenos. Incluye lavado rapido de 29 minutos y funcion Hand Wash que simula el lavado a mano para prendas delicadas. Su control de voltaje protege el equipo ante fluctuaciones de tension entre 165V y 400V.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"SAWW65M0NHWU"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"60 x 85 x 62 cm"},{"label":"Peso","value":"57 kg"},{"label":"Capacidad","value":"6.5 kg"},{"label":"Función","value":"Centrifugado 1000 rpm, tambor diamante, lavado rápido 29 min, función Hand Wash, control de voltaje"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SAWW65M0NHWU';

-- CFP2218E: Caloventor Philco 2000W (fuente: Philco/Fravega, Cetrogar, Vea)
update products set
  description = 'Caloventor vertical y compacto pensado para calefaccionar ambientes chicos y medianos sin ocupar demasiado espacio. Cuenta con 2 niveles de calefaccion y 1 de ventilacion, seleccionables mediante perillas, y control automatico de temperatura por termostato. Incluye disyuntor de seguridad que corta el equipo ante un sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"CFP2218E"},{"label":"Dimensiones","value":"26.5 x 23 x 14 cm"},{"label":"Potencia","value":"2000 W"},{"label":"Función","value":"2 niveles de calefacción + 1 de ventilación, termostato, corte de seguridad por sobrecalentamiento"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CFP2218E';

-- 3610: Batidora de mano y pedestal Oster 250W (fuente: Oster oficial, Megusta, Soytechno)
update products set
  description = 'Batidora 2 en 1 que se puede usar de pie sobre su pedestal, con bowl giratorio automatico de 3.7 litros que mezcla sin necesidad de mover la batidora, o separar el cabezal para usarla de mano. Sus 6 velocidades mas funcion turbo permiten mezclar el doble de rapido y de forma pareja. Incluye batidores y ganchos amasadores de acero inoxidable resistentes al lavavajillas.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"3610 (FPSTHS3610)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"25 x 34 x 28 cm"},{"label":"Potencia","value":"250 W"},{"label":"Capacidad","value":"Bowl de 3.7 L"},{"label":"Velocidades","value":"6 velocidades + turbo"},{"label":"Accesorios incluidos","value":"Batidores y ganchos amasadores de acero inoxidable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '3610';

-- AH200: Minipimer Liliana SLIM 450W (fuente: Liliana/Megatone, Fravega, Massive Hogar)
update products set
  description = 'Minipimer liviano pensado para preparar salsas, pures, sopas y licuados directamente en la olla. Incluye vaso medidor de 900ml y varilla procesadora y emulsionadora de plastico con hoja de acero inoxidable, con 2 velocidades para distintos tipos de preparacion. No apto para picar hielo.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AH200 (Slim)"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Varilla plástica, hoja de acero inoxidable"},{"label":"Capacidad","value":"Vaso de 900 ml"},{"label":"Potencia","value":"450 W"},{"label":"Voltaje","value":"220-240V"},{"label":"Velocidades","value":"2"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AH200';

-- VTHM310: Ventilador de techo Liliana 80W madera reversible (fuente: Liliana, Fravega, Coto Digital)
update products set
  description = 'Ventilador de techo con 4 aspas reversibles de madera en tonos haya y wengue, pensado para combinar frescura y decoracion en el mismo equipo. Su funcion reversible permite invertir el giro segun la epoca del ano, distribuyendo el aire frio en verano y ayudando a recircular el calor en invierno. Incluye porta luminaria para colocar una lampara central.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VTHM310"},{"label":"Material","value":"Aspas de madera (haya/wengué)"},{"label":"Diámetro","value":"1.20 m (48\")"},{"label":"Voltaje","value":"220-240V"},{"label":"Potencia","value":"80 W"},{"label":"Velocidades","value":"5"},{"label":"Función","value":"Aspas reversibles, regulador de pared, porta luminaria (2x40W)"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VTHM310';

-- VPP2019N: Ventilador de pie Philco 20" 85W (fuente: Philco/Jumbo, Fravega, Cetrogar)
update products set
  description = 'Ventilador de pie de 20 pulgadas con cabezal reclinable, pensado para climatizar ambientes medianos de forma silenciosa. Sus 5 aspas de polipropileno y motor de 85W ofrecen un buen caudal de aire en 3 velocidades distintas, ideal para el uso diario en el hogar.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"VPP2019N"},{"label":"Material","value":"Aspas de polipropileno"},{"label":"Diámetro","value":"20\""},{"label":"Dimensiones","value":"136 x 52 x 30 cm"},{"label":"Peso","value":"7 kg"},{"label":"Potencia","value":"85 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Cabezal reclinable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VPP2019N';

-- B120M16: Microondas BGH mecánico 20L (fuente: BGH/Garbarino, Fravega, Habitar)
update products set
  description = 'Microondas mecanico de 20 litros con control por perillas, pensado para quienes buscan un equipo simple y directo de usar. Ofrece 6 niveles de potencia, 1 nivel de descongelamiento por tiempo y senal sonora de fin de coccion. Incluye plato giratorio de vidrio de 245mm de diametro.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B120M16 (Quick Chef)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"31.2 x 45.1 x 25.7 cm"},{"label":"Peso","value":"10.2 kg"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"700 W (entrada 1150 W)"},{"label":"Capacidad","value":"20 L"},{"label":"Función","value":"Control mecánico, 6 niveles de potencia, descongelamiento por tiempo, plato giratorio"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B120M16';

-- AL300: Licuadora Liliana BLENDY 600W (fuente: Liliana oficial, Fravega, Garbarino)
update products set
  description = 'Licuadora de jarra pensada para el uso diario, con capacidad de 1.5 litros y cuchilla de acero inoxidable capaz de triturar hielo. Su tapa incorpora una abertura para agregar ingredientes mientras esta en funcionamiento, y sus 2 velocidades permiten adaptarse a distintas preparaciones.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AL300 (Blendy)"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Jarra plástica, cuchilla de acero inoxidable"},{"label":"Capacidad","value":"1.5 L"},{"label":"Potencia","value":"600 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"2"},{"label":"Función","value":"Tritura hielo"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AL300';

-- VP21R: Ventilador de pie Electrolux 21" 95W con ionizador (fuente: Electrolux oficial, Fravega, Cetrogar)
update products set
  description = 'Ventilador de pie de 21 pulgadas con funcion de ionizacion, pensado para ayudar a purificar el aire mientras climatiza el ambiente. Cuenta con control remoto y timer para manejarlo con comodidad, ademas de cabezal oscilante e inclinable y base redonda para mayor estabilidad.',
  specs = '[{"label":"Marca","value":"Electrolux"},{"label":"Modelo","value":"VP21R"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Aspas de plástico, rejilla metálica"},{"label":"Diámetro","value":"21\""},{"label":"Peso","value":"7.5 kg"},{"label":"Potencia","value":"95 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Ionizador, control remoto, timer, oscilante e inclinable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VP21R';

-- PTC617: Caloventor Liliana FORZAHOT oscilante 750/1500W (fuente: Liliana oficial, Fravega, Musimundo)
update products set
  description = 'Caloventor oscilante con placa ceramica PTC, pensado para calentar ambientes chicos de forma rapida y segura. Ofrece 2 niveles de potencia para ajustar segun la necesidad y termostato regulable, ademas de corte de seguridad automatico ante caidas o sobrecalentamiento. No consume oxigeno del ambiente.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"PTC617 (ForzaHot)"},{"label":"Color","value":"Blanco/Gris"},{"label":"Dimensiones","value":"17 x 26 x 16 cm"},{"label":"Peso","value":"1.5 kg"},{"label":"Voltaje","value":"220-240V"},{"label":"Potencia","value":"750/1500 W"},{"label":"Función","value":"Oscilante, termostato regulable, corte de seguridad por caída y sobrecalentamiento"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PTC617';

-- AH730: Minipimer Liliana SUPERMIX 800W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Minipimer de mayor potencia pensado para quienes cocinan con frecuencia, con frente de acero inoxidable y regulador electronico para un control preciso de la velocidad. Incluye vaso medidor de 900cc, accesorio especial para pure y batidor whisk, todo en acero inoxidable, ademas de la varilla licuadora y emulsionadora.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AH730 (Supermix)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"Vaso de 900 cc"},{"label":"Potencia","value":"800 W"},{"label":"Velocidades","value":"2"},{"label":"Accesorios incluidos","value":"Accesorio para puré, batidor whisk, varilla licuadora y emulsionadora"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AH730';

-- EM-7018: Ventilador de techo Embassy 42" 70W con luz (fuente: Fravega, Coppel, Coluccie Equipamiento)
update products set
  description = 'Ventilador de techo con 3 aspas de metal esmaltadas, pensado para habitaciones de tamano medio a grande que necesitan buena circulacion de aire junto con iluminacion. Incorpora luz LED de 18W y funciona con operacion manual en 3 velocidades.',
  specs = '[{"label":"Marca","value":"Embassy"},{"label":"Modelo","value":"EM-7018"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Aspas de metal"},{"label":"Diámetro","value":"1.40 m (56\")"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"70 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Luz LED 18W incorporada"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'EM-7018';

-- AP980/AP981: Pava Eléctrica Liliana IRONMATE acero inox. (fuente: Photostore, Manualslib, Tecnoprices)
update products set
  description = 'Pava electrica digital de acero inoxidable que permite elegir la temperatura exacta del agua (40, 60, 70, 80, 90 o 100 grados) y mantenerla mientras el equipo esta encendido, ideal para distintos tipos de infusiones. Cuenta con base giratoria de 360 grados, apagado automatico, filtro incluido y visor traslucido de nivel de agua.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AP980 (Ironmate)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"1.7 L"},{"label":"Potencia","value":"2200 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Selector digital de temperatura (40-100°C), base giratoria 360°, apagado automático, filtro, visor de nivel"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AP980/AP981';

-- SL-SM0208F: Licuadora de mano Smartlife 800W (fuente: Falabella, Musimundo, Facebook Belen Instalaciones)
update products set
  description = 'Licuadora de mano de alta potencia con regulador y funcion pulso, pensada para quienes buscan versatilidad en la cocina. Incluye vaso medidor de 1 litro con tapa, batidor, bowl picador de 600ml, bowl procesador, 3 discos de corte, emulsionador y espatula, todo en un mismo set.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-SM0208F"},{"label":"Color","value":"Negro y plata"},{"label":"Material","value":"Varilla metálica"},{"label":"Dimensiones","value":"27.5 x 33.5 cm"},{"label":"Potencia","value":"800 W"},{"label":"Función","value":"Regulador de potencia + pulso"},{"label":"Accesorios incluidos","value":"Vaso medidor 1L, batidor, bowl picador 600ml, bowl procesador, 3 discos, emulsionador, espátula"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-SM0208F';

-- PE0821AP: Pava eléctrica Atma hervidora 1.7L (fuente: Atma/Megatone, Fravega, Petenatti Hogar)
update products set
  description = 'Pava electrica hervidora de uso diario con corte automatico al hervir y tanque transparente para controlar el nivel de agua de un vistazo. Incorpora filtro de doble accion, conector giratorio de 360 grados y guardacable para un uso mas practico y ordenado.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"PE0821AP"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Plástico, placa calefactora de acero inoxidable"},{"label":"Dimensiones","value":"23 x 23 x 17 cm"},{"label":"Peso","value":"0.85 kg"},{"label":"Capacidad","value":"1.7 L"},{"label":"Potencia","value":"2200 W"},{"label":"Función","value":"Corte automático, filtro doble acción, conector 360°, guardacable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PE0821AP';

-- AE928: Exprimidor de Cítricos Liliana SUPERJUG acero inox. (fuente: Liliana oficial, Fravega, Cetrogar)
update products set
  description = 'Exprimidor de citricos electrico de diseno cilindrico en acero inoxidable, pensado para exprimir naranjas, limones y pomelos con comodidad. Su pico vertedor tiene doble funcion: abierto para servir directo al vaso o cerrado para almacenar el jugo. Incluye doble cono para distintos tamanos de citricos y se desarma facilmente para limpiar.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AE928 (Superjug)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Potencia","value":"85 W"},{"label":"Función","value":"Pico vertedor doble función, filtro separador de pulpa, base antideslizante, doble cono desmontable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AE928';

-- CFH400: Caloventor Liliana MINISOL 1000/2000W (fuente: Liliana/Fravega, Chemesweb, Overhard)
update products set
  description = 'Caloventor ultraliviano y compacto pensado para calefaccionar ambientes chicos sin ocupar mucho espacio. Cuenta con 2 intensidades de calor (1000 y 2000W) y modo ventilacion, con termostato regulable y motor silencioso. Incluye corte de seguridad por sobrecalentamiento y no consume oxigeno del ambiente.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"CFH400 (Minisol)"},{"label":"Dimensiones","value":"23 x 26 x 14 cm"},{"label":"Potencia","value":"1000/2000 W"},{"label":"Función","value":"Termostato regulable, modo ventilación, corte por sobrecalentamiento"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CFH400';

-- BLL15: Licuadora de mesa Electrolux 500W 2L (fuente: Electrolux oficial, Fravega, Megatone)
update products set
  description = 'Licuadora de mesa con jarra plastica de 2 litros, pensada para preparar batidos, jugos y salsas para toda la familia. Cuenta con cuchilla de acero inoxidable, base antideslizante con guardacable, y 2 velocidades mas funcion pulso para distintas texturas.',
  specs = '[{"label":"Marca","value":"Electrolux"},{"label":"Modelo","value":"BLL15 (Efficient)"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Jarra plástica, cuchilla de acero inoxidable"},{"label":"Dimensiones","value":"41 x 23 x 18 cm"},{"label":"Peso","value":"1.5 kg"},{"label":"Capacidad","value":"2 L"},{"label":"Potencia","value":"500 W"},{"label":"Velocidades","value":"2 velocidades + pulso"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BLL15';

-- AM790: Procesadora Liliana FULLPROS 1000W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Procesadora multifuncion de alta potencia que combina bowl procesador de 1.2 litros y jarra licuadora de 1.75 litros con tapa hermetica para agregar ingredientes durante el uso. Permite batir, cortar en juliana, rallar, rebanar, licuar, picar, amasar, emulsionar y exprimir citricos, con regulador electronico de potencia y base antideslizante.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AM790 (Fullpros)"},{"label":"Material","value":"Acero inoxidable y cromados"},{"label":"Capacidad","value":"Vaso 1.2 L, jarra licuadora 1.75 L"},{"label":"Potencia","value":"1000 W"},{"label":"Velocidades","value":"4 (incluye pulsador/turbo)"},{"label":"Accesorios incluidos","value":"Disco rallador/rebanador, doble batidor, exprimidor de cítricos"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AM790';

-- MR1720N: Microondas Atma mecánico 20L (fuente: Atma/Fravega, Portahogar, Massei Hogar)
update products set
  description = 'Microondas de 20 litros con panel de control mecanico rotativo, pensado para quienes buscan un manejo simple y directo. Incluye 8 programas de coccion, descongelado automatico, timer con reloj y bloqueo de seguridad para ninos. Su ventana en la puerta permite controlar la coccion sin interrumpirla.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"MR1720N"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"25.8 x 44 x 34.5 cm"},{"label":"Potencia","value":"700 W"},{"label":"Capacidad","value":"20 L"},{"label":"Función","value":"Control mecánico, 8 programas, descongelado automático, timer, bloqueo infantil, bandeja giratoria"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MR1720N';

-- AB100: Batidora Manual Liliana OPTIBAT 350W (fuente: Liliana oficial, Fravega, Habitar)
update products set
  description = 'Batidora manual pensada para el uso diario en la cocina, con 3 velocidades mas boton pulsador y funcion turbo. Incluye 2 batidores metalicos con boton eyector para retirarlos facilmente despues de usar.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB100 (Optibat)"},{"label":"Color","value":"Blanco"},{"label":"Potencia","value":"350 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3 velocidades + pulsador + turbo"},{"label":"Accesorios incluidos","value":"2 batidores metálicos"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AB100';

-- AP165: Pava Eléctrica Liliana MATERA temperatura prefijada 85°C (fuente: Liliana oficial, Fravega, Somosrex)
update products set
  description = 'Pava electrica pensada especificamente para preparar mate, con temperatura fija de 85 grados que evita quemar la yerba. Cuenta con doble visor traslucido de nivel de agua, luz indicadora de funcionamiento, base giratoria antideslizante de 360 grados y corte automatico de seguridad.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AP165 (Matera)"},{"label":"Material","value":"Plástico"},{"label":"Capacidad","value":"1.7 L"},{"label":"Potencia","value":"2000 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Temperatura fija 85°C, corte automático, base giratoria 360°, guardacable, filtro"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AP165';

-- AS8913PI: Aspiradora Atma con bolsa 1500W (fuente: Atma/Fravega, Megatone, Coppel)
update products set
  description = 'Aspiradora trineo con bolsa de tela lavable, pensada para la limpieza general del hogar. Incluye regulador de caudal de aire en el mango, cepillo con cerdas ajustables e indicador de bolsa llena para saber cuando reemplazarla. Su cable se enrolla automaticamente para guardarla con comodidad.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"AS8913PI"},{"label":"Dimensiones","value":"27.2 x 34.2 x 22.2 cm"},{"label":"Peso","value":"3.3 kg"},{"label":"Potencia","value":"1500 W"},{"label":"Capacidad","value":"1.5 L"},{"label":"Función","value":"Bolsa de tela lavable, enrollacable, regulador de aire, indicador de bolsa llena"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AS8913PI';

-- SL-EK1714B: Pava eléctrica Smartlife 1.7L con regulador (fuente: Smartlife oficial, Fravega, Cetrogar)
update products set
  description = 'Pava electrica con regulador de temperatura y corte especial para mate, pensada para quienes quieren controlar con precision el punto de hervor del agua. Incluye medidor de agua transparente, base giratoria de 360 grados, guardacable y filtro removible, con 2 anos de garantia oficial.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-EK1714B"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Plástico"},{"label":"Capacidad","value":"1.7 L"},{"label":"Potencia","value":"1850 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Regulador de temperatura, corte mate, filtro removible, base giratoria 360°"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-EK1714B';

-- VPRN18: Ventilador de pie Liliana 18" orbital (fuente: Liliana oficial, Saturno Hogar, Novogar)
update products set
  description = 'Ventilador de pie con sistema orbital, que mueve el cabezal de forma eliptica para distribuir la brisa tanto horizontal como verticalmente. Su vara telescopica metalica permite ajustar la altura hasta 1.70 metros, y cuenta con rejilla de metal y funcion repelente para colocar pastillas repelentes de insectos.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VPRN18"},{"label":"Material","value":"Aspas de plástico, rejilla de metal"},{"label":"Diámetro","value":"18\""},{"label":"Dimensiones","value":"52.4 x 16 x 74.6 cm"},{"label":"Potencia","value":"75 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Sistema orbital, altura ajustable hasta 1.70 m, repeler (pastillas repelentes)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VPRN18';

-- 2600: Batidora de mano Oster 300W (fuente: Oster oficial, Megatone, Casa del Audio)
update products set
  description = 'Batidora de mano con diseno contemporaneo y funcion turbo para lograr mezclas parejas y consistentes. Incluye compartimiento para guardar los batidores y ganchos amasadores, y un sistema de seguridad que los bloquea al insertarlos. Su boton eyector facilita el cambio y la limpieza de los accesorios.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"2600"},{"label":"Color","value":"Negro"},{"label":"Potencia","value":"300 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"5 velocidades + turbo"},{"label":"Accesorios incluidos","value":"Batidores y ganchos amasadores, compartimiento de guardado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '2600';

-- SL-HM1035: Batidora de mano Smartlife 300W (fuente: Smartlife oficial, Fravega, Megatone)
update products set
  description = 'Batidora de mano versatil, apta tanto para mezclas livianas como para masas mas pesadas, con 5 velocidades mas funcion turbo. Sus batidores y ganchos amasadores de acero inoxidable son aptos para lavavajillas, facilitando la limpieza despues de cada uso.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-HM1035"},{"label":"Potencia","value":"300 W"},{"label":"Velocidades","value":"5 velocidades + turbo"},{"label":"Accesorios incluidos","value":"Batidores y ganchos amasadores de acero inoxidable"},{"label":"Garantía","value":"24 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-HM1035';

-- KJH-PE15001S: Pava eléctrica hervidora Kanji 1.8L acero inox. (fuente: Kanji oficial, Fravega, Megatone, Garbarino)
update products set
  description = 'Pava electrica hervidora de acero inoxidable pensada para el uso diario, con apagado automatico y luz indicadora de funcionamiento. Su base giratoria de 360 grados facilita el manejo tanto para zurdos como para diestros.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-PE15001S"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"23 x 22 x 17 cm"},{"label":"Capacidad","value":"1.8 L"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"Apagado automático, luz indicadora, base giratoria 360°"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-PE15001S';

-- AM740: Multiprocesadora Liliana MEGAPROS 750W (fuente: Liliana/Fravega, Megatone, Garbarino)
update products set
  description = 'Multiprocesadora con licuadora incorporada, pensada para resolver varias tareas de cocina con un solo equipo. Su jarra licuadora de 1.75 litros tiene tapa hermetica para agregar ingredientes en funcionamiento, y el vaso procesador de 1.2 litros permite rallar, rebanar, cortar en juliana, picar, amasar y emulsionar con discos intercambiables de acero inoxidable.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AM740 (Megapros)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"20.2 x 34.4 x 35 cm"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"750 W"},{"label":"Capacidad","value":"Vaso 1.2 L, jarra licuadora 1.75 L"},{"label":"Velocidades","value":"2 velocidades + pulsador"},{"label":"Función","value":"Traba de seguridad, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AM740';

-- AM469: Procesadora Liliana WONDERPROS 800W 9en1 (fuente: Liliana/Fravega, Megatone, Hendel)
update products set
  description = 'Procesadora de 9 funciones en un diseno compacto de acero inoxidable y negro, pensada para picar, amasar, rallar, rebanar, cortar en cubos, licuar, batir y hacer pure con un solo equipo. Su regulador electronico de potencia permite ajustar la velocidad segun la preparacion, e incluye discos y accesorios intercambiables.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AM469 (Wonderpros)"},{"label":"Color","value":"Negro con frente acero inoxidable"},{"label":"Capacidad","value":"Bowl 2 L, vaso medidor 900 cc"},{"label":"Potencia","value":"800 W"},{"label":"Accesorios incluidos","value":"Discos para rallar/rebanar, batidor metálico, accesorio para puré, varilla licuadora y emulsionadora"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AM469';
