-- Migracion 042: tanda 24 de specs/descripcion investigados (skill
-- product-specs-research). Parlantes Kioto/Panter/Pcbox/Philco/Noblex,
-- home theater Microlab, consola retro Level Up, combos gaming Xtrike Me,
-- mueble Ricchezze y tablet TCL, de la categoria "Electronica". 14
-- confirmados de 25 candidatos investigados.
--
-- Excluidos de esta tanda (11, reportados aparte, no tocados por este SQL):
-- MD50X750, 14603515, DK65X655 (Noblex Smart TV: el SKU no coincide con
-- ningun modelo real de Noblex encontrado, solo modelos similares con
-- otros digitos finales) - SS26 (Blackpoint: no existe ese modelo en el
-- catalogo, solo modelos similares S22/S32/S36) - STV140 (Dielfe: fuentes
-- contradictorias sobre a que producto corresponde el codigo) -
-- KJ-CAMIP1MX2 (Kanji: nuestra base dice "2 antenas" pero todas las
-- fuentes confirman 3 antenas, contradice el dato ya cargado) - 1212
-- (Noblex: SKU demasiado generico, sin match) - X-1000 (Monster: todas las
-- fuentes hablan del modelo "X-1100", no "X-1000") - 19500 (AOC/Philips:
-- existen varios modelos de 50" 4K con specs distintas, sin poder
-- confirmar cual exacto) - KITHIT (Hikvision: existen kits similares con
-- resoluciones distintas 720p/1080p/4K, sin poder confirmar la variante
-- exacta) - S145-14AST (Lenovo: nuestra base dice procesador "N4020" pero
-- todas las fuentes confirman que ese modelo lleva AMD A4-9125, contradice
-- el dato ya cargado).

-- TW1000: Parlante portátil Kioto (fuente: Fravega, ICBC Mall, Alperin, Bat Computers)
update products set
  description = 'Parlante portatil tipo torre con dos parlantes de 8 pulgadas, pensado para fiestas y reuniones al aire libre. Incluye microfono y control remoto, con tecnologia TWS para emparejar con otro equipo igual y lograr sonido estereo.',
  specs = '[{"label":"Marca","value":"Kioto"},{"label":"Modelo","value":"TW1000 PRO"},{"label":"Peso","value":"7 kg"},{"label":"Dimensiones","value":"77 x 32 x 29 cm"},{"label":"Potencia","value":"25 W RMS"},{"label":"Función","value":"2 parlantes de 8\", Bluetooth con TWS, USB, SD, radio FM, ecualizador, entrada micrófono, control remoto"},{"label":"Batería","value":"Autonomía ~4h, carga rápida en 10 min"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TW1000';

-- M710U51: Home Theater Microlab 5.1 (fuente: Photostore, foros 3DGames, SBLL)
update products set
  description = 'Sistema de sonido 5.1 canales pensado para TV, PC o reproductores multimedia. Cuenta con entrada USB y ranura para tarjeta SD para reproducir archivos MP3 y MP4 directamente, ademas de radio FM y control remoto inalambrico.',
  specs = '[{"label":"Marca","value":"Microlab"},{"label":"Modelo","value":"M710U51"},{"label":"Potencia","value":"55 W RMS"},{"label":"Función","value":"Sistema 5.1 canales, USB, SD, 2 entradas RCA, radio FM, control remoto inalámbrico, protección magnética"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'M710U51';

-- 221100036: Consola Level Up Retro Play LT (fuente: Megatone, Fravega, Ortiz & Ortega, levelupworld.com)
update products set
  description = 'Consola dos en uno que combina Android TV con un emulador multi-consola que trae 2300 juegos retro preinstalados. Se conecta por HDMI a cualquier TV y permite ademas navegar por tiendas de aplicaciones y plataformas de streaming.',
  specs = '[{"label":"Marca","value":"Level Up"},{"label":"Modelo","value":"Retro Play LT"},{"label":"Memoria RAM","value":"1 GB DDR3"},{"label":"Almacenamiento","value":"8 GB interno (expandible por microSD)"},{"label":"Función","value":"Chipset Amlogic S905, CPU Quadcore Cortex A53 2GHz, WiFi 802.11 b/g/n, HDMI 2.0, Android TV con Play Store, 2300 juegos preinstalados"},{"label":"Incluye","value":"2 joysticks USB, control remoto, microSD 8GB, cable HDMI, fuente de alimentación"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '221100036';

