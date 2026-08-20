import {
  PRODUCT_IMAGES,
  PRODUCT_CATEGORIES,
  getCategoryProducts,
  type ProductImage,
  type CategorySlug,
  ID_TO_SLUG,
} from './products';

export interface ProductSpecs {
  material: string;
  finish: string;
  thickness: string;
  color: string;
  origin: string;
  availableSizes: string[];
  applications: string[];
  surfaceFinish: string;
  durability: string;
  maintenance: string;
}

export interface ProductDetail {
  product: ProductImage;
  slug: string;
  url: string;
  shortDescription: string;
  overview: string;
  applicationsText: string;
  benefits: string;
  maintenance: string;
  quality: string;
  finish: string;
  uses: string;
  longDescription: string;
  specs: ProductSpecs;
  features: string[];
  advantages: string[];
  gallery: ProductImage[];
  relatedProducts: ProductImage[];
  faq: { q: string; a: string }[];
}

export const CATEGORY_WORDS: Record<CategorySlug, { adjectives: string[]; regions: string[]; finishes: string[]; surfaces: string[]; applications: string[]; durability: string[]; maintenance: string[]; }> = {
  'natural-stones': {
    adjectives: ['Elegant', 'Pristine', 'Luminous', 'Timeless', 'Exquisite', 'Prized', 'Rare', 'Classic', 'Refined', 'Natural'],
    regions: ['Makrana, Rajasthan', 'Rajnagar, Rajasthan', 'Carrara, Italy', 'Statuario Quarries, Tuscany', 'Katni, Madhya Pradesh', 'Ambaji, Gujarat', 'South India Granite Belt', 'Kota Blue Belt', 'Jaisalmer Golden Reserves'],
    finishes: ['Polished Gloss', 'Honed Matte', 'Leathered', 'Brushed', 'Mirror Polish', 'Antique Finish', 'Flamed'],
    surfaces: ['Cool veined surface', 'Glossy crystalline top', 'Silky honed face', 'Mirror-reflective polish', 'Matte velvety finish'],
    applications: ['Luxury villa flooring', 'Palace staircases', 'Five-star hotel lobbies', 'Designer kitchen countertops', 'Bathroom vanity cladding', 'Temple construction', 'Accent wall cladding', 'Resort reception areas'],
    durability: ['Grade-A quarry blocks', 'Dolomitic-reinforced density', 'Crack-resistant matrix', 'Premium select grade'],
    maintenance: ['Weekly pH-neutral cleaner', 'Monthly stone sealer re-application', 'Dry microfibre buffing', 'Avoid acidic spills'],
  },
  'marble-architectural-products': {
    adjectives: ['Monumental', 'Load-Bearing', 'Classical-Proportion', 'Hand-Carved', 'Structural', 'Atelier-Sculpted', 'Colonnade-Grade', 'Heritage', 'Arcuated', 'Pedestal'],
    regions: ['Makrana white blocks', 'Dhrangadhra sandstone columns', 'Jaisalmer yellow heritage blocks', 'Rajnagar creamy beds', 'Bansi pink Rajasthan'],
    finishes: ['Architectural Honed', 'Heritage Tooled', 'Classical Carved', 'Weathered Cornice', 'Hand-Rubbed Waxed'],
    surfaces: ['Entasis-tapered column', 'Hand-carved Corinthian capital', 'Floral lattice jaali', 'Keystone-arched voussoir'],
    applications: ['Colonnade portico', 'Palace balustrade railing', 'Heritage cornice & frieze', 'Temple mandir work', 'Gate pillar & capital', 'Arched door surround', 'Building facade cladding', 'Gazebo and pavilion construction'],
    durability: ['Load-test certified', 'Earthquake zone compatible', 'Century-proof structural bed', 'Mortar-compatible stone'],
    maintenance: ['Lime mortar pointing only', 'Heritage conservation wash', 'Cap flashing inspection yearly', 'Annual structural review'],
  },
  'home-interior-products': {
    adjectives: ['Atelier-Carved', 'Hand-Sculpted', 'Heritage-Inspired', 'Artisan', 'Bespoke', 'Elegant', 'Museum-Quality', 'Signature', 'Monolithic-Cut', 'Luxury'],
    regions: ['Jaipur stone ateliers', 'Rajasthan master carvers', 'Agra Pietra Dura heritage', 'Makrana artisans', 'Mumbai bespoke studios', 'Carrara, Italy'],
    finishes: ['Hand-Polished Waxed', 'Carved Relief Gloss', 'Pietra-Dura Inlaid', 'Mirror-Gloss Vanity', 'Single-Block Seamless'],
    surfaces: ['Single-block seamless bowl', 'Hand-rubbed beeswax patina', 'Pietra dura semi-precious inlay', 'Monolithic furniture top', 'Integrated vanity basin'],
    applications: ['Open-plan dining areas', 'Drawing room center tables', 'Foyer console displays', 'Master bathroom suites', 'Powder room wash basins', 'Living room fireplace surrounds', 'Indoor planters', 'Decorative shelf displays'],
    durability: ['Reinforced interior-grade block', 'Steel core for furniture pieces', 'Conservation-grade finishes', 'Heat-retentive stone mass'],
    maintenance: ['Annual beeswax treatment', 'Inlay-specific microfibre care', 'Avoid direct heat surfaces', 'Non-acidic weekly cleaning'],
  },
  'temple-religious-products': {
    adjectives: ['Sacred', 'Devotional', 'Temple-Grade', 'Reverent', 'Hand-Carved', 'Spiritual', 'Heritage', 'Blessed', 'Shilpakar-Crafted', 'Sanctum'],
    regions: ['Makrana marble mandir artisans', 'Jaipur temple carving guilds', 'Rajasthan Shilpakar families', 'Agra stone inlay heritage', 'Vrindavan temple studios'],
    finishes: ['Temple-Grade Hand-Rubbed', 'Deity-Idol Polish', 'Sacred Carved Relief', 'Pietra-Dura Inlaid', 'Traditional White Marble Waxed'],
    surfaces: ['Sanctum garbagriha finish', 'Hand-sculpted deity murti', 'Sacred mantra inlay carving', 'Mandir shikhar dome', 'Pooja room carved backdrop'],
    applications: ['Home mandir construction', 'Public exterior temple buildings', 'Deity statue installation', 'God idol carving workshop', 'Pooja room interior fit-out', 'Temple carved doorways', 'Yantra and decorative panels'],
    durability: ['Temple-grade structural block', 'Sacred carving preservation finish', 'Century-proof devotional work', 'Reinforced load-bearing columns'],
    maintenance: ['Daily sacred water wipe', 'Weekly marble pooja cleaning', 'Annual devotional sealant treatment', 'Avoid harsh chemicals near sacred carvings'],
  },
  'garden-outdoor-products': {
    adjectives: ['Garden-Crafted', 'Weather-Patinated', 'Alpine-Heavy', 'Cascade-Ready', 'Parkland', 'Zen', 'Ornamental', 'Terraced', 'Bespoke-Garden', 'Landscape'],
    regions: ['Jodhpur red sandstone blocks', 'Mint sandstone tiers', 'Yellow Jaisalmer carvings', 'Rajasthan heritage granite', 'Makrana outdoor grade marble'],
    finishes: ['Weathered Patina', 'Heritage-Tumbled', 'Flamed Non-Slip', 'Hand-Carved Water Jet', 'Monsoon-Sealed Exterior'],
    surfaces: ['Hand-sculpted basin cascade', 'Tumbled cobblestone texture', 'Monolithic bench top', 'Bird bath bowl interior', 'Landscaping stone face'],
    applications: ['Multi-tier garden fountain', 'Water feature installation', 'Garden seating areas', 'Ornamental bird bath', 'Outdoor patio dining sets', 'Driveway landscaping stones', 'Zen garden accents'],
    durability: ['Monsoon and frost tested', 'Algae-resistant sealant', 'UV-stable mineral bed', 'Heavy vehicle load rated'],
    maintenance: ['Pressure wash bi-annually', 'Weed inhibitor between joints', 'Pump & filter winter drain', 'Annual outdoor sealant coat'],
  },
  'carved-stone-collection': {
    adjectives: ['Master-Carved', 'Sculptural', 'Atelier-Grade', 'Shilpakar-Handmade', 'Figurative', 'Gallery-Quality', 'Museum-Finish', 'Fine-Art', 'Custom-Commission', 'Hand-Relief'],
    regions: ['Jaipur stone carving ateliers', 'Rajasthan master sculptor guilds', 'Agra Pietra Dura heritage studios', 'Makrana marble sculpture house', 'Dholpur sandstone carvers'],
    finishes: ['Museum-Grade Hand-Rubbed', 'Fine-Relief Polished', 'Figurative Sculpture Waxed', 'Pietra Dura Inlaid Finish', 'Hand-Carved Signature Patina'],
    surfaces: ['Hand-carved relief panel', 'Figurative sculptural contour', 'Animal figure lifelike detail', 'Stone carving chisel texture', 'Fine floral filigree carving'],
    applications: ['Private art collection display', 'Home sculpture garden', 'Gallery wall relief panels', 'Corporate lobby signature art', 'Luxury villa statement pieces', 'Custom design commissions', 'Heritage decorative inlay'],
    durability: ['Museum-grade carving preservation', 'UV-stable colour treatment', 'Conservation-quality finish', 'Solid single-block sculpture'],
    maintenance: ['Dry soft-brush dusting only', 'Annual conservation-grade wax', 'Avoid abrasive cleaning on carved detail', 'Indoor display recommended for best preservation'],
  },
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededPick<T>(arr: T[], seed: number, salt = 0): T {
  const s = (seed + salt * 2654435761) >>> 0;
  return arr[s % arr.length];
}

function seededMulti<T>(arr: T[], seed: number, count: number, saltOffset = 0): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  let i = 0;
  while (result.length < count && used.size < arr.length) {
    const idx = (seed + (i + saltOffset) * 2654435761) >>> 0;
    const mod = idx % arr.length;
    if (!used.has(mod)) {
      used.add(mod);
      result.push(arr[mod]);
    }
    i++;
  }
  return result;
}

