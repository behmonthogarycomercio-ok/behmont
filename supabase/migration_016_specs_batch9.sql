-- Migracion 016: novena tanda (30 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: catalogo de importados del
-- distribuidor (BEHMONT, 7 productos), sitios de fabricante oficial y tiendas
-- grandes reconocidas (Midea, Atma, Remington, Gamma, Liliana, Hisense,
-- Drean, Philco, Black & Decker, Kemei, Imetec, Allure, RCA, Neba). Solo
-- toca specs/description de estos 30 SKU puntuales, no pisa nada mas.

-- 25-YXH11: Ayudante de peluqueria Behmont B&W (fuente: catalogo de importados)
update products set
  description = 'Carrito ayudante de peluqueria con estructura metalica y cuerpo plastico, con 5 cajones de doble acceso para organizar herramientas e insumos. Incorpora 4 ruedas para desplazarlo con facilidad, aro porta secador de pelo y bandeja de apoyo superior.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-YXH11"},
    {"label":"Tipo","value":"Carrito ayudante"},
    {"label":"Estructura","value":"Plástico con estructura metálica"},
    {"label":"Cajones","value":"5 cajones con doble acceso"},
    {"label":"Ruedas","value":"4 ruedas"},
    {"label":"Accesorios","value":"Aro porta secador, bandeja de apoyo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-YXH11';

-- MP-37: Silla de peluqueria fija Behmont Orebro (fuente: catalogo de importados)
update products set
  description = 'Silla de peluqueria modelo Orebro con estructura tipo arana cromada, respaldar alto y asiento acolchonado tapizado en tela negra. Cuenta con sistema hidraulico para regular la altura, apoyabrazos de PVC y base fija sin ruedas para mayor estabilidad.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MP-37 (Orebro)"},
    {"label":"Color","value":"Negro"},
    {"label":"Estructura","value":"Araña cromada"},
    {"label":"Material tapizado","value":"Tela"},
    {"label":"Regulación de altura","value":"Sistema hidráulico"},
    {"label":"Apoyabrazos","value":"PVC"},
    {"label":"Base","value":"Fija, sin ruedas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MP-37';

-- G2: Camilla portatil plegable Behmont (fuente: catalogo de importados)
update products set
  description = 'Camilla plegable y portatil con estructura de madera y tapizado de eco-cuero, pensada para masajes, estetica o tratamientos a domicilio. Se transporta como un bolso de mano, mide 185 x 60 x 60 cm y soporta hasta 150 kg.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"G2"},
    {"label":"Color","value":"Blanco"},
    {"label":"Medidas","value":"185 x 60 x 60-70 cm"},
    {"label":"Tipo","value":"Plegable, portátil"},
    {"label":"Estructura","value":"Madera"},
    {"label":"Tapizado","value":"Eco-cuero"},
    {"label":"Capacidad","value":"Soporta 150 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'G2';

-- NB-210-B: Estante modulo Behmont 200x90x30 blanco (fuente: catalogo de importados)
update products set
  description = 'Estante modulo metalico encastrable, con 5 estantes de 50 kg de capacidad cada uno. Sus medidas de 200 x 90 x 30 cm lo hacen ideal para organizar depositos, comercios o espacios de trabajo con mercaderia liviana.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"NB-210-B"},
    {"label":"Color","value":"Blanco"},
    {"label":"Medidas","value":"200 x 90 x 30 cm"},
    {"label":"Estantes","value":"5 estantes"},
    {"label":"Capacidad","value":"50 kg por estante"},
    {"label":"Tipo","value":"Encastrable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NB-210-B';

-- MR-10GOLDEN: Espejo LED Behmont octogonal dorado (fuente: catalogo de importados)
update products set
  description = 'Espejo con forma octogonal y marco dorado, con iluminacion LED integrada. Sus medidas de 170 x 70 cm y su diseno con luz perimetral lo hacen ideal para salones de peluqueria, barberias y centros de estetica.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-10GOLDEN"},
    {"label":"Forma","value":"Octogonal"},
    {"label":"Marco","value":"Color dorado"},
    {"label":"Iluminación","value":"LED integrada"},
    {"label":"Medidas","value":"170 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-10GOLDEN';

-- 25-JAY05: Picadora de carne manual Behmont (fuente: catalogo de importados)
update products set
  description = 'Picadora de carne manual de fundicion con calibre de picado 22 pulgadas y manija con agarradera de madera. Pensada para carnicerias, almacenes y uso gastronomico donde se necesite picar carne sin depender de electricidad.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-JAY05"},
    {"label":"Tipo","value":"Picadora de carne manual"},
    {"label":"Calibre","value":"22\""},
    {"label":"Material","value":"Fundición"},
    {"label":"Mango","value":"Agarradera de madera"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-JAY05';

-- MR-8SILVER: Espejo LED Behmont rectangular plata (fuente: catalogo de importados)
update products set
  description = 'Espejo rectangular con marco plateado e iluminacion LED integrada, ideal para salones de peluqueria, barberias y centros de estetica. Sus medidas de 170 x 70 cm lo hacen apto para puestos de trabajo profesional.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-8SILVER"},
    {"label":"Forma","value":"Rectangular"},
    {"label":"Marco","value":"Color plata"},
    {"label":"Iluminación","value":"LED integrada"},
    {"label":"Medidas","value":"170 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-8SILVER';

-- MSABFC-12H: Aire acondicionado Split Midea 3500W F/C (fuente: Fravega, Midea oficial)
update products set
  description = 'Aire acondicionado Split frio/calor con capacidad de aproximadamente 3000 frigorias, con tratamiento Gold Cover en la unidad externa para mayor proteccion anticorrosiva. Incluye filtro de alta densidad HD Filter y funcion Follow Me que regula la temperatura segun la posicion del control remoto.',
  specs = '[
    {"label":"Marca","value":"Midea"},
    {"label":"Modelo","value":"MSABFC-12H"},
    {"label":"Potencia frío","value":"3490 W (~3000 frigorías)"},
    {"label":"Potencia calor","value":"3100 W"},
    {"label":"Ciclo","value":"Frío/Calor"},
    {"label":"Función","value":"Follow Me"},
    {"label":"Filtro","value":"Alta densidad (HD Filter)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MSABFC-12H';

-- CA2180P: Cafetera de filtro Atma (fuente: Fravega, Megatone)
update products set
  description = 'Cafetera de filtro con jarra de vidrio resistente al calor y capacidad de hasta 6 tazas (0.6 litros). Cuenta con filtro permanente desmontable, sistema antigoteo y base calentadora antiadherente para mantener el cafe caliente.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"CA2180P"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"0.6 L (hasta 6 tazas)"},
    {"label":"Potencia","value":"900 W"},
    {"label":"Material jarra","value":"Vidrio resistente al calor"},
    {"label":"Filtro","value":"Permanente y desmontable"},
    {"label":"Sistema","value":"Antigoteo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CA2180P';

-- D3015: Secador de pelo Remington 2000W rejilla ceramica (fuente: Fravega, Remington oficial)
update products set
  description = 'Secador de pelo de 2000 W con rejilla de ceramica ionica antiestatica que distribuye el calor de forma uniforme y reduce el frizz. Cuenta con 3 temperaturas, 2 velocidades, funcion Eco de ahorro de energia y rafaga de aire frio, ademas de concentrador y difusor incluidos.',
  specs = '[
    {"label":"Marca","value":"Remington"},
    {"label":"Modelo","value":"D3015 (Power Volume 2000)"},
    {"label":"Potencia","value":"2000 W"},
    {"label":"Rejilla","value":"Cerámica iónica antiestática"},
    {"label":"Temperaturas/Velocidades","value":"3 temperaturas, 2 velocidades"},
    {"label":"Funciones","value":"Eco, aire frío"},
    {"label":"Accesorios","value":"Concentrador y difusor"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'D3015';

-- LP8426NAP: Multiprocesadora Atma 650W (fuente: Megatone, Provincia Compras)
update products set
  description = 'Multiprocesadora 9 en 1 con motor de 650 W, jarra licuadora de 1.8 litros y bowl procesador de 1.2 litros. Resuelve en un mismo equipo picado, rallado, amasado, rebanado, exprimido, licuado y molido, con base antideslizante y traba de seguridad.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"LP8426NAP"},
    {"label":"Potencia","value":"650 W"},
    {"label":"Velocidades","value":"2 velocidades + pulsador"},
    {"label":"Capacidad jarra licuadora","value":"1.8 L"},
    {"label":"Capacidad bowl procesadora","value":"1.2 L"},
    {"label":"Funciones","value":"Picar, rallar, amasar, rebanar, exprimir, licuar, moler"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LP8426NAP';

-- G12493AR: Cargador Gamma 20V ultrarrapido (fuente: Gamma oficial)
update products set
  description = 'Cargador ultrarrapido de 20V compatible con toda la linea de baterias Multi Energy de Gamma, con carga de una bateria de 4000 mAh en aproximadamente 40 minutos. Ideal para minimizar tiempos muertos entre usos de herramientas a bateria.',
  specs = '[
    {"label":"Marca","value":"Gamma"},
    {"label":"Modelo","value":"G12493AR"},
    {"label":"Tipo","value":"Cargador de batería 20V ultrarrápido"},
    {"label":"Potencia","value":"84 W"},
    {"label":"Compatibilidad","value":"Baterías línea Multi Energy 20V"},
    {"label":"Tiempo de carga","value":"~40 min (batería 4000 mAh)"},
    {"label":"Entrada","value":"220V AC 50Hz"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'G12493AR';

-- AM459: Procesadora Liliana Totalmix (fuente: Fravega, Liliana oficial)
update products set
  description = 'Procesadora Totalmix 5 en 1 con motor de 500 W que combina procesadora, licuadora manual y batidora en un solo equipo. Incluye bowl de 1.5 litros, vaso medidor de 900 ml con pico vertedor y discos intercambiables para rallar y rebanar.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AM459 (Totalmix)"},
    {"label":"Potencia","value":"500 W"},
    {"label":"Velocidades","value":"2 velocidades"},
    {"label":"Capacidad bowl","value":"1.5 L"},
    {"label":"Capacidad vaso","value":"900 ml"},
    {"label":"Funciones","value":"Pica, ralla, rebana, licúa y bate"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AM459';

-- HLE3917RTF: Smart TV Hisense 39 (fuente: Falabella, Cetrogar)
update products set
  description = 'Smart TV LED de 39" con resolucion Full HD y conexion WiFi para acceder a aplicaciones como Netflix y YouTube. Cuenta con 3 entradas HDMI, 2 puertos USB y sintonizador digital incorporado.',
  specs = '[
    {"label":"Marca","value":"Hisense"},
    {"label":"Modelo","value":"HLE3917RTF"},
    {"label":"Pantalla","value":"39\" Full HD (1920x1080)"},
    {"label":"Sistema","value":"Smart TV con WiFi"},
    {"label":"Conectividad","value":"3 HDMI, 2 USB, Ethernet"},
    {"label":"Audio","value":"14 W"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HLE3917RTF';

-- CONCEPT5.05V1: Lavarropas Drean 5kg carga superior (fuente: Drean oficial, Fravega)
update products set
  description = 'Lavarropas automatico de carga superior con capacidad de 5 kg y centrifugado de 500 rpm, ideal para hogares chicos. Cuenta con 6 programas de lavado, tambor de polycron y filtro atrapa pelusa, con eficiencia energetica Clase B.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Concept 5.05 V1"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"5 kg"},
    {"label":"Centrifugado","value":"500 rpm"},
    {"label":"Carga","value":"Superior"},
    {"label":"Programas","value":"6 programas"},
    {"label":"Eficiencia energética","value":"Clase B"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'CONCEPT5.05V1';

-- NEXT6.08: Lavarropas Drean 6kg carga frontal (fuente: Drean oficial, Megatone)
update products set
  description = 'Lavarropas automatico de carga frontal con capacidad de 6 kg, centrifugado de hasta 800 rpm y 29 programas de lavado para distintos tipos de tela. Su tambor de acero inoxidable y eficiencia energetica A+ permiten ahorrar hasta un 70% de agua respecto a un lavado tradicional.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Next 6.08 Eco"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Centrifugado","value":"Hasta 800 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"29 programas"},
    {"label":"Tambor","value":"Acero inoxidable"},
    {"label":"Eficiencia energética","value":"A+"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'NEXT6.08';

-- G1904KAR: Taladro Gamma 710W en kit (fuente: Megatone, Macrofer)
update products set
  description = 'Taladro percutor de 710 W con mandril autoajustable de hasta 13 mm y velocidad de 2900 rpm en vacio. Incluye maletin con mechas para madera, metal y mamposteria, puntas atornilladoras y llaves, ideal para trabajos domesticos de perforacion y atornillado.',
  specs = '[
    {"label":"Marca","value":"Gamma"},
    {"label":"Modelo","value":"G1904KAR"},
    {"label":"Potencia","value":"710 W"},
    {"label":"Velocidad sin carga","value":"2900 rpm"},
    {"label":"Mandril","value":"1.5 a 13 mm"},
    {"label":"Función","value":"Percusión, doble aislación, reversa"},
    {"label":"Accesorios","value":"Maletín con mechas y puntas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'G1904KAR';

-- TP7A4N: Tablet Philco 7 Kids (fuente: Cetrogar, Fravega)
update products set
  description = 'Tablet de 7" pensada para chicos, con procesador quad-core, 1 GB de RAM y 8 GB de almacenamiento expandible por tarjeta SD. Incluye funda protectora, conectividad WiFi y Bluetooth, ideal para entretenimiento y contenido educativo infantil.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"TP7A4N"},
    {"label":"Pantalla","value":"7\" (1024x600)"},
    {"label":"Memoria RAM","value":"1 GB"},
    {"label":"Almacenamiento","value":"8 GB (expandible por SD)"},
    {"label":"Procesador","value":"Rockchip 3126 Quad-core"},
    {"label":"Sistema operativo","value":"Android 7.0"},
    {"label":"Accesorios","value":"Funda protectora"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'TP7A4N';

-- PE1821AP2: Pava electrica Atma 1.7L (fuente: Fravega, Megatone)
update products set
  description = 'Pava electrica de 1.7 litros con selector de temperatura para elegir el punto exacto segun la preparacion (te, cafe, mate). Cuenta con corte automatico de seguridad, placa calentadora de acero inoxidable y filtro de doble accion.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"PE1821AP2"},
    {"label":"Capacidad","value":"1.7 L"},
    {"label":"Función","value":"Selector de temperatura"},
    {"label":"Placa","value":"Acero inoxidable"},
    {"label":"Corte automático","value":"Sí"},
    {"label":"Filtro","value":"Doble acción"},
    {"label":"Peso","value":"1 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PE1821AP2';

-- HD555: Taladro Black & Decker 13mm (fuente: Fravega, Ferrepat)
update products set
  description = 'Taladro percutor de 550 W con mandril de 13 mm y velocidad variable de hasta 2800 rpm. Cuenta con selector de percusion o rotacion, reversa y traba de gatillo, apto para perforar madera, metal y mamposteria.',
  specs = '[
    {"label":"Marca","value":"Black & Decker"},
    {"label":"Modelo","value":"HD555"},
    {"label":"Potencia","value":"550 W"},
    {"label":"Mandril","value":"13 mm (1/2\")"},
    {"label":"Velocidad","value":"0-2800 rpm"},
    {"label":"Percusión","value":"0-45000 gpm"},
    {"label":"Función","value":"Selector percusión/rotación, reversa"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HD555';

-- HD455KA: Taladro Black & Decker 10mm con kit (fuente: Megatone, Castillo)
update products set
  description = 'Taladro percutor de 550 W con mandril de 10 mm y velocidad de hasta 3000 rpm, con selector de rotacion/percusion y velocidad reversible. Incluye kit de 41 accesorios con mechas para madera, metal y mamposteria, puntas atornilladoras y llaves.',
  specs = '[
    {"label":"Marca","value":"Black & Decker"},
    {"label":"Modelo","value":"HD455KA"},
    {"label":"Potencia","value":"550 W"},
    {"label":"Mandril","value":"10 mm (3/8\")"},
    {"label":"Velocidad","value":"0-3000 rpm"},
    {"label":"Percusión","value":"45000 gpm"},
    {"label":"Accesorios","value":"Kit de 41 piezas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HD455KA';

-- LD120: Taladro inalambrico Black & Decker 20V (fuente: SomosRex, Amazon)
update products set
  description = 'Taladro atornillador inalambrico de 20V con bateria de litio removible y mandril de 10 mm. Cuenta con control de torque de 11 posiciones, luz LED para iluminar el area de trabajo y funcion reversa, ideal para tareas domesticas de taladrado y atornillado.',
  specs = '[
    {"label":"Marca","value":"Black & Decker"},
    {"label":"Modelo","value":"LD120"},
    {"label":"Voltaje","value":"20V"},
    {"label":"Mandril","value":"10 mm"},
    {"label":"Velocidad","value":"0-650 rpm"},
    {"label":"Torque máximo","value":"25 Nm"},
    {"label":"Batería","value":"Litio 20V removible"},
    {"label":"Control de torque","value":"11 posiciones"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LD120';

-- LFJ-KM-2296: Clipper inalambrico Kemei (fuente: LydTech, tiendadelbarbero)
update products set
  description = 'Maquina de corte inalambrica con bateria de litio de 2500 mAh y hasta 350 minutos de autonomia. Incluye 8 peines guia de 3 a 25 mm, base de carga, cable USB y cepillo de limpieza, con cuchillas de acero inoxidable para un corte parejo.',
  specs = '[
    {"label":"Marca","value":"Kemei"},
    {"label":"Modelo","value":"KM-2296"},
    {"label":"Potencia","value":"5 W"},
    {"label":"Batería","value":"Litio 2500 mAh"},
    {"label":"Autonomía","value":"Hasta 350 min"},
    {"label":"Tiempo de carga","value":"3.5 hs"},
    {"label":"Cuchillas","value":"Acero inoxidable"},
    {"label":"Peines guía","value":"8 peines (3 a 25 mm)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LFJ-KM-2296';

-- GK5100: Cortabarba Imetec (fuente: Imetec oficial, Farmacia Leloir)
update products set
  description = 'Kit cortabarba 5 en 1 con 12 posiciones de corte de 0.5 a 8 mm y cabezales lavables. Funciona a bateria con 45 minutos de autonomia o conectado a la red, e incluye trimmer para nariz y orejas, peines de ajuste, aceite lubricante y cepillo de limpieza.',
  specs = '[
    {"label":"Marca","value":"Imetec"},
    {"label":"Modelo","value":"GK5100 (Hi-Man)"},
    {"label":"Posiciones de corte","value":"12 posiciones (0.5 a 8 mm)"},
    {"label":"Cuchillas","value":"Acero inoxidable"},
    {"label":"Uso","value":"Red o batería"},
    {"label":"Autonomía","value":"45 minutos"},
    {"label":"Accesorios","value":"Trimmer nariz/orejas, peines, aceite, cepillo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'GK5100';

-- HC9010AN: Cortacabello Allure (fuente: Fravega, Megatone)
update products set
  description = 'Cortapelo profesional con motor magnetico y cuchillas de acero al carbono, con palanca reguladora de corte para mayor precision. Incluye 10 peines guia, tijera, peine, aceite lubricante y cepillo de limpieza, pensado para uso continuo en peluquerias y barberias.',
  specs = '[
    {"label":"Marca","value":"Allure"},
    {"label":"Modelo","value":"HC9010AN"},
    {"label":"Motor","value":"Magnético profesional"},
    {"label":"Cuchillas","value":"Acero al carbono"},
    {"label":"Peines guía","value":"10 peines (3 a 25 mm)"},
    {"label":"Conexión","value":"Con cable"},
    {"label":"Accesorios","value":"Tijera, peine, aceite, cepillo"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HC9010AN';

-- PHAST3021PI: Aspiradora Philco 30L 1200W (fuente: Megatone, Philco oficial)
update products set
  description = 'Aspiradora de tacho metalico de 30 litros y 1200 W, apta para liquidos y solidos, con funcion sopladora y regulador de succion. Incluye filtro HEPA, manguera de 2.5 m, tubo de extension y accesorios para rincones y tapizados.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"PHAST3021PI"},
    {"label":"Capacidad","value":"30 L"},
    {"label":"Potencia","value":"1200 W"},
    {"label":"Función","value":"Aspira líquidos y sólidos, sopladora"},
    {"label":"Filtro","value":"HEPA"},
    {"label":"Accesorios","value":"Manguera 2.5m, tubo de extensión, boquillas"},
    {"label":"Peso","value":"~7.5 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PHAST3021PI';

-- MPD8620N: Microondas Philco 20L digital (fuente: Fravega, Megatone)
update products set
  description = 'Microondas digital de 20 litros y 700 W, con plato giratorio de 255 mm y 8 menus preestablecidos para coccion automatica. Cuenta con 5 niveles de potencia, descongelado automatico por peso, reloj y bloqueo de seguridad para ninos.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"MPD8620N"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Niveles de potencia","value":"5 niveles"},
    {"label":"Funciones","value":"8 menús, descongelado automático, bloqueo infantil"},
    {"label":"Plato giratorio","value":"255 mm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MPD8620N';

-- AC964: Cafetera Liliana Smarty 1.8L (fuente: Liliana oficial, Fravega)
update products set
  description = 'Cafetera electrica de 1.8 litros (18 pocillos) con display digital y timer programable para tener el cafe listo a la hora deseada. Mantiene la temperatura hasta 2 horas, cuenta con apagado automatico, filtro removible lavable y valvula antigoteo.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AC964 (Smarty)"},
    {"label":"Capacidad","value":"1.8 L (18 pocillos)"},
    {"label":"Potencia","value":"900 W"},
    {"label":"Display","value":"Digital con timer programable"},
    {"label":"Mantiene temperatura","value":"Hasta 2 horas"},
    {"label":"Filtro","value":"Removible y lavable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AC964';

-- R43AND-F: Smart TV RCA 43 FHD Android (fuente: Fravega, RCA oficial)
update products set
  description = 'Smart TV de 43" con resolucion Full HD y sistema Android TV con Chromecast y Google Assistant integrados. Cuenta con 2 entradas HDMI, puerto USB, conectividad WiFi y Bluetooth, y salida de audio optica S/PDIF.',
  specs = '[
    {"label":"Marca","value":"RCA"},
    {"label":"Modelo","value":"R43AND-F"},
    {"label":"Pantalla","value":"43\" Full HD (1920x1080)"},
    {"label":"Sistema operativo","value":"Android TV"},
    {"label":"Conectividad","value":"2 HDMI, 1 USB, WiFi, Bluetooth"},
    {"label":"Audio","value":"2x9W, Dolby Digital"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'R43AND-F';

-- F250: Freezer horizontal Neba 245L (fuente: Neba oficial, Fravega)
update products set
  description = 'Freezer horizontal de 245 litros con sistema TRIAL que combina 3 funciones: enfriador de botellas, congelador y freezer. Incluye canasto removible con manijas, burlete magnetico antihongos y eficiencia energetica Clase B.',
  specs = '[
    {"label":"Marca","value":"Neba"},
    {"label":"Modelo","value":"F250"},
    {"label":"Color","value":"Blanco"},
    {"label":"Capacidad","value":"245 L"},
    {"label":"Sistema","value":"TRIAL (enfriador, congelador, freezer)"},
    {"label":"Eficiencia energética","value":"Clase B"},
    {"label":"Medidas","value":"85 x 85 x 65 cm"},
    {"label":"Peso","value":"47 kg"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'F250';
