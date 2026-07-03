-- Categorías: mismas que la web de referencia + Importados (línea BEHMONT - IMP)
insert into categories (name, slug, sort_order) values
  ('Gastronomía', 'gastronomia', 1),
  ('Almacén', 'almacen', 2),
  ('Carnicería', 'carniceria', 3),
  ('Panadería', 'panaderia', 4),
  ('Frío', 'frio', 5),
  ('Hogar', 'hogar', 6),
  ('Importados', 'importados', 7)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;
