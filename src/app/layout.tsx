import type { Metadata } from 'next';

import { sharedMetadata } from "./shared-metadata";

import { Header } from "@/components/Header";
import { flexo } from '@/fonts';

import '@/styles/main.min.css';

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt">
      <body className={[flexo.variable].join(" ")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
