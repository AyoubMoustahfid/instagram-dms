"use client"

import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "sonner"
import ReactQueryProvider from "@/providers/react-query-provider"
import ReduxProvider from "@/providers/redux-provider"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <ReduxProvider>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </ReduxProvider>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  )
}