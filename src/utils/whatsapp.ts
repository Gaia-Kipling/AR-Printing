import { business } from '../config/business'
export type WhatsAppContact = 'primary' | 'alternative'
export function whatsappUrl(message: string, contact: WhatsAppContact = 'primary') {
  const phone = contact === 'alternative' ? business.contacts.alternativeWhatsApp : business.contacts.primaryWhatsApp
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
export function productMessage(name: string, price?: string) {
  const priceNote = price ? ` (listed at ${price}; final quotation to be confirmed)` : ''
  return `Hi AR Printing! I'd like to enquire about ordering: ${name}${priceNote}. Please help me with pricing, available options and the next steps.`
}
export const customMessage = 'Hi AR Printing! I\'d like to enquire about a custom printing project. My requirements are:'
export const bulkMessage = 'Hi AR Printing! I\'d like a quotation for a bulk order. Please let me know what information you need.'
export const generalMessage = 'Hi AR Printing! I\'d like to find out more about your printing services. How can you assist me?'
