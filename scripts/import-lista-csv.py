import csv, re, unicodedata, json, sys, os

# Uso: python3 scripts/import-lista-csv.py [ruta-al-csv]
# Genera supabase/seed_categories.sql, seed_brands.sql y seed_products.sql
# a partir de la lista de precios del distribuidor (formato: Articulo;Nombre;Cantidad;Nt.Minorista)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'Lista.csv')
OUT_DIR = os.path.join(ROOT, 'supabase')

def slugify(text):
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def parse_ar_number(raw):
    raw = raw.strip().strip('"')
    if not raw:
        return 0.0
    raw = raw.replace('.', '').replace(',', '.')
    try:
        return float(raw)
    except ValueError:
        return 0.0

def sql_str(s):
    if s is None:
        return 'NULL'
    return "'" + s.replace("'", "''") + "'"

with open(SRC, encoding='latin-1') as f:
    reader = csv.reader(f, delimiter=';')
    rows = list(reader)[1:]

# Reference-site categories (same order as myacomercial.com) + Importados
CATEGORIES = [
    ('Gastronomía', 'gastronomia'),
    ('Almacén', 'almacen'),
    ('Carnicería', 'carniceria'),
    ('Panadería', 'panaderia'),
    ('Frío', 'frio'),
    ('Hogar', 'hogar'),
    ('Importados', 'importados'),
    ('Peluquería y Barbería', 'peluqueria-barberia'),
    ('Estética', 'estetica'),
    ('Decoración', 'decoracion'),
    ('Almacenamiento', 'almacenamiento'),
    ('Oficina', 'oficina'),
    ('Herramientas', 'herramientas'),
]

products = []
brands_seen = {}
skus_seen = set()

for r in rows:
    if len(r) != 4:
        continue
    sku_raw, name_raw, stock_raw, price_raw = r
    sku = sku_raw.strip().strip('"')
    name = name_raw.strip().strip('"').rstrip('"')
    if not sku or not name:
        continue

    stock = int(round(parse_ar_number(stock_raw)))
    price = parse_ar_number(price_raw)

    parts = [p.strip() for p in name.split(' - ')]
    brand = parts[0] if parts else None
    is_imported = len(parts) > 1 and parts[1].strip().upper() == 'IMP'

    # Display name: strip "Brand" (and "IMP" marker) prefix, keep the rest as the product title
    if is_imported and len(parts) > 2:
        display_name = ' - '.join(parts[2:])
    elif len(parts) > 1:
        display_name = ' - '.join(parts[1:])
    else:
        display_name = name

    display_name = display_name.strip()
    if not display_name:
        display_name = name

    category_slug = 'importados' if is_imported else None

    if brand:
        brands_seen[brand] = brands_seen.get(brand, 0) + 1

    # dedupe SKUs (a few duplicates exist in distributor lists)
    base_sku = sku
    suffix = 1
    while sku in skus_seen:
        suffix += 1
        sku = f"{base_sku}-{suffix}"
    skus_seen.add(sku)

    products.append({
        'sku': sku,
        'name': display_name,
        'brand': brand,
        'price': price,
        'stock': stock,
        'category_slug': category_slug,
    })

print(f"Total productos parseados: {len(products)}")
print(f"Marcas unicas: {len(brands_seen)}")
imp_count = sum(1 for p in products if p['category_slug'] == 'importados')
print(f"Productos categoria Importados: {imp_count}")

# ── Write seed_categories.sql ──
with open(os.path.join(OUT_DIR, 'seed_categories.sql'), 'w', encoding='utf-8') as f:
    f.write("-- Categorías: mismas que la web de referencia + Importados (línea BEHMONT - IMP)\n")
    f.write("insert into categories (name, slug, sort_order) values\n")
    lines = []
    for i, (name, slug) in enumerate(CATEGORIES, start=1):
        lines.append(f"  ({sql_str(name)}, {sql_str(slug)}, {i})")
    f.write(",\n".join(lines))
    f.write("\non conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;\n")

# ── Write seed_brands.sql ──
sorted_brands = sorted(brands_seen.keys(), key=lambda b: b.lower())
with open(os.path.join(OUT_DIR, 'seed_brands.sql'), 'w', encoding='utf-8') as f:
    f.write(f"-- {len(sorted_brands)} marcas extraidas de Lista.csv\n")
    f.write("insert into brands (name, sort_order) values\n")
    lines = []
    for i, b in enumerate(sorted_brands, start=1):
        lines.append(f"  ({sql_str(b)}, {i})")
    f.write(",\n".join(lines))
    f.write("\non conflict (name) do nothing;\n")

# ── Write seed_products.sql ──
with open(os.path.join(OUT_DIR, 'seed_products.sql'), 'w', encoding='utf-8') as f:
    f.write(f"-- {len(products)} productos importados de Lista.csv\n")
    f.write("-- Los productos de la linea 'Behmont - IMP' quedan en la categoria Importados.\n")
    f.write("-- El resto queda SIN categoria asignada (category_id NULL) para clasificar manualmente\n")
    f.write("-- desde /admin/productos, ya que el excel no trae esa informacion.\n\n")
    f.write("insert into products (sku, name, slug, brand_id, category_id, price, stock, active) values\n")
    lines = []
    used_slugs = {}
    for p in products:
        base_slug = slugify(p['name']) or slugify(p['sku'])
        slug = f"{base_slug}-{p['sku'].lower()}"
        slug = slugify(slug)
        brand_sub = f"(select id from brands where name = {sql_str(p['brand'])})" if p['brand'] else 'NULL'
        cat_sub = f"(select id from categories where slug = {sql_str(p['category_slug'])})" if p['category_slug'] else 'NULL'
        lines.append(
            f"  ({sql_str(p['sku'])}, {sql_str(p['name'])}, {sql_str(slug)}, {brand_sub}, {cat_sub}, "
            f"{p['price']}, {p['stock']}, true)"
        )
    f.write(",\n".join(lines))
    f.write(
        "\non conflict (sku) do update set "
        "name = excluded.name, price = excluded.price, stock = excluded.stock, "
        "brand_id = excluded.brand_id, category_id = excluded.category_id;\n"
    )

print("Archivos generados.")
