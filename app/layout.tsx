import { Archivo, Noto_Sans } from 'next/font/google';
import { cookies } from 'next/headers';

import './globals.css';
import Footer from './components/Footer';
import DesktopHeader from '@/app/components/Header';
import CookiesBanner from './components/CookiesBanner';

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
  const cookie = cookies();

  return (
    <html lang="en">
      <body className={`${archivo.variable} ${notoSans.variable}`}>
        <DesktopHeader />
        {children}
        <CookiesBanner />
        <Footer />
      </body>
    </html>
  );
}
