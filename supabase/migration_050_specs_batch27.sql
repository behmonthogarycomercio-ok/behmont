-- Migracion 050: tanda 27 de specs/descripcion investigados (skill
-- product-specs-research). Primera tanda de la categoria "Gastronomia":
-- pequeños electrodomesticos de cocina Liliana, Atma, BGH, Oster, Kanji y
-- Midea (batidoras, anafes, hornos electricos, freidoras de aire, campana,
-- aspiradora). 25 confirmados de 27 candidatos investigados.
--
-- Excluidos de esta tanda (2, reportados aparte, no tocados por este SQL):
-- OPP21P (Philco: nuestra base dice "1100W 6L" pero todas las fuentes
-- confirman 900W y 4.8L, contradice el dato ya cargado) - WH-BL1000LA01
-- (Kanji/Westinghouse: nuestra base dice "800W" pero ese modelo exacto
-- (WH-BL1000LA01) es de 1000W segun todas las fuentes -el de 800W es un
-- modelo distinto, WH-BL0800HB01-, contradice el dato ya cargado).

-- AB914N: Batidora planetaria Liliana Turbobat (fuente: Megatone, Fravega, Somos Rex, Dapas)
update products set
  description = 'Batidora de pie planetaria con bowl de acero inoxidable, pensada para masas livianas, pesadas y duras gracias a sus tres accesorios intercambiables. Su tapa hermetica antisalpicaduras permite agregar ingredientes mientras esta en funcionamiento.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB914N (Turbobat)"},{"label":"Color","value":"Negro con plata"},{"label":"Dimensiones","value":"37.5 x 41 x 27 cm"},{"label":"Capacidad","value":"4.5 L (bowl acero inoxidable)"},{"label":"Potencia","value":"800 W"},{"label":"Función","value":"3 velocidades + turbo, incluye batidor de alambre, batidor plano y amasador, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AB914N';

-- AA902: Anafe eléctrico Liliana 2 hornallas (fuente: Bidcom, Coopehogar, Garbarino, Fravega)
update products set
  description = 'Anafe electrico portatil de 2 hornallas, pensado para cocinas chicas, casas rodantes o como equipo auxiliar. Cuenta con seis niveles de temperatura y corte automatico por sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AA902"},{"label":"Dimensiones","value":"42 x 23 cm"},{"label":"Potencia","value":"2300 W (hornalla chica 900W, hornalla grande 1400W)"},{"label":"Función","value":"2 hornallas (165mm y 130mm), 6 niveles de temperatura, indicador luminoso, corte por sobrecalentamiento, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AA902';

-- LA782: Aspiradora Liliana con bolsa (fuente: Fravega, D''Ricco, Centrogar, Coopehogar)
update products set
  description = 'Aspiradora con bolsa de tela lavable, pensada para pisos y alfombras del hogar. Incluye manguera flexible con rotacion de 360 grados y boquillas para rincones y tapizados.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"LA782 (Chromepower)"},{"label":"Capacidad","value":"2 L"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"Bolsa de tela lavable, cepillo dual pisos/alfombras, boquilla para rincones/tapizados, indicador de llenado, enrollacable automático, cable 4m"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'LA782';

-- AF931: Freidora de aire Liliana Smartfry (fuente: Style Store, Nuevas Hogar, Liliana oficial, Garbarino)
update products set
  description = 'Freidora de aire digital pensada para cocinar con menos aceite de forma mas saludable. Cuenta con 8 programas preestablecidos y canasta antiadherente apta para lavavajillas.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AF931 (Smartfry)"},{"label":"Peso","value":"5.07 kg"},{"label":"Capacidad","value":"3.7 L"},{"label":"Potencia","value":"1400 W"},{"label":"Función","value":"Panel digital, 8 programas, temperatura 20-220°C, timer, función Stay On, canasta antiadherente removible apta lavavajillas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AF931';

