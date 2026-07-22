-- Migracion 048: tanda 25 de specs/descripcion investigados (skill
-- product-specs-research). Muebles Ricchezze, parlantes Noblex/Pcbox/RCA/
-- Kioto, TVs Sanyo/Philco, tablets Northtech/Philco, camara Pcbox, kit de
-- camaras Kanji, auriculares Sony PS5, de la categoria "Electronica".
-- 15 confirmados de 25 candidatos investigados.
--
-- Excluidos de esta tanda (10, reportados aparte, no tocados por este SQL):
-- GMK-206 (Moonki/Xtrike Me: SKU y marca no coinciden con el "GM-206" real
-- de Xtrike Me encontrado) - IHS01 (Panter: solo se encontraron specs del
-- IHS02, modelo distinto) - 2734 (BGH: existen 2 tablets 7" reales T790 y
-- T795 con capacidades distintas, sin poder confirmar cual es) - S41
-- (Blackpoint: existen variantes S41.1/S41.2 con medidas distintas a las
-- de nuestra base, sin poder confirmar cual exacta) - SLB-97 (soporte de TV
-- sin marca real, sin fuente confiable) - PSB02TV (Noblex: solo se
-- encontraron parlantes "Adorable" de 3W con forma de animalitos, no
-- coincide con "parlante TV") - HP330R (Noblex: sin fuente confiable, no
-- existe ese modelo en los resultados) - PNE040242, 21513 (Hisense y
-- Telefunken: SKU interno sin poder mapear a un modelo real especifico) -
-- W-693 (Panter: el "W-693" encontrado aparece atribuido a otra marca
-- -Monster Sound-, contradice la marca ya cargada).

-- 33732424: Centro TV Ricchezze Venezia (fuente: Selex Hogar, Blancoamor, Ricchezze oficial)
update products set
  description = 'Centro de TV de la linea Venezia, pensado para organizar el equipo de audio y video del living con espacio de guardado en sus puertas y estantes. Su terminacion en teca y roble natural aporta un estilo calido al ambiente.',
  specs = '[{"label":"Marca","value":"Ricchezze"},{"label":"Modelo","value":"Venezia Centro TV 1"},{"label":"Color","value":"Teca / Roble Natural"},{"label":"Dimensiones","value":"183 x 156 x 44 cm (ancho x alto x profundidad)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '33732424';

-- TSN3000: Parlante amplificado Noblex (fuente: Fravega, Aloise, Brandimia, Servitec)
update products set
  description = 'Parlante portatil amplificado tipo party style, pensado para uso interior y exterior. Su sistema de transporte tipo carry on facilita moverlo de un lugar a otro, con manos libres para seguir usando el celular mientras esta conectado.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"TSN3000"},{"label":"Dimensiones","value":"31.3 x 41 x 19 cm"},{"label":"Peso","value":"5.7 kg"},{"label":"Potencia","value":"3500 W"},{"label":"Función","value":"Bluetooth, USB, SD, radio FM, entrada auxiliar 3.5mm, entrada micrófono, luces LED, manos libres"},{"label":"Batería","value":"Autonomía de 25 horas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TSN3000';

-- 33403: Tablet Pcbox 10.1 (fuente: Cetrogar, Coppel, Hard Digital)
update products set
  description = 'Tablet de 10.1 pulgadas pensada para uso basico como navegacion, video y lectura. Cuenta con camara frontal y trasera, GPS integrado y memoria expandible para guardar mas contenido.',
  specs = '[{"label":"Marca","value":"Pcbox"},{"label":"Modelo","value":"T104"},{"label":"Memoria RAM","value":"2 GB"},{"label":"Almacenamiento","value":"16 GB (expandible)"},{"label":"Pantalla","value":"10.1\" IPS multitouch (1280x800)"},{"label":"Función","value":"Android 10, procesador Mediatek MTK8167B Quad Core 1.3GHz, GPS, cámara trasera 2MP, cámara frontal 3MP, micro USB, HDMI, audio jack 3.5mm"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '33403';

-- MNT2X: Torre de sonido Noblex 4200W (fuente: Pardo, Megatone, Noblex oficial, Aloise)
update products set
  description = 'Torre de sonido con doble woofer y doble tweeter, pensada para fiestas y karaoke en casa. Incluye microfono con cable, funcion Voice FX para modificar el tono de voz y ecualizacion ajustable segun el estilo de musica.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"MNT2X"},{"label":"Dimensiones","value":"31.5 x 55.5 x 30.1 cm"},{"label":"Peso","value":"8.6 kg"},{"label":"Potencia","value":"4200 W (sonido bidireccional)"},{"label":"Función","value":"Bluetooth 5.3, TWS Party Stereo, USB, radio FM (30 estaciones), entrada micrófono karaoke, entrada guitarra, AUX 3.5mm, luces LED, doble woofer 5\" + doble tweeter 2\""},{"label":"Batería","value":"Recargable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MNT2X';

