-- Migracion 051: tanda 28 de specs/descripcion investigados (skill
-- product-specs-research). Segunda tanda de "Gastronomia": hornos
-- electricos Solei/Sansei/Codini/Crivel/Aurora, anafes Danda/Aurora,
-- batidoras Freire/Smart-Tek/Smartlife, fabrica de pastas Smart-Tek,
-- calefactor Liliana, mesada Dielfe, olla gastronomica Real.
-- 22 confirmados de 27 candidatos investigados.
--
-- Excluidos de esta tanda (5, reportados aparte, no tocados por este SQL):
-- HE-153RCL (Crivel: existen variantes 50L "HE-153RCL" y 53L
-- "HF-153RCL"/"HEA-153RCL", nuestro SKU exacto corresponde a la de 50L,
-- contradice el dato de 53L ya cargado) - E265 (Eiffel: nuestra base dice
-- "300W bowl plastico" pero el modelo real es 400W con bowl de acero
-- inoxidable, contradice ambos datos) - EV-950 (Everest: sin fuente
-- confiable, no se encontro ese modelo) - F02 (Fineschi: nuestra base dice
-- "1/2 HP" pero todas las fuentes confirman que el motor real es de 1/4
-- HP -el de 1/2 HP corresponde a otro producto vendido en combo-,
-- contradice el dato ya cargado) - SPL-012 (Fineschi: nuestra base dice
-- "3 cuchillas" pero el modelo vertical SPL-012 real tiene 4 cuchillas,
-- contradice el dato ya cargado).

-- FTP530: Turboforzador calefactor Liliana Tropic (fuente: Pardo, Fravega, Musimundo)
update products set
  description = 'Calefactor de torre con forzador oscilante, pensado para calentar ambientes de forma rapida y eficiente sin consumir oxigeno. Cuenta con sensor de temperatura ambiente y corte automatico por sobrecalentamiento o caida.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"FTP530 (Tropic)"},{"label":"Dimensiones","value":"57.4 x 22 x 15.9 cm"},{"label":"Potencia","value":"750 / 1500 W"},{"label":"Función","value":"Forzador oscilante, placa cerámica PTC, sensor de temperatura ambiente, corte por sobrecalentamiento y por caída"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'FTP530';

-- 601400612: Anafe a gas Aurora Yanuy AGLX (fuente: Fravega, Alperin, Alecentrodecompras)
update products set
  description = 'Anafe a gas de 4 hornallas con superficie de acero inoxidable, apto para empotrar en la mesada. Cuenta con encendido electronico con una sola mano y valvulas de seguridad en las 4 hornallas.',
  specs = '[{"label":"Marca","value":"Aurora"},{"label":"Modelo","value":"Yanuy AGLX"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"59.5 x 55 x 8 cm"},{"label":"Peso","value":"8.2 kg"},{"label":"Función","value":"4 hornallas, encendido electrónico, válvulas de seguridad, multigas (envasado y natural), empotrable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '601400612';

-- M35: Horno eléctrico Aurora Kankay (fuente: MercadoLibre, Provincia Compras, Aricomuebles)
update products set
  description = 'Horno electrico de mesa con tres estantes, pensado para hornear y asar varios alimentos a la vez. Cuenta con funcion espiedo giratorio, puerta de doble vidrio y luz interior.',
  specs = '[{"label":"Marca","value":"Aurora"},{"label":"Modelo","value":"Kankay M35"},{"label":"Dimensiones","value":"52.5 x 33 x 38.5 cm"},{"label":"Capacidad","value":"35 L"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1600 W"},{"label":"Función","value":"3 estantes, temperatura 90-230°C, puerta de doble vidrio, luz interior, control mecánico, función espiedo, incluye pinzas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'M35';

-- HE-143CL: Horno eléctrico Crivel (fuente: Saturno Hogar, Gamma Hogar, Previsora del Paraná)
update products set
  description = 'Horno electrico compacto con tres niveles de coccion, pensado para cocinas con espacio reducido. Incluye parrilla y pinzas metalicas, sin necesidad de conexion a gas.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"HE-143CL"},{"label":"Capacidad","value":"43 L"},{"label":"Función","value":"Cocción superior/inferior/ambos lados, convección, temperatura 100-250°C, timer 120 min, 3 niveles de potencia, incluye parrilla y pinzas metálicas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HE-143CL';

