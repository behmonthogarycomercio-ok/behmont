-- Migracion 114: corrige productos cuyo "name" quedo armado como una lista
-- de caracteristicas separadas por " - " (en vez de un nombre de producto
-- limpio), con specs y description vacios. Esto rompia /admin/etiquetas: la
-- etiqueta imprimia el nombre completo como titulo en vez de nombre corto +
-- viñetas de specs como el resto del catalogo. Primera tanda (15 de 30) --
-- los que tienen ficha de fabricante/distribuidor verificable online. Los
-- numeros que ya estaban en el nombre original (medidas, potencia, rpm,
-- etc.) se mantienen tal cual -- no son un dato nuevo, solo se reorganizan
-- en specs. Fuentes consultadas: sitios oficiales de cada marca y grandes
-- tiendas que citan la ficha del fabricante (Electrolux, Liliana, Singer,
-- Lipari, Noblex, Sol Real, Briket, Koh-i-noor, Morelli, Ika, Santini).

update products set
  name = 'Cocina 5 hornallas doble horno 77 cm',
  specs = '[
    {"label":"Marca","value":"Electrolux"},
    {"label":"Modelo","value":"76DXR"},
    {"label":"Hornallas","value":"5 (triple llama)"},
    {"label":"Hornos","value":"Doble horno (superior 38,8 L / inferior 94,5 L)"},
    {"label":"Material","value":"Acero inoxidable esmerilado, rejillas enlozadas"},
    {"label":"Potencia","value":"16100 W"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Encendido","value":"Electronico"},
    {"label":"Luz interior","value":"Si"},
    {"label":"Timer","value":"Si"},
    {"label":"Ancho","value":"77 cm"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Cocina de 5 hornallas con triple llama y doble horno independiente, pensada para cocinar varias preparaciones a la vez. Tiene encendido electronico, luz interior y timer para controlar la coccion sin abrir la puerta. El gabinete y las rejillas son de acero inoxidable esmerilado, con un horno autolimpiante en el recubrimiento interno.'
where sku = '76DXR';

update products set
  name = 'Cocina 4 hornallas doble horno 57 cm',
  specs = '[
    {"label":"Marca","value":"Electrolux"},
    {"label":"Modelo","value":"56DXQ"},
    {"label":"Hornallas","value":"4 selladas (triple llama)"},
    {"label":"Hornos","value":"Doble horno (31 L + 68,3 L)"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Potencia","value":"12000 W"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Tipo de gas","value":"Multigas (natural o envasado)"},
    {"label":"Encendido","value":"Electronico"},
    {"label":"Timer","value":"Si"},
    {"label":"Ancho","value":"57 cm"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Cocina de 4 hornallas selladas con triple llama, apta para gas natural o envasado y con conexion electrica para el horno. Cuenta con doble horno (31 L + 68,3 L), puerta de doble vidrio, termostato, valvula de seguridad y encendido electronico con timer.'
where sku = '56DXQ';

update products set
  name = 'Campana de pared 60 cm',
  specs = '[
    {"label":"Marca","value":"Electrolux"},
    {"label":"Modelo","value":"CE6VX"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Control","value":"Botonera"},
    {"label":"Velocidades","value":"3"},
    {"label":"Potencia","value":"213 W"},
    {"label":"Capacidad de extraccion","value":"500 m3/h"},
    {"label":"Nivel de ruido","value":"64 dB"},
    {"label":"Peso","value":"13,2 kg"},
    {"label":"Ancho","value":"60 cm"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Campana de pared de 60 cm en acero inoxidable con iluminacion LED y 3 velocidades de extraccion. Permite elegir entre modo extractor o purificador de aire, y sus filtros de aluminio lavables retienen hasta el 80% de la grasa generada al cocinar.'
where sku = 'CE6VX';

update products set
  name = 'Aire acondicionado split inverter 5500 W frio/calor',
  specs = '[
    {"label":"Marca","value":"Noblex"},
    {"label":"Modelo","value":"NXIN55HA2AN"},
    {"label":"Potencia","value":"5500 W"},
    {"label":"Frigorias","value":"4750 frig."},
    {"label":"Tipo","value":"Frio/Calor"},
    {"label":"Tecnologia","value":"Inverter"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Aire acondicionado split inverter frio/calor de 5500 W, pensado para ambientes medianos a grandes. Al ser inverter, regula la potencia segun la temperatura ambiente en vez de prender y apagar el compresor de golpe, lo que ayuda a bajar el consumo electrico.'
where sku = 'NXIN55HA2AN';

update products set
  name = 'Freidora de aire digital 6 L',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AF957"},
    {"label":"Capacidad","value":"5,7 L"},
    {"label":"Potencia","value":"1750 W"},
    {"label":"Panel","value":"Digital"},
    {"label":"Material","value":"Metal y plastico"},
    {"label":"Color","value":"Negro"},
    {"label":"Dimensiones","value":"30,8 x 35,7 x 35,7 cm"},
    {"label":"Peso","value":"4,65 kg"},
    {"label":"Accesorios","value":"Rejilla desmontable"},
    {"label":"Funcion especial","value":"Visor y luz interior"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Freidora de aire digital de 5,7 L con panel de control touch, pensada para cocinar con muy poco o nada de aceite. Incluye rejilla desmontable y cuenta con visor y luz interior para controlar la coccion sin abrir la tapa.'
where sku = 'AF957';

update products set
  name = 'Maquina de coser semiindustrial',
  specs = '[
    {"label":"Marca","value":"Singer"},
    {"label":"Modelo","value":"4432C"},
    {"label":"Velocidad maxima","value":"1100 puntadas/min"},
    {"label":"Puntadas incorporadas","value":"32"},
    {"label":"Potencia del motor","value":"90 W"},
    {"label":"Dimensiones","value":"39,4 x 15,9 x 30,5 cm"},
    {"label":"Peso","value":"8 kg"},
    {"label":"Funcion especial","value":"Enhebrador automatico, ojal en un paso, brazo libre, luz LED"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Maquina de coser semiindustrial con motor mas potente que una domestica, pensada para proyectos intensivos y telas gruesas como denim o cuerina. Incluye 32 puntadas incorporadas, ojal automatico en un paso, enhebrador automatico y brazo libre para prendas tubulares.'
where sku = 'M4432C';

update products set
  name = 'Termoselladora compacta para film PVC',
  specs = '[
    {"label":"Marca","value":"Lipari"},
    {"label":"Modelo","value":"TS4500"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Medidas de film compatibles","value":"25, 30, 38 y 45 cm"},
    {"label":"Consumo electrico","value":"1,55 A"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Dimensiones","value":"50 x 21 x 46 cm"},
    {"label":"Peso","value":"6,5 kg"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Termoselladora compacta de acero inoxidable para sellar bolsas con film de PVC, apta para 4 medidas de film (25, 30, 38 y 45 cm). El corte se hace con una resistencia tubular que no necesita cambiarse periodicamente, y tiene perilla de freno para regular la tension del film.'
where sku = 'TS4500';

update products set
  name = 'Picadora de carne electrica 1.5 HP',
  specs = '[
    {"label":"Marca","value":"Santini"},
    {"label":"Modelo","value":"PC-22"},
    {"label":"Potencia","value":"1,5 HP (1100 W)"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Capacidad de produccion","value":"220 kg/h"},
    {"label":"Dimensiones","value":"38 x 22 x 45 cm"},
    {"label":"Peso","value":"24 kg"},
    {"label":"Material","value":"Carcasa de aluminio anodizado, tolva y cuerpo de acero inoxidable"},
    {"label":"Accesorios","value":"Cuchillo, disco y tuerca de acero inox."},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Picadora de carne electrica de uso profesional, con capacidad de produccion de 220 kg por hora. La tolva y el cuerpo son de acero inoxidable y se desmontan del bloque motor, e incluye cuchillo, disco y tuerca para el molido.'
where sku = 'PC-22';

update products set
  name = 'Fileteadora semiautomatica',
  specs = '[
    {"label":"Marca","value":"Ceico"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Capacidad de produccion","value":"200 kg/h"},
    {"label":"Espesor de corte","value":"2 posiciones regulables"},
    {"label":"Uso","value":"Pollo, pescado y otras carnes"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Fileteadora semiautomatica de acero inoxidable para pollo, pescado y otras carnes, con capacidad de 200 kg por hora. Permite regular el espesor del corte en dos posiciones distintas segun la preparacion.'
where sku = '156317';

update products set
  name = 'Cocina 4 hornallas con grill 53,5 cm',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"535GEV"},
    {"label":"Hornallas","value":"4 full inox con rejas de fundicion"},
    {"label":"Material","value":"Acero inoxidable esmerilado"},
    {"label":"Puerta","value":"Vidrio templado con piromero incorporado"},
    {"label":"Horno","value":"Enlozado, piso de tejuelas refractarias"},
    {"label":"Potencia","value":"12300 kcal/h"},
    {"label":"Accesorios","value":"2 rejillas interiores"},
    {"label":"Dimensiones","value":"89,4 x 53,5 x 56,8 cm"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Cocina semi industrial de 4 hornallas full inox con rejas de fundicion, pensada para uso gastronomico. El horno es enlozado con piso de tejuelas refractarias, puerta de vidrio templado con piromero incorporado y valvula de seguridad, e incluye grill y 2 rejillas interiores.'
where sku = '535GEV';

update products set
  name = 'Anafe 2 hornallas 16.000 kcal/h',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"730"},
    {"label":"Hornallas","value":"2 (mechero estrella + quemador grande)"},
    {"label":"Potencia","value":"16000 kcal/h"},
    {"label":"Material","value":"Acero inoxidable esmerilado"},
    {"label":"Rejillas","value":"Fundicion esmaltada"},
    {"label":"Diseño","value":"Modular, linea 700"},
    {"label":"Dimensiones","value":"99 x 42 x 70 cm"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Anafe industrial de 2 hornallas (mechero estrella y quemador grande) con 16.000 kcal/h de potencia total, pensado para uso gastronomico intensivo. El gabinete es de acero inoxidable esmerilado, con rejillas de fundicion esmaltada y bandeja recolectora removible.'
where sku = '730';

update products set
  name = 'Cocina 4 hornallas Vintage Touch 55 cm',
  specs = '[
    {"label":"Marca","value":"Morelli"},
    {"label":"Modelo","value":"18030VN"},
    {"label":"Hornallas","value":"4 (1 triple corona + 1 grande + 2 chicas)"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Encendido","value":"Electronico"},
    {"label":"Puerta","value":"Vidrio tipo visor"},
    {"label":"Display","value":"Digital touch"},
    {"label":"Termometro","value":"Si"},
    {"label":"Luz interior","value":"Si"},
    {"label":"Grill","value":"Electrico"},
    {"label":"Capacidad del horno","value":"73 L"},
    {"label":"Dimensiones","value":"90 x 55 x 65 cm"},
    {"label":"Peso","value":"45,5 kg"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Cocina semi industrial de 4 hornallas con estetica vintage y controles touch, de 55 cm de ancho. Tiene horno con capacidad de 73 L, puerta tipo visor, display digital, termometro, luz interior y grill electrico, con encendido electronico en todos los quemadores.'
where sku = '18030VN';

update products set
  name = 'Heladera exhibidora vertical 501 L',
  specs = '[
    {"label":"Marca","value":"Briket"},
    {"label":"Modelo","value":"M5020 (Master 5000)"},
    {"label":"Capacidad","value":"501 L"},
    {"label":"Color","value":"Plata"},
    {"label":"Puertas","value":"1"},
    {"label":"Estantes","value":"4 regulables"},
    {"label":"Iluminacion","value":"LED interior"},
    {"label":"Rango de temperatura","value":"0°C a 7°C"},
    {"label":"Control","value":"Digital"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Dimensiones","value":"2,15 m alto x 70 cm ancho x 60 cm profundidad"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Heladera exhibidora vertical de 501 litros con una puerta, pensada para comercios y kioscos. Tiene iluminacion LED interior, 4 estantes regulables y control de temperatura digital en un rango de 0°C a 7°C.'
where sku = '5020';

update products set
  name = 'Secarropas centrifugo 5,5 kg',
  specs = '[
    {"label":"Marca","value":"Koh-i-noor"},
    {"label":"Modelo","value":"A-655/2"},
    {"label":"Capacidad","value":"5,5 kg"},
    {"label":"Velocidad","value":"2800 rpm"},
    {"label":"Material del tambor","value":"Acero inoxidable"},
    {"label":"Potencia","value":"220 W"},
    {"label":"Voltaje","value":"220V"},
    {"label":"Dimensiones","value":"63,5 x 34,3 x 34,3 cm"},
    {"label":"Peso","value":"10,3 kg"},
    {"label":"Funcion especial","value":"Traba de seguridad TBS -- la tapa abre sola recien cuando el tambor deja de girar"},
    {"label":"Origen","value":"Industria Argentina"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Secarropas centrifugo de 5,5 kg con tambor de acero inoxidable y 2800 rpm, de produccion nacional. Incluye el sistema de traba de seguridad TBS, que recien abre la tapa cuando el tambor deja de girar.'
where sku = 'A-655';

update products set
  name = 'Motocicleta Slalom 110',
  specs = '[
    {"label":"Marca","value":"Ika"},
    {"label":"Modelo","value":"Slalom 110"},
    {"label":"Motor","value":"Monocilindrico 4T, 110 cc"},
    {"label":"Potencia","value":"7 HP a 8000 rpm"},
    {"label":"Transmision","value":"Semiautomatica, 4 velocidades"},
    {"label":"Arranque","value":"Electrico y a pedal"},
    {"label":"Freno delantero","value":"A disco"},
    {"label":"Freno trasero","value":"A tambor"},
    {"label":"Rodados","value":"De rayos"},
    {"label":"Peso","value":"99 kg"},
    {"label":"Tanque de combustible","value":"3,8 L"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Motocicleta de 110 cc con motor monocilindrico 4 tiempos y 7 HP de potencia, con transmision semiautomatica de 4 velocidades y arranque electrico y a pedal. Tiene freno a disco adelante y a tambor atras, con rodados de rayos.'
where sku = 'SLALOMP110';