-- 48898: Parlante Pcbox Riot (fuente: Fravega, Sistecorp, RyR Computación, PCBOX oficial)
update products set
  description = 'Parlante portatil tipo torre con iluminacion RGB audioritmica que cambia de colores con la musica. Incluye control remoto y multiples formas de conexion, ideal para reuniones y uso en interiores.',
  specs = '[{"label":"Marca","value":"Pcbox"},{"label":"Modelo","value":"Riot (PCB-SP510BT)"},{"label":"Dimensiones","value":"22.1 x 59.4 x 33.2 cm"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"100 W RMS"},{"label":"Función","value":"Woofer 6.5\" + 2 tweeters 3\", Bluetooth, USB, SD, radio FM, 2 entradas AUX 3.5mm, control remoto, luces RGB"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '48898';

-- PSB2000P: Parlante Noblex portátil 60W (fuente: Fravega, Cetrogar, Novogar, Musicalísimo)
update products set
  description = 'Parlante portatil resistente al agua, pensado para actividades al aire libre o en la casa. Cuenta con luces RGB y funcion manos libres para llamadas, con control por asistente de voz Google Assistant y Siri.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"PSB2000P"},{"label":"Potencia","value":"60 W"},{"label":"Función","value":"Bluetooth 5.3, TWS, resistencia al agua IPX6, 2 subwoofers + 2 tweeters, entrada auxiliar 3.5mm, manos libres, control por voz, luces RGB"},{"label":"Batería","value":"Autonomía de 8 horas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PSB2000P';

-- RSNUKE: Parlante RCA Boombox 450W (fuente: MercadoLibre, Web Home, Colucci)
update products set
  description = 'Parlante portatil tipo boombox con bateria recargable, compatible con notebooks, PC, smartphones y tablets. Permite conectar un pendrive o tarjeta microSD para reproducir musica directamente sin necesidad de otro dispositivo.',
  specs = '[{"label":"Marca","value":"RCA"},{"label":"Modelo","value":"RSNUKE"},{"label":"Potencia","value":"450 W"},{"label":"Función","value":"Bluetooth, entrada USB, entrada microSD, entrada auxiliar, salida USB cargador, batería recargable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'RSNUKE';

-- 3005690: Auriculares Sony PULSE 3D para PS5 (fuente: PlayStation, PcComponentes, Exito)
update products set
  description = 'Auriculares inalambricos oficiales para PlayStation 5, disenados para aprovechar el audio 3D de la consola. Cuentan con doble microfono con cancelacion de ruido y bateria recargable de larga duracion.',
  specs = '[{"label":"Marca","value":"Sony"},{"label":"Modelo","value":"PULSE 3D (3005690)"},{"label":"Dimensiones","value":"22 x 22.5 x 13 cm"},{"label":"Función","value":"Bluetooth, audio 3D, doble micrófono con cancelación de ruido, conector 3.5mm, compatible con PS5/PS4/PC/Mac"},{"label":"Batería","value":"Hasta 12 horas de juego inalámbrico"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '3005690';

-- LCE32SH9: Smart TV Sanyo 32 (fuente: Casa Gigli, Petenatti Hogar, Beiro Hogar, Tecnolitoral)
update products set
  description = 'Smart TV de 32 pulgadas con panel LED HD, pensado para el uso diario en dormitorios o livings chicos. Incluye aplicaciones preinstaladas como Netflix y YouTube, con conexion WiFi integrada.',
  specs = '[{"label":"Marca","value":"Sanyo"},{"label":"Modelo","value":"LCE32SH9500"},{"label":"Dimensiones","value":"73 x 48 x 17.5 cm"},{"label":"Peso","value":"4.4 kg"},{"label":"Pantalla","value":"32\" LED HD (1366x768), 60Hz, contraste 3000:1"},{"label":"Voltaje","value":"220V"},{"label":"Función","value":"2 puertos HDMI, 2 puertos USB, WiFi integrado, Netflix, YouTube"},{"label":"Potencia de audio","value":"2 parlantes de 10W RMS"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LCE32SH9';