-- HE-163RCL: Horno eléctrico Crivel con spiedo (fuente: Fravega, Megatone, Paez Refrigeración)
update products set
  description = 'Horno electrico con espiedo giratorio, pensado para asar pollos y carnes de forma pareja. Cuenta con tres niveles de coccion y luz interior para controlar el proceso.',
  specs = '[{"label":"Marca","value":"Crivel"},{"label":"Modelo","value":"HE-163RCL"},{"label":"Peso","value":"11.2 kg"},{"label":"Dimensiones","value":"49 x 33 x 37 cm"},{"label":"Capacidad","value":"60 L"},{"label":"Potencia","value":"2200 W"},{"label":"Función","value":"Cocción por convección y espiedo giratorio, 3 niveles de cocción, temperatura 60-250°C, timer 120 min con aviso, luz interior, incluye bandeja, parrilla y pinzas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HE-163RCL';

-- E802: Batidora planetaria Eiffel (fuente: Inflablesworld, e-Som, DN ElectroHome)
update products set
  description = 'Batidora de pie planetaria con bowl de acero inoxidable y cabezal inclinable, pensada para amasar, batir y mezclar. Incluye tres accesorios intercambiables para distintos tipos de preparaciones.',
  specs = '[{"label":"Marca","value":"Eiffel"},{"label":"Modelo","value":"E-802"},{"label":"Color","value":"Blanco"},{"label":"Capacidad","value":"5 L (bowl acero inoxidable)"},{"label":"Potencia","value":"1000 W"},{"label":"Función","value":"8 niveles de potencia, cabezal inclinable, incluye gancho amasador, batidor plano y batidor de alambre, tapa antisalpicaduras, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'E802';

-- 46ACL10: Horno eléctrico Codini con 2 anafes (fuente: MercadoLibre, Bidcom, Previsora del Paraná)
update products set
  description = 'Horno electrico con dos anafes superiores, pensado para cocinar y hornear al mismo tiempo. Cuenta con funcion conveccion, luz interior y timer programable.',
  specs = '[{"label":"Marca","value":"Codini"},{"label":"Modelo","value":"46ACL10"},{"label":"Peso","value":"11.6 kg"},{"label":"Dimensiones","value":"56 x 35 x 40 cm"},{"label":"Capacidad","value":"33 L"},{"label":"Potencia","value":"1600 W (horno), anafes 1100/650 W"},{"label":"Función","value":"2 anafes superiores, convección, timer hasta 60 min, luz interior, bandeja enlozada"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '46ACL10';

-- 046020R: Olla gastronómica Real Nº40 (fuente: múltiples distribuidores de gastronomía)
update products set
  description = 'Olla de aluminio reforzado para uso gastronomico o domestico de grandes volumenes, pensada para cocinar en cantidad. Su material distribuye el calor de forma pareja y no traslada gusto ni olor a los alimentos.',
  specs = '[{"label":"Marca","value":"Real"},{"label":"Modelo","value":"Nº40"},{"label":"Material","value":"Aluminio reforzado (2.5mm)"},{"label":"Dimensiones","value":"40 cm diámetro x 40 cm alto"},{"label":"Capacidad","value":"50 L"},{"label":"Función","value":"Asas de fundición de aluminio con triple remache, incluye tapa"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '046020R';

-- 046017R: Olla gastronómica Real Nº34 (fuente: múltiples distribuidores de gastronomía)
update products set
  description = 'Olla de aluminio reforzado para uso gastronomico o domestico, pensada para cocinar en cantidad. Su material distribuye el calor de forma pareja y no traslada gusto ni olor a los alimentos.',
  specs = '[{"label":"Marca","value":"Real"},{"label":"Modelo","value":"Nº34"},{"label":"Material","value":"Aluminio reforzado (2.5mm)"},{"label":"Dimensiones","value":"34 cm diámetro x 34 cm alto"},{"label":"Capacidad","value":"30 L"},{"label":"Función","value":"Asas de fundición de aluminio con triple remache, incluye tapa"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '046017R';

-- 046023R: Olla gastronómica Real Nº50 (fuente: múltiples distribuidores de gastronomía)
update products set
  description = 'Olla de aluminio reforzado para uso gastronomico de grandes volumenes, pensada para restaurantes o preparaciones en cantidad. Su material distribuye el calor de forma pareja y no traslada gusto ni olor a los alimentos.',
  specs = '[{"label":"Marca","value":"Real"},{"label":"Modelo","value":"Nº50"},{"label":"Material","value":"Aluminio reforzado (2.5mm)"},{"label":"Dimensiones","value":"50 cm diámetro x 50 cm alto"},{"label":"Capacidad","value":"100 L"},{"label":"Función","value":"Asas de fundición de aluminio con triple remache, incluye tapa"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '046023R';

