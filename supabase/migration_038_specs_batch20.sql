-- Migracion 038: tanda 20 de specs/descripcion investigados (skill
-- product-specs-research). Notebooks (Noblex, HP) y Smart TVs (Philco,
-- Noblex, Hitachi) de la categoria "Electronica". 18 productos confirmados
-- de 20 candidatos investigados.
--
-- Excluidos de esta tanda (2, reportados aparte, no tocados por este SQL):
-- DK65X655 (Noblex Smart TV 65" 4K: existen variantes reales DK65X6500 y
-- DK65X6550PI con specs distintas -contraste, brillo, bluetooth-, no se
-- puede confirmar a cual corresponde el codigo truncado sin arriesgar un
-- dato erroneo) - 14603515 (Noblex Smart TV 55" 4K: codigo puramente
-- numerico sin relacion a ningun modelo real de la marca, sin fuente).

-- N14X3000: Notebook Noblex 14.1" Core i3-1115G4 8GB/256GB (fuente: Noblex/TopComputacion, Megatone)
update products set
  description = 'Notebook de 14.1 pulgadas con pantalla Full HD, pensada para trabajo de oficina, estudio y uso diario. Su procesador Intel Core i3 de 11a generacion con 8GB de RAM y SSD NVMe de 256GB ofrecen buena velocidad de arranque y respuesta, con Windows 11 preinstalado.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"N14X3000"},{"label":"Color","value":"Azul oscuro"},{"label":"Peso","value":"2 kg"},{"label":"Pantalla","value":"14.1\" Full HD"},{"label":"Procesador","value":"Intel Core i3-1115G4 (hasta 4.1 GHz)"},{"label":"Memoria","value":"8 GB DDR4 / 256 GB SSD NVMe"},{"label":"Gráficos","value":"Intel UHD Graphics"},{"label":"Sistema operativo","value":"Windows 11 Home"},{"label":"Función","value":"WiFi, Bluetooth, cámara 2.0MP, USB-C, HDMI"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'N14X3000';

-- N14X1010: Notebook Noblex 14" Celeron N4020C 4GB/128GB Win11 (fuente: Noblex/Fravega, Megatone, TopComputacion)
update products set
  description = 'Notebook de 14 pulgadas pensada para tareas basicas de navegacion, documentos y multimedia liviana. Su procesador Intel Celeron N4020C junto con SSD de 128GB ofrecen tiempos de carga rapidos para el uso diario, con Windows 11 preinstalado.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"N14X1010"},{"label":"Peso","value":"1.3 kg"},{"label":"Pantalla","value":"14\" HD (1366x768)"},{"label":"Procesador","value":"Intel Celeron N4020C"},{"label":"Memoria","value":"4 GB RAM / 128 GB SSD"},{"label":"Sistema operativo","value":"Windows 11"},{"label":"Función","value":"WiFi, Bluetooth, cámara web 2.0MP, 2 USB, HDMI"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'N14X1010';

-- N14W21: Notebook Noblex 14.1" Celeron N3350 4GB/500GB Win10 (fuente: Fravega, Photostore, Brandimia)
update products set
  description = 'Notebook de 14.1 pulgadas pensada para el uso diario basico de navegacion y documentos. Su procesador Intel Celeron N3350 y disco rigido de 500GB acompanan tareas livianas, con Windows 10 Home preinstalado.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"N14W21 (N14WD21)"},{"label":"Color","value":"Plata"},{"label":"Peso","value":"1.45 kg"},{"label":"Pantalla","value":"14.1\" (1366x768)"},{"label":"Procesador","value":"Intel Celeron N3350 (hasta 2.4 GHz)"},{"label":"Memoria","value":"4 GB RAM / 500 GB HDD"},{"label":"Gráficos","value":"Intel HD Graphics 500"},{"label":"Sistema operativo","value":"Windows 10 Home"},{"label":"Función","value":"Bluetooth 4.0, cámara 2.0MP, lector de tarjetas SD"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'N14W21';

