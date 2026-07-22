-- Migracion 041: tanda 23 de specs/descripcion investigados (skill
-- product-specs-research). Soportes de TV (Philco, Kanji), parlantes party
-- Stromberg y Harrison/Kanji, auriculares Kanji y Noblex, de la categoria
-- "Electronica". 17 productos confirmados de 21 candidatos investigados.
--
-- Excluidos de esta tanda (4, reportados aparte, no tocados por este SQL):
-- TV3255F (Philco soporte: nuestra base dice "movil" pero todas las fuentes
-- confirman que el sufijo "F" de Philco es Fijo -el movil es TV3255M-,
-- contradice el dato ya cargado) - ES-LCB040, ES-LCI80 (Esoporter: existen
-- varios modelos similares -LCB140, LCB240, LCB280- con codigos numericos
-- distintos a los nuestros, sin poder confirmar cual corresponde
-- exactamente) - SC-10-LUXTK-NE (Stromberg "Lux Tek": no existe ese nombre
-- en el catalogo de Stromberg, solo modelos similares de 20W sin ese
-- nombre especifico).

-- TV3255B: Soporte Basculante Philco para TV 32-55 (fuente: Philco/Newsan, Fravega, Cetrogar)
update products set
  description = 'Soporte basculante para TV LED/LCD de 32 a 55 pulgadas, pensado para montar en pared con inclinacion ajustable. Su distancia a la pared de 20.5mm favorece la ventilacion del equipo, con estructura de acero e incluye kit de tornillos para TV y pared.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"TV3255B"},{"label":"Color","value":"Negro"},{"label":"Material","value":"Acero"},{"label":"Tamaño de TV","value":"32\" a 55\""},{"label":"Función","value":"VESA 200x200/300x300/400x200/400x400, inclinación 0-8°, peso admitido 35 kg, incluye kit de tornillos"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'TV3255B';

-- PG1463M: Soporte móvil Philco para TV 14-63 (fuente: Philco/Fravega, Cetrogar, ICBC Mall)
update products set
  description = 'Soporte movil para TV de 14 a 63 pulgadas, pensado para ajustar la posicion y el angulo de vision. Permite girar hasta 180 grados e inclinar hasta 15 grados, con distancia a la pared regulable entre 30 y 385mm.',
  specs = '[{"label":"Marca","value":"Philco"},{"label":"Modelo","value":"PG1463M (94PG1463MPI)"},{"label":"Peso","value":"1.8 kg (neto)"},{"label":"Tamaño de TV","value":"14\" a 63\""},{"label":"Función","value":"VESA hasta 400x400, inclinación 15°, giro 180°, distancia a pared 30-385mm, peso admitido 30 kg"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PG1463M';

-- KJH-WMF65: Soporte de TV Fijo Kanji 32-65 (fuente: Kanji oficial, Unimax, Manci Hogar)
update products set
  description = 'Soporte fijo para TV de 32 a 65 pulgadas, pensado para montar en pared de forma compacta sin ajustes de angulo. Su instalacion es rapida e incluye el kit de tornillos correspondiente.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-WMF65"},{"label":"Tamaño de TV","value":"32\" a 65\""},{"label":"Función","value":"VESA 200x200 a 600x600, peso admitido 50 kg, montaje fijo, incluye kit de instalación"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-WMF65';

-- KJH-WMBS70: Soporte TV Brazo Doble Kanji 32-70 50kg (fuente: Cube Comunicaciones, Grupo Marquez)
update products set
  description = 'Soporte de brazo doble articulado para TV de 32 a 70 pulgadas, pensado para ajustar la inclinacion y el angulo de vision. Permite alejar la pantalla de la pared y orientarla segun la posicion desde donde se mira.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-WMBS70"},{"label":"Tamaño de TV","value":"32\" a 70\""},{"label":"Función","value":"VESA 500x600, peso admitido 50 kg, brazo doble articulado, inclinable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-WMBS70';

-- VORTEX: Parlante party Stromberg 100W (fuente: Stromberg oficial, ICBC Mall, La Anónima)
update products set
  description = 'Parlante party portatil con subwoofer de 15 pulgadas, pensado para fiestas al aire libre o en el hogar. Cuenta con funcion karaoke, tecnologia TWS para conectar dos parlantes, luces LED integradas y manija con ruedas para trasladarlo facilmente.',
  specs = '[{"label":"Marca","value":"Stromberg"},{"label":"Modelo","value":"Vortex"},{"label":"Dimensiones","value":"69 x 41 x 33.5 cm"},{"label":"Peso","value":"8.2 kg"},{"label":"Potencia","value":"100 W RMS"},{"label":"Función","value":"Subwoofer 15\" + tweeter 3\", Bluetooth con TWS, AUX, entrada micrófono, radio FM, karaoke, luces LED, batería 11h"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'VORTEX';

