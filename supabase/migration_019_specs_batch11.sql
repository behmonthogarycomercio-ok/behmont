-- Migracion 019: onceava tanda de specs/descripcion investigados (skill
-- product-specs-research). Sigue cubriendo la categoria "Electrodomesticos"
-- (cocinas, calefones, termotanques, ventiladores, pequenos electrodomesticos
-- de cocina y limpieza). Esta tanda junta 45 productos confirmados de un pool
-- de 60 candidatos investigados en paralelo (60-75% de confirmacion esperada
-- segun la skill; esta vez salio ~75%, se entrega todo junto para no
-- desperdiciar la investigacion ya hecha en vez de cortar en 30).
-- Fuentes: sitios oficiales de fabricante (Escorial, Orbis, Volcan, Sol Real,
-- Kanji, Crivel, Smartlife, Drean, Senorial, Santini, Motta) y tiendas
-- reconocidas (Fravega, Megatone, Garbarino, Cetrogar). Solo toca
-- specs/description de estos 45 SKU puntuales, no pisa nada mas.
--
-- Excluidos de esta tanda (15, reportados aparte, no tocados por este SQL):
-- LCF912B, P78, 42096, XP090, LML601B (sin fuente confiable) - 7,79801E+12-4
-- y 7,79801E+12-5 y 7,79801E+12-6 (Escorial linea "Master": el nombre carga
-- 51 cm pero TODAS las fuentes oficiales de esa linea son de 56 cm ancho,
-- contradiccion de dato real) - PAS1217 (Atma, contradiccion ya conocida de
-- tanda anterior: base ceramica vs "base aluminio" del nombre) - V33SOLEI,
-- V15, "15", SPL-005 (conflicto de marca real: ese codigo es de Spolu, no
-- Fineschi), 614651, V922-A- (sin fuente confiable que confirme el codigo
-- exacto).

