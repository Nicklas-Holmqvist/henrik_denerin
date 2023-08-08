import { Archivo, Noto_Sans } from 'next/font/google';

import DesktopHeader from '@/app/components/Header';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const notoSans = Noto_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

export const metadata = {
  title: 'Composer Henrik Denerin portfolio',
  description: 'Henrik Denerin is an composer from Sweden.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${notoSans.variable}`}>
        <DesktopHeader />
        {children}
      </body>
    </html>
  );
}
