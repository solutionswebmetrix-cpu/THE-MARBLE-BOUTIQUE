const productImages = import.meta.glob('@/assets/product/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const naturalStoneImages = import.meta.glob('@/assets/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export type CategorySlug =
  | 'natural-stones'
  | 'marble-architectural-products'
  | 'home-interior-products'
  | 'temple-religious-products'
  | 'garden-outdoor-products'
  | 'carved-stone-collection';

export type CategoryName =
  | 'Natural Stones'
  | 'Marble Architectural & Building Products'
  | 'Home & Interior Products'
  | 'Temple & Religious Products'
  | 'Garden & Outdoor Products'
  | 'Carved Stone Collection';

export interface ProductImage {
  id: string;
  filename: string;
  name: string;
  src: string;
  category: CategoryName;
  categorySlug: CategorySlug;
}

export interface ProductCategory {
  slug: CategorySlug;
  order: number;
  name: CategoryName;
  shortName: string;
  heroTitle: string;
  description: string;
  features: string[];
  accent: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'natural-stones',
    order: 1,
    name: 'Natural Stones',
    shortName: 'Natural Stones',
    heroTitle: 'Premium Natural Stone Collection',
    description:
      'A curated spectrum of the earth\'s most enduring natural stones — from the luminous veins of premium marble and crystalline depth of granite, to the warm earthiness of sandstone and timeless limestone. Each selection is quarried from heritage deposits, geologically inspected, and hand-finished to bring permanent, authentic beauty to every architectural and interior application.',
    features: [
      '4 distinct natural stone families in stock',
      'Indian heritage + premium imported selections',
      'Polished, honed, flamed & leathered finishes',
      'Custom slab and tile sizing available',
    ],
    accent: 'from-stone-100 to-stone-50',
  },
  {
    slug: 'marble-architectural-products',
    order: 2,
    name: 'Marble Architectural & Building Products',
    shortName: 'Architectural',
    heroTitle: 'Marble Architectural Elements',
    description:
      'Monumental marble architectural pieces that bring classical proportion, structural integrity, and timeless beauty to buildings of every scale. Hand-carved blocks, precision wall cladding, intricate jalis, sculpted columns, domes, balustrades, temple work, gazebos, pavilions, and facade systems — all engineered for permanent installation and finished by master artisans whose craft spans generations.',
    features: [
      'Load-tested structural marble components',
      'Hand-carved columns, jalis & capitals',
      'Custom gazebos, domes & pavilions',
      'Facade & exterior cladding systems',
    ],
    accent: 'from-amber-100 to-stone-50',
  },
  {
    slug: 'home-interior-products',
    order: 3,
    name: 'Home & Interior Products',
    shortName: 'Interior',
    heroTitle: 'Marble Home & Interior Collection',
    description:
      'Signature marble interior pieces that transform houses into homes of enduring elegance. From statement dining tables and refined coffee tables to sculptural consoles, integrated wash basins, freestanding bathtubs, hand-crafted fireplaces, planters, candle holders, and decorative objets d\'art — every piece is carved from a single premium block and hand-finished to atelier standard.',
    features: [
      'Single-block & custom-fabricated furniture',
      'Integrated vanity, basin & bathtub suites',
      'Hand-carved fireplace surrounds',
      'Decorative accents for every room',
    ],
    accent: 'from-emerald-50 to-stone-50',
  },
  {
    slug: 'temple-religious-products',
    order: 4,
    name: 'Temple & Religious Products',
    shortName: 'Temple',
    heroTitle: 'Sacred Marble Temple & Religious Craft',
    description:
      'Sacred marble craftsmanship created with reverence, devotion, and the same heritage techniques used to build India\'s most celebrated temples. From intimate home mandirs and sprawling exterior temples, to hand-sculpted deity statues, god idols, complete pooja rooms, carved temple doors, and decorative yantra panels — each piece is a devotional work of enduring spiritual significance.',
    features: [
      'Home & exterior marble temple construction',
      'Hand-sculpted deity statues & god idols',
      'Complete pooja room design & execution',
      'Carved doors, yantras & decorative panels',
    ],
    accent: 'from-yellow-100 to-amber-50',
  },
  {
    slug: 'garden-outdoor-products',
    order: 5,
    name: 'Garden & Outdoor Products',
    shortName: 'Outdoor',
    heroTitle: 'Marble Garden & Outdoor Living',
    description:
      'Extend the luxury of the home into the landscape with hand-crafted marble outdoor pieces designed to weather beautifully across decades. Multi-tier fountains, sculpted water features, heritage benches, garden chairs, bird baths, outdoor tables, and landscaping stones — each carved from weather-resistant natural stone and finished for outdoor permanence.',
    features: [
      'Multi-tier carved marble fountains',
      'Weather-sealed outdoor seating sets',
      'Bird baths, planters & landscape elements',
      'Monsoon & frost tested durability',
    ],
    accent: 'from-green-50 to-stone-50',
  },
  {
    slug: 'carved-stone-collection',
    order: 6,
    name: 'Carved Stone Collection',
    shortName: 'Carved',
    heroTitle: 'Hand-Carved Stone Atelier',
    description:
      'Museum-quality hand-carved stone art created by master shilpakars of Rajasthan. A collection of hand-carved marble reliefs, traditional stone carving art, free-standing marble sculptures, and lifelike animal figures — each piece is the result of months of patient chisel work, representing the highest level of contemporary stone carving craft available anywhere in India.',
    features: [
      '3rd-generation master artisan carvings',
      'Relief panels, sculptures & figurative work',
      'Custom subject & design commissions',
      'Museum-grade hand-finished detailing',
    ],
    accent: 'from-violet-100 to-amber-50',
  },
];