const SIZES_POOL = [
  '300 × 300 mm',
  '305 × 305 mm (1×1 ft)',
  '400 × 400 mm',
  '600 × 300 mm',
  '600 × 600 mm (2×2 ft)',
  '600 × 900 mm',
  '800 × 800 mm',
  '900 × 600 mm',
  '1200 × 600 mm (4×2 ft)',
  '1800 × 900 mm (6×3 ft)',
  '2400 × 1200 mm Gangsaw Slab',
  'Custom Gangsaw 3200 × 2000 mm',
  'Custom Cut to Size',
];

const THICKNESS_POOL = [
  '15 mm Standard',
  '18 mm Architectural',
  '20 mm Premium',
  '25 mm Countertop Grade',
  '30 mm Heavy Duty',
  '40 mm Bullnose Step Tread',
  '50 mm Driveway Paver',
  '100–150 mm Custom Monolithic',
  'Custom Thickness On Request',
];

const COLOR_PALETTE: Record<CategorySlug, string[]> = {
  'natural-stones': ['Pure Makrana White with Subtle Grey Veining', 'Rajnagar Cream with Gold River', 'Carrara Italian Grey-Blue Veins', 'Statuario Bold Cloudy Veins', 'Katni Multi-Rainbow Vein', 'Ambaji Pure White', 'South India Absolute Black Granite', 'Kota Deep Ocean Blue Limestone', 'Jaisalmer Royal Gold Sandstone', 'Forest Green Marble with Emerald Veins'],
  'marble-architectural-products': ['Makrana Pure White Column', 'Jaisalmer Desert Gold Heritage', 'Dhrangadhra Sandstone Buff', 'Rajnagar Cream Railing', 'Bansi Pink Rajasthan', 'Red Sandstone Agra Fort', 'Kota Blue Structural Base', 'Banswara White Marble', 'Kerala Black Granite Pillar', 'Yellow Limestone Cladding'],
  'home-interior-products': ['Makrana Snapshot Pure White', 'Rajnagar Warm Cream', 'Italian Statuario Subtle Vein', 'Rainforest Green Inlay', 'Pietra Dura Multi-Colour Inlay', 'Makrana Gold Line Accent', 'Carrara Soft Grey Vein', 'Onyx Translucent Top', 'Calacatta Gold River', 'Walnut Brown Burl Inlay Table'],
  'temple-religious-products': ['Sacred Makrana Pure White', 'Traditional Temple Cream', 'Pietra Dura Multi-Inlay Sacred', 'Makrana Gold Line Accent', 'Temple Red Stone Inlay', 'Sanctum White Marble Shikhar', 'Vrindavan Light Cream', 'Sacred Saffron Inlay Border', 'Deity Idol Polish White', 'Jain Mandir Gold-Flecked White'],
  'garden-outdoor-products': ['Weathered Jaisalmer Yellow', 'Jodhpur Desert Red Sandstone', 'Mint Breeze Cool Green Sandstone', 'Sahara Beige Heritage', 'Cobblestone Heritage Grey Granite', 'Fountain Sandstone Rainbow', 'Kerala Black Granite Kerbstone', 'Pink Sandstone Coping', 'Rainbow Multi-Tone Paver', 'Monsoon-Sealed Teak Brown'],
  'carved-stone-collection': ['Pietra Dura Multi-Colour Inlay', 'Makrana White with Lapis Lazuli Inlay', 'Rose Quartz Pink Inlay Carving', 'Malachite Emerald Green Relief', 'Carnelian Red-Orange Inlay', 'Turquoise Blue Gemstone Inlay', 'Amethyst Royal Purple Panel', 'Black Marble with White Relief Carving', 'Mother-of-Pearl Iridescent Inlay', 'Multi-Stone Floral Filigree Carving'],
};

