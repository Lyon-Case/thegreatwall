import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })

export const metadata: Metadata = {
  title: 'The Great Wall | Future Gatherings in Botswana',
  description: 'A futuristic creative hospitality platform for food, sound, culture and connection in Gaborone.',
  generator: 'v0.app',
  icons: { icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2010%2C%202026%2C%2002_28_27%20PM-PH4h09O67nUWonM6STDTRYSQMaaQ1X.png', apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2010%2C%202026%2C%2002_28_27%20PM-PH4h09O67nUWonM6STDTRYSQMaaQ1X.png' },
  openGraph: { title: 'The Great Wall | Future Gatherings in Botswana', description: 'Where the future gathers.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#070a0e' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
