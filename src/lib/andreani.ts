const API_BASE = 'https://woocommerce-api-acom.andreani.com';
const CP_ORIGEN = '3200';

type LoginResponse = {
  accessToken: string;
  usuarioId: string;
  clienteId: string;
  name: string;
  email: string;
  phoneNumber: string;
  cl: string;
  clientType: string;
  contratos: { id: string; modoDeEntregaNombre: string }[];
};

export type AndreaniDeliveryMode = 'llega hoy' | 'estándar' | 'sucursal' | 'bigger';

export type AndreaniPaquete = {
  pesoKg: number;
  anchoCm: number;
  altoCm: number;
  profundidadCm: number;
};

export type AndreaniDestinatario = {
  nombre: string;
  apellido: string;
  telefono: string;
  dni?: string;
  email?: string;
};

export type AndreaniDestino = {
  calle: string;
  numero: string;
  piso?: string;
  codigoPostal: string;
  localidad: string;
  codigoSucursal?: string;
};

// Cachea la sesion en memoria del proceso -- Andreani rate-limitea el login,
// asi que evitamos re-loguear en cada llamada de una misma tanda de acciones.
let cachedSession: { data: LoginResponse; expiresAt: number } | null = null;
const SESSION_TTL_MS = 20 * 60 * 1000;

async function andreaniLogin(): Promise<LoginResponse> {
  if (cachedSession && cachedSession.expiresAt > Date.now()) {
    return cachedSession.data;
  }

  const credentialId = process.env.ANDREANI_CREDENTIAL_ID;
  if (!credentialId) throw new Error('Falta ANDREANI_CREDENTIAL_ID');

  const res = await fetch(`${API_BASE}/api/v1/Login`, {
    method: 'POST',
    headers: { Authorization: credentialId, 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`Andreani login falló (${res.status})`);
  const data = await res.json();
  if (!data?.response?.accessToken) throw new Error('Andreani login sin accessToken');

  cachedSession = { data: data.response as LoginResponse, expiresAt: Date.now() + SESSION_TTL_MS };
  return cachedSession.data;
}

function authHeaders(accessToken: string) {
  return { 'Content-Type': 'application/json', 'X-Auth-Token': accessToken };
}

export async function getSucursales(codigoPostal: string) {
  const { accessToken } = await andreaniLogin();
  const url = new URL(`${API_BASE}/api/v1/Branch`);
  url.searchParams.set('postalCode', codigoPostal);
  const res = await fetch(url, { headers: authHeaders(accessToken) });
  if (!res.ok) throw new Error(`Andreani sucursales falló (${res.status})`);
  const data = await res.json();
  const branches = data?.response?.data as Array<{
    Codigo: string;
    Descripcion: string;
    Direccion?: { Localidad?: string; Provincia?: string; Calle?: string; Numero?: string; CodigoPostal?: string };
  }> | undefined;
  if (!branches?.length) return [];
  return branches.map((b) => ({
    codigo: b.Codigo,
    descripcion: b.Descripcion,
    direccion: [b.Direccion?.Calle, b.Direccion?.Numero].filter(Boolean).join(' '),
    localidad: b.Direccion?.Localidad || '',
  }));
}

export async function crearEnvio({
  deliveryMode,
  paquete,
  destinatario,
  destino,
  precioEnvio,
  remito,
  emailComercio,
}: {
  deliveryMode: AndreaniDeliveryMode;
  paquete: AndreaniPaquete;
  destinatario: AndreaniDestinatario;
  destino: AndreaniDestino;
  precioEnvio: number;
  remito: string;
  emailComercio: string;
}) {
  const { accessToken, contratos } = await andreaniLogin();
  const contrato = contratos.find((c) => c.modoDeEntregaNombre === deliveryMode);
  if (!contrato) {
    throw new Error(`No tenés un contrato de Andreani para el modo de entrega "${deliveryMode}"`);
  }

  const body = {
    contract: { id_contract: contrato.id },
    price_shipment: precioEnvio,
    origin: { postal_code: CP_ORIGEN },
    destination: {
      street: destino.calle,
      number: destino.numero,
      floor: destino.piso || '',
      postal_code: destino.codigoPostal,
      locality: destino.localidad,
      code_branch: destino.codigoSucursal || '',
    },
    recipient: {
      name: destinatario.nombre,
      last_name: destinatario.apellido,
      phone_number: destinatario.telefono,
      dni: destinatario.dni || '',
      email: destinatario.email || '',
    },
    products: [
      {
        price: precioEnvio,
        quantity: 1,
        kgrams: paquete.pesoKg,
        width: paquete.anchoCm,
        depth: paquete.profundidadCm,
        height: paquete.altoCm,
      },
    ],
    email_merchant: emailComercio,
    remito,
  };

  const res = await fetch(`${API_BASE}/api/v1/Pyme/ShippingRegistration`, {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.response) {
    throw new Error(data?.messages?.[0] || `Andreani no pudo crear el envío (${res.status})`);
  }

  const response = data.response as Record<string, unknown>;

  return {
    // Pyme no devuelve el numero de seguimiento en el alta -- solo un pedidoId.
    // El tracking real hay que resolverlo despues con buscarTrackingNumber(remito).
    pedidoId: (response.pedidoId as string) || '',
    numeroInterno: (response.numeroInterno as string) || '',
    contractId: contrato.id,
    raw: response,
  };
}

/**
 * Resuelve el numero de seguimiento real de un envio ya creado, buscandolo por
 * el remito (el id de pedido que se mando como `remito` al crear el envio).
 * Puede devolver vacio si Andreani todavia no lo proceso -- reintentar mas tarde.
 */
export async function buscarTrackingNumber(remito: string): Promise<string> {
  const { accessToken } = await andreaniLogin();
  const res = await fetch(`${API_BASE}/api/v1/Shipments/ByOrderNumbers`, {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify({ salesOrderNumbers: [remito] }),
  });
  if (!res.ok) throw new Error(`Andreani no pudo buscar el envío (${res.status})`);
  const data = await res.json().catch(() => null);
  const shipments = (data?.response ?? data) as Array<{ salesOrderNumber?: string; trackingNumber?: string }> | undefined;
  const match = shipments?.find((s) => String(s.salesOrderNumber) === String(remito));
  return match?.trackingNumber || '';
}

export async function getEtiqueta(trackingNumbers: string[]): Promise<Buffer> {
  const { accessToken } = await andreaniLogin();
  const res = await fetch(`${API_BASE}/api/v1/Pyme/ticket`, {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify({ trackingNumbers }),
  });
  if (!res.ok) throw new Error(`Andreani no pudo generar la etiqueta (${res.status})`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
