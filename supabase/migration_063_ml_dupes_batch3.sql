-- Migracion 063: 2 duplicados mas, encontrados al revisar mas a fondo el
-- grupo de picadoras de carne que habia quedado afuera del batch 2 (el
-- escaneo anterior solo miraba los 2 mejores candidatos por similitud de
-- nombre, y estos quedaron 3ros por nombre aunque el stock y precio
-- coinciden exacto). Ya aplicado directamente con la service role key.

-- TC-32 "Picadora de carne electrica 2 en 1 - 32 y 22" - 2 HP - 300 kg/h - Acero inox." <- MLA3481755636 "Picadora Carne Eléctrica 2hp 300kg/h Acero Inox Behmont"
-- (stock 8=8 y precio $1653000=$1653000 exactos)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3481755636-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3481755636-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3481755636-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3481755636-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3481755636-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3481755636-6.jpg"]'::jsonb,
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Es industrial","value":"Sí"},{"label":"Es lavable","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Material","value":"Acero inoxidable"},{"label":"Tipo de picadora de carne","value":"Eléctrica"},{"label":"Modelo","value":"TC-32"},{"label":"Tipo de alimentación","value":"Eléctrica"},{"label":"Voltaje","value":"220V"}]'::jsonb
where sku = 'TC-32';
update products set active = false, ml_item_id = null where sku = 'MLA3481755636';

-- 25-JAY05 "Picadora de carne manual 22." <- MLA3481777798 "Picadora De Carne Manual N22 Acero Gastronomía Behmont"
-- (stock 10=10 y precio casi identico: $121910 vs $122000)
-- (sin cambios de datos: el distribuidor ya tenia fotos/specs)
update products set active = false, ml_item_id = null where sku = 'MLA3481777798';