-- AF915: Freidora de aire Liliana Natural Fryer (fuente: Fravega, Mandy Hogar, Somos Rex)
update products set
  description = 'Freidora de aire sin aceite, pensada para cocinar de forma mas saludable con circulacion de aire caliente. Cuenta con canasta antiadherente removible y termostato regulable.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AF915 (Natural Fryer)"},{"label":"Capacidad","value":"3.5 L"},{"label":"Potencia","value":"1350 W"},{"label":"Función","value":"Termostato regulable hasta 200°C, timer hasta 60 minutos, canasta antiadherente removible"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AF915';

-- AO935: Horno eléctrico Liliana Digitalcook (fuente: Fravega, Habitar, Tecnomaquinas, ManualsLib)
update products set
  description = 'Horno electrico de mesa con panel digital touch y spiedo rotativo, pensado para hornear, asar y calentar. Su puerta de doble vidrio brinda mejor aislamiento termico durante la coccion.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AO935 (Digitalcook)"},{"label":"Dimensiones","value":"53.5 x 33.5 x 38 cm"},{"label":"Capacidad","value":"35 L"},{"label":"Voltaje","value":"220-240V, 50/60Hz"},{"label":"Potencia","value":"1600 W"},{"label":"Función","value":"Display digital touch, convección forzada, spiedo rotativo, temperatura hasta 230°C, timer con aviso sonoro, función descongelar"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AO935';

-- AB909: Batidora planetaria Liliana Prettybat (fuente: Fravega, Megatone, Liliana oficial)
update products set
  description = 'Batidora de pie planetaria con bowl de acero inoxidable, pensada para masas livianas, pesadas y duras. Incluye tres accesorios intercambiables aptos para lavavajillas y tapa hermetica antisalpicaduras.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB909 (Prettybat)"},{"label":"Capacidad","value":"4.3 L (bowl acero inoxidable)"},{"label":"Potencia","value":"700 W"},{"label":"Función","value":"Regulador electrónico de potencia, incluye batidor whisker, batidor plano y amasador, base antideslizante, tapa hermética antisalpicaduras"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AB909';

-- AFP910: Horno de pan Liliana Full Bread (fuente: Somos Rex, Fravega, Garbarino, Hendel)
update products set
  description = 'Maquina de pan con 12 programas digitales preestablecidos, pensada para preparar pan, masa de pizza, pasta, tortas y mermeladas en casa. Incluye visor transparente para controlar la coccion y accesorio para baguettes.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AFP910 (Full Bread)"},{"label":"Capacidad","value":"Hasta 1.25 kg de pan"},{"label":"Potencia","value":"850 W"},{"label":"Función","value":"12 programas digitales, visor transparente, función mantener caliente hasta 60 min, timer hasta 15 horas, accesorio para baguettes"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AFP910';

-- AK200: Multicocina eléctrica Liliana Kitchinet Max (fuente: Fravega, Provincia Compras, Garbarino)
update products set
  description = 'Multicocina electrica 7 en 1 que funciona como parrilla, horno, sarten, cocina electrica, paellera, vaporera y fondue. Cuenta con tapa de vidrio templado con salida de vapor y base antiadherente enlozada.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AK200 (Kitchinet Max)"},{"label":"Dimensiones","value":"27 x 34 x 7.7 cm"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"7 en 1 (parrilla, horno, sartén, cocina, paellera, vapor, fondue), termostato 5 niveles, tapa de vidrio templado, base antiadherente enlozada"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AK200';

-- AB102: Batidora Liliana Giramix (fuente: Fravega, Electromisiones, Somos Rex)
update products set
  description = 'Batidora 2 en 1 que se puede usar de mano o de pie segun la necesidad, con bowl giratorio incluido. Cuenta con funcion turbo y boton eyector para cambiar accesorios facilmente.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB102 (Giramix)"},{"label":"Color","value":"Blanco"},{"label":"Peso","value":"2.5 kg"},{"label":"Dimensiones","value":"24.5 x 24.3 x 31.6 cm"},{"label":"Capacidad","value":"3 L (bowl giratorio)"},{"label":"Potencia","value":"450 W"},{"label":"Función","value":"5 velocidades + turbo, diseño 2 en 1 (mano o pie), batidores y ganchos amasadores metálicos, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AB102';

