import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, MessageCircle, PackageCheck, Palette, Truck, X, Instagram, MapPin } from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { business } from './config/business'
import { products, priceGroups } from './data/products'
import ProductArt from './components/ProductArt'
import { bulkMessage, customMessage, generalMessage, productMessage, whatsappUrl } from './utils/whatsapp'

const apparel = products.filter(p => p.category === 'Apparel')
const drinkware = products.filter(p => p.category === 'Drinkware')
const other = products.filter(p => p.category === 'Other printing')

function WaLink({ message = generalMessage, children, className = '', label }: { message?: string; children: ReactNode; className?: string; label?: string }) {
  return <a className={className} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>
}

function ProductCard({ product }: { product: typeof products[number] }) {
  return <article className="product-card"><ProductArt product={product}/><div className="product-info"><div className="product-heading"><h3>{product.name}</h3>{product.price && <span className="price-tag">{product.price}</span>}</div><p>{product.description}</p><WaLink message={productMessage(product.name, product.price)} className="product-order">Order this item <ArrowUpRight size={15}/></WaLink></div></article>
}

function PageNavigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setMenuOpen(false), [location.pathname])
  return <header className="site-header"><Link className="brand" to="/" aria-label="AR Printing home"><img className="brand-logo" src={`${import.meta.env.BASE_URL}images/products/ar-printing-logo.png`} alt="AR Printing — Quality Prints. Lasting Impressions."/></Link>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>{menuOpen ? <X/> : <Menu/>}</button>
    <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation"><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link><Link to="/price-list" onClick={() => setMenuOpen(false)}>Price List</Link><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link><WaLink className="nav-cta" label="Order on WhatsApp"><MessageCircle size={16}/> Order on WhatsApp</WaLink></nav>
  </header>
}

function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }))
    } else window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])
  return null
}

function TickerSequence() {
  return <><span>QUALITY PRINTS</span><b aria-hidden="true">•</b><span>LASTING IMPRESSIONS</span><b aria-hidden="true">•</b><span>YOUR IDEAS</span><b aria-hidden="true">•</b><span>OUR PRINTING</span><b aria-hidden="true">•</b></>
}

