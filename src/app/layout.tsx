import "@/styles/main.css"

import type { Metadata } from "next"

import { Header } from "@/components/header"
import { flexo } from "@/fonts"
import { cn } from "@/utils"

import { sharedMetadata } from "./shared-metadata"

export const metadata: Metadata = sharedMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body
        className={cn(
          flexo.variable,
          "flex flex-col relative min-h-screen bg-black-dark font-flexo",
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
