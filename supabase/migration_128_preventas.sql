-- Migracion 128: preventas cargadas por un vendedor, con documentacion
-- fisica confirmada por Gabriel (gerente, admin real) antes de habilitar
-- al cobrador asignado, que controla el local y aprueba/rechaza subiendo
-- una foto del papel. Al aprobar, genera un envio real en ml_shipments
-- (pasa a reparto). Snapshotea nombres de vendedor/cobrador (igual patron
-- que stock_movements.staff_name en migration_120) para que el historial
-- no se rompa si el dia de mañana se reasigna un PIN a otra persona.

create table if not exists preventas (
  id uuid primary key default uuid_generate_v4(),

  vendedor_pin int not null check (vendedor_pin in (0, 3, 4, 5)), -- Gabriel/Lucas/Luz/Lito (roster de deposito_staff_secrets)
  vendedor_nombre text not null,

  cliente_nombre text not null,
  cliente_direccion text not null,
  cliente_contacto text,
  cliente_dni_cuit text not null,
  cliente_ciudad text not null,
  cliente_codigo_postal text,
  cliente_rubro text,
  cliente_estado text not null check (cliente_estado in ('activo', 'nuevo', 'pasivo')),

  items jsonb not null default '[]', -- [{ sku, name, quantity, precioLista, precioOfrecido }]

  cuotas_cantidad int not null check (cuotas_cantidad > 0),
  cuotas_tipo text not null check (cuotas_tipo in ('diaria', 'semanal', 'mensual', 'tarjeta')),
  cuota_precio numeric(12,2) not null,
  interes_porcentaje numeric(6,2),

  observaciones text,

  cobrador_pin int not null check (cobrador_pin between 0 and 9),
  cobrador_nombre text not null,

  -- pendiente_documentacion: recien cargada, esperando que Gabriel confirme los papeles.
  -- rechazada_gabriel: Gabriel la rechazo por documentacion -- termina aca.
  -- pendiente_cobrador: Gabriel dio OK, el cobrador tiene 48hs.
  -- aprobada: el cobrador aprobo -- genero un envio real (ml_shipment_id).
  -- rechazada_cobrador: el cobrador rechazo tras controlar el local.
  status text not null default 'pendiente_documentacion' check (
    status in ('pendiente_documentacion', 'rechazada_gabriel', 'pendiente_cobrador', 'aprobada', 'rechazada_cobrador')
  ),

  gabriel_revisado_at timestamptz, -- la fecha que cuenta para las 48hs del cobrador
  gabriel_motivo_rechazo text,

  cobrador_foto_url text,      -- foto del papel, obligatoria para aprobar o rechazar
  cobrador_notas text,
  cobrador_motivo_rechazo text,
  reviewed_at timestamptz,

  recordatorio_24h_at timestamptz,
  recordatorio_48h_at timestamptz,

  ml_shipment_id uuid references ml_shipments(id) on delete set null,

  created_at timestamptz not null default now()
);

create index if not exists idx_preventas_vendedor on preventas(vendedor_pin, created_at desc);
create index if not exists idx_preventas_cobrador on preventas(cobrador_pin, status, created_at desc);
create index if not exists idx_preventas_status on preventas(status);

alter table preventas enable row level security;
drop policy if exists "admin_all_preventas" on preventas;
create policy "admin_all_preventas" on preventas for all
  using (is_admin()) with check (is_admin());
-- Sin politica publica: crear/listar/revisar pasa por /api/ventas/* con
-- service role, que valida PIN+codigo antes de tocar la tabla.
