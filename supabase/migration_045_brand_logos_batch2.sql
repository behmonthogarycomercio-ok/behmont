-- Migracion 045: tanda 2 de logos de marca faltantes (2 de 146 restantes).
-- El resto de las marcas de la tanda anterior no tenian una fuente confiable
-- de logo oficial (son marcas locales/importadas sin presencia en Wikimedia
-- Commons ni sitio con logo descargable verificable) - quedan con el
-- fallback de texto que ya existe en BrandStrip hasta encontrar una fuente
-- confiable.

update brands set logo_url = '/images/brands/sony.svg' where name = 'Sony';
update brands set logo_url = '/images/brands/siam.png' where name = 'Siam';
