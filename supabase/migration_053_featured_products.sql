-- Migracion 053: marca como "featured" un conjunto de productos con foto real
-- y specs cargadas, para que el Hero y BusinessSection roten variedad real
-- en vez de mostrar un unico producto (o el fallback estatico).
--
-- Criterio de seleccion: activo, con stock, con al menos 1 foto real cargada,
-- con specs ya investigadas, cubriendo la mayor diversidad de categorias
-- posible. De los 1000 productos activos con stock, solo 91 tienen foto
-- propia cargada (el resto son del listado de distribuidor sin imagen) -
-- ese es el pool real del que se puede elegir.
--
-- 16 productos, 11 categorias:
update products set featured = true where sku in (
  'MLA3481764848', -- Almacén: Cortadora de fiambre 300mm
  'MLA3481755636', -- Carnicería: Picadora de carne 2hp
  'MLA3481777808', -- Carnicería: Embutidora vertical 15L
  'MLA3203261992', -- Electrodomésticos: Cafetera Express Liliana
  'MLA3624355068', -- Electrónica: Kit seguridad 8 cámaras
  'MLA3441651244', -- Estética: Camilla articulada hidráulica
  'MLA2826816282', -- Estética: Camilla de masaje portátil
  'MLA3637385756', -- Frío: Heladera exhibidora vertical full glass
  'MLA3481752062', -- Gastronomía: Licuadora industrial 5L
  'MLA2211789840', -- Herramientas: Kit atornillador + amoladora
  'MLA2192968218', -- Muebles: Silla hidráulica Behmont Nexus
  'MLA3481777806', -- Panadería: Sobadora de pie 4hp
  'MLA3481777800', -- Panadería: Amasadora 40kg 4hp
  'MLA3013596100', -- Peluquería y Barbería: Sillón Helix
  'MLA3013468882', -- Peluquería y Barbería: Sillón Quantum
  'MLA3013596866'  -- Peluquería y Barbería: Sillón Volta
);
