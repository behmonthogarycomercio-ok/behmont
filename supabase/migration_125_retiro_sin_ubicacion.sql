-- La mayoria del catalogo todavia no tiene ubicacion cargada (Gabriel la va
-- armando de a poco), asi que exigir una fila en product_locations para
-- poder retirar bloqueaba el uso real de la terminal. Esta funcion descuenta
-- products.stock directo, sin pasar por una zona especifica -- mismo patron
-- que registrar_retiro pero sin el join a product_locations.
create or replace function registrar_retiro_sin_ubicacion(
  p_product_id uuid, p_quantity int,
  p_staff_pin int, p_staff_name text, p_note text default null
) returns table(new_stock int)
language plpgsql security definer set search_path = public as $$
declare v_new_stock int;
begin
  if p_quantity <= 0 then raise exception 'La cantidad debe ser mayor a 0'; end if;
  update products set stock = stock - p_quantity
   where id = p_product_id and stock >= p_quantity
  returning stock into v_new_stock;
  if v_new_stock is null then raise exception 'No hay suficiente stock'; end if;
  insert into stock_movements (product_id, zona_id, tipo, quantity, staff_pin, staff_name, note)
  values (p_product_id, null, 'retiro', p_quantity, p_staff_pin, p_staff_name, p_note);
  return query select v_new_stock;
end;
$$;
