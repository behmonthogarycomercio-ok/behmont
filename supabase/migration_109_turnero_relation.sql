-- Migracion 109: afina el tipo de relacion del cliente en el turnero.
--
-- Contexto: la migracion 108 guardaba solo "de quien es cliente habitual"
-- (regular_of, nullable). El uso real necesita distinguir 4 casos cuando el
-- cliente elige a alguien en la tablet (ej: elige a Lucas):
--   1. Ya es cliente de Lucas (la misma persona que lo va a atender)
--   2. Consulto antes por redes sociales (no es cliente "viejo" todavia)
--   3. Es cliente viejo de BEHMONT pero no de Lucas (de otra persona)
--   4. No es cliente -- primera vez
-- Como la tabla se creo recien y todavia no esta en uso real (tablet sin
-- desplegar en el local), se reemplaza la columna sin migrar datos viejos.

alter table turnero_visits drop column if exists regular_of;

alter table turnero_visits
  add column if not exists relation text not null default 'new'
    check (relation in ('same', 'other', 'social', 'new'));

alter table turnero_visits alter column relation drop default;
