-- Busqueda tolerante a errores de tipeo / plurales ("lavacabezas" con S
-- debe encontrar "Lavacabeza de ceramica"). La busqueda actual usa ILIKE
-- '%query%', que exige coincidencia exacta de substring -- una letra de
-- mas o de menos y no encuentra nada.
--
-- Se habilita pg_trgm (extension estandar de Postgres para similitud de
-- texto por trigramas) y se agregan indices GIN para que la busqueda
-- fuzzy sea rapida incluso con miles de productos. Se crea una funcion
-- RPC que la app llama SOLO como respaldo, cuando la busqueda exacta no
-- devuelve resultados -- la busqueda exacta sigue siendo la primera
-- opcion porque es mas precisa.

create extension if not exists pg_trgm;

create index if not exists products_name_trgm_idx on products using gin (name gin_trgm_ops);
create index if not exists products_sku_trgm_idx on products using gin (sku gin_trgm_ops);

create or replace function search_products_fuzzy(
  search_query text,
  similarity_threshold float default 0.2,
  max_results int default 40
)
returns table (id uuid, score float)
language sql
stable
as $$
  select
    p.id,
    greatest(
      similarity(p.name, search_query),
      similarity(coalesce(p.sku, ''), search_query)
    ) as score
  from products p
  where p.active = true
    and (
      similarity(p.name, search_query) > similarity_threshold
      or similarity(coalesce(p.sku, ''), search_query) > similarity_threshold
    )
  order by score desc
  limit max_results;
$$;
