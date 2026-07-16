-- Migracion 026: "Gastronomia" no es una marca, es la categoria (que ya existe
-- como fila propia en `categories`). Se coló como marca en la importación
-- original porque 29 productos tenían el nombre con formato "Marca - Producto"
-- (ej. "Real - Cacerola Nº 24...", "Casa Rojo - Paellera...") y el parseo de
-- marca falló para esas filas, cayendo todas en un brand_id genérico
-- "Gastronomia".
--
-- Esta migracion:
--   1. Crea las 6 marcas reales que estaban escondidas en el nombre del producto:
--      Casa Rojo, L.V., Real, Tresso, Hudson, Moral.
--   2. Reasigna cada producto a su marca real y le saca el prefijo "Marca - "
--      del nombre (los demás productos del catálogo no repiten la marca en el
--      nombre, así que queda consistente).
--   3. Dos productos sin prefijo de marca ("Remo de Madera 0.7/1.0 Mts") quedan
--      sin marca (brand_id null) porque no había forma de inferir cuál era.
--   4. Borra la fila de marca "Gastronomia" (ya sin productos).
--
-- Nota: esta migracion ya se aplico manualmente contra la base via API REST
-- (no via este archivo). Se deja documentada acá para el historial, siguiendo
-- el mismo criterio que migration_025.

insert into brands (name) values
  ('Casa Rojo'), ('L.V.'), ('Real'), ('Tresso'), ('Hudson'), ('Moral')
on conflict (name) do nothing;

update products set brand_id = (select id from brands where name = 'Casa Rojo'), name = 'Paellera Chapa 50 cm' where sku = '1814';
update products set brand_id = (select id from brands where name = 'Casa Rojo'), name = 'Wok 36 cm Chapa' where sku = '1837';
update products set brand_id = (select id from brands where name = 'Casa Rojo'), name = 'Sarten Chapa 24 cm Planchuela' where sku = '1834';
update products set brand_id = (select id from brands where name = 'Casa Rojo'), name = 'Sarten Chapa 28 cm Planchuela' where sku = '1835';
update products set brand_id = (select id from brands where name = 'Casa Rojo'), name = 'Sarten Chapa 32 cm Planchuela' where sku = '1836';

update products set brand_id = (select id from brands where name = 'L.V.'), name = 'Rallador Queso Acero' where sku = '2180';
update products set brand_id = (select id from brands where name = 'L.V.'), name = 'Rallador Verdura Acero' where sku = '2216';

update products set brand_id = (select id from brands where name = 'Real'), name = 'Cacerola Nº 24 Gastronomica 5.9 Lts' where sku = '046000R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Cacerola Nº 30 Gastronomica 10 Lts' where sku = '046003R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Cacerola Nº 34 Gastronomica 15 Lts' where sku = '046005R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Cacerola Nº 40 Gastronomica 25 Lts' where sku = '046008R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Cacerola Nº 50 Gastronomica 50 Lts' where sku = '046011R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Olla Nº 34 Gastronomica 30 Lts' where sku = '046017R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Olla Nº 40 Gastronomica 50 Lts' where sku = '046020R';
update products set brand_id = (select id from brands where name = 'Real'), name = 'Olla Nº 50 Gastronomica 100 Lts' where sku = '046023R';

update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Cacerola Nº 22 4.6 Lts' where sku = '45003';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Colapasta 30 cm c/Asa' where sku = '47034';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Colapasta 40 cm c/Asa' where sku = '47089';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Colapastas Nº 26 A/CH' where sku = '42028';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Cucharon 14 cm Gastronomico' where sku = '47036';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Pava Nº 18 A/CH 2.5 Lts' where sku = '42095';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Pava Nº 20 A/CH 3.4 Lts' where sku = '42096';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Espumadera 14 cm' where sku = '47039';
update products set brand_id = (select id from brands where name = 'Tresso'), name = 'Espumadera 16 cm' where sku = '47040';

update products set brand_id = (select id from brands where name = 'Hudson'), name = 'Bateria de cocina 5 Pzas Ceramica' where sku = 'HACD01C';
update products set brand_id = (select id from brands where name = 'Hudson'), name = 'Bateria de cocina 5 piezas Teflon' where sku = 'H09-10016';

update products set brand_id = (select id from brands where name = 'Moral'), name = 'Espumadera p/Frito 14 cm' where sku = '1016';

update products set brand_id = null where sku in ('1766', '1767');

delete from brands where name = 'Gastronomia';
