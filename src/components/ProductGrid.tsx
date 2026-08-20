import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { ProductImage } from '@/data/products';
import { getProductUrl } from '@/data/productDetails';

interface Props {
  products: ProductImage[];
  onInquiry?: (product: ProductImage) => void;
  onSelectProduct?: (productId: string) => void;
}

function ProductCard({
  product,
  index,
  onInquiry,
  onSelectProduct,
}: {
  product: ProductImage;
  index: number;
  onInquiry?: (p: ProductImage) => void;
  onSelectProduct?: (id: string) => void;
}) {
  const url = getProductUrl(product.id);

  const openDetail = () => onSelectProduct?.(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
    >
      <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#C8A646]/0 bg-white shadow-[0_2px_15px_-5px_rgba(15,92,77,0.12)] transition-all duration-500 hover:border-[#C8A646]/60 hover:shadow-[0_25px_60px_-20px_rgba(15,92,77,0.45)]">
        <button
          type="button"
          onClick={openDetail}
          className="relative h-full w-full overflow-hidden text-left"
          aria-label={`View details: ${product.name}`}
        >
          <img
            loading="lazy"
            src={product.src}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#083D34]/85 via-[#083D34]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1F1F1F] shadow-lg backdrop-blur-sm">
              <Search size={16} />
            </div>
          </div>
          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-[#C8A646]/40 bg-white/80 px-2.5 py-1 font-button text-[9px] uppercase tracking-[0.18em] text-[#C8A646] backdrop-blur-sm">
              Premium
            </span>
            {url && (
              <span className="sr-only">Product page URL {url}</span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="mb-2 font-button text-[9px] uppercase tracking-[0.3em] text-[#C8A646]">
              {product.category}
            </p>
            <h3 className="font-heading text-lg text-white leading-tight sm:text-xl">
              {product.name}
            </h3>
            <div className="mt-3 overflow-hidden">
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full translate-y-[200%] rounded-full border border-[#C8A646] bg-[#C8A646] px-4 py-2.5 font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F] transition-transform duration-500 ease-out group-hover:translate-y-0 hover:bg-white hover:text-[#C8A646]"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onInquiry?.(product)}
          className="sr-only focus:not-sr-only"
          aria-label={`Quick inquiry about ${product.name}`}
        >
          Quick Inquiry
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductGrid({ products, onInquiry, onSelectProduct }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#C8A646]/30 bg-[#FCFCF8] p-10 text-center">
        <p className="font-heading text-xl text-[#1F1F1F]/50">No products available in this collection.</p>
        <p className="mt-2 font-body text-sm text-[#1F1F1F]/40">Check back soon \u2014 new arrivals are being curated.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          onInquiry={onInquiry}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}
