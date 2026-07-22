-- Migracion 040: tanda 22 de specs/descripcion investigados (skill
-- product-specs-research). Torres de sonido y autoestereos Philco,
-- radiograbadores, notebooks BGH/HP/Acer, tablets BGH/Smartlife/Kassel/
-- Novatech/Zylan, GPS Garmin e impresora Pantum, de la categoria
-- "Electronica". 29 productos confirmados de 31 candidatos investigados.
--
-- Excluidos de esta tanda (2, reportados aparte, no tocados por este SQL):
-- AT560 (BGH notebook: nuestra base dice "Intel Atom" pero todas las
-- fuentes confirman que el AT560 real usa Intel Celeron N4000, contradice
-- el dato ya cargado) - 2734 (BGH Tablet 7: existen dos modelos reales
-- -T795 64GB y T790 32GB- con distinto almacenamiento, sin forma de saber
-- a cual corresponde el codigo interno).

-- TAP1750: Torre Parlante Philco 20.000W (fuente: Fravega, Beiro Hogar, Lara Net)
update products set
  description = 'Torre de sonido portatil pensada para fiestas, con doble woofer de 12 pulgadas y ecualizacion DJ (scratch, reverb, beat box). Incluye sistema de luces RGB sincronizadas con la musica, mezclador DJ para 2 fuentes simultaneas y sistema de traslado con ruedas y manija plegable.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TAP1750"},{"label":"Dimensiones","value":"117 x 44 x 43.5 cm"},{"label":"Peso","value":"28 kg"},{"label":"Potencia","value":"20.000 W"},{"label":"Función","value":"Bluetooth (2 dispositivos), 2 USB, entrada guitarra/micrófono, radio FM, luces RGB, mezclador DJ, karaoke, control remoto, ruedas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TAP1750';

-- TP8500: Torre de Sonido Philco 7500W (fuente: Philco oficial, Fravega, Megatone)
update products set
  description = 'Torre de sonido portatil con doble woofer de 8 pulgadas, pensada para fiestas y reuniones. Cuenta con bateria recargable, funcion karaoke con doble entrada de microfono, boton X Bass para reforzar graves y juego de luces configurables.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TP8500"},{"label":"Dimensiones","value":"32.8 x 72 x 33.5 cm"},{"label":"Peso","value":"12.3 kg"},{"label":"Potencia","value":"7500 W"},{"label":"Función","value":"Bluetooth 5.3, USB, radio FM, karaoke con doble micrófono, X Bass, ecualizador 2 bandas, luces, batería recargable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TP8500';

-- TPL5500: Torre de Sonido Philco 9400W (fuente: Philco oficial, Fravega, Cetrogar)
update products set
  description = 'Torre de sonido portatil con doble woofer de 10 pulgadas y bateria recargable de hasta 8 horas de autonomia, pensada para fiestas. Incluye microfono para karaoke, luces LED, pantalla de control y conectividad TWS para emparejar con otro parlante igual.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TPL5500"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"34 x 36.1 x 84.4 cm"},{"label":"Peso","value":"16.84 kg"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"9400 W"},{"label":"Función","value":"Bluetooth con TWS, USB, entrada micrófono/guitarra, radio FM, X Bass, luces LED, batería recargable (8h), ruedas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TPL5500';

-- TPL4500: Torre de Sonido Philco (fuente: Provincia Compras, Cetrogar, Megatone)
update products set
  description = 'Torre de sonido portatil con doble woofer de 8 pulgadas y luces Full LED, pensada para fiestas con hasta 9 horas de bateria. Cuenta con entrada para microfono karaoke y guitarra, conectividad TWS para emparejar con otro parlante y boton X Bass.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TPL4500"},{"label":"Dimensiones","value":"69.5 x 32.5 x 23.5 cm"},{"label":"Potencia","value":"5300 W"},{"label":"Función","value":"Bluetooth 5.0 con TWS, USB, luces Full LED, entrada micrófono/guitarra, X Bass, batería ~9h"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TPL4500';

-- TP6500: Torre de Sonido Philco 4500W (fuente: Philco oficial, Fravega, Megatone)
update products set
  description = 'Torre de sonido portatil con doble woofer de 6.5 pulgadas, pensada para reuniones chicas o uso en el hogar. Incluye microfono para karaoke, luces configurables al ritmo de la musica y boton X Bass para reforzar los graves.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TP6500"},{"label":"Dimensiones","value":"26.1 x 53.6 x 25 cm"},{"label":"Peso","value":"6 kg"},{"label":"Potencia","value":"4500 W"},{"label":"Función","value":"Bluetooth 5.3, radio FM, USB, entrada micrófono/guitarra, karaoke, X Bass, luces, batería recargable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TP6500';

