-- Migracion 055: 3 fotos adicionales, matcheadas via codigos anotados
-- manualmente en el nombre de carpeta por el usuario (ej. "Freidora de
-- mesa (cod 53)"), verificados contra la lista de precios del distribuidor
-- Y contra el nombre real ya cargado en la base antes de usar - se
-- descarto un cuarto candidato (cod 45) porque el codigo estaba pisado
-- por otro producto distinto en la base real (Horno multiple 6 pizzas).

update products set images = '["/images/products/196/1.jpg","/images/products/196/2.jpg","/images/products/196/3.jpg"]'::jsonb where sku = '196';
update products set images = '["/images/products/53/1.jpg","/images/products/53/2.jpg"]'::jsonb where sku = '53';
update products set images = '["/images/products/CA100/1.jpg"]'::jsonb where sku = 'CA100';
