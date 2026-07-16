-- Migracion 028: de los 37 productos que la migracion 027 movio de "MT" a
-- "Behmont", 13 en realidad tenían el nombre de fábrica real metido en el
-- nombre del producto (mismo problema que "Gastronomia" en la migracion 026).
-- Se separan en sus marcas reales: Zeiler, Meifa, Tecnobull, Magi, RD (nuevas)
-- y ARE, Nativa (ya existían, se les suman estos productos). El resto de los
-- productos ex-MT (bandejas, mesas de trabajo, cajas fuertes, exhibidores,
-- picadoras, churreras genéricas, etc.) quedan en Behmont porque no tienen
-- marca de fábrica identificable.

insert into brands (name) values
  ('Zeiler'), ('Meifa'), ('Tecnobull'), ('Magi'), ('RD')
on conflict (name) do nothing;

update products set brand_id = (select id from brands where name = 'Nativa'), name = 'Exprimidor Citrico con jarra' where sku = '1615';

update products set brand_id = (select id from brands where name = 'ARE'), name = 'Ralladora de Queso 44 Kg/h' where sku = '1315';
update products set brand_id = (select id from brands where name = 'ARE'), name = 'Ralladora de Queso Electrica 9 Kg h' where sku = 'M9';

update products set brand_id = (select id from brands where name = 'Zeiler'), name = 'Batidora 20 Lts epoxi tacho A. Inox 2 velocidades' where sku = '614651';
update products set brand_id = (select id from brands where name = 'Zeiler'), name = 'Extractor de Aire 45 cm' where sku = '345315';
update products set brand_id = (select id from brands where name = 'Zeiler'), name = 'Extractor de aire 52 cm' where sku = '64315';

update products set brand_id = (select id from brands where name = 'Meifa'), name = 'Rellenadora de Churros - Con dosificador' where sku = '12363';

update products set brand_id = (select id from brands where name = 'Tecnobull'), name = 'Canasto 27 Lts con manija' where sku = '22161';
update products set brand_id = (select id from brands where name = 'Tecnobull'), name = 'Carro de cliente 80 Lts' where sku = '52424';

update products set brand_id = (select id from brands where name = 'Magi'), name = 'Churrera - Tacho acero inoxidable 2 Kg' where sku = '12362';
update products set brand_id = (select id from brands where name = 'Magi'), name = 'Churrera - Tacho plastico 2 Kg' where sku = '12361';

update products set brand_id = (select id from brands where name = 'RD'), name = 'Sobadora manual con fiderero raviolero 300 mm' where sku = 'varios 1';
update products set brand_id = (select id from brands where name = 'RD'), name = 'Sobadora manual con fiderero raviolero 300 mm USADO' where sku = '165651USADO';

-- Nota: sku 4564 "Ralladora de Queso Manual de Fundicion MS" se dejó en
-- Behmont a propósito; "MS" no sigue el patrón "Marca - Producto" del resto
-- y no hay certeza de que sea una marca real y no un código de modelo.