const ORIGIN_POOL: Record<CategorySlug, string[]> = {
  'natural-stones': ['Makrana, Rajasthan', 'Rajnagar, Rajasthan', 'Carrara, Italy', 'Statuario Quarries, Tuscany', 'Katni, Madhya Pradesh', 'Ambaji, Gujarat', 'South India Granite Belt', 'Kota Blue Belt', 'Jaisalmer Golden Reserves'],
  'marble-architectural-products': ['Makrana white blocks', 'Dhrangadhra sandstone columns', 'Jaisalmer yellow heritage blocks', 'Rajnagar creamy beds', 'Bansi pink Rajasthan'],
  'home-interior-products': ['Jaipur stone ateliers', 'Rajasthan master carvers', 'Agra Pietra Dura heritage', 'Makrana artisans', 'Mumbai bespoke studios', 'Carrara, Italy'],
  'temple-religious-products': ['Makrana marble mandir artisans', 'Jaipur temple carving guilds', 'Rajasthan Shilpakar families', 'Agra stone inlay heritage', 'Vrindavan temple studios'],
  'garden-outdoor-products': ['Jodhpur red sandstone blocks', 'Mint sandstone tiers', 'Yellow Jaisalmer carvings', 'Rajasthan heritage granite', 'Makrana outdoor grade marble'],
  'carved-stone-collection': ['Jaipur stone carving ateliers', 'Rajasthan master sculptor guilds', 'Agra Pietra Dura heritage studios', 'Makrana marble sculpture house', 'Dholpur sandstone carvers'],
};

