'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/venue', label: 'The Venue' },
  { href: '/whats-on', label: "What's On" },
  { href: '/eat-drink', label: 'Eat + Drink' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/reservations', label: 'Reservations' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <>
    <header className="site-header">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)}><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2010%2C%202026%2C%2002_28_27%20PM-PH4h09O67nUWonM6STDTRYSQMaaQ1X.png" alt="The Great Wall" /><span className="wordmark-name">The Great Wall</span></Link>
      <div className="nav-cluster"><nav id="primary-navigation" className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav><a className="whatsapp-link" href="https://wa.me/26772160763" target="_blank" rel="noreferrer">WhatsApp</a></div>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  </>
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-intro"><Link href="/" className="footer-brand" aria-label="The Great Wall home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2010%2C%202026%2C%2002_28_27%20PM-PH4h09O67nUWonM6STDTRYSQMaaQ1X.png" alt="The Great Wall logo" /></Link><p>Culture, connection and good times in Gaborone.</p></div><div className="footer-services"><span>What we do</span><Link href="/eat-drink">Dining & cocktails</Link><Link href="/whats-on">Live events</Link><Link href="/reservations">Private reservations</Link><Link href="/venue">Venue hire</Link><Link href="/gallery">Creative gatherings</Link></div><div className="footer-links"><span>Stay connected</span><Link href="/contact">Contact</Link><Link href="/gallery">Instagram</Link><Link href="/tickets">Tickets</Link></div><span className="footer-code">© 2026 The Great Wall. All rights reserved. <span aria-hidden="true">·</span> Powered by <a href="https://groar.ink" target="_blank" rel="noopener noreferrer">Groar</a></span></footer>
}

export function PageShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`site-frame ${className}`}><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div>
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return <section className="page-hero"><div className="hero-grid" /><div className="page-hero-content"><p className="eyebrow"><span className="eyebrow-pulse" />{eyebrow}</p><h1>{title}</h1><p className="page-hero-copy">{copy}</p></div><div className="hero-coordinate">TGW / 001<br />GABORONE<br />BW</div></section>
}

export function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="eyebrow section-label">{children}</p> }
export function FuturisticButton({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="button button-cyan">{children}<span>↗</span></Link> }
