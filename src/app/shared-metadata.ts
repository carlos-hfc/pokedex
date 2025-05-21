import { Metadata } from "next"

import { env } from "@/env"

export const sharedMetadata: Metadata = {
  title: {
    template: "%s | Pokédex App",
    default: "Pokédex App",
  },
  description: "Uma Pokédex para visualizar Pokémons",
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | Pokédex App",
      default: "Pokédex App",
    },
    description: "Uma Pokédex para visualizar Pokémons",
    images: "/favicon-512x512.png",
  },
  openGraph: {
    type: "website",
    url: new URL(String(env.NEXT_PUBLIC_BASE_URL)),
    title: {
      template: "%s | Pokédex App",
      default: "Pokédex App",
    },
    locale: "pt_BR",
    siteName: "Pokédex App",
    description: "Uma Pokédex para visualizar Pokémons",
    images: "/favicon-512x512.png",
  },
  manifest: "/site.webmanifest",
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
  creator: "Carlos Faustino",
  keywords: ["Pokémon", "Pokédex", "React", "Typescript", "Next.js"],
  authors: [
    {
      name: "Carlos Faustino",
      url: "https://github.com/carlos-hfc",
    },
  ],
  category: "technology",
  metadataBase: new URL(String(env.NEXT_PUBLIC_BASE_URL)),
}
