import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })

export const metadata: Metadata = {
  title: 'The Great Wall | Botswana',
  description: 'A place to gather in Gaborone. Discover food, music, culture and good times at The Great Wall Botswana.',
  generator: 'v0.app',
  openGraph: { title: 'The Great Wall | Botswana', description: 'Where Botswana comes alive.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f3eee6' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
