import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const output = resolve(root, 'dist')
const site = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'))
const pages = JSON.parse(await readFile(resolve(root, 'src/config/pageMetadata.json'), 'utf8'))
const deploymentUrl = site.deploymentUrl.replace(/\/$/, '')
const productionUrl = site.productionUrl.replace(/\/$/, '')
const imageUrl = `${deploymentUrl}/images/products/ar-printing-logo.png`
const homeHtml = await readFile(resolve(output, 'index.html'), 'utf8')

function setMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${key}" content="${content.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" />`
  const expression = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*\\/?\\s*>`)
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function applyPageMetadata(template, path, page) {
  const pageUrl = `${deploymentUrl}${path}`
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${page.tabTitle}</title>`)
  html = setMeta(html, 'name', 'description', page.description)
  html = setMeta(html, 'name', 'keywords', page.keywords)
  html = setMeta(html, 'name', 'robots', 'index,follow,max-image-preview:large')
  html = setMeta(html, 'property', 'og:title', page.title)
  html = setMeta(html, 'property', 'og:description', page.description)
  html = setMeta(html, 'property', 'og:url', pageUrl)
  html = setMeta(html, 'property', 'og:site_name', 'AR Printing')
  html = setMeta(html, 'property', 'og:image', imageUrl)
  html = setMeta(html, 'property', 'og:image:width', '1774')
  html = setMeta(html, 'property', 'og:image:height', '887')
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = setMeta(html, 'name', 'twitter:title', page.title)
  html = setMeta(html, 'name', 'twitter:description', page.description)
  html = setMeta(html, 'name', 'twitter:image', imageUrl)

  html = html.replace(/\s*<link\s+rel="canonical"[^>]*\/?\s*>/g, '')
  if (productionUrl) html = html.replace('</head>', `    <link rel="canonical" href="${productionUrl}${path}" />\n  </head>`)

  const publicUrl = productionUrl ? `${productionUrl}/` : `${deploymentUrl}/`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'AR Printing',
      description: 'Custom printing, personalised apparel and branded merchandise.',
      slogan: 'Quality Prints. Lasting Impressions.',
      url: publicUrl,
      image: imageUrl,
      telephone: '+27679477314',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Alberton',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA'
      }
    },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'AR Printing', url: publicUrl, inLanguage: 'en-ZA' }
  ]
  const jsonLd = `<script id="ar-printing-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`
  html = html.replace(/\s*<script id="ar-printing-structured-data"[\s\S]*?<\/script>/, '')
  return html.replace('</head>', `    ${jsonLd}\n  </head>`)
}

for (const [path, page] of Object.entries(pages)) {
  const html = applyPageMetadata(homeHtml, path, page)
  if (path === '/') {
    await writeFile(resolve(output, 'index.html'), html)
    continue
  }
  const directory = resolve(output, path.replace(/^\//, '').replace(/\/$/, ''))
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}

const sitemapUrls = Object.keys(pages).map(path => `  <url><loc>${deploymentUrl}${path}</loc></url>`).join('\n')
await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`)
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${deploymentUrl}/sitemap.xml\n`)
