import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Contacts from '../components/Сontacts/Сontacts';
import Header from '../components/Heade/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
// import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Модульний проєкт 5',
  description: 'Проєкт з модульною структурою та темною/світлою темами',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Contacts />
            <Header />
            <Breadcrumbs />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
