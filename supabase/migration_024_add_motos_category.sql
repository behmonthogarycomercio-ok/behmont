-- Migracion 024: agrega la categoria "Motos" (todavia sin productos cargados,
-- el dueño la va a completar despues). Slug y sort_order siguen el mismo
-- patron que el resto de las categorias existentes.

insert into categories (name, slug, active, sort_order)
values ('Motos', 'motos', true, 19)
on conflict (slug) do nothing;
