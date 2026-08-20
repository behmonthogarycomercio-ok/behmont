import { jsPDF } from 'jspdf';
import { getProductCode } from './product-display';
import { getBrandName, getSpecItems, type LabelProduct } from './etiqueta-content';

// Colores de marca (mismos hex que tailwind.config.js) -- jsPDF no puede leer
// clases de Tailwind, hay que repetirlos como RGB.
const STEEL_950: [number, number, number] = [10, 18, 38];
const STEEL_600: [number, number, number] = [45, 67, 128];
const STEEL_500: [number, number, number] = [82, 100, 156];
const STRIPE: [number, number, number] = [17, 28, 56]; // steel-900
const RED: [number, number, number] = [237, 50, 55]; // amber-500 (acento de marca)

const PAGE_W = 210;
const PAGE_H = 297;
const CARD_W = 190;
const CARD_H = 93;
const CARDS_PER_PAGE = 3;
const CARD_X = (PAGE_W - CARD_W) / 2;
const CONTENT_X_PAD = 10;
const STRIPE_H = 5;

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

function drawCard(
  doc: jsPDF,
  p: LabelProduct,
  cardTop: number,
  logo: { dataUrl: string; ratio: number } | null
) {
  const centerX = CARD_X + CARD_W / 2;
  const contentW = CARD_W - CONTENT_X_PAD * 2;

  // Franjas
  doc.setFillColor(...STRIPE);
  doc.rect(CARD_X, cardTop, CARD_W, STRIPE_H, 'F');
  doc.rect(CARD_X, cardTop + CARD_H - STRIPE_H, CARD_W, STRIPE_H, 'F');

  const code = getProductCode(p) ?? p.sku;
  const brandName = getBrandName(p);
  const specItems = getSpecItems(p);

  let y = cardTop + STRIPE_H + 7;

  if (brandName) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(42);
    doc.setTextColor(...STEEL_950);
    y += ptToMm(42) * 0.72;
    doc.text(brandName.toUpperCase(), centerX, y, { align: 'center', maxWidth: contentW });
    y += ptToMm(42) * 0.3 + 3;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18.5);
    doc.setTextColor(...STEEL_600);
    const lines = doc.splitTextToSize(p.name, contentW).slice(0, 2);
    lines.forEach((line: string) => {
      y += ptToMm(18.5) * 0.78;
      doc.text(line, centerX, y, { align: 'center' });
      y += ptToMm(18.5) * 0.32;
    });
  } else {
    doc.setFont('helvetica', 'bold');
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

  doc.setFontSize(17.3);
  specItems.forEach((s) => {
    const label = `${s.label}: `;
    const value = s.value;
    doc.setFont('helvetica', 'bold');
    const labelW = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    const valueW = doc.getTextWidth(value);
    const dotSpace = 4;
    const totalW = dotSpace + labelW + valueW;
    let x = centerX - totalW / 2;

    y += ptToMm(17.3) * 0.8;
    doc.setFillColor(...RED);
    doc.circle(x + 1, y - 1.4, 0.7, 'F');
    x += dotSpace;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...STEEL_950);
    doc.text(label, x, y);
    x += labelW;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...STEEL_500);
    doc.text(value, x, y, { maxWidth: contentW - (x - (centerX - totalW / 2)) });

    y += ptToMm(17.3) * 0.5 + 2.4;
  });

  // Codigo (izquierda, subrayado) + logo (derecha), pegados a la franja inferior
  const bottomRowY = cardTop + CARD_H - STRIPE_H - 6;
  doc.setFont('courier', 'bold');
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
  const logo = await loadLogo();
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const startY = (PAGE_H - CARDS_PER_PAGE * CARD_H) / 2;

  products.forEach((p, i) => {
    const posInPage = i % CARDS_PER_PAGE;
    if (i > 0 && posInPage === 0) doc.addPage();
    const cardTop = startY + posInPage * CARD_H;
    drawCard(doc, p, cardTop, logo);
  });

  doc.save('etiquetas-behmont.pdf');
}