const FAQ_POOL = {
  questions: [
    'What is the typical lead time for a custom order?',
    'Do you offer installation services pan-India?',
    'Can I request a sample slab before placing the full order?',
    'How do I protect my natural stone from staining?',
    'Is the product covered under warranty?',
    'Can you match a specific stone from a reference image?',
    'Do you export internationally?',
    'What thickness should I choose for heavy commercial use?',
    'Are custom sizes and edge profiles supported?',
    'How is the product packaged to avoid transit damage?',
  ],
  answers: [
    'Most standard selections dispatch within 10–15 working days; custom hand-carved pieces and temple projects typically complete in 3–6 weeks depending on complexity. An exact timeline is confirmed upon order confirmation with full drawings.',
    'Yes, we deploy factory-trained installation teams across all major Indian metros and tier-1 cities; for tier-2 and international sites we provide supervised installation through our certified partner network.',
    'Absolutely — we offer paid sample kits for commercial projects and complimentary swatches on confirmation of interest for residential projects. Sample cost is adjusted against your final invoice.',
    'We recommend an annual application of premium impregnating sealer, weekly cleaning with a pH-neutral stone soap, and immediate blotting of acidic spills such as wine, citrus, or vinegar to preserve the polish indefinitely.',
    'Every order carries a 1-year workmanship warranty against manufacturing defects plus the natural stone\'s own structural guarantee; stone sealers and after-care products carry their manufacturer warranty.',
    'Yes. Our material consultants can match any reference within 0.5 Delta E colour tolerance. For rare imported slabs allow 3–4 additional weeks for quarry sourcing.',
    'We export to the GCC, UK, EU, USA, Canada, APAC and Africa via insured sea freight, with FOB/CIF/Door delivery options. Minimum export order quantities apply per SKU.',
    'For residential flooring 15–18 mm is standard; commercial lobbies specify 20–25 mm; driveway and plaza pavers require 40–50 mm thick material; kitchen countertops are finished at 25–30 mm with bullnose edge.',
    'Custom sizes, book-matched slabs, book-matched floor layouts, CNC-milled edge profiles (bullnose, bevel, dupont, ogee, pencil round), carved reliefs and water-jet inlays are all in-house capabilities.',
    'Slabs ship in foam-cushioned wooden crates with corner protectors and polyfoam interleaving. Export orders include ISPM-15 fumigated pallets, insurance certificate and weatherproof wrapping.',
  ],
};

