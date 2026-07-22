-- Migracion 057: fusiona 12 productos duplicados entre el catalogo del
-- distribuidor y el sync de MercadoLibre (mismo producto fisico cargado
-- dos veces con SKU distinto, detectado por similitud de nombre >=75%
-- dentro de la misma categoria + verificacion manual del modelo exacto).
--
-- Criterio: la fila del distribuidor tiene el precio real/mas bajo pero
-- en la mayoria de los casos no tenia foto ni specs; la fila de
-- MercadoLibre tiene foto, descripcion y specs pero precio inflado y
-- stock trackeado por separado (riesgo de sobreventa con dos
-- publicaciones del mismo item). Se transfieren fotos + descripcion +
-- specs de la fila ML a la fila del distribuidor, y se desactiva
-- (active=false, no se borra) la fila ML duplicada.
--
-- Nota: en 2 de los 12 casos (BX-3077 y BX-2063) la ficha de ML tenia
-- un error interno propio -el campo "Modelo" de los specs no coincidia
-- con el modelo real del titulo/SKU (decia "Helix" en vez de "Omega", y
-- "Orbit" en vez de "Prime")-, se corrigio ese campo puntual al modelo
-- correcto antes de cargarlo, el resto de los specs no se toco.

-- BX-3043 (Core) <- MLA3013505550
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013505550-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013505550-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013505550-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013505550-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013505550-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013505550-6.webp"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Modelo","value":"Core"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-3043';
update products set active = false where sku = 'MLA3013505550';

-- BX-1091B (Elite) <- MLA3013583046
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013583046-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013583046-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013583046-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013583046-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013583046-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013583046-6.webp"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Modelo","value":"Elite"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Cuadrada"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-1091B';
update products set active = false where sku = 'MLA3013583046';

-- W-AF051 (Helix) <- MLA3013596100
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596100-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596100-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596100-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596100-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596100-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596100-6.jpg"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"BEHMONT"},{"label":"Modelo","value":"Helix"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Blanco"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'W-AF051';
update products set active = false where sku = 'MLA3013596100';

-- BX-2687B (Volta) <- MLA3013596866
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596866-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596866-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596866-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596866-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596866-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013596866-6.webp"]'::jsonb,
  description = 'El Sillón Barbero Hidráulico Volta de la marca Behmont es la elección ideal para profesionales de la barbería que buscan comodidad y funcionalidad. Su estructura de acero garantiza durabilidad y resistencia, mientras que su diseño elegante se adapta a cualquier ambiente de trabajo. Cuenta con sistema hidráulico para ajustar la altura, reposapiés y apoyacabezas, con capacidad para hasta 150 kg.',
  specs = '[{"label":"Fabricante","value":"BEHMONT"},{"label":"Modelo","value":"Volta"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"150 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-2687B';
update products set active = false where sku = 'MLA3013596866';

-- BX-3077 (Omega) <- MLA3013803510  [ojo: specs de ML traian "Modelo: Helix" por error propio de esa publicacion, corregido a Omega]
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013803510-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013803510-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013803510-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013803510-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013803510-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013803510-6.jpg"]'::jsonb,
  description = 'El Sillón Barbero Hidráulico Omega Reclinable y Con Reposapiés de la marca Behmont es la elección ideal para profesionales de la barbería que buscan comodidad y funcionalidad. Fabricado con estructura de acero, soporta hasta 120 kg. Su sistema hidráulico facilita el ajuste de altura, e incluye reposapiés y apoyacabezas para mayor confort.',
  specs = '[{"label":"Fabricante","value":"BEHMONT"},{"label":"Modelo","value":"Omega"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-3077';
update products set active = false where sku = 'MLA3013803510';

-- BX-2055B (Axis) <- MLA3013571974
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013571974-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013571974-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013571974-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013571974-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013571974-5.jpg"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"BEHMONT"},{"label":"Modelo","value":"Axis"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Cuadrada"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-2055B';
update products set active = false where sku = 'MLA3013571974';

-- JA25-181 (Titan) <- MLA1691620999
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1691620999-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1691620999-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1691620999-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1691620999-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1691620999-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1691620999-6.jpg"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Modelo","value":"Titan"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Cuadrada"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"120 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"Sí"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'JA25-181';
update products set active = false where sku = 'MLA1691620999';

