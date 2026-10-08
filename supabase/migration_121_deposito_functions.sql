-- Migracion 121: funciones atomicas para retiro/ingreso desde la terminal,
-- invocadas via supabase.rpc() desde las API routes (service role). Evitan
-- la carrera de "leer cantidad, restar en JS, escribir" si dos personas
-- retiran de la misma ubicacion al mismo tiempo.

create or replace function registrar_retiro(
  p_product_id uuid,
  p_zona_id uuid,
  p_quantity int,
  p_staff_pin int,
  p_staff_name text,
  p_note text default null
) returns table(new_quantity int, new_stock int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_location_id uuid;
  v_new_qty int;
begin
  if p_quantity <= 0 then
    raise exception 'La cantidad debe ser mayor a 0';
  end if;

  select id into v_location_id from product_locations
   where product_id = p_product_id and zona_id = p_zona_id
   for update;

  if v_location_id is null then
    raise exception 'El producto no tiene stock registrado en esa ubicación';
  end if;

  update product_locations
     set quantity = quantity - p_quantity
   where id = v_location_id and quantity >= p_quantity
  returning quantity into v_new_qty;

  if v_new_qty is null then
    raise exception 'No hay suficiente stock en esa ubicación';
  end if;

  insert into stock_movements (product_id, zona_id, tipo, quantity, staff_pin, staff_name, note)
  values (p_product_id, p_zona_id, 'retiro', p_quantity, p_staff_pin, p_staff_name, p_note);

  return query select v_new_qty, p.stock from products p where p.id = p_product_id;
end;
$$;

create or replace function registrar_ingreso(
  p_product_id uuid,
  p_zona_id uuid,
  p_quantity int,
  p_staff_pin int,
  p_staff_name text,
  p_note text default null
) returns table(new_quantity int, new_stock int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_new_qty int;
begin
  if p_quantity <= 0 then
    raise exception 'La cantidad debe ser mayor a 0';
  end if;

  insert into product_locations (product_id, zona_id, quantity)
  values (p_product_id, p_zona_id, p_quantity)
  on conflict (product_id, zona_id)
  do update set quantity = product_locations.quantity + excluded.quantity
  returning quantity into v_new_qty;

  insert into stock_movements (product_id, zona_id, tipo, quantity, staff_pin, staff_name, note)
  values (p_product_id, p_zona_id, 'ingreso', p_quantity, p_staff_pin, p_staff_name, p_note);

  return query select v_new_qty, p.stock from products p where p.id = p_product_id;
end;
$$;
