-- Migracion 049: tanda 26 de specs/descripcion investigados (skill
-- product-specs-research). Parlantes y auriculares Panter/Blackpoint/
-- Noblex/Kioto, combo gaming Xtrike Me, home theater Noblex, tablet Pcbox,
-- muebles Ricchezze, de la categoria "Electronica". 13 confirmados de 16
-- candidatos investigados.
--
-- Excluidos de esta tanda (3, reportados aparte, no tocados por este SQL):
-- W-653 (Panter: no se encontro ese modelo especifico, solo un M-654
-- distinto) - MDR-ZX1100 (Sony: todas las fuentes oficiales hablan del
-- modelo "MDR-ZX110", no existe un "ZX1100" documentado, posible error de
-- tipeo en el SKU sin poder confirmarlo) - LD50USD (Philco: existen varios
-- modelos de 50" 4K con caracteristicas distintas -Android TV, Google TV,
-- HDR-, sin poder confirmar a cual corresponde exactamente ese codigo).

-- GS101: Parlante PC Panter (fuente: Lombardo Hogar, Casa Martinez Audio, MercadoLibre)
update products set
  description = 'Sistema de parlantes 2.1 para PC, con subwoofer central y dos satelites para reproducir musica, peliculas o juegos en la computadora. Se alimenta por USB y se conecta por entrada auxiliar de 3.5mm.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"GS101"},{"label":"Dimensiones","value":"Subwoofer 9 x 10.3 x 10 cm"},{"label":"Potencia","value":"18 W RMS"},{"label":"Función","value":"Sistema 2.1, woofer central 3\" (8W), 2 satélites 2\" (5W c/u), alimentación USB, entrada AUX 3.5mm"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'GS101';

-- CMX-410: Combo gaming Xtrike Me (fuente: Gameplanet, KPC Hardware, Nanotech Market)
update products set
  description = 'Combo gaming 4 en 1 con teclado, mouse, auriculares y mousepad, todo con iluminacion RGB. Pensado para armar un setup gamer completo con un solo producto, con conexion USB plug and play.',
  specs = '[{"label":"Marca","value":"Xtrike Me"},{"label":"Modelo","value":"CMX-410"},{"label":"Función","value":"Teclado 114 teclas membrana retroiluminado RGB, mouse óptico 1200-7200 DPI 7 botones, auriculares con micrófono 50mm, mousepad, interfaz USB"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'CMX-410';

-- HT2150: Home Theater Noblex (fuente: MercadoLibre, Pardo, Fravega, Caracol Digital)
update products set
  description = 'Sistema de home theater 5.1 con reproductor de DVD integrado, pensado para armar un cine en casa. Cuenta con salida HDMI para television de alta definicion, radio AM/FM y control parental.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"HT2150"},{"label":"Dimensiones","value":"36 x 22.5 x 5.5 cm"},{"label":"Peso","value":"6.2 kg"},{"label":"Potencia","value":"105 W RMS"},{"label":"Función","value":"Reproductor DVD/CD/MP3/MP4, sistema 5.1 (subwoofer 30W + 5 satélites 15W c/u), Dolby Digital, salida HDMI, entrada USB, radio AM/FM, control parental, control remoto"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HT2150';

-- SA-12L: Parlante Kioto (fuente: ICBC Mall, La Prida Hogar, Fravega, Ferromar)
update products set
  description = 'Parlante potenciado de 12 pulgadas con bateria incorporada, pensado para reuniones y uso en el hogar. Incluye microfono y control remoto, con pantalla LCD y ecualizador para ajustar el sonido.',
  specs = '[{"label":"Marca","value":"Kioto"},{"label":"Modelo","value":"SA-12LX"},{"label":"Dimensiones","value":"53 x 36 x 32 cm"},{"label":"Peso","value":"5 kg"},{"label":"Potencia","value":"20 W RMS"},{"label":"Función","value":"Parlante 12\", Bluetooth, USB, SD, radio FM, MP3, pantalla LCD, ecualizador, entrada micrófono/guitarra"},{"label":"Incluye","value":"Control remoto, micrófono"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'SA-12L';

-- IHS02: Auricular Panter (fuente: MercadoLibre, Audio Trends, BSG America, Panter oficial)
update products set
  description = 'Auricular inalambrico plegable con manos libres para atender llamadas, pensado para el uso diario. Se conecta por Bluetooth, entrada auxiliar de 3.5mm o tarjeta mini SD, con carga por micro USB.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"IHS02-W"},{"label":"Función","value":"Bluetooth 4.2 Gold Edition, parlante 40mm, potencia máxima 40mW, entrada AUX 3.5mm, mini SD, manos libres, plegable, alcance 8m"},{"label":"Batería","value":"Hasta 10 horas de reproducción a volumen medio"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'IHS02';

-- H60: Auricular Blackpoint (fuente: Fravega, Pixel Store, Previsora del Paraná)
update products set
  description = 'Auricular inalambrico in ear con microfono incorporado, pensado para el uso diario y llamadas. Cuenta con bateria recargable y controles integrados para manejar la musica sin usar el celular.',
  specs = '[{"label":"Marca","value":"Blackpoint"},{"label":"Modelo","value":"H60"},{"label":"Función","value":"Bluetooth, micrófono incorporado, formato in ear, controles integrados"},{"label":"Batería","value":"Recargable, ~3 horas de uso"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'H60';

