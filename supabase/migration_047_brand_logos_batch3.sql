-- Migracion 047: tanda 3 de logos de marca (3 de 142 restantes).
-- Nota: "Daewo" en nuestra base coincide con "Daewoo Electronics" (probable
-- error de tipeo al cargar el nombre) - se uso el logo de Daewoo Electronics
-- por ser la unica coincidencia razonable y por el rubro (electrodomesticos).

update brands set logo_url = '/images/brands/patriot.svg' where name = 'Patriot';
update brands set logo_url = '/images/brands/columbia.svg' where name = 'Columbia';
update brands set logo_url = '/images/brands/daewo.svg' where name = 'Daewo';
