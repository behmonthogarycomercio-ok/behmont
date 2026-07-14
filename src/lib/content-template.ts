// Plantilla fija para el Generador de piezas — sin IA, solo arma el guion con
// la estructura hook/diagnóstico/reframe/CTA a partir de lo que carga el usuario.

export type ContentTemplateInput = {
  hook: string;
  diagnostico: string;
  reframe: string;
  cta: string;
  format: string;
  objective: string;
};

const FORMAT_LABELS: Record<string, string> = {
  reel: 'Reel',
  carousel: 'Carrusel',
  story: 'Story',
  ad: 'Ad',
};

export function buildContentScript(input: ContentTemplateInput): string {
  const formatLabel = FORMAT_LABELS[input.format] || input.format;
  const parts = [
    `Formato: ${formatLabel} · Objetivo: ${input.objective}`,
    '',
    `1. Hook: ${input.hook || '(sin hook cargado)'}`,
    `2. Diagnóstico: ${input.diagnostico || '(sin diagnóstico cargado)'}`,
    `3. Reframe: ${input.reframe || '(sin reframe cargado)'}`,
    `4. CTA: ${input.cta || '(sin CTA cargado)'}`,
  ];
  return parts.join('\n');
}