export const CATEGORY_ORDER: CategorySlug[] = PRODUCT_CATEGORIES
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((c) => c.slug);

const DEFAULT_IMG = Object.values(productImages)[0] || '';

const ALL_IMAGES_SRC: { path: string; src: string }[] = Object.entries({
  ...naturalStoneImages,
  ...productImages,
})
  .filter(([p]) => !/^banner[-_]/i.test(p.split('/').pop() || p))
  .map(([path, src]) => ({ path: path.toLowerCase(), src }));

const EXACT_PRODUCT_ASSETS: Record<string, string> = {
  Marble: 'Indian Marble.png',
  Granite: 'Granite.png',
  Sandstone: 'Indian Marble.png',
  Limestone: 'White Marble.png',
  'Marble Blocks': 'Marble Blocks.png',
  'Marble Wall Cladding': 'Marble Wall Cladding.png',
  'Marble Jali': 'Marble Jali.png',
  'Marble Columns': 'Marble Columns.png',
  'Marble Domes': 'Marble Domes.png',
  'Marble Balustrade': 'Marble Balustrade.png',
  'Marble Mandir / Temple Work': 'Marble Mandir  Temple Work.png',
  'Marble Gazebo': 'Marble Gazebo.png',
  'Marble Pavilions': 'Marble Pavilions.png',
  'Marble Facade / Exterior Cladding': 'Marble Facade  Exterior Cladding.png',
  'Marble Dining Table': 'Marble Dining Table.png',
  'Marble Coffee Table': 'Marble Coffee Table.png',
  'Marble Center Table': 'Marble Center Table.png',
  'Marble Side Table': 'Marble Side Table.png',
  'Marble Console Table': 'Marble Console table.png',
  'Marble Wash Basin': 'Marble Wash Basin.png',
  'Marble Bathtub': 'Marble Bathtub.png',
  'Marble Fireplace': 'Marble Fireplace.png',
  'Marble Planters': 'Marble Planters.png',
  'Marble Candle Holders': 'Marble Candle Holders.png',
  'Marble Decorative Items': 'Marble Decorative Items.png',
  'Home Marble Temple': 'Home Marble Temple.png',
  'Exterior Marble Temple': 'Exterior Marble Temple.png',
  'Marble Statue': 'Marble Statue.png',
  'Marble God Idols': 'Marble God Idols.png',
  'Marble Pooja Room': 'Marble Pooja Room.png',
  'Marble Carved Doors': 'Marble Carved Doors.png',
  'Marble Yantra & Decorative Panels': 'Marble Yantra & Decorative Panels.png',
  'Marble Fountain': 'Marble Fountain.png',
  'Marble Water Feature': 'Marble Water Feature.png',
  'Marble Benches': 'Marble Benches.png',
  'Marble Garden Chairs': 'Marble Garden Chairs.png',
  'Marble Bird Bath': 'Marble Bird Bath.png',
  'Marble Outdoor Tables': 'Marble Outdoor Tables.png',
  'Marble Landscaping Stones': 'Marble Landscaping Stones.png',
  'Hand Carved Marble': 'Hand Carved Marble.png',
  'Stone Carving Art': 'Stone Carving Art.png',
  'Marble Sculptures': 'Marble Sculptures.png',
  'Marble Animal Figures': 'Marble Animal Figures.png',
};

