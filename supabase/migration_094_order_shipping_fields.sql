-- Agrega los campos obligatorios del paso 2 (Datos) del nuevo carrito en 3
-- pasos: ciudad, codigo postal y metodo de envio (sucursal / domicilio /
-- retiro en local). La direccion (customer_address) ya existia pero ahora
-- pasa a ser obligatoria a nivel de formulario/API, no de constraint de
-- base (se deja nullable por si quedan pedidos viejos sin este dato).

alter table whatsapp_orders
  add column if not exists customer_city text,
  add column if not exists customer_postal_code text,
  add column if not exists shipping_method text
    check (shipping_method is null or shipping_method in ('sucursal', 'domicilio', 'retiro'));
