import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';

import '@/styles/main.min.css';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Pokédex App',
  description: 'Pokédex App',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
