-- Migracion 081: LFJ-KM-291 habia quedado libre tras la correccion de
-- migration_078 (donde se descubrio que el titulo con typo "km-229"
-- en realidad correspondia a LFJ-KM-2299). Revisando la web se
-- encontro que otra publicacion de ML (Patillera 8500rpm Marron
-- Oscuro) SI confirma Modelo "KM-291" en sus specs, con stock exacto
-- (40). Ya aplicado directamente con la service role key.

-- LFJ-KM-291 "Trimmer inalambrico - 4 posiciones - 1 a 7 mm - Lubricante, cepillo de limpieza" <- MLA3081841600 "Patillera Trimmer Inalámbrica + Accesorios 8500rpm Kemei Marrón Oscuro"
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3081841600-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3081841600-2.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3081841600-3.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3081841600-4.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3081841600-5.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA3081841600-6.jpg"]'::jsonb,
  specs = '[{"label":"Accesorios incluidos","value":"Cargador,Cuchillas de acero,Peines guía"},{"label":"Voltaje de la batería","value":"220V"},{"label":"Marca","value":"Kemei"},{"label":"Color","value":"Marrón oscuro"},{"label":"Funciones","value":"Cortadora de pelo,Afeitadora"},{"label":"Tipos de cabezales","value":"Ergónomicos,Removibles"},{"label":"Incluye accesorios","value":"Sí"},{"label":"Incluye batería recargable","value":"Sí"},{"label":"Es apta para bebés","value":"Sí"},{"label":"Es apta para viaje","value":"Sí"},{"label":"Es inalámbrica","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Modelo","value":"KM-291"},{"label":"Tipo de alimentación","value":"Batería recargable"},{"label":"Voltaje","value":"220V"},{"label":"Con cabezales lavables","value":"Sí"}]'::jsonb,
  description = 'La Patillera Trimmer Inalámbrica Kemei KM-291 es la herramienta ideal para quienes buscan un corte preciso y cómodo. Con un potente motor de 8500RPM, esta trimmer ofrece un rendimiento excepcional tanto como cortadora de pelo como afeitadora, adaptándose a las necesidades de cada usuario.

Su diseño ergonómico y cabezales removibles facilitan su uso y limpieza, garantizando una experiencia de afeitado sin complicaciones. Incluye cuchillas de acero de alta calidad y peines guía, permitiendo personalizar el estilo de corte según las preferencias individuales.

La batería recargable proporciona una autonomía ideal para viajes, y su voltaje de 220V asegura un rendimiento constante. Además, es apta para bebés, lo que la convierte en una opción versátil para toda la familia.

Con su funcionalidad inalámbrica, esta patillera se convierte en un aliado perfecto para quienes valoran la comodidad y la eficiencia en su rutina de cuidado personal. Disfruta de un acabado profesional en la comodidad de tu hogar con la Patillera Trimmer Kemei.'
where sku = 'LFJ-KM-291';
update products set active = false, ml_item_id = null where sku = 'MLA3081841600';
