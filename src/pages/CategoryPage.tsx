import { motion } from 'framer-motion';
import { ArrowLeft, Send, MessageCircle, CheckCircle2, ChevronRight, Phone, Mail, Gem } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import {
  getCategory,
  getCategoryProducts,
  getRelatedCategories,
  PRODUCT_CATEGORIES,
  type CategorySlug,
} from '@/data/products';
import { COMPANY } from '@/data/content';

interface Props {
  slug: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectProduct?: (productId: string) => void;
  onBackHome: () => void;
}

function whatsappLink(message: string): string {
  return `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export default function CategoryPage({ slug, onSelectCategory, onSelectProduct, onBackHome }: Props) {
  const category = getCategory(slug);
  const products = getCategoryProducts(slug);
  const related = getRelatedCategories(slug, 4);
  const firstProduct = products[0];
  const heroSubtitle = products.length > 0
    ? `${products.length} Premium Products in Collection`
    : 'Curated Selection Available';

  const inqMessage = `Hi The Marble Boutique, I'm interested in the ${category.name} collection. Please share details about ${products[0]?.name || 'your premium products'}.`;

  return (
    <div className="relative min-h-screen bg-[#FCFCF8]">
      <div className="relative pt-[110px]">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#083D34]/95 via-[#0F5C4D]/90 to-[#1F1F1F]/95" />
          {firstProduct && (
            <div className="absolute inset-0 opacity-20">
              <img
                src={firstProduct.src}
                alt=""
                className="h-full w-full object-cover blur-xl scale-110"
                aria-hidden="true"
              />
            </div>
          )}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, #C8A646 0, transparent 40%), radial-gradient(circle at 80% 60%, #C8A646 0, transparent 35%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <div className="mb-8 flex items-center gap-2">
              <button
                onClick={onBackHome}
                className="group flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#C8A646]/50 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span className="font-button text-[10px] uppercase tracking-[0.2em]">Back to Home</span>
              </button>
              <div className="hidden items-center gap-1.5 text-white/40 sm:flex">
                <ChevronRight size={14} />
                <span className="font-button text-[10px] uppercase tracking-[0.2em]">Collections</span>
                <ChevronRight size={14} className="text-[#C8A646]" />
                <span className="font-button text-[10px] uppercase tracking-[0.2em] text-[#C8A646]">
                  {category.name}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A646]" />
                <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">
                  Collection {String(category.order).padStart(2, '0')}
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A646]" />
              </div>
              <h1 className="font-heading text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
                {category.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl font-body text-sm text-white/60 md:text-base">
                {category.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappLink(inqMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-[#C8A646] px-6 py-3.5 transition-all duration-300 hover:shadow-[0_15px_40px_-15px_rgba(200,166,70,0.8)]"
                >
                  <MessageCircle size={16} className="text-[#1F1F1F]" />
                  <span className="font-button text-[11px] uppercase tracking-[0.2em] text-[#1F1F1F]">
                    WhatsApp Inquiry
                  </span>
                </a>
                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${category.name} Collection Inquiry`)}&body=${encodeURIComponent(inqMessage)}`}
                  className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <Send size={16} className="text-white/80" />
                  <span className="font-button text-[11px] uppercase tracking-[0.2em] text-white/90">
                    Send Email
                  </span>
                </a>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                  <Gem size={14} className="text-[#C8A646]" />
                  <span className="font-button text-[10px] uppercase tracking-[0.2em] text-white/80">
                    {heroSubtitle}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {category.features.map((feat, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:border-[#C8A646]/30 hover:bg-white/[0.07]"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C8A646]/15 text-[#C8A646] transition-colors group-hover:bg-[#C8A646] group-hover:text-[#1F1F1F]">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="font-body text-sm leading-relaxed text-white/80">{feat}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-px w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8A646]/60 to-transparent" />
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-12 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C8A646]" />
                <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">
                  Product Grid
                </span>
                <span className="h-px w-10 bg-[#C8A646]" />
              </div>
              <h2 className="font-heading text-3xl text-[#1F1F1F] md:text-5xl">
                Full <span className="italic text-[#C8A646]">{category.shortName}</span> Gallery
              </h2>
              <p className="mt-3 max-w-xl font-body text-sm text-[#1F1F1F]/60 md:text-base">
                Browse the complete curated selection — each piece hand-finished and quality-assured by our master artisans.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_CATEGORIES.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => onSelectCategory(c.slug)}
                  className={`rounded-full border px-3.5 py-1.5 font-button text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                    c.slug === slug
                      ? 'border-[#C8A646] bg-[#C8A646] text-[#1F1F1F]'
                      : 'border-[#1F1F1F]/10 text-[#1F1F1F]/55 hover:border-[#C8A646]/40 hover:text-[#C8A646]'
                  }`}
                >
                  {c.shortName}
                </button>
              ))}
            </div>
          </div>

          <ProductGrid products={products} onSelectProduct={onSelectProduct} />
        </section>

        <section className="relative overflow-hidden border-y border-[#1F1F1F]/5 bg-gradient-to-br from-[#083D34] via-[#0F5C4D] to-[#083D34]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 50%, #C8A646 0, transparent 45%), radial-gradient(circle at 70% 20%, #C8A646 0, transparent 40%)',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
            <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:grid-cols-2 md:p-10">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C8A646]" />
                  <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">
                    Need Assistance
                  </span>
                </div>
                <h3 className="font-heading text-3xl text-white md:text-4xl">
                  Request a Custom Quote for {category.shortName}
                </h3>
                <p className="mt-4 font-body text-sm text-white/60 md:text-base">
                  Speak directly with our stone consultants for slab availability, custom sizing,
                  installation estimates, and bespoke craftsmanship inquiries.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A646]/15 text-[#C8A646]">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/40">Call Direct</p>
                      <a href={`tel:${COMPANY.phoneRaw}`} className="font-heading text-lg text-white">
                        {COMPANY.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A646]/15 text-[#C8A646]">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/40">Email</p>
                      <a href={`mailto:${COMPANY.email}`} className="font-heading text-lg text-white">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <a
                  href={whatsappLink(inqMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-full bg-[#25D366] px-6 py-4 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(37,211,102,0.8)]"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} className="text-white" />
                    <div className="text-left">
                      <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/80">
                        Instant Reply
                      </p>
                      <p className="font-heading text-lg text-white leading-tight">WhatsApp Us Now</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${category.name} Quote Request`)}&body=${encodeURIComponent(inqMessage)}`}
                  className="group flex items-center justify-between rounded-full bg-[#C8A646] px-6 py-4 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(200,166,70,0.8)]"
                >
                  <div className="flex items-center gap-3">
                    <Send size={18} className="text-[#1F1F1F]" />
                    <div className="text-left">
                      <p className="font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]/70">
                        Detailed Response
                      </p>
                      <p className="font-heading text-lg text-[#1F1F1F] leading-tight">Email Inquiry</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#1F1F1F] transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={onBackHome}
                  className="group flex items-center justify-between rounded-full border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={18} className="text-white/70" />
                    <div className="text-left">
                      <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/40">
                        Continue Exploring
                      </p>
                      <p className="font-heading text-lg text-white/90 leading-tight">Back to Homepage</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C8A646]" />
            <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">
              Related Collections
            </span>
            <span className="h-px w-10 bg-[#C8A646]" />
          </div>
          <h2 className="mb-10 font-heading text-3xl text-[#1F1F1F] md:text-5xl">
            You May Also <span className="italic text-[#C8A646]">Love</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((c, i) => {
              const relProducts = getCategoryProducts(c.slug);
              const relFirst = relProducts[0];
              return (
                <motion.button
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onClick={() => onSelectCategory(c.slug)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-[0_2px_15px_-5px_rgba(15,92,77,0.15)] transition-all duration-500 hover:shadow-[0_25px_60px_-20px_rgba(15,92,77,0.5)]"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {relFirst ? (
                      <img
                        loading="lazy"
                        src={relFirst.src}
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#083D34] to-[#1F1F1F]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#083D34]/90 via-[#083D34]/30 to-transparent" />
                  </div>
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-[#C8A646]/40 bg-white/80 px-2.5 py-1 font-button text-[9px] uppercase tracking-[0.18em] text-[#C8A646] backdrop-blur-sm">
                      {String(c.order).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="font-button text-[9px] uppercase tracking-[0.3em] text-[#C8A646]">
                      {relProducts.length} Products
                    </span>
                    <h3 className="mt-1.5 font-heading text-xl text-white leading-tight">
                      {c.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 font-button text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-[#C8A646]">
                      View Collection
                      <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