-- CSP790BC: Autoestereo Philco 45Wx4 (fuente: Depor Hogar, Pixel Store, ManualsLib)
update products set
  description = 'Autoestereo con reproductor de CD y conectividad Bluetooth y NFC, pensado para renovar el sonido del auto. Incluye funcion manos libres con microfono, entrada auxiliar frontal y frente desmontable como medida antirrobo.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"CSP790BC"},{"label":"Potencia","value":"45 W x 4"},{"label":"Función","value":"CD/CD-R/RW/MP3, Bluetooth, NFC, USB, AUX frontal, manos libres con micrófono, AM/FM, frente desmontable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CSP790BC';

-- CSP810BT: Autoestereo Philco 50Wx4 (fuente: Philco oficial, Fravega, Cetrogar)
update products set
  description = 'Autoestereo sin lector de CD, pensado para quienes reproducen musica desde el celular o pendrive. Cuenta con funcion manos libres con microfono incorporado, lector de tarjeta SD y sintonizador digital AM/FM con 30 memorias.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"CSP810BT"},{"label":"Dimensiones","value":"18.7 x 11.5 x 6 cm"},{"label":"Potencia","value":"50 W x 4"},{"label":"Función","value":"Bluetooth, USB, SD, AUX, manos libres con micrófono, AM/FM 30 memorias, antishock digital, frente desmontable"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CSP810BT';

-- ARP2900BT: Radiograbador Philco (fuente: Philco/Fravega, Garbarino, Megatone)
update products set
  description = 'Radiograbador compacto y portatil, pensado para el uso diario en la cocina o el taller. Reproduce CD, CD-R/RW y MP3, con radio AM/FM digital y conectividad Bluetooth y USB, ademas de funcionar con pilas o enchufado.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"ARP2900BT"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"28 x 14.5 x 23.5 cm"},{"label":"Peso","value":"1.8 kg"},{"label":"Potencia","value":"180 W PMPO"},{"label":"Función","value":"CD/CD-R/RW/MP3, radio AM/FM digital, Bluetooth, USB, AUX, display LCD, funciona a pila o 220V"},{"label":"Garantía","value":"6 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ARP2900BT';

-- CDR1529BT: Radiograbador Noblex (fuente: Noblex/Fravega, Cetrogar, Beiro Hogar)
update products set
  description = 'Radiograbador con reproductor de CD y conectividad Bluetooth, pensado para el uso diario. Incluye entrada de microfono, salida de auriculares y funciona tanto enchufado a 220V como con pilas.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"CDR1529BT"},{"label":"Dimensiones","value":"22.1 x 28.8 x 12.3 cm"},{"label":"Peso","value":"1.42 kg"},{"label":"Potencia","value":"400 W"},{"label":"Función","value":"CD/CD-R/RW/MP3/WMA, radio AM/FM analógico, Bluetooth, USB, AUX, entrada micrófono, salida auriculares"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CDR1529BT';

-- 1650105: GPS Garmin Drive 40 (fuente: Garmin oficial, ActiveGPS)
update products set
  description = 'GPS para auto con pantalla tactil de 4.3 pulgadas, pensado para navegar por rutas y ciudades con mapas precargados. Cuenta con alertas de curvas peligrosas, cambios de limite de velocidad y bateria recargable con autonomia de hasta 1 hora sin estar conectado al vehiculo.',
  specs = '[{"label":"Marca","value":"Garmin"},{"label":"Modelo","value":"Drive 40"},{"label":"Dimensiones","value":"12.2 x 7.6 x 1.9 cm"},{"label":"Peso","value":"144.6 g"},{"label":"Pantalla","value":"4.3\" táctil (480x272)"},{"label":"Función","value":"Mapas precargados, ranura microSD, hasta 1000 waypoints, alertas de curvas y límites de velocidad, cable de auto 12V"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '1650105';