-- HPN4020: Notebook HP 240 G7 Celeron N4020 14" 8GB/1TB (fuente: HP oficial, Fravega, Amazon)
update products set
  description = 'Notebook de 14 pulgadas pensada para tareas de oficina y estudio, con buena capacidad de almacenamiento para archivos y documentos. Su procesador Intel Celeron N4020 y 8GB de RAM ofrecen un rendimiento adecuado para uso cotidiano.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"240 G7"},{"label":"Peso","value":"1.52 kg"},{"label":"Pantalla","value":"14\" HD antirreflejo (1366x768)"},{"label":"Procesador","value":"Intel Celeron N4020"},{"label":"Memoria","value":"8 GB DDR4 / 1 TB HDD"},{"label":"Gráficos","value":"Intel UHD Graphics 600"},{"label":"Función","value":"Cámara HP TrueVision HD, 2 USB 3.1, 1 USB 2.0, HDMI, Ethernet"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HPN4020';

-- N4000: Notebook HP 240G7 Celeron N4000 14" 4GB/500GB (fuente: HP oficial, Fravega, PcComponentes)
update products set
  description = 'Notebook de 14 pulgadas pensada para tareas de oficina basicas, con procesador Intel Celeron N4000 y disco rigido de 500GB. Ofrece conectividad WiFi y Bluetooth para el uso diario en el hogar u oficina.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"240 G7"},{"label":"Pantalla","value":"14\" HD antirreflejo (1366x768)"},{"label":"Procesador","value":"Intel Celeron N4000 (hasta 2.6 GHz)"},{"label":"Memoria","value":"4 GB DDR4 / 500 GB HDD"},{"label":"Gráficos","value":"Intel UHD Graphics 600"},{"label":"Función","value":"WiFi 802.11b/g/n, Bluetooth 4.2, 2 USB 3.1, 1 USB 2.0, HDMI, Ethernet"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'N4000';

