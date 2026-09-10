'use client'

import Link from 'next/link'
import { Menu, Ticket, X, Zap } from 'lucide-react'
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
    <div className="signal-bar"><span><Zap size={12} /> GABORONE / 24.6557° S, 25.9088° E</span><span className="signal-status">SYSTEM ONLINE · OPEN UNTIL LATE</span></div>
    <header className="site-header">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)}><span>THE</span><strong>GREAT WALL</strong><span>BOTSWANA / 001</span></Link>
      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
      <Link href="/tickets" className="header-ticket"><Ticket size={16} /> Get Tickets</Link>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  </>
}

export function SiteFooter() {
  return <footer className="footer"><div><Link href="/" className="wordmark footer-mark"><span>THE</span><strong>GREAT WALL</strong><span>BOTSWANA / 001</span></Link><p>Culture, connection and good times in Gaborone.</p></div><div className="footer-links"><Link href="/contact">Contact</Link><Link href="/gallery">Instagram</Link><Link href="/tickets">Tickets</Link></div><span className="footer-code">© 2026 / TGW_BW</span></footer>
}

export function PageShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <main className={`site-frame ${className}`}><SiteHeader />{children}<SiteFooter /></main>
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return <section className="page-hero"><div className="hero-grid" /><div className="page-hero-content"><p className="eyebrow"><span className="eyebrow-pulse" />{eyebrow}</p><h1>{title}</h1><p className="page-hero-copy">{copy}</p></div><div className="hero-coordinate">TGW / 001<br />GABORONE<br />BW</div></section>
}

export function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="eyebrow section-label">{children}</p> }
export function FuturisticButton({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="button button-cyan">{children}<span>↗</span></Link> }
