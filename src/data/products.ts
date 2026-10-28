export type Product = { id: string; name: string; category: 'Apparel' | 'Drinkware' | 'Other printing'; price?: string; description: string; visual: string; image?: string }
export const priceGroups = [
  { title: 'Apparel', items: [['Kids T-shirts', 'R130'], ['T-shirts XS–M', 'R220'], ['T-shirts L–XXL', 'R250'], ['Golf shirts', 'From R250+'], ['Hoodies', 'R350'], ['Tote bags', 'R120'], ['Baby grows', 'R100']] },
  { title: 'Drinkware', items: [['Coffee mugs', 'From R80'], ['20 oz vacuum cups', 'R250'], ['750 ml metal water bottles', 'R180'], ['Glass jars with straw', 'R80']] },
  { title: 'Other printing', items: [['Keyrings', 'R35'], ['A4 prints', 'R60'], ['Branded bottled water · 500 ml', 'R16 / bottle']] }
]
export const products: Product[] = [
  { id: 'kids-tee', name: 'Kids T-shirts', category: 'Apparel', price: 'R130', description: 'Full-front or full-back print, made personal for little ones.', visual: 'tee', image: 'images/products/kids-tshirt.png' },
  { id: 'adult-tee', name: 'Adult T-shirts', category: 'Apparel', price: 'R220–R250', description: 'Your artwork on a tee. XS–M R220 · L–XXL R250.', visual: 'tee', image: 'images/products/adult-tshirt.png' },
  { id: 'golf-shirt', name: 'Golf shirts', category: 'Apparel', price: 'From R250+', description: 'A smart fit for teams, workwear and events.', visual: 'polo', image: 'images/products/golf-shirt.png' },
  { id: 'hoodie', name: 'Hoodies', category: 'Apparel', price: 'R350', description: 'A cosy layer with your design front and centre.', visual: 'hoodie', image: 'images/products/hoodie.png' },
  { id: 'tote', name: 'Tote bags', category: 'Apparel', price: 'R120', description: 'A practical everyday bag with a custom touch.', visual: 'tote', image: 'images/products/tote-bag.png' },
  { id: 'baby-grow', name: 'Baby grows', category: 'Apparel', price: 'R100', description: 'A little something made especially for them.', visual: 'baby', image: 'images/products/baby-grow.png' },
  { id: 'mug', name: 'Coffee mugs', category: 'Drinkware', price: 'From R80', description: 'Personalised mugs; pricing depends on the design.', visual: 'mug', image: 'images/products/coffee-mug.png' },
  { id: 'vacuum-cup', name: '20 oz vacuum cups', category: 'Drinkware', price: 'R250', description: 'A custom cup for commutes, desks and gifting.', visual: 'cup', image: 'images/products/vacuum-cup.png' },
  { id: 'bottle', name: '750 ml metal water bottles', category: 'Drinkware', price: 'R180', description: 'Reusable metal drinkware with your branding.', visual: 'bottle', image: 'images/products/metal-water-bottle.png' },
  { id: 'glass-jar', name: 'Glass jars with straw', category: 'Drinkware', price: 'R80', description: 'A personalised glass for sunny days and gifting.', visual: 'jar', image: 'images/products/glass-jar.png' },
  { id: 'keyring', name: 'Keyrings', category: 'Other printing', price: 'R35', description: 'A small keepsake or branded giveaway.', visual: 'keyring', image: 'images/products/keyring.png' },
  { id: 'a4-prints', name: 'A4 prints', category: 'Other printing', price: 'R60', description: 'Bring your artwork and print it your way.', visual: 'print', image: 'images/products/a4-prints.png' },
  { id: 'water', name: 'Branded bottled water · 500 ml', category: 'Other printing', price: 'R16 / bottle', description: 'Branded water for events; ask about case quantities.', visual: 'water', image: 'images/products/branded-water-bottle.png' },
  { id: 'custom', name: 'Other custom printing', category: 'Other printing', description: 'Have another idea? Tell us what you have in mind.', visual: 'custom', image: 'images/products/other-custom-printing.png' }
]
