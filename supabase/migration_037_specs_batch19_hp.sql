-- Migracion 037: tanda 19 de specs/descripcion investigados (skill
-- product-specs-research). Impresoras HP de la categoria "Electronica".
-- 10 productos confirmados de 10 investigados (fuente oficial hp.com para
-- todos), 100% de confirmacion.

-- F5S21A: Impresora HP DeskJet Ink Advantage 1115 (fuente: HP oficial)
update products set
  description = 'Impresora de inyeccion de tinta a color, pensada para el uso hogareno u oficina chica con impresion ocasional. Utiliza 2 cartuchos (negro y tricolor) y admite hasta 1000 paginas por mes, con conexion USB.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"DeskJet Ink Advantage 1115 (F5S21A)"},{"label":"Función","value":"Impresión a color, resolución hasta 4800x1200 dpi, 2 cartuchos (negro y tricolor)"},{"label":"Velocidad","value":"7.5 ppm negro, 5.5 ppm color"},{"label":"Conectividad","value":"USB"},{"label":"Capacidad","value":"60 hojas de entrada, 25 de salida"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'F5S21A';

-- Z4B04A: Impresora HP Ink Tank 315 Multifunción Color (fuente: HP oficial, Megatone)
update products set
  description = 'Impresora multifuncion de tinta continua (imprime, copia y escanea), pensada para quienes imprimen en volumen y buscan bajo costo por pagina. Sus tanques recargables rinden hasta 6000 paginas en negro u 8000 a color por carga.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"Ink Tank 315 (Z4B04A)"},{"label":"Dimensiones","value":"52.5 x 31 x 15.8 cm"},{"label":"Peso","value":"4.67 kg"},{"label":"Función","value":"Imprime, copia y escanea, tinta continua recargable"},{"label":"Velocidad","value":"8 ppm negro, 5 ppm color"},{"label":"Conectividad","value":"USB"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'Z4B04A';

-- 45341: Impresora HP Neverstop Laser 1000w WiFi Monocromática (fuente: HP oficial)
update products set
  description = 'Impresora laser monocromatica con sistema de tanque de toner recargable, pensada para alto volumen de impresion a bajo costo. Incluye toner para 5000 paginas desde el inicio y admite hasta 20.000 paginas por mes, con conexion WiFi y USB.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"Neverstop Laser 1000w (4RY23A)"},{"label":"Dimensiones","value":"38 x 29.3 x 21.1 cm"},{"label":"Peso","value":"6.95 kg"},{"label":"Función","value":"Láser monocromática, tanque de tóner recargable, pantalla LED"},{"label":"Velocidad","value":"21 ppm"},{"label":"Conectividad","value":"USB 2.0, WiFi 802.11 b/g/n"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '45341';

-- 7FR21A: Impresora HP DeskJet Ink Advantage 2775 Multifunción (fuente: HP oficial)
update products set
  description = 'Impresora multifuncion a color que imprime, copia y escanea, pensada para el hogar o pequena oficina con conectividad inalambrica. Su conexion WiFi dual band y Ethernet permiten imprimir desde varios dispositivos en red.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"DeskJet Ink Advantage 2775 (7FR21A)"},{"label":"Dimensiones","value":"42.5 x 30.4 x 15.4 cm"},{"label":"Peso","value":"3.42 kg"},{"label":"Función","value":"Imprime, copia y escanea a color"},{"label":"Velocidad","value":"7.5 ppm negro, 5.5 ppm color"},{"label":"Conectividad","value":"USB 2.0, WiFi dual band, Ethernet, BLE"},{"label":"Garantía","value":"12 meses"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '7FR21A';

-- PRINTER102: Impresora HP LaserJet Pro M102w (fuente: HP oficial, Fravega)
update products set
  description = 'Impresora laser monocromatica compacta, pensada para el uso en oficina con impresion rapida y de bajo costo por pagina. Cuenta con conectividad WiFi y USB, ademas de impresion doble faz manual.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"LaserJet Pro M102w"},{"label":"Dimensiones","value":"35.6 x 24.7 x 19.1 cm"},{"label":"Peso","value":"4.7 kg"},{"label":"Función","value":"Láser monocromática, doble faz manual"},{"label":"Velocidad","value":"22 ppm"},{"label":"Conectividad","value":"USB, WiFi, WiFi Direct"},{"label":"Capacidad","value":"150 hojas de entrada, 100 de salida"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PRINTER102';

