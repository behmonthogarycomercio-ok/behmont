-- Migracion 116: tercera y ultima tanda (10 de 40) de productos con el mismo
-- problema de las migraciones 114/115 -- "name" armado como lista de
-- caracteristicas. A diferencia de las tandas anteriores, estos 10 YA
-- tenian specs bien cargados (la mayoria vino del sync de MercadoLibre, con
-- ficha tecnica completa) -- el unico problema era el nombre, asi que acá
-- solo se limpia el nombre; specs/description se dejan como estan salvo
-- donde faltaba (se completa con los mismos datos que ya estaban en specs,
-- sin investigar nada nuevo) o faltaba un dato que solo estaba en el nombre
-- viejo (caso Freire: diametro de volantes, que no estaba en specs).

update products set
  name = 'Pava electrica 1.7 L',
  description = 'Pava electrica de 1,7 L con regulador de temperatura de 40°C a 100°C y funcion para mantener el agua caliente hasta 40 minutos. Cuerpo de acero inoxidable.'
where sku = 'EKP70';

update products set
  name = 'Sierra de mesa 3/4 HP',
  description = 'Sierra de mesa de 3/4 HP con mesada de acero inoxidable, pensada para carnicerias y uso gastronomico. Corta hasta 285 mm de altura y 210 mm de ancho, con volantes de 215 mm de diametro y hoja de 1,81 m.'
where sku = 'HB800SS';

update products set
  name = 'Freezer exhibidor vertical 577 L',
  description = 'Freezer exhibidor vertical Inelro de 577 litros, con 4 estantes moviles y puerta ciega. Funciona en un rango de -22°C a +7°C con 3 modos de temperatura y gas refrigerante ecologico R290.'
where sku = 'FSGPF57B';

update products set
  name = 'Parlante party 100 W RMS',
  description = 'Parlante Stromberg Flexy de 100 W RMS con parlante de 15" y tweeter de 3", pensado para fiestas y eventos. Tiene bateria de 2200 mAh, conectividad Bluetooth TWS, USB, MicroSD y auxiliar, radio FM, ecualizador digital e iluminacion LED.'
where sku = 'FLEXY';

update products set
  name = 'Freezer vertical 577 L'
where sku = 'FSGPC57B';

update products set
  name = 'Celular Edge 70'
where sku = 'EDGE70';

update products set
  name = 'Parlante portatil 50 W RMS'
where sku = 'ADVANCE';

update products set
  name = 'Sierra de mesa 3/4 HP con picador',
  description = 'Sierra de mesa de 3/4 HP con picador incorporado y mesada de acero inoxidable, pensada para carnicerias y uso gastronomico. Corta hasta 285 mm de altura y 210 mm de ancho, con volantes de 215 mm de diametro y hoja de 1,81 m.'
where sku = 'HB800CP';

update products set
  name = 'Sierra carnicera 1 HP',
  specs = specs || '[{"label":"Diametro de volantes","value":"280 mm"}]'::jsonb
where sku = 'MLA2046767837' and not (specs @> '[{"label":"Diametro de volantes"}]'::jsonb);

update products set
  name = 'Lavacabeza de ceramica'
where sku = '25-JA13';