const FEATURE_TEMPLATES = [
  'Hand-selected from %REGION% grade-A quarry blocks',
  '%FINISH% finish for premium visual and tactile quality',
  'Water-jet and diamond-cut dimensional tolerances of ±0.5 mm',
  'Book-matched and vein-matched slab sequencing available',
  'Certified by geological labs for structural integrity',
  'UV-stable mineral formulation for fade-free longevity',
  'Low-porosity, stain-resistant premium %MAT%',
  'Hand-finished by 3rd-generation master artisans',
  'Gangsaw-calibrated thickness across entire batch',
  'Available with Bullnose, Bevel, Ogee & Dupont edge profiles',
  'Environmentally quarried with sustainable rehabilitation',
  'Factory-applied first coat of penetrating sealant included',
];

const ADVANTAGE_TEMPLATES = [
  'Delivers 3–5× longer service life than vitrified tile alternatives',
  'Increases property valuation through timeless heritage-grade material',
  'Patina improves with age, unlike manufactured surfaces',
  'One-time capital cost, no periodic replacement budget',
  'Health-safe, food-contact and indoor air quality friendly',
  'Zero-VOC natural product; no chemical off-gassing',
  'Repairable surface; re-polish restores factory finish',
  'Thermal mass lowers HVAC energy consumption in extreme climates',
  'Signature material for luxury brand differentiation',
  'Fully customizable for bespoke architectural briefs',
];

function buildShortDescription(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const a = seededPick(catWords.adjectives, seed, 1);
  const b = seededPick(catWords.adjectives, seed, 2);
  const r = seededPick(catWords.regions, seed, 3);
  const f = seededPick(catWords.finishes, seed, 4);
  return `${a} ${b} ${product.name} sourced from ${r} with a luxurious ${f} finish and hand-curated veining for premium interior and architectural installations.`;
}

function buildOverview(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const a1 = seededPick(catWords.adjectives, seed, 1);
  const a2 = seededPick(catWords.adjectives, seed, 7);
  const reg = seededPick(catWords.regions, seed, 11);
  const fin = seededPick(catWords.finishes, seed, 13);
  const surf = seededPick(catWords.surfaces, seed, 17);
  return `${product.name} is an ${a1}, ${a2} natural stone selection quarried and hand-finished at ${reg}. It arrives with a signature ${fin} that reveals a ${surf}, with every block inspected by geological technicians for structural purity, veining consistency, and colour uniformity before entering our production line. Each slab is calibrated to exacting millimetre tolerances on our gangsaw line and hand-checked a second time before dispatch. This is not a commodity tile; it is a permanent investment in your project\u2019s architectural legacy, valued for the way its mineral character quietly deepens with every passing year and gains a patina that manufactured surfaces cannot replicate.`;
}