-- DIGITY: Parlante party Stromberg 20W (fuente: Stromberg oficial, La Prida Hogar, Cumbre Megacompu)
update products set
  description = 'Parlante portatil compacto pensado para el uso diario o reuniones chicas, con entrada para microfono y control independiente de su volumen. Cuenta con tecnologia TWS para emparejar con otro parlante igual y luces LED que acompanan el ritmo de la musica.',
  specs = '[{"label":"Marca","value":"Stromberg"},{"label":"Modelo","value":"Digity 2"},{"label":"Dimensiones","value":"38 x 22 x 20 cm"},{"label":"Potencia","value":"20 W RMS"},{"label":"Función","value":"Altavoz 1.8\", Bluetooth con TWS, AUX, entrada micrófono con control de eco y volumen, luces LED, entrada trípode"},{"label":"Batería","value":"1500 mAh (6h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'DIGITY';

-- SC-02ADVAN-NE: Parlante portátil Stromberg Advance 50W powerbank (fuente: Mercado Libre, Tecnobel, Habitar)
update products set
  description = 'Parlante portatil con funcion powerbank para cargar el celular, pensado para el uso diario y actividades al aire libre. Su tecnologia Deep Bass y ecualizador digital ofrecen un sonido potente pese a su tamano compacto.',
  specs = '[{"label":"Marca","value":"Stromberg"},{"label":"Modelo","value":"Advance"},{"label":"Color","value":"Negro"},{"label":"Dimensiones","value":"22 x 48 x 21 cm"},{"label":"Potencia","value":"50 W RMS"},{"label":"Función","value":"2 parlantes de 4\", Bluetooth, USB, AUX, radio FM, ecualizador digital, función powerbank"},{"label":"Batería","value":"4000 mAh (~4h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SC-02ADVAN-NE';

-- JOLT: Parlante party Stromberg 25W subwoofer (fuente: Stromberg oficial, Casa Martinez Audio, Sampietro)
update products set
  description = 'Parlante portatil con subwoofer de 8 pulgadas, pensado para fiestas o reuniones chicas. Cuenta con tecnologia TWS para conectar con otro parlante igual y lograr sonido estereo, con luces LED que siguen el ritmo de la musica.',
  specs = '[{"label":"Marca","value":"Stromberg"},{"label":"Modelo","value":"Jolt"},{"label":"Dimensiones","value":"34.5 x 23 x 17.5 cm"},{"label":"Potencia","value":"25 W RMS"},{"label":"Función","value":"Subwoofer 8\", Bluetooth con TWS, AUX 3.5 y 6.5mm, luces LED audiorítmicas"},{"label":"Batería","value":"1800 mAh (5h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'JOLT';

-- SC-02-FLEXY-NE: Parlante party Stromberg Flexy 100W (fuente: Cetrogar, Fravega, Central Electrohogar)
update products set
  description = 'Parlante portatil tipo carrito con woofer de 15 pulgadas, pensado para fiestas y eventos. Cuenta con entrada para microfono y guitarra, control de bajos y agudos, ecualizador digital y manija telescopica para trasladarlo con comodidad.',
  specs = '[{"label":"Marca","value":"Stromberg"},{"label":"Modelo","value":"Flexy"},{"label":"Dimensiones","value":"70 x 45 x 36 cm"},{"label":"Potencia","value":"100 W RMS"},{"label":"Función","value":"Woofer 15\" + tweeter 3\", Bluetooth, USB, radio FM, entrada micrófono/guitarra, ecualizador digital, luces, manija telescópica"},{"label":"Batería","value":"2200 mAh (4h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SC-02-FLEXY-NE';

-- BYRON: Parlante portátil Stromberg 10W (fuente: Stromberg/Fravega, Pardo, Multigamma)
update products set
  description = 'Parlante portatil compacto con diseno de frente en tela, pensado para el uso diario en casa u oficina. Cuenta con tecnologia TWS para emparejar con otro parlante igual y lograr sonido estereo, con buena autonomia de bateria.',
  specs = '[{"label":"Marca","value":"Stromberg"},{"label":"Modelo","value":"Byron"},{"label":"Peso","value":"1 kg"},{"label":"Dimensiones","value":"18 x 35 x 16 cm"},{"label":"Potencia","value":"10 W RMS"},{"label":"Función","value":"2 tweeters de 3\", Bluetooth con TWS, USB, SD, radio FM"},{"label":"Batería","value":"1200 mAh (8h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BYRON';

-- SP-KJA111OF: Parlante party Harrison Acid Max 5500W PMPO (fuente: Kanji oficial, Garbarino, Powerpc)
update products set
  description = 'Parlante party portatil con parlante de 15 pulgadas mas tweeter de 2.5 pulgadas, pensado para fiestas y eventos al aire libre. Cuenta con luz disco LED, entrada para guitarra y microfono, radio FM y bateria recargable, con control remoto incluido.',
  specs = '[{"label":"Marca","value":"Harrison (Kanji)"},{"label":"Modelo","value":"Acid Max"},{"label":"Dimensiones","value":"70 x 40 x 35 cm"},{"label":"Voltaje","value":"220V, 50-60Hz"},{"label":"Potencia","value":"5500 W PMPO"},{"label":"Función","value":"Parlante 15\"+2.5\", Bluetooth, USB, SD, AUX, entrada guitarra/micrófono, radio FM, luz disco LED, control remoto, ecualizador"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SP-KJA111OF';