-- 425000006: Fábrica de pastas Smart-Tek Buona Pasta (fuente: Fravega, Cetrogar, Megatone, Smart-Tek oficial)
update products set
  description = 'Fabrica de pastas manual de acero inoxidable, pensada para preparar spaghetti, fettuccini y lasagna en casa. Su rodillo de amasado con 7 posiciones permite controlar el grosor de la masa.',
  specs = '[{"label":"Marca","value":"Smart-Tek"},{"label":"Modelo","value":"Buona Pasta (BP2017)"},{"label":"Material","value":"Acero inoxidable, rodillos y cuchillas niqueladas"},{"label":"Función","value":"7 posiciones de grosor (0.5 a 3mm), corta spaghetti/fettuccini/lasagna, incluye mordaza para fijar a la mesa y manivela"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '425000006';

-- 423000007: Batidora planetaria Smart-Tek Kitchen Assist (fuente: MercadoLibre, ICBC Mall, Fravega, Cetrogar)
update products set
  description = 'Batidora de pie planetaria con bowl de acero inoxidable, pensada para amasar, batir y mezclar. Su sistema planetario cubre toda la superficie del bowl para una mezcla mas rapida y pareja.',
  specs = '[{"label":"Marca","value":"Smart-Tek"},{"label":"Modelo","value":"Kitchen Assist"},{"label":"Capacidad","value":"4 L (bowl acero inoxidable)"},{"label":"Potencia","value":"600 W"},{"label":"Función","value":"6 velocidades + pulso, sistema planetario, incluye batidor de alambre, batidor plano y gancho amasador, tapa antisalpicaduras"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '423000007';

-- SL-SB0037R: Batidora planetaria Smartlife (fuente: Fravega, Megatone, Garbarino, Smartlife oficial)
update products set
  description = 'Batidora de pie planetaria con bowl de acero inoxidable, pensada para amasar, batir y mezclar. Su cabezal se inclina hacia arriba para facilitar el acceso y el cambio de accesorios.',
  specs = '[{"label":"Marca","value":"Smartlife"},{"label":"Modelo","value":"SL-SB0037R"},{"label":"Color","value":"Rojo"},{"label":"Peso","value":"5.2 kg"},{"label":"Dimensiones","value":"27.5 x 35.5 x 43 cm"},{"label":"Capacidad","value":"5 L (bowl acero inoxidable)"},{"label":"Voltaje","value":"220-240V, 50/60Hz"},{"label":"Potencia","value":"1000 W"},{"label":"Función","value":"6 velocidades + pulso, cabezal inclinable, incluye batidor de alambre, mezclador y gancho amasador, tapa antisalpicaduras"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SL-SB0037R';

-- 4651615: Batidora planetaria Freire 10L (fuente: Casa El Gato, Gastronomía González, Frioequipo)
update products set
  description = 'Batidora planetaria industrial pensada para panaderias y reposterias, con capacidad para amasar hasta 1.5 kg de harina. Incluye accesorios de batido, amasado y lira para distintos tipos de preparaciones.',
  specs = '[{"label":"Marca","value":"Freire"},{"label":"Dimensiones","value":"32 x 56 x 49 cm"},{"label":"Capacidad","value":"10 L (bowl acero inoxidable 304, diámetro 26cm)"},{"label":"Función","value":"Motor monofásico, sistema planetario con giro inverso, transmisión por correa, incluye batidor, amasador y lira"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '4651615';

-- 16561: Batidora planetaria Freire 36L (fuente: Supertodo Belen, Segmar Patagonia, Nubishops)
update products set
  description = 'Batidora planetaria industrial de gran capacidad, pensada para panaderias y reposterias que trabajan grandes volumenes. Su estructura de fundicion gris y bowl de acero inoxidable garantizan uso intensivo.',
  specs = '[{"label":"Marca","value":"Freire"},{"label":"Dimensiones","value":"120 x 48 x 80 cm"},{"label":"Capacidad","value":"36 L"},{"label":"Potencia","value":"3/4 HP"},{"label":"Función","value":"3 velocidades, estructura de fundición gris, bowl de acero inoxidable, batidor de flejes"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '16561';

-- B-60CA: Horno eléctrico Solei con 2 anafes (fuente: Fravega, Garbarino, Megatone, Habitar)
update products set
  description = 'Horno electrico con dos anafes superiores, pensado para cocinar y hornear al mismo tiempo. Cuenta con tres estantes, timer y bandeja esmaltada incluida.',
  specs = '[{"label":"Marca","value":"Solei"},{"label":"Modelo","value":"B-60CA"},{"label":"Color","value":"Negro"},{"label":"Capacidad","value":"50 L"},{"label":"Potencia","value":"2000 W (anafe grande 1000W, anafe chico 800W)"},{"label":"Función","value":"2 anafes superiores, temperatura 100-250°C, timer 60 min, 3 estantes, 2 resistencias superiores + 2 inferiores, incluye bandeja esmaltada y rejilla"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B-60CA';

-- B-42CE: Horno eléctrico Solei con 2 anafes (fuente: Fravega, Mandy Hogar, Delfino Hogar, Shopping Onelli)
update products set
  description = 'Horno electrico compacto con dos anafes superiores, pensado para cocinas con espacio reducido. Incluye pinza, rejilla y bandeja, con funcion de conveccion.',
  specs = '[{"label":"Marca","value":"Solei"},{"label":"Modelo","value":"B-42CE"},{"label":"Color","value":"Negro"},{"label":"Voltaje","value":"220V"},{"label":"Capacidad","value":"35 L"},{"label":"Potencia","value":"1600 W"},{"label":"Función","value":"2 anafes superiores, convección, temperatura 100-250°C, timer 60 min, control mecánico, incluye pinza, rejilla y bandeja"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B-42CE';

-- B85CE: Horno eléctrico Solei (fuente: Dogil, Chemesweb, Maxihogar, Selex Hogar)
update products set
  description = 'Horno electrico de mesa con sistema de conveccion para una coccion pareja, pensado para hornear, asar y gratinar. Cuenta con estantes ajustables en distintas alturas y apagado automatico con aviso.',
  specs = '[{"label":"Marca","value":"Solei"},{"label":"Modelo","value":"B85CE"},{"label":"Dimensiones","value":"62 x 49 x 41.5 cm (exterior)"},{"label":"Capacidad","value":"70 L"},{"label":"Potencia","value":"2200 W"},{"label":"Función","value":"Convección, temperatura 100-250°C, timer 60 min con apagado automático, 2 resistencias superiores + 2 inferiores, estantes ajustables, detalles en acero inoxidable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'B85CE';

-- 506A: Anafe Danda 2 hornallas vertical (fuente: Mis Parrillas, Fravega, Gastrofactory Online, Danda oficial)
update products set
  description = 'Anafe industrial a gas de dos hornallas en formato vertical, pensado para uso comercial o gastronomico. Su estructura de acero inoxidable AISI 430 es apta para gas envasado y gas natural.',
  specs = '[{"label":"Marca","value":"Danda"},{"label":"Modelo","value":"506A"},{"label":"Material","value":"Acero inoxidable AISI 430 esmerilado"},{"label":"Peso","value":"9 kg"},{"label":"Dimensiones","value":"32 x 84 x 60 cm"},{"label":"Función","value":"2 hornallas (1800 y 2200 kcal), rejas de fundición de aluminio, bandeja antiderrame desmontable, apto gas envasado y natural"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '506A';

-- 504A: Anafe Danda 4 hornallas con base (fuente: Mis Parrillas, MercadoLibre, Danda oficial)
update products set
  description = 'Anafe industrial a gas de cuatro hornallas con base, pensado para uso comercial o gastronomico intensivo. Su estructura de acero inoxidable es convertible a gas natural o gas envasado.',
  specs = '[{"label":"Marca","value":"Danda"},{"label":"Modelo","value":"504A"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"62 x 90 x 61 cm"},{"label":"Función","value":"4 hornallas (2 de 1800 kcal + 2 de 2200 kcal), rejas de fundición de aluminio, multigas, encendido manual, montaje de pie"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '504A';

-- HGCSA6324AUAPI: Horno eléctrico Sansei con anafe y grill (fuente: Tienda Newsan, Alegio, Casa Pagano, Casa Policella)
update products set
  description = 'Horno electrico con anafes superiores y grill, pensado para cocinar y hornear al mismo tiempo. Cuenta con conveccion, luz interior y tres niveles de posicion para las bandejas.',
  specs = '[{"label":"Marca","value":"Sansei"},{"label":"Modelo","value":"HGCSA6324AUAPI"},{"label":"Peso","value":"16 kg"},{"label":"Dimensiones","value":"50 x 54 x 63 cm"},{"label":"Capacidad","value":"63 L"},{"label":"Potencia","value":"2800 W"},{"label":"Función","value":"2 anafes superiores, convección, grill, temperatura 80-250°C, timer 120 min, luz interior, 3 niveles internos, incluye 2 bandejas y rejilla"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HGCSA6324AUAPI';

-- MESX120: Mesada de acero inoxidable Dielfe (fuente: La Anónima, Dapas Hogar)
update products set
  description = 'Mesada de acero inoxidable para cocina, pensada para instalar sobre bajo mesada. Es reversible para colocar la bacha a derecha o izquierda, e incluye manual de armado y elementos de fijacion.',
  specs = '[{"label":"Marca","value":"Dielfe"},{"label":"Modelo","value":"MESX120"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"120 x 51 x 2.5 cm"},{"label":"Función","value":"Reversible (derecha e izquierda), no incluye cajones ni estantes, incluye manual de armado y fijaciones"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MESX120';
