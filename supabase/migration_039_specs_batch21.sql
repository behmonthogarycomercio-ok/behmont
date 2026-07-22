-- Migracion 039: tanda 21 de specs/descripcion investigados (skill
-- product-specs-research). Celulares (Noblex, Alcatel, ZTE, LG), Smart TVs
-- Kanji/Siera/Sansei/Candy/Serie Dorada, auriculares Philips y minicomponente
-- LG, de la categoria "Electronica". 24 productos confirmados de 31
-- candidatos investigados.
--
-- Excluidos de esta tanda (7, reportados aparte, no tocados por este SQL):
-- A5PLUS (ZTE Blade A5 Plus: nuestra base dice pantalla 5.4" pero el modelo
-- real tiene 6", contradice el dato ya cargado) - 19500 (Philips AOC Smart
-- TV 50" 4K: solo se encontraron modelos genericos de EEUU, sin fuente
-- especifica del modelo argentino/AOC) - MDR-ZX1100 (Sony auricular: ese
-- codigo no existe en la linea Sony, solo MDR-ZX110 sin el "0" final) -
-- 3005690 (Sony auriculares PS5: existen 3 lineas Pulse distintas -3D,
-- Explore, Elite- con specs muy diferentes, no se pudo determinar cual
-- corresponde al codigo) - STV5003 (Siera Smart TV 50: nuestra base dice
-- "Full HD" pero el modelo real es 4K/UHD, contradice el dato ya cargado) -
-- 21513 (Telefunken Smart TV 32: existen 3 modelos reales distintos -VIDAA,
-- generico, Android- sin forma de saber cual es el codigo interno) -
-- LCE32SH9 (Sanyo Smart TV 32: la unica fuente encontrada describe un
-- modelo sin WiFi/no smart, contradice "Smart Tv" del nombre ya cargado).

-- 5007G-FAOFARA: Celular Alcatel 1V Plus 2GB/32GB lector de huella (fuente: Fravega, Garbarino, Pixel Store)
update products set
  description = 'Celular de entrada con pantalla de 6.22 pulgadas y lector de huella para desbloqueo rapido y seguro. Su doble camara trasera de 13MP+5MP y bateria de 4000 mAh lo hacen apto para el uso diario, con boton dedicado para el Asistente de Google.',
  specs = '[{"label":"Marca","value":"Alcatel"},{"label":"Modelo","value":"1V Plus"},{"label":"Pantalla","value":"6.22\" HD+"},{"label":"Memoria","value":"2 GB RAM / 32 GB, expandible hasta 128 GB"},{"label":"Procesador","value":"MT6762D Octa Core"},{"label":"Cámara","value":"13MP + 5MP trasera, 5MP frontal"},{"label":"Batería","value":"4000 mAh"},{"label":"Función","value":"Lector de huella, reconocimiento facial, botón Google Assistant, Android 10"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '5007G-FAOFARA';

-- A51-F: Celular Hitachi/ZTE A51 2GB/32GB (fuente: GSMArena, PcComponentes, Smart-GSM)
update products set
  description = 'Celular de entrada con pantalla de 6.52 pulgadas, pensado para el uso diario basico. Su bateria de 3200 mAh con carga rapida y lector de huellas trasero acompanan el uso cotidiano, con doble camara trasera de 13MP+2MP.',
  specs = '[{"label":"Marca","value":"ZTE (Blade)"},{"label":"Modelo","value":"A51"},{"label":"Pantalla","value":"6.52\""},{"label":"Memoria","value":"2 GB RAM / 32 GB, expandible"},{"label":"Procesador","value":"Octa core (4x1.6GHz + 4x1.2GHz Cortex-A55)"},{"label":"Cámara","value":"13MP + 2MP trasera, 5MP frontal"},{"label":"Batería","value":"3200 mAh, carga rápida"},{"label":"Peso","value":"173.7 g"},{"label":"Función","value":"Lector de huella trasero, Android 11 Go edition"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'A51-F';

-- 11901202842: Celular LG K22+ 3GB/64GB (fuente: LG oficial, Cetrogar, Amazon)
update products set
  description = 'Celular de gama media con pantalla FullVision de 6.2 pulgadas, pensado para el uso diario con buena resistencia. Cuenta con certificacion militar MIL-STD 810G contra golpes y caidas, camara dual de 13MP+2MP macro y boton dedicado para el Asistente de Google.',
  specs = '[{"label":"Marca","value":"LG"},{"label":"Modelo","value":"K22+ (K200HAW)"},{"label":"Pantalla","value":"6.2\" FullVision HD+"},{"label":"Memoria","value":"3 GB RAM / 64 GB"},{"label":"Procesador","value":"Quad core 1.3GHz"},{"label":"Cámara","value":"13MP + 2MP macro trasera, 5MP frontal"},{"label":"Batería","value":"3000 mAh"},{"label":"Función","value":"Certificación militar MIL-STD 810G, botón Google Assistant, 4G"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '11901202842';

