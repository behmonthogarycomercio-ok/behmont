-- Migracion 036: tanda 18 de specs/descripcion investigados (skill
-- product-specs-research). Primera tanda de la categoria "Electronica"
-- (celulares, Smart TVs, tablets, notebooks de marcas grandes: Samsung,
-- Xiaomi, BGH, Hisense, RCA, TCL, Motorola, Nokia, Alcatel, Blu, Acer).
-- 38 productos confirmados de un pool de 40 candidatos investigados.
-- Se dejaron afuera de esta tanda (sin investigar todavia, no excluidos)
-- las impresoras HP y algunos parlantes/notebooks por limite de busquedas
-- de la sesion; quedan para la proxima tanda.
--
-- Excluidos de esta tanda (2, reportados aparte, no tocados por este SQL):
-- MD50X750 (Noblex Smart TV 50" 4K: no existe ese codigo exacto, la serie
-- real usa prefijos DM/DR/DK50X75.., ninguno coincide con "MD50X750") -
-- A315-24P-R3NV (Acer Aspire 3: nuestra base dice "AMD Ryzen 7 7520U" pero
-- ese chip no existe en la familia Acer A315-24P -solo hay Ryzen 3 7320U y
-- Ryzen 5 7520U-, contradice el dato ya cargado).

-- S26: Celular Samsung Galaxy S26 12GB/256GB (fuente: Samsung oficial, GSMArena, PhoneArena)
update products set
  description = 'Celular de gama alta con pantalla Dynamic AMOLED 2X de 6.3 pulgadas y 120Hz de tasa de refresco, pensado para quienes buscan la ultima tecnologia Samsung. Su triple camara trasera de 50MP permite capturas nitidas en distintas condiciones de luz, y el procesador Snapdragon 8 Elite for Galaxy asegura buen rendimiento para juegos y multitarea.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy S26"},{"label":"Pantalla","value":"6.3\" Dynamic AMOLED 2X, 120Hz"},{"label":"Memoria","value":"12 GB RAM / 256 GB"},{"label":"Procesador","value":"Snapdragon 8 Elite for Galaxy"},{"label":"Cámara","value":"50MP + 12MP + 10MP trasera, 12MP frontal"},{"label":"Batería","value":"4300 mAh"},{"label":"Peso","value":"167 g"},{"label":"Función","value":"5G, WiFi 6E, Bluetooth 5.4, NFC, resistencia Gorilla Glass Victus 2"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'S26';

-- ZFLIP4128: Celular Samsung Galaxy Z Flip 4 128GB/8GB (fuente: TíoMóvil, GSMArena, Samsung oficial)
update products set
  description = 'Celular plegable tipo clamshell con pantalla principal de 6.7 pulgadas y una pantalla exterior de 1.9 pulgadas para notificaciones rapidas. Su diseno compacto al plegarse lo hace facil de transportar, con resistencia al agua IPX8 y camara dual de 12MP.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy Z Flip 4"},{"label":"Pantalla","value":"6.7\" Dynamic AMOLED plegable + 1.9\" exterior"},{"label":"Memoria","value":"8 GB RAM / 128 GB"},{"label":"Procesador","value":"Snapdragon 8+ Gen 1"},{"label":"Cámara","value":"Dual 12MP trasera, 10MP frontal"},{"label":"Batería","value":"3700 mAh, carga rápida 25W"},{"label":"Peso","value":"187 g"},{"label":"Función","value":"Resistencia al agua IPX8, lector de huella lateral"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'ZFLIP4128';

