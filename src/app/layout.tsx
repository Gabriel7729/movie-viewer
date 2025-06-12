import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animation/PageTransition'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'MovieViewer - Discover Movies and Actors',
  description: 'Browse through a comprehensive collection of movies and actors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
