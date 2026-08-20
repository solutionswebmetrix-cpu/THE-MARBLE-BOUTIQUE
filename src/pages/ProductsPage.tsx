import { useState } from 'react';
import { PRODUCT_CATEGORIES, PRODUCT_IMAGES, type CategorySlug } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

interface Props {
  onSelectProduct?: (productId: string) => void;
  onBackHome: () => void;
}

type SelectedCategory = 'all' | CategorySlug;

export default function ProductsPage({ onSelectProduct, onBackHome }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>('all');
  const products = selectedCategory === 'all'
    ? PRODUCT_IMAGES.products
    : PRODUCT_IMAGES.byCategory[selectedCategory];

  return (
    <main className="min-h-screen bg-[#FCFCF8] pt-[110px]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#083D34] via-[#0F5C4D] to-[#1F1F1F] px-5 py-16 md:px-8 md:py-24">
        <div className="relative mx-auto max-w-7xl">
          <p className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">Products</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-white md:text-6xl">Complete Stone Collection</h1>
          <p className="mt-5 max-w-2xl font-body text-sm text-white/65 md:text-base">
            Browse every product in our curated catalogue, from natural stone selections to architectural, interior, religious, outdoor, and carved stone work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full border px-3.5 py-1.5 font-button text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'border-[#C8A646] bg-[#C8A646] text-[#1F1F1F]'
                : 'border-[#1F1F1F]/10 text-[#1F1F1F]/55 hover:border-[#C8A646]/40 hover:text-[#C8A646]'
            }`}
          >
            All Products · {PRODUCT_IMAGES.products.length}
          </button>
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setSelectedCategory(category.slug)}
              className={`rounded-full border px-3.5 py-1.5 font-button text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                selectedCategory === category.slug
                  ? 'border-[#C8A646] bg-[#C8A646] text-[#1F1F1F]'
                  : 'border-[#1F1F1F]/10 text-[#1F1F1F]/55 hover:border-[#C8A646]/40 hover:text-[#C8A646]'
              }`}
            >
              {category.shortName} · {PRODUCT_IMAGES.byCategory[category.slug].length}
            </button>
          ))}
        </div>

        <ProductGrid products={products} onSelectProduct={onSelectProduct} />

        <button
          type="button"
          onClick={onBackHome}
          className="mt-12 rounded-full border border-[#C8A646] px-5 py-2.5 font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F] transition-colors hover:bg-[#C8A646]"
        >
          Back to Home
        </button>
      </section>
    </main>
  );
}