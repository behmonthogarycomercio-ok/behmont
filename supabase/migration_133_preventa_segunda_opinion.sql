-- Migracion 133: el cobrador, tras controlar el local y subir la foto,
-- ademas de aprobar/rechazar puede pedir una segunda opinion a Alejandro
-- (supervisor de cobradores) cuando algo del cliente le genera dudas.
-- Alejandro ve la misma foto + el motivo que dejo el cobrador, y da el
-- veredicto final (aprobar -> genera el envio real, igual que si lo
-- hubiera aprobado el cobrador directamente; o rechazar).

alter table preventas drop constraint if exists preventas_status_check;
alter table preventas add constraint preventas_status_check check (
  status in (
    'pendiente_documentacion',
    'rechazada_gabriel',
    'pendiente_cobrador',
    'pendiente_supervisor',
    'aprobada',
    'rechazada_cobrador',
    'rechazada_supervisor'
  )
);

alter table preventas add column if not exists cobrador_segunda_opinion_motivo text;
alter table preventas add column if not exists supervisor_motivo_rechazo text;