-- E606: Pava electrica de vidrio Eiffel 1.7L (fuente: pixelstore.com.ar, mall.icbc.com.ar)
update products set
  description = 'Pava electrica de vidrio templado pensada para preparar mate o cafe rapido en la cocina. Cuenta con base giratoria, indicador luminoso de encendido y corte automatico al hervir, lo que la hace practica para el uso diario sin supervision constante.',
  specs = '[
    {"label":"Marca","value":"Eiffel"},
    {"label":"Modelo","value":"E-606"},
    {"label":"Material","value":"Vidrio templado"},
    {"label":"Capacidad","value":"1.7 L"},
    {"label":"Función","value":"Corte automático, luz indicadora, base giratoria"},
    {"label":"Niveles de temperatura","value":"2"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'E606';

-- LSC7000: Lavarropas semiautomatico Columbia 7kg (fuente: Fravega, columbiaelectrodomesticos.com.ar)
update products set
  description = 'Lavarropas semiautomatico de carga superior pensado para quien busca bajo consumo electrico y no necesita conexion a red de agua a presion, ya que la carga y descarga son manuales. Con capacidad para 7 kg y tecnologia turbo, resuelve el lavado de la ropa de una familia tipo con un mantenimiento simple.',
  specs = '[
    {"label":"Marca","value":"Columbia"},
    {"label":"Modelo","value":"LSC-7000"},
    {"label":"Color","value":"Blanco/Celeste"},
    {"label":"Dimensiones","value":"52 x 89 x 54 cm"},
    {"label":"Capacidad","value":"7 kg"},
    {"label":"Carga","value":"Superior, manual (sin bomba)"},
    {"label":"Programas","value":"7 programas"},
    {"label":"Tecnología","value":"Turbo, triple dispenser"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'LSC7000';

-- 575P: Cocina mini Sol Real c/parrilla (fuente: solreal.com, gastromarket.com.ar)
update products set
  description = 'Cocina mini semi-industrial de 4 hornallas pensada para locales gastronomicos chicos o cocinas con alta demanda de uso. Suma parrilla desplegable con recolector de grasa ademas del horno con piso de tejuelas refractarias, ideal para coccion y ahumado en un mismo equipo.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"575P"},
    {"label":"Material","value":"Acero inoxidable (gabinete), aluminio fundido (hornallas)"},
    {"label":"Dimensiones","value":"57.2 cm de ancho"},
    {"label":"Peso","value":"40.2 kg"},
    {"label":"Hornallas","value":"4, rejas de fundición"},
    {"label":"Horno","value":"Piso de tejuelas refractarias, 3 rejillas, puerta con parrilla desplegable"},
    {"label":"Potencia calórica","value":"20.000 kcal/h"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '575P';

-- 2220: Cocina Usman linea Irina (fuente: aloiserosario.com.ar, MercadoLibre)
update products set
  description = 'Cocina semi-industrial de 4 hornallas con puerta de vidrio doble templado, pensada para uso hogareno intensivo o comercios chicos. El sistema multigas permite adaptarla tanto a gas natural como envasado sin cambiar el equipo.',
  specs = '[
    {"label":"Marca","value":"Usman"},
    {"label":"Modelo","value":"2220 (línea Irina)"},
    {"label":"Material","value":"Acero inoxidable cepillado"},
    {"label":"Dimensiones","value":"55 x 87 x 62 cm"},
    {"label":"Hornallas","value":"4, rejas de fundición"},
    {"label":"Horno","value":"Piso refractario, interior enlozado"},
    {"label":"Puerta","value":"Vidrio templado doble, con termómetro"},
    {"label":"Gas","value":"Multigas (natural/envasado)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '2220';

-- 34272: Procesadora industrial Dynam (fuente: tiendabeleninstalaciones.mitiendanube.com, systel-global.com)
update products set
  description = 'Procesadora industrial de alimentos y vegetales pensada para cocinas con alto volumen de produccion (restaurantes, rotiserias, comedores). Permite cortes en cubos, baston, juliana y rallado grueso o fino intercambiando discos, con doble boca de alimentacion para agilizar el trabajo.',
  specs = '[
    {"label":"Marca","value":"Dynam"},
    {"label":"Material","value":"Aluminio anodizado"},
    {"label":"Dimensiones","value":"23 x 48 x 50 cm"},
    {"label":"Potencia","value":"550 W (¾ HP)"},
    {"label":"Capacidad de producción","value":"300 kg/hora"},
    {"label":"Accesorios","value":"Discos de corte intercambiables (cubo, bastón, juliana, rallado)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '34272';

-- ES-180: Exprimidor industrial Santini (fuente: santini-equipment.com, usacord.com.ar)
update products set
  description = 'Exprimidor de citricos electrico de uso industrial, pensado para bares, rotiserias y comercios con alta demanda de jugo exprimido. Su cuerpo de aluminio inyectado y motor de bajo ruido lo hacen resistente al uso diario intensivo.',
  specs = '[
    {"label":"Marca","value":"Santini"},
    {"label":"Modelo","value":"ES-180"},
    {"label":"Material","value":"Aluminio inyectado, recipiente plástico de alto impacto"},
    {"label":"Dimensiones","value":"21.7 x 30.5 x 34.5 cm"},
    {"label":"Peso","value":"4.77 kg"},
    {"label":"Potencia","value":"180 W (¼ HP), 220V"},
    {"label":"Velocidad","value":"1500 rpm"},
    {"label":"Accesorios","value":"3 conos exprimidores, filtro de semillas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'ES-180';

-- Termotanque electrico Escorial EL-55 55L (fuente: fravega.com, oscarbarbieri.com, escorial.com.ar)
update products set
  description = 'Termotanque electrico de colgar pensado para departamentos o monoambientes con hasta 3 personas. Su tanque de acero enlozado y anodo de magnesio anticorrosivo le dan buena vida util con mantenimiento minimo.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Modelo","value":"EL-55"},
    {"label":"Material","value":"Acero enlozado, aislación en espuma de poliuretano"},
    {"label":"Dimensiones","value":"42.5 x 64 x 42.5 cm"},
    {"label":"Peso","value":"20 kg"},
    {"label":"Potencia","value":"1500 W, 230V"},
    {"label":"Capacidad","value":"55 L (53.5 L neta)"},
    {"label":"Conexión de agua","value":"Inferior, para colgar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12-12';

-- H09-10016: Bateria de cocina Hudson 5 piezas (fuente: gastromercadoweb.com, sears.com.mx)
update products set
  description = 'Bateria de cocina de 5 piezas con revestimiento antiadherente doble capa, pensada para el uso diario en la casa. Incluye dos cacerolas con tapa de vidrio y una sarten, con mangos siliconados que facilitan la manipulacion en la cocina.',
  specs = '[
    {"label":"Marca","value":"Hudson"},
    {"label":"Material","value":"Aluminio con revestimiento antiadherente (teflón)"},
    {"label":"Componentes","value":"Cacerola 24 cm c/tapa, cacerola 18 cm c/tapa, sartén 24 cm"},
    {"label":"Tapas","value":"Vidrio templado con válvula de vapor"},
    {"label":"Mangos","value":"Siliconados"},
    {"label":"Apto para","value":"Anafes a gas, eléctricos y vitrocerámicos"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'H09-10016';

-- 575: Cocina mini Sol Real puerta acero (fuente: solreal.com)
update products set
  description = 'Version base de la cocina mini semi-industrial de Sol Real, sin parrilla y con puerta de acero (no vidriada). Pensada para quien busca un equipo compacto de 4 hornallas con horno de piso refractario para uso hogareno o comercial liviano.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"575"},
    {"label":"Material","value":"Acero inoxidable (gabinete), aluminio fundido (hornallas)"},
    {"label":"Dimensiones","value":"57.2 cm de ancho"},
    {"label":"Hornallas","value":"4, rejas de fundición"},
    {"label":"Horno","value":"Piso de tejuelas refractarias, 3 rejillas"},
    {"label":"Puerta","value":"Acero (sin vidrio, sin parrilla)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '575';

-- HE-CR1800: Pava electrica Copalus Creation CR1800 (fuente: MercadoLibre, losmellizos.com.ar)
update products set
  description = 'Pava electrica de acero inoxidable de buen volumen, pensada para quienes preparan mate o te para varias personas. Incorpora corte automatico especifico para mate y proteccion contra calentamiento en seco, sumando guardacable para un uso mas ordenado.',
  specs = '[
    {"label":"Marca","value":"Copalus"},
    {"label":"Modelo","value":"Creation CR1800"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Dimensiones","value":"23 x 26 x 15 cm"},
    {"label":"Peso","value":"0.65 kg"},
    {"label":"Potencia","value":"1800 W"},
    {"label":"Capacidad","value":"1.8 L"},
    {"label":"Función","value":"Corte automático mate, protección por calentamiento en seco"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'HE-CR1800';

-- 9011: Cocina La Magica Eco Acero (fuente: arielmuebles.com.ar, musicalisimo.com.ar)
update products set
  description = 'Cocina de acero de 4 hornallas con encendido electronico tanto en las hornallas como en el horno, lo que evita depender de fosforos o piloto. El sistema multigas permite usarla con garrafa o gas natural sin adaptaciones extra.',
  specs = '[
    {"label":"Marca","value":"La Mágica"},
    {"label":"Modelo","value":"9011 (línea Eco Acero)"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Dimensiones","value":"56 x 85 x 59 cm"},
    {"label":"Peso","value":"40 kg"},
    {"label":"Hornallas","value":"4, capuchones de fundición enlozada"},
    {"label":"Encendido","value":"Piezoeléctrico (hornallas y horno)"},
    {"label":"Gas","value":"Multigas (natural/envasado)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '9011';

-- 575V: Cocina mini Sol Real puerta vidrio (fuente: solreal.com)
update products set
  description = 'Variante de la cocina mini Sol Real con puerta de vidrio, que permite controlar la coccion sin abrir el horno, y sin parrilla desplegable. Mantiene el mismo cuerpo de 4 hornallas y horno de piso refractario que el resto de la linea 575.',
  specs = '[
    {"label":"Marca","value":"Sol Real"},
    {"label":"Modelo","value":"575V"},
    {"label":"Material","value":"Acero inoxidable (gabinete), aluminio fundido (hornallas)"},
    {"label":"Dimensiones","value":"57.2 cm de ancho"},
    {"label":"Hornallas","value":"4, rejas de fundición"},
    {"label":"Horno","value":"Piso de tejuelas refractarias, 3 rejillas"},
    {"label":"Puerta","value":"Vidrio templado (sin parrilla)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '575V';

-- 3532: Batidora de mano Oster (fuente: surimportacion.com.ar, coopehogar.coop)
update products set
  description = 'Batidora de mano compacta con funcion turbo y accesorio para amasar, ideal para quien hornea de forma casual en casa, desde merengues livianos hasta masas de galletitas. El mango ergonomico reduce el cansancio en batidos prolongados.',
  specs = '[
    {"label":"Marca","value":"Oster"},
    {"label":"Modelo","value":"3532"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"250 W"},
    {"label":"Velocidades","value":"6 + función turbo"},
    {"label":"Accesorios","value":"Batidores y ganchos para amasar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '3532';

-- 1040103: Calefon electrico Indelplas D20 Max (fuente: garbarino.com)
update products set
  description = 'Calefon electrico enlozado pensado para duchas individuales o banos con demanda baja de agua caliente. Su bajo consumo y corte de seguridad por falta de agua lo hacen apto para instalaciones simples sin gas.',
  specs = '[
    {"label":"Marca","value":"Indelplas"},
    {"label":"Modelo","value":"D20 Max"},
    {"label":"Color","value":"Blanco"},
    {"label":"Material","value":"Enlozado"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"1100 W"},
    {"label":"Función","value":"Corte automático por bajo nivel de agua"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '1040103';

-- 18044: Cocina Morelli Soho 550 (fuente: santimaria.com.ar, rribaceta.com.ar)
update products set
  description = 'Cocina semi-profesional de 4 hornallas con puerta ciega (sin vidrio) y horno grande, pensada para locales gastronomicos con uso frecuente (rotiserias, pizzerias) o casas que cocinan mucho. El frente y cubierta de acero inoxidable facilitan la limpieza diaria.',
  specs = '[
    {"label":"Marca","value":"Morelli"},
    {"label":"Modelo","value":"18044 (línea Soho 550)"},
    {"label":"Material","value":"Acero inoxidable (frente, puerta y cubierta)"},
    {"label":"Dimensiones","value":"55 x 66 x 85 cm"},
    {"label":"Hornallas","value":"4, rejas de fundición vitrificada"},
    {"label":"Horno","value":"Capacidad 73 L, piso de tejuela refractaria, puerta ciega con pirómetro"},
    {"label":"Gas","value":"Multigas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '18044';

-- FY-18A: Ventilador 3en1 Embassy (fuente: cordobadigital.net, colucciequipamiento.ar, MercadoLibre)
update products set
  description = 'Ventilador versatil que se arma como pie, mesa o pared segun la necesidad del ambiente, con aspas de metal mas resistentes que las de plastico. Su funcion turbo y oscilacion panoramica ayudan a mover mas aire en espacios grandes.',
  specs = '[
    {"label":"Marca","value":"Embassy"},
    {"label":"Modelo","value":"FY-18A"},
    {"label":"Color","value":"Negro (aspas plateadas)"},
    {"label":"Material","value":"Aspas de aluminio"},
    {"label":"Diámetro","value":"18\""},
    {"label":"Potencia","value":"90 W, 220V"},
    {"label":"Función","value":"3 en 1 (mesa, pie, pared), turbo, oscilación 180°, altura hasta 1.70 m"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FY-18A';

-- SL-HM5035: Batidora pedestal Smartlife (fuente: naldo.com.ar, smartlife.com.ar oficial)
update products set
  description = 'Batidora 2 en 1 que funciona tanto de pie (con pedestal) como de mano al retirar la base, util para quien necesita versatilidad en poco espacio de cocina. Incluye ganchos para amasar ademas de los batidores clasicos, y bowl plastico de buen volumen.',
  specs = '[
    {"label":"Marca","value":"Smartlife"},
    {"label":"Modelo","value":"SL-HM5035"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"300 W, 220V"},
    {"label":"Capacidad","value":"Bowl plástico 3.4 L"},
    {"label":"Velocidades","value":"5 + turbo"},
    {"label":"Accesorios","value":"Batidores y ganchos para amasar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'SL-HM5035';

-- Cocina Escorial Palace Cristal LX S2 GE (fuente: megatone.net, eastore-tec.com)
update products set
  description = 'Cocina de 4 hornallas con puerta de vidrio templado y luz interior, que permite controlar la coccion del horno sin abrirlo. El encendido electronico en hornallas y horno evita el uso de fosforos, funcionando a gas envasado.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Modelo","value":"Palace Cristal LX S2 (GE)"},
    {"label":"Dimensiones","value":"51 x 95 x 60 cm"},
    {"label":"Peso","value":"26.5 kg"},
    {"label":"Hornallas","value":"4 (3 medianas, 1 grande)"},
    {"label":"Horno","value":"Puerta de vidrio templado, luz interior, doble rejilla removible"},
    {"label":"Encendido","value":"Electrónico (hornallas y horno)"},
    {"label":"Gas","value":"Envasado"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12-8';

-- 5518F: Cocina Florencia 4H multigas inox (fuente: fravega.com, cocinasflorencia.com.ar oficial)
update products set
  description = 'Cocina de 4 hornallas con frente de acero inoxidable, pensada para el uso diario de una familia. La puerta de doble vidrio templado permite ver la coccion del horno sin perder calor, y el sistema multigas la hace apta tanto para garrafa como gas de red.',
  specs = '[
    {"label":"Marca","value":"Florencia"},
    {"label":"Modelo","value":"5518F"},
    {"label":"Material","value":"Acero inoxidable (frente)"},
    {"label":"Dimensiones","value":"56 x 85 x 60 cm"},
    {"label":"Hornallas","value":"4 (1 grande, 2 medianas, 1 chica), con válvulas de seguridad"},
    {"label":"Horno","value":"Puerta doble vidrio templado, desmontable"},
    {"label":"Eficiencia energética","value":"Clase AA"},
    {"label":"Gas","value":"Multigas"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '5518F';

-- 315KHON: Calefon Orbis 14L corredera GN (fuente: MercadoLibre, orbis.com.ar)
update products set
  description = 'Calefon a gas natural de tiro natural con control a corredera, pensado para una ducha o dos artefactos simultaneos. El encendido es directo sobre el quemador (sin piloto), lo que reduce el consumo de gas en stand-by.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"315KHON"},
    {"label":"Capacidad","value":"14 L/min"},
    {"label":"Tiraje","value":"Natural"},
    {"label":"Control","value":"A corredera"},
    {"label":"Encendido","value":"Directo al quemador (sin piloto)"},
    {"label":"Gas","value":"Natural"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '315KHON';

-- C2000BNRV: Caloventor Neba 2000W (fuente: neba.com.ar oficial, megatone.net)
update products set
  description = 'Caloventor electrico de dos niveles de potencia, pensado para calefaccionar ambientes chicos o medianos de forma rapida. Incorpora termostato regulable y proteccion contra sobrecalentamiento para un uso seguro sin supervision constante.',
  specs = '[
    {"label":"Marca","value":"Neba"},
    {"label":"Dimensiones","value":"26.5 x 27 x 19.5 cm"},
    {"label":"Potencia","value":"2000 W (niveles 1000/2000 W), 220V"},
    {"label":"Material","value":"Carcasa con compuestos ignífugos"},
    {"label":"Función","value":"Termostato regulable, modo solo ventilación"},
    {"label":"Seguridad","value":"Corte por sobrecalentamiento"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'C2000BNRV';

-- NEXT6.06USADO: Lavarropas Drean Next 6.06 Eco, item usado (fuente: drean.com.ar oficial, fravega.com)
update products set
  description = 'Lavarropas automatico de carga frontal con sistema europeo de lavado, pensado para ahorrar agua detectando automaticamente la cantidad de ropa. Cuenta con 29 programas de lavado y funcion de auto-balanceo que reduce las vibraciones durante el centrifugado.',
  specs = '[
    {"label":"Marca","value":"Drean"},
    {"label":"Modelo","value":"Next 6.06 Eco"},
    {"label":"Dimensiones","value":"59.5 x 85 x 50 cm"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Centrifugado","value":"600 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"29"},
    {"label":"Eficiencia energética","value":"A+"},
    {"label":"Condición del ítem","value":"Usado"}
  ]'::jsonb
where sku = 'NEXT6.06USADO';

-- 6515616: Termotanque Senorial 85L (fuente: senorial.com.ar oficial)
update products set
  description = 'Termotanque a gas de buen volumen, pensado para una casa de 3 a 5 personas con uso simultaneo de varios artefactos de agua caliente. Funciona con gas natural o envasado sin adaptacion adicional y regula la temperatura de forma automatica mediante valvula termostatica.',
  specs = '[
    {"label":"Marca","value":"Señorial"},
    {"label":"Dimensiones","value":"110 cm alto x 41 cm diámetro"},
    {"label":"Peso","value":"26.5 kg"},
    {"label":"Capacidad","value":"85 L (83 L real)"},
    {"label":"Consumo","value":"4400-4800 kcal/h según tipo de gas"},
    {"label":"Gas","value":"Multigas (natural/envasado)"},
    {"label":"Seguridad","value":"Válvula de sobrepresión, termocupla, detector de monóxido de carbono"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '6515616';

-- SL-VC18BLB: Aspiradora sin bolsa Smartlife (fuente: smartlife.com.ar oficial, fravega.com, garbarino.com)
update products set
  description = 'Aspiradora sin bolsa con tecnologia multiciclonica, pensada para la limpieza diaria del hogar sin gasto recurrente en bolsas. El filtro HEPA retiene particulas finas como polvo y acaros, util para quienes buscan mejorar la calidad de aire en la limpieza.',
  specs = '[
    {"label":"Marca","value":"Smartlife"},
    {"label":"Modelo","value":"SL-VC18BLB"},
    {"label":"Color","value":"Gris"},
    {"label":"Potencia","value":"1800 W"},
    {"label":"Capacidad","value":"Depósito 3 L"},
    {"label":"Filtro","value":"HEPA, sistema multiciclónico"},
    {"label":"Accesorios","value":"Tubo telescópico, cepillo multiuso, boquilla para rincones"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'SL-VC18BLB';

-- KJH-FH2012: Ventilador de pie Kanji control remoto (fuente: Fravega, Musimundo, kanji.com.ar)
update products set
  description = 'Ventilador de pie de 20 pulgadas pensado para refrescar ambientes medianos o grandes del hogar. Incorpora control remoto y temporizador para manejarlo comodamente a distancia, ideal para dormitorios o living.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FH2012"},
    {"label":"Peso","value":"6.2 kg"},
    {"label":"Potencia","value":"95 W"},
    {"label":"Diámetro","value":"20\""},
    {"label":"Aspas","value":"5, plásticas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Oscilante, altura regulable (hasta 1.6 m), control remoto, temporizador"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FH2012';

-- V9: Ventilador de pie Crivel 20 3 aspas (fuente: Megatone, Fravega, crivel.com.ar)
update products set
  description = 'Ventilador de pie de 20 pulgadas con aspas de metal, pensado para uso domestico prolongado gracias a su motor reforzado y silencioso. La base metalica circular y el vastago regulable en altura le dan estabilidad para ambientes de tamano medio.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"V9"},
    {"label":"Material","value":"Base metálica"},
    {"label":"Diámetro","value":"20\""},
    {"label":"Potencia","value":"90 W"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Oscilante, altura regulable (hasta 1.80 m)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'V9';

-- 313BRVE: Calefon Volcan 12L envasado (fuente: volcan.com.ar oficial, Fravega, Tecnogas)
update products set
  description = 'Calefon a gas envasado de tiro natural con encendido piezoelectrico, pensado para abastecer de agua caliente a un hogar de tamano chico a mediano. Incluye sensor de humo y doble sistema de seguridad, lo que corta el gas ante cualquier anomalia en la combustion.',
  specs = '[
    {"label":"Marca","value":"Volcan"},
    {"label":"Modelo","value":"313BRVE"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"727 x 370 x 235 mm"},
    {"label":"Capacidad","value":"12 L/min"},
    {"label":"Potencia","value":"18.000 Kcal/h"},
    {"label":"Encendido","value":"Piezoeléctrico"},
    {"label":"Gas","value":"Envasado"},
    {"label":"Seguridad","value":"Sensor de humo, válvula termoeléctrica"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '313BRVE';

-- KJH-FH1212: Ventilador de pie Kanji 5 aspas (fuente: Fravega, kanji.com.ar)
update products set
  description = 'Ventilador de pie de 20 pulgadas con aspas plasticas, indicado para renovar el aire de ambientes hogarenos durante el verano. Cuenta con temporizador programable y base con rejillas metalicas que aportan estabilidad al conjunto.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FH1212"},
    {"label":"Dimensiones","value":"58 x 57 x 18.5 cm"},
    {"label":"Potencia","value":"95 W"},
    {"label":"Diámetro","value":"20\""},
    {"label":"Aspas","value":"5, plásticas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Oscilante, temporizador, altura hasta 1.6 m"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FH1212';

-- 313BRVN: Calefon Volcan 12L gas natural (fuente: Megatone, MercadoLibre)
update products set
  description = 'Calefon a gas natural de tiro natural, con encendido piezoelectrico y sensor de humo, para reemplazar el suministro de agua caliente en viviendas conectadas a la red de gas natural. Su capacidad de 12 litros por minuto lo hace apto para un uso domestico estandar.',
  specs = '[
    {"label":"Marca","value":"Volcan"},
    {"label":"Modelo","value":"313BRVN"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"727 x 370 x 226 mm"},
    {"label":"Capacidad","value":"12 L/min"},
    {"label":"Potencia","value":"18.000 Kcal/h"},
    {"label":"Encendido","value":"Piezoeléctrico"},
    {"label":"Gas","value":"Natural"},
    {"label":"Seguridad","value":"Sensor de humo, doble válvula de seguridad"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '313BRVN';

-- V40: Ventilador de pared industrial Crivel 30 (fuente: Navarrete Hogar, Centrogar, crivel.com.ar)
update products set
  description = 'Ventilador de pared industrial de 30 pulgadas, pensado para locales, talleres o galpones que necesitan renovar grandes volumenes de aire. Se instala con soporte y tornillos incluidos, y permite orientar la cabeza para dirigir el flujo de aire donde se necesite.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"V40"},
    {"label":"Diámetro","value":"30\""},
    {"label":"Potencia","value":"220 W"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Oscilante (180°), inclinación regulable"},
    {"label":"Uso","value":"Industrial/pared"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'V40';

-- V34: Ventilador de pared industrial Crivel 26 (fuente: Megatone, Centrogar, Previsora del Parana)
update products set
  description = 'Ventilador de pared industrial de 26 pulgadas, indicado para ambientes de trabajo o comercios que requieren circulacion de aire constante. Su motor resiste ambientes exigentes y la cabeza inclinable permite regular la direccion del aire.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"V34"},
    {"label":"Diámetro","value":"26\""},
    {"label":"Potencia","value":"200 W"},
    {"label":"RPM","value":"1100"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Oscilante (180°), inclinación regulable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'V34';

-- 315KSOE: Calefon Orbis 14L botonera digital envasado (fuente: orbis.com.ar oficial, Fravega)
update products set
  description = 'Calefon digital de 14 litros con botonera de cinco teclas programables que permiten fijar la temperatura exacta para cada integrante de la familia. Tiene encendido automatico directo sin piloto y admite instalacion de apoyo solar.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"315KSOE"},
    {"label":"Capacidad","value":"14 L/min"},
    {"label":"Control","value":"Botonera digital, 5 memorias"},
    {"label":"Encendido","value":"Automático (sin piloto)"},
    {"label":"Gas","value":"Envasado"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Compatibilidad","value":"Apoyo solar"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '315KSOE';

-- Cocina Escorial Palace Cristal LX S2 GN (fuente: megatone.net, grupomarquez.com.ar)
update products set
  description = 'Cocina de 51 cm con 4 hornallas (tres medianas y una grande), pensada para cocinas chicas que buscan diseno con frente de vidrio. Tiene encendido electronico de un solo golpe y luz interior en el horno, con superficies esmaltadas por electrostatica para facilitar la limpieza.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Modelo","value":"Palace Cristal LX S2"},
    {"label":"Dimensiones","value":"95 x 51 x 60 cm"},
    {"label":"Peso","value":"26.5 kg"},
    {"label":"Hornallas","value":"4 (3 medianas + 1 grande)"},
    {"label":"Encendido","value":"Electrónico, luz interior en horno"},
    {"label":"Gas","value":"Natural"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12-9';

-- 601400670: Microondas Aurora Rupha 20B (fuente: Fravega, Cetrogar, BGH Tienda Oficial)
update products set
  description = 'Microondas de 19-20 litros con panel digital, pensado para el uso diario en cocinas familiares. Ofrece 18 programas de coccion automatica, descongelado por peso o tiempo, y bloqueo para ninos.',
  specs = '[
    {"label":"Marca","value":"Aurora"},
    {"label":"Modelo","value":"Rupha 20B"},
    {"label":"Dimensiones","value":"44 x 25.8 x 34 cm"},
    {"label":"Peso","value":"10.36 kg"},
    {"label":"Potencia","value":"700 W"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Programas","value":"18 (8 automáticos)"},
    {"label":"Niveles de potencia","value":"5"},
    {"label":"Función","value":"Descongelado automático, bloqueo para niños"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '601400670';

-- KJH-FH1811: Ventilador 3en1 Kanji 18 (fuente: Fravega, kanji.com.ar)
update products set
  description = 'Ventilador 3 en 1 de 18 pulgadas que se puede usar de mesa, de pie o colgado en la pared, ideal para ambientes chicos donde se necesita flexibilidad de ubicacion. Sus aspas metalicas y oscilacion de 180 grados ayudan a repartir el aire de forma pareja por el ambiente.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FH1811"},
    {"label":"Diámetro","value":"18\""},
    {"label":"Potencia","value":"90 W"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Oscilante (180°), modo mesa/pie/pared, altura hasta 1.7 m"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FH1811';

-- E601: Pava electrica inox Eiffel (fuente: Fravega, Musimundo, Megatone)
update products set
  description = 'Pava electrica de acero inoxidable de 1.7 litros con corte especifico para preparar mate o cafe, util para quien busca calentar agua rapido sin usar la hornalla. Se apaga sola al hervir y tiene proteccion para no funcionar sin agua en su interior.',
  specs = '[
    {"label":"Marca","value":"Eiffel"},
    {"label":"Modelo","value":"E-601"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Capacidad","value":"1.7 L"},
    {"label":"Función","value":"Corte automático mate/café, base giratoria"},
    {"label":"Protección","value":"Anti-funcionamiento en seco"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'E601';

-- 5010201: Turboventilador Indelplas IV20 (fuente: indelplas.com oficial, atenasventilacion.com.ar)
update products set
  description = 'Turboventilador 2 en 1 de 20 pulgadas que se puede apoyar en el piso o colgar en la pared, pensado para espacios donde se necesita un caudal de aire fuerte con bajo consumo. Sus aspas plasticas balanceadas generan un flujo de aire fuerte sin ser demasiado ruidoso.',
  specs = '[
    {"label":"Marca","value":"Indelplas"},
    {"label":"Modelo","value":"IV20"},
    {"label":"Diámetro","value":"20\" (50 cm)"},
    {"label":"Potencia","value":"75 W"},
    {"label":"Aspas","value":"5, plásticas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"2 en 1 (piso/pared)"},
    {"label":"Nivel de ruido","value":"65 dB"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '5010201';

-- DAVC90-20L: Aspiradora polvo y agua Daewoo (fuente: Fravega, Daewoo Herramientas oficial, Megatone)
update products set
  description = 'Aspiradora de polvo y agua de 20 litros, pensada para limpiezas domesticas o de taller que incluyan liquidos derramados ademas de tierra o polvo. Incluye mangueras, boquillas y tubos de extension para adaptarse a distintos tipos de superficie.',
  specs = '[
    {"label":"Marca","value":"Daewoo"},
    {"label":"Modelo","value":"DAVC90-20L"},
    {"label":"Capacidad","value":"20 L"},
    {"label":"Potencia","value":"1000 W"},
    {"label":"Manguera","value":"32 mm de diámetro, 1.5 m"},
    {"label":"Accesorios","value":"Boquilla para hendiduras, tubos de extensión, filtro de espuma"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'DAVC90-20L';

-- T10: Turboventilador Crivel reclinable (fuente: Megatone, Genesio Hogar, icasahogar.com.ar)
update products set
  description = 'Turboventilador de 20 pulgadas con base reclinable, pensado para dirigir un chorro de aire potente hacia un punto especifico del ambiente. Sus aspas metalicas y motor silencioso lo hacen apto para uso prolongado en casa o en el trabajo.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"T10"},
    {"label":"Diámetro","value":"20\""},
    {"label":"Potencia","value":"90 W"},
    {"label":"Aspas","value":"3, metálicas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Reclinable, inclinación regulable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'T10';

-- P50: Plancha seca Crivel base aluminio (fuente: Megatone, Sensei, Centrogar)
update products set
  description = 'Plancha seca de uso domestico con base de aluminio que distribuye el calor de forma pareja para un planchado mas rapido. Tiene cable giratorio para evitar enredos, resistencia blindada y luz indicadora de encendido.',
  specs = '[
    {"label":"Marca","value":"Crivel"},
    {"label":"Modelo","value":"P50"},
    {"label":"Potencia","value":"1100 W"},
    {"label":"Material base","value":"Aluminio"},
    {"label":"Función","value":"Selector de temperatura, luz indicadora"},
    {"label":"Cable","value":"Giratorio"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'P50';

-- 315KHOE: Calefon Orbis 14L corredera envasado (fuente: orbis.com.ar oficial, Fravega, Canigo)
update products set
  description = 'Calefon de tiro natural con comando a corredera de 4 niveles de potencia, indicado para quien prefiere un control manual simple de la temperatura del agua. Cuenta con encendido manual y triple sistema de seguridad que corta el gas ante fallas de combustion o sobrecalentamiento.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"315KHOE"},
    {"label":"Dimensiones","value":"727 x 370 x 235 mm"},
    {"label":"Capacidad","value":"14 L/min"},
    {"label":"Control","value":"A corredera, 4 niveles de potencia"},
    {"label":"Encendido","value":"Manual"},
    {"label":"Gas","value":"Envasado"},
    {"label":"Seguridad","value":"Válvula por termocupla, sensor de sobretemperatura, detector de evacuación de gases"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '315KHOE';

-- 315KNOE: Calefon Orbis 14L botonera envasado (fuente: orbis.com.ar oficial)
update products set
  description = 'Calefon de tiro natural con botonera digital, apto para gas envasado, indicado para quien busca practicidad en el control de temperatura del agua. Tiene encendido automatico directo sin piloto y valvula de cuarta generacion con certificacion europea.',
  specs = '[
    {"label":"Marca","value":"Orbis"},
    {"label":"Modelo","value":"315KNOE"},
    {"label":"Capacidad","value":"14 L/min"},
    {"label":"Control","value":"Botonera"},
    {"label":"Encendido","value":"Automático (sin piloto)"},
    {"label":"Gas","value":"Envasado"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Seguridad","value":"Sensor de sobretemperatura, sensor de gases de combustión"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '315KNOE';

-- Cocina Escorial Candor S2 GN blanco (fuente: Megatone, Fravega)
update products set
  description = 'Cocina de 50 cm con 4 hornallas (una grande y tres medianas) y cajon parrilla independiente, pensada para cocinas chicas de uso diario. La puerta del horno tiene visor para controlar la coccion sin abrirla, y todas las hornallas cuentan con valvula de seguridad por termocupla.',
  specs = '[
    {"label":"Marca","value":"Escorial"},
    {"label":"Modelo","value":"Candor S2"},
    {"label":"Color","value":"Blanco"},
    {"label":"Dimensiones","value":"85 x 50 x 54 cm"},
    {"label":"Peso","value":"26.5 kg"},
    {"label":"Hornallas","value":"4 (1 grande + 3 medianas)"},
    {"label":"Gas","value":"Natural"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '7,79801E+12-3';

-- 520PI-GE: Cocina Motta PRO-520 Inox con grill y termometro (fuente: Facebook oficial Cocinas Motta S.A., MercadoLibre)
update products set
  description = 'Cocina industrial de 4 hornallas totalmente en acero inoxidable, con grill inferior y termometro (pirometro) en la puerta del horno para controlar la temperatura sin abrirlo. Pensada para comercios gastronomicos o quinchos que necesitan un equipo resistente de uso frecuente.',
  specs = '[
    {"label":"Marca","value":"Motta"},
    {"label":"Modelo","value":"PRO-520 Inox (520PI)"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Hornallas","value":"4, de 2000 calorías cada una"},
    {"label":"Horno","value":"2200 calorías, con grill inferior"},
    {"label":"Termómetro","value":"Pirómetro en puerta de horno"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '520PI-GE';

-- KJH-FH1211: Turboventilador Kanji reclinable 5 aspas (fuente: Fravega, Megatone, kanji.com.ar)
update products set
  description = 'Turboventilador de 20 pulgadas con base reclinable, pensado para dirigir un caudal de aire fuerte hacia una zona puntual del ambiente. Cuenta con proteccion termica del motor y aspas plasticas livianas que facilitan un funcionamiento silencioso.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJH-FH1211"},
    {"label":"Diámetro","value":"20\""},
    {"label":"Potencia","value":"90 W, 220V"},
    {"label":"Aspas","value":"5, plásticas"},
    {"label":"Velocidades","value":"3"},
    {"label":"Función","value":"Reclinable, protección térmica"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJH-FH1211';
