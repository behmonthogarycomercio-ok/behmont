-- Migracion 044: tanda 1 de logos de marca faltantes (33 de 179 sin logo).
-- Logos oficiales descargados de Wikimedia Commons (dominio publico / licencia libre),
-- guardados en public/images/brands/. Solo marcas internacionales/reconocibles con
-- logo oficial confirmado; el resto (marcas locales/genericas) se investiga en
-- proximas tandas o quedan con el fallback de texto que ya existe en BrandStrip.

update brands set logo_url = '/images/brands/acer.svg' where name = 'Acer';
update brands set logo_url = '/images/brands/alcatel.svg' where name = 'Alcatel';
update brands set logo_url = '/images/brands/braun.svg' where name = 'Braun';
update brands set logo_url = '/images/brands/candy.svg' where name = 'Candy';
update brands set logo_url = '/images/brands/casio.svg' where name = 'Casio';
update brands set logo_url = '/images/brands/direc-tv.svg' where name = 'Direc TV';
update brands set logo_url = '/images/brands/drean.png' where name = 'Drean';
update brands set logo_url = '/images/brands/electrolux.svg' where name = 'Electrolux';
update brands set logo_url = '/images/brands/garmin.svg' where name = 'Garmin';
update brands set logo_url = '/images/brands/hikvision.svg' where name = 'Hikvision';
update brands set logo_url = '/images/brands/hisense.svg' where name = 'Hisense';
update brands set logo_url = '/images/brands/hitachi.svg' where name = 'Hitachi';
update brands set logo_url = '/images/brands/jbl.svg' where name = 'JBL';
update brands set logo_url = '/images/brands/kodak.svg' where name = 'Kodak';
update brands set logo_url = '/images/brands/lenovo.svg' where name = 'Lenovo';
update brands set logo_url = '/images/brands/lg.svg' where name = 'LG';
update brands set logo_url = '/images/brands/midea.svg' where name = 'Midea';
update brands set logo_url = '/images/brands/mondial.svg' where name = 'Mondial';
update brands set logo_url = '/images/brands/monster.svg' where name = 'Monster';
update brands set logo_url = '/images/brands/nokia.svg' where name = 'Nokia';
update brands set logo_url = '/images/brands/panasonic.svg' where name = 'Panasonic';
update brands set logo_url = '/images/brands/pioneer.svg' where name = 'Pioneer';
update brands set logo_url = '/images/brands/rca.svg' where name = 'RCA';
update brands set logo_url = '/images/brands/remington.svg' where name = 'Remington';
update brands set logo_url = '/images/brands/revlon.svg' where name = 'Revlon';
update brands set logo_url = '/images/brands/sanyo.svg' where name = 'Sanyo';
update brands set logo_url = '/images/brands/singer.png' where name = 'Singer';
update brands set logo_url = '/images/brands/tcl.svg' where name = 'TCL';
update brands set logo_url = '/images/brands/telefunken.svg' where name = 'Telefunken';
update brands set logo_url = '/images/brands/tramontina.svg' where name = 'Tramontina';
update brands set logo_url = '/images/brands/uniden.svg' where name = 'Uniden';
update brands set logo_url = '/images/brands/whirlpool.svg' where name = 'Whirlpool';
update brands set logo_url = '/images/brands/xiaomi.svg' where name = 'Xiaomi';
