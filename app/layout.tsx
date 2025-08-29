import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "Connect São Bento",
  description: "Viva o culto jovem com estilo. Blusas cristãs para o Connect São Bento.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${sora.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