-- JA25-179 (Pulse) <- MLA3013584624
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013584624-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013584624-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013584624-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013584624-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013584624-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013584624-6.jpg"]'::jsonb,
  description = 'El Sillón Peluquero Hidráulico Pulse de Behmont es la elección ideal para profesionales de la barbería que buscan comodidad y funcionalidad. Su estructura de acero soporta hasta 100 kg. Cuenta con sistema hidráulico para ajustar la altura y reposapiés para mayor soporte durante el servicio.',
  specs = '[{"label":"Fabricante","value":"BEHMONT"},{"label":"Modelo","value":"Pulse"},{"label":"Marca","value":"BEHMONT"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Redonda"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Negro"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'JA25-179';
update products set active = false where sku = 'MLA3013584624';

-- BX-2063 (Prime) <- MLA3013545368  [ojo: specs de ML traian "Modelo: Orbit" por error propio de esa publicacion, corregido a Prime]
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013545368-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013545368-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013545368-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013545368-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013545368-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3013545368-6.webp"]'::jsonb,
  specs = '[{"label":"Fabricante","value":"Behmont"},{"label":"Modelo","value":"Prime"},{"label":"Marca","value":"Behmont"},{"label":"Tipo de respaldo","value":"Reclinable"},{"label":"Forma de la base","value":"Cuadrada"},{"label":"Usos recomendados de la silla","value":"Barbería"},{"label":"Color","value":"Blanco"},{"label":"Peso máximo soportado","value":"100 kg"},{"label":"Materiales de la estructura","value":"Acero"},{"label":"Con altura ajustable","value":"Sí"},{"label":"Con apoya pies","value":"Sí"},{"label":"Con apoyacabezas","value":"No"},{"label":"Con sistema hidráulico","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-2063';
update products set active = false where sku = 'MLA3013545368';

-- Lavacabezas (3, ya tenian foto propia del distribuidor - se transfiere
-- descripcion + specs de ML, no se tocan las fotos existentes):
update products set
  description = 'El Lavacabeza BX-647 de Behmont combina bacha de cerámica de alta resistencia con base tapizada en cuero para el confort del cliente. Incluye grifería y ducha. Pensado para peluquerías que ofrecen una experiencia premium.',
  specs = '[{"label":"Marca","value":"BEHMONT"},{"label":"Modelo","value":"BX-647"},{"label":"Línea","value":"Lavacabezas"},{"label":"Material de la bacha","value":"Cerámica"},{"label":"Color de la bacha","value":"Negro"},{"label":"Material de la estructura","value":"Acero"},{"label":"Color de la estructura","value":"Negro"},{"label":"Material del tapizado","value":"Cuero"},{"label":"Color del tapizado","value":"Negro"},{"label":"Con bacha reclinable","value":"Sí"},{"label":"Es monomando","value":"No"},{"label":"Accesorios incluidos","value":"Grifería y ducha"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-647';
update products set active = false where sku = 'MLA1830036383';

update products set
  description = 'El Lavacabeza BX-711 de Behmont combina bacha de cerámica con base en fibra de vidrio y apoyabrazos tapizados en cuero. Incluye grifería y ducha. Pensado para peluquerías que buscan comodidad para el cliente y elegancia en el equipamiento.',
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Modelo","value":"BX-711"},{"label":"Línea","value":"Lavacabezas de peluquería"},{"label":"Material de la bacha","value":"Cerámica"},{"label":"Color de la bacha","value":"Negra"},{"label":"Material de la estructura","value":"Fibra de vidrio"},{"label":"Color de la estructura","value":"Negro"},{"label":"Material del tapizado","value":"Cuero"},{"label":"Color del tapizado","value":"Cuero"},{"label":"Con bacha reclinable","value":"Sí"},{"label":"Es monomando","value":"No"},{"label":"Accesorios incluidos","value":"Grifería y ducha"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'BX-711';
update products set active = false where sku = 'MLA1830026547';

update products set
  description = 'El Lavacabeza MP-31 de Behmont es la solución económica y funcional para peluquerías que están comenzando o necesitan equipar puestos adicionales. Bacha y base de plástico, con grifería y ducha incluidas.',
  specs = '[{"label":"Marca","value":"Behmont"},{"label":"Modelo","value":"MP-31"},{"label":"Línea","value":"Lavacabezas profesional"},{"label":"Material de la bacha","value":"Plástico ABS"},{"label":"Color de la bacha","value":"Negro"},{"label":"Material de la estructura","value":"Plástico"},{"label":"Color de la estructura","value":"Negro"},{"label":"Material del tapizado","value":"PVC"},{"label":"Color del tapizado","value":"Negro"},{"label":"Con bacha reclinable","value":"No"},{"label":"Es monomando","value":"No"},{"label":"Accesorios incluidos","value":"Grifería y ducha"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'MP-31';
update products set active = false where sku = 'MLA3443909842';
