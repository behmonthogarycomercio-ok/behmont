-- Migracion 035: tanda 17 de specs/descripcion investigados (skill
-- product-specs-research). Categoria "Electrodomesticos", pool mas dificil
-- que tandas anteriores (calefones/termotanques Orbis con muchas variantes
-- de sufijo, marcas chicas). 19 productos confirmados de un pool de 31
-- candidatos investigados (menor tasa de confirmacion por la dificultad
-- del pool restante).
--
-- Excluidos de esta tanda (12, reportados aparte, no tocados por este SQL):
-- 315KHOE, 315KNOE, 313KNON (Orbis calefones: la familia Orbis 31XK*O tiene
-- variantes reales por tipo de gas -natural/envasado- e ignicion, y no se
-- encontro fuente que confirme exactamente esos codigos con sufijo E/N
-- correcto; riesgo real de vender el tipo de gas equivocado) - 08Q2LO,
-- 05Q2LO (Orbis termotanques: ya excluidos en sesion anterior, codigo no
-- localizado, solo existen 08Q2IO/05Q2IO similares pero no identicos) -
-- 0080ROM, 0050ROM (Orbis termotanques a gas: no se encontro el sufijo ROM
-- exacto, solo variantes GO/GON/NO) - 9623 (BGH aspiradora: no se encontro
-- ese numero de modelo) - V33SOLEI (Solei ventilador industrial 200W: sin
-- fuente confiable) - SPL-005 (Fineschi exprimidor: sin fuente confiable
-- para ese codigo especifico) - 120M16 (Likon microondas: no coincide con
-- ningun modelo real de la marca, solo existen LI20M-S20/LI20D) -
-- 7,8965E+12-2 (Brinox bateria 7 piezas Terracota: la linea Masala solo
-- viene en Negro/Cereza y la Smart Plus en Gris, ningun color coincide con
-- "Terracota").

-- 315KNON: Calefón Orbis 14L a botonera GAS NATURAL (fuente: Orbis oficial, Brandimia, Aloise, Pardo)
update products set
  description = 'Calefon a gas natural de tiro natural con encendido directo en el quemador, sin llama piloto, pensado para el suministro de agua caliente del hogar. Cuenta con control de potencia variable segun el caudal de agua, sensor de sobretemperatura y sensor de humo que corta el equipo ante una mala evacuacion de gases.',
  specs = '[{"label":"Marca","value":"Orbis"},{"label":"Modelo","value":"315KNON"},{"label":"Dimensiones","value":"58 x 33 x 23.6 cm"},{"label":"Capacidad","value":"14 L/min"},{"label":"Función","value":"Encendido directo sin piloto, botonera, control de potencia variable, sensor de sobretemperatura, sensor de humo, filtro de agua removible"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '315KNON';

-- 1060103: Calefón eléctrico Indelplas 20L Acero Inox. (fuente: Ferretería El Molino, Previsora del Paraná, Petenatti)
update products set
  description = 'Calefon electrico de 20 litros en acero inoxidable, pensado para hogares sin conexion a gas. Incorpora un visor de nivel de agua integrado y corta la energia automaticamente si detecta falta de agua, con interruptor bipolar luminoso para mayor seguridad.',
  specs = '[{"label":"Marca","value":"Indelplas"},{"label":"Modelo","value":"D20 Max Inox"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"33 x 23 x 33 cm"},{"label":"Potencia","value":"1100 W"},{"label":"Capacidad","value":"20 L"},{"label":"Función","value":"Interruptor bipolar luminoso, corte por falta de agua, visor de nivel, cable de 1 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '1060103';

-- 5010201: Turbo Ventilador Indelplas 20" (fuente: Indelplas oficial, Otero Hogar, Rodo)
update products set
  description = 'Turboventilador apto para colocar en piso, techo o pared segun el espacio disponible, con motor bobinado de cobre de bajo consumo. Sus 5 aspas de 20 pulgadas y rejillas resistentes a los golpes ofrecen buen caudal de aire en 3 velocidades con funcionamiento silencioso.',
  specs = '[{"label":"Marca","value":"Indelplas"},{"label":"Modelo","value":"IV20"},{"label":"Diámetro","value":"20\""},{"label":"Potencia","value":"75 W"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Apto piso, techo y pared, cabezal con inclinación vertical, ruido bajo 65 dB"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '5010201';

