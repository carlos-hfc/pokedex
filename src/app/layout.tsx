import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { Header } from "@/components/Header";
import { flexo } from '@/fonts';

import '@/styles/main.min.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--montserrat"
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pokédex App",
    default: "Pokédex App"
  },
  description: 'Pokédex App',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={[montserrat.variable, flexo.variable].join(" ")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
