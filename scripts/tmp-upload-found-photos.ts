import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const envRaw = readFileSync('.env.local', 'utf-8');
for (const line of envRaw.split('\n')) {
  const m = line.match(/^([A-Z_0-9]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// Cada URL de abajo fue confirmada individualmente (WebFetch/browser) contra
// la pagina oficial del fabricante o un retailer conocido antes de este
// script -- se listan literales, sin generarlas por formula.

const candorBlanca = [
  'https://escorial.com.ar/img/products/candor-blanca01-7274-n.jpg',
  'https://escorial.com.ar/img/products/candor-blanca02-1872-n.jpg',
  'https://escorial.com.ar/img/products/candor-blanca03-2426-n.jpg',
  'https://escorial.com.ar/img/products/candor-blanca04-2055-n.jpg',
  'https://escorial.com.ar/img/products/candor-blanca05-8618-n.jpg',
];
const candorBlack = [
  'https://escorial.com.ar/img/products/candor-black01-1654-n.jpg',
  'https://escorial.com.ar/img/products/candor-black02-2564-n.jpg',
  'https://escorial.com.ar/img/products/candor-black03-8541-n.jpg',
  'https://escorial.com.ar/img/products/candor-black04-6938-n.jpg',
  'https://escorial.com.ar/img/products/candor-black05-5920-n.jpg',
];
const masterInox = [
  'https://escorial.com.ar/img/products/horno-frente-4315-n.jpg',
  'https://escorial.com.ar/img/products/horno-detalle-9117-n.jpg',
  'https://escorial.com.ar/img/products/horno-lateral-2-2722-n.jpg',
  'https://escorial.com.ar/img/products/horno-lateral-7019-n.jpg',
  'https://escorial.com.ar/img/products/horno-puerta-5414-n.jpg',
];
const masterBlanca = [
  'https://escorial.com.ar/img/products/escorial7224-1-6772-n.jpg',
  'https://escorial.com.ar/img/products/escorial7218-1-8442-n.jpg',
  'https://escorial.com.ar/img/products/escorial7228-1-6194-n.jpg',
  'https://escorial.com.ar/img/products/escorial7230-1-5914-n.jpg',
  'https://escorial.com.ar/img/products/escorial7232-4708-n.jpg',
];
const masterNegro = [
  'https://escorial.com.ar/img/products/escorial7235-1-6355-n.jpg',
  'https://escorial.com.ar/img/products/escorial7238-1-7173-n.jpg',
  'https://escorial.com.ar/img/products/escorial7240-1-6633-n.jpg',
  'https://escorial.com.ar/img/products/escorial7241-5606-n.jpg',
  'https://escorial.com.ar/img/products/escorial7244-1-2768-n.jpg',
];
const masterStyle = [
  'https://escorial.com.ar/img/products/escorial7306-2132-n.jpg',
  'https://escorial.com.ar/img/products/escorial7309-1-8452-n.jpg',
  'https://escorial.com.ar/img/products/escorial7324-6667-n.jpg',
  'https://escorial.com.ar/img/products/escorial7325-7373-n.jpg',
  'https://escorial.com.ar/img/products/escorial7329-1-4351-n.jpg',
];
const palace = [
  'https://escorial.com.ar/img/products/palace-blanca01-4468-n.jpg',
  'https://escorial.com.ar/img/products/palace-blanca02-1859-n.jpg',
  'https://escorial.com.ar/img/products/palace-blanca03-7090-n.jpg',
  'https://escorial.com.ar/img/products/palace-blanca04-7322-n.jpg',
  'https://escorial.com.ar/img/products/palace-blanca05-3844-n.jpg',
];
const termo45 = [
  'https://escorial.com.ar/img/products/45l01-4784-n.jpg',
  'https://escorial.com.ar/img/products/45l02-9937-n.jpg',
];
const termo80 = [
  'https://escorial.com.ar/img/products/80l01-9482-n.jpg',
  'https://escorial.com.ar/img/products/80l02-8648-n.jpg',
];
const termoElec55 = [
  'https://escorial.com.ar/img/products/55l01-3260-n.jpg',
  'https://escorial.com.ar/img/products/55l02-5840-n.jpg',
];
const termoElec90 = [
  'https://escorial.com.ar/img/products/90l01-9776-n.jpg',
  'https://escorial.com.ar/img/products/90l02-6571-n.jpg',
];

const drean55 = [
  'https://drean.com.ar/medias/1200Wx1200H-A-QV-55-1.jpg?context=bWFzdGVyfGltYWdlc3w1NTUxN3xpbWFnZS9qcGVnfGFESTNMMmcxT1M4eE1qRTBNRFV5TmpJM01qVTBNaTh4TWpBd1YzZ3hNakF3U0Y5QkxWRldMVFUxTFRFdWFuQm58NzVhMTk5ZWM1N2VlOGZlZmIxNThmOGZhYzJlMWZlMGRjOGY3NTZlZTYzOGJhMmZlMWNlMzgyNmYyYjk3M2NiMw',
  'https://drean.com.ar/medias/1200Wx1200H-B-QV-55-2.jpg?context=bWFzdGVyfGltYWdlc3w1NjA4MHxpbWFnZS9qcGVnfGFEUTRMMmcwWXk4eE1qRTBNRFV5TmpZd01ESXlNaTh4TWpBd1YzZ3hNakF3U0Y5Q0xWRldMVFUxTFRJdWFuQm58MjJmZjc5OTY3YWQ5Y2U5YTY4MzM3MjI3Y2I5OWU1ZjhiOTdhZWM5OWUxNTMyNDU1ZjgyYzdmOGI5N2ZlNmNkYQ',
  'https://drean.com.ar/medias/1200Wx1200H-C-QV-55-3.jpg?context=bWFzdGVyfGltYWdlc3wxMDc1ODF8aW1hZ2UvanBlZ3xhR05qTDJnME1TOHhNakUwTURVeU5qa3lOemt3TWk4eE1qQXdWM2d4TWpBd1NGOURMVkZXTFRVMUxUTXVhbkJufGY0ZTNmZjZlZTk4NzAxNjM1ZTNhMTAzYzgzNzhiM2I4MzU2ZjEwNWJhOGM0YThiMjcyMDM2MWQzZDI5ZGNmMjk',
];
const drean65 = [
  'https://drean.com.ar/medias/1200Wx1200H-A-QV-65-1.jpg?context=bWFzdGVyfGltYWdlc3w1Mzk3NHxpbWFnZS9qcGVnfGFHSTRMMmhrWWk4eE1qRTBNRFUxTXpNek9Ea3hNQzh4TWpBd1YzZ3hNakF3U0Y5QkxWRldMVFkxTFRFdWFuQm58YmYwMzI5ZDM4ZmMyYzAxNjIzZGUzN2ZmYjg5ZTJkYjc2ZmMwOGZlOGMwOTc1NzgzM2NhNmE2MDA3NWFlNWEzNw',
  'https://drean.com.ar/medias/1200Wx1200H-B-QV-65-2.jpg?context=bWFzdGVyfGltYWdlc3w1Mzk5N3xpbWFnZS9qcGVnfGFEUTRMMmhsTmk4eE1qRTBNRFUxTXpZMk5qVTVNQzh4TWpBd1YzZ3hNakF3U0Y5Q0xWRldMVFkxTFRJdWFuQm58ODkyYzc1ZjM3NzQ1NTM0OTRhMWM4OTFlZDNkODhjZWY1ZWIxYzc3MjdkMTZhZjBhZjExNzhhZDY0MTlhOTNlNA',
  'https://drean.com.ar/medias/1200Wx1200H-C-QV-65-3.jpg?context=bWFzdGVyfGltYWdlc3wxMDQzOTJ8aW1hZ2UvanBlZ3xhR1EzTDJobU1DOHhNakUwTURVMU16azVOREkzTUM4eE1qQXdWM2d4TWpBd1NGOURMVkZXTFRZMUxUTXVhbkJufDlmZDg0NjcyMzlmN2U3NDE0NjY1Y2IzNGQ2ZTgxYzI3Y2M3Zjk3NzVhY2JjMzBkN2Y5OWRkNmQyNTM4ZjI2YTU',
];

const bateriaNegro = [
  'https://images.fravega.com/f300/eb058eea15e2dc45cacaabb3b72ff439.jpg',
  'https://images.fravega.com/f300/dfab01caec5e86d40b88c3e66dd62dbb.jpg',
  'https://images.fravega.com/f300/0924d4a85b0f316fc3a222c05e981b02.jpg',
  'https://images.fravega.com/f300/25089adb37d3307f830edfa62fa6f3ec.jpg',
  'https://images.fravega.com/f300/6e2235a31640ced865b93452abaa0c8f.jpg',
];
const bateriaTerracota = ['https://images.fravega.com/f500/18d56c9621340c6de90a8c0c21422382.jpg'];

const arcoirisBordeVivo = ['https://images.fravega.com/f500/4aad42601a9eb89a5ac053c8c978b873.jpg'];

const MANIFEST: { sku: string; urls: string[] }[] = [
  { sku: '7,79801E+12', urls: candorBlanca },
  { sku: '7,79801E+12-2', urls: candorBlack },
  { sku: '7,79801E+12-3', urls: candorBlanca },
  { sku: '7,79801E+12-4', urls: masterInox },
  { sku: '7,79801E+12-5', urls: masterBlanca },
  { sku: '7,79801E+12-6', urls: masterNegro },
  { sku: '7,79801E+12-7', urls: masterStyle },
  { sku: '7,79801E+12-8', urls: palace },
  { sku: '7,79801E+12-9', urls: palace },
  { sku: '7,79801E+12-10', urls: termo45 },
  { sku: '7,79801E+12-11', urls: termo80 },
  { sku: '7,79801E+12-12', urls: termoElec55 },
  { sku: '7,79801E+12-13', urls: termoElec90 },
  { sku: '7,79547E+12', urls: drean55 },
  { sku: '7,79547E+12-2', urls: drean65 },
  { sku: '7,8965E+12', urls: bateriaNegro },
  { sku: '7,8965E+12-2', urls: bateriaTerracota },
  { sku: '7,8965E+12-3', urls: [bateriaNegro[0], bateriaNegro[1]] },
  { sku: '7,8965E+12-4', urls: bateriaTerracota },
  { sku: '7,79417E+12-2', urls: arcoirisBordeVivo },
];

function extFromUrl(url: string): string {
  const m = url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i);
  return m ? m[1].toLowerCase() : 'jpg';
}

function sanitizeSku(sku: string): string {
  return sku.replace(/[^a-zA-Z0-9-]/g, '_');
}

async function main() {
  for (const { sku, urls } of MANIFEST) {
    const uploadedUrls: string[] = [];
    let n = 1;
    for (const url of urls) {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        console.log(`  !! fallo descarga ${url} (${res.status})`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const ext = extFromUrl(url);
      const storagePath = `products/${sanitizeSku(sku)}/${n}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(storagePath, buf, { contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`, upsert: true });
      if (uploadError) {
        console.log(`  !! fallo upload ${storagePath}: ${uploadError.message}`);
        continue;
      }
      const { data: pub } = supabase.storage.from('product-images').getPublicUrl(storagePath);
      uploadedUrls.push(pub.publicUrl);
      n++;
    }
    if (uploadedUrls.length === 0) {
      console.log(`${sku}: 0 imagenes subidas, NO actualizo DB`);
      continue;
    }
    const { error: updateError } = await supabase.from('products').update({ images: uploadedUrls }).eq('sku', sku);
    if (updateError) {
      console.log(`${sku}: fallo update DB: ${updateError.message}`);
      continue;
    }
    console.log(`${sku}: ${uploadedUrls.length} imagenes -> DB actualizada`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
