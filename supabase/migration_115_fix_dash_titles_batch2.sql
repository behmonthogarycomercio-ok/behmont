-- Migracion 115: segunda tanda (15 de 30) de productos con el mismo problema
-- que la migracion 114 -- "name" armado como lista de caracteristicas,
-- specs/description vacios. Acá van los 6 combos Dimadera, los 2 colchones
-- (Inducol, King Koil) y los 7 repuestos/accesorios internos de Behmont.
--
-- Para los combos Dimadera y los colchones: los numeros (medidas, peso
-- maximo soportado, etc.) ya estaban en el nombre original -- no son un
-- dato nuevo, se mantienen y solo se reorganizan en specs. Para los
-- colchones se confirmo con fuentes externas (Fravega, Megatone, Cetrogar)
-- que coinciden con esos mismos numeros.
--
-- Para los repuestos/accesorios de Behmont (prefijo "Tra -"/"Accesorios -"):
-- son piezas internas sin ficha de fabricante publica (repuestos de sillones
-- de barberia/peluqueria), asi que solo se limpia el nombre y se reorganiza
-- lo que ya decia el nombre original -- no se inventan medidas, pesos ni
-- materiales que no estuvieran ya ahi.

update products set
  name = 'Combo mesa 1.20 x 0.70 m + 4 sillas Jeroki',
  specs = '[
    {"label":"Marca","value":"Dimadera"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Acabado","value":"Lustre miel"},
    {"label":"Sillas","value":"4 sillas Jeroki"},
    {"label":"Tapizado","value":"Medio tapizado cuerotex gris"},
    {"label":"Medidas de la mesa","value":"1,20 x 0,70 m"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Combo de comedor de pino macizo con mesa de 1,20 x 0,70 m y 4 sillas modelo Jeroki, terminacion lustre miel. El asiento de las sillas viene medio tapizado en cuerotex gris.'
where sku = 'CBM01-CG';

update products set
  name = 'Combo mesa 1.20 x 0.70 m + 4 sillas Jeroki',
  specs = '[
    {"label":"Marca","value":"Dimadera"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Acabado","value":"Lustre miel"},
    {"label":"Sillas","value":"4 sillas Jeroki"},
    {"label":"Tapizado","value":"Medio tapizado rustico siena"},
    {"label":"Medidas de la mesa","value":"1,20 x 0,70 m"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Combo de comedor de pino macizo con mesa de 1,20 x 0,70 m y 4 sillas modelo Jeroki, terminacion lustre miel. El asiento de las sillas viene medio tapizado en tela rustica color siena.'
where sku = 'CBM01-RS';

update products set
  name = 'Combo mesa 1.50 x 0.80 m + 6 sillas Jeroki',
  specs = '[
    {"label":"Marca","value":"Dimadera"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Acabado","value":"Lustre cedro"},
    {"label":"Sillas","value":"6 sillas Jeroki"},
    {"label":"Tapizado","value":"Medio tapizado rustico siena"},
    {"label":"Medidas de la mesa","value":"1,50 x 0,80 m"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Combo de comedor de pino macizo con mesa de 1,50 x 0,80 m y 6 sillas modelo Jeroki, terminacion lustre cedro. El asiento de las sillas viene medio tapizado en tela rustica color siena.'
where sku = 'CBM02C-RS';

update products set
  name = 'Combo mesa 1.50 x 0.80 m + 6 sillas Jeroki',
  specs = '[
    {"label":"Marca","value":"Dimadera"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Acabado","value":"Lustre cedro"},
    {"label":"Sillas","value":"6 sillas Jeroki"},
    {"label":"Tapizado","value":"Medio tapizado gris perla"},
    {"label":"Medidas de la mesa","value":"1,50 x 0,80 m"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Combo de comedor de pino macizo con mesa de 1,50 x 0,80 m y 6 sillas modelo Jeroki, terminacion lustre cedro. El asiento de las sillas viene medio tapizado color gris perla.'
where sku = 'CBM02C-GP';

update products set
  name = 'Combo mesa 1.50 x 0.80 m + 6 sillas Jeroki',
  specs = '[
    {"label":"Marca","value":"Dimadera"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Acabado","value":"Lustre miel"},
    {"label":"Sillas","value":"6 sillas Jeroki"},
    {"label":"Tapizado","value":"Medio tapizado cuerotex beige"},
    {"label":"Medidas de la mesa","value":"1,50 x 0,80 m"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Combo de comedor de pino macizo con mesa de 1,50 x 0,80 m y 6 sillas modelo Jeroki, terminacion lustre miel. El asiento de las sillas viene medio tapizado en cuerotex beige.'
where sku = 'CBM02H-CB';

update products set
  name = 'Combo mesa 1.50 x 0.80 m + 6 sillas Jeroki',
  specs = '[
    {"label":"Marca","value":"Dimadera"},
    {"label":"Material","value":"Pino macizo"},
    {"label":"Acabado","value":"Lustre miel"},
    {"label":"Sillas","value":"6 sillas Jeroki"},
    {"label":"Tapizado","value":"Medio tapizado gris plata"},
    {"label":"Medidas de la mesa","value":"1,50 x 0,80 m"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Combo de comedor de pino macizo con mesa de 1,50 x 0,80 m y 6 sillas modelo Jeroki, terminacion lustre miel. El asiento de las sillas viene medio tapizado color gris plata.'
where sku = 'CBM02H-GP';

update products set
  name = 'Colchon espuma Limay 1 plaza',
  specs = '[
    {"label":"Marca","value":"Inducol"},
    {"label":"Modelo","value":"Limay"},
    {"label":"Plazas","value":"1"},
    {"label":"Dimensiones","value":"80 x 190 x 22 cm"},
    {"label":"Densidad de la espuma","value":"30 kg/m3 (alta densidad)"},
    {"label":"Peso maximo soportado","value":"100 kg/plaza"},
    {"label":"Confort","value":"Firme"},
    {"label":"Recubrimiento","value":"Tejido de punto"},
    {"label":"Caracteristicas","value":"Hipoalergenico, antiacaros, enrollado al vacio"},
    {"label":"Garantia","value":"5 años"},
    {"label":"Origen","value":"Industria Argentina"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Colchon de espuma de alta densidad de 1 plaza, con un soporte firme y capacidad de hasta 100 kg. Viene enrollado al vacio para facilitar el transporte, con recubrimiento hipoalergenico y antiacaros.'
where sku = '207000';

update products set
  name = 'Colchon espuma G22 2 plazas',
  specs = '[
    {"label":"Marca","value":"King Koil"},
    {"label":"Modelo","value":"G22"},
    {"label":"Plazas","value":"2"},
    {"label":"Dimensiones","value":"140 x 190 x 22 cm"},
    {"label":"Densidad de la espuma","value":"35 kg/m3 (alta densidad + capas soft)"},
    {"label":"Peso maximo soportado","value":"120 kg/plaza"},
    {"label":"Confort","value":"Firme"},
    {"label":"Recubrimiento","value":"Tejido de punto blanco"},
    {"label":"Incluye sommier","value":"No"},
    {"label":"Garantia","value":"5 años"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Colchon de espuma de alta densidad de 2 plazas, con capas de espuma soft sobre una base firme y capacidad de hasta 120 kg por plaza. Viene compactado en caja para facilitar el transporte e instalacion.'
where sku = '185104';

update products set
  name = 'Repulgadora cuadruple de fundicion',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Material","value":"Fundicion"},
    {"label":"Tipo","value":"Cuadruple"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Repulgadora cuadruple de fundicion, pensada como repuesto/accesorio para equipamiento gastronomico.'
where sku = 'CEM4';

update products set
  name = 'Repulgadora doble de fundicion',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Material","value":"Fundicion"},
    {"label":"Tipo","value":"Doble"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Repulgadora doble de fundicion, pensada como repuesto/accesorio para equipamiento gastronomico.'
where sku = 'CEM2';

update products set
  name = 'Cabina UV para uñas 99 s.',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Tipo","value":"Accesorio"},
    {"label":"Tiempo de secado","value":"99 s"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Cabina UV para uñas con temporizador de 99 segundos, pensada para curar geles y esmaltes semipermanentes.'
where sku = '25-YXH101';

update products set
  name = 'Pasillo de revision 1.80 m derecho con riñon',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Longitud","value":"1,80 m"},
    {"label":"Lado","value":"Derecho"},
    {"label":"Incluye","value":"Riñon"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Pasillo de revision de 1,80 m, version derecha, con riñon incluido. Repuesto/accesorio para equipamiento de barberia.'
where sku = 'CHJ06D';

update products set
  name = 'Pasillo de revision 1.80 m izquierdo con riñon',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Longitud","value":"1,80 m"},
    {"label":"Lado","value":"Izquierdo"},
    {"label":"Incluye","value":"Riñon"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Pasillo de revision de 1,80 m, version izquierda, con riñon incluido. Repuesto/accesorio para equipamiento de barberia.'
where sku = 'CHJ06I';

update products set
  name = 'Provoletera 16 cm',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Diametro","value":"16 cm"},
    {"label":"Material","value":"Hierro fundido enlozado"},
    {"label":"Mango","value":"Madera"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Provoletera de 16 cm en hierro fundido enlozado, con mango de madera.'
where sku = 'L3302';

update products set
  name = 'Kit de manicura: mesa + sillon + puf',
  specs = '[
    {"label":"Marca","value":"Behmont"},
    {"label":"Incluye","value":"Mesa de marmol con cajonera, sillon y puf"},
    {"label":"Tapizado","value":"Gris"},
    {"label":"Estructura","value":"Dorada"},
    {"label":"Condicion del item","value":"Nuevo"}
  ]'::jsonb,
  description = 'Kit de manicura compuesto por mesa de marmol con cajonera, sillon y puf, con tapizado gris y estructura dorada.'
where sku = 'MANKIT';
