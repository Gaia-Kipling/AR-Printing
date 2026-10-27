export const business: {
  name: string
  tagline: string
  location: string
  contacts: { primaryDisplay: string; primaryWhatsApp: string; alternativeDisplay: string; alternativeWhatsApp: string }
  social: { instagramUsername: string; instagramUrl: string | null; facebookUrl: string | null; tiktokUrl: string | null; additional: { name: string; url: string }[] }
} = {
  name: 'AR Printing',
  tagline: 'Quality Prints. Lasting Impressions.',
  location: 'Alberton, Gauteng, South Africa',
  contacts: { primaryDisplay: '067 947 7314', primaryWhatsApp: '27679477314', alternativeDisplay: '072 420 3759', alternativeWhatsApp: '27724203759' },
  social: { instagramUsername: '@ar.printings', instagramUrl: null as string | null, facebookUrl: null as string | null, tiktokUrl: null as string | null, additional: [] as { name: string; url: string }[] }
}
