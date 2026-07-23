-- Migracion 077: Balanza 40kg con mastil y bateria - 2 publicaciones de
-- ML con precio identico entre si ($138.000), una enfoca "Comercial 40Kg
-- Con Mastil" y otra "Digital Con Bateria Con Mastil" -- 400AS-B es el
-- unico distribuidor SKU que combina ambos atributos (40kg + bateria),
-- confirmando que es el mismo producto. Ya aplicado.

-- 400AS-B "Equipamientos - Balanza con mastil 40 kg - C/bateria" <- MLA1882931417 "Balanza Comercial Behmont 40 Kg Con Mastil Blanco" + MLA1867596677 "Balanza Digital Con Batería Con Mástil Blanca Behmont Blanco"
update products set
  specs = '[{"label":"Tipo de batería","value":"Recargable"},{"label":"Marca","value":"BEHMONT"},{"label":"Color","value":"Blanco"},{"label":"Tipo de pantalla de la balanza digital","value":"LCD"},{"label":"Número de certificado de seguridad eléctrica","value":"DC-E-S113-003.1"},{"label":"Tipo de producto","value":"Comercial"},{"label":"Es colgable","value":"No"},{"label":"Condición del ítem","value":"Nuevo"},{"label":"Línea","value":"Comercial"},{"label":"Tara máxima","value":"40 kg"},{"label":"Peso máximo soportado","value":"40 kg"},{"label":"Peso mínimo soportado","value":"200 g"},{"label":"Modelo","value":"behmont"},{"label":"Tipos de montaje","value":"Con mástil"},{"label":"Organismo de certificación (OCP)","value":"IRAM Instituto Argentino de Normalización y Certificación"},{"label":"Tipo de balanza","value":"Digital con mástil"},{"label":"Diámetro de la superficie de apoyo","value":"38 cm"},{"label":"Largo de la superficie de apoyo","value":"33 cm"},{"label":"Ancho de la superficie de apoyo","value":"23 cm"},{"label":"Voltaje","value":"220V"},{"label":"Con teclado","value":"Sí"},{"label":"Con mástil","value":"Sí"},{"label":"Con impresora","value":"No"},{"label":"Con tecla tara","value":"Sí"},{"label":"Con tecla cero","value":"Sí"}]'::jsonb,
  description = 'Esta balanza digital con mástil BEHMONT está pensada para operaciones de pesaje en ámbitos comerciales donde se requiere lectura rápida y práctica. Su diseño blanco ayuda a mantener una imagen prolija en mostradores, puestos de venta y espacios de atención.

Ofrece una capacidad máxima de 40 kg y un rango mínimo de 200 g, lo que permite trabajar con artículos livianos y cargas más exigentes dentro del mismo equipo. La pantalla LCD facilita la visualización de los datos durante la jornada.

El mástil mejora la lectura desde una posición más cómoda, algo útil cuando el equipo se usa de forma continua. El teclado incorpora tecla tara y tecla cero para agilizar el pesaje de recipientes y el ajuste previo antes de cada medición.

Su batería recargable aporta autonomía para trabajar sin depender de una conexión permanente, una ventaja práctica en espacios con movimiento o cambios de ubicación. Al no incluir impresora, mantiene una propuesta directa y enfocada en el pesaje esencial.

La línea comercial y el modelo 400AS-B reúnen funciones útiles para negocios que necesitan una balanza confiable, sencilla de leer y pensada para uso frecuente. Es una alternativa funcional para control de mercadería, atención al cliente y tareas de control interno.'
where sku = '400AS-B';
update products set active = false, ml_item_id = null where sku = 'MLA1882931417';
update products set active = false, ml_item_id = null where sku = 'MLA1867596677';
