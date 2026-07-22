-- Migracion 059: corrige un problema en migration_057/058 - al desactivar
-- (active=false) los 56 productos duplicados de MercadoLibre no se les
-- quito el ml_item_id, y el sync de ML (src/app/api/ml/sync/route.ts)
-- fuerza active=true en cada fila que sigue vinculada por ml_item_id.
-- Sin este fix, el proximo sync automatico (corre todos los dias 9am,
-- ver vercel.json) iba a reactivar los 56 duplicados con su precio
-- inflado, deshaciendo la limpieza.
--
-- La solucion es la misma que ya usa el sistema para "desincronizar" un
-- producto a proposito (ver comentario en route.ts lineas 89-96): poner
-- ml_item_id = null. El sync detecta estas filas por SKU y por el id
-- embebido en el slug, y las salta para siempre sin tocarlas ni
-- recrearlas.

update products set ml_item_id = null where sku in (
  -- de migration_057 (12)
  'MLA3013505550','MLA3013583046','MLA3013596100','MLA3013596866','MLA3013803510',
  'MLA3013571974','MLA1691620999','MLA3013584624','MLA3013545368','MLA1830036383',
  'MLA1830026547','MLA3443909842',
  -- de migration_058 (44)
  'MLA1829432587','MLA1830036415','MLA1908152773','MLA3443909816','MLA1908156473',
  'MLA1902564507','MLA3013467880','MLA3481752068','MLA3443909814','MLA3481752060',
  'MLA1827736223','MLA1908154009','MLA3471132264','MLA1841130185','MLA3016766284',
  'MLA3443909812','MLA1736576061','MLA1825241657','MLA3436246864','MLA1908175845',
  'MLA3441599960','MLA3013468882','MLA3154172020','MLA3481777808','MLA1678855925',
  'MLA1549261549','MLA1830015657','MLA1830036385','MLA3013611366','MLA3443909818',
  'MLA3624803648','MLA3471120520','MLA3471133546','MLA3472964262','MLA3473084234',
  'MLA1902589631','MLA1910440141','MLA3471120534','MLA3471133548','MLA3624704860',
  'MLA1827606431','MLA1841668263','MLA3481752066','MLA3458937526'
);