-- SHL5000/00: Auricular Philips vincha negro (fuente: Philips oficial, Falabella, Amazon)
update products set
  description = 'Auricular tipo vincha plegable, pensado para el uso diario con buen aislamiento de ruido exterior. Sus almohadillas de cuero suave y diseno liviano lo hacen comodo para uso prolongado, con conexion de cable de 3.5mm.',
  specs = '[{"label":"Marca","value":"Philips"},{"label":"Modelo","value":"SHL5000/00"},{"label":"Color","value":"Negro"},{"label":"Función","value":"Sistema acústico cerrado, plegable, almohadillas de cuero, cable 1.2 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SHL5000/00';

-- SHL5000/0: Auricular Philips vincha blanco (fuente: Philips oficial, Falabella, Amazon)
update products set
  description = 'Auricular tipo vincha plegable, pensado para el uso diario con buen aislamiento de ruido exterior. Sus almohadillas de cuero suave y diseno liviano lo hacen comodo para uso prolongado, con conexion de cable de 3.5mm.',
  specs = '[{"label":"Marca","value":"Philips"},{"label":"Modelo","value":"SHL5000"},{"label":"Color","value":"Blanco"},{"label":"Función","value":"Sistema acústico cerrado, plegable, almohadillas de cuero, cable 1.2 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SHL5000/0';

-- SHL3075BK/00: Auricular Philips c/microfono BASS (fuente: Philips oficial, PcComponentes)
update products set
  description = 'Auricular tipo vincha con enfasis en graves, pensado para escuchar musica con mas potencia sin agregar peso extra. Incluye microfono para llamadas y su diseno plegable facilita guardarlo o transportarlo.',
  specs = '[{"label":"Marca","value":"Philips"},{"label":"Modelo","value":"SHL3075BK/00 (Bass+)"},{"label":"Color","value":"Negro"},{"label":"Función","value":"Con micrófono, diseño plegable, over-ear, almohadillas suaves, cable 1.2 m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SHL3075BK/00';

-- LE32S5970/28: Smart TV Philips AOC 32" (fuente: AOC oficial, Pixel Store, Mastronardi Hogar)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD, pensado para el uso diario con acceso directo a Netflix. Cuenta con 3 entradas HDMI y 2 USB, ademas de conexion Ethernet y WiFi para acceder a internet.',
  specs = '[{"label":"Marca","value":"Philips (AOC)"},{"label":"Modelo","value":"LE32S5970"},{"label":"Dimensiones","value":"72.7 x 42.4 x 7.7 cm"},{"label":"Pantalla","value":"32\" HD (1366x768), 60Hz"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, Ethernet, salida óptica, botón directo Netflix, 2x5W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LE32S5970/28';

-- KJ-75ST005-2Q: Smart TV Kanji 75" QLED 4K Google TV (fuente: Kanji oficial, Fravega, Megatone)
update products set
  description = 'Smart TV de 75 pulgadas con pantalla QLED 4K, pensado para el living principal con colores mas vivos y mejor contraste. Su sistema Google TV con Chromecast integrado y control por voz da acceso a todas las apps de streaming, con sonido Dolby Audio.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJ-75ST005-2Q"},{"label":"Dimensiones","value":"166.7 x 95.5 x 8.5 cm"},{"label":"Peso","value":"24 kg"},{"label":"Pantalla","value":"75\" QLED 4K (3840x2160)"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Chromecast integrado, control por voz, 4 HDMI 2.0, 2 USB, WiFi, Bluetooth 5.1, Dolby Audio"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-75ST005-2Q';

