-- Migración: agrega dirección del cliente a los pedidos (para el CRM de métricas)
-- Correr una sola vez en el SQL Editor de Supabase.

alter table whatsapp_orders add column if not exists customer_address text;
