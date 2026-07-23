-- Migracion 080: 3 duplicados mas via campo Modelo. Ya aplicado.

-- RTD "Estirilizador y calentador de toallas - 10 toallas" <- MLA1720873669 "Esterilizador Calentador De Toallas Uv Spa Estetica 60°-110° Blanco"
-- Esterilizador y calentador de toallas (Modelo confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720873669-1.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720873669-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720873669-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720873669-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720873669-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA1720873669-6.webp"]'::jsonb,
  specs = '[{"label":"Formato de venta","value":"Unidad"},{"label":"Unidades por pack","value":"1"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Blanco"},{"label":"Profundidad","value":"12 cm"},{"label":"Cantidad de funciones","value":"2"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Largo","value":"41 cm"},{"label":"Material","value":"Metal/Plástico"},{"label":"Modelo","value":"RTD"},{"label":"Organismo de certificación (OCP)","value":"Otro (sin especificar)"},{"label":"Potencia","value":"60 W"},{"label":"Cantidad de toallas soportadas","value":"6"},{"label":"Voltaje","value":"220V"},{"label":"Peso","value":"1.613 kg"},{"label":"Ancho","value":"17 cm"},{"label":"Con pantalla digital","value":"No"},{"label":"Con temporizador","value":"Sí"}]'::jsonb,
  description = 'El Esterilizador Calentador de Toallas UV Spa Estética de Behmont, modelo RTD, es la solución ideal para profesionales del cuidado personal y la estética. Diseñado para mantener la higiene y el confort, este dispositivo permite calentar toallas a temperaturas que oscilan entre 60° y 110°, asegurando una experiencia placentera para los clientes.

Su tecnología de esterilización UV elimina gérmenes y bacterias, garantizando un ambiente seguro y saludable. Con un diseño compacto y elegante, se adapta perfectamente a cualquier espacio de trabajo, optimizando la organización y el uso eficiente del área.

El funcionamiento intuitivo y su fácil mantenimiento hacen que este esterilizador sea una herramienta indispensable en spas, salones de belleza y centros de estética. Mejora la calidad del servicio y la satisfacción del cliente, elevando la experiencia general en cada tratamiento.'
where sku = 'RTD';
update products set active = false, ml_item_id = null where sku = 'MLA1720873669';

-- D6BLACK "Camilla articulada 180 x 60 x 60 - Soporta 150 kg - Negro" <- MLA2826816282 "Camilla De Masaje Profesional Portátil Ergonómica 180x60x60 Negro"
-- Camilla articulada 180x60x60 Negro (Modelo confirmado en specs)
update products set
  images = '["https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2826816282-1.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2826816282-2.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2826816282-3.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2826816282-4.webp","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2826816282-5.jpg","https://pobfcnezbxrprtymyivi.supabase.co/storage/v1/object/public/product-images/ml-import/MLA2826816282-6.webp"]'::jsonb,
  specs = '[{"label":"Tipo de producto","value":"Camilla"},{"label":"Usos recomendados","value":"Masajes profesionales y tratamientos estéticos"},{"label":"Marca","value":"Behmont"},{"label":"Color","value":"Negro"},{"label":"Es plegable","value":"Sí"},{"label":"Es portátil","value":"Sí"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Tipo de camilla de masajes","value":"Portátil"},{"label":"Peso máximo soportado","value":"250 kg"},{"label":"Modelo","value":"D6-Black"}]'::jsonb,
  description = 'La Camilla de Masaje Profesional Portátil y Ergonómica Behmont D6-Black es la elección ideal para terapeutas y esteticistas que buscan calidad y comodidad en su práctica. Su diseño portátil y plegable permite un fácil transporte y almacenamiento, lo que la convierte en una herramienta versátil para cualquier profesional en movimiento.

Con una capacidad de carga de hasta 250 kg, esta camilla garantiza estabilidad y seguridad durante los tratamientos. Su estructura ergonómica está diseñada para proporcionar el máximo confort tanto al cliente como al terapeuta, permitiendo sesiones prolongadas sin comprometer la postura.

Ideal para masajes profesionales y tratamientos estéticos, la Behmont D6-Black se adapta a diversas técnicas y estilos de trabajo. Su tapizado de alta calidad es fácil de limpiar y mantener, asegurando una experiencia higiénica y placentera para todos los usuarios.

Invierta en una camilla que combina funcionalidad y diseño, y eleve la calidad de sus servicios. La Behmont D6-Black es la herramienta que necesita para ofrecer tratamientos excepcionales y satisfacer a sus clientes.

BULTO: 120 x 31 x 61 ----- 23 KG'
where sku = 'D6BLACK';
update products set active = false, ml_item_id = null where sku = 'MLA2826816282';

-- 25-JAY10 "Equipamientos - Cortapapas Horizontal" <- MLA2204965328 "Cortador De Papas Súper Filoso De Mesa Behmont Plateado"
-- Segunda publicacion de ML para 25-JAY10 (Modelo confirmado en specs)
update products set active = false, ml_item_id = null where sku = 'MLA2204965328';

