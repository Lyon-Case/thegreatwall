export const WHATSAPP_NUMBER = '26772160763'

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`
}

export function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
}

export function formatReservationMessage(form: { name: string; email: string; date: string; time: string; guests: string; notes: string }) {
  return `Hello The Great Wall, I would like to request a table reservation.\n\nName: ${form.name}\nEmail: ${form.email}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nNotes: ${form.notes || 'None'}\n\nPlease confirm availability.`
}

export function formatTicketMessage(input: { event: string; date: string; venue: string; tier: string; quantity: number; name: string; email: string; phone: string }) {
  return `Hello The Great Wall, I would like to request tickets.\n\nEvent: ${input.event}\nDate: ${input.date}\nVenue: ${input.venue}\nAccess: ${input.tier}\nPasses: ${input.quantity}\nName: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || 'Not provided'}\n\nPlease confirm availability and payment instructions.`
}

export function formatGeneralWhatsAppMessage(context = 'general enquiry') {
  return `Hello The Great Wall, I have a ${context}. Please assist me.`
}