-- AO170: Horno eléctrico Liliana Grandcook (fuente: Megatone, Hendel, Authogar, Dismar)
update products set
  description = 'Horno electrico de mesa con cuatro resistencias de acero inoxidable, pensado para hornear, asar y gratinar en cantidad. Cuenta con timer programable y luz interior para controlar la coccion.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AO170 (Grandcook)"},{"label":"Dimensiones","value":"62.5 x 41.5 x 47.5 cm"},{"label":"Capacidad","value":"70 L"},{"label":"Potencia","value":"2400 W"},{"label":"Función","value":"Temperatura hasta 250°C, cocción desde arriba/abajo/ambos lados, timer 60 min con alarma, 4 resistencias de acero inoxidable, luz interior"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AO170';

-- AB925N: Batidora planetaria Liliana Mixtime (fuente: Cetrogar, Pardo, Novogar, Liliana oficial)
update products set
  description = 'Batidora de pie planetaria con timer digital y movimiento planetario para mezclas mas homogeneas. Pensada para reposteria, panificados y preparaciones diarias gracias a su bowl de gran capacidad.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AB925N (Mixtime)"},{"label":"Peso","value":"3.7 kg"},{"label":"Dimensiones","value":"32 x 28 x 40 cm"},{"label":"Capacidad","value":"5 L (bowl acero inoxidable)"},{"label":"Potencia","value":"1000 W"},{"label":"Función","value":"10 velocidades, timer digital, movimiento planetario, incluye batidor de alambre, batidor plano y amasador, tapa hermética antisalpicaduras"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AB925N';

-- AA901: Anafe eléctrico Liliana 1 hornalla (fuente: Fravega, Garbarino, Demelf, Previsora del Paraná)
update products set
  description = 'Anafe electrico portatil de 1 hornalla, liviano y facil de transportar, ideal para espacios chicos o como equipo auxiliar. Cuenta con seis niveles de temperatura y corte por sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AA901"},{"label":"Dimensiones","value":"22.5 x 22 cm"},{"label":"Potencia","value":"1300 W"},{"label":"Función","value":"1 hornalla (150mm), 6 niveles de temperatura, indicador luminoso, corte por sobrecalentamiento, base antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AA901';

-- KC994: Campana de cocina Liliana Puredesign (fuente: Fravega, Megatone, MercadoLibre)
update products set
  description = 'Campana extractora de cocina con vidrio templado curvo y cuerpo de acero inoxidable, pensada para eliminar humos y vapores de coccion. Cuenta con dos luminarias LED y panel de comando por botonera.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"KC994 (Puredesign)"},{"label":"Material","value":"Acero inoxidable con vidrio templado curvo"},{"label":"Dimensiones","value":"59.5 cm ancho x 47 cm profundidad (hasta 90.9 cm de alto)"},{"label":"Potencia","value":"165 W"},{"label":"Función","value":"3 velocidades, extracción hasta 520 m³/h, filtro de aluminio de 5 capas, 2 luces LED, apta para cocinas a gas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KC994';

-- AO146: Horno eléctrico Liliana Chefcook (fuente: Megatone, MercadoLibre, Garbarino, Hendel)
update products set
  description = 'Horno electrico de mesa con conveccion forzada y encendido independiente para una distribucion pareja del calor. Cuenta con luz interior y timer programable con aviso sonoro.',
  specs = '[{"label":"Marca","value":"Liliana"},{"label":"Modelo","value":"AO146 (Chefcook)"},{"label":"Dimensiones","value":"56 x 35 x 41.7 cm"},{"label":"Capacidad","value":"46 L"},{"label":"Potencia","value":"2200 W"},{"label":"Función","value":"Convección forzada, cocción desde arriba/abajo/ambos lados, temperatura hasta 250°C, timer con aviso sonoro, bandeja antiadherente y rejilla metálica"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AO146';

-- HG4010AN: Horno eléctrico Atma con 2 anafes (fuente: Fravega, Habitar, HiperHogar, Atma oficial)
update products set
  description = 'Horno electrico con dos anafes superiores, pensado para cocinar y hornear al mismo tiempo. Cuenta con puerta de amplio visor y luz interior para controlar la coccion.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"HG4010AN"},{"label":"Dimensiones","value":"54 x 36 x 38 cm"},{"label":"Capacidad","value":"40 L"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"2 anafes superiores, temperatura 100-250°C, timer hasta 60 min, cocción arriba/abajo/combinada, luz interior, incluye asadera, rejilla y pinza"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HG4010AN';

-- FR246AWP: Freidora de aire Atma digital con visor (fuente: Fravega, Megatone, Cetrogar, Oscar Barbieri)
update products set
  description = 'Freidora de aire digital con visor transparente, pensada para cocinar de forma mas saludable reduciendo hasta un 85% el uso de aceite. Cuenta con 8 programas preestablecidos y canasta antiadherente removible.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"FR246AWP"},{"label":"Color","value":"Blanco"},{"label":"Capacidad","value":"6 L"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1750 W"},{"label":"Función","value":"Panel digital touch, 8 programas, temperatura 75-200°C, visor con luz, canasta antiadherente removible"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'FR246AWP';

-- FR3620: Freidora de aire Atma digital (fuente: Fravega, MercadoLibre, Brandimia)
update products set
  description = 'Freidora de aire digital sin aceite, pensada para cocinar de forma mas saludable. Cuenta con olla antiadherente removible y proteccion contra sobrecalentamiento.',
  specs = '[{"label":"Marca","value":"Atma"},{"label":"Modelo","value":"FR3620"},{"label":"Peso","value":"3.5 kg"},{"label":"Dimensiones","value":"27.5 x 31 x 34.5 cm"},{"label":"Capacidad","value":"3.6 L"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1400 W"},{"label":"Función","value":"Panel LED, temperatura 80-200°C, timer 60 min, protección contra sobrecalentamiento, olla antiadherente removible"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'FR3620';

-- BHE64M20AN: Horno eléctrico BGH con anafe (fuente: Fravega, BGH oficial, Megatone, Musimundo)
update products set
  description = 'Horno electrico con dos anafes superiores y gabinete de acero inoxidable, pensado para cocinar y hornear al mismo tiempo. Incluye grill y sistema de apertura vertical con amplio visor.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"BHE64M20AN"},{"label":"Peso","value":"12 kg"},{"label":"Dimensiones","value":"64 x 41 x 43.8 cm"},{"label":"Capacidad","value":"64 L"},{"label":"Voltaje","value":"220-240V, 50/60Hz"},{"label":"Potencia","value":"3200 W máx. (horno 2200W, anafe chico 700W, anafe grande 1000W)"},{"label":"Función","value":"2 anafes superiores, convección, termostato 100-250°C, timer con Stay On, 4 resistencias, incluye grill, gabinete acero inoxidable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BHE64M20AN';

-- BHE40M23N: Horno eléctrico BGH Duo (fuente: Fravega, BGH oficial, Somos Rex, D''Ricco)
update products set
  description = 'Horno electrico con doble grill y tres niveles de coccion, pensado para hornear y gratinar. Incluye bandeja asadera y rejilla metalica, con control mecanico y funcion Stay On para cocciones prolongadas.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"BHE40M23N"},{"label":"Peso","value":"7 kg"},{"label":"Dimensiones","value":"51 x 32.3 x 38.8 cm"},{"label":"Capacidad","value":"40 L"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"Termostato 100-250°C, timer 60 min con Stay On, doble grill, 3 niveles de cocción, control mecánico, incluye bandeja y rejilla"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BHE40M23N';

