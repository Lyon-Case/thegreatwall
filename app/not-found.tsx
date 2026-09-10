import Link from 'next/link'
import { PageShell } from '@/components/site-shell'

export default function NotFound() { return <PageShell><section className="empty-state"><p className="eyebrow">Signal lost / 404</p><h1>This coordinate does not <em>exist.</em></h1><p>Return to the command center and choose another frequency.</p><Link className="button button-cyan" href="/">Return home <span>↗</span></Link></section></PageShell> }
