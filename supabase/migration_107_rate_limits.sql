-- Migracion 107: tabla de rate limiting para endpoints publicos.
--
-- Contexto: revisando seguridad se encontro que ninguna ruta publica
-- (/api/upload/financing-doc, /api/newsletter/subscribe, /api/whatsapp/order,
-- /api/whatsapp/mayorista, /api/mp/create-preference) tenia limite de
-- intentos. Esto es particularmente riesgoso para financing-doc: sube
-- archivos de hasta 10MB al bucket "financing-documents" sin login (a
-- proposito, un cliente en checkout todavia no tiene cuenta), y Supabase
-- Storage esta en plan gratuito con 1GB total -- un script simple podria
-- llenarlo en minutos.
--
-- Implementacion simple por tabla (sin depender de Redis/Upstash ni ningun
-- servicio pago nuevo): una fila por (key, ventana de tiempo), con upsert
-- atomico que incrementa el contador. Se limpia sola con created_at + una
-- limpieza periodica no es necesaria porque las filas son minimas (texto +
-- 2 timestamps + int).

create table if not exists rate_limits (
  key text not null,
  window_start timestamptz not null,
  count int not null default 1,
  primary key (key, window_start)
);

alter table rate_limits enable row level security;

-- Solo la service role (usada desde las API routes) necesita tocar esta
-- tabla -- ningun cliente debe leerla ni escribirla directamente.
