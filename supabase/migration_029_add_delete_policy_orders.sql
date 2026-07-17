-- Faltaba la política de DELETE en whatsapp_orders: existían insert (público),
-- select y update (admin), pero ninguna para delete, así que el botón "Eliminar"
-- del panel no borraba nada (RLS bloqueaba la fila silenciosamente, sin error).
create policy "admin_delete_orders" on whatsapp_orders for delete
  using (auth.uid() is not null);
