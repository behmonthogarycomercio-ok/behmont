-- Migracion 134: las preventas tambien pueden ser de contado (tarjeta o
-- efectivo, pago unico) ademas de en cuotas -- antes cuotas_tipo solo
-- contemplaba financiacion (diaria/semanal/mensual/tarjeta en cuotas).

alter table preventas drop constraint if exists preventas_cuotas_tipo_check;
alter table preventas add constraint preventas_cuotas_tipo_check check (
  cuotas_tipo in ('diaria', 'semanal', 'mensual', 'tarjeta', 'contado_efectivo', 'contado_tarjeta')
);