-- MDX1605: Radiograbador Sanyo (fuente: Casa Radar, Web Electro, Natalia Hogar)
update products set
  description = 'Radiograbador con reproductor de CD y conectividad Bluetooth y USB, pensado para el uso diario. Cuenta con sintonizador AM/FM, salida de auriculares y entrada auxiliar, funcionando enchufado o con pilas.',
  specs = '[{"label":"Marca","value":"Sanyo"},{"label":"Modelo","value":"MDX1605BT"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"29 x 13 x 26 cm"},{"label":"Potencia","value":"500 W"},{"label":"Función","value":"CD/CD-R/RW/MP3, radio AM/FM, Bluetooth, USB, AUX, salida auriculares, funciona a pila o 220V"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MDX1605';

-- DMH-G225BT: Autoestereo Pioneer bluetooth con pantalla tactil (fuente: Pioneer oficial, Mega Audio, Coppel)
update products set
  description = 'Autoestereo con pantalla tactil de 6.2 pulgadas, pensado para reemplazar el sistema original del auto con mas funciones multimedia. Permite hacer llamadas y reproducir musica por Bluetooth, controlar el celular Android por USB, y admite camara de reversa.',
  specs = '[{"label":"Marca","value":"Pioneer"},{"label":"Modelo","value":"DMH-G225BT"},{"label":"Pantalla","value":"6.2\" WVGA táctil"},{"label":"Potencia","value":"50 W x 4 (MOSFET)"},{"label":"Función","value":"Bluetooth, USB, AUX, ecualizador 7 bandas, control de subwoofer, memoria para 3 celulares, entrada cámara de reversa"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DMH-G225BT';

-- TS-R1651S: Parlante para auto Pioneer 6.5" (fuente: Pioneer oficial, Audioshop México, Americars)
update products set
  description = 'Parlante coaxial de 3 vias para auto, pensado para mejorar el sonido del sistema original del vehiculo. Su cono reforzado de matriz de mica y bobina de voz de aluminio ofrecen un sonido potente y con buena claridad.',
  specs = '[{"label":"Marca","value":"Pioneer"},{"label":"Modelo","value":"TS-R1651S"},{"label":"Material","value":"Cono de matriz de mica, bobina de aluminio"},{"label":"Potencia","value":"300 W máx, 40 W RMS"},{"label":"Función","value":"3 vías, respuesta 30Hz-18kHz, sensibilidad 90dB, impedancia 4Ω, profundidad de montaje 42mm"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TS-R1651S';

-- 60876: Impresora Pantum M6550NW Multifunción Láser WiFi (fuente: Pantum oficial, Brandimia, PcComponentes)
update products set
  description = 'Impresora multifuncion laser monocromatica que imprime, copia y escanea, pensada para oficinas chicas con volumen de impresion medio. Su conectividad WiFi y de red permite imprimir desde varios dispositivos, con escaner plano y alimentador automatico de hasta 35 hojas.',
  specs = '[{"label":"Marca","value":"Pantum"},{"label":"Modelo","value":"M6550NW"},{"label":"Función","value":"Imprime, copia y escanea, láser monocromática, dúplex manual, escáner plano + ADF 35 hojas"},{"label":"Velocidad","value":"22 ppm"},{"label":"Conectividad","value":"USB 2.0, Ethernet 10/100, WiFi 802.11 b/g/n"},{"label":"Capacidad","value":"Hasta 20.000 páginas por mes"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '60876';

-- AT520L: Notebook Positivo BGH 14" Celeron N4020 4GB/128GB W11 (fuente: BGH oficial, Megatone, Habitar)
update products set
  description = 'Notebook de 14 pulgadas pensada para tareas de oficina y estudio, con SSD de 128GB para tiempos de arranque rapidos. Cuenta con luces LED de tres niveles para videollamadas y lector de memoria 3 en 1, con Windows 11 preinstalado.',
  specs = '[{"label":"Marca","value":"BGH (Positivo)"},{"label":"Modelo","value":"AT520L"},{"label":"Peso","value":"1.5 kg"},{"label":"Pantalla","value":"14\" LED HD (1366x768)"},{"label":"Procesador","value":"Intel Celeron N4020"},{"label":"Memoria","value":"4 GB LPDDR4 / 128 GB SSD"},{"label":"Gráficos","value":"Intel UHD Graphics 600"},{"label":"Sistema operativo","value":"Windows 11 Home"},{"label":"Función","value":"WiFi 802.11bgn, Bluetooth 4.0, 2 USB 3.1, HDMI, webcam 0.3MP, lector 3en1"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AT520L';

