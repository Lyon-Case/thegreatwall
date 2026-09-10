'use client'

import { useEffect, useState } from 'react'
import { Check, Minus, Plus, ShieldCheck, Ticket } from 'lucide-react'
import { readBrowserValue, removeBrowserValue, writeBrowserValue } from '@/lib/browser-storage'

const events = [
  { id: 'sundowners', name: 'Sunday Sundowners', date: '14 SEP 2026', venue: 'The Courtyard', accent: 'cyan' },
  { id: 'plate', name: 'Botswana on a Plate', date: '20 SEP 2026', venue: 'The Gallery', accent: 'lime' },
  { id: 'afterdark', name: 'The Great Wall After Dark', date: '04 OCT 2026', venue: 'Main Hall', accent: 'violet' },
]
const tiers = [{ id: 'general', name: 'General Access', detail: 'Entry + welcome drink', price: 180 }, { id: 'experience', name: 'Wall Experience', detail: 'Entry + tasting flight + reserved lounge', price: 420 }, { id: 'table', name: 'Private Table', detail: 'Up to 6 guests · dedicated host', price: 1800 }]
const confirmationCode = 'GW-2026-001'

export function TicketingFlow() {
  const [eventId, setEventId] = useState(events[0].id)
  const [tierId, setTierId] = useState(tiers[0].id)
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState(1)
  const [accepted, setAccepted] = useState(false)
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' })
  const [hydrated, setHydrated] = useState(false)
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  useEffect(() => {
    const draft = readBrowserValue('tgw-ticket-draft', null as null | { eventId: string; tierId: string; quantity: number; guest: typeof guest; step: number })
    if (draft) { setEventId(draft.eventId); setTierId(draft.tierId); setQuantity(draft.quantity); setGuest(draft.guest); setStep(Math.min(draft.step, 2)) }
    setHydrated(true)
  }, [])
  useEffect(() => { if (hydrated && step < 3) writeBrowserValue('tgw-ticket-draft', { eventId, tierId, quantity, guest, step }) }, [eventId, tierId, quantity, guest, step, hydrated])
  const event = events.find((item) => item.id === eventId) ?? events[0]
  const tier = tiers.find((item) => item.id === tierId) ?? tiers[0]
  const subtotal = tier.price * quantity
  const serviceFee = Math.round(subtotal * 0.05)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + serviceFee - discount
  const ready = guest.name.trim() && guest.email.includes('@') && accepted

  function submit(eventForm: React.FormEvent) { eventForm.preventDefault(); if (ready) setStep(3) }
  return <div className="ticket-flow">
    <div className="flow-steps"><span className={step >= 1 ? 'current' : ''}>01 / Select</span><i /><span className={step >= 2 ? 'current' : ''}>02 / Details</span><i /><span className={step >= 3 ? 'current' : ''}>03 / Confirm</span></div>
    {step === 1 && <div className="flow-layout"><div className="flow-main"><div className="flow-heading"><div><SectionTag>01 / Signal selection</SectionTag><h2>Choose your <em>night.</em></h2></div><span className="secure-tag"><ShieldCheck size={15} /> Secure checkout</span></div><div className="choice-stack"><div className="choice-group"><label>Choose an experience</label>{events.map((item) => <button key={item.id} className={`choice-card ${eventId === item.id ? 'selected' : ''}`} onClick={() => setEventId(item.id)}><span className={`choice-dot ${item.accent}`} /><span><strong>{item.name}</strong><small>{item.date} · {item.venue}</small></span><span className="choice-check">{eventId === item.id ? <Check size={15} /> : '○'}</span></button>)}</div><div className="choice-group"><label>Choose access level</label>{tiers.map((item) => <button key={item.id} className={`choice-card ${tierId === item.id ? 'selected' : ''}`} onClick={() => setTierId(item.id)}><span><strong>{item.name}</strong><small>{item.detail}</small></span><b>BWP {item.price.toLocaleString()}</b><span className="choice-check">{tierId === item.id ? <Check size={15} /> : '○'}</span></button>)}</div></div><div className="promo-row"><label htmlFor="promo-code">Promo code</label><div><input id="promo-code" value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} placeholder="TGW10" /><button type="button" className="button button-ghost" onClick={() => setPromoApplied(promo === 'TGW10')}>{promoApplied ? 'Applied' : 'Apply'}</button></div>{promo && promo !== 'TGW10' && <small>Try TGW10 for 10% off.</small>}</div><div className="quantity-control"><span>Number of passes</span><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><strong>{quantity}</strong><button onClick={() => setQuantity(Math.min(8, quantity + 1))} aria-label="Increase quantity"><Plus size={15} /></button></div></div><button className="button button-cyan full-button" onClick={() => setStep(2)}>Continue to details <span>↗</span></button></div><OrderSummary event={event.name} tier={tier.name} quantity={quantity} total={total} /></div>}
    {step === 2 && <form className="flow-layout" onSubmit={submit}><div className="flow-main"><div className="flow-heading"><div><SectionTag>02 / Guest details</SectionTag><h2>Who is <em>coming?</em></h2></div></div><div className="form-grid"><label>Full name<input required value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Your name" /></label><label>Email address<input required type="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="you@example.com" /></label><label>Phone number<input value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} placeholder="+267 ..." /></label></div><label className="terms"><input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} /> <span>I agree to the ticket terms, entry policy and cancellation conditions.</span></label><div className="flow-actions"><button type="button" className="button button-ghost" onClick={() => setStep(1)}>Back</button><button className="button button-cyan" type="submit" disabled={!ready}>Review order <span>↗</span></button></div></div><OrderSummary event={event.name} tier={tier.name} quantity={quantity} total={total} /></form>}
    {step === 3 && <div className="confirmation"><div className="confirmation-icon"><Check size={34} /></div><SectionTag>03 / Signal confirmed</SectionTag><h2>You&apos;re on the <em>list.</em></h2><p>Your access pass for <strong>{event.name}</strong> is reserved. We&apos;ve sent the confirmation to {guest.email}.</p><div className="pass-card"><Ticket size={22} /><div><span>{event.date}</span><strong>{tier.name}</strong><small>{guest.name} · {quantity} pass{quantity > 1 ? 'es' : ''}</small></div><b>#{confirmationCode}</b></div><div className="confirmation-actions"><button className="button button-ghost" onClick={() => window.print()}>Print confirmation</button><a className="button button-cyan" href="/" onClick={() => removeBrowserValue('tgw-ticket-draft')}>Return to command center <span>↗</span></a></div></div>}
  </div>
}
function SectionTag({ children }: { children: React.ReactNode }) { return <p className="eyebrow section-label">{children}</p> }
function OrderSummary({ event, tier, quantity, total }: { event: string; tier: string; quantity: number; total: number }) { return <aside className="order-summary"><SectionTag>Order telemetry</SectionTag><h3>{event}</h3><div className="summary-line"><span>{tier} × {quantity}</span><b>BWP {(total - Math.round(total * .05)).toLocaleString()}</b></div><div className="summary-line muted"><span>Service fee</span><b>BWP {Math.round(total * .05).toLocaleString()}</b></div><div className="summary-total"><span>Total</span><strong>BWP {total.toLocaleString()}</strong></div><p className="summary-note"><ShieldCheck size={14} /> Payments are processed securely.</p></aside>}
