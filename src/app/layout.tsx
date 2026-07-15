import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const display = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
// Las etiquetas que antes usaban IBM Plex Mono ahora usan Inter (mismo tracking/uppercase, tipografia unificada).
const mono = Inter({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'BEHMONT — Comercio y Hogar | Equipamiento comercial, hogar y electrónica',
  description:
    'Equipamientos comerciales, mueblería, hogar, electrónica y barbería en Concordia, Entre Ríos. Financiación diaria y semanal. Consultá stock y precio por WhatsApp.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
