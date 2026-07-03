import csv, re, unicodedata, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'Lista.csv')
OUT = os.path.join(ROOT, 'supabase', 'migration_003_split_importados.sql')

def slugify(text):
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def sql_str(s):
    return "'" + s.replace("'", "''") + "'"

# Subcategoria (tal como aparece en el excel) -> (categoria destino, es_nueva)
SUBCAT_MAP = {
    'Peluqueria':     ('peluqueria-barberia', True),
    'Accesorios':     ('peluqueria-barberia', True),
    'Kemei':          ('peluqueria-barberia', True),
    'Estetica':       ('estetica', True),
    'Decoracion':     ('decoracion', True),
    'Almacenamiento': ('almacenamiento', True),
    'Oficina':        ('oficina', True),
    'Herramientas':   ('herramientas', True),
    'Carniceria':     ('carniceria', False),
    'Panaderia':      ('panaderia', False),
    'Refrigeracion':  ('frio', False),
    'Refrigeración':  ('frio', False),
    'Hogar':          ('hogar', False),
}

NEW_CATEGORIES = [
    ('Peluquería y Barbería', 'peluqueria-barberia', 8),
    ('Estética', 'estetica', 9),
    ('Decoración', 'decoracion', 10),
    ('Almacenamiento', 'almacenamiento', 11),
    ('Oficina', 'oficina', 12),
    ('Herramientas', 'herramientas', 13),
]

with open(SRC, encoding='latin-1') as f:
    reader = csv.reader(f, delimiter=';')
    rows = list(reader)[1:]

updates = []
kemei_skus = []

for r in rows:
    if len(r) != 4:
        continue
    sku_raw, name_raw, _, _ = r
    sku = sku_raw.strip().strip('"')
    name = name_raw.strip().strip('"').rstrip('"')
    parts = [p.strip() for p in name.split(' - ')]
    if len(parts) < 3 or parts[1].strip().upper() != 'IMP':
        continue

    subcat = parts[2].strip()
    if subcat not in SUBCAT_MAP:
        continue
    target_slug, _ = SUBCAT_MAP[subcat]

    new_name = ' - '.join(parts[3:]).strip() or ' - '.join(parts[2:]).strip()
    new_slug = slugify(new_name) + '-' + sku.lower()
    new_slug = slugify(new_slug)

    if subcat == 'Kemei':
        kemei_skus.append(sku)

    updates.append((sku, target_slug, new_name, new_slug))

with open(OUT, 'w', encoding='utf-8') as f:
    f.write("-- Migracion: desglosa 'Importados' en sus rubros reales\n")
    f.write("-- (Peluqueria y Barberia, Estetica, Decoracion, Almacenamiento, Oficina, Herramientas)\n")
    f.write("-- y reubica los que en realidad eran Carniceria/Panaderia/Frio/Hogar mal clasificados.\n")
    f.write("-- Correr una sola vez en el SQL Editor de Supabase.\n\n")

    f.write("-- 1) Nuevas categorias\n")
    f.write("insert into categories (name, slug, sort_order) values\n")
    f.write(",\n".join(
        f"  ({sql_str(name)}, {sql_str(slug)}, {order})" for name, slug, order in NEW_CATEGORIES
    ))
    f.write("\non conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;\n\n")

    f.write("-- 2) Marca Kemei (antes se guardaba como 'Behmont' por error)\n")
    f.write("insert into brands (name, sort_order) values ('Kemei', 201)\n")
    f.write("on conflict (name) do nothing;\n\n")

    f.write(f"-- 3) Reasignacion de {len(updates)} productos a su categoria real + limpieza de nombre\n")
    for sku, target_slug, new_name, new_slug in updates:
        f.write(
            f"update products set "
            f"category_id = (select id from categories where slug = {sql_str(target_slug)}), "
            f"name = {sql_str(new_name)}, "
            f"slug = {sql_str(new_slug)} "
            f"where sku = {sql_str(sku)};\n"
        )

    f.write(f"\n-- 4) Marca correcta para los productos Kemei ({len(kemei_skus)} productos)\n")
    if kemei_skus:
        sku_list = ", ".join(sql_str(s) for s in kemei_skus)
        f.write(
            f"update products set brand_id = (select id from brands where name = 'Kemei') "
            f"where sku in ({sku_list});\n"
        )

    f.write("\n-- 5) 'Importados' queda vacia (todo se reubico en categorias reales) -> se desactiva\n")
    f.write("update categories set active = false where slug = 'importados';\n")

print(f"Generadas {len(updates)} actualizaciones -> {OUT}")
print(f"Productos Kemei (marca corregida): {len(kemei_skus)}")
