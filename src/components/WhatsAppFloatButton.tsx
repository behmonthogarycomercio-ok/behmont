import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, buildQuickInquiryMessage } from '@/lib/whatsapp';

export default function WhatsAppFloatButton({ whatsappNumber }: { whatsappNumber: string }) {
  const link = buildWhatsAppLink(whatsappNumber, buildQuickInquiryMessage());
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
      aria-label="Escribinos por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