-- KJ-NVRW4: Kit de cámaras Kanji NVR + 4 cámaras WiFi (fuente: Sistecorp, Aeco Hogar, Datasoft)
update products set
  description = 'Kit de seguridad inalambrico con 4 camaras WiFi y grabador NVR, pensado para monitorear el negocio, la casa o la oficina en tiempo real desde el celular o la PC. Permite recibir alertas por deteccion de movimiento vía e-mail.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJ-NVRW4"},{"label":"Resolución","value":"1.4 MPX"},{"label":"Función","value":"4 cámaras IP WiFi 2.4G, NVR de sobremesa, uso interior/exterior, control vía app Android/iOS, detección de movimiento con alerta"},{"label":"Incluye","value":"Mouse, 4 transformadores, cable de red 2m, manual"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-NVRW4';

-- 32028: Cámara deportiva Pcbox Junior C720K (fuente: Fravega, MercadoLibre, Radio Sapienza, PCBOX oficial)
update products set
  description = 'Camara deportiva sumergible compacta, pensada para grabar actividades al aire libre o bajo el agua. Incluye estuche sumergible, soportes para bicicleta y tripode, y varios accesorios de sujecion.',
  specs = '[{"label":"Marca","value":"Pcbox"},{"label":"Modelo","value":"Junior (PCB-C720K)"},{"label":"Dimensiones","value":"59.2 x 41 x 24.6 mm"},{"label":"Peso","value":"54 g (con batería)"},{"label":"Función","value":"Video 1080p/30fps, foto 5MP, pantalla 2\", lente gran angular 120°, USB 2.0, ranura TF hasta 32GB, resistencia IP68"},{"label":"Batería","value":"3.7V 1000mAh"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '32028';

-- PLD39HS21LCH: Smart TV Philco 39 HD (fuente: Fravega, Dacar Hogar, Bolatti, Philco oficial)
update products set
  description = 'Smart TV de 39 pulgadas con panel LED HD, pensado para dormitorios o ambientes medianos. Incluye conexion WiFi y aplicaciones como Netflix y YouTube preinstaladas.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PLD39HS21LCH"},{"label":"Dimensiones","value":"88.7 x 51.32 x 8.09 cm (sin base)"},{"label":"Peso","value":"5.6 kg"},{"label":"Pantalla","value":"39\" LED HD (1366x768), 60Hz, contraste 3000:1"},{"label":"Función","value":"3 puertos HDMI, 2 puertos USB, WiFi, NFC, Netflix, YouTube, VESA 200x200"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PLD39HS21LCH';

-- TP7A6PI: Tablet Philco 7 (fuente: Fravega, Somos Rex, Petenatti Hogar, Philco oficial)
update products set
  description = 'Tablet de 7 pulgadas pensada para uso basico diario, con sistema operativo Android liviano para un funcionamiento fluido. Cuenta con memoria expandible por tarjeta SD y conectividad WiFi y Bluetooth.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TP7A6PI"},{"label":"Dimensiones","value":"191 x 109 x 9 mm"},{"label":"Memoria RAM","value":"1 GB"},{"label":"Almacenamiento","value":"16 GB (expandible a 32 GB)"},{"label":"Pantalla","value":"7\" (1024x600)"},{"label":"Función","value":"Android 10, procesador Allwinner A50 Quad-core, WiFi, Bluetooth, cámara trasera 2MP, cámara frontal 0.3MP"},{"label":"Batería","value":"2000 mAh"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TP7A6PI';

-- TW3000: Parlante Kioto (fuente: La Prida Hogar, Llanos Electro, Marconi Shop, Donidea)
update products set
  description = 'Torre de sonido con doble parlante de 12 pulgadas, pensada para fiestas y eventos. Incluye microfono inalambrico y control remoto, con pantalla LCD y ecualizador para ajustar el sonido.',
  specs = '[{"label":"Marca","value":"Kioto"},{"label":"Modelo","value":"TW3000BL"},{"label":"Dimensiones","value":"125 x 45 x 40 cm"},{"label":"Peso","value":"27 kg"},{"label":"Potencia","value":"150 W RMS"},{"label":"Función","value":"2 parlantes de 12\", Bluetooth, USB, SD, radio FM, MP3, pantalla LCD, ecualizador, luces rítmicas"},{"label":"Incluye","value":"Control remoto, micrófono inalámbrico"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TW3000';

-- NT-S10: Tablet Northtech 10 (fuente: HDCSA, Circuit.com.uy)
update products set
  description = 'Tablet de 10 pulgadas pensada para uso basico diario como navegacion, video y lectura. Su version liviana de Android permite un funcionamiento fluido pese a sus recursos limitados.',
  specs = '[{"label":"Marca","value":"Northtech"},{"label":"Modelo","value":"NT-S10"},{"label":"Memoria RAM","value":"1 GB"},{"label":"Almacenamiento","value":"16 GB"},{"label":"Pantalla","value":"10\""},{"label":"Función","value":"Android 8.1, procesador Quad-core"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'NT-S10';
