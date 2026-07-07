-- Migracion 009: fix del buscador (admin y publico).
--
-- El filtro que se agrego en el commit anterior ("specs::text.ilike...")
-- nunca funciono: PostgREST no permite castear una columna jsonb a texto
-- (::text) dentro de un filtro combinado (or()), asi que CUALQUIER busqueda
-- devolvia 0 resultados, no solo las que dependian de las caracteristicas.
--
-- La solucion es esta columna generada: Postgres mantiene "specs_text"
-- siempre sincronizada como el texto plano de "specs" (no se puede escribir
-- a mano ni desincronizar), y el buscador filtra sobre esa columna de texto
-- normal en vez de castear jsonb en tiempo de consulta.
alter table products
  add column if not exists specs_text text
  generated always as (specs::text) stored;
