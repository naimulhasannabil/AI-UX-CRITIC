import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { AnalysisProvider } from "@/lib/analysis-context"
import { ThemeProvider } from "@/lib/theme-context"
import { KeyboardShortcuts } from "@/lib/keyboard-shortcuts"
import { FloatingAssistant } from "@/components/floating-assistant"

export const metadata: Metadata = {
  title: "UX Critic - AI-Powered UX Analysis",
  description: "Get instant UX feedback on your designs with AI-powered analysis",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <AnalysisProvider>
              <KeyboardShortcuts />
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <FloatingAssistant />
            </AnalysisProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