function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(2)
  const [sequenceWidth, setSequenceWidth] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const viewportWidth = tickerRef.current?.clientWidth ?? 0
      const measuredSequenceWidth = sequenceRef.current?.getBoundingClientRect().width ?? 0
      if (viewportWidth <= 0 || measuredSequenceWidth <= 0) return
      setSequenceWidth(current => current === measuredSequenceWidth ? current : measuredSequenceWidth)
      setCopies(current => {
        const needed = Math.max(2, Math.ceil(viewportWidth / measuredSequenceWidth) + 2)
        return current === needed ? current : needed
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (tickerRef.current) observer.observe(tickerRef.current)
    if (sequenceRef.current) observer.observe(sequenceRef.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const trackStyle = { '--ticker-shift': `${sequenceWidth}px` } as CSSProperties
  return <div className="ticker" role="group" aria-label="AR Printing services" ref={tickerRef}><div className="ticker-track" style={trackStyle}>{Array.from({ length: copies }, (_, index) => <div className="ticker-sequence" key={index} ref={index === 0 ? sequenceRef : undefined} aria-hidden={index > 0}><TickerSequence/></div>)}</div></div>
}

function HomePage() {
  return <>
    <section className="hero" id="home"><div className="hero-grain"/><div className="hero-copy"><span className="eyebrow"><i/> PERSONAL PRINTING. BIG ENERGY.</span><h1>MAKE IT YOURS.<br/>PRINT IT <span>WITH AR.</span></h1><p>Custom apparel, personalised drinkware and branded merchandise designed to make your brand stand out.</p><div className="hero-actions"><WaLink className="button button-blue"><MessageCircle size={17}/> Order on WhatsApp</WaLink><Link className="button button-outline" to="/products">Explore our products <ArrowDown size={16}/></Link></div><div className="trust-row"><span><Palette/> Custom designs</span><span><PackageCheck/> Bulk orders</span><span><Check/> Quality printing</span><span><Truck/> Courier available</span></div></div>
      <div className="hero-art" role="img" aria-label="Illustration of customised apparel and drinkware"><div className="hero-sticker sticker-yellow">MADE<br/>FOR YOU</div><div className="hero-label">YOUR IDEA.<br/><b>OUR PRINT.</b></div><div className="hero-products"><div className="hero-product hero-hoodie"><ProductArt product={products[3]} compact/></div><div className="hero-product hero-mug"><ProductArt product={products[6]} compact/></div><div className="hero-product hero-bottle"><ProductArt product={products[8]} compact/></div></div><span className="hero-star">✳</span><div className="hero-caption">GOOD THINGS<br/>GET PRINTED.</div></div>
    </section>
    <Ticker/>
    <section className="order-section section" id="how-to-order"><div className="order-title"><h2>LET’S GET<br/><em>IT PRINTED.</em></h2><p>One quick WhatsApp chat gets the conversation started.</p></div><div className="steps"><Step n="01" title="Choose your product">Browse the products and price list. Find your starting point.</Step><Step n="02" title="Send your requirements">Tap an order button to open WhatsApp. Tell us sizes, quantities, colours, design details and share any artwork you have.</Step><Step n="03" title="Confirm your quote">We’ll confirm availability, design, final pricing, turnaround and delivery with you.</Step><p className="enquiry-note"><MessageCircle size={17}/> Tapping a button starts an enquiry. Your order is only confirmed once the details are agreed with our team.</p></div></section>
  </>
}

function ProductsPage() {
  return <section className="section products-section page-products"><div className="section-head"><div><h1>WHAT CAN WE<br/><em>MAKE FOR YOU?</em></h1></div><p>From a one-off gift to a full team fit-out, bring us your idea and let’s make it real.</p></div>
    <nav className="category-nav" aria-label="Product categories"><a href="#apparel">Apparel <ArrowDown size={14}/></a><a href="#drinkware">Drinkware <ArrowDown size={14}/></a><a href="#other-products">Other Products <ArrowDown size={14}/></a></nav>
    <ProductCategory id="apparel" title="APPAREL" items={apparel}/><ProductCategory id="drinkware" title="DRINKWARE" items={drinkware}/><ProductCategory id="other-products" title="OTHER PRODUCTS & PRINTING" items={other}/>
  </section>
}

function ProductCategory({ id, title, items }: { id: string; title: string; items: typeof products }) {
  return <section className="product-category" id={id}><div className="category-head"><h2>{title}</h2><i/></div><div className="product-grid">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
}

function PriceListPage() {
  return <section className="price-section price-page" id="prices"><div className="price-intro"><h1>GOOD PRINTS.<br/><span>STRAIGHT PRICES.</span></h1><p>Here’s a starting point. Every design is different, so we’ll confirm your final quote before you order.</p><WaLink className="button button-light" message={generalMessage}>Ask us for a quote <ArrowRight size={16}/></WaLink><div className="price-splash">R</div></div><div className="price-lists">{priceGroups.map(group => <PriceGroup key={group.title} title={group.title} items={group.items}/ >)}<p className="price-note">Kids and adult T-shirt prices include full-front or full-back printing. Golf shirts vary by size and design; mug pricing varies by design. Ask us about case quantities for bottled water. Final pricing may depend on design, size, quantity and customisation. Please confirm your quote before placing an order.</p></div></section>
}

function ContactPage() {
  return <><section className="custom-section"><div className="custom-shape shape-one"/><div className="custom-copy"><span className="eyebrow">GOT A BIG IDEA?</span><h1>LET’S MAKE<br/>SOME <span>NOISE.</span></h1><p>Custom artwork. Business branding. Event merch. School and team apparel. Bulk orders. If you can imagine it, let’s talk about printing it.</p><div className="custom-tags"><span>YOUR ARTWORK</span><span>EVENT MERCH</span><span>BIG & BULK</span></div><div className="hero-actions"><WaLink className="button button-blue" message={customMessage}><MessageCircle size={17}/> Discuss your project</WaLink><WaLink className="text-link" message={bulkMessage}>Ask about a bulk order <ArrowUpRight size={16}/></WaLink></div></div><div className="custom-visual"><ProductArt product={products[0]}/><div className="custom-badge">IDEAS<br/><b>WELCOME</b><span>✳</span></div></div></section>
    <section className="contact-section section"><div className="contact-copy"><h2>READY WHEN<br/><em>YOU ARE.</em></h2><p>Got a question or a design in mind? Our team is happy to help you figure it out.</p><WaLink className="button button-blue"><MessageCircle size={17}/> Chat to us on WhatsApp</WaLink></div><div className="contact-card"><div className="contact-row"><div className="contact-icon"><MapPin/></div><div><small>FIND US</small><b>Alberton, Gauteng</b><span>South Africa · Courier services available</span></div></div><div className="contact-row"><div className="contact-icon"><MessageCircle/></div><div><small>WHATSAPP US</small><a href={`https://wa.me/${business.contacts.primaryWhatsApp}`} target="_blank" rel="noopener noreferrer">{business.contacts.primaryDisplay}</a><a className="alt-contact" href={`https://wa.me/${business.contacts.alternativeWhatsApp}`} target="_blank" rel="noopener noreferrer">Alternative: {business.contacts.alternativeDisplay}</a></div></div><div className="contact-row"><div className="contact-icon"><Instagram/></div><div><small>FOLLOW ALONG</small>{business.social.instagramUrl ? <a href={business.social.instagramUrl} target="_blank" rel="noopener noreferrer">{business.social.instagramUsername}</a> : <b>{business.social.instagramUsername}</b>}</div></div>{business.social.facebookUrl && <SocialRow name="Facebook" url={business.social.facebookUrl}/ >}{business.social.tiktokUrl && <SocialRow name="TikTok" url={business.social.tiktokUrl}/ >}{business.social.additional.map(profile => <SocialRow key={profile.name} name={profile.name} url={profile.url}/>)}</div></section></>
}

function SocialRow({ name, url }: { name: string; url: string }) { return <div className="contact-row"><div className="contact-icon"><ArrowUpRight/></div><div><small>FOLLOW ALONG</small><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></div></div> }

function SiteFooter() {
  return <footer className="footer"><div className="footer-main"><div className="footer-about"><Link className="brand footer-brand" to="/" aria-label="AR Printing home"><img className="brand-logo" src={`${import.meta.env.BASE_URL}images/products/ar-printing-logo.png`} alt="AR Printing — Quality Prints. Lasting Impressions."/></Link><p>Custom printing and branded merchandise made personal. {business.tagline}</p></div><div className="footer-links"><b>EXPLORE</b><Link to="/">Home</Link><Link to="/products">Products</Link><Link to="/price-list">Price list</Link><Link to="/contact">Contact</Link></div><div className="footer-links"><b>SHOP BY</b><Link to="/products#apparel">Apparel</Link><Link to="/products#drinkware">Drinkware</Link><Link to="/products#other-products">Other products</Link></div><div className="footer-links"><b>GET IN TOUCH</b><a href={`https://wa.me/${business.contacts.primaryWhatsApp}`} target="_blank" rel="noopener noreferrer">{business.contacts.primaryDisplay}</a><a href={`https://wa.me/${business.contacts.alternativeWhatsApp}`} target="_blank" rel="noopener noreferrer">{business.contacts.alternativeDisplay}</a><span>{business.social.instagramUsername}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AR Printing. All rights reserved.</span><span>MADE WITH A LITTLE EXTRA INK <b>✳</b></span></div><div className="website-credit"><strong>Website designed and developed by Darling Digital</strong><span>Creative digital solutions for businesses.</span></div></footer>
}

function App() {
  return <><ScrollManager/><PageNavigation/><main><Routes><Route path="/" element={<HomePage/>}/><Route path="/products" element={<ProductsPage/>}/><Route path="/price-list" element={<PriceListPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<HomePage/>}/></Routes></main><SiteFooter/><WaLink className="mobile-sticky"><MessageCircle size={18}/> Order on WhatsApp</WaLink></>
}

function PriceGroup({ title, items }: { title: string; items: string[][] }) { return <div className="price-group"><div className="price-group-title"><h2>{title}</h2><span>PRICES IN ZAR</span></div>{items.map(([item, price])=><div className="price-row" key={item}><span>{item}</span><b>{price}</b></div>)}</div> }
function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) { return <article className="step"><span className="step-number">{n}</span><div><h3>{title}</h3><p>{children}</p></div><ArrowRight className="step-arrow"/></article> }
export default App
