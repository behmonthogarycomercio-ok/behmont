-- Migracion 136: separa las características que se ven en la etiqueta
-- impresa de las características reales del producto en la web pública.
-- Antes "Editar características" en /admin/etiquetas escribía directo en
-- products.specs -- la misma columna de la ficha pública -- así que sacar
-- una fila para que la etiqueta entrara mejor borraba esa característica
-- del sitio también. etiqueta_specs es independiente: si está vacía, la
-- etiqueta muestra las specs reales (comportamiento actual sin cambios);
-- si el admin la edita desde Etiquetas, solo se toca esta columna.
alter table products add column if not exists etiqueta_specs jsonb;
