-- Migracion 014: septima tanda (18 productos) con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: catalogo de importados del
-- distribuidor (BEHMONT, 5 productos), sitios de fabricante oficial y tiendas
-- grandes reconocidas (Oster, Descansar, Westinghouse, Philco, BGH, Atma,
-- Remington, Kanji, Liliana, Noblex, Neba). Solo toca specs/description de
-- estos 18 SKU puntuales, no pisa nada mas.
--
-- Notas:
-- * WH-CH108: en la base figura con brand "Kanji" pero el codigo y las specs
--   encontradas corresponden a Westinghouse (linea que Kanji distribuye/vende
--   en Argentina). Se cargan las specs igual porque el producto es correcto;
--   el campo brand queda para que el dueño lo revise aparte.
-- * BLSTKPWRD (Oster) y PL8830N (Atma): el codigo del fabricante que aparece
--   publicado es BLSTKAPWRD / PL8830NF (con una letra de sufijo mas), pero
--   todos los datos (potencia, capacidad, color, features) coinciden
--   exactamente con el nombre ya cargado en la base, asi que se toman como el
--   mismo producto.

-- BLSTKPWRD: Licuadora de mesa Oster 550W (fuente: Megatone, Otero Hogar)
update products set
  description = 'Licuadora de mesa pensada para el uso diario en la cocina, con jarra plastica de 1.25 litros y motor de 550 W que resuelve licuados, batidos y hielo triturado gracias a su cuchilla moledora. Cuenta con 2 velocidades mas funcion pulso y acoplamiento All-Metal para mayor durabilidad.',
  specs = '[
    {"label":"Marca","value":"Oster"},
    {"label":"Modelo","value":"BLSTKPWRD"},
    {"label":"Color","value":"Negro"},
    {"label":"Material jarra","value":"Plástico"},
    {"label":"Capacidad","value":"1.25 L"},
    {"label":"Potencia","value":"550 W"},
    {"label":"Velocidades","value":"2 velocidades + pulso"},
    {"label":"Acoplamiento","value":"Sistema All-Metal"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BLSTKPWRD';

-- 50028: Reposera plegable Descansar (fuente: sitio oficial descansarsa.com.ar)
update products set
  description = 'Reposera plegable de fabricacion nacional, con estructura de cano de acero de 7/8" pintada en gris plata con pintura poliester de alta resistencia a la intemperie. Su lona de Coversol regula en 5 posiciones distintas y los apoyabrazos de cano de acero suman firmeza al momento de levantarse.',
  specs = '[
    {"label":"Marca","value":"Descansar"},
    {"label":"Modelo","value":"50028"},
    {"label":"Estructura","value":"Caño de acero 7/8\""},
    {"label":"Color","value":"Gris plata"},
    {"label":"Terminación","value":"Pintura poliéster de alta resistencia"},
    {"label":"Tela","value":"Lona Coversol"},
    {"label":"Posiciones","value":"5 posiciones"},
    {"label":"Apoyabrazos","value":"Caño de acero"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '50028';

-- WH-CH108: Caloventor vertical Westinghouse 2000W (fuente: Electronica JCK, Fravega)
update products set
  description = 'Caloventor portatil de bajo consumo, con selector de potencia de 1000 W y 2000 W para adaptar la calefaccion al ambiente. Su motor silencioso y diseno anti-polvo lo hacen apto para dormitorios y oficinas, y su formato vertical compacto facilita ubicarlo en espacios reducidos.',
  specs = '[
    {"label":"Marca","value":"Westinghouse"},
    {"label":"Modelo","value":"WH-CH108"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"2000 W (selector 1000/2000 W)"},
    {"label":"Tipo","value":"Caloventor vertical portátil"},
    {"label":"Medidas","value":"11 x 25 x 24 cm"},
    {"label":"Motor","value":"Silencioso"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'WH-CH108';

-- MR-7SILVER: Espejo LED Behmont ovalado (fuente: catalogo de importados)
update products set
  description = 'Espejo ovalado con marco plateado e iluminacion LED integrada perimetral, pensado para salones de peluqueria, barberias y centros de estetica. Sus medidas de 170 x 70 cm lo hacen ideal para puestos de trabajo profesional.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-7SILVER"},
    {"label":"Forma","value":"Ovalado"},
    {"label":"Marco","value":"Color plata"},
    {"label":"Iluminación","value":"LED integrada"},
    {"label":"Medidas","value":"170 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-7SILVER';

-- 25-JAY03: Embutidora vertical manual Behmont 15L (fuente: catalogo de importados)
update products set
  description = 'Embutidora manual vertical de 15 litros de capacidad, con estructura y tacho fabricados en acero inoxidable para uso en carnicerias y elaboracion de embutidos caseros o comerciales. Su accionamiento manual permite un control preciso de la presion de embutido.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"25-JAY03"},
    {"label":"Tipo","value":"Embutidora manual vertical"},
    {"label":"Capacidad","value":"15 L"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '25-JAY03';

-- MR-9GOLDEN: Espejo LED Behmont arco medio punto (fuente: catalogo de importados)
update products set
  description = 'Espejo con forma de arco de medio punto y marco dorado, con iluminacion LED integrada, ideal para salones de peluqueria y barberias. Sus medidas de 170 x 70 cm y su luz perimetral aportan un toque profesional al puesto de trabajo.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"MR-9GOLDEN"},
    {"label":"Forma","value":"Arco medio punto"},
    {"label":"Marco","value":"Color dorado"},
    {"label":"Iluminación","value":"LED integrada"},
    {"label":"Medidas","value":"170 x 70 cm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MR-9GOLDEN';

-- JSPCC-06: Cortapapas vertical Behmont (fuente: catalogo de importados)
update products set
  description = 'Cortapapas vertical de mesa fabricado en acero inoxidable, pensado para uso gastronomico intensivo. Incluye 3 rejillas de corte intercambiables que permiten variar el grosor del baston de papa segun la necesidad del local.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"JSPCC-06"},
    {"label":"Tipo","value":"Cortapapas de mesa vertical"},
    {"label":"Material","value":"Acero inoxidable"},
    {"label":"Medidas","value":"32 x 14 x 62 cm"},
    {"label":"Rejillas","value":"3 rejillas de corte intercambiables"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'JSPCC-06';

-- 120.40-CB: Rack continuo Behmont 200x120x40 blanco (fuente: catalogo de importados)
update products set
  description = 'Tramo continuo de rack metalico encastrable, con 5 estantes de 100 kg de capacidad cada uno para un total de 500 kg. Su sistema de agujero mariposa permite ampliar la instalacion sumando modulos, ideal para depositos y locales comerciales que necesitan organizar mercaderia en altura.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"120.40-CB"},
    {"label":"Color","value":"Blanco"},
    {"label":"Tipo","value":"Rack metálico, tramo continuo"},
    {"label":"Medidas","value":"200 x 120 x 40 cm"},
    {"label":"Estantes","value":"5 estantes"},
    {"label":"Capacidad","value":"100 kg por estante"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = '120.40-CB';

-- BX-3112: Sillon peluquero hidraulico Behmont Zenit negro (fuente: catalogo de importados)
update products set
  description = 'Sillon de barberia modelo Zenit con estructura de acero cromado y base cuadrada, tapizado en eco-cuero premium color negro. Cuenta con regulador de altura hidraulico, giro de 360 grados y apoyapies integrado en T, pensado para uso profesional en barberias y peluquerias.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Modelo","value":"BX-3112 (Zenit)"},
    {"label":"Color","value":"Negro"},
    {"label":"Material tapizado","value":"Eco-cuero premium"},
    {"label":"Estructura","value":"Acero cromado, base cuadrada"},
    {"label":"Regulación de altura","value":"Hidráulica"},
    {"label":"Giro","value":"360°"},
    {"label":"Apoyapiés","value":"Integrado en T"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BX-3112';

-- VPIP2623P: Ventilador industrial de pie Philco 26" 180W (fuente: Megatone, Philco oficial)
update products set
  description = 'Ventilador de pie tipo industrial con aspas metalicas de 26" y motor de 180 W, pensado para refrigerar grandes espacios como locales comerciales, talleres o galpones. Cuenta con 3 velocidades, cabezal oscilante y altura regulable hasta 173 cm.',
  specs = '[
    {"label":"Marca","value":"Philco"},
    {"label":"Modelo","value":"VPIP2623P"},
    {"label":"Potencia","value":"180 W"},
    {"label":"Diámetro de aspas","value":"26\" (65 cm)"},
    {"label":"Material","value":"Aspas y estructura metálicas"},
    {"label":"Velocidades","value":"3 velocidades"},
    {"label":"Altura","value":"Regulable, hasta 173 cm"},
    {"label":"Función","value":"Cabezal oscilante"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'VPIP2623P';

-- BWFI06S24AR: Lavarropas BGH 6kg Inverter carga frontal (fuente: BGH oficial, Fravega)
update products set
  description = 'Lavarropas automatico de carga frontal con motor Inverter, capacidad de 6 kg y centrifugado de hasta 1000 rpm. Incluye 12 programas de lavado, inicio programado, bloqueo de puerta y de teclado, ideal para quienes buscan eficiencia energetica sin resignar rendimiento.',
  specs = '[
    {"label":"Marca","value":"BGH"},
    {"label":"Modelo","value":"BWFI06S24AR"},
    {"label":"Color","value":"Plata"},
    {"label":"Capacidad","value":"6 kg"},
    {"label":"Motor","value":"Inverter"},
    {"label":"Centrifugado","value":"Hasta 1000 rpm"},
    {"label":"Carga","value":"Frontal"},
    {"label":"Programas","value":"12 programas"},
    {"label":"Dimensiones","value":"59.5 x 84 x 44 cm (An x Al x Prof)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BWFI06S24AR';

-- PL8830N: Planchita de pelo Atma ceramica 180 (fuente: Atma oficial, Fravega)
update products set
  description = 'Planchita de pelo con placas de ceramica flotantes que alcanzan hasta 180 grados, ideal para alisado diario sin danar el cabello. Su cuerpo revestido en silicona color naranja y cable giratorio de 1.80 m suman comodidad de uso, y su sistema de bloqueo facilita el guardado.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"PL8830N"},
    {"label":"Color","value":"Naranja"},
    {"label":"Temperatura","value":"180 °C"},
    {"label":"Placas","value":"Cerámica, flotantes"},
    {"label":"Cuerpo","value":"Silicona"},
    {"label":"Cable","value":"1.80 m, giratorio"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PL8830N';

-- PAS2432PI: Plancha seca Atma 1300W base ceramica (fuente: Fravega, Megatone, Santimaria)
update products set
  description = 'Plancha seca de 1300 W con suela de ceramica y funcion rociador para humedecer la ropa durante el planchado. Incorpora regulador de temperatura para adaptarse a distintos tipos de tela, punta de precision para detalles y soporte vertical de apoyo.',
  specs = '[
    {"label":"Marca","value":"Atma"},
    {"label":"Modelo","value":"PAS2432PI"},
    {"label":"Potencia","value":"1300 W"},
    {"label":"Base","value":"Cerámica"},
    {"label":"Función","value":"Rociador"},
    {"label":"Regulación","value":"Control de temperatura"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'PAS2432PI';

-- D18A: Secador de pelo Remington Shine Therapy 2200W (fuente: Fravega, Provincia Compras)
update products set
  description = 'Secador de pelo profesional con motor AC de 2200 W, generador de iones y rejilla microcondicionadora con aguacate y macadamia para reducir el frizz y sumar brillo. Incluye difusor y concentrador intercambiables, 2 velocidades y 3 temperaturas, mas funcion de aire frio.',
  specs = '[
    {"label":"Marca","value":"Remington"},
    {"label":"Modelo","value":"D18A (Shine Therapy)"},
    {"label":"Potencia","value":"2200 W"},
    {"label":"Temperatura máxima","value":"230 °C"},
    {"label":"Velocidades","value":"2 velocidades, 3 temperaturas"},
    {"label":"Tecnología","value":"Generador de iones, rejilla con aguacate y macadamia"},
    {"label":"Accesorios","value":"Difusor y concentrador"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'D18A';

-- KJ-50ST005-2Q: Smart TV Kanji 50 4K Google TV (fuente: Fravega, Kanji oficial)
update products set
  description = 'Smart TV de 50" con panel QLED 4K UHD y sistema operativo Google TV, con acceso a aplicaciones como Netflix, YouTube, Prime Video y Disney+ mediante WiFi o red cableada. Cuenta con 4 entradas HDMI y 2 puertos USB para conectar multiples dispositivos.',
  specs = '[
    {"label":"Marca","value":"Kanji"},
    {"label":"Modelo","value":"KJ-50ST005-2Q"},
    {"label":"Pantalla","value":"50\" QLED 4K UHD (3840x2160)"},
    {"label":"Sistema operativo","value":"Google TV"},
    {"label":"Conectividad","value":"WiFi, 4 HDMI, 2 USB, Ethernet"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'KJ-50ST005-2Q';

-- AH910B/AH110B: Minipimer Liliana Twistmix 450W (fuente: Liliana oficial, Cetrogar)
update products set
  description = 'Minipimer Twistmix 2 en 1 con motor de 450 W, varilla mixer y batidor de alambre de acero inoxidable intercambiables. Incluye vaso medidor y 2 velocidades de trabajo, ideal para preparar salsas, licuados, pures, cremas y batidos en el dia a dia.',
  specs = '[
    {"label":"Marca","value":"Liliana"},
    {"label":"Modelo","value":"AH910B / AH110B (Twistmix)"},
    {"label":"Color","value":"Blanco"},
    {"label":"Potencia","value":"450 W"},
    {"label":"Velocidades","value":"2 velocidades"},
    {"label":"Material varilla","value":"Acero inoxidable"},
    {"label":"Accesorios","value":"Batidor de alambre, vaso medidor"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'AH910B/AH110B';

-- MNT290P: Torre de sonido Noblex 3200W (fuente: Fravega, Noblex oficial, Tecnocompro)
update products set
  description = 'Torre de sonido portatil de 3200 W con conexion Bluetooth y TWS para vincular dos unidades en estereo real. Suma radio FM, 2 entradas de microfono para karaoke, ecualizador ajustable con boton Super Bass, luces LED y bateria recargable con hasta 9 horas de autonomia.',
  specs = '[
    {"label":"Marca","value":"Noblex"},
    {"label":"Modelo","value":"MNT290P"},
    {"label":"Potencia","value":"3200 W"},
    {"label":"Conectividad","value":"Bluetooth, TWS, entrada auxiliar, USB"},
    {"label":"Parlantes","value":"Woofer 6.5\" + 2 tweeters"},
    {"label":"Funciones","value":"Radio FM, 2 entradas de micrófono, luces LED"},
    {"label":"Batería","value":"Recargable, hasta 9 hs de autonomía"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'MNT290P';

-- A320: Heladera Neba 320L ciclica 2 frios (fuente: Neba oficial, Fravega, Center Hogar)
update products set
  description = 'Heladera ciclica con 2 frios independientes y 318 litros de capacidad bruta, con exterior en lamina de acero prepintada y burlete magnetico antihongos. Incluye 3 estantes regulables y crisper para frutas y verduras, con eficiencia energetica Clase A.',
  specs = '[
    {"label":"Marca","value":"Neba"},
    {"label":"Modelo","value":"A320"},
    {"label":"Capacidad bruta","value":"318 L"},
    {"label":"Sistema de frío","value":"Cíclico, 2 fríos"},
    {"label":"Dimensiones","value":"1.69 x 0.60 x 0.57 m (Al x An x Prof)"},
    {"label":"Eficiencia energética","value":"Clase A"},
    {"label":"Estantes","value":"3 estantes regulables"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'A320';
