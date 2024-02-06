import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "./_components/footer"
import "./globals.css"
import { Toaster } from "./_components/ui/sonner"
import AuthProvider from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "Full Stack Week 3 FSW Barber",
}

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
