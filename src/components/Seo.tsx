import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import siteConfig from '../../site.config.json'
import pages from '../config/pageMetadata.json'
import { business } from '../config/business'

const pagesByPath = pages as Record<string, { tabTitle: string; title: string; description: string; keywords: string }>

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string | null) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!content) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

function setLink(rel: string, href: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!href) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.append(element)
  }
  element.href = href
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`
    const page = pagesByPath[path]
    const isNotFound = !page
    const details = page ?? {
      tabTitle: 'Page not found | AR Printing',
      title: 'Page not found | AR Printing',
      description: 'This page could not be found on the AR Printing website.',
      keywords: ''
    }
    const deploymentUrl = siteConfig.deploymentUrl.replace(/\/$/, '')
    const productionUrl = siteConfig.productionUrl.replace(/\/$/, '')
    const pageUrl = `${deploymentUrl}${path === '/' ? '/' : path}`
    const imageUrl = `${deploymentUrl}/images/products/ar-printing-logo.png`
    const siteUrl = `${deploymentUrl}/`
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      description: 'Custom printing, personalised apparel and branded merchandise.',
      slogan: business.tagline,
      url: productionUrl || siteUrl,
      image: imageUrl,
      telephone: `+${business.contacts.primaryWhatsApp}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Alberton',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA'
      }
    }
    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: business.name,
      url: productionUrl || siteUrl,
      inLanguage: 'en-ZA'
    }

    document.title = details.tabTitle
    setMeta('meta[name="description"]', 'name', 'description', details.description)
    setMeta('meta[name="keywords"]', 'name', 'keywords', details.keywords || null)
    setMeta('meta[name="robots"]', 'name', 'robots', isNotFound ? 'noindex,follow' : 'index,follow,max-image-preview:large')
    setLink('canonical', isNotFound || !productionUrl ? null : `${productionUrl}${path === '/' ? '/' : path}`)
    setMeta('meta[property="og:title"]', 'property', 'og:title', details.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', details.description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl)
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', business.name)
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1774')
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '887')
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', details.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', details.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

    let structuredData = document.getElementById('ar-printing-structured-data') as HTMLScriptElement | null
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'ar-printing-structured-data'
      structuredData.type = 'application/ld+json'
      document.head.append(structuredData)
    }
    structuredData.textContent = JSON.stringify([organization, website])
  }, [pathname])

  return null
}
