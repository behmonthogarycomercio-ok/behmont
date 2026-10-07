-- Migracion 112: pasos intermedios del estado de un envio.
--
-- Contexto: el repartidor no solo marca "entregado" -- primero tiene que
-- buscar el producto en el deposito y retirarlo, despues queda en camino,
-- y recien ahi lo entrega. Se agregan esos dos pasos intermedios al status
-- y sus columnas de auditoria (quien lo retiro y cuando).

alter table ml_shipments drop constraint if exists ml_shipments_status_check;
alter table ml_shipments add constraint ml_shipments_status_check
  check (status in ('pendiente', 'retirado', 'en_camino', 'entregado', 'cancelado'));

alter table ml_shipments add column if not exists retirado_at timestamptz;
alter table ml_shipments add column if not exists retirado_by text;
alter table ml_shipments add column if not exists en_camino_at timestamptz;

-- Estado de pago -- las ventas de MercadoLibre siempre llegan ya pagadas
-- (el pendiente se crea recien cuando ML confirma el pago), pero las
-- cargadas a mano (vendedor o admin, venta por fuera de ML) pueden ser
-- contra entrega. El repartidor necesita saber si tiene que cobrar.
alter table ml_shipments add column if not exists payment_status text not null default 'abonado'
  check (payment_status in ('abonado', 'pendiente_pago'));