function buildApplicationsText(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const apps = seededMulti(catWords.applications, seed, 5, 23);
  const a3 = seededPick(catWords.adjectives, seed, 29);
  return `${product.name} is engineered for uncompromising service across the most demanding interior and exterior environments. Its portfolio includes ${apps[0]}, ${apps[1]}, ${apps[2]}, ${apps[3]}, and ${apps[4]} \u2014 all settings where the ${a3} character of the stone becomes a permanent signature. Architectural specifiers select it for five-star hotel public areas, celebrity residences, palatial religious buildings, embassies and consulates, high-end retail flagships, ultra-luxury spa and wellness zones, jewellery showrooms, and every venue that rewards a material whose value increases the longer it is in place rather than degrading with use.`;
}

function buildBenefits(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const dur = seededPick(catWords.durability, seed, 31);
  const fin = seededPick(catWords.finishes, seed, 37);
  const adv = seededMulti(ADVANTAGE_TEMPLATES, seed, 3, 41).map((t) => t.replace(/%MAT%/g, product.category).replace(/%REGION%/g, seededPick(catWords.regions, seed, 1)).replace(/%FINISH%/g, fin));
  return `Benefits begin with the inherent qualities of the stone itself \u2014 ${dur}, ${fin.toLowerCase()} optics, and the knowledge that every square foot is a one-of-a-kind geological record. ${adv[0]}. ${adv[1]}. ${adv[2]}. For specifiers, project owners, and homeowners alike this means lower total cost of ownership, better resale value at appraisal, a healthier indoor environment, and interiors that photograph beautifully across every lighting temperature.`;
}

function buildMaintenance(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const steps = seededMulti(catWords.maintenance, seed, 3, 53);
  const extra = seededMulti(
    ['Weekly buffing with a microfibre cloth preserves the polish film for years',
      'Wipe spills immediately with a dry absorbent cloth to prevent capillary staining',
      'Renew the seal coat every 12 months for interior surfaces and every 6 months for exteriors',
      'Avoid abrasive scouring pads and cleaning products containing lemon, vinegar, or bleach',
      'Use felt pads under heavy furniture legs to prevent micro-scratches on the polish film',
    ],
    seed, 2, 55,
  );
  return `Caring for ${product.name} is straightforward and rewards consistency. ${steps[0]}; ${steps[1]}; ${steps[2]}. ${extra[0]}. ${extra[1]}. A factory-applied first coat of premium penetrating sealer is included with every delivery, along with a printed after-care card and a 50 ml sample of the exact stone soap we recommend for ongoing maintenance; this removes the guesswork and keeps the stone looking as it did on installation day for decades.`;
}

function buildQuality(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const reg = seededPick(catWords.regions, seed, 61);
  const dur = seededPick(catWords.durability, seed, 67);
  return `Quality assurance begins at ${reg}, where our geologists select only the top 12% of blocks from each quarry extraction, rejecting any material with visible fissures, unstable mineral pockets, or inconsistent veining out of character for the ${product.category} collection. Every ${product.name} piece is then staged through an 11-point QC protocol that includes dimensional verification, water-absorption testing, ${dur} validation, polish brightness measurement, chemical-resistance testing, and a final visual inspection by a senior artisan. QC reports and geological certificates are available on request for commercial, hospitality, and government tender projects, giving every stakeholder documented confidence in the material specification.`;
}