function imageForExact(filename: string): string | undefined {
  const normalizedFilename = filename.toLowerCase();
  return ALL_IMAGES_SRC.find((asset) => asset.path.endsWith(`/${normalizedFilename}`))?.src;
}

function imageFor(keys: string[], index = 0): string {
  const normalizedKeys = keys.map((key) => key.toLowerCase());
  const matches = ALL_IMAGES_SRC
    .map((asset) => ({
      ...asset,
      score: normalizedKeys.reduce((score, key, keyIndex) => {
        if (!asset.path.includes(key)) return score;
        return Math.max(score, (normalizedKeys.length - keyIndex) * 10 - asset.path.length / 1000);
      }, 0),
    }))
    .filter((asset) => asset.score > 0)
    .sort((a, b) => b.score - a.score);
  if (matches.length > 0) {
    return matches[index % matches.length].src;
  }
  return DEFAULT_IMG;
}

interface ProductDef {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  imageKeys: string[];
  imageIndex?: number;
}

const PRODUCT_DEFS: ProductDef[] = [
  { id: 'p-001', name: 'Marble', slug: 'marble', category: 'natural-stones', imageKeys: ['marble', 'makrana', 'katni', 'wonder'] },
  { id: 'p-002', name: 'Granite', slug: 'granite', category: 'natural-stones', imageKeys: ['granite', 'black galaxy', 'kashmir', 'absolute'] },
  { id: 'p-003', name: 'Sandstone', slug: 'sandstone', category: 'natural-stones', imageKeys: ['sandstone', 'teak', 'pink', 'mint'] },
  { id: 'p-004', name: 'Limestone', slug: 'limestone', category: 'natural-stones', imageKeys: ['limestone', 'kota', 'gold'] },
  { id: 'p-009', name: 'Marble Blocks', slug: 'marble-blocks', category: 'marble-architectural-products', imageKeys: ['marble', 'block', 'makrana'] },
  { id: 'p-010', name: 'Marble Wall Cladding', slug: 'marble-wall-cladding', category: 'marble-architectural-products', imageKeys: ['wall cladding', 'cladding', 'inlay'] },
  { id: 'p-011', name: 'Marble Jali', slug: 'marble-jali', category: 'marble-architectural-products', imageKeys: ['jali', 'inlay', 'pillar'] },
  { id: 'p-012', name: 'Marble Columns', slug: 'marble-columns', category: 'marble-architectural-products', imageKeys: ['pillar', 'column'] },
  { id: 'p-013', name: 'Marble Domes', slug: 'marble-domes', category: 'marble-architectural-products', imageKeys: ['dome', 'mandir', 'temple', 'gazebo'] },
  { id: 'p-014', name: 'Marble Balustrade', slug: 'marble-balustrade', category: 'marble-architectural-products', imageKeys: ['baluster', 'railling'] },
  { id: 'p-015', name: 'Marble Mandir / Temple Work', slug: 'marble-mandir-temple-work', category: 'marble-architectural-products', imageKeys: ['mandir', 'temple', 'luxury hand'] },
  { id: 'p-016', name: 'Marble Gazebo', slug: 'marble-gazebo', category: 'marble-architectural-products', imageKeys: ['gazebo'] },
  { id: 'p-017', name: 'Marble Pavilions', slug: 'marble-pavilions', category: 'marble-architectural-products', imageKeys: ['gazebo', 'pavilion'], imageIndex: 2 },
  { id: 'p-018', name: 'Marble Facade / Exterior Cladding', slug: 'marble-facade-exterior-cladding', category: 'marble-architectural-products', imageKeys: ['cladding', 'facade', 'pillar'] },

  { id: 'p-019', name: 'Marble Dining Table', slug: 'marble-dining-table', category: 'home-interior-products', imageKeys: ['table', 'onyx table', 'coffee table'] },
  { id: 'p-020', name: 'Marble Coffee Table', slug: 'marble-coffee-table', category: 'home-interior-products', imageKeys: ['coffee table'] },
  { id: 'p-021', name: 'Marble Center Table', slug: 'marble-center-table', category: 'home-interior-products', imageKeys: ['coffee table', 'center table'], imageIndex: 1 },
  { id: 'p-022', name: 'Marble Side Table', slug: 'marble-side-table', category: 'home-interior-products', imageKeys: ['coffee table', 'onyx table'], imageIndex: 1 },
  { id: 'p-023', name: 'Marble Console Table', slug: 'marble-console-table', category: 'home-interior-products', imageKeys: ['table', 'vanity', 'onyx'] },
  { id: 'p-024', name: 'Marble Wash Basin', slug: 'marble-wash-basin', category: 'home-interior-products', imageKeys: ['sink', 'wash basin', 'vanity'] },
  { id: 'p-025', name: 'Marble Bathtub', slug: 'marble-bathtub', category: 'home-interior-products', imageKeys: ['bathtub'] },
  { id: 'p-026', name: 'Marble Fireplace', slug: 'marble-fireplace', category: 'home-interior-products', imageKeys: ['fireplace'] },
  { id: 'p-027', name: 'Marble Planters', slug: 'marble-planters', category: 'home-interior-products', imageKeys: ['planter'] },
  { id: 'p-028', name: 'Marble Candle Holders', slug: 'marble-candle-holders', category: 'home-interior-products', imageKeys: ['decorative', 'inlay', 'candle'] },
  { id: 'p-029', name: 'Marble Decorative Items', slug: 'marble-decorative-items', category: 'home-interior-products', imageKeys: ['inlay', 'semi precious', 'decorative'] },

  { id: 'p-030', name: 'Home Marble Temple', slug: 'home-marble-temple', category: 'temple-religious-products', imageKeys: ['mandir', 'temple', 'luxury hand'] },
  { id: 'p-031', name: 'Exterior Marble Temple', slug: 'exterior-marble-temple', category: 'temple-religious-products', imageKeys: ['temple', 'mandir', 'gazebo'], imageIndex: 1 },
  { id: 'p-032', name: 'Marble Statue', slug: 'marble-statue', category: 'temple-religious-products', imageKeys: ['statue', 'sculpture', 'pillar'] },
  { id: 'p-033', name: 'Marble God Idols', slug: 'marble-god-idols', category: 'temple-religious-products', imageKeys: ['idol', 'statue', 'inlay', 'mandir'] },
  { id: 'p-034', name: 'Marble Pooja Room', slug: 'marble-pooja-room', category: 'temple-religious-products', imageKeys: ['pooja', 'mandir', 'temple'], imageIndex: 2 },
  { id: 'p-035', name: 'Marble Carved Doors', slug: 'marble-carved-doors', category: 'temple-religious-products', imageKeys: ['door', 'jali', 'carved', 'inlay'] },
  { id: 'p-036', name: 'Marble Yantra & Decorative Panels', slug: 'marble-yantra-decorative-panels', category: 'temple-religious-products', imageKeys: ['yantra', 'panel', 'inlay'] },

  { id: 'p-037', name: 'Marble Fountain', slug: 'marble-fountain', category: 'garden-outdoor-products', imageKeys: ['fountain'] },
  { id: 'p-038', name: 'Marble Water Feature', slug: 'marble-water-feature', category: 'garden-outdoor-products', imageKeys: ['fountain', 'water'], imageIndex: 3 },
  { id: 'p-039', name: 'Marble Benches', slug: 'marble-benches', category: 'garden-outdoor-products', imageKeys: ['bances', 'bench'] },
  { id: 'p-040', name: 'Marble Garden Chairs', slug: 'marble-garden-chairs', category: 'garden-outdoor-products', imageKeys: ['bances', 'bench', 'chair'], imageIndex: 2 },
  { id: 'p-041', name: 'Marble Bird Bath', slug: 'marble-bird-bath', category: 'garden-outdoor-products', imageKeys: ['bird bath', 'fountain', 'planter'] },
  { id: 'p-042', name: 'Marble Outdoor Tables', slug: 'marble-outdoor-tables', category: 'garden-outdoor-products', imageKeys: ['table', 'bances', 'outdoor'] },
  { id: 'p-043', name: 'Marble Landscaping Stones', slug: 'marble-landscaping-stones', category: 'garden-outdoor-products', imageKeys: ['cobble', 'kerbstone', 'landscape'] },

  { id: 'p-044', name: 'Hand Carved Marble', slug: 'hand-carved-marble', category: 'carved-stone-collection', imageKeys: ['inlay', 'carved', 'jali'] },
  { id: 'p-045', name: 'Stone Carving Art', slug: 'stone-carving-art', category: 'carved-stone-collection', imageKeys: ['inlay', 'semi precious', 'pillar'], imageIndex: 2 },
  { id: 'p-046', name: 'Marble Sculptures', slug: 'marble-sculptures', category: 'carved-stone-collection', imageKeys: ['sculpture', 'statue', 'pillar'], imageIndex: 1 },
  { id: 'p-047', name: 'Marble Animal Figures', slug: 'marble-animal-figures', category: 'carved-stone-collection', imageKeys: ['animal', 'bird', 'fountain', 'sculpture'] },
];

