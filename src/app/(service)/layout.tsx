import "@/styles/css/base.css"

import type { Metadata } from "next"

import { Providers } from "@/components/providers"
import { commonMetadata } from "@/lib/metadata"
import { sans, mono } from "@/styles/fonts"

export const metadata: Metadata = commonMetadata({
  title: {
    default: "NPM Explorer",
    template: "%s | NPM Explorer",
  },
  description: "Explore npm package metadata and download statistics",
  image: "/api/og/default",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
