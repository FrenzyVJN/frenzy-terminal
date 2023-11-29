import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })
const fira = Fira_Code({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Terminal',
  description: 'FrenzyVJN\'s portfolio coming soon.....',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fira.className}>{children}<Analytics /></body>
    </html>
  )
}
