-- Migracion 110: agrega el motivo de la visita al turnero (Ventas vs Administracion/Pagos).
--
-- Contexto: la tablet ahora tiene una primera pantalla "VENIS A:" con dos
-- opciones. "VENTAS" sigue el flujo que ya existia (elegir Lucas/Luz/Lito +
-- relacion con el negocio). "ADMINISTRACION/PAGOS" no elige persona ni
-- manda push -- solo muestra un cartel ("anunciate en ventanilla...") y
-- queda registrado, para que el conteo diario de gente que entra al salon
-- (el objetivo original del turnero) incluya tambien estas visitas.

alter table turnero_visits
  add column if not exists visit_type text not null default 'ventas'
    check (visit_type in ('ventas', 'administracion'));

alter table turnero_visits alter column visit_type drop default;

-- attended_by/relation solo tienen sentido para "ventas" -- se relajan a
-- nullable y se fuerza la consistencia con un check.
alter table turnero_visits alter column attended_by drop not null;
alter table turnero_visits alter column relation drop not null;

alter table turnero_visits drop constraint if exists turnero_visits_type_consistency;
alter table turnero_visits add constraint turnero_visits_type_consistency check (
  (visit_type = 'ventas' and attended_by is not null and relation is not null)
  or
  (visit_type = 'administracion' and attended_by is null and relation is null)
);
