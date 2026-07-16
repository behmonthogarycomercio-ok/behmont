-- Migracion 025: fusiona marcas duplicadas/con typo que se colaron en la
-- importacion original (seed_brands.sql). Pasa los productos a la marca
-- canonica y borra las filas duplicadas.
--   Hinsense, Hissense  -> Hisense
--   Whirpool             -> Whirlpool

update products set brand_id = (select id from brands where name = 'Hisense')
where brand_id in (select id from brands where name in ('Hinsense', 'Hissense'));

update products set brand_id = (select id from brands where name = 'Whirlpool')
where brand_id in (select id from brands where name = 'Whirpool');

delete from brands where name in ('Hinsense', 'Hissense', 'Whirpool');