-- DAVC90-20L: Aspiradora Daewoo Polvo y Agua 20L 1000W (fuente: Fravega, Megatone, Daewoo Herramientas)
update products set
  description = 'Aspiradora de tacho para polvo y liquidos con 20 litros de capacidad, pensada para limpiezas domesticas o de taller. Su diseno compacto con ruedas facilita el traslado, e incluye funcion de soplado ademas de accesorios para distintas superficies.',
  specs = '[{"label":"Marca","value":"Daewoo"},{"label":"Modelo","value":"DAVC90-20L"},{"label":"Capacidad","value":"20 L"},{"label":"Potencia","value":"1000 W"},{"label":"Función","value":"Aspira seco y húmedo, función soplado, manguera de 1.5 m x 32 mm"},{"label":"Accesorios incluidos","value":"Manguera, bolsa de polvo, filtro de espuma, boquilla para grietas, tubos de extensión"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DAVC90-20L';

-- DAVC90-15L: Aspiradora Daewoo Polvo y Agua 15L 1000W (fuente: Fravega, Megatone, Daewoo Herramientas)
update products set
  description = 'Aspiradora de tacho para polvo y liquidos con 15 litros de capacidad, pensada para limpiezas domesticas de tamano chico o mediano. Incluye cepillo multiproposito, manguera y tubos de extension, con ruedas para trasladarla facilmente.',
  specs = '[{"label":"Marca","value":"Daewoo"},{"label":"Modelo","value":"DAVC90-15L"},{"label":"Capacidad","value":"15 L"},{"label":"Potencia","value":"1000 W"},{"label":"Función","value":"Aspira seco y húmedo, manguera de 1.5 m x 32 mm"},{"label":"Accesorios incluidos","value":"Cepillo multiuso, manguera, bolsa de polvo, filtro de espuma, boquilla para grietas, tubos de extensión"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DAVC90-15L';

-- DAVC100: Aspiradora de Mano Daewoo (fuente: Garbarino, ManualsLib, Dmaker)
update products set
  description = 'Aspiradora de mano portatil pensada principalmente para el auto, con conexion a la salida de 12V. Su sistema ciclonico mantiene el filtro limpio sin perder potencia, y sirve tanto para polvo como para pequenos derrames de liquido.',
  specs = '[{"label":"Marca","value":"Daewoo"},{"label":"Modelo","value":"DAVC100"},{"label":"Voltaje","value":"DC 12V-13.6V"},{"label":"Potencia","value":"85 W"},{"label":"Capacidad","value":"380 ml"},{"label":"Función","value":"Sistema ciclónico, aspira seco y húmedo, cable de 270 cm"},{"label":"Accesorios incluidos","value":"Boquilla para grietas, bolsa"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DAVC100';

-- E4: Estufa a Cuarzo Vertical Crivel (fuente: Fravega, Megatone, Villanova)
update products set
  description = 'Estufa de cuarzo vertical con 2 velas, pensada para calefaccionar rapido un ambiente chico o mediano. Cuenta con 2 niveles de potencia y base que evita que se caiga durante el uso, con corte de seguridad automatico ante una caida.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"E4 (03064)"},{"label":"Material","value":"Frente y pantalla de aluminio"},{"label":"Dimensiones","value":"61 x 24 x 24 cm"},{"label":"Potencia","value":"600/1200 W"},{"label":"Función","value":"2 velas de cuarzo, corte de seguridad por caída, rejilla protectora"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E4';

-- WFVCRK305: Aspiradora Robot Kanji Westinghouse (fuente: Coopehogar, Fravega, Garbarino)
update products set
  description = 'Aspiradora robot 3 en 1 que barre, aspira y trapea, pensada para el mantenimiento diario de pisos sin intervencion manual. Cuenta con sensores anticaida y de obstaculos, bateria de 2000mAh con hasta 120 minutos de autonomia y modos de limpieza automatico, de bordes y por zonas.',
  specs = '[{"label":"Marca","value":"Kanji (Westinghouse)"},{"label":"Modelo","value":"WFVCRK305"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"29 x 29 x 8 cm"},{"label":"Capacidad","value":"350 ml (depósito de polvo)"},{"label":"Función","value":"3 en 1 (barre, aspira, trapea), batería 2000 mAh (120 min), succión 2000 Pa, sensores anticaída y de obstáculos"},{"label":"Accesorios incluidos","value":"2 cepillos laterales"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'WFVCRK305';

