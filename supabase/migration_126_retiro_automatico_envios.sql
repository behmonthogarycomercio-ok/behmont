-- Conecta el paso "retirado de deposito" de /envios con el descuento real
-- de stock -- hasta ahora eran dos sistemas sin relacion: marcar un envio
-- como retirado no tocaba products.stock para nada. staff_pin se vuelve
-- nullable porque quien marca el envio es el repartidor (identificado por
-- nombre libre en /envios, no por el PIN+codigo de la terminal /deposito).
alter table stock_movements alter column staff_pin drop not null;

-- Igual que registrar_retiro_sin_ubicacion pero sin requerir un staff_pin de
-- la terminal: si el producto tiene ubicacion con stock suficiente, descuenta
-- de ahi (queda la auditoria con zona); si no, descuenta products.stock
-- directo. No reparte un retiro entre varias ubicaciones -- si ninguna sola
-- alcanza, cae al descuento directo del stock general como ultimo recurso.
create or replace function registrar_retiro_automatico(
  p_product_id uuid, p_quantity int, p_staff_name text, p_note text default null
) returns table(new_stock int)
language plpgsql security definer set search_path = public as $$
declare
  v_location_id uuid;
  v_zona_id uuid;
  v_new_stock int;
begin
  if p_quantity <= 0 then raise exception 'La cantidad debe ser mayor a 0'; end if;

  select id, zona_id into v_location_id, v_zona_id
  from product_locations
  where product_id = p_product_id and quantity >= p_quantity
  order by quantity desc
  limit 1
  for update;

  if v_location_id is not null then
    update product_locations set quantity = quantity - p_quantity where id = v_location_id;
    insert into stock_movements (product_id, zona_id, tipo, quantity, staff_pin, staff_name, note)
    values (p_product_id, v_zona_id, 'retiro', p_quantity, null, p_staff_name, p_note);
  else
    update products set stock = stock - p_quantity
     where id = p_product_id and stock >= p_quantity
    returning stock into v_new_stock;
    if v_new_stock is null then
      raise exception 'No hay suficiente stock para descontar automaticamente';
    end if;
    insert into stock_movements (product_id, zona_id, tipo, quantity, staff_pin, staff_name, note)
    values (p_product_id, null, 'retiro', p_quantity, null, p_staff_name, p_note);
  end if;

  return query select p.stock from products p where p.id = p_product_id;
end;
$$;