-- BHE55M23N: Horno eléctrico BGH Duo (fuente: Fravega, BGH oficial, Somos Rex, Rodo)
update products set
  description = 'Horno electrico con sistema de conveccion y doble grill, pensado para hornear y gratinar en cantidad. Cuenta con cuatro guias laterales y termostato regulable.',
  specs = '[{"label":"Marca","value":"BGH"},{"label":"Modelo","value":"BHE55M23N"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"8.7 kg"},{"label":"Dimensiones","value":"56 x 35.5 x 42.2 cm"},{"label":"Capacidad","value":"55 L (37 L útil)"},{"label":"Voltaje","value":"220-240V, 50/60Hz"},{"label":"Potencia","value":"2000 W máx."},{"label":"Función","value":"Termostato 100-250°C, timer hasta 60 min, doble grill + convección, 4 guías laterales, incluye bandeja"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BHE55M23N';

-- OS-BAT3711: Batidora planetaria Oster (fuente: Fravega, Megatone, Mobihogar)
update products set
  description = 'Batidora de pie planetaria con bowl de acero inoxidable, pensada para amasar, batir y mezclar con facilidad. Su rotacion planetaria asegura una mezcla uniforme al mover el bowl en sentido contrario a las varillas.',
  specs = '[{"label":"Marca","value":"Oster"},{"label":"Modelo","value":"OS-BAT3711 (SM3711)"},{"label":"Peso","value":"6.65 kg"},{"label":"Dimensiones","value":"29.6 x 36.2 x 27.8 cm"},{"label":"Capacidad","value":"4 L (bowl acero inoxidable)"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"750 W"},{"label":"Función","value":"12 velocidades, rotación planetaria, incluye mezclador, amasador y batidor, cubierta antisalpicaduras"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'OS-BAT3711';

-- KJH-HP2200STD: Anafe eléctrico Kanji 2 hornallas (fuente: Fravega, Ereño 330, HiperHogar, Dacar Hogar)
update products set
  description = 'Anafe electrico de pie con dos hornallas de superficie de acero forjado, pensado como equipo de coccion auxiliar. Cuenta con encendido electronico y termostato regulable para cada preparacion.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJH-HP2200STD"},{"label":"Color","value":"Negro"},{"label":"Peso","value":"2.95 kg"},{"label":"Dimensiones","value":"48 x 27.5 x 6 cm"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"2200 W"},{"label":"Función","value":"2 hornallas, encendido electrónico, termostato regulable, apoyo antideslizante"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJH-HP2200STD';

-- KJHAF1404: Freidora de aire Kanji Home digital (fuente: Fava, Fravega, Teczo)
update products set
  description = 'Freidora de aire digital pensada para cocinar con mucho menos aceite que una freidora tradicional. Utiliza circulacion de aire caliente de alta velocidad para lograr una coccion pareja y textura crocante.',
  specs = '[{"label":"Marca","value":"Kanji"},{"label":"Modelo","value":"KJHAF1404 (Kanji Home)"},{"label":"Capacidad","value":"4 L"},{"label":"Función","value":"Panel digital con visor, temperatura 80-200°C, timer, tecnología de circulación de aire caliente"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'KJHAF1404';

-- AF-M125BAR1: Freidora eléctrica Midea sin aceite (fuente: MercadoLibre, Fravega, Midea oficial)
update products set
  description = 'Freidora de aire sin aceite, pensada para cocinar de forma mas saludable. Sus piezas removibles y antiadherentes son aptas para lavavajillas, facilitando la limpieza despues de cada uso.',
  specs = '[{"label":"Marca","value":"Midea"},{"label":"Modelo","value":"AF-M125BAR1"},{"label":"Dimensiones","value":"33.1 x 31.1 x 26.3 cm"},{"label":"Capacidad","value":"2.5 L"},{"label":"Voltaje","value":"220V, 50Hz"},{"label":"Potencia","value":"1475 W"},{"label":"Función","value":"Control mecánico, temperatura hasta 200°C, timer hasta 60 min, piezas removibles aptas para lavavajillas"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'AF-M125BAR1';
