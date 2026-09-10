import { PageHero, PageShell } from '@/components/site-shell'
import { TicketingFlow } from '@/components/ticketing-flow'
export default function TicketsPage() { return <PageShell><PageHero eyebrow="TICKETING / ACCESS CONTROL" title={<>Your night.<br /><em>Your access.</em></>} copy="Select an experience, secure your pass and step into the next frequency at The Great Wall." /><TicketingFlow /></PageShell> }