-- KJ-32MT005-2: Smart TV Kanji 32" Google TV (fuente: Kanji oficial, Fravega, Megatone)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD, pensado para el uso diario con control por voz Hey Google. Cuenta con procesador quad core y sonido estereo con ecualizador de 4 modos.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJ-32MT005-2"},{"label":"Dimensiones","value":"73.2 x 43.4 x 8.2 cm"},{"label":"Peso","value":"3.5 kg"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Hey Google, procesador quad core, 3 HDMI, 2 USB, WiFi, Bluetooth, 2x12W"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-32MT005-2';

-- KD-32MT005-2: Smart TV Kanji Kodak 32" Hey Google (fuente: Kodak/Nuevas Hogar, C&E Online, Santimaría)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y sistema Google TV, pensado para acceder a Netflix, YouTube y Disney+ con control por voz Hey Google. Incluye Chromecast integrado y sintonizador digital.',
  specs = '[{"label":"Marca","value":"Kodak"},{"label":"Modelo","value":"KD-32MT005-2"},{"label":"Dimensiones","value":"73.2 x 43.4 x 8.2 cm"},{"label":"Peso","value":"3.5 kg"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Chromecast integrado, Hey Google, sintonizador digital, 3 HDMI, 2 USB, WiFi, Bluetooth, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KD-32MT005-2';

-- 9809B: Smart TV Kanji 60" 4K (fuente: Garbarino, Mercado Libre, Giudice)
update products set
  description = 'Smart TV de 60 pulgadas con resolucion 4K y soporte HDR, pensado para el living principal. Su sistema Android da acceso a Netflix y YouTube mediante WiFi, con 3 entradas HDMI y 2 USB.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"9809B"},{"label":"Dimensiones","value":"129.9 x 75.9 x 8.4 cm"},{"label":"Peso","value":"15 kg"},{"label":"Pantalla","value":"60\" 4K (3840x2160), HDR"},{"label":"Sistema operativo","value":"Android"},{"label":"Función","value":"1GB RAM / 8GB almacenamiento, 3 HDMI, 2 USB, WiFi, Ethernet, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '9809B';

-- KJ-MN55-30SMT: Smart TV Kanji 55" 4K (fuente: AllCell, LH Confort, Celectro Mayorista)
update products set
  description = 'Smart TV de 55 pulgadas con resolucion 4K UHD, pensado para el living con buena definicion de imagen. Cuenta con multiples entradas HDMI y USB, ademas de conexion RJ-45 para red cableada.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJ-MN55-30SMT"},{"label":"Dimensiones","value":"125 x 80 x 30 cm (con base)"},{"label":"Peso","value":"14 kg"},{"label":"Pantalla","value":"55\" 4K UHD (3840x2160)"},{"label":"Sistema operativo","value":"Android"},{"label":"Función","value":"2 HDMI, 1 VGA, 3 USB, RJ-45, salida de audio, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-MN55-30SMT';

-- KJ-MN185B-30: Smart TV Kanji 40" (fuente: Datasoft, Petenatti Hogar, Kanji oficial)
update products set
  description = 'Smart TV de 40 pulgadas con resolucion HD, pensado para el uso diario con acceso a apps de streaming. Su sistema Android 7.1 y conectividad WiFi permiten navegar y ver contenido online, con sonido estereo y ecualizador de 4 modos.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJ-MN185B-30"},{"label":"Dimensiones","value":"88.3 x 51.3 x 7.9 cm"},{"label":"Peso","value":"5.8 kg"},{"label":"Pantalla","value":"40\" HD (1366x768)"},{"label":"Sistema operativo","value":"Android 7.1"},{"label":"Función","value":"1GB RAM / 8GB almacenamiento, 3 HDMI, 2 USB, VGA, RJ45, WiFi, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-MN185B-30';

-- 91A60PLUS: Celular Noblex A60+ 32GB/2GB (fuente: Noblex/Radio Sapienza, Electromisiones, Megusta)
update products set
  description = 'Celular de entrada con pantalla de 6 pulgadas y doble camara para fotos basicas, pensado para el uso diario liviano. Su bateria de 3000 mAh y almacenamiento expandible por microSD lo hacen practico para llamadas, mensajes y redes sociales.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"A60+ (91A60PLUS)"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"215 g"},{"label":"Pantalla","value":"6\" IPS FWVGA+"},{"label":"Memoria","value":"2 GB RAM / 32 GB, expandible hasta 64 GB"},{"label":"Procesador","value":"SC9832E Quad Core 1.4GHz"},{"label":"Cámara","value":"8MP trasera, 5MP frontal"},{"label":"Batería","value":"3000 mAh"},{"label":"Función","value":"Dual SIM, WiFi, Bluetooth 4.2, Android Go"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '91A60PLUS';

-- A50PLUS: Celular Noblex A50+ 32GB/2GB (fuente: Noblex/Fravega, Megatone, Previsora del Paraná)
update products set
  description = 'Celular de entrada con pantalla de 5 pulgadas, pensado para tareas basicas como llamadas, mensajeria y redes sociales. Su bateria de 2000 mAh y sistema Android Go ofrecen buen rendimiento para un equipo economico.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"A50+ (A50PLUS)"},{"label":"Peso","value":"185 g"},{"label":"Pantalla","value":"5\" FWVGA (854x489)"},{"label":"Memoria","value":"2 GB RAM / 32 GB, expandible hasta 64 GB"},{"label":"Procesador","value":"Quad Core Cortex A53"},{"label":"Cámara","value":"8MP trasera, 5MP frontal"},{"label":"Batería","value":"2000 mAh"},{"label":"Función","value":"Dual SIM, 4G, WiFi, Bluetooth, Android Go"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'A50PLUS';

-- N4053DBOU: Celular Noblex N405 Dual Sim (fuente: Grupo Marquez, Cetrogar, Brandimia)
update products set
  description = 'Celular basico de pantalla chica pensado exclusivamente para llamadas, mensajes y funciones esenciales. Cuenta con doble SIM y radio FM, con bateria compacta para el uso diario liviano.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"N405 (N4053DBOU)"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"112.5 g"},{"label":"Pantalla","value":"4\" TN WVGA"},{"label":"Memoria","value":"2 GB RAM / 8 GB, expandible hasta 64 GB"},{"label":"Procesador","value":"MT6580M 1.3GHz"},{"label":"Cámara","value":"2MP trasera, 0.3MP frontal"},{"label":"Batería","value":"1500 mAh"},{"label":"Función","value":"Dual SIM, 3G, WiFi, Bluetooth, radio FM, Android Oreo Go"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'N4053DBOU';

-- ALCATEL1PLUS: Celular Alcatel 1 Plus 1GB/16GB Android 11 (fuente: GSM databases, Fravega, Overhard)
update products set
  description = 'Celular de entrada con pantalla de 5 pulgadas, pensado para el uso basico de llamadas, mensajes y navegacion liviana. Su bateria de 2000 mAh y camara trasera de 5MP con seguimiento facial completan un equipo economico con Android 11 Go edition.',
  specs = '[{"label":"Marca","value":"Alcatel"},{"label":"Modelo","value":"1 Plus"},{"label":"Peso","value":"134 g"},{"label":"Pantalla","value":"5\" FWVGA+ (480x960)"},{"label":"Memoria","value":"1 GB RAM / 16 GB, expandible hasta 32 GB"},{"label":"Procesador","value":"MT6739 Quad core 1.28GHz"},{"label":"Cámara","value":"5MP trasera, 2MP frontal"},{"label":"Batería","value":"2000 mAh"},{"label":"Función","value":"WiFi, Bluetooth 4.2, 2G/3G/4G, Android 11 Go edition"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ALCATEL1PLUS';

-- CK43: Minicomponente LG XBOOM CK43 (fuente: LG oficial, Fravega, Hendel)
update products set
  description = 'Minicomponente de 300W pensado para fiestas, con funcion Wireless Party Link para conectar dos equipos LG y lograr sonido envolvente. Permite conectar hasta 3 dispositivos por bluetooth y armar una playlist entre varios, ademas de reproducir CD y sincronizar sonido con el TV.',
  specs = '[{"label":"Marca","value":"LG"},{"label":"Modelo","value":"CK43"},{"label":"Dimensiones","value":"24.1 x 30 x 16.3 cm"},{"label":"Peso","value":"7.4 kg"},{"label":"Potencia","value":"300 W"},{"label":"Función","value":"Wireless Party Link, Multi Bluetooth, TV Sound Sync, radio FM, lector CD, entrada micrófono, ecualizador 20 modos"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CK43';

-- STV3203: Smart TV Siera 32" HD Android (fuente: Mercado Libre, Pixel Store, Casa del Audio)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y sistema Android, pensado para el uso diario con acceso a internet por WiFi. Cuenta con procesador quad core y sonido Dolby, con 2 entradas HDMI y USB.',
  specs = '[{"label":"Marca","value":"Siera"},{"label":"Modelo","value":"STV3203"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Sistema operativo","value":"Android"},{"label":"Función","value":"Procesador quad core 1.45GHz, 1GB RAM/8GB, 2 HDMI, 2 USB, WiFi, Ethernet, Dolby audio 6Wx2"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'STV3203';

-- TDS2150UI: Smart TV Sansei 50" 4K (fuente: Fravega, Mercado Libre, ICBC Mall)
update products set
  description = 'Smart TV de 50 pulgadas con resolucion 4K UHD y sistema VIDAA, pensado para acceder a Netflix, YouTube y Amazon Prime con buena definicion de imagen. Cuenta con sintonizador digital TDA y control parental.',
  specs = '[{"label":"Marca","value":"Sansei"},{"label":"Modelo","value":"TDS2150UI"},{"label":"Dimensiones","value":"111.5 x 70.5 x 22.5 cm (con base)"},{"label":"Peso","value":"9.7 kg"},{"label":"Pantalla","value":"50\" 4K (3840x2160), 60Hz"},{"label":"Sistema operativo","value":"VIDAA"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, TDA, control parental, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TDS2150UI';

-- TS7A232: Tablet Sansei 7" Android 2GB/32GB (fuente: Fravega, Megatone, Toselli Hogar)
update products set
  description = 'Tablet compacta de 7 pulgadas, pensada para navegacion liviana, video y lectura basica. Su bateria de 2500 mAh y conector USB-C la hacen practica para el uso diario, con Android 11 Go edition.',
  specs = '[{"label":"Marca","value":"Sansei"},{"label":"Modelo","value":"TS7A232"},{"label":"Peso","value":"245 g"},{"label":"Pantalla","value":"7\" (1024x600)"},{"label":"Memoria","value":"2 GB RAM / 32 GB, expandible hasta 256 GB"},{"label":"Procesador","value":"Allwinner A133 1.5GHz"},{"label":"Cámara","value":"2MP trasera, 0.3MP frontal"},{"label":"Batería","value":"2500 mAh"},{"label":"Función","value":"WiFi, Bluetooth 4.0, USB-C, Android 11 Go edition"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TS7A232';

-- CDY32SV1232SV1200: Smart TV Candy 32" (fuente: Mercado Libre, Techfield, HTVS)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y diseno frameless, pensado para el uso diario con acceso a Netflix, YouTube y Prime Video. Cuenta con sintonizador digital TDA y conectividad WiFi.',
  specs = '[{"label":"Marca","value":"Candy"},{"label":"Modelo","value":"32SV1200"},{"label":"Color","value":"Gris oscuro"},{"label":"Dimensiones","value":"73.2 x 47.7 x 18.8 cm (con base)"},{"label":"Peso","value":"4.1 kg"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Función","value":"Procesador Mali470 quad core, 3 HDMI 2.0, 2 USB, WiFi, TDA, LAN, 2x5W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CDY32SV1232SV1200';

-- 32TV-SD16T: Smart TV Serie Dorada 32" HD Android (fuente: Fravega, Cordoba Digital, Amecro)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y sistema Android TV 14, pensado para acceder a Netflix, YouTube y Amazon Prime. Incluye soporte VESA para montar en pared y sintonizador con entrada de antena.',
  specs = '[{"label":"Marca","value":"Serie Dorada"},{"label":"Modelo","value":"SD16T"},{"label":"Dimensiones","value":"74 x 44 x 7 cm"},{"label":"Peso","value":"6 kg"},{"label":"Pantalla","value":"32\" HD (1366x768), 60Hz"},{"label":"Sistema operativo","value":"Android TV 14"},{"label":"Función","value":"16GB almacenamiento, 2 HDMI (uno ARC), 2 USB, WiFi, Ethernet, VESA, 2x7W"},{"label":"Garantía","value":"6 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '32TV-SD16T';

-- 42TV-SD16T: Smart TV Serie Dorada 42" HD Android (fuente: Fravega, Confort Jorge, Gazan)
update products set
  description = 'Smart TV de 42 pulgadas con resolucion Full HD y sistema Android TV 14, pensado para el uso diario con acceso a Netflix, YouTube y Amazon Prime. Cuenta con conectividad WiFi y Bluetooth, ademas de puerto Ethernet.',
  specs = '[{"label":"Marca","value":"Serie Dorada"},{"label":"Modelo","value":"SD16T"},{"label":"Dimensiones","value":"95 x 55 x 8 cm"},{"label":"Peso","value":"9 kg"},{"label":"Pantalla","value":"42\" Full HD (1920x1080), 60Hz"},{"label":"Sistema operativo","value":"Android TV 14"},{"label":"Función","value":"1GB RAM/8GB, 2 HDMI, USB, WiFi, Bluetooth, Ethernet"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '42TV-SD16T';