-- PE-VP2060: Ventilador de pie Peabody 20" 60W (fuente: Fravega, Megatone, La Anónima)
update products set
  description = 'Ventilador de pie de 20 pulgadas con 3 aspas plasticas, pensado para climatizar ambientes chicos o medianos. Su cabezal oscilante e inclinable y altura ajustable hasta 1.60 metros permiten adaptarlo a distintos usos, con base plastica y rejilla metalica.',
  specs = '[{"label":"Marca","value":"Peabody"},{"label":"Modelo","value":"PE-VP2060"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aspas de plástico, rejilla metálica"},{"label":"Diámetro","value":"20\""},{"label":"Peso","value":"8.07 kg"},{"label":"Potencia","value":"60 W"},{"label":"Voltaje","value":"220V"},{"label":"Velocidades","value":"3"},{"label":"Función","value":"Oscilante e inclinable, altura ajustable hasta 1.60 m"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PE-VP2060';

-- SOLEIC67: Caloventor Solei 2000W (fuente: Fravega, ICBC Mall, Megusta)
update products set
  description = 'Caloventor compacto con 2 niveles de potencia, pensado para calefaccionar ambientes chicos de forma rapida. Cuenta con termostato regulable, funcion de solo ventilacion con aire frio, luz indicadora de encendido y proteccion automatica contra sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Solei"},{"label":"Modelo","value":"13-S67"},{"label":"Voltaje","value":"240V, 50Hz"},{"label":"Potencia","value":"1000/2000 W"},{"label":"Función","value":"Termostato regulable, modo ventilación (aire frío), luz indicadora, corte de seguridad automático"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SOLEIC67';

-- 30078: Ventilador de Techo Severbon 4 Palas Negro Microtexturado (fuente: Maxihogar, Mutual Cap, Cetrogar)
update products set
  description = 'Ventilador de techo con 4 palas y tapa de motor en acero negro microtexturado, pensado para ambientes que buscan un diseno moderno y minimalista. Su motor esta montado sobre rodamientos blindados sobredimensionados que no requieren lubricacion, para un funcionamiento silencioso y duradero.',
  specs = '[{"label":"Marca","value":"Severbon"},{"label":"Modelo","value":"030078 (VTA420N)"},{"label":"Color","value":"Negro microtexturado"},{"label":"Material","value":"Palas y tapa de motor de acero"},{"label":"Diámetro","value":"1.20 m"},{"label":"Potencia","value":"80 W"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Función","value":"Motor asincrónico monofásico, rodamientos blindados sin mantenimiento"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '30078';

-- CM296DG-F: Microondas Hitachi HITPLUS 29L Digital con Grill (fuente: Fravega, Demelf, Manci Hogar)
update products set
  description = 'Microondas digital de 29 litros con grill y funcion combigrill, pensado para cocinar en cantidad con opcion de gratinado. Ofrece 10 niveles de potencia, 7 programas automaticos, coccion multietapa y express, con bandeja giratoria de vidrio y traba de seguridad para ninos.',
  specs = '[{"label":"Marca","value":"Hitachi (HitPlus)"},{"label":"Modelo","value":"CM296DG-F"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"57.9 x 46 x 36.2 cm"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"900 W microondas, 1000 W grill"},{"label":"Capacidad","value":"29 L"},{"label":"Función","value":"10 niveles de potencia, 7 programas, combigrill, cocción multietapa y express, traba infantil"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CM296DG-F';

