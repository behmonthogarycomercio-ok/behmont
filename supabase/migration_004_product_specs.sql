-- Migración: agrega columna de características estructuradas ("specs") a productos,
-- para poder mostrar beneficios/ficha técnica en la página de producto.
-- Correr una sola vez en el SQL Editor de Supabase.

alter table products add column if not exists specs jsonb not null default '[]'::jsonb;