function buildFinish(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const fins = seededMulti(catWords.finishes, seed, 4, 71);
  const surf = seededPick(catWords.surfaces, seed, 73);
  return `${product.name} is supplied in a hand-curated menu of surface treatments \u2014 ${fins[0]}, ${fins[1]}, ${fins[2]}, and ${fins[3]} \u2014 with every finish engineered to bring out the best of the stone\u2019s mineral character. The ${fins[0]} option delivers the signature ${surf} that has made this material iconic for luxury residences. The ${fins[1]} option is preferred for slip-resistant flooring and al-fresco installations. The ${fins[2]} option introduces light texture ideal for heritage restoration, while the ${fins[3]} is most popular for contemporary bathroom and wellness zones. Custom finishes, including CNC-textured surfaces and book-matched pairs, are available by quotation.`;
}

function buildUses(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  const apps = seededMulti(catWords.applications, seed, 6, 83);
  const a = seededPick(catWords.adjectives, seed, 89);
  return `In practice, ${product.name} finds its home wherever a ${a}, long-lasting statement is required. Think ${apps[0]}, ${apps[1]}, ${apps[2]}, ${apps[3]}, ${apps[4]}, ${apps[5]}; hospitality back-of-house and front-of-house accents; high-fashion retail flooring and display plinths; jewellery showrooms and watch boutiques; private art galleries and museums; elevator lobbies and penthouse foyers; cruise-ship interior fit-outs; diplomatic and government buildings; and private residences of every scale where the owner wants the interior to carry a weight of permanence, provenance, and beauty that only the best natural stone can provide.`;
}

function buildSpecs(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): ProductSpecs {
  const colors = COLOR_PALETTE[product.categorySlug];
  const origins = ORIGIN_POOL[product.categorySlug];
  return {
    material: `${product.name} \u2014 ${product.category}`,
    finish: seededMulti(catWords.finishes, seed, 3, 101).join(' / '),
    thickness: seededMulti(THICKNESS_POOL, seed, 3, 103).join('; '),
    color: seededPick(colors, seed, 107),
    origin: seededPick(origins, seed, 109),
    availableSizes: seededMulti(SIZES_POOL, seed, 6, 113),
    applications: seededMulti(catWords.applications, seed, 5, 127),
    surfaceFinish: seededPick(catWords.surfaces, seed, 131),
    durability: seededPick(catWords.durability, seed, 137),
    maintenance: seededPick(catWords.maintenance, seed, 139),
  };
}

