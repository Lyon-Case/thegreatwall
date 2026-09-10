'use client'

import { useEffect, useMemo, useState } from 'react'
import { BarChart3, Check, Edit3, Image, LayoutDashboard, MapPin, Plus, Save, Ticket, UtensilsCrossed } from 'lucide-react'
import { PageHero, PageShell, SectionLabel } from '@/components/site-shell'

type Content = { events: string; menu: string; gallery: string; venue: string }
const seed: Content = { events: 'Sunday Sundowners\nBotswana on a Plate\nThe Great Wall After Dark', menu: 'Fire-roasted seswaa\nCitrus marinated tilapia\nMophane worm arancini', gallery: 'Dune frequencies\nThe courtyard at dusk\nAfter dark / 001', venue: 'A modular cultural destination in Gaborone for food, sound, art and future-facing connection.' }
const labels = { events: 'Events', menu: 'Menu', gallery: 'Gallery', venue: 'Venue' }

export default function AdminPage() {
  const [content, setContent] = useState<Content>(seed)
  const [active, setActive] = useState<keyof Content>('events')
  const [saved, setSaved] = useState(false)
  useEffect(() => { const stored = window.localStorage.getItem('tgw-content'); if (stored) setContent(JSON.parse(stored)) }, [])
  const counts = useMemo(() => Object.fromEntries(Object.entries(content).map(([key, value]) => [key, value.split('\n').filter(Boolean).length])), [content])
  function save() { window.localStorage.setItem('tgw-content', JSON.stringify(content)); setSaved(true); window.setTimeout(() => setSaved(false), 2200) }
  return <PageShell><PageHero eyebrow="Control room / local mode" title={<>Shape the <em>signal.</em></>} copy="A private content workspace for keeping the Great Wall experience in sync. Changes are stored in this browser until a production backend is connected." /><section className="admin-section content-section"><div className="admin-layout"><aside className="admin-sidebar"><SectionLabel>Workspace</SectionLabel><div className="admin-nav">{(Object.keys(labels) as (keyof Content)[]).map((key) => <button key={key} className={active === key ? 'active' : ''} onClick={() => setActive(key)}>{key === 'events' ? <Ticket size={16} /> : key === 'menu' ? <UtensilsCrossed size={16} /> : key === 'gallery' ? <Image size={16} /> : <MapPin size={16} />}{labels[key]}<span>{counts[key]}</span></button>)}</div><div className="admin-note"><LayoutDashboard size={17} /><p>Local-first mode<br /><small>No external services connected.</small></p></div></aside><div className="admin-main"><div className="section-heading-row"><div><SectionLabel>Content registry / {active}</SectionLabel><h2>Edit the <em>world.</em></h2></div><button className="button button-cyan" onClick={save}><Save size={15} /> {saved ? 'Saved' : 'Save changes'}</button></div><div className="admin-editor"><label>{labels[active]} registry<textarea value={content[active]} onChange={(e) => setContent({ ...content, [active]: e.target.value })} rows={12} /></label><div className="editor-tools"><span><Edit3 size={14} /> One line becomes one publishable item</span><button className="button button-ghost" onClick={() => setContent({ ...content, [active]: `${content[active]}\nNew ${labels[active].toLowerCase()} item` })}><Plus size={15} /> Add row</button></div></div><div className="admin-metrics"><div><BarChart3 size={18} /><strong>04</strong><span>Content surfaces</span></div><div><Check size={18} /><strong>LIVE</strong><span>Preview status</span></div><div><Ticket size={18} /><strong>LOCAL</strong><span>Data mode</span></div></div></div></div></section></PageShell>
}