-- MK-880KIT: Combo teclado + mouse gaming Xtrike Me (fuente: Xtrike Me oficial, Amazon, Casa del Audio)
update products set
  description = 'Combo de teclado y mouse pensado para gaming y uso de oficina, con iluminacion retro tipo arcoiris en ambos dispositivos. Su diseno resistente a golpes y conexion plug and play por USB lo hacen compatible sin necesidad de instalar controladores.',
  specs = '[{"label":"Marca","value":"Xtrike Me"},{"label":"Modelo","value":"MK-880 KIT"},{"label":"Color","value":"Negro con retroiluminación arcoíris"},{"label":"Función","value":"Teclado membrana 114 teclas anti-ghosting 19 teclas, mouse óptico 800/1200/1600/2400 DPI con 7 botones, interfaz USB 2.0, cable 1.5m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MK-880KIT';

-- PBB02: Parlante Panter (fuente: panter.la oficial, Audio Trends, Lubrano Hogar)
update products set
  description = 'Parlante portatil con iluminacion RGB y funcion manos libres, pensado para el uso diario en casa o para llevar a reuniones. Se conecta por Bluetooth, USB, tarjeta SD o entrada auxiliar, con bateria interna de buena autonomia.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"PBB02"},{"label":"Dimensiones","value":"40 x 28 x 15 cm"},{"label":"Potencia","value":"35 W RMS (150 W máx.)"},{"label":"Función","value":"Bluetooth, USB, mini SD, AUX 3.5mm, manos libres con micrófono, iluminación RGB, subwoofer"},{"label":"Batería","value":"~6 horas de autonomía"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PBB02';

-- PCB-SP105B: Parlante Pcbox Billy (fuente: DGM Insumos, Sistecorp, Ferrato Insumos)
update products set
  description = 'Parlante portatil compacto con bateria de larga duracion, pensado para el uso diario y para trasladar de un ambiente a otro. Cuenta con dos entradas para microfono, radio FM y control remoto incluido.',
  specs = '[{"label":"Marca","value":"Pcbox"},{"label":"Modelo","value":"Billy (PCB-SP105B)"},{"label":"Peso","value":"1.85 kg"},{"label":"Dimensiones","value":"36 x 17.5 x 18 cm"},{"label":"Potencia","value":"10 W + 5 W"},{"label":"Función","value":"Bluetooth, USB 2.0, lector SD, radio FM, 2 entradas de micrófono, control remoto"},{"label":"Batería","value":"1800 mAh (hasta 8h, carga en 5-6h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PCB-SP105B';

-- MK-503KIT: Combo teclado + mouse gaming Xtrike Me (fuente: Xtrike Me oficial, Fravega, Amazon)
update products set
  description = 'Combo de teclado y mouse gaming con retroiluminacion arcoiris de 7 colores, pensado para uso en PC de escritorio. Su conexion USB plug and play no requiere instalacion de controladores adicionales.',
  specs = '[{"label":"Marca","value":"Xtrike Me"},{"label":"Modelo","value":"MK-503 KIT"},{"label":"Función","value":"Teclado membrana 112 teclas retroiluminado, mouse óptico 800-3200 DPI con 6 botones, interfaz USB 2.0, cable 1.5m, plug and play"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MK-503KIT';

-- HBB01: Parlante Panter (fuente: panter.la oficial, Bertoglio Hogar)
update products set
  description = 'Parlante portatil compacto pensado para el uso diario, con funcion manos libres para atender llamadas gracias a su microfono integrado. Se conecta por Bluetooth, entrada auxiliar, USB o tarjeta mini SD.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"HBB01"},{"label":"Color","value":"Verde"},{"label":"Dimensiones","value":"7 x 7 x 17 cm"},{"label":"Potencia","value":"15 W RMS (50 W PMPO)"},{"label":"Función","value":"Bluetooth, entrada AUX 3.5mm, micro USB, mini SD, manos libres con micrófono integrado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HBB01';

-- 33733024: Mesa TV Ricchezze Venezia (fuente: Selex Hogar, Ricchezze oficial, Blancoamor)
update products set
  description = 'Mesa para TV de la linea Venezia, pensada para organizar el equipo de audio y video del living con espacio de guardado en sus puertas. Su terminacion en teca y roble natural aporta un estilo calido al ambiente.',
  specs = '[{"label":"Marca","value":"Ricchezze"},{"label":"Modelo","value":"Venezia"},{"label":"Color","value":"Teca / Roble Natural"},{"label":"Material","value":"MDP (aglomerado melamínico)"},{"label":"Dimensiones","value":"180 x 66 x 44.3 cm (ancho x alto x profundidad)"},{"label":"Función","value":"2 puertas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '33733024';