-- HN4020: Notebook HP 15" Celeron N4020 4GB/1TB (fuente: HP/Jetstereo, Mikkyworld, Kibuga)
update products set
  description = 'Notebook de 15.6 pulgadas pensada para tareas de oficina basicas, con disco rigido de 1TB para almacenar archivos. Su procesador Intel Celeron N4020 y 4GB de RAM ofrecen un rendimiento adecuado para uso diario.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"Notebook 15"},{"label":"Pantalla","value":"15.6\" HD (1366x768)"},{"label":"Procesador","value":"Intel Celeron N4020"},{"label":"Memoria","value":"4 GB DDR4 / 1 TB HDD (5400 rpm)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HN4020';

-- N4020: Notebook Acer Aspire 3 15.6" Celeron 4GB/128GB SSD (fuente: Acer oficial, PcComponentes, Garbarino)
update products set
  description = 'Notebook de 15.6 pulgadas pensada para tareas de oficina y estudio, con SSD de 128GB para arranque rapido. Su procesador Intel Celeron N4020 y 4GB de RAM ofrecen un rendimiento adecuado para el uso diario basico.',
  specs = '[{"label":"Marca","value":"Acer"},{"label":"Modelo","value":"Aspire 3 (A315-34)"},{"label":"Dimensiones","value":"36.3 x 25 x 2 cm"},{"label":"Pantalla","value":"15.6\" Full HD"},{"label":"Procesador","value":"Intel Celeron N4020 (hasta 2.8 GHz)"},{"label":"Memoria","value":"4 GB DDR4 / 128 GB SSD"},{"label":"Gráficos","value":"Intel UHD Graphics 600"},{"label":"Función","value":"WiFi 802.11ac, Bluetooth 4.1, Ethernet Gigabit"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'N4020';

-- PNK123457: Tablet BGH 10" Q10 2GB/64GB (fuente: BGH oficial, Fravega, Megatone)
update products set
  description = 'Tablet de 10 pulgadas pensada para navegacion, video y uso diario liviano. Su bateria de 5000 mAh y procesador octa core ofrecen buena autonomia y rendimiento, con Android 10 y ranura para tarjeta de memoria.',
  specs = '[{"label":"Marca","value":"BGH (Positivo)"},{"label":"Modelo","value":"Tab Q10"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"500 g"},{"label":"Pantalla","value":"10\" (1280x800)"},{"label":"Memoria","value":"2 GB RAM / 64 GB"},{"label":"Procesador","value":"SC9863A Octa-core 1.6GHz"},{"label":"Cámara","value":"5MP trasera con flash, 2MP frontal"},{"label":"Batería","value":"5000 mAh"},{"label":"Función","value":"Android 10, Bluetooth, USB-C, GPS"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PNK123457';

-- SL-TAB07116: Tablet Smartlife 7" 1GB/16GB (fuente: Smartlife/Perozzi, New Bytes, Rivera Hogar)
update products set
  description = 'Tablet compacta de 7 pulgadas, pensada para navegacion liviana y video. Su bateria de 2000 mAh y sistema Android 9 Go la hacen practica para el uso diario basico, con doble camara y conectividad WiFi y Bluetooth.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-TAB07116"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"275 g"},{"label":"Dimensiones","value":"188.8 x 108.6 x 7.95 mm"},{"label":"Pantalla","value":"7\" IPS (1024x600)"},{"label":"Memoria","value":"1 GB RAM / 16 GB, expandible hasta 32 GB"},{"label":"Procesador","value":"Rockchip RK3326 Quad core 1.5GHz"},{"label":"Cámara","value":"2MP trasera, 0.3MP frontal"},{"label":"Batería","value":"2000 mAh"},{"label":"Función","value":"WiFi, Bluetooth 4.0, Android 9 Go edition"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-TAB07116';

-- SL-HF360: Minicomponente Smartlife 360W (fuente: Smartlife/Fravega, ICBC Mall, Musicalisimo)
update products set
  description = 'Minicomponente con doble woofer de 6.5 pulgadas y doble tweeter, pensado para el uso hogareno con buena potencia de sonido. Reproduce CD, MP3 y radio FM, con conectividad Bluetooth y USB, ademas de control remoto incluido.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-HF360"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"360 W RMS (180W x2)"},{"label":"Función","value":"Doble woofer 6.5\" + doble tweeter 2\", Bluetooth, USB, radio FM, CD/MP3/CD-R/RW, control remoto"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-HF360';