function buildProductImages() {
  const products: ProductImage[] = [];
  const byCategory: Record<string, ProductImage[]> = {};
  for (const category of CATEGORY_ORDER) {
    byCategory[category] = [];
  }

  for (const def of PRODUCT_DEFS) {
    const filename = `${def.slug}.webp`;
    const src = imageForExact(EXACT_PRODUCT_ASSETS[def.name])
      ?? imageFor(def.imageKeys, def.imageIndex ?? 0);
    const product: ProductImage = {
      id: def.id,
      filename,
      name: def.name,
      src,
      category: getCategory(def.category).name,
      categorySlug: def.category,
    };
    products.push(product);
    byCategory[def.category].push(product);
  }

  return {
    products,
    byCategory: byCategory as Record<CategorySlug, ProductImage[]>,
    uncategorized: [] as string[],
    duplicates: [] as string[],
    bannerSkipped: Object.keys(productImages).filter((p) =>
      /^banner[-_]/i.test(p.split('/').pop() || p),
    ),
    totalImagesInFolder: Object.keys(productImages).length,
  };
}

export const PRODUCT_IMAGES = buildProductImages();

export const SLUG_TO_ID: Record<string, string> = {};
for (const def of PRODUCT_DEFS) {
  SLUG_TO_ID[def.slug] = def.id;
}

