'use client'

import { FormEvent, useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Camera, MapPin, Menu, Play, Quote, Sparkles, Ticket, X } from 'lucide-react'

const events = [
  { month: 'SEP', day: '14', type: 'LIVE MUSIC', title: 'Sunday Sundowners', detail: 'Live sets, sunset plates & cocktails', color: 'terracotta' },
  { month: 'SEP', day: '20', type: 'FOOD & CULTURE', title: 'Botswana on a Plate', detail: 'An evening of local stories and flavour', color: 'gold' },
  { month: 'OCT', day: '04', type: 'NIGHTLIFE', title: 'The Great Wall After Dark', detail: 'DJs, dancing and late-night bites', color: 'charcoal' },
]

const gallery = [
  'https://images.unsplash.com/photo-1519671282428-4b4a0f2a8b75?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('ALL EVENTS')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const filteredEvents = useMemo(() => filter === 'ALL EVENTS' ? events : events.filter((event) => event.type === filter), [filter])

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div className="topbar"><span>GABORONE, BOTSWANA</span><span className="topbar-dot" /><span>OPEN DAILY · 11:00 — LATE</span><span className="topbar-right">THE HOME OF GOOD TIMES</span></div>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="The Great Wall home"><span>THE</span><strong>GREAT WALL</strong><span>BOTSWANA</span></a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
          {['The Venue', 'What’s On', 'Eat & Drink', 'Gallery'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-').replace('’', '')}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-ticket" href="#events"><Ticket size={16} /> Get Tickets</a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero">
        <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2200&q=90" alt="Guests enjoying an outdoor cultural event at sunset" />
        <div className="hero-overlay" />
        <div className="hero-content"><p className="eyebrow light">A PLACE TO GATHER</p><h1>Where Botswana<br /><em>comes alive.</em></h1><p className="hero-copy">A home for food, music, culture and all the beautiful moments in between.</p><div className="hero-actions"><a className="button button-gold" href="#events">Discover what&apos;s on <ArrowRight size={17} /></a><a className="play-link" href="#gallery"><span className="play-circle"><Play size={13} fill="currentColor" /></span> Explore the venue</a></div></div>
        <div className="hero-stamp">EST. 2019<br /><span>GABORONE</span></div>
        <a href="#venue" className="scroll-cue"><span /> Scroll to explore</a>
      </section>

      <section id="venue" className="intro section-shell"><div className="intro-label"><span className="rule" />01 / THE VENUE</div><div className="intro-body"><div><h2>More than a venue.<br /><em>It&apos;s a feeling.</em></h2></div><div className="intro-text"><p>Built for the curious and the connected, The Great Wall is Gaborone&apos;s gathering place. Come for the food, stay for the music, and leave with a story worth telling.</p><a className="text-link" href="#contact">Our story <ArrowRight size={16} /></a></div></div><div className="feature-image"><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85" alt="Warmly lit restaurant dining space" /><div className="image-caption">A little bit of everywhere,<br />right here in Gaborone.</div></div></section>

      <section id="events" className="events-section"><div className="section-shell"><div className="section-heading"><div><p className="eyebrow">MAKE A DATE OF IT</p><h2>What&apos;s <em>on</em></h2></div><a className="text-link desktop-link" href="#contact">View all events <ArrowRight size={16} /></a></div><div className="filter-row">{['ALL EVENTS', 'LIVE MUSIC', 'FOOD & CULTURE', 'NIGHTLIFE'].map((item) => <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="event-grid">{filteredEvents.map((event) => <article className="event-card" key={event.title}><div className={`date-block ${event.color}`}><span>{event.month}</span><strong>{event.day}</strong><CalendarDays size={15} /></div><div className="event-info"><p className="event-type">{event.type}</p><h3>{event.title}</h3><p>{event.detail}</p><a href="#contact" className="event-link">Get tickets <ArrowRight size={15} /></a></div></article>)}</div></div></section>

      <section id="eat-&-drink" className="split-section section-shell"><div className="split-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1300&q=85" alt="Colourful shared plates on a table" /></div><div className="split-copy"><p className="eyebrow">COME HUNGRY</p><h2>Good food.<br /><em>Great company.</em></h2><p>From fire-kissed plates to ice-cold pours, our menu is made for sharing. Local ingredients, global inspiration, and a table always waiting for you.</p><a className="button button-dark" href="#contact">See the menu <ArrowRight size={17} /></a><div className="mini-note"><Sparkles size={17} /><span>Fresh ingredients<br /><b>Local suppliers</b></span></div></div></section>

      <section className="partners-section"><div className="section-shell partners"><p className="eyebrow">THE GREAT WALL IS FOR</p><div className="partner-list"><span>CELEBRATIONS</span><span>BIG NIGHTS OUT</span><span>NEW CONNECTIONS</span><span>LOCAL STORIES</span></div></div></section>

      <section id="gallery" className="gallery-section section-shell"><div className="section-heading"><div><p className="eyebrow">A LOOK AROUND</p><h2>Inside the <em>wall</em></h2></div><a className="text-link desktop-link" href="#contact">Follow along on Instagram <Camera size={16} /></a></div><div className="gallery-grid">{gallery.map((src, index) => <img key={src} className={`gallery-${index + 1}`} src={src} alt={`The Great Wall atmosphere ${index + 1}`} />)}</div></section>

      <section className="quote-section"><div className="quote-mark"><Quote size={30} /></div><blockquote>“The kind of place that makes<br />an ordinary Tuesday feel like<br /><em>something worth celebrating.”</em></blockquote><p>— A GUEST, GABORONE</p></section>

      <section id="contact" className="newsletter-section"><div className="newsletter-inner"><p className="eyebrow light">STAY IN THE KNOW</p><h2>Good things are<br /><em>on the way.</em></h2><p>Events, new menus, and the occasional excuse to get together. Delivered sparingly.</p>{subscribed ? <div className="success-message">You&apos;re on the list. See you at the wall.</div> : <form onSubmit={subscribe} className="newsletter-form"><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required /><button className="button button-gold" type="submit">Subscribe <ArrowRight size={17} /></button></form>}<div className="contact-details"><span><MapPin size={16} /> Plot 54368, Gaborone</span><span>hello@thegreatwall.co.bw</span><span>@thegreatwallbw</span></div></div></section>

      <footer className="footer"><a href="#top" className="wordmark footer-mark"><span>THE</span><strong>GREAT WALL</strong><span>BOTSWANA</span></a><p>© 2024 The Great Wall Botswana. Made for good times.</p><div className="footer-links"><a href="#contact">Privacy</a><a href="#contact">Instagram</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  )
}