-- SL-BTS780B: Parlante Portátil Bluetooth Smartlife (fuente: Smartlife oficial, Delfino Hogar, Garbarino)
update products set
  description = 'Parlante portatil resistente al agua, pensado para llevar a actividades al aire libre. Cuenta con funcion manos libres y TWS para emparejar con otro parlante igual y lograr sonido estereo, con bateria integrada.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-BTS780B"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"17 x 6.7 x 6.7 cm"},{"label":"Peso","value":"510 g"},{"label":"Potencia","value":"14 W RMS (7Wx2)"},{"label":"Función","value":"Bluetooth con TWS, entrada SD y AUX, manos libres, resistencia al agua IPX5"},{"label":"Batería","value":"1800 mAh"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-BTS780B';

-- SL-PB115050: Parlante Partybox Smartlife 15" 50W (fuente: Smartlife oficial, Delfino Hogar, Fravega)
update products set
  description = 'Parlante portatil tipo partybox de 15 pulgadas, pensado para fiestas y reuniones. Incluye microfono alambrico para karaoke, luces LED dinamicas y control remoto, con bateria de larga duracion.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-PB115050"},{"label":"Dimensiones","value":"33.6 x 42.8 x 64 cm"},{"label":"Peso","value":"10 kg"},{"label":"Potencia","value":"50 W RMS"},{"label":"Función","value":"1 vía 15\" + tweeter 1.5\", Bluetooth con TWS, USB, TF, FM, AUX, micrófono karaoke, luces LED, control remoto"},{"label":"Batería","value":"12V 7200 mAh"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-PB115050';

-- SL-PB112030: Partybox Parlante Smartlife 12" 30W (fuente: Smartlife oficial, Aloise, Pixel Store)
update products set
  description = 'Parlante portatil tipo partybox de 12 pulgadas, pensado para reuniones y fiestas chicas. Incluye microfono alambrico para karaoke, luces LED dinamicas y control remoto.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-PB112030"},{"label":"Dimensiones","value":"54 x 34.8 x 30.2 cm"},{"label":"Peso","value":"6.5 kg"},{"label":"Potencia","value":"30 W RMS"},{"label":"Función","value":"1 vía 12\" + tweeter 1.5\", Bluetooth con TWS, USB, TF, FM, AUX, micrófono karaoke, luces LED, control remoto"},{"label":"Batería","value":"11.1V 1800 mAh"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-PB112030';

-- KS3401: Tablet Kassel 7" 1GB/16GB (fuente: Fravega, Coppel, Hendel)
update products set
  description = 'Tablet compacta de 7 pulgadas, pensada para navegacion basica y consumo de contenido liviano. Cuenta con doble camara y bateria de 2400 mAh, con sistema Android Go optimizado para equipos de gama baja.',
  specs = '[{"label":"Marca","value":"Kassel"},{"label":"Modelo","value":"SK3401"},{"label":"Pantalla","value":"7\" (1024x600)"},{"label":"Memoria","value":"1 GB RAM / 16 GB, expandible hasta 32 GB"},{"label":"Procesador","value":"Quad core ARM Cortex-A7 1.2GHz"},{"label":"Cámara","value":"2MP trasera, 0.3MP frontal"},{"label":"Batería","value":"2400 mAh"},{"label":"Función","value":"WiFi, Bluetooth 2.0, Android Go"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KS3401';

-- SK5501: Tablet Kassel 10.1" 2GB/16GB (fuente: Fravega, MercadoLibre, Tienda Itec)
update products set
  description = 'Tablet de 10.1 pulgadas con panel IPS, pensada para navegacion, video y uso diario. Su bateria de 4500 mAh y sistema Android 10 ofrecen buena autonomia para el uso cotidiano.',
  specs = '[{"label":"Marca","value":"Kassel"},{"label":"Modelo","value":"SK5501"},{"label":"Color","value":"Negro"},{"label":"Pantalla","value":"10.1\" IPS (800x1280)"},{"label":"Memoria","value":"2 GB DDR3 / 16 GB, expandible hasta 64 GB"},{"label":"Procesador","value":"Quad Core RK3126 1.5GHz"},{"label":"Cámara","value":"2MP trasera, 0.3MP frontal"},{"label":"Batería","value":"4500 mAh"},{"label":"Función","value":"WiFi, Bluetooth 4.1, Android 10"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SK5501';

