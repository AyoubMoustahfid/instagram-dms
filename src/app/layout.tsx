import type { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ClientProviders from "@/providers/client-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Slide",
  description: "Automate DMs and comments on Instagram",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <ClientProviders>
              {children}
            </ClientProviders>
          </body>
        </html>
      </ClerkProvider>
    )
  }