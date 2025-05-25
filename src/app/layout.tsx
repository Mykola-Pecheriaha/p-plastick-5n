import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Contacts from "../components/Сontacts/Сontacts"
import Header from "../components/Heade/Header"
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs"
import Footer from "../components/Footer/Footer"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Модульний проєкт",
  description: "Проєкт з модульною структурою та темною/світлою темами",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            {/* 👈 Фіксовані елементи зверху */}
            <Contacts />
            <Header />
            <Breadcrumbs />

            {/* 👈 Основний контент */}
            <main className="flex-1">{children}</main>

            {/* 👈 Футер знизу */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