-- TBENOVA07: Tablet Novatech eNova 7" 8GB/1GB (fuente: Novatech/ICBC Mall, AllCell, Hendel)
update products set
  description = 'Tablet compacta de 7 pulgadas, pensada para navegacion basica y uso liviano. Cuenta con doble camara, bateria de 2200 mAh y ranura para tarjeta de memoria, con sistema Android.',
  specs = '[{"label":"Marca","value":"Novatech (eNova)"},{"label":"Modelo","value":"TBENOVA07"},{"label":"Peso","value":"0.6 kg"},{"label":"Dimensiones","value":"192 x 109.7 x 10.3 mm"},{"label":"Pantalla","value":"7\" TFT (1024x600)"},{"label":"Memoria","value":"1 GB RAM / 8 GB, expandible hasta 64 GB"},{"label":"Procesador","value":"RK3126C Cortex A7 Quad core 1.2GHz"},{"label":"Cámara","value":"2MP trasera, 0.3MP frontal"},{"label":"Batería","value":"2200 mAh"},{"label":"Función","value":"WiFi 2.4GHz, Bluetooth 4.0, Android 8.1"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TBENOVA07';

-- TBENOVA10: Tablet Novatech eNova 10" 16GB/2GB (fuente: Novatech/ICBC Mall, Hendel, Fravega)
update products set
  description = 'Tablet de 10.1 pulgadas con cuerpo metalico, pensada para navegacion y consumo de contenido multimedia. Su bateria de 5000 mAh y camara trasera de 5MP la hacen apta para el uso diario, con Android 8.1.',
  specs = '[{"label":"Marca","value":"Novatech (eNova)"},{"label":"Modelo","value":"TBENOVA10"},{"label":"Material","value":"Cuerpo metálico"},{"label":"Dimensiones","value":"250 x 171.7 x 9.2 mm"},{"label":"Pantalla","value":"10.1\" IPS (800x1280)"},{"label":"Memoria","value":"2 GB RAM / 16 GB, expandible hasta 32 GB"},{"label":"Procesador","value":"RK3326 Cortex A35 Quad core 1.5GHz"},{"label":"Cámara","value":"5MP trasera, 2MP frontal"},{"label":"Batería","value":"5000 mAh"},{"label":"Función","value":"WiFi, Bluetooth 4.0, Android 8.1"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TBENOVA10';

-- TAL-901S: Tablet Zylan Compass 9" 1GB/8GB con teclado y estuche (fuente: Mercado Libre, Compra en San Juan)
update products set
  description = 'Tablet de 9 pulgadas que incluye funda con teclado, pensada para quienes buscan escribir con mas comodidad. Su bateria de 5000 mAh y doble camara con flash la hacen practica para el uso diario basico.',
  specs = '[{"label":"Marca","value":"Zylan"},{"label":"Modelo","value":"Compass TAL-901S"},{"label":"Pantalla","value":"9\" HD (1024x600)"},{"label":"Memoria","value":"1 GB RAM / 8 GB, expandible hasta 32 GB"},{"label":"Procesador","value":"Quad core"},{"label":"Cámara","value":"2MP trasera con flash, 0.3MP frontal"},{"label":"Batería","value":"5000 mAh"},{"label":"Función","value":"WiFi, Bluetooth, Android 5.1"},{"label":"Accesorios incluidos","value":"Funda con teclado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TAL-901S';

-- TAL-700W: Tablet Zylan 7" 1GB/8GB con funda (fuente: Mercado Libre)
update products set
  description = 'Tablet compacta de 7 pulgadas con funda de silicona incluida, pensada para navegacion basica y uso diario liviano. Cuenta con doble camara con flash y bateria de 3000 mAh.',
  specs = '[{"label":"Marca","value":"Zylan"},{"label":"Modelo","value":"TAL700W (Partner)"},{"label":"Pantalla","value":"7\" HD (1024x600)"},{"label":"Memoria","value":"1 GB RAM / 8 GB"},{"label":"Procesador","value":"Quad core"},{"label":"Cámara","value":"2MP trasera con flash, 0.3MP frontal"},{"label":"Batería","value":"3000 mAh"},{"label":"Función","value":"WiFi, Bluetooth, Android"},{"label":"Accesorios incluidos","value":"Funda de silicona"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TAL-700W';