export const ID_TO_SLUG: Record<string, string> = {};
for (const def of PRODUCT_DEFS) {
  ID_TO_SLUG[def.id] = def.slug;
}

export function getCategory(slug: CategorySlug): ProductCategory {
  const found = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown category slug: ${slug}`);
  return found;
}

export function getCategoryProducts(slug: CategorySlug): ProductImage[] {
  return PRODUCT_IMAGES.byCategory[slug] || [];
}

export function getRelatedCategories(slug: CategorySlug, limit = 4): ProductCategory[] {
  return PRODUCT_CATEGORIES
    .filter((c) => c.slug !== slug)
    .sort((a, b) => Math.abs(a.order - b.order) - Math.abs(b.order - a.order))
    .slice(0, limit);
}

export const PRODUCT_VALIDATION = {
  totalImagesInFolder: PRODUCT_IMAGES.totalImagesInFolder,
  totalCategorized: PRODUCT_IMAGES.products.length,
  totalBannerSkipped: PRODUCT_IMAGES.bannerSkipped.length,
  totalUncategorized: PRODUCT_IMAGES.uncategorized.length,
  totalDuplicates: PRODUCT_IMAGES.duplicates.length,
  categoryCounts: Object.fromEntries(
    CATEGORY_ORDER.map((slug) => [slug, PRODUCT_IMAGES.byCategory[slug].length]),
  ) as Record<CategorySlug, number>,
};