-- HP350BT: Auricular Noblex bincha Bluetooth (fuente: Megatone, Fravega, Jumbo, Somos Rex)
update products set
  description = 'Auricular tipo vincha inalambrico, liviano y resistente, pensado para el uso diario con buena autonomia de bateria. Cuenta con mandos rapidos incorporados y microfono para manos libres.',
  specs = '[{"label":"Marca","value":"Noblex"},{"label":"Modelo","value":"HP350BT"},{"label":"Función","value":"Bluetooth 5.0, protocolos HSP/HFP/A2DP/AVRCP, driver 40mm, sensibilidad 105dB, frecuencia 20Hz-20KHz, micrófono manos libres, carga USB-C"},{"label":"Batería","value":"300 mAh, hasta 24 horas de duración (carga en 2h)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HP350BT';

-- 40464: Tablet Pcbox 7 Quadcore (fuente: Disco, Cetrogar)
update products set
  description = 'Tablet de 7 pulgadas pensada para uso basico diario, con doble camara frontal y trasera. Cuenta con conectividad WiFi, Bluetooth y lector de tarjetas para expandir el almacenamiento.',
  specs = '[{"label":"Marca","value":"Pcbox"},{"label":"Modelo","value":"PCB-T715M"},{"label":"Dimensiones","value":"191 x 112 x 10.3 mm"},{"label":"Memoria RAM","value":"1 GB"},{"label":"Almacenamiento","value":"8 GB"},{"label":"Pantalla","value":"7\" (1024x600)"},{"label":"Función","value":"Android 5.1, procesador Rockchip RK3126 Quad Core, WiFi, Bluetooth, giroscopio, cámara frontal VGA, cámara trasera 2MP"},{"label":"Batería","value":"2400 mAh"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '40464';

-- 33732524: Centro TV Ricchezze Venezia 2 (fuente: Selex Hogar, Blancoamor, Fábricas Unidas)
update products set
  description = 'Centro de TV de la linea Venezia con espacio de guardado y cristalero, pensado para organizar el living con estilo. Su terminacion en teca y roble natural aporta calidez al ambiente.',
  specs = '[{"label":"Marca","value":"Ricchezze"},{"label":"Modelo","value":"Venezia Centro TV 2"},{"label":"Color","value":"Teca / Roble Natural"},{"label":"Dimensiones","value":"182 x 180 x 45 cm (ancho x alto x profundidad)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '33732524';

-- PBB01: Parlante Panter (fuente: Tauro Electrónica, Pixel Store, Coppel, Panter oficial)
update products set
  description = 'Parlante portatil de gran potencia y sonido nitido, con funcion manos libres para atender llamadas. Se conecta por Bluetooth, USB, tarjeta mini SD o entrada auxiliar de 3.5mm.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"PBB01"},{"label":"Dimensiones","value":"32 x 17 x 10 cm"},{"label":"Potencia","value":"30 W RMS (100 W máx.)"},{"label":"Función","value":"Bluetooth, USB, mini SD, AUX 3.5mm, manos libres con micrófono integrado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'PBB01';

-- S47: Torre parlante Blackpoint (fuente: ICBC Mall, Fravega, Casa Marcelo, Tecnocompro)
update products set
  description = 'Torre de sonido con doble subwoofer de 12 pulgadas, pensada para fiestas y eventos. Cuenta con tecnologia TWS para emparejar con otro equipo igual, luces LED y entrada para microfono.',
  specs = '[{"label":"Marca","value":"Blackpoint"},{"label":"Modelo","value":"S47"},{"label":"Dimensiones","value":"43 x 39 x 89 cm"},{"label":"Peso","value":"9 kg"},{"label":"Función","value":"2 subwoofers de 12\", Bluetooth con TWS, USB, entrada TF, radio, entrada micrófono, luces LED"},{"label":"Batería","value":"Recargable"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'S47';

-- 33732451: Centro TV Ricchezze Venezia Teca/Malaga (fuente: Selex Hogar, Mobilar, Fábricas Unidas)
update products set
  description = 'Centro de TV de la linea Venezia, pensado para organizar el equipo de audio y video del living con espacio de guardado en sus puertas. Su terminacion en teca y malaga aporta un estilo moderno al ambiente.',
  specs = '[{"label":"Marca","value":"Ricchezze"},{"label":"Modelo","value":"Venezia Centro TV 4"},{"label":"Color","value":"Teca / Malaga"},{"label":"Material","value":"Melamina"},{"label":"Dimensiones","value":"183 x 156 x 44 cm (ancho x alto x profundidad)"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = '33732451';

-- HBB02: Parlante Panter (fuente: MercadoLibre, Grupo Grosso, Natalia Hogar, Panter oficial)
update products set
  description = 'Parlante portatil compacto con funcion manos libres, pensado para el uso diario y para llevar a cualquier lugar. Se conecta por Bluetooth, entrada auxiliar, micro USB o tarjeta mini SD.',
  specs = '[{"label":"Marca","value":"Panter"},{"label":"Modelo","value":"HBB02"},{"label":"Dimensiones","value":"8.5 x 8.5 x 40 cm"},{"label":"Potencia","value":"20 W RMS (70 W máx.)"},{"label":"Función","value":"Bluetooth, micro USB, mini SD, AUX 3.5mm, manos libres con micrófono integrado"},{"label":"Condición del ítem","value":"Nuevo"}]'::jsonb
where sku = 'HBB02';
