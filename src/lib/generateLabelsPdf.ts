import { jsPDF } from 'jspdf';
import { getProductCode } from './product-display';
import { getBrandName, getSpecItems, type LabelProduct } from './etiqueta-content';

// Colores de marca (mismos hex que tailwind.config.js) -- jsPDF no puede leer
// clases de Tailwind, hay que repetirlos como RGB.
const STEEL_950: [number, number, number] = [10, 18, 38];
const STEEL_600: [number, number, number] = [45, 67, 128];
const STEEL_500: [number, number, number] = [82, 100, 156];
const RED: [number, number, number] = [237, 50, 55]; // amber-500 (acento de marca)

const PAGE_W = 210;
const PAGE_H = 297;
const CARD_W = 190;
const CARD_H = 93;
const CARDS_PER_PAGE = 3;
const CARD_X = (PAGE_W - CARD_W) / 2;
const CONTENT_X_PAD = 10;

function ptToMm(pt: number) {
  return pt * 0.3528;
}

async function loadLogo(): Promise<{ dataUrl: string; ratio: number } | null> {
  try {
    const res = await fetch('/images/logo-behmont-oval.png');
    const blob = await res.blob();
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const ratio: number = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
      img.onerror = reject;
      img.src = dataUrl;
    });
    return { dataUrl, ratio };
  } catch {
    return null;
  }
}

async function loadFontBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

// Mismas tipografias que usa el sitio (next/font/google en layout.tsx):
// Manrope para titulos (--font-display), Inter para el resto (--font-body / --font-mono).
// La marca (etiqueta-marca) usa weight 900/800 y la variacion (etiqueta-variacion)
// usa weight 700 -- por eso se cargan dos pesos distintos de Manrope, igual que en CSS.
async function loadFonts(doc: jsPDF) {
  const [manropeExtraBold, manropeBold, interRegular, interBold] = await Promise.all([
    loadFontBase64('/fonts/Manrope-ExtraBold.ttf'),
    loadFontBase64('/fonts/Manrope-Bold.ttf'),
    loadFontBase64('/fonts/Inter-Regular.ttf'),
    loadFontBase64('/fonts/Inter-Bold.ttf'),
  ]);
  doc.addFileToVFS('Manrope-ExtraBold.ttf', manropeExtraBold);
  doc.addFont('Manrope-ExtraBold.ttf', 'Manrope', 'bold');
  doc.addFileToVFS('Manrope-Bold.ttf', manropeBold);
  doc.addFont('Manrope-Bold.ttf', 'ManropeVariacion', 'bold');
  doc.addFileToVFS('Inter-Regular.ttf', interRegular);
  doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');
  doc.addFileToVFS('Inter-Bold.ttf', interBold);
  doc.addFont('Inter-Bold.ttf', 'Inter', 'bold');
}

function drawCard(
  doc: jsPDF,
  p: LabelProduct,
  cardTop: number,
  logo: { dataUrl: string; ratio: number } | null
) {
  const centerX = CARD_X + CARD_W / 2;
  const contentW = CARD_W - CONTENT_X_PAD * 2;

  const code = getProductCode(p) ?? p.sku;
  const brandName = getBrandName(p);
  const specItems = getSpecItems(p);

  let y = cardTop + 7;

  if (brandName) {
    doc.setFont('Manrope', 'bold');
    doc.setFontSize(42);
    doc.setTextColor(...STEEL_950);
    y += ptToMm(42) * 0.72;
    doc.text(brandName.toUpperCase(), centerX, y, { align: 'center', maxWidth: contentW });
    y += ptToMm(42) * 0.3 + 3;

    doc.setFont('ManropeVariacion', 'bold');
    doc.setFontSize(18.5);
    doc.setTextColor(...STEEL_600);
    const lines = doc.splitTextToSize(p.name, contentW).slice(0, 2);
    lines.forEach((line: string) => {
      y += ptToMm(18.5) * 0.78;
      doc.text(line, centerX, y, { align: 'center' });
      y += ptToMm(18.5) * 0.32;
    });
  } else {
    doc.setFont('Manrope', 'bold');
    doc.setFontSize(27.7);
    doc.setTextColor(...STEEL_950);
    const lines = doc.splitTextToSize(p.name, contentW).slice(0, 2);
    lines.forEach((line: string) => {
      y += ptToMm(27.7) * 0.78;
      doc.text(line, centerX, y, { align: 'center' });
      y += ptToMm(27.7) * 0.32;
    });
  }

  y += 3;
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.9);
  doc.line(centerX - 11, y, centerX + 11, y);
  y += 6;

  // Con 3 o 4 caracteristicas hay que achicar la letra para que entren en la tarjeta.
  const specFontSize = specItems.length >= 3 ? 14 : 17.3;
  doc.setFontSize(specFontSize);
  specItems.forEach((s) => {
    const hasLabel = s.label.length > 0;
    const label = hasLabel ? `${s.label}: ` : '';
    const value = s.value;
    doc.setFont('Inter', 'bold');
    const labelW = hasLabel ? doc.getTextWidth(label) : 0;
    const valueW = doc.getTextWidth(value);
    const dotSpace = 4;
    const totalW = dotSpace + labelW + valueW;
    let x = centerX - totalW / 2;

    y += ptToMm(specFontSize) * 0.8;
    doc.setFillColor(...RED);
    doc.circle(x + 1, y - 1.4, 0.7, 'F');
    x += dotSpace;

    if (hasLabel) {
      doc.setFont('Inter', 'bold');
      doc.setTextColor(...STEEL_950);
      doc.text(label, x, y);
      x += labelW;
    }

    doc.setFont('Inter', 'bold');
    doc.setTextColor(...STEEL_500);
    doc.text(value, x, y, { maxWidth: contentW - (x - (centerX - totalW / 2)) });

    y += ptToMm(specFontSize) * 0.5 + 2;
  });

  // Codigo (izquierda, subrayado) + logo (derecha)
  const bottomRowY = cardTop + CARD_H - 6;
  doc.setFont('Inter', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...STEEL_600);
  doc.text(code, CARD_X + CONTENT_X_PAD, bottomRowY);
  const codeW = doc.getTextWidth(code);
  doc.setDrawColor(...STEEL_600);
  doc.setLineWidth(0.25);
  doc.line(CARD_X + CONTENT_X_PAD, bottomRowY + 1, CARD_X + CONTENT_X_PAD + codeW, bottomRowY + 1);

  if (logo) {
    const logoW = 24;
    const logoH = logoW / logo.ratio;
    doc.addImage(
      logo.dataUrl,
      'PNG',
      CARD_X + CARD_W - CONTENT_X_PAD - logoW,
      bottomRowY - logoH + 3,
      logoW,
      logoH
    );
  }
}

/** Genera el PDF de etiquetas (3 por hoja, sin margenes) y dispara la descarga en el navegador. */
export async function generateLabelsPdf(products: LabelProduct[]) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const [logo] = await Promise.all([loadLogo(), loadFonts(doc)]);

  const startY = (PAGE_H - CARDS_PER_PAGE * CARD_H) / 2;

  products.forEach((p, i) => {
    const posInPage = i % CARDS_PER_PAGE;
    if (i > 0 && posInPage === 0) doc.addPage();
    const cardTop = startY + posInPage * CARD_H;
    drawCard(doc, p, cardTop, logo);
  });

  doc.save('etiquetas-behmont.pdf');
}