-- PLD32HS21A: Smart TV Philco 32" HD (fuente: Philco/Fravega, Pixel Store)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD, pensado para el uso diario con acceso a Netflix, YouTube y Amazon Prime Video mediante WiFi. Incluye control parental y salida de audio optico digital.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PLD32HS21A"},{"label":"Dimensiones","value":"73.1 x 43.5 x 8 cm"},{"label":"Pantalla","value":"32\" HD (1366x768), 60Hz"},{"label":"Función","value":"2 HDMI, 2 USB, WiFi, NFC, salida óptica, 2 parlantes 6W, control parental"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PLD32HS21A';

-- PLD40FS23CH: Smart TV Philco 40" FHD Android (fuente: Philco/Fravega, Cetrogar, Garbarino)
update products set
  description = 'Smart TV de 40 pulgadas con resolucion Full HD y sistema Android TV, pensado para acceder a Netflix, Disney+, HBO Max y mas apps con control por voz de Google Assistant. Cuenta con sintonizador digital TDA y conectividad WiFi y Bluetooth.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PLD40FS23CH"},{"label":"Dimensiones","value":"90.4 x 51.4 x 8 cm"},{"label":"Pantalla","value":"40\" Full HD (1920x1080), 60Hz"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"Google Assistant, 3 HDMI, 2 USB, WiFi, Bluetooth, TDA, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PLD40FS23CH';

-- PLD55US9A1: Smart TV Philco 55" 4K (fuente: Fravega, Petenatti, Web Electro)
update products set
  description = 'Smart TV de 55 pulgadas con resolucion 4K y tecnologia HDR, pensado para una imagen mas nitida y con mejor contraste. Cuenta con acceso a Netflix y otras apps mediante WiFi, con sonido Dolby Audio.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PLD55US9A1"},{"label":"Dimensiones","value":"140 x 72.8 x 16 cm"},{"label":"Pantalla","value":"55\" 4K (3840x2160), HDR"},{"label":"Función","value":"2 HDMI, 2 USB, WiFi, Dolby Audio"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PLD55US9A1';

-- PLD43FS24A: Smart TV Philco 43" FHD Android (fuente: Philco oficial, Cetrogar, Megatone)
update products set
  description = 'Smart TV de 43 pulgadas con resolucion Full HD y sistema Android, pensado para acceder a Netflix, YouTube, Disney+ y Prime Video. Cuenta con conectividad WiFi y 2 puertos HDMI y USB.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PLD43FS24A"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"96.5 x 61.1 x 18.2 cm (con base)"},{"label":"Peso","value":"6.2 kg"},{"label":"Pantalla","value":"43\" Full HD"},{"label":"Sistema operativo","value":"Android"},{"label":"Función","value":"2 HDMI, 2 USB, WiFi"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PLD43FS24A';

-- DM32X700: Smart TV Noblex 32" HD Android (fuente: Noblex/Fravega, Bidcom, Megahogar)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y sistema Android TV, pensado para acceder a Netflix, YouTube Kids y Amazon Prime Video con control por voz de Google Assistant. Incluye Chromecast incorporado para transmitir contenido desde el celular.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"DM32X700 (DM32X7000)"},{"label":"Dimensiones","value":"83 x 52.4 x 13.7 cm"},{"label":"Peso","value":"5.7 kg"},{"label":"Pantalla","value":"32\" HD (1366x768), 60Hz"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"Chromecast integrado, Google Assistant, 2 HDMI, 2 USB, WiFi, 2x8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DM32X700';

-- DJ43X510: Smart TV Noblex 43" FHD (fuente: Petenatti, Pixel Store, Fravega)
update products set
  description = 'Smart TV de 43 pulgadas con resolucion Full HD, pensado para acceder a Netflix, YouTube y Amazon Prime Video mediante WiFi. Cuenta con sintonizador digital TDA incorporado y salida de audio optico.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"DJ43X510 (DJ43X5100)"},{"label":"Dimensiones","value":"111.4 x 63.2 x 12.8 cm"},{"label":"Peso","value":"8 kg"},{"label":"Pantalla","value":"43\" Full HD (1920x1080), 60Hz"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, TDA, salida óptica, 2x7W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DJ43X510';

-- DV75X8580: Smart TV Noblex 75" 4K Android (fuente: Noblex oficial, Fravega, Musimundo)
update products set
  description = 'Smart TV de 75 pulgadas con resolucion 4K UHD y sistema Google TV, pensado para el living principal con acceso a Netflix, YouTube y Disney+ integrados. Cuenta con Bluetooth, Miracast y control parental.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"DV75X8580"},{"label":"Dimensiones","value":"167.6 x 104.4 x 37 cm (con base)"},{"label":"Peso","value":"23 kg"},{"label":"Pantalla","value":"75\" 4K UHD (3840x2160), 60Hz"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"4 HDMI, 2 USB, WiFi, Bluetooth, Miracast, control parental, 2x15W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DV75X8580';

-- LE504KSM: Smart TV Hitachi 50" 4K (fuente: Hitachi/Fravega, Megatone, Radio Victoria)
update products set
  description = 'Smart TV de 50 pulgadas con resolucion 4K UHD y pantalla sin bordes, pensado para una experiencia mas inmersiva. Su sistema Android TV con control por voz da acceso a Netflix, YouTube y demas apps, con tecnologia HDR10 y microdimming para mejorar el contraste.',
  specs = '[{"label":"Marca","value":"Hitachi"},{"label":"Modelo","value":"LE504KSMART"},{"label":"Dimensiones","value":"112.7 x 71.5 x 23.9 cm (con base)"},{"label":"Peso","value":"10 kg"},{"label":"Pantalla","value":"50\" 4K UHD (3840x2160), HDR10"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, Bluetooth 5.0, Ethernet, Chromecast, Dolby Audio 2x9.5W, microdimming"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LE504KSM';

-- LE554KSMART: Smart TV Hitachi 55" 4K Android (fuente: Hitachi/Fravega, Megatone, Radio Victoria)
update products set
  description = 'Smart TV de 55 pulgadas con resolucion 4K UHD y sistema Android TV, pensado para reproducir Netflix, Disney+ y Prime Video en calidad UHD. Cuenta con Chromecast incorporado y pantalla sin bordes para una experiencia mas inmersiva.',
  specs = '[{"label":"Marca","value":"Hitachi"},{"label":"Modelo","value":"LE554KSMART"},{"label":"Dimensiones","value":"122.7 x 76.3 x 25.1 cm (con base)"},{"label":"Peso","value":"11.6 kg"},{"label":"Pantalla","value":"55\" 4K UHD (3840x2160)"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, Bluetooth 5.0, Ethernet, Chromecast, Dolby Audio 2x9.5W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LE554KSMART';

-- LE654KSM: Smart TV Hitachi 65" 4K (fuente: Hitachi/Fravega, Megatone, Radio Victoria)
update products set
  description = 'Smart TV de 65 pulgadas con resolucion 4K UHD y sistema Android TV, pensado para el living principal con buena definicion de imagen. Cuenta con microdimming y HDR para mayor contraste, ademas de sonido Dolby Atmos y control por voz de Google Assistant.',
  specs = '[{"label":"Marca","value":"Hitachi"},{"label":"Modelo","value":"LE654KSMART"},{"label":"Dimensiones","value":"145 x 84 x 8.6 cm"},{"label":"Peso","value":"17.2 kg"},{"label":"Pantalla","value":"65\" 4K UHD (3840x2160), HDR, 60Hz"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, Bluetooth 5.0, Google Assistant, Dolby Atmos 2x9.5W, microdimming"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LE654KSM';

-- LE32SMART21: Smart TV Hitachi 32" HD Android (fuente: Hitachi/Fravega, Start, Garbarino)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y sistema Android, pensado para acceder a apps de streaming con buena definicion. Cuenta con sintonizador digital TDA incorporado y sonido Dolby Audio.',
  specs = '[{"label":"Marca","value":"Hitachi"},{"label":"Modelo","value":"CDH-LE32SMART21"},{"label":"Dimensiones","value":"72.4 x 47.5 x 18 cm (con soporte)"},{"label":"Pantalla","value":"32\" HD (1366x768), 60Hz"},{"label":"Sistema operativo","value":"Android"},{"label":"Función","value":"2 HDMI, 1 USB, WiFi, Bluetooth 5.0, TDA, Dolby Audio"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LE32SMART21';

-- CDH-LE39SMART14: Smart TV Hitachi 39" (fuente: Disco, Radio Victoria, Mundotecnico)
update products set
  description = 'Smart TV de 39 pulgadas con resolucion Full HD, pensado para el uso diario con acceso a internet por WiFi. Cuenta con 2 entradas HDMI y 2 USB, con salida de audio optico digital.',
  specs = '[{"label":"Marca","value":"Hitachi"},{"label":"Modelo","value":"CDH-LE39SMART14"},{"label":"Pantalla","value":"39\" Full HD (1920x1080)"},{"label":"Función","value":"2 HDMI, 2 USB, WiFi, salida óptica, 2 parlantes 8W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CDH-LE39SMART14';

-- CDH-LE49SMART14: Smart TV Hitachi 49" (fuente: Fravega, Radio Victoria, Compumix)
update products set
  description = 'Smart TV de 49 pulgadas con resolucion Full HD y sistema Android, pensado para el uso diario con sintonizador digital TDA incorporado. Cuenta con conectividad WiFi y puerto LAN para conexion de red.',
  specs = '[{"label":"Marca","value":"Hitachi"},{"label":"Modelo","value":"CDH-LE49SMART14"},{"label":"Dimensiones","value":"110.4 x 67.9 x 9.2 cm"},{"label":"Pantalla","value":"49\" Full HD (1920x1080)"},{"label":"Sistema operativo","value":"Android"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, LAN, TDA, 2x10W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CDH-LE49SMART14';