-- KJ-PARADISMAX: Parlante party Harrison Paradis Max 900W PMPO (fuente: Megatone, LH Confort, Fava)
update products set
  description = 'Parlante party tipo torre pensado para fiestas y eventos al aire libre, con bateria interna recargable. Incluye control de graves y agudos, ecualizador, luces LED y control remoto, con entrada para microfono.',
  specs = '[{"label":"Marca","value":"Harrison (Kanji)"},{"label":"Modelo","value":"Paradis Max"},{"label":"Peso","value":"2 kg"},{"label":"Dimensiones","value":"27 x 75 x 27 cm"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"900 W PMPO"},{"label":"Función","value":"Bluetooth, USB, SD, AUX, radio FM, control graves/agudos, ecualizador, luces LED, control remoto, entrada micrófono, batería interna"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-PARADISMAX';

-- SP-KJAMAMMA: Parlante party Harrison Mega Mamma 5000W PMPO (fuente: Kanji oficial, LH Confort, InterShop)
update products set
  description = 'Parlante party de gran tamano con multiples parlantes de distintos diametros, pensado para eventos grandes al aire libre. Incluye microfono, control remoto y bateria interna, con conectividad USB, Bluetooth y lector de tarjeta TF.',
  specs = '[{"label":"Marca","value":"Harrison (Kanji)"},{"label":"Modelo","value":"Mega Mamma (SP-KJA1090F)"},{"label":"Dimensiones","value":"42 x 107 x 32 cm"},{"label":"Potencia","value":"5000 W PMPO"},{"label":"Función","value":"Parlantes 15\"x2 + 4\"x2 + 1\"x2, Bluetooth, USB, TF, control remoto, batería interna, micrófono incluido"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SP-KJAMAMMA';

-- KJ-FLUID: Parlante party Harrison Acid Fluid 500W PMPO (fuente: Kanji oficial, Oscar Barbieri, BRG Hogar)
update products set
  description = 'Parlante party portatil con parlante de 12 pulgadas mas tweeter, pensado para reuniones y fiestas chicas al aire libre. Cuenta con luces LED, radio FM, lector de tarjeta TF y control remoto, con conexion inalambrica Bluetooth.',
  specs = '[{"label":"Marca","value":"Harrison (Kanji)"},{"label":"Modelo","value":"Acid Fluid"},{"label":"Dimensiones","value":"33 x 52 x 31 cm"},{"label":"Potencia","value":"500 W PMPO"},{"label":"Función","value":"Parlante 12\"+2.5\", Bluetooth, USB, TF, radio FM, luces LED, control remoto"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-FLUID';

-- SP-KJA980C: Auricular inalámbrico Kanji Harrison (fuente: Centrogar, Kanji general)
update products set
  description = 'Auricular inalambrico compacto de la linea Harrison, pensado para llamadas y musica en el uso diario. Se conecta por Bluetooth y cuenta con bateria recargable de corta autonomia por su tamano reducido.',
  specs = '[{"label":"Marca","value":"Harrison (Kanji)"},{"label":"Modelo","value":"D4 Mini"},{"label":"Función","value":"Bluetooth, impedancia 32 ohm, respuesta de frecuencia 20-20000Hz, batería recargable ~60-120 min de conversación"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SP-KJA980C';

-- KJ-SH1: Auricular Kanji Shima (fuente: Fagsistems, Seel Computación)
update products set
  description = 'Auricular con conector unico de 3.5mm para audio y microfono, pensado para el uso diario con celulares, tablets, notebooks o reproductores MP3. Su diseno liviano y buen aislamiento acustico lo hacen comodo para uso prolongado.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"Shima SH1"},{"label":"Color","value":"Negro"},{"label":"Función","value":"Conector 3.5mm audio + micrófono, diseño liviano, aislamiento acústico"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJ-SH1';

-- HP40TWSW: Auricular Noblex Air TWS Blanco (fuente: Noblex oficial, Fravega, Cetrogar)
update products set
  description = 'Auricular inalambrico tipo earbuds con estuche de carga, pensado para el uso diario y actividad fisica gracias a su resistencia a salpicaduras y transpiracion. Ofrece mas de 16 horas de reproduccion sumando las cargas del estuche, con controles tactiles y sonido HI-FI X con graves reforzados.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"HP40TWSW (Air TWS)"},{"label":"Color","value":"Blanco"},{"label":"Función","value":"Bluetooth 5.0 (alcance 10m), manos libres, resistencia IPX4, controles táctiles, sonido HI-FI X Super Bass"},{"label":"Batería","value":"16+ horas con estuche (4 cargas extra de 4h c/u)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HP40TWSW';
