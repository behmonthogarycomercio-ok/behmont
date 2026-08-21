import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PAGE_W = 210;
const PAGE_H = 297;
const CARD_W = 190;
const CARD_H = 93;
const CARDS_PER_PAGE = 3;
const CARD_X = (PAGE_W - CARD_W) / 2;

/**
 * Genera el PDF de etiquetas (3 por hoja, sin margenes) capturando cada
 * tarjeta tal como la renderiza el navegador (misma fuente, mismo grosor
 * que la vista previa en pantalla) e insertandola como imagen -- evita
 * cualquier diferencia de tipografia entre la web y el PDF descargado.
 */
export async function generateLabelsPdfFromDom(cardElements: HTMLElement[]) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const startY = (PAGE_H - CARDS_PER_PAGE * CARD_H) / 2;

  const LINE_CLAMP_SELECTOR = '.etiqueta-marca, .etiqueta-variacion, .etiqueta-spec-value';

  for (let i = 0; i < cardElements.length; i++) {
    const card = cardElements[i];
    // html2canvas recorta el contenido si el elemento esta parcialmente
    // fuera de la vista -- hay que asegurarse de que este completamente
    // visible antes de capturarlo.
    card.scrollIntoView({ block: 'center' });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const canvas = await html2canvas(card, {
      scale: 3,
      backgroundColor: '#ffffff',
      useCORS: true,
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll<HTMLElement>('.etiqueta-card').forEach((el) => {
          el.style.border = 'none';
          el.style.borderRadius = '0';
        });
        // html2canvas no soporta bien -webkit-line-clamp (calcula mal la
        // altura y recorta el texto) -- se pasa a bloque normal solo para
        // la captura. El corte de texto real ya se resuelve en JS (slice)
        // antes de llegar al DOM, asi que no hace falta el clamp aca.
        clonedDoc.querySelectorAll<HTMLElement>(LINE_CLAMP_SELECTOR).forEach((el) => {
          el.style.display = 'block';
          el.style.webkitLineClamp = 'unset';
          el.style.overflow = 'visible';
        });
        // html2canvas tampoco respeta bien el "gap" de flexbox -- se agrega
        // el mismo espacio (0.3cm) como margen explicito entre los hijos.
        clonedDoc.querySelectorAll<HTMLElement>('.etiqueta-info-col').forEach((el) => {
          el.style.gap = '0';
          const children = Array.from(el.children) as HTMLElement[];
          children.slice(0, -1).forEach((child) => {
            child.style.marginBottom = '0.3cm';
          });
        });
      },
    });
    const imgData = canvas.toDataURL('image/png');

    const posInPage = i % CARDS_PER_PAGE;
    if (i > 0 && posInPage === 0) doc.addPage();
    const cardTop = startY + posInPage * CARD_H;
    doc.addImage(imgData, 'PNG', CARD_X, cardTop, CARD_W, CARD_H);
  }

  doc.save('etiquetas-behmont.pdf');
}