-- V1N02A: Impresora HP DeskJet Ink Advantage 2675 Multifunción (fuente: HP oficial)
update products set
  description = 'Impresora multifuncion a color que imprime, copia y escanea, pensada para el uso hogareno diario. Cuenta con conectividad WiFi dual band y Ethernet, ademas de USB, para imprimir desde distintos dispositivos.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"DeskJet Ink Advantage 2675 (V1N02A)"},{"label":"Dimensiones","value":"42.5 x 30.4 x 14.9 cm"},{"label":"Función","value":"Imprime, copia y escanea a color"},{"label":"Velocidad","value":"33 ppm negro (modo normal)"},{"label":"Conectividad","value":"USB 2.0, WiFi dual band, Ethernet, BLE"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'V1N02A';

-- 4ZB77A: Impresora HP Laser 107A Monocromática (fuente: HP oficial, Fravega)
update products set
  description = 'Impresora laser monocromatica compacta, pensada para el uso en oficina con impresion rapida a bajo costo. Admite distintos tipos y tamanos de papel, con conexion USB y doble faz manual.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"Laser 107a (4ZB77A)"},{"label":"Dimensiones","value":"33.1 x 21.5 x 17.8 cm"},{"label":"Peso","value":"4.16 kg"},{"label":"Función","value":"Láser monocromática, doble faz manual"},{"label":"Velocidad","value":"21 ppm"},{"label":"Conectividad","value":"USB 2.0"},{"label":"Capacidad","value":"150 hojas de entrada, 100 de salida"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '4ZB77A';

-- 7WQ01A: Impresora HP DeskJet Ink Advantage 2375 Multifunción (fuente: HP oficial)
update products set
  description = 'Impresora multifuncion a color que imprime, copia y escanea, pensada para el uso hogareno basico. Se conecta por USB y es una opcion economica para tareas de impresion ocasional.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"DeskJet Ink Advantage 2375 (7WQ01A)"},{"label":"Dimensiones","value":"42.5 x 30.4 x 14.9 cm"},{"label":"Peso","value":"3.42 kg"},{"label":"Función","value":"Imprime, copia y escanea a color"},{"label":"Velocidad","value":"7.5 ppm negro, 5.5 ppm color"},{"label":"Conectividad","value":"USB 2.0"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '7WQ01A';

-- 1TJ09A: Impresora HP Smart Tank 515 Multifunción (fuente: HP oficial)
update products set
  description = 'Impresora multifuncion de tinta continua con conectividad WiFi y Bluetooth, pensada para quienes imprimen en volumen y buscan bajo costo por pagina. Sus tanques recargables sin derrames rinden hasta 12.000 paginas en negro u 8000 a color.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"Smart Tank 515 (1TJ09A)"},{"label":"Función","value":"Imprime, copia y escanea, tanque de tinta recargable"},{"label":"Conectividad","value":"USB 2.0, WiFi, Bluetooth LE"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '1TJ09A';

-- HPDJ2135: Impresora HP DeskJet Ink Advantage 2135 Multifunción (fuente: HP oficial)
update products set
  description = 'Impresora multifuncion a color que imprime, copia y escanea, pensada para el uso hogareno con volumen ocasional de impresion. Se conecta por USB y es una de las opciones mas economicas de la linea DeskJet.',
  specs = '[{"label":"Marca","value":"HP"},{"label":"Modelo","value":"DeskJet Ink Advantage 2135"},{"label":"Función","value":"Imprime, copia y escanea a color"},{"label":"Velocidad","value":"7.5 ppm negro, 5.5 ppm color"},{"label":"Conectividad","value":"USB"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HPDJ2135';
