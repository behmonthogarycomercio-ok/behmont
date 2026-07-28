alter table whatsapp_orders
  add column if not exists financing_documents jsonb;