function buildFeatures(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string[] {
  const reg = seededPick(catWords.regions, seed, 149);
  const fin = seededPick(catWords.finishes, seed, 151);
  const pick = seededMulti(FEATURE_TEMPLATES, seed, 6, 153);
  return pick.map((t) => t.replace(/%REGION%/g, reg).replace(/%FINISH%/g, fin));
}

function buildAdvantages(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string[] {
  const fin = seededPick(catWords.finishes, seed, 167);
  const pick = seededMulti(ADVANTAGE_TEMPLATES, seed, 5, 173);
  return pick.map((t) => t.replace(/%MAT%/g, product.name).replace(/%REGION%/g, seededPick(catWords.regions, seed, 1)).replace(/%FINISH%/g, fin));
}

function buildGallery(product: ProductImage, seed: number): ProductImage[] {
  const sameCategory = getCategoryProducts(product.categorySlug).filter((p) => p.id !== product.id);
  const similarByName = sameCategory.filter((p) => {
    const tokensA = new Set(product.name.toLowerCase().split(/\s+/));
    const tokensB = new Set(p.name.toLowerCase().split(/\s+/));
    let overlap = 0;
    tokensA.forEach((t) => {
      if (tokensB.has(t)) overlap++;
    });
    return overlap >= 1;
  });
  if (similarByName.length > 0) {
    const extras = seededMulti(similarByName, seed, 3, 191);
    return [product, ...extras];
  }
  const extras = seededMulti(sameCategory, seed, 3, 193);
  return [product, ...extras];
}

function buildRelated(product: ProductImage, seed: number): ProductImage[] {
  const same = getCategoryProducts(product.categorySlug).filter((p) => p.id !== product.id);
  const picked = seededMulti(same, seed, 4, 211);
  if (picked.length >= 4) return picked;
  const others: ProductImage[] = [];
  for (const cat of PRODUCT_CATEGORIES) {
    if (cat.slug === product.categorySlug) continue;
    const list = getCategoryProducts(cat.slug);
    if (list[0]) others.push(list[0]);
    if (others.length + picked.length >= 4) break;
  }
  return [...picked, ...others].slice(0, 4);
}

function buildFaq(seed: number): { q: string; a: string }[] {
  const idxs = seededMulti(
    FAQ_POOL.questions.map((_, i) => i),
    seed,
    4,
    223,
  );
  return idxs.map((i) => ({ q: FAQ_POOL.questions[i], a: FAQ_POOL.answers[i] }));
}

function buildLongDescription(product: ProductImage, catWords: typeof CATEGORY_WORDS[CategorySlug], seed: number): string {
  return [
    buildOverview(product, catWords, seed),
    buildApplicationsText(product, catWords, seed),
    buildBenefits(product, catWords, seed),
    buildMaintenance(product, catWords, seed),
    buildQuality(product, catWords, seed),
    buildFinish(product, catWords, seed),
    buildUses(product, catWords, seed),
  ].join('\n\n');
}

interface BuildResult {
  details: Map<string, ProductDetail>;
  byId: Record<string, ProductDetail>;
  bySlug: Record<string, ProductDetail>;
}

function buildAllDetails(): BuildResult {
  const details = new Map<string, ProductDetail>();
  const byId: Record<string, ProductDetail> = {};
  const bySlug: Record<string, ProductDetail> = {};
  const usedSlugs = new Set<string>();

  for (const product of PRODUCT_IMAGES.products) {
    const seed = hashString(product.id);
    const catWords = CATEGORY_WORDS[product.categorySlug];
    let slug: string;
    if (ID_TO_SLUG && ID_TO_SLUG[product.id]) {
      slug = ID_TO_SLUG[product.id];
    } else {
      const baseSlug = slugify(product.name);
      slug = baseSlug;
      let suffix = 2;
      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix++;
      }
      usedSlugs.add(slug);
    }

    const d: ProductDetail = {
      product,
      slug,
      url: `/products/${slug}`,
      shortDescription: buildShortDescription(product, catWords, seed),
      overview: buildOverview(product, catWords, seed),
      applicationsText: buildApplicationsText(product, catWords, seed),
      benefits: buildBenefits(product, catWords, seed),
      maintenance: buildMaintenance(product, catWords, seed),
      quality: buildQuality(product, catWords, seed),
      finish: buildFinish(product, catWords, seed),
      uses: buildUses(product, catWords, seed),
      longDescription: buildLongDescription(product, catWords, seed),
      specs: buildSpecs(product, catWords, seed),
      features: buildFeatures(product, catWords, seed),
      advantages: buildAdvantages(product, catWords, seed),
      gallery: buildGallery(product, seed),
      relatedProducts: buildRelated(product, seed),
      faq: buildFaq(seed),
    };
    details.set(product.id, d);
    byId[product.id] = d;
    bySlug[d.slug] = d;
  }

  return { details, byId, bySlug };
}

const BUILT = buildAllDetails();

export const PRODUCT_DETAILS = BUILT.details;
export const PRODUCT_DETAILS_BY_ID: Record<string, ProductDetail> = BUILT.byId;
export const PRODUCT_DETAILS_BY_SLUG: Record<string, ProductDetail> = BUILT.bySlug;
export const PRODUCT_DETAIL_COUNT = PRODUCT_IMAGES.products.length;

export function getProductDetailById(id: string): ProductDetail | undefined {
  return BUILT.byId[id];
}

export function getProductDetailBySlug(slug: string): ProductDetail | undefined {
  return BUILT.bySlug[slug];
}

export function getProductSlug(id: string): string | null {
  return BUILT.byId[id]?.slug ?? null;
}

export function listRelatedProducts(slug: string, limit = 4): ProductDetail[] {
  const self = BUILT.bySlug[slug];
  if (!self) return [];
  return self.relatedProducts
    .map((p) => BUILT.byId[p.id])
    .filter((v): v is ProductDetail => Boolean(v))
    .slice(0, limit);
}

export function getProductUrl(id: string): string | null {
  const slug = getProductSlug(id);
  return slug ? `/products/${slug}` : null;
}
