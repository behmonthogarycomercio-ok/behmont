-- Migracion 033: tanda 15 de specs/descripcion investigados (skill
-- product-specs-research). Categoria "Electrodomesticos", mismo criterio
-- que la tanda 14 (priorizar marcas con ficha oficial: Liliana, Philco,
-- Samsung, BGH, Drean, Electrolux, Oster, Smartlife, Kanji, Crivel,
-- Tramontina, Everest/Axel). 43 productos confirmados de un pool de 44.
-- Solo toca specs/description de estos 43 SKU puntuales, no pisa nada mas.
--
-- Excluido de esta tanda (1, reportado aparte, no tocado por este SQL):
-- LBM305W (Kenwick batidora de mano: no se encontro ninguna fuente que
-- mencione esta marca+modelo, solo resultados de Kenwood -marca distinta-).

-- E601: Pava Eléctrica Eiffel Inox c/corte mate y cafe 1.7L (fuente: Megatone, Garbarino, Fravega)
update products set
  description = 'Pava electrica de acero inoxidable con corte especial para mate y cafe, pensada para quienes preparan infusiones a diferentes temperaturas. Cuenta con base giratoria de 360 grados, indicadores luminosos de encendido y proteccion contra funcionamiento sin agua.',
  specs = '[{"label":"Marca","value":"Eiffel"},{"label":"Modelo","value":"E-601"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"1.8 L"},{"label":"Potencia","value":"1850-2200 W"},{"label":"Voltaje","value":"220-240V"},{"label":"Función","value":"4 niveles de temperatura (función mate), corte automático, base giratoria 360°"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E601';

-- KJH-FH1811: Ventilador 3 en 1 Kanji 18" 90W (fuente: Kanji oficial, Fravega, Atenas Ventilación)
update products set
  description = 'Ventilador versatil que puede usarse de pared, mesa o pie, pensado para adaptarse al espacio disponible en cada ambiente. Sus 3 aspas de metal y motor de 90W ofrecen buen caudal de aire en 3 velocidades, con oscilacion de 180 grados y altura ajustable hasta 1.70 metros.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-FH1811"},{"label":"Material","value":"Aspas de metal"},{"label":"Diámetro","value":"18\""},{"label":"Dimensiones","value":"51 x 69 x 18.3 cm"},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Uso 3 en 1 (pared, mesa, pie), oscilación 180°, altura ajustable hasta 1.70 m"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-FH1811';

-- AB103: Batidora Manual Liliana SHAKE 450W (fuente: Liliana/Megatone, Fravega, Garbarino)
update products set
  description = 'Batidora manual con 5 velocidades y funcion turbo, pensada para el uso diario en la cocina. Incluye 2 batidores metalicos y 2 ganchos amasadores, ambos removibles con boton eyector para facilitar la limpieza.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB103 (Shake)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"15.2 x 20.5 x 11 cm"},{"label":"Potencia","value":"450 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"5 velocidades + turbo"},{"label":"Accesorios incluidos","value":"2 batidores y 2 ganchos amasadores metálicos"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AB103';

-- RPV201: Plancha con Vapor Liliana LIZZY 1100W (fuente: Liliana/Fravega, Megatone, Jumbo)
update products set
  description = 'Plancha a vapor con base de acero inoxidable, pensada para el planchado frecuente en el hogar. Cuenta con rociador, regulador de vapor y termostato ajustable para distintos tipos de tela (nylon, seda, algodon, lino), ademas de funcion de vapor vertical y golpe de vapor para arrugas dificiles.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"RPV201 (Lizzy)"},{"label":"Color","value":"Celeste"},{"label":"Material","value":"Base de acero inoxidable"},{"label":"Potencia","value":"1100 W"},{"label":"Voltaje","value":"220-240V"},{"label":"Función","value":"Rociador, vapor vertical, golpe de vapor, cable giratorio, termostato regulable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'RPV201';