-- UN32T4300AGCZB: Smart TV Samsung 32" HD (fuente: Samsung oficial, Fravega, Megatone)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD, pensado para ambientes chicos o como segunda pantalla. Su sistema operativo Tizen da acceso a Netflix, Prime Video, YouTube y otras apps de streaming, con conexion WiFi y Ethernet.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"UN32T4300AGCZB (Series 4)"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"73.7 x 46.5 x 15 cm"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Sistema operativo","value":"Tizen"},{"label":"Función","value":"2 HDMI, 1 USB, WiFi, Ethernet, 2 parlantes 10W, Dolby Digital Plus"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'UN32T4300AGCZB';

-- A174128: Celular Samsung Galaxy A17 4GB/128GB (fuente: GSMArena, Samsung oficial, PhoneArena)
update products set
  description = 'Celular de gama media con pantalla Super AMOLED de 6.7 pulgadas y 90Hz de tasa de refresco. Su bateria de 5000 mAh ofrece hasta 18 horas de reproduccion de video, y cuenta con triple camara trasera de 50MP mas resistencia IP54 al polvo y salpicaduras.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy A17"},{"label":"Pantalla","value":"6.7\" Super AMOLED, 90Hz"},{"label":"Memoria","value":"4 GB RAM / 128 GB"},{"label":"Procesador","value":"Exynos 1330"},{"label":"Cámara","value":"50MP + 5MP + 2MP trasera, 13MP frontal"},{"label":"Batería","value":"5000 mAh, carga rápida 25W"},{"label":"Función","value":"Resistencia IP54, Gorilla Glass Victus"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'A174128';

-- A178256: Celular Samsung Galaxy A17 8GB/256GB (fuente: GSMArena, Samsung oficial)
update products set
  description = 'Celular de gama media con pantalla Super AMOLED de 6.7 pulgadas, pensado para quienes buscan mas memoria de almacenamiento y RAM dentro de la linea A17. Su bateria de 5000 mAh y camara triple de 50MP acompanan el uso diario intensivo, con marco delgado de 7.5mm.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy A17"},{"label":"Pantalla","value":"6.7\" Super AMOLED, 90Hz"},{"label":"Memoria","value":"8 GB RAM / 256 GB"},{"label":"Procesador","value":"Exynos 1330"},{"label":"Cámara","value":"50MP + 5MP + 2MP trasera, 13MP frontal"},{"label":"Batería","value":"5000 mAh, carga rápida 25W"},{"label":"Función","value":"Resistencia Gorilla Glass Victus, marco de 7.5mm"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'A178256';

-- A375G: Celular Samsung Galaxy A37 5G 6GB/128GB (fuente: Samsung oficial, GSMArena, T-Mobile)
update products set
  description = 'Celular 5G de gama media con pantalla Super AMOLED de 6.7 pulgadas y hasta 1900 nits de brillo maximo. Su triple camara trasera de 50MP con estabilizacion optica y bateria de 5000 mAh con carga rapida de 30W lo hacen apto para uso intensivo diario, con resistencia al agua IP68.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy A37 5G"},{"label":"Pantalla","value":"6.7\" Super AMOLED FHD+"},{"label":"Memoria","value":"6 GB RAM / 128 GB"},{"label":"Procesador","value":"Exynos 1480"},{"label":"Cámara","value":"50MP + 8MP + 5MP trasera, 12MP frontal"},{"label":"Batería","value":"5000 mAh, carga rápida 30W"},{"label":"Función","value":"5G, resistencia IP68, Gorilla Glass Victus+"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'A375G';

-- M235G: Celular Samsung Galaxy M23 5G 128GB/6GB (fuente: Samsung oficial, Xatakamovil, Movilzona)
update products set
  description = 'Celular 5G con pantalla TFT LCD Infinity-V de 6.6 pulgadas y 120Hz de tasa de refresco. Su bateria de 5000 mAh con carga rapida de 25W y triple camara trasera de 50MP lo hacen versatil para el uso diario, con conectividad Dual SIM y ranura para microSD.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy M23 5G"},{"label":"Pantalla","value":"6.6\" TFT LCD FHD+, 120Hz"},{"label":"Memoria","value":"6 GB RAM / 128 GB"},{"label":"Procesador","value":"Snapdragon 750G 5G"},{"label":"Cámara","value":"50MP + 8MP + 2MP trasera, 8MP frontal"},{"label":"Batería","value":"5000 mAh, carga rápida 25W"},{"label":"Peso","value":"198 g"},{"label":"Función","value":"5G, Dual SIM con slot microSD"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'M235G';

-- S21FE: Celular Samsung Galaxy S21 FE 5G 128GB/6GB (fuente: Samsung oficial, GSMArena, Xatakamovil)
update products set
  description = 'Celular de gama alta con pantalla AMOLED de 6.4 pulgadas y 120Hz de tasa de refresco, pensado para quienes buscan fotografia de calidad a buen precio. Su triple camara trasera con estabilizacion optica y bateria de 4500 mAh con carga inalambrica lo posicionan como una opcion completa, con resistencia al agua IP68.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy S21 FE 5G"},{"label":"Pantalla","value":"6.4\" AMOLED FHD+, 120Hz"},{"label":"Memoria","value":"6 GB RAM / 128 GB"},{"label":"Cámara","value":"12MP + 12MP + 8MP trasera, 32MP frontal"},{"label":"Batería","value":"4500 mAh, carga inalámbrica"},{"label":"Función","value":"5G, resistencia IP68, lector de huella bajo pantalla, NFC"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'S21FE';

-- S25: Celular Samsung Galaxy S25 12GB/256GB (fuente: Samsung oficial, GSMArena, Xataka)
update products set
  description = 'Celular de gama alta con pantalla Dynamic AMOLED 2X de 6.2 pulgadas y 120Hz de tasa de refresco, pensado para uso intensivo diario con gran potencia de procesamiento. Su triple camara trasera de 50MP con zoom 3x y bateria de 4000 mAh con carga rapida e inalambrica completan un equipo de gama alta con resistencia IP68.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy S25"},{"label":"Pantalla","value":"6.2\" Dynamic AMOLED 2X, 120Hz"},{"label":"Memoria","value":"12 GB RAM / 256 GB"},{"label":"Procesador","value":"Snapdragon 8 Elite for Galaxy"},{"label":"Cámara","value":"50MP + 12MP + 10MP trasera, 12MP frontal"},{"label":"Batería","value":"4000 mAh, carga rápida 25W e inalámbrica"},{"label":"Función","value":"Resistencia IP68, Gorilla Glass Victus 2, lector de huella bajo pantalla"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'S25';

-- S25ULTRA: Celular Samsung Galaxy S25 Ultra 12GB/256GB (fuente: Samsung oficial, GSMArena, Xataka)
update products set
  description = 'Celular tope de gama con pantalla de 6.9 pulgadas y compatibilidad con S Pen, pensado para quienes buscan la mejor camara y potencia disponible. Su camara cuadruple con sensor principal de 200MP y bateria de 5000 mAh con carga rapida e inalambrica lo posicionan como el modelo insignia de la linea.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy S25 Ultra"},{"label":"Pantalla","value":"6.9\" (1440 x 3120 px)"},{"label":"Memoria","value":"12 GB RAM / 256 GB"},{"label":"Cámara","value":"200MP + 50MP + 10MP + 50MP trasera, 12MP frontal"},{"label":"Batería","value":"5000 mAh, carga rápida e inalámbrica"},{"label":"Peso","value":"218 g"},{"label":"Función","value":"Compatible con S Pen, lector de huella bajo pantalla, resistencia al agua"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'S25ULTRA';

-- A545g: Celular Samsung Galaxy A54 5G 128GB/8GB (fuente: GSMArena, Wikipedia, Samsung)
update products set
  description = 'Celular 5G de gama media-alta con pantalla Super AMOLED de 6.4 pulgadas y 120Hz de tasa de refresco. Su triple camara trasera de 50MP y bateria de 5000 mAh lo hacen apto para el uso diario intensivo, con resistencia al agua y polvo IP67 y proteccion Gorilla Glass 5.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy A54 5G"},{"label":"Pantalla","value":"6.4\" Super AMOLED, 120Hz"},{"label":"Memoria","value":"8 GB RAM / 128 GB"},{"label":"Procesador","value":"Exynos 1380"},{"label":"Cámara","value":"50MP + 12MP + 5MP trasera, 32MP frontal"},{"label":"Batería","value":"5000 mAh"},{"label":"Peso","value":"202 g"},{"label":"Función","value":"5G, resistencia IP67, Gorilla Glass 5"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'A545g';

-- SM-T500NZAEARO: Tablet Samsung Galaxy Tab A7 10.4 3GB/64GB (fuente: Samsung oficial, GSMArena, Amazon)
update products set
  description = 'Tablet de 10.4 pulgadas con resolucion WUXGA+, pensada para ver contenido multimedia y navegar con comodidad. Su bateria de 7040 mAh ofrece buena autonomia, y cuenta con parlantes cuadruples afinados por AKG para una mejor experiencia de sonido.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy Tab A7 (SM-T500)"},{"label":"Pantalla","value":"10.4\" (2000 x 1200 px)"},{"label":"Memoria","value":"3 GB RAM / 64 GB, expandible por microSD"},{"label":"Cámara","value":"8MP trasera, 5MP frontal"},{"label":"Batería","value":"7040 mAh, carga rápida 15W"},{"label":"Peso","value":"476 g"},{"label":"Función","value":"WiFi, Bluetooth 5.0, Android 10"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SM-T500NZAEARO';

-- SM-T220NZSDA: Tablet Samsung Galaxy Tab A7 Lite 8.7 3GB/32GB (fuente: Samsung oficial, GSMArena)
update products set
  description = 'Tablet compacta de 8.7 pulgadas, pensada para uso liviano de navegacion, video y lectura. Su cuerpo de aluminio y bateria de 5100 mAh la hacen practica para llevar a cualquier lado, con almacenamiento expandible hasta 1TB por microSD.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy Tab A7 Lite (SM-T220)"},{"label":"Material","value":"Frente de vidrio, marco y trasera de aluminio"},{"label":"Pantalla","value":"8.7\" (800 x 1340 px)"},{"label":"Memoria","value":"3 GB RAM / 32 GB, expandible hasta 1 TB"},{"label":"Cámara","value":"8MP trasera, 2MP frontal"},{"label":"Batería","value":"5100 mAh"},{"label":"Peso","value":"366 g"},{"label":"Función","value":"WiFi, Bluetooth 5.0, USB-C, Android 11"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SM-T220NZSDA';

-- NP750XFG-KB3AR: Notebook Samsung Galaxy Book3 15.6 i3 8GB/256GB (fuente: Samsung Argentina, Somosrex)
update products set
  description = 'Notebook liviana de 15.6 pulgadas con pantalla Full HD, pensada para trabajo de oficina y uso diario. Su procesador Intel Core i3 de 13a generacion junto con 8GB de RAM y SSD de 256GB ofrecen buena velocidad para tareas cotidianas, con lector de huella y camara HD para videollamadas.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"Galaxy Book3 (NP750XFG-KB3AR)"},{"label":"Color","value":"Plateado"},{"label":"Pantalla","value":"15.6\" Full HD"},{"label":"Procesador","value":"Intel Core i3 13ª generación"},{"label":"Memoria","value":"8 GB RAM / 256 GB SSD"},{"label":"Gráficos","value":"Intel UHD Graphics"},{"label":"Sistema operativo","value":"Windows 11 Home"},{"label":"Función","value":"WiFi 6, Bluetooth, lector de huella, cámara HD"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'NP750XFG-KB3AR';

-- MX-T50/ZB: Sound Tower Samsung MXT50 (fuente: Samsung oficial, Best Buy, Walmart)
update products set
  description = 'Torre de sonido bidireccional de 500W pensada para fiestas o reuniones, con luces LED que se sincronizan al ritmo de la musica. Permite conectar dos dispositivos por bluetooth de forma simultanea y hasta 10 torres adicionales de forma inalambrica para un sonido mas potente, ademas de entrada para microfono para karaoke.',
  specs = '[{"label":"Marca","value":"Samsung"},{"label":"Modelo","value":"MX-T50"},{"label":"Potencia","value":"500 W"},{"label":"Función","value":"Bluetooth multiconexión (2 dispositivos), luces LED, entrada para micrófono, conexión inalámbrica entre torres"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MX-T50/ZB';

-- RED15C: Celular Xiaomi Redmi 15C 8GB/256GB (fuente: Xiaomi oficial, GSMArena)
update products set
  description = 'Celular de entrada con pantalla de 6.9 pulgadas y gran autonomia gracias a su bateria de 6000 mAh, capaz de hasta 82 horas de reproduccion de musica. Cuenta con camara dual de 50MP y resistencia IP64 contra salpicaduras y polvo, ideal para el uso diario sin complicaciones.',
  specs = '[{"label":"Marca","value":"Xiaomi"},{"label":"Modelo","value":"Redmi 15C"},{"label":"Pantalla","value":"6.9\" LCD"},{"label":"Memoria","value":"8 GB RAM / 256 GB"},{"label":"Procesador","value":"Helio G81 Ultra"},{"label":"Cámara","value":"50MP trasera dual"},{"label":"Batería","value":"6000 mAh"},{"label":"Peso","value":"205 g"},{"label":"Función","value":"Resistencia IP64, Dual SIM + microSD, USB-C"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'RED15C';

-- MZBOBXOEU-11: Celular Xiaomi Redmi Note 11 4GB/128GB (fuente: GSMArena, PhoneMore, Xiaomi)
update products set
  description = 'Celular de gama media con pantalla AMOLED de 6.43 pulgadas y hasta 90Hz de tasa de refresco. Su bateria de 5000 mAh con carga rapida de 33W y camara principal de 50MP lo hacen una opcion equilibrada para el uso diario.',
  specs = '[{"label":"Marca","value":"Xiaomi"},{"label":"Modelo","value":"Redmi Note 11"},{"label":"Pantalla","value":"6.43\" AMOLED FHD+, 90Hz"},{"label":"Memoria","value":"4 GB RAM / 128 GB, expandible hasta 1TB"},{"label":"Cámara","value":"50MP + 8MP + macro + profundidad trasera"},{"label":"Batería","value":"5000 mAh, carga rápida 33W"},{"label":"Peso","value":"179 g"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MZBOBXOEU-11';

-- BHR4245GL: Pizarra Xiaomi Mi LCD Writing Tablet 13.5" (fuente: Xiaomi oficial)
update products set
  description = 'Pizarra digital LCD pensada para tomar notas, hacer dibujos o dejar mensajes de forma rapida y sin papel. Sus sensores de presion permiten variar el grosor del trazo, y su bateria de boton dura hasta un ano de uso con el borrado diario.',
  specs = '[{"label":"Marca","value":"Xiaomi"},{"label":"Modelo","value":"Mi LCD Writing Tablet 13.5\" (XMXHB01WC)"},{"label":"Dimensiones","value":"318 x 225 x 7 mm"},{"label":"Peso","value":"0.345 kg"},{"label":"Función","value":"Pantalla LCD sin necesidad de carga frecuente, lapiz magnético incluido, sensores de presión"},{"label":"Accesorios incluidos","value":"Lápiz magnético, pila botón CR2025"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BHR4245GL';

-- B5020UK6: Smart TV BGH 50" UHD VIDAA (fuente: Fravega, Pixel Store, Majul Hogar)
update products set
  description = 'Smart TV de 50 pulgadas con resolucion UHD 4K, pensado para renovar el living con buena definicion de imagen. Cuenta con WiFi incorporado y acceso a Netflix, YouTube y otras apps de streaming, con sintonizador digital incorporado.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B5020UK6"},{"label":"Pantalla","value":"50\" UHD (3840 x 2160)"},{"label":"Dimensiones","value":"112.9 x 71.2 x 28 cm (con base)"},{"label":"Peso","value":"10.4 kg"},{"label":"Función","value":"Procesador quad core, WiFi, HDMI 2.0 con ARC, 2 parlantes 8W, sintonizador digital TDA"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B5020UK6';

-- B4322FS5A: Smart TV BGH 43" Full HD Android (fuente: Fravega, Coopehogar, Megatone)
update products set
  description = 'Smart TV de 43 pulgadas con resolucion Full HD y sistema operativo Android TV, pensado para acceder a todas las apps de streaming con asistente de voz Google. Cuenta con sintonizador digital con funcion de grabacion y modo futbol que mejora sonido e imagen.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B4322FS5A"},{"label":"Dimensiones","value":"96 x 60 x 20 cm"},{"label":"Peso","value":"6 kg"},{"label":"Pantalla","value":"43\" Full HD (1920x1080), 60Hz"},{"label":"Sistema operativo","value":"Android TV 11"},{"label":"Función","value":"WiFi dual band, Google Assistant, Chromecast, HDMI 2.0 ARC, PVR/Timeshift, Dolby Audio"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B4322FS5A';

-- B6026US6G: Smart TV BGH 60" UHD Google TV (fuente: BGH oficial, Fravega, Megatone)
update products set
  description = 'Smart TV de 60 pulgadas con resolucion 4K UHD, panel IPS y soporte para HDR10 y HLG, pensado para una experiencia de imagen mas fiel en cualquier angulo. Su sistema Google TV organiza todo el contenido de streaming en un solo lugar, con sonido Dolby Atmos y control remoto por voz.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B6026US6G"},{"label":"Dimensiones","value":"134.6 x 85.8 x 27.1 cm (con base)"},{"label":"Peso","value":"12.1 kg"},{"label":"Pantalla","value":"60\" UHD 4K, panel IPS, HDR10/HLG, 60Hz"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"4 HDMI 2.1 con ARC, 2 USB, WiFi dual band, Bluetooth 5.1, Dolby Atmos, control remoto por voz"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B6026US6G';

-- B5524US6G: Smart TV BGH 55" UHD Google TV (fuente: BGH oficial, Fravega, Megatone)
update products set
  description = 'Smart TV de 55 pulgadas con resolucion 4K UHD y diseno sin marco (frameless), pensado para una experiencia de imagen mas inmersiva. Su sistema Google TV da acceso a todas las apps de streaming, con sonido DTS Studio Sound y Dolby Atmos.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B5524US6G"},{"label":"Dimensiones","value":"122.5 x 71.7 x 9.2 cm"},{"label":"Peso","value":"10 kg"},{"label":"Pantalla","value":"55\" UHD 4K, panel IPS DLED, 60Hz"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Procesador MT9602, 2GB RAM, HDMI 2.1 con ARC, WiFi dual band, DTS Studio Sound, Dolby Atmos, PVR/Timeshift"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B5524US6G';

-- B6524US6G: Smart TV BGH 65" UHD Google TV (fuente: BGH oficial, Fravega, Megatone)
update products set
  description = 'Smart TV de 65 pulgadas con resolucion 4K UHD y panel IPS, pensado para el living principal de la casa. Su sistema Google TV da acceso a Netflix, Prime Video, YouTube, Disney+ y mas, con 4 entradas HDMI 2.1 y compatibilidad con Bluetooth y Ethernet.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"B6524US6G"},{"label":"Dimensiones","value":"144.5 x 90.7 x 27.2 cm (con base)"},{"label":"Peso","value":"17.8 kg"},{"label":"Pantalla","value":"65\" UHD 4K, panel IPS DLED, 60Hz"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Procesador 1.5GHz, 2GB RAM, 4 HDMI 2.1, 2 USB, WiFi dual band, Bluetooth, Ethernet"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B6524US6G';

-- H4318FH5: Smart TV Hisense 43" (fuente: Fravega, Grupo Marquez, Pixel Store)
update products set
  description = 'Smart TV de 43 pulgadas con resolucion Full HD, pensado para el uso diario con acceso a Netflix y YouTube. Cuenta con procesador quad core y WiFi incorporado, con 3 entradas HDMI y 2 USB para conectar distintos dispositivos.',
  specs = '[{"label":"Marca","value":"Hisense"},{"label":"Modelo","value":"H4318FH5"},{"label":"Dimensiones","value":"97 x 56.5 x 7.8 cm (sin base)"},{"label":"Peso","value":"7.7 kg (sin base), 10.5 kg (con base)"},{"label":"Pantalla","value":"43\" Full HD (1920x1080)"},{"label":"Función","value":"Procesador quad core, WiFi, 3 HDMI, 2 USB, salida óptica digital"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'H4318FH5';

-- H4918FH5: Smart TV Hisense 49" (fuente: Fravega, Falabella, Gasloni)
update products set
  description = 'Smart TV de 49 pulgadas con resolucion Full HD, pensado para el uso diario con buena definicion de imagen y colores vibrantes. Su plataforma Smart 4.0 da acceso a Netflix, YouTube y otras apps, con sintonizador digital con funcion de grabacion.',
  specs = '[{"label":"Marca","value":"Hisense"},{"label":"Modelo","value":"H4918FH5"},{"label":"Pantalla","value":"49\" Full HD (1920x1080), 60Hz"},{"label":"Función","value":"Procesador quad core MTK5659, 2GB RAM, 16GB almacenamiento, 3 HDMI, 2 USB, WiFi, PVR/Timeshift"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'H4918FH5';

-- H3218H5: Smart TV Hisense 32" (fuente: Fravega, Techcel, Mundotecnico)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD, pensado para ambientes chicos o como segunda pantalla del hogar. Cuenta con acceso a YouTube y Netflix mediante su conexion WiFi incorporada, con 3 entradas HDMI y salida de audio optico digital.',
  specs = '[{"label":"Marca","value":"Hisense"},{"label":"Modelo","value":"H3218H5"},{"label":"Dimensiones","value":"73.5 x 43.9 x 7.5 cm"},{"label":"Peso","value":"4.51 kg (con base)"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Función","value":"3 HDMI, 2 USB, WiFi, salida óptica digital, 2 parlantes 12W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'H3218H5';

-- R32AND-F: Smart TV RCA 32" LED HD Android (fuente: RCA oficial, Fravega, Hendel)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD y sistema Android TV, pensado para acceder a Netflix, YouTube y Spotify con Google Assistant integrado. Cuenta con Chromecast incorporado para transmitir contenido desde el celular, ademas de HDR y Micro Dimming para mejorar el contraste.',
  specs = '[{"label":"Marca","value":"RCA"},{"label":"Modelo","value":"R32AND-F"},{"label":"Dimensiones","value":"71.5 x 46.8 x 18 cm (con soporte)"},{"label":"Pantalla","value":"32\" HD (1366x768), 60Hz"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"Google Assistant, Chromecast, HDR, Micro Dimming, 2 HDMI, 1 USB, WiFi, Bluetooth, 2x8W Dolby Digital"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'R32AND-F';

-- C50GL100: Smart TV RCA 50" LED UHD Google TV (fuente: RCA oficial, Megatone, Fravega)
update products set
  description = 'Smart TV de 50 pulgadas con resolucion 4K Ultra HD y sistema Google TV, pensado para quienes buscan recomendaciones de contenido basadas en sus gustos. Incluye Chromecast integrado, Dolby Vision y Dolby Atmos para una experiencia de imagen y sonido envolvente.',
  specs = '[{"label":"Marca","value":"RCA"},{"label":"Modelo","value":"C50GL100"},{"label":"Dimensiones","value":"110.9 x 70.1 x 26.4 cm (con soporte)"},{"label":"Peso","value":"8.3 kg"},{"label":"Pantalla","value":"50\" 4K UHD (3840x2160), 60Hz"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Chromecast, Dolby Vision, Dolby Atmos, 3 HDMI, 1 USB, WiFi, Bluetooth, LAN"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'C50GL100';

-- L43S5400-F: Smart TV TCL 43" LED Full HD Android (fuente: TCL oficial, Fravega, Ortiz & Ortega)
update products set
  description = 'Smart TV de 43 pulgadas con resolucion Full HD y HDR10, pensado para una imagen nitida con buen contraste. Su sistema Android TV con Google Assistant y Chromecast integrado permite controlar por voz y transmitir contenido desde el celular, con sonido Dolby Digital.',
  specs = '[{"label":"Marca","value":"TCL"},{"label":"Modelo","value":"L43S5400-F"},{"label":"Dimensiones","value":"95.5 x 55.5 x 9 cm"},{"label":"Peso","value":"5.7 kg"},{"label":"Pantalla","value":"43\" Full HD (1920x1080), HDR10"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"Procesador quad core 1.1GHz, Google Assistant, Chromecast, 2 HDMI, 2 USB, WiFi, Bluetooth, Dolby Digital 2x9.5W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'L43S5400-F';

-- L55P635-F: Smart TV TCL 55" LED Ultra HD Google TV (fuente: TCL oficial, DisplaySpecifications)
update products set
  description = 'Smart TV de 55 pulgadas con resolucion 4K Ultra HD y tecnologia HDR10, pensado para una experiencia visual envolvente con colores mas vibrantes. Su sistema Google TV con Asistente de Google integrado organiza el contenido de todas las apps, con sonido Dolby Audio en parlantes duales de 15W.',
  specs = '[{"label":"Marca","value":"TCL"},{"label":"Modelo","value":"L55P635-F (55P635)"},{"label":"Pantalla","value":"55\" 4K UHD (3840x2160), HDR10, 60Hz"},{"label":"Sistema operativo","value":"Google TV"},{"label":"Función","value":"Google Assistant, 3 HDMI (uno ARC/eARC), 1 USB, Ethernet, Dolby Audio 2x15W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'L55P635-F';

-- L32S6: Smart TV TCL 32" LED HD Android (fuente: TCL Argentina, Fravega, Mastronardi Hogar)
update products set
  description = 'Smart TV de 32 pulgadas con resolucion HD, pensado para ambientes chicos que buscan acceso a Netflix y YouTube con control por voz mediante Google Assistant. Cuenta con conexion WiFi, entrada LAN y 2 puertos HDMI.',
  specs = '[{"label":"Marca","value":"TCL"},{"label":"Modelo","value":"L32S6"},{"label":"Dimensiones","value":"72.7 x 47.6 x 19 cm (con base)"},{"label":"Peso","value":"4.5 kg"},{"label":"Pantalla","value":"32\" HD (1366x768)"},{"label":"Función","value":"Procesador dual core, Google Assistant, 2 HDMI, 1 USB, LAN, WiFi, audio 2x5W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'L32S6';

-- MT4310: Smart TV Motorola 43" Android (fuente: Fravega, Bringeri, Casa del Audio)
update products set
  description = 'Smart TV de 43 pulgadas con resolucion Full HD y sistema Android TV, pensado para acceder a Netflix, YouTube y Google Play desde el control remoto con microfono para el Asistente de Google. Cuenta con sonido Dolby Digital y conectividad WiFi, Bluetooth y Ethernet.',
  specs = '[{"label":"Marca","value":"Motorola"},{"label":"Modelo","value":"MT4310"},{"label":"Dimensiones","value":"95.5 x 55.3 x 7.9 cm"},{"label":"Peso","value":"5.5 kg"},{"label":"Pantalla","value":"43\" Full HD (1920x1080), 60Hz"},{"label":"Sistema operativo","value":"Android TV"},{"label":"Función","value":"Procesador quad core 1.5GHz, 1GB RAM, 8GB almacenamiento, Google Assistant, 3 HDMI, 2 USB, WiFi, Bluetooth, Ethernet"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MT4310';

-- NOKIA2.3: Celular Nokia 2.3 32GB/2GB (fuente: HMD oficial, GSMArena, Xatakandroid)
update products set
  description = 'Celular de entrada con pantalla de 6.2 pulgadas y Android One, pensado para quienes buscan un equipo simple y con actualizaciones de software garantizadas. Su bateria de 4000 mAh y doble camara trasera de 13MP+2MP lo hacen apto para el uso basico diario.',
  specs = '[{"label":"Marca","value":"Nokia"},{"label":"Modelo","value":"2.3"},{"label":"Pantalla","value":"6.2\" HD+"},{"label":"Memoria","value":"2 GB RAM / 32 GB, expandible por microSD"},{"label":"Procesador","value":"Mediatek Helio A22"},{"label":"Cámara","value":"13MP + 2MP trasera, 5MP frontal"},{"label":"Batería","value":"4000 mAh"},{"label":"Peso","value":"183 g"},{"label":"Función","value":"Android One, reconocimiento facial, Bluetooth 5.0, radio FM"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'NOKIA2.3';

-- 3HPLUS: Celular Alcatel 3H Plus 3GB/64GB (fuente: Megatone, Garbarino, GSMChoice)
update products set
  description = 'Celular de entrada con pantalla de 6.52 pulgadas y bateria de 5000 mAh, pensado para el uso diario con buena autonomia. Su camara trasera de 50MP+2MP permite fotos de buena calidad para su segmento, con procesador octa core y Android 12.',
  specs = '[{"label":"Marca","value":"Alcatel"},{"label":"Modelo","value":"3H Plus (6027A)"},{"label":"Color","value":"Gris espacial"},{"label":"Pantalla","value":"6.52\" HD+ (720x1600)"},{"label":"Memoria","value":"3 GB RAM / 64 GB, expandible hasta 512GB"},{"label":"Procesador","value":"Octa core"},{"label":"Cámara","value":"50MP + 2MP trasera, 5MP frontal"},{"label":"Batería","value":"5000 mAh"},{"label":"Peso","value":"190 g"},{"label":"Función","value":"Android 12"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '3HPLUS';

-- 6025A: Celular Alcatel 3H 3GB/64GB (fuente: Smart-GSM, GSMChoice, Previsora del Paraná)
update products set
  description = 'Celular de entrada con pantalla de 6.52 pulgadas y triple camara trasera de 13MP, pensado para el uso diario basico. Su bateria de 4000 mAh con carga rapida y lector de huella lo hacen practico, con Android 11.',
  specs = '[{"label":"Marca","value":"Alcatel"},{"label":"Modelo","value":"3H (6025A)"},{"label":"Pantalla","value":"6.52\" HD+ (720x1600)"},{"label":"Memoria","value":"3 GB RAM / 64 GB, expandible hasta 512GB"},{"label":"Procesador","value":"MTK6762D Octa Core"},{"label":"Cámara","value":"13MP + 2MP + 2MP trasera, 5MP frontal"},{"label":"Batería","value":"4000 mAh, carga rápida"},{"label":"Peso","value":"180 g"},{"label":"Función","value":"Lector de huella, Android 11"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '6025A';

-- G71+: Celular Blu G71+ 64GB/4GB (fuente: Amazon, GSMChoice, Mega Hogar)
update products set
  description = 'Celular con pantalla de 6.5 pulgadas y bateria de gran capacidad para varios dias de uso, pensado para quienes priorizan la autonomia. Su triple camara con inteligencia artificial de 13MP y procesador octa core completan un equipo de entrada bien equipado.',
  specs = '[{"label":"Marca","value":"Blu"},{"label":"Modelo","value":"G71+"},{"label":"Pantalla","value":"6.5\" HD+ (720x1600)"},{"label":"Memoria","value":"4 GB RAM / 64 GB, expandible por microSD"},{"label":"Procesador","value":"Octa core 1.8GHz Cortex-A75"},{"label":"Cámara","value":"13MP triple trasera, 13MP frontal"},{"label":"Batería","value":"4900 mAh"},{"label":"Peso","value":"175 g"},{"label":"Función","value":"Dual SIM, Android 11, 4G LTE"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'G71+';

-- C5LMAX: Celular Blu C5L MAX 32GB/2GB (fuente: GSMArena, Amazon, Kalvo)
update products set
  description = 'Celular de entrada con pantalla de 5.7 pulgadas, pensado para el uso basico de llamadas, mensajes y navegacion liviana. Su procesador quad core y bateria de 2000 mAh acompanan un equipo compacto y economico con Android 11 Go edition.',
  specs = '[{"label":"Marca","value":"Blu"},{"label":"Modelo","value":"C5L Max"},{"label":"Pantalla","value":"5.7\" (480x960)"},{"label":"Memoria","value":"2 GB RAM / 32 GB"},{"label":"Procesador","value":"Quad core 1.4GHz Cortex-A53"},{"label":"Cámara","value":"5MP trasera, 2MP frontal"},{"label":"Batería","value":"2000 mAh"},{"label":"Peso","value":"174 g"},{"label":"Función","value":"Dual SIM, Android 11 Go edition"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'C5LMAX';

-- AL14-32P-38H9: Notebook Acer Aspire Lite 14 Core 3 N355 8GB/256GB (fuente: Acer oficial, LaptopMedia, Villman)
update products set
  description = 'Notebook liviana de 14 pulgadas con pantalla IPS WUXGA, pensada para trabajo diario y estudio con buena portabilidad (1.2 kg). Su procesador Intel Core 3 N355 y 8GB de RAM LPDDR5 ofrecen buena respuesta para tareas de oficina y navegacion, con conectividad WiFi 6E y carga por USB-C.',
  specs = '[{"label":"Marca","value":"Acer"},{"label":"Modelo","value":"Aspire Lite 14 (AL14-32P)"},{"label":"Peso","value":"1.2 kg"},{"label":"Pantalla","value":"14\" WUXGA (1920x1200) IPS"},{"label":"Procesador","value":"Intel Core 3 N355"},{"label":"Memoria","value":"8 GB RAM LPDDR5 / 256 GB SSD"},{"label":"Gráficos","value":"Intel UHD Graphics"},{"label":"Sistema operativo","value":"Windows 11"},{"label":"Función","value":"WiFi 6E, Bluetooth 5.1, USB-C con carga"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AL14-32P-38H9';