-- AIAFE6010B: Lavarropas Codini Inverter 6kg con vapor (fuente: Codini oficial, Casa del Audio, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6 kg y tecnologia inverter BLDC de alta eficiencia energetica. Su funcion de vapor ayuda a eliminar alergenos y bacterias, ideal para ropa de bebe o pieles sensibles, con 16 programas y puerta de vidrio con bloqueo automatico.',
  specs = '[{"label":"Marca","value":"Codini"},{"label":"Modelo","value":"AIAFE6010B"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"59.5 x 44 x 85 cm"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"1500 W"},{"label":"Capacidad","value":"6 kg"},{"label":"Función","value":"Tecnología Inverter BLDC, centrifugado 1000 rpm, 16 programas, función vapor, comienzo diferido, bloqueo infantil"},{"label":"Garantía","value":"12 meses (motor 10 años)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AIAFE6010B';

-- 4052: Lavarropas semiautomático Codini Silent 10kg (fuente: Codini oficial, Fravega, Cetrogar)
update products set
  description = 'Lavarropas semiautomatico de carga superior con capacidad para 10 kg, pensado para familias numerosas. Su sistema de lavado oriental mueve la ropa desde el fondo de la cuba hacia arriba, con 6 programas de lavado y ruedas para facilitar el traslado.',
  specs = '[{"label":"Marca","value":"Codini"},{"label":"Modelo","value":"Silent 4052"},{"label":"Color","value":"Blanco"},{"label":"Material","value":"Tambor plástico"},{"label":"Dimensiones","value":"54 x 56 x 75 cm"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"10 kg"},{"label":"Tipo de carga","value":"Superior"},{"label":"Función","value":"6 programas, filtro, lavado rápido de 15 minutos, sistema oriental"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '4052';

-- 615: Lavarropas Patriot automático 6kg 500rpm (fuente: Fravega, Teleart, Hendel)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad para 6 kg, pensado para el lavado semanal de una familia chica o mediana. Ofrece 15 programas de lavado con tambor de acero inoxidable, funcion antiarrugas y comienzo diferido.',
  specs = '[{"label":"Marca","value":"Patriot"},{"label":"Modelo","value":"615"},{"label":"Color","value":"Blanco"},{"label":"Dimensiones","value":"60 x 85 x 55 cm"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"6 kg"},{"label":"Función","value":"Centrifugado 500 rpm, tambor inoxidable, 15 programas, antiarrugas, comienzo diferido, bloqueo de puerta"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '615';

-- 156515656: Aire Acondicionado Portátil Panoramic 3500W 4en1 (fuente: Fravega, Fussetti, Grupo Hogar)
update products set
  description = 'Aire acondicionado portatil 4 en 1 que enfria, calefacciona, ventila y deshumidifica, pensado para climatizar un ambiente sin necesidad de instalacion fija. Incluye control remoto, kit de salida a ventana, filtro de aire lavable y timer de 24 horas, con indicador de tanque de agua lleno.',
  specs = '[{"label":"Marca","value":"Panoramic"},{"label":"Dimensiones","value":"88 x 37 x 32 cm"},{"label":"Potencia","value":"3500 W"},{"label":"Función","value":"Frío/calor, deshumidificación, ventilación, 2 velocidades, gas refrigerante R410A, rango 15-31°C, timer 24h"},{"label":"Accesorios incluidos","value":"Control remoto, kit de salida a ventana, filtro de aire lavable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '156515656';

-- 7,8965E+12: Batería de Cocina Brinox 7 Piezas Negro (fuente: Brinox oficial, Fravega, Coppel)
update products set
  description = 'Bateria de cocina de aluminio con revestimiento antiadherente Pro-flon libre de PFOA, pensada para renovar el equipamiento de la cocina con un solo juego. Incluye 4 ollas con tapa de vidrio templado (16, 18, 20 y 22 cm), 2 sartenes (20 y 22 cm) y una lechera, con mangos de baquelita que no se calientan.',
  specs = '[{"label":"Marca","value":"Brinox"},{"label":"Modelo","value":"Masala"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Aluminio con revestimiento antiadherente Pro-flon"},{"label":"Capacidad","value":"Ollas de 1.45 a 3.7 L, sartenes de 1 y 1.25 L"},{"label":"Accesorios incluidos","value":"4 ollas con tapa, 2 sartenes, 1 lechera"},{"label":"Función","value":"Tapas de vidrio templado con salida de vapor, mangos de baquelita"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '7,8965E+12';

-- HACD01C: Batería de Cocina Hudson 5 Piezas Cerámica (fuente: Hudson oficial, Fravega, Nivel Digital)
update products set
  description = 'Bateria de cocina con revestimiento antiadherente ceramico, pensada para una coccion pareja con menos uso de aceite. Su base de diseno espiral distribuye el calor de forma rapida y uniforme, con mangos soft touch que no transmiten calor y tapas de vidrio con valvula de vapor.',
  specs = '[{"label":"Marca","value":"Hudson"},{"label":"Material","value":"Aluminio con revestimiento cerámico antiadherente"},{"label":"Accesorios incluidos","value":"2 ollas con tapa (18 y 24 cm), 1 sartén (24 cm)"},{"label":"Función","value":"Base espiral para calor uniforme, mangos soft touch, tapas de vidrio con válvula de vapor, apto lavavajillas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HACD01C';

-- V2: Ventilador de techo Crivel 4 aspas madera reversible (fuente: Tevelin, Saturno Hogar, Degaetano)
update products set
  description = 'Ventilador de techo de linea lujo con aspas de madera, pensado para combinar frescura y decoracion en el mismo equipo. Cuenta con 5 velocidades manejables por control de pared y es compatible con la instalacion de una luminaria central.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"V2 (Lujo)"},{"label":"Material","value":"Aspas de madera"},{"label":"Diámetro","value":"1.20 m"},{"label":"Potencia","value":"90 W"},{"label":"Velocidades","value":"5"},{"label":"Función","value":"Compatible con luminaria, control de pared 5 velocidades"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V2';