-- PHTS050BM: Termotanque eléctrico Philco 50L (fuente: Philco/Megatone, Fravega, Aloise)
update products set
  description = 'Termotanque electrico de 44 litros de capacidad neta (50 litros brutos), pensado para hogares de consumo medio de agua caliente. Cuenta con aislacion termica total en poliuretano, tanque interno esmaltado, valvula de seguridad de sobrepresion y anodo de magnesio para prolongar su vida util. Instalacion para colgar con conexion inferior.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PHTS050BM"},{"label":"Dimensiones","value":"43 x 43 x 61 cm"},{"label":"Peso","value":"17 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1800 W"},{"label":"Capacidad","value":"50 L (44 L de recuperación)"},{"label":"Función","value":"Aislación de poliuretano, válvula de seguridad, ánodo de magnesio, control variable de temperatura"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PHTS050BM';

-- VTF20P: Turboventilador Liliana 20" 90W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Turboventilador reclinable de 20 pulgadas, pensado para usarse en piso o pared segun la necesidad del ambiente. Sus 5 aspas negras y motor de 90W ofrecen un gran caudal de aire de forma silenciosa, con base antideslizante y parrilla plastica espiralada.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VTF20P"},{"label":"Color","value":"Negro"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"90 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Cabezal reclinable, uso piso/pared, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VTF20P';

-- RPV202: Plancha a Vapor Liliana IRONPLUS 1300W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Plancha a vapor con base antiadherente de aluminio, pensada para deslizar suave sobre las telas durante el planchado diario. Cuenta con selector de temperatura para distintos tipos de tela, regulador de vapor ajustable, rociador y funcion golpe de vapor para arrugas dificiles.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"RPV202 (Ironplus)"},{"label":"Material","value":"Base de aluminio antiadherente, cuerpo plástico"},{"label":"Potencia","value":"1300 W"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"Selector de temperatura, vapor regulable, golpe de vapor, rociador, cable giratorio"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'RPV202';

-- SAMG23F3K3TAK: Microondas Samsung digital con grill 23L negro (fuente: Samsung oficial, Fravega, Megatone)
update products set
  description = 'Microondas con grill de 23 litros e interior ceramico, pensado para quienes buscan combinar coccion por microondas con gratinado en un solo equipo. Ofrece 20 modos de coccion preestablecidos, modo ECO para ahorro de energia y traba de seguridad para ninos. Su frente de vidrio negro le da una terminacion elegante.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"SAMG23F3K3TAK (MG23F3K3TAK)"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"27.5 x 48.9 x 39.2 cm"},{"label":"Potencia","value":"800 W microondas, 1050 W grill"},{"label":"Capacidad","value":"23 L"},{"label":"Función","value":"Interior cerámico, 20 modos de cocción, modo ECO, descongelamiento, timer, traba infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SAMG23F3K3TAK';

-- AMWB02: Multiprocesadora Liliana Whitenblack 650W (fuente: Liliana/Megatone, Garbarino)
update products set
  description = 'Multiprocesadora que combina bowl procesador de 1 litro y jarra licuadora de 1.5 litros, pensada para resolver varias tareas de cocina con un solo equipo. Permite licuar, rebanar, rallar, procesar, amasar y emulsionar, con doble sistema de seguridad y 3 velocidades mas pulsador.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AMWB02 (Whitenblack)"},{"label":"Dimensiones","value":"36.7 x 20.3 x 33 cm"},{"label":"Peso","value":"3.2 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"650 W"},{"label":"Capacidad","value":"Bowl 1 L, jarra licuadora 1.5 L"},{"label":"Velocidades","value":"3 velocidades + pulsador"},{"label":"Función","value":"Doble sistema de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AMWB02';

-- ACWB02: Cafetera de Filtro Liliana Whitenblack 1.5L (fuente: Fravega, Naldo, Nuevas Hogar)
update products set
  description = 'Cafetera de filtro con capacidad para 15 pocillos, pensada para preparar cafe para varias personas de forma practica. Incluye funcion mantener temperatura, filtro removible y lavable, valvula antigoteo e indicador de nivel de agua.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"ACWB02 (Whitenblack)"},{"label":"Color","value":"Negro"},{"label":"Capacidad","value":"1.5 L (15 pocillos)"},{"label":"Potencia","value":"800 W"},{"label":"Función","value":"Mantiene temperatura, filtro removible y lavable, válvula antigoteo, indicador de nivel de agua"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ACWB02';

-- TEB5634P: Ventilador de techo Philco 56" 38W con control remoto sin luz (fuente: Philco/Megatone, Fravega, Coppel)
update products set
  description = 'Ventilador de techo de 56 pulgadas sin luz, pensado para ambientes grandes que buscan buena circulacion de aire con manejo a distancia. Su control remoto con display LED permite elegir entre 5 velocidades, timer programable, funcion reversa y modo ECO de ahorro de energia.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TEB5634P"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Aspas de plástico"},{"label":"Diámetro","value":"56\" (1410 mm)"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"38-40 W"},{"label":"Velocidades","value":"5"},{"label":"Función","value":"Control remoto con display LED, timer, función reversa, modo ECO"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TEB5634P';

-- SAWW65M0NHUU: Lavarropas automático Samsung 6.5Kg plata (fuente: Samsung oficial, Garbarino, Brandimia)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6.5 kg y tambor de acero inoxidable, pensado para el lavado semanal de una familia mediana. Incluye lavado rapido de 29 minutos, regulador de temperatura y velocidad de centrifugado, ademas de proteccion ante fluctuaciones de tension electrica.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"SAWW65M0NHUU"},{"label":"Color","value":"Plata"},{"label":"Dimensiones","value":"60 x 85 x 62 cm"},{"label":"Peso","value":"57 kg"},{"label":"Capacidad","value":"6.5 kg"},{"label":"Función","value":"Centrifugado 1000 rpm, tambor inoxidable, lavado rápido 29 min, protección de voltaje, 6 programas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SAWW65M0NHUU';

-- AL600: Licuadora Liliana POWERLIC 700W jarra vidrio (fuente: Fravega, Megatone, Electrónica JCK)
update products set
  description = 'Licuadora digital con display tactil y 12 niveles de velocidad, pensada para quienes buscan mas control sobre distintas texturas y preparaciones. Su jarra de vidrio de 1.5 litros y cuchillas de acero inoxidable trituran hielo, y cuenta con timer y un programa preconfigurado para tragos.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AL600 (Powerlic)"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Jarra de vidrio"},{"label":"Capacidad","value":"1.5 L"},{"label":"Potencia","value":"700 W"},{"label":"Velocidades","value":"12 niveles + turbo, display digital táctil"},{"label":"Función","value":"Tritura hielo, timer, programa para tragos, tapa dosificadora"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AL600';

-- SL-BL1008B: Licuadora de mesa Smartlife 400W jarra vidrio (fuente: Smartlife oficial, Mercado Libre, Aloise)
update products set
  description = 'Licuadora de mesa con jarra de vidrio de 1.5 litros, pensada para preparar batidos, jugos y smoothies en el uso diario. Su cuchilla de acero inoxidable es removible para facilitar la limpieza, y la tapa dosificadora con pico vertedor permite agregar ingredientes sin parar y servir sin derrames.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-BL1008B"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Jarra de vidrio"},{"label":"Dimensiones","value":"19 x 37 x 33 cm"},{"label":"Capacidad","value":"1.5 L"},{"label":"Potencia","value":"400 W"},{"label":"Voltaje","value":"220-240V"},{"label":"Velocidades","value":"2 velocidades + pulso"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-BL1008B';

-- ATWB01: Tostadora Liliana Whitenblack (fuente: Fravega, Megatone, Garbarino)
update products set
  description = 'Tostadora de 2 rebanadas con 6 niveles de tostado, pensada para el desayuno diario. Cuenta con expulsion automatica al alcanzar el nivel deseado, boton de cancelar, bandeja recolectora de migas y paredes frias para mayor seguridad al tacto.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"ATWB01 (Whitenblack)"},{"label":"Color","value":"Blanco"},{"label":"Potencia","value":"700 W"},{"label":"Capacidad","value":"2 rebanadas"},{"label":"Función","value":"6 niveles de tostado, expulsión automática, cancelar, bandeja para migas"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ATWB01';

-- VTF10P: Turboventilador Liliana 10" 35W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Turboventilador compacto de 10 pulgadas, pensado para espacios chicos como una oficina o mesa de luz. Se puede usar apoyado en piso, mesa o pared segun la necesidad, con 2 velocidades y cabezal reclinable.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VTF10P"},{"label":"Diámetro","value":"10\""},{"label":"Dimensiones","value":"31.1 x 17.2 x 30.6 cm"},{"label":"Potencia","value":"35 W"},{"label":"Voltaje","value":"220-240V, 50Hz"},{"label":"Velocidades","value":"2"},{"label":"Función","value":"Uso piso/mesa/pared, cabezal reclinable"},{"label":"Garantía","value":"24 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VTF10P';

-- AC955: Cafetera Liliana SMARTCOFFEE 1.5L con timer (fuente: Liliana/Cetrogar, Selex Hogar, Mastronardi)
update products set
  description = 'Cafetera de filtro con display digital y timer programable, pensada para tener el cafe listo a la hora que se necesite. Su cuerpo de acero inoxidable y capacidad para 15 pocillos la hacen practica para el uso familiar diario, con filtro permanente y valvula antigoteo.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AC955 (Smartcoffee)"},{"label":"Material","value":"Acero inoxidable"},{"label":"Capacidad","value":"1.5 L (15 pocillos)"},{"label":"Potencia","value":"1000 W"},{"label":"Voltaje","value":"220-240V"},{"label":"Función","value":"Display digital, timer programable, filtro permanente, válvula antigoteo, indicador de nivel de agua"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AC955';

-- SL-SM6038WPN: Licuadora de mano Smartlife 600W vaso 700ml (fuente: Smartlife oficial, Sampietro, Cordoba Digital)
update products set
  description = 'Licuadora de mano con varilla desmontable de acero inoxidable, pensada para triturar, mezclar y procesar distintos alimentos directamente en la olla o el vaso. Incluye vaso medidor de 700ml y batidor de alambre, con 2 velocidades incluyendo funcion turbo.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-SM6038WPN"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Varilla y cuchillas de acero inoxidable"},{"label":"Peso","value":"1.15 kg"},{"label":"Capacidad","value":"Vaso de 700 ml"},{"label":"Potencia","value":"600 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"2 (incluye turbo)"},{"label":"Accesorios incluidos","value":"Vaso medidor 700 ml, batidor de alambre"},{"label":"Garantía","value":"24 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-SM6038WPN';

-- VTEP5619N: Ventilador de techo Philco 56" 85W acero galvanizado (fuente: Philco/Fravega, Garbarino, Somosrex)
update products set
  description = 'Ventilador de techo con aspas de acero galvanizado y motor 100% cobre, pensado para mayor durabilidad frente al uso continuo. Ofrece 5 velocidades y doble mecanismo de seguridad, sin luz incorporada.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"VTEP5619N"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Aspas de acero galvanizado"},{"label":"Diámetro","value":"56\" (140 cm)"},{"label":"Dimensiones","value":"25.5 x 20 x 63 cm"},{"label":"Peso","value":"6.14 kg"},{"label":"Potencia","value":"85 W"},{"label":"Velocidades","value":"5"},{"label":"Función","value":"Motor 100% cobre, doble mecanismo de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VTEP5619N';

-- BWFE06W24AR: Lavarropas automático BGH Inverter 6kg blanco (fuente: BGH oficial, Fravega, Musimundo)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6 kg y tecnologia inverter, que ajusta el motor de forma continua para lavar con menos ruido, vibraciones y consumo de energia. Ofrece 15 programas, tambor de acero inoxidable, deteccion automatica de espuma y bloqueo de teclado para ninos.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"BWFE06W24AR"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"59.5 x 85 x 44 cm"},{"label":"Capacidad","value":"6 kg"},{"label":"Función","value":"Tecnología inverter, centrifugado 1000 rpm, 15 programas, tambor inoxidable, bloqueo infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BWFE06W24AR';

-- V10: Ventilador de pared Crivel 20" 90W (fuente: Megatone, Fussetti, Novogar)
update products set
  description = 'Ventilador de pared de 20 pulgadas con aspas tipo avion para mayor rendimiento, pensado para instalarse en cocinas, comercios o ambientes donde no hay espacio en el piso. Cuenta con cabezal oscilante regulable, reja metalica y 3 velocidades.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"V10"},{"label":"Material","value":"Rejilla metálica"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"90 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante, cabezal regulable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V10';

-- VW2416: Ventilador de pared Liliana 24" 120W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Ventilador de pared de 24 pulgadas con motor reforzado y funcionamiento silencioso, pensado para ambientes grandes que necesitan buena circulacion de aire sin ocupar espacio en el piso. Su cabezal es oscilante y reclinable, con control frontal y 3 velocidades.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VW2416"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aspas de plástico, rejilla metálica"},{"label":"Diámetro","value":"24\""},{"label":"Dimensiones","value":"67.6 x 16 x 85.8 cm"},{"label":"Potencia","value":"120 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante y reclinable, control frontal"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VW2416';

-- BWFE08S24AR: Lavarropas automático BGH Inverter 8kg plata (fuente: BGH oficial, Fravega, Cetrogar)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 8 kg y tecnologia inverter de alta eficiencia energetica. Su tambor de acero inoxidable y 12 programas de lavado lo hacen apto para familias numerosas, con display LED y bloqueo de seguridad para ninos.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"BWFE08S24AR"},{"label":"Color","value":"Plata"},{"label":"Dimensiones","value":"59.5 x 85 x 51 cm"},{"label":"Peso","value":"62 kg"},{"label":"Potencia","value":"1750 W"},{"label":"Capacidad","value":"8 kg"},{"label":"Función","value":"Tecnología inverter, centrifugado 1400 rpm, 12 programas, tambor inoxidable, display LED, bloqueo infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BWFE08S24AR';

-- 91307000/7: Lavarropas Electrolux DigitalWash 6.5Kg carga superior (fuente: Bodrone, Fravega, Costa Hermanos)
update products set
  description = 'Lavarropas automatico de carga superior con capacidad para 6.5 kg, pensado para el lavado semanal de una familia mediana. Su tambor de acero inoxidable y filtro atrapa pelusas se combinan con una puerta de vidrio templado que permite ver el lavado en curso, y admite agua fria o caliente.',
  specs = '[{"label":"Marca","value":"Electrolux"},{"label":"Modelo","value":"91307000/7 (DigitalWash)"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"54 x 95.5 x 57 cm"},{"label":"Capacidad","value":"6.5 kg"},{"label":"Función","value":"Centrifugado 800 rpm, tambor inoxidable, filtro atrapa pelusas, 3 programas, puerta de vidrio templado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '91307000/7';

-- AT902: Tostadora Liliana PRETTYTOST 880W (fuente: Liliana/Fravega, Megatone, Garbarino)
update products set
  description = 'Tostadora de boca ancha para 2 rebanadas, pensada para distintos tipos de pan. Cuenta con 6 niveles de tostado, funcion de descongelar, tostado de un solo lado y expulsion automatica al terminar, ademas de paredes frias al tacto y bandeja para migas.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AT902 (Prettytost)"},{"label":"Dimensiones","value":"28 x 20 x 18 cm"},{"label":"Potencia","value":"880 W"},{"label":"Capacidad","value":"2 rebanadas"},{"label":"Función","value":"6 niveles, descongelar, tostado de un lado, expulsión automática, bandeja para migas"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AT902';

-- 4112: Plancha seca Oster 1000W base aluminio (fuente: Oster oficial, Fravega, Atenas Ventilación)
update products set
  description = 'Plancha seca con base de aluminio pulido para un deslizamiento suave sobre las telas, pensada para el planchado tradicional sin vapor. Cuenta con ajuste variable de temperatura segun el tipo de tejido e indicador luminoso que avisa cuando alcanzo la temperatura seleccionada.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"4112"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Base de aluminio pulido"},{"label":"Dimensiones","value":"25 x 13 x 11 cm"},{"label":"Potencia","value":"1000 W"},{"label":"Función","value":"Ajuste variable de temperatura, indicador luminoso, asa ergonómica"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '4112';

-- LAM-605: Lavarropas Electrolux FuzzyWash 6.5Kg carga superior (fuente: Fravega, Dagostino Torres, Petenatti Hogar)
update products set
  description = 'Lavarropas automatico de carga superior con tecnologia Fuzzy que ajusta automaticamente el agua, el consumo de energia y el tiempo de lavado segun la cantidad y tipo de ropa. Cuenta con puerta de vidrio templado, controles digitales y 6 programas de lavado.',
  specs = '[{"label":"Marca","value":"Electrolux"},{"label":"Modelo","value":"LAM-605 (FuzzyWash)"},{"label":"Dimensiones","value":"54 x 95.5 x 57 cm"},{"label":"Peso","value":"33 kg"},{"label":"Capacidad","value":"6.5 kg"},{"label":"Función","value":"Sistema Fuzzy Logic, centrifugado 800 rpm, 6 programas, controles digitales, puerta de vidrio templado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LAM-605';

-- AL100: Licuadora Liliana WHITELIC 500W jarra plástica 2L (fuente: Liliana oficial, Fravega, Cetrogar)
update products set
  description = 'Licuadora de jarra plastica pensada para el uso diario en la cocina, con cuchilla de acero inoxidable desmontable para facilitar la limpieza. Su tapa con pico vertedor y cierre de seguridad permite agregar ingredientes mientras esta en funcionamiento, con 2 velocidades mas pulsador.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AL100 (Whitelic)"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Jarra plástica, cuchilla de acero inoxidable"},{"label":"Capacidad","value":"1.5 L"},{"label":"Potencia","value":"500 W"},{"label":"Velocidades","value":"2 velocidades + pulsador"},{"label":"Función","value":"Cuchilla desmontable, tapa con cierre de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AL100';

-- AH140: Minipimer Liliana STARMIX 850W (fuente: Liliana oficial, Fravega, Megatone)
update products set
  description = 'Minipimer de mayor potencia con frente metalico, pensado para quienes cocinan seguido y buscan un equipo mas resistente. Incluye vaso medidor de 900ml y accesorio batidor, con varilla procesadora y emulsionadora de acero inoxidable en 2 velocidades.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AH140 (Starmix)"},{"label":"Material","value":"Frente metálico, varilla de acero inoxidable"},{"label":"Capacidad","value":"Vaso de 900 ml"},{"label":"Potencia","value":"850 W"},{"label":"Velocidades","value":"2"},{"label":"Accesorios incluidos","value":"Vaso medidor, batidor de acero inoxidable"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AH140';

-- LAWB01: Aspiradora Liliana Whitenblack agua y polvo 18L (fuente: Megatone, Fravega, Garbarino)
update products set
  description = 'Aspiradora de agua y polvo con tanque de 18 litros, pensada para limpiezas mas exigentes en el hogar o el taller. Cuenta con filtro HEPA lavable, funcion soplador, corte automatico al llenarse de liquido y boquilla triple funcion para alfombras, pisos duros y agua.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"LAWB01 (Whitenblack)"},{"label":"Color","value":"Negro y blanco"},{"label":"Peso","value":"3 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1200 W"},{"label":"Capacidad","value":"18 L"},{"label":"Función","value":"Filtro HEPA lavable, aspira agua y polvo, función soplador, corte automático al llenarse"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LAWB01';

-- WA80F5S4UDW: Lavarropas Samsung carga superior 8kg (fuente: Samsung oficial, Fravega, Molex)
update products set
  description = 'Lavarropas automatico de carga superior con capacidad para 8 kg, pensado para familias numerosas. Su tecnologia Wobble genera corrientes de agua multidireccionales para un lavado mas dinamico, y el filtro Magic Filter atrapa pelusa y particulas. Tapa de vidrio templado y 9 programas de lavado.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"WA80F5S4UDW"},{"label":"Dimensiones","value":"61 x 100.3 x 67 cm"},{"label":"Peso","value":"42 kg"},{"label":"Capacidad","value":"8 kg"},{"label":"Función","value":"Centrifugado 700 rpm, tecnología Wobble, Magic Filter, 9 programas, tapa de vidrio templado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'WA80F5S4UDW';

-- AM460: Procesadora Liliana MULTIMIX 700W 7en1 (fuente: Liliana/Fravega, Cetrogar, Megatone)
update products set
  description = 'Procesadora 7 en 1 con licuadora incorporada, pensada para picar, rallar, rebanar, batir, licuar, cortar y hacer pure con un solo equipo. Incluye cuchillo electrico, dos vasos picadores de distinto tamano, discos intercambiables y reversibles, y accesorio para pure.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AM460 (Multimix)"},{"label":"Color","value":"Blanco"},{"label":"Voltaje","value":"220-240V"},{"label":"Potencia","value":"700 W"},{"label":"Capacidad","value":"Vaso de 900 cm³"},{"label":"Accesorios incluidos","value":"Cuchillo eléctrico, 2 choppers, discos reversibles, batidor, accesorio para puré"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AM460';

-- VP20P: Ventilador de pie Liliana 20" 90W (fuente: Liliana oficial, Fravega, Garbarino)
update products set
  description = 'Ventilador de pie de 20 pulgadas con 5 aspas de plastico, pensado para climatizar ambientes medianos de forma silenciosa. Su cabezal oscilante y vara telescopica metalica permiten ajustar la altura hasta 1.70 metros, con base redonda para mayor estabilidad.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"VP20P"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aspas de plástico"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"90 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante, altura ajustable hasta 1.70 m, base redonda"},{"label":"Garantía","value":"2 años"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VP20P';

-- LL340: Lustraaspiradora Liliana 850W (fuente: Liliana oficial, Fravega, Tevelin)
update products set
  description = 'Lustraaspiradora 2 en 1 que aspira y lustra pisos al mismo tiempo, pensada para parquet, ceramicos, marmol o mosaico. Incluye 3 cepillos moviles y 3 panos abrillantadores para lograr mejor terminacion, con bolsa de tela lavable de 3.6 litros y ruedas giratorias para facilitar el traslado.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"LL340"},{"label":"Color","value":"Blanco"},{"label":"Potencia","value":"850 W"},{"label":"Capacidad","value":"Bolsa de tela de 3.6 L"},{"label":"Accesorios incluidos","value":"3 cepillos móviles, 3 paños abrillantadores"},{"label":"Función","value":"Transmisión directa sin correas, aspira y lustra"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LL340';

-- B120DS20I: Microondas BGH digital 20L plata (fuente: BGH oficial, Fravega, Megatone)
update products set
  description = 'Microondas digital de 20 litros con panel LED y modo ECO que reduce el consumo cuando esta en espera. Ofrece 10 programas automaticos, descongelado por peso, funcion inicio rapido y bloqueo de seguridad para ninos.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B120DS20I"},{"label":"Color","value":"Plata"},{"label":"Dimensiones","value":"25.9 x 44 x 33.7 cm"},{"label":"Peso","value":"10.2 kg"},{"label":"Potencia","value":"700 W"},{"label":"Capacidad","value":"20 L"},{"label":"Función","value":"Control digital, 10 programas, modo ECO, descongelado por peso, bloqueo infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B120DS20I';

-- B228DS20: Microondas BGH digital con grill 28L plata (fuente: BGH oficial, Fravega, Megatone)
update products set
  description = 'Microondas bifuncion de 28 litros con grill, pensado para quienes buscan combinar coccion rapida con gratinado en un solo equipo. Cuenta con plato giratorio, coccion en etapas, descongelamiento automatico y puerta espejada.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B228DS20"},{"label":"Color","value":"Plata"},{"label":"Dimensiones","value":"32.6 x 52 x 43.5 cm"},{"label":"Peso","value":"16 kg"},{"label":"Potencia","value":"900 W microondas, 1000 W grill"},{"label":"Capacidad","value":"28 L"},{"label":"Función","value":"Grill, plato giratorio, cocción en etapas, descongelamiento automático, puerta espejada"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B228DS20';

-- PIH049516: Microondas Tramontina Glass Cook digital 20L negro (fuente: Tramontina oficial, Coopehogar, Authogar)
update products set
  description = 'Microondas digital de 20 litros con controles simples e interior blanco iluminado, pensado para el uso diario en hogares chicos o medianos. Ofrece 5 niveles de potencia y programas automaticos para facilitar la coccion con un solo boton.',
  specs = '[{"label":"Marca","value":"Tramontina"},{"label":"Modelo","value":"PIH049516 (Glass Cook MCDI)"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"25.9 x 44 x 33 cm"},{"label":"Potencia","value":"1050 W"},{"label":"Capacidad","value":"20 L"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Función","value":"Control digital, 5 niveles de potencia, programas automáticos"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PIH049516';

-- C74: Caloventor de Pared Crivel CVP-15 con control remoto (fuente: Fravega, Megatone, Gasloni)
update products set
  description = 'Caloventor de pared tipo split con placa ceramica PTC, pensado para calefaccionar sin ocupar espacio en el piso. Se maneja con control remoto y timer programable hasta 7.5 horas, con 2 niveles de potencia y corte de seguridad por sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"C74 (CVP-15)"},{"label":"Dimensiones","value":"19 x 46 x 11 cm"},{"label":"Peso","value":"1.8 kg"},{"label":"Potencia","value":"1000/2000 W"},{"label":"Función","value":"Control remoto, timer hasta 7.5 h, termostato, placa cerámica PTC, corte por sobrecalentamiento"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'C74';

-- 6205: Plancha a vapor Oster 2200W base cerámica (fuente: Oster oficial, Fravega, Photostore)
update products set
  description = 'Plancha a vapor con base de ceramica con ranuras que facilitan un deslizamiento mas rapido, pensada para el planchado frecuente. Cuenta con sistema anti-goteo, funcion anti-sarro, boton de rociador para arrugas dificiles y limpieza automatica que prolonga la vida util del equipo.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"6205 (GCSTSP6205)"},{"label":"Material","value":"Base cerámica"},{"label":"Potencia","value":"2200 W"},{"label":"Función","value":"3 niveles de temperatura, anti-goteo, anti-sarro, rociador, limpieza automática, corte de seguridad"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '6205';

-- GOLDBLUE8.6: Lavarropas Drean carga superior 6kg (fuente: Drean oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga superior con capacidad para 6 kg, pensado para el lavado semanal de una familia chica o mediana. Su sistema de carga adaptativa ajusta automaticamente el agua y la energia segun la ropa detectada, y cuenta con 23 programas cortos de 30 y 45 minutos.',
  specs = '[{"label":"Marca","value":"Drean"},{"label":"Modelo","value":"Gold Blue 8.6"},{"label":"Dimensiones","value":"89 x 40 x 60 cm"},{"label":"Capacidad","value":"6 kg"},{"label":"Función","value":"Carga adaptativa, centrifugado 800 rpm, tambor inoxidable, 23 programas, autobalance"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'GOLDBLUE8.6';

-- NEXT8.14PECO: Lavarropas Drean Inverter 8kg carga frontal (fuente: Drean oficial, Fravega, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 8 kg y tecnologia inverter, pensado para familias numerosas que buscan eficiencia energetica. Su sistema ECO Inverter ahorra hasta 65% de energia y 70% de agua, con bloqueo infantil, autobalance y ciclo rapido de 30 minutos.',
  specs = '[{"label":"Marca","value":"Drean"},{"label":"Modelo","value":"Next 8.14 P Eco"},{"label":"Dimensiones","value":"85 x 60 x 55 cm"},{"label":"Peso","value":"72 kg"},{"label":"Capacidad","value":"8 kg"},{"label":"Función","value":"Tecnología Inverter, centrifugado 1400 rpm, display LED, bloqueo infantil, autobalance, ciclo rápido 30 min"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'NEXT8.14PECO';

-- AX-800INOX: Purificador de Aire Everest botonera acero inox. (fuente: Axel/Everest oficial, Fravega, Electromisiones)
update products set
  description = 'Purificador extractor de aire para cocina en acero inoxidable, pensado para instalarse sobre la cocina y renovar el aire del ambiente. Cuenta con filtro de carbon, luz incorporada y motor de 3 velocidades de extraccion, con salida de 4 pulgadas para conducto.',
  specs = '[{"label":"Marca","value":"Everest"},{"label":"Modelo","value":"AX-800"},{"label":"Color","value":"Acero inoxidable"},{"label":"Dimensiones","value":"60 x 49.5 x 14 cm"},{"label":"Peso","value":"7 kg"},{"label":"Potencia","value":"100 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Filtro de carbón, luz incorporada, salida de aire de 4\" (100mm), caudal 250 m³/h"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AX-800INOX';

-- AX-800B: Purificador de Aire Everest botonera blanco (fuente: Axel/Everest oficial, Fravega, Electromisiones)
update products set
  description = 'Purificador extractor de aire para cocina, pensado para instalarse sobre la cocina y renovar el aire del ambiente. Cuenta con filtro de carbon, luz incorporada y motor de 3 velocidades de extraccion, con salida de 4 pulgadas para conducto.',
  specs = '[{"label":"Marca","value":"Everest"},{"label":"Modelo","value":"AX-800"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"60 x 49.5 x 14 cm"},{"label":"Peso","value":"7 kg"},{"label":"Potencia","value":"100 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Filtro de carbón, luz incorporada, salida de aire de 4\" (100mm), caudal 250 m³/h"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AX-800B';
