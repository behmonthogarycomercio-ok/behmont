-- Migracion 052: tanda 29 de specs/descripcion investigados (skill
-- product-specs-research). Tercera tanda de "Gastronomia": equipamiento
-- Santini (licuadora, freidora, horno), anafe Danda, fabrica de pastas
-- Hogaris, y 2 productos marca propia Behmont. 7 confirmados de 12
-- candidatos investigados (tanda de menor rendimiento: el resto del stock
-- pendiente de Gastronomia es mayormente equipamiento industrial de
-- catalogo mayorista -Sol Real, Calabro, Morelli, Ceico- sin fichas
-- individuales verificables online).
--
-- Excluidos de esta tanda (5, reportados aparte, no tocados por este SQL):
-- SP-1000 (Santini: se confirmo la marca y potencia 1000W pero no la
-- capacidad de 36 salchichas para este modelo especifico) - GOURMET
-- (Hogaris: existen variantes "Premium" y "Familiar" documentadas, pero
-- "Gourmet" con rodillo de acero no se pudo confirmar si coincide con
-- Premium o es una variante distinta) - 12362 (Magi: las specs de
-- churrera 2kg encontradas son genericas de la categoria, no especificas
-- de la marca Magi) - 11, 7 (Ceico: sin fuente que confirme specs
-- especificas de la marca para estos modelos).

-- 502A: Anafe Danda 2 hornallas horizontal (fuente: Mis Parrillas, Danda oficial, Ventas Martin)
update products set
  description = 'Anafe industrial a gas de dos hornallas en formato horizontal, pensado para uso comercial o gastronomico. Su estructura de acero inoxidable con bandeja antiderrame es apta para gas envasado y gas natural.',
  specs = '[{"label":"Marca","value":"Danda"},{"label":"Modelo","value":"502A"},{"label":"Material","value":"Acero inoxidable"},{"label":"Dimensiones","value":"61 x 85 x 33 cm"},{"label":"Función","value":"2 hornallas (1800 y 2200 kcal), rejas de fundición, bandeja antiderrame, apto gas envasado y natural"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '502A';

-- MB-4500: Licuadora industrial Santini (fuente: MercadoLibre, Bazar Gastronómico, Santini oficial)
update products set
  description = 'Licuadora industrial con jarra de policarbonato resistente, pensada para uso intensivo en restaurantes, cafeterias y bares. Su cuchilla de acero inoxidable reforzado permite picar hielo y alimentos duros.',
  specs = '[{"label":"Marca","value":"Santini"},{"label":"Modelo","value":"MB-4500"},{"label":"Peso","value":"5 kg"},{"label":"Dimensiones","value":"23 x 27 x 49 cm"},{"label":"Capacidad","value":"2 L (jarra policarbonato)"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"1500 W"},{"label":"Función","value":"10 velocidades + pulso, hasta 32.000 RPM, pica hielo, protección de sobrecarga, incluye tapa dosificadora y bastón mezclador"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MB-4500';

-- F-16: Freidora eléctrica Santini (fuente: Friosur, Tescuo, Gastronovo, Bazar Gastronómico)
update products set
  description = 'Freidora electrica de acero inoxidable, pensada para uso comercial en cocinas gastronomicas. Incluye canasto freidor y proteccion contra sobrecalentamiento, con temperatura regulable.',
  specs = '[{"label":"Marca","value":"Santini"},{"label":"Modelo","value":"F-16"},{"label":"Material","value":"Acero inoxidable"},{"label":"Peso","value":"4.6 kg"},{"label":"Dimensiones","value":"28.5 x 31 x 44 cm"},{"label":"Capacidad","value":"6 L"},{"label":"Potencia","value":"2500 W"},{"label":"Función","value":"Temperatura regulable hasta 200°C, protección por sobrecalentamiento, indicador de encendido y calentamiento, incluye canasto y tapa protectora"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'F-16';

-- MC-840: Horno convector eléctrico Santini (fuente: Micucci Equipamientos, Grupo Electron, Gastroquil, Santini oficial)
update products set
  description = 'Horno convector electrico profesional para panaderias y pastelerias, con doble turbina de conveccion para una coccion pareja. Incluye tres bandejas y puerta de vidrio templado con visor.',
  specs = '[{"label":"Marca","value":"Santini"},{"label":"Modelo","value":"MC-840"},{"label":"Peso","value":"54 kg"},{"label":"Dimensiones","value":"83.5 x 50.5 x 79.9 cm"},{"label":"Voltaje","value":"220V monofásico, 20A"},{"label":"Potencia","value":"3500 W"},{"label":"Función","value":"Temperatura hasta 300°C, timer 120 min, doble turbina de convección, puerta de vidrio templado con visor, luz interior, incluye 3 bandejas de 60x40cm"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MC-840';

-- C4-70: Horno convector Behmont/Brafh (fuente: MercadoLibre, Mastersupply, Gastrohogar)
update products set
  description = 'Horno convector industrial monofasico para panaderias y pastelerias, con capacidad para cinco bandejas gastronomicas. Pensado para hornear en volumen en establecimientos gastronomicos.',
  specs = '[{"label":"Marca","value":"Behmont (Brafh)"},{"label":"Modelo","value":"HC.4-70"},{"label":"Función","value":"5 bandejas GN 70x45cm, alimentación monofásica"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'C4-70';

-- CA100: Mantenedor de papas Behmont/Segva (fuente: MercadoBuy, Speedy Grill, Behmont oficial)
update products set
  description = 'Estacion calefactora pensada para mantener papas fritas y otros alimentos calientes y listos para servir. Su diseño compacto se adapta a cualquier espacio de cocina gastronomica.',
  specs = '[{"label":"Marca","value":"Behmont (Segva)"},{"label":"Modelo","value":"CA100"},{"label":"Dimensiones","value":"44 cm alto x 56 cm profundidad"},{"label":"Voltaje","value":"220V"},{"label":"Potencia","value":"650 W"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CA100';

-- PREMIUM: Fábrica de pastas Hogaris Premium (fuente: Fravega, MercadoLibre, Grupo Hogar, Pandora Web)
update products set
  description = 'Fabrica de pastas manual con engranajes y rodillos de acero, pensada para uso profesional gastronomico. Permite estirar la masa hasta 20cm de ancho y cortar fideos en varios tamaños, con nueve graduaciones de espesor.',
  specs = '[{"label":"Marca","value":"Hogaris"},{"label":"Modelo","value":"Pasta Nova Premium"},{"label":"Material","value":"Acero (rodillos, engranajes, base y laterales)"},{"label":"Dimensiones","value":"27 x 22 x 20 cm"},{"label":"Función","value":"9 graduaciones de espesor, estira masa hasta 20cm de ancho, corta fideos, soporte para accesorio de ravioles, incluye mordaza de fijación"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PREMIUM';
