alter table whatsapp_orders
  add column if not exists andreani_tracking_number text,
  add column if not exists andreani_numero_interno text,
  add column if not exists andreani_contract_id text,
  add column if not exists andreani_delivery_mode text,
  add column if not exists andreani_created_at timestamptz,
  add column if not exists andreani_last_error text;
