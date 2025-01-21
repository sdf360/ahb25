import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/contexts/UserContext"
import ErrorBoundary from "@/components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ثانوية أحسن بورفع",
  description: "موقع لوضع التمارين والفروض لتلاميذ احسن بورفع",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <ErrorBoundary>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