-- SPO2693: Parlante para auto Philco (fuente: Fravega, Newsan, Pardo, Previsora del Paraná)
update products set
  description = 'Parlante coaxial de 3 vias para auto, pensado para reemplazar los originales de fabrica en la mayoria de los vehiculos gracias a su medida estandar 6x9 pulgadas. Incluye grilla de proteccion y cables de conexion para una instalacion sencilla.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"SPO2693"},{"label":"Dimensiones","value":"24 x 9.5 x 17 cm"},{"label":"Peso","value":"2.8 kg"},{"label":"Potencia","value":"50 W RMS (300 W máx.)"},{"label":"Función","value":"Coaxial 6x9\" 3 vías, impedancia 4 ohm, respuesta de frecuencia 35Hz-20kHz, incluye grilla protectora y cables de conexión"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SPO2693';

-- HBB03: Parlante Panter (fuente: panter.la oficial, Majul Hogar, Mutual CAP)
update products set
  description = 'Parlante portatil compacto pensado para el uso diario, con funcion manos libres para atender llamadas gracias a su microfono integrado. Se conecta por Bluetooth, entrada auxiliar, USB o tarjeta mini SD.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"HBB03"},{"label":"Color","value":"Rojo y negro"},{"label":"Dimensiones","value":"7 x 7 x 18.5 cm"},{"label":"Potencia","value":"20 W RMS (70 W PMPO)"},{"label":"Función","value":"Bluetooth, USB, mini SD, AUX 3.5mm, manos libres con micrófono integrado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HBB03';

-- 9309X-2ALCAR1: Tablet TCL Tab 7 Lite (fuente: LH Confort, Petenatti Hogar, GSMChoice, TCL oficial)
update products set
  description = 'Tablet compacta de 7 pulgadas pensada para uso basico como navegacion, video y lectura. Su version reducida de Android permite un funcionamiento fluido pese a sus recursos limitados, con memoria expandible por microSD.',
  specs = '[{"label":"Marca","value":"TCL"},{"label":"Modelo","value":"Tab 7 Lite"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"245 g"},{"label":"Pantalla","value":"7\" (1024x600)"},{"label":"Memoria RAM","value":"1 GB"},{"label":"Almacenamiento","value":"16 GB (expandible hasta 128 GB por microSD)"},{"label":"Función","value":"Android 10 Go Edition, Bluetooth, WiFi, cámara trasera 2MP"},{"label":"Batería","value":"2580 mAh"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '9309X-2ALCAR1';

-- PAN95O: Parlante para auto Noblex (fuente: Photostore, Noblex oficial car-audio)
update products set
  description = 'Parlante para auto de medida estandar 6x9 pulgadas, pensado para reemplazar los parlantes originales de fabrica en la mayoria de los vehiculos. Su instalacion es sencilla gracias a su tamano compatible con la mayoria de las bandejas traseras.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"PAN-950"},{"label":"Potencia","value":"50 W RMS (300 W máx.)"},{"label":"Función","value":"Parlante para auto 6x9\""},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PAN95O';

-- MNT670P: Torre de sonido Noblex (fuente: Fravega, Somos Rex, Previsora del Paraná, Noblex oficial)
update products set
  description = 'Torre de sonido pensada para fiestas y karaoke, con doble entrada de microfono y ecualizacion ajustable para reforzar los graves. Cuenta con iluminacion LED integrada y conectividad Bluetooth, radio FM y entrada auxiliar.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"MNT670P"},{"label":"Dimensiones","value":"83.5 x 30.1 x 26.7 cm"},{"label":"Peso","value":"12.3 kg"},{"label":"Voltaje","value":"100-240V, 50/60Hz"},{"label":"Potencia","value":"6500 W (PMPO)"},{"label":"Función","value":"Doble woofer 6.5\"+doble tweeter 3\", Bluetooth EDR, USB (solo carga), entrada RCA, radio FM, AUX 3.5mm, doble entrada de micrófono para karaoke, ecualización ajustable, botón Super Bass, luces LED"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MNT670P';
