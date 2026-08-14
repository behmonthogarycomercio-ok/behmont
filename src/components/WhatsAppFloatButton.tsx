import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, buildQuickInquiryMessage } from '@/lib/whatsapp';

export default function WhatsAppFloatButton({
  whatsappNumber,
  whatsappNumber2,
}: {
  whatsappNumber: string;
  whatsappNumber2?: string;
}) {
  const link = buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage());
  const link2 = whatsappNumber2 ? buildWhatsAppLink(whatsappNumber2, buildQuickInquiryMessage()) : null;

  if (!link2) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp-600 text-white shadow-lg transition active:scale-[0.95] hover:bg-whatsapp-700"
        aria-label="Escribinos por WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center gap-2 rounded-full bg-[#ED3237] pl-4 pr-1 text-white shadow-lg transition active:scale-[0.95] hover:brightness-110"
        aria-label="Consultar con Lucas por WhatsApp"
      >
        <span className="text-sm font-semibold">Lucas</span>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15">
          <MessageCircle className="h-5 w-5" />
        </span>
      </a>
      <a
        href={link2}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center gap-2 rounded-full bg-whatsapp-600 pl-4 pr-1 text-white shadow-lg transition active:scale-[0.95] hover:bg-whatsapp-700"
        aria-label="Consultar con Luz por WhatsApp"
      >
        <span className="text-sm font-semibold">Luz</span>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15">
          <MessageCircle className="h-5 w-5" />
        </span>
      </a>
    </div>
  );
}
