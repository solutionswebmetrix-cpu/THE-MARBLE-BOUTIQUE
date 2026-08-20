import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Send,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  Gem,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  getProductDetailBySlug,
  getProductDetailById,
  listRelatedProducts,
  PRODUCT_DETAILS_BY_ID,
  type ProductDetail,
} from '@/data/productDetails';
import { getCategory, type CategorySlug } from '@/data/products';
import { COMPANY } from '@/data/content';

interface Props {
  slug: string;
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectProduct: (productId: string) => void;
  onBackHome: () => void;
  onBackCategory: () => void;
}

function whatsappLink(message: string): string {
  return `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export default function ProductDetailPage({
  slug,
  onSelectProduct,
  onBackHome,
  onBackCategory,
}: Props) {
  const detail =
    getProductDetailBySlug(slug) ??
    getProductDetailById(slug) ??
    Object.values(PRODUCT_DETAILS_BY_ID)[0];

  if (!detail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCFCF8] pt-[120px]">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-[#1F1F1F]">Product not found</h1>
          <button
            onClick={onBackHome}
            className="mt-5 rounded-full border border-[#C8A646] bg-[#C8A646] px-5 py-2.5 font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductDetailView
      detail={detail}
      onSelectProduct={onSelectProduct}
      onBackHome={onBackHome}
      onBackCategory={onBackCategory}
    />
  );
}

function ProductDetailView({
  detail,
  onSelectProduct,
  onBackHome,
  onBackCategory,
}: {
  detail: ProductDetail;
  onSelectProduct: (productId: string) => void;
  onBackHome: () => void;
  onBackCategory: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const gallery = detail.gallery;
  const category = getCategory(detail.product.categorySlug);
  const relatedDetails = listRelatedProducts(detail.slug, 4);

  const inqMessage = `Hi The Marble Boutique, I'm interested in ${detail.product.name} (${detail.url}). Please share pricing, slab availability, and finish options.`;

  const primary = gallery[activeImage] ?? gallery[0] ?? detail.product;

  return (
    <div className="relative min-h-screen bg-[#FCFCF8]">
      <section className="relative overflow-hidden pt-[110px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#083D34]/95 via-[#0F5C4D]/90 to-[#1F1F1F]/95" />
        <div className="absolute inset-0 opacity-20">
          <img
            src={primary.src}
            alt=""
            className="h-full w-full object-cover blur-xl scale-110"
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #C8A646 0, transparent 40%), radial-gradient(circle at 80% 60%, #C8A646 0, transparent 35%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <button
              onClick={onBackHome}
              className="group flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#C8A646]/50 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="font-button text-[10px] uppercase tracking-[0.2em]">Back to Home</span>
            </button>
            <div className="flex items-center gap-1.5 text-white/40">
              <ChevronRight size={14} />
              <span className="font-button text-[10px] uppercase tracking-[0.2em]">Collections</span>
              <ChevronRight size={14} />
              <button
                onClick={onBackCategory}
                className="font-button text-[10px] uppercase tracking-[0.2em] text-[#C8A646] transition-colors hover:text-white"
              >
                {category.name}
              </button>
              <ChevronRight size={14} className="text-[#C8A646]" />
              <span className="font-button text-[10px] uppercase tracking-[0.2em] text-white/85">
                {detail.product.name}
              </span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A646]" />
              <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">
                Product {String(detail.specs?.material ? 1 : category.order).padStart(2, '0')} · {category.name.toUpperCase()}
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A646]" />
            </div>
            <h1 className="font-heading text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
              {detail.product.name}
            </h1>
            <p className="mt-5 max-w-3xl font-body text-sm text-white/70 md:text-base">
              {detail.shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappLink(inqMessage)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 transition-all duration-300 hover:shadow-[0_15px_40px_-15px_rgba(37,211,102,0.8)]"
              >
                <MessageCircle size={16} className="text-white" />
                <span className="font-button text-[11px] uppercase tracking-[0.2em] text-white">
                  WhatsApp Inquiry
                </span>
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${detail.product.name} Inquiry`)}&body=${encodeURIComponent(inqMessage)}`}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-[#C8A646]/40 hover:bg-white/10"
              >
                <Send size={16} className="text-white/85" />
                <span className="font-button text-[11px] uppercase tracking-[0.2em] text-white/90">
                  Email Inquiry
                </span>
              </a>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center gap-2 rounded-full border border-[#C8A646]/40 bg-[#C8A646]/10 px-6 py-3.5 backdrop-blur-md"
              >
                <Phone size={16} className="text-[#C8A646]" />
                <span className="font-button text-[11px] uppercase tracking-[0.2em] text-[#C8A646]">
                  {COMPANY.phoneDisplay}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#C8A646]/20 bg-white shadow-[0_15px_50px_-20px_rgba(8,61,52,0.4)]"
            >
              <img
                key={primary.src}
                src={primary.src}
                alt={detail.product.name}
                className="h-full w-full object-cover transition-opacity duration-500 ease-out"
                loading="eager"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {gallery.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveImage(i)}
                    className={`group relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 ${
                      i === activeImage
                        ? 'border-[#C8A646] ring-2 ring-[#C8A646]/40'
                        : 'border-[#1F1F1F]/8 hover:border-[#C8A646]/40'
                    }`}
                    aria-label={`Gallery image ${i + 1}`}
                  >
                    <img
                      src={g.src}
                      alt={g.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-[#C8A646]">
              Product Specifications
            </p>
            <h2 className="mt-2 font-heading text-3xl text-[#1F1F1F] md:text-4xl">
              {detail.product.name}
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#1F1F1F]/60 md:text-base">
              {detail.shortDescription}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-px rounded-2xl border border-[#C8A646]/15 bg-[#C8A646]/10 overflow-hidden">
              {(
                [
                  ['Material', detail.specs.material],
                  ['Finish', detail.specs.finish],
                  ['Thickness', detail.specs.thickness],
                  ['Color', detail.specs.color],
                  ['Origin', detail.specs.origin],
                  ['Surface', detail.specs.surfaceFinish],
                  ['Durability', detail.specs.durability],
                  ['Maintenance', detail.specs.maintenance],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-3 bg-[#FCFCF8] px-5 py-3.5">
                  <p className="font-button text-[9px] uppercase tracking-[0.25em] text-[#C8A646]">{label}</p>
                  <p className="font-body text-xs leading-relaxed text-[#1F1F1F]/80 md:text-sm">{value}</p>
                </div>
              ))}
              <div className="bg-[#FCFCF8] px-5 py-3.5">
                <p className="font-button text-[9px] uppercase tracking-[0.25em] text-[#C8A646]">Available Sizes</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {detail.specs.availableSizes.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#0F5C4D]/10 bg-[#EAF5F2]/60 px-3 py-1 font-button text-[9px] uppercase tracking-[0.18em] text-[#0F5C4D]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#FCFCF8] px-5 py-3.5">
                <p className="font-button text-[9px] uppercase tracking-[0.25em] text-[#C8A646]">Applications</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {detail.specs.applications.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-[#C8A646]/15 bg-[#C8A646]/6 px-3 py-1 font-button text-[9px] uppercase tracking-[0.18em] text-[#7A6120]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <a
                href={whatsappLink(inqMessage)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-full bg-[#25D366] px-5 py-3.5 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(37,211,102,0.8)]"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={17} className="text-white" />
                  <div className="text-left">
                    <p className="font-button text-[9px] uppercase tracking-[0.2em] text-white/80">Instant Reply</p>
                    <p className="font-heading text-lg text-white leading-tight">WhatsApp</p>
                  </div>
                </div>
                <ChevronRight size={17} className="text-white transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${detail.product.name} Quote Request`)}&body=${encodeURIComponent(inqMessage)}`}
                className="group flex items-center justify-between rounded-full bg-[#C8A646] px-5 py-3.5 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(200,166,70,0.8)]"
              >
                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-[#1F1F1F]" />
                  <div className="text-left">
                    <p className="font-button text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/70">Detailed</p>
                    <p className="font-heading text-lg text-[#1F1F1F] leading-tight">Send Inquiry</p>
                  </div>
                </div>
                <ChevronRight size={17} className="text-[#1F1F1F] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ['Overview', detail.overview, Gem],
              ['Applications', detail.applicationsText, Sparkles],
              ['Benefits', detail.benefits, Award],
              ['Quality', detail.quality, ShieldCheck],
            ] as [string, string, typeof Gem][]
          ).map(([title, text, Icon], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative flex h-full flex-col rounded-3xl border border-[#1F1F1F]/[0.06] bg-white p-6 shadow-[0_8px_30px_-20px_rgba(15,92,77,0.25)] transition-all duration-500 hover:border-[#C8A646]/30 hover:shadow-[0_20px_50px_-25px_rgba(15,92,77,0.4)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C8A646]/12 text-[#C8A646] transition-colors group-hover:bg-[#0F5C4D] group-hover:text-white">
                <Icon size={19} />
              </div>
              <h3 className="mt-5 font-heading text-xl text-[#1F1F1F]">{title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#1F1F1F]/65">{text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl border border-[#1F1F1F]/[0.06] bg-white p-6 shadow-[0_8px_30px_-20px_rgba(15,92,77,0.25)]"
          >
            <h3 className="mb-4 font-heading text-xl text-[#1F1F1F]">Finish & Surface</h3>
            <p className="font-body text-sm leading-relaxed text-[#1F1F1F]/65">{detail.finish}</p>
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl border border-[#1F1F1F]/[0.06] bg-white p-6 shadow-[0_8px_30px_-20px_rgba(15,92,77,0.25)]"
          >
            <h3 className="mb-4 font-heading text-xl text-[#1F1F1F]">Everyday Care & Maintenance</h3>
            <p className="font-body text-sm leading-relaxed text-[#1F1F1F]/65">{detail.maintenance}</p>
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.12 }}
            className="rounded-3xl border border-[#1F1F1F]/[0.06] bg-white p-6 shadow-[0_8px_30px_-20px_rgba(15,92,77,0.25)]"
          >
            <h3 className="mb-4 font-heading text-xl text-[#1F1F1F]">Typical Uses</h3>
            <p className="font-body text-sm leading-relaxed text-[#1F1F1F]/65">{detail.uses}</p>
          </motion.article>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C8A646]" />
              <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">Features</span>
            </div>
            <h2 className="font-heading text-3xl text-[#1F1F1F] md:text-4xl">Why Specify This Stone</h2>
            <ul className="mt-7 space-y-3">
              {detail.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-14px_rgba(15,92,77,0.3)]">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#C8A646]" />
                  <p className="font-body text-sm leading-relaxed text-[#1F1F1F]/75">{f}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C8A646]" />
              <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">Advantages</span>
            </div>
            <h2 className="font-heading text-3xl text-[#1F1F1F] md:text-4xl">Permanent Advantages</h2>
            <ul className="mt-7 space-y-3">
              {detail.advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 rounded-2xl border border-[#C8A646]/12 bg-[#C8A646]/[0.04] p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0F5C4D]" />
                  <p className="font-body text-sm leading-relaxed text-[#1F1F1F]/75">{a}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C8A646]" />
          <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">Frequently Asked</span>
          <span className="h-px w-10 bg-[#C8A646]" />
        </div>
        <h2 className="mb-8 font-heading text-3xl text-[#1F1F1F] md:text-4xl">
          Questions Answered About <span className="italic text-[#C8A646]">{detail.product.name}</span>
        </h2>
        <div className="space-y-2">
          {detail.faq.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  open ? 'border-[#C8A646]/40 bg-white shadow-[0_10px_30px_-22px_rgba(15,92,77,0.4)]' : 'border-[#1F1F1F]/[0.06] bg-white/60'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <h3 className="font-heading text-lg text-[#1F1F1F]">{item.q}</h3>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-[#C8A646] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-body text-sm leading-relaxed text-[#1F1F1F]/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C8A646]" />
          <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">Related Products</span>
          <span className="h-px w-10 bg-[#C8A646]" />
        </div>
        <h2 className="mb-10 font-heading text-3xl text-[#1F1F1F] md:text-4xl">
          Explore Related <span className="italic text-[#C8A646]">Stones</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedDetails.map((r, i) => {
            const relatedPrimary = r.gallery[0] ?? r.product;
            return (
              <motion.button
                key={r.slug}
                type="button"
                onClick={() => onSelectProduct(r.product.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-[0_2px_15px_-5px_rgba(15,92,77,0.15)] transition-all duration-500 hover:shadow-[0_25px_60px_-20px_rgba(15,92,77,0.5)]"
              >
                <img
                  loading="lazy"
                  src={relatedPrimary.src}
                  alt={r.product.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#083D34]/85 via-[#083D34]/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="mb-2 font-button text-[9px] uppercase tracking-[0.3em] text-[#C8A646]">
                    {r.product.category}
                  </p>
                  <h3 className="font-heading text-lg text-white leading-tight sm:text-xl">
                    {r.product.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-1.5 font-button text-[10px] uppercase tracking-[0.18em] text-white/75 transition-colors group-hover:text-[#C8A646]">
                    View Product
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
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
                <span className="font-button text-[10px] uppercase tracking-[0.4em] text-[#C8A646]">Request a Quote</span>
              </div>
              <h3 className="font-heading text-3xl text-white md:text-4xl">
                Personalized Quote for <span className="italic text-[#E4C46A]">{detail.product.name}</span>
              </h3>
              <p className="mt-4 font-body text-sm text-white/60 md:text-base">
                Share your project dimensions, finish preference, and delivery city. Our stone consultants respond within one business hour with slab photos, pricing tiers, and finish samples arranged for your sign-off.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A646]/15 text-[#C8A646]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/40">Call Direct</p>
                    <a href={`tel:${COMPANY.phoneRaw}`} className="font-heading text-lg text-white">{COMPANY.phoneDisplay}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A646]/15 text-[#C8A646]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/40">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="font-heading text-lg text-white">{COMPANY.email}</a>
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
                    <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/80">Instant Reply</p>
                    <p className="font-heading text-lg text-white leading-tight">WhatsApp Us Now</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${detail.product.name} Quote Request`)}&body=${encodeURIComponent(inqMessage)}`}
                className="group flex items-center justify-between rounded-full bg-[#C8A646] px-6 py-4 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(200,166,70,0.8)]"
              >
                <div className="flex items-center gap-3">
                  <Send size={18} className="text-[#1F1F1F]" />
                  <div className="text-left">
                    <p className="font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]/70">Detailed Response</p>
                    <p className="font-heading text-lg text-[#1F1F1F] leading-tight">Email Inquiry</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#1F1F1F] transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={onBackCategory}
                className="group flex items-center justify-between rounded-full border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <ArrowLeft size={18} className="text-white/70" />
                  <div className="text-left">
                    <p className="font-button text-[10px] uppercase tracking-[0.2em] text-white/40">Back to Collection</p>
                    <p className="font-heading text-lg text-white/90 leading-tight">{category.name}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
