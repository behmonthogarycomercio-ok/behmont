-- Revierte migration_100: se descarto la integracion de envios de Andreani.
alter table whatsapp_orders
  drop column if exists andreani_tracking_number,
  drop column if exists andreani_numero_interno,
  drop column if exists andreani_contract_id,
  drop column if exists andreani_delivery_mode,
  drop column if exists andreani_created_at,
  drop column if exists andreani_last_error;
