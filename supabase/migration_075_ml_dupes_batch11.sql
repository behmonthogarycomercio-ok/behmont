-- Migracion 075: contraparte blanca de la camilla 3015 ya fusionada
-- (medidas 182x61x60 + color exactos, stock 8 vs 7). Ya aplicado.

-- 3015WHITE "Camilla fija 2 cuerpos 182 x 61 x 60 - Blanco" <- MLA3101100518 "Camilla De Masaje Profesional Hierro 182x61x60 Ajustable Blanco"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100518-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100518-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100518-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100518-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100518-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3101100518-6.webp"]'::jsonb,
  specs = '[{"label":"Tipo de producto","value":"Camilla"},{"label":"Usos recomendados","value":"Masajes profesionales y tratamientos estéticos"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Altura","value":"61 cm"},{"label":"Es plegable","value":"Sí"},{"label":"Es portátil","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Tipo de camilla de masajes","value":"Portátil"},{"label":"Peso máximo soportado","value":"250 kg"},{"label":"Modelo","value":"3015"},{"label":"Ancho","value":"60 cm"},{"label":"Con orificio para la cara","value":"Sí"}]'::jsonb,
  description = 'La Camilla de Masaje Profesional Behmont 3015 es la elección ideal para terapeutas y esteticistas que buscan calidad y comodidad en sus tratamientos. Con unas dimensiones de 182x61x60 cm, esta camilla ajustable se adapta a las necesidades de cada cliente, garantizando una experiencia placentera y efectiva.

Diseñada para ser portátil y plegable, es perfecta para quienes realizan masajes en diferentes ubicaciones. Su estructura de hierro proporciona una robustez excepcional, soportando hasta 250 kg, lo que la convierte en una opción confiable para todo tipo de usuarios.

El orificio para la cara añade un nivel extra de confort, permitiendo que los clientes se relajen completamente durante el tratamiento. Su diseño práctico y funcional asegura que puedas llevarla contigo a cualquier lugar, sin sacrificar la calidad del servicio que ofreces.

La Camilla Behmont es más que un simple mueble; es una herramienta esencial para profesionales que valoran la ergonomía y la durabilidad. Mejora tu práctica y ofrece a tus clientes la atención que merecen con esta camilla de masaje de alta calidad.'
where sku = '3015WHITE';
update products set active = false, ml_item_id = null where sku = 'MLA3101100518';
