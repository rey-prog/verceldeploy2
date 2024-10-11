import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import { DiveLogProvider } from '@/lib/DiveLogContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Commercial Diver Logbook',
  description: 'Log your dives, share your logbook, and manage your certifications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DiveLogProvider>
          <Header />
          <main className="pt-16 pb-16 min-h-screen">
            {children}
          </main>
          <BottomNav />
        </DiveLogProvider>
      </body>
    </html>
  )
}