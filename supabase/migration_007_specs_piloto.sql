-- Migracion 007: piloto de 10 productos con specs/descripcion investigados
-- (skill product-specs-research). Fuentes: GSMArena, sitios oficiales de
-- Apple/Samsung/Motorola, devicespecifications.com (ver detalle en el chat).
-- Solo toca specs/description de estos 10 SKU puntuales, no pisa nada mas.

-- IPH13: iPhone 13 128GB Midnight
update products set
  description = 'iPhone 13 de 128 GB en color Midnight, con pantalla Super Retina XDR de 6,1 pulgadas y chip A15 Bionic. Cuenta con cámara dual de 12 MP con modo noche y grabación de video 4K, además de carga rápida e inalámbrica compatible con MagSafe.',
  specs = '[
    {"label":"Marca","value":"Apple"},
    {"label":"Modelo","value":"iPhone 13"},
    {"label":"Color","value":"Midnight"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.1\" Super Retina XDR OLED (1170x2532)"},
    {"label":"Procesador","value":"Apple A15 Bionic"},
    {"label":"Batería","value":"3240 mAh, carga rápida 20W, MagSafe 15W"},
    {"label":"Cámara trasera","value":"Dual 12 MP (gran angular + ultra gran angular)"},
    {"label":"Cámara frontal","value":"12 MP"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'IPH13';

-- IPH14: iPhone 14 128GB
update products set
  description = 'iPhone 14 de 128 GB con pantalla Super Retina XDR de 6,1 pulgadas y chip A15 Bionic. Su sistema de cámara dual de 12 MP incorpora estabilización de imagen mejorada, ideal para fotos y video en movimiento.',
  specs = '[
    {"label":"Marca","value":"Apple"},
    {"label":"Modelo","value":"iPhone 14"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.1\" Super Retina XDR OLED"},
    {"label":"Procesador","value":"Apple A15 Bionic"},
    {"label":"Batería","value":"3279 mAh"},
    {"label":"Cámara trasera","value":"Dual 12 MP (f/1.5 + f/2.4)"},
    {"label":"Cámara frontal","value":"12 MP f/1.9"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'IPH14';

-- G13: Moto G13 4/64GB
update products set
  description = 'Moto G13 con 4 GB de RAM y 64 GB de almacenamiento, pantalla IPS de 6,5 pulgadas y batería de 5000 mAh para todo el día de uso. Cámara trasera triple encabezada por un sensor principal de 50 MP.',
  specs = '[
    {"label":"Marca","value":"Motorola"},
    {"label":"Modelo","value":"Moto G13"},
    {"label":"RAM","value":"4 GB"},
    {"label":"Almacenamiento","value":"64 GB"},
    {"label":"Pantalla","value":"6.5\" IPS (720x1600)"},
    {"label":"Procesador","value":"MediaTek Helio G85 (octa-core)"},
    {"label":"Batería","value":"5000 mAh"},
    {"label":"Cámara trasera","value":"Triple 50 MP + 2 MP + 2 MP"},
    {"label":"Cámara frontal","value":"8 MP"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'G13';

-- G23: Moto G23 4/128GB
update products set
  description = 'Moto G23 con 4 GB de RAM y 128 GB de almacenamiento, pantalla IPS de 6,5 pulgadas con 90 Hz de tasa de refresco. Batería de 5000 mAh con carga rápida de 30 W y cámara principal de 50 MP.',
  specs = '[
    {"label":"Marca","value":"Motorola"},
    {"label":"Modelo","value":"Moto G23"},
    {"label":"RAM","value":"4 GB"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.5\" IPS 90Hz (720x1600)"},
    {"label":"Procesador","value":"MediaTek Helio G85"},
    {"label":"Batería","value":"5000 mAh, carga 30W"},
    {"label":"Cámara trasera","value":"Triple 50 MP + 5 MP + 2 MP"},
    {"label":"Cámara frontal","value":"16 MP"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'G23';

-- BUDS2: Samsung Galaxy Buds2
update products set
  description = 'Auriculares inalámbricos Samsung Galaxy Buds2 con Bluetooth 5.2 y resistencia al agua. Ofrecen hasta 20 horas de reproducción combinando auriculares y estuche de carga, con un diseño liviano de 5 g por auricular.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy Buds2"},
    {"label":"Bluetooth","value":"5.2"},
    {"label":"Batería","value":"61 mAh (auricular) + 472 mAh (estuche), hasta 20 h totales"},
    {"label":"Resistencia al agua","value":"Sí (IPX2)"},
    {"label":"Peso","value":"5 g por auricular"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'BUDS2';

-- FIT2: Samsung Galaxy Fit2 Black
update products set
  description = 'Pulsera inteligente Samsung Galaxy Fit2 en color negro, con pantalla AMOLED de 1,1 pulgadas y hasta 15 días de autonomía. Registra actividad física, frecuencia cardíaca y notificaciones del celular.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy Fit2"},
    {"label":"Color","value":"Black"},
    {"label":"Pantalla","value":"1.1\" AMOLED (126x294)"},
    {"label":"Batería","value":"159 mAh, hasta 15 días de autonomía"},
    {"label":"Peso","value":"21 g"},
    {"label":"Dimensiones","value":"46.6 x 18.6 x 11.1 mm"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'FIT2';

-- A07128: Samsung Galaxy A07 4/128GB (variante 4G asumida, ver nota)
update products set
  description = 'Celular Samsung Galaxy A07 con 4 GB de RAM y 128 GB de almacenamiento, pantalla de 6,7 pulgadas a 90 Hz. Cámara trasera doble de 50 MP y batería de larga duración pensada para uso diario.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy A07"},
    {"label":"RAM","value":"4 GB"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.7\" PLS TFT 90Hz (720x1600)"},
    {"label":"Procesador","value":"MediaTek Helio G99"},
    {"label":"Batería","value":"5000 mAh"},
    {"label":"Cámara trasera","value":"Dual 50 MP + 2 MP"},
    {"label":"Cámara frontal","value":"8 MP"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'A07128';

-- A164128: Samsung Galaxy A16 4/128GB
update products set
  description = 'Celular Samsung Galaxy A16 con 4 GB de RAM y 128 GB de almacenamiento, pantalla Super AMOLED de 6,7 pulgadas a 90 Hz. Batería de 5000 mAh con carga rápida de 25 W y cámara trasera triple de 50 MP.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy A16"},
    {"label":"RAM","value":"4 GB"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.7\" Super AMOLED 90Hz (1080x2340)"},
    {"label":"Procesador","value":"MediaTek Helio G99"},
    {"label":"Batería","value":"5000 mAh, carga rápida 25W"},
    {"label":"Cámara trasera","value":"Triple 50 MP + 5 MP + 2 MP"},
    {"label":"Cámara frontal","value":"13 MP"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'A164128';

-- S22: Samsung Galaxy S22 128GB/8GB
update products set
  description = 'Samsung Galaxy S22 con 8 GB de RAM y 128 GB de almacenamiento, pantalla Dynamic AMOLED 2X de 6,1 pulgadas a 120 Hz. Sistema de triple cámara con zoom óptico 3x y grabación en alta resolución.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy S22"},
    {"label":"RAM","value":"8 GB"},
    {"label":"Almacenamiento","value":"128 GB"},
    {"label":"Pantalla","value":"6.1\" Dynamic AMOLED 2X 120Hz"},
    {"label":"Procesador","value":"Exynos 2200 / Snapdragon 8 Gen 1 (según región)"},
    {"label":"Batería","value":"3700 mAh, carga 25W"},
    {"label":"Cámara trasera","value":"Triple 50 MP + 10 MP (zoom 3x) + 12 MP"},
    {"label":"Cámara frontal","value":"10 MP"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'S22';

-- XCOVERPRO: Samsung Galaxy XCover Pro 64GB/4GB
update products set
  description = 'Samsung Galaxy XCover Pro, un celular resistente (certificación IP68) pensado para uso profesional intensivo, con 4 GB de RAM y 64 GB de almacenamiento. Batería removible de 4050 mAh y pantalla de 6,3 pulgadas con Gorilla Glass 5.',
  specs = '[
    {"label":"Marca","value":"Samsung"},
    {"label":"Modelo","value":"Galaxy XCover Pro"},
    {"label":"RAM","value":"4 GB"},
    {"label":"Almacenamiento","value":"64 GB"},
    {"label":"Pantalla","value":"6.3\" IPS (1440x2560), Gorilla Glass 5"},
    {"label":"Procesador","value":"Exynos 9611 (octa-core)"},
    {"label":"Batería","value":"4050 mAh removible, carga 15W"},
    {"label":"Cámara trasera","value":"Dual 25 MP + 8 MP"},
    {"label":"Cámara frontal","value":"13 MP"},
    {"label":"Resistencia","value":"IP68 (agua y polvo)"},
    {"label":"Condición del ítem","value":"Nuevo"}
  ]'::jsonb
where sku = 'XCOVERPRO';
