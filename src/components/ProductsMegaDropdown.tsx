import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Gem,
  Mountain,
  Sparkles,
  Home,
  Building2,
  Trees,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  getCategoryProducts,
  type CategorySlug,
  type ProductCategory,
  type ProductImage,
} from '@/data/products';

interface Props {
  onSelectProducts?: () => void;
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectProduct?: (productId: string) => void;
  onClose?: () => void;
  variant?: 'desktop' | 'mobile';
}

const CATEGORY_ICON: Record<CategorySlug, LucideIcon> = {
  'natural-stones': Gem,
  'marble-architectural-products': Building2,
  'home-interior-products': Home,
  'temple-religious-products': Sparkles,
  'garden-outdoor-products': Trees,
  'carved-stone-collection': Mountain,
};

const STONE_TYPE_LABEL: Record<CategorySlug, string> = {
  'natural-stones': 'Natural Stone Families',
  'marble-architectural-products': 'Architectural Marble',
  'home-interior-products': 'Interior Collection',
  'temple-religious-products': 'Sacred Craft',
  'garden-outdoor-products': 'Outdoor Collection',
  'carved-stone-collection': 'Hand-Carved Atelier',
};

const MENU_WIDTH = 1150;
const MENU_MIN_WIDTH = 1100;
const MENU_MAX_HEIGHT = 520;
const HEADER_BOTTOM_OFFSET = 16;
const VIEWPORT_PADDING = 24;
const FEATURED_MAX = 6;

function CategoryNavItem({
  category,
  isActive,
  onEnter,
  onClick,
}: {
  category: ProductCategory;
  isActive: boolean;
  onEnter: () => void;
  onClick: () => void;
}) {
  const Icon = CATEGORY_ICON[category.slug];
  return (
    <button
      onMouseEnter={onEnter}
      onClick={onClick}
      className={`group relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl px-3 py-2.5 text-left transition-all duration-300 ease-out ${
        isActive ? 'bg-[#0F5C4D]/[0.05]' : 'hover:bg-[#0F5C4D]/[0.03]'
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-300 ease-out ${
          isActive
            ? 'bg-[#C8A646] opacity-100 scale-y-100'
            : 'bg-[#C8A646] opacity-0 scale-y-50 group-hover:opacity-100 group-hover:scale-y-100'
        }`}
      />
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ease-out ${
          isActive
            ? 'bg-[#C8A646]/12 text-[#C8A646]'
            : 'bg-[#1F1F1F]/[0.04] text-[#1F1F1F]/45 group-hover:bg-[#C8A646]/10 group-hover:text-[#C8A646]'
        }`}
      >
        <Icon size={14} strokeWidth={1.8} />
      </div>
      <span
        className={`font-heading text-[13px] tracking-tight transition-colors duration-300 ease-out ${
          isActive ? 'text-[#0F5C4D]' : 'text-[#1F1F1F]/75 group-hover:text-[#0F5C4D]'
        }`}
      >
        {category.name}
      </span>
    </button>
  );
}

function FeaturedCard({
  product,
  category,
  isActive,
  onEnter,
  onClick,
}: {
  product: ProductImage;
  category: ProductCategory;
  isActive: boolean;
  onEnter: () => void;
  onClick: () => void;
}) {
  return (
    <button
      onMouseEnter={onEnter}
      onClick={onClick}
      className={`group flex w-full items-center gap-2.5 rounded-2xl border p-2 text-left transition-all duration-300 ease-out ${
        isActive
          ? 'border-[#C8A646]/50 bg-[#EAF5F2]/40 shadow-[0_10px_30px_-18px_rgba(15,92,77,0.45)]'
          : 'border-[#1F1F1F]/[0.07] bg-white hover:border-[#C8A646]/35 hover:bg-[#EAF5F2]/20 hover:shadow-[0_8px_25px_-18px_rgba(15,92,77,0.4)]'
      }`}
    >
      <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-[#EAF5F2]/50 shadow-[0_4px_14px_-10px_rgba(15,92,77,0.5)]">
        <img
          loading="lazy"
          src={product.src}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          decoding="async"
          sizes="60px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-[12.5px] leading-tight text-[#1F1F1F]">
          {product.name}
        </p>
        <p className="mt-0.5 truncate font-button text-[8.5px] uppercase tracking-[0.2em] text-[#C8A646]">
          {STONE_TYPE_LABEL[category.slug]}
        </p>
      </div>
    </button>
  );
}

export function ProductsMegaDropdownDesktop({
  onSelectProducts,
  onSelectCategory,
  onSelectProduct,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const [menuLeft, setMenuLeft] = useState(0);
  const [menuWidth, setMenuWidth] = useState(MENU_WIDTH);
  const timerRef = useRef<number | null>(null);

  const openMenu = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    timerRef.current = window.setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;

    const computePosition = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let headerBottom = 0;
      const header = document.querySelector('header');
      if (header) {
        const headerRect = header.getBoundingClientRect();
        headerBottom = headerRect.bottom;
      } else {
        headerBottom = 90;
      }

      const idealTop = headerBottom + HEADER_BOTTOM_OFFSET;
      const idealWidth = Math.min(
        MENU_WIDTH,
        Math.max(MENU_MIN_WIDTH, vw - VIEWPORT_PADDING * 2),
      );

      const idealLeft = (vw - idealWidth) / 2;
      const clampedLeft = Math.max(VIEWPORT_PADDING, idealLeft);
      const finalLeft = Math.min(clampedLeft, vw - VIEWPORT_PADDING - idealWidth);

      const maxTop = vh - MENU_MAX_HEIGHT - VIEWPORT_PADDING;
      const finalTop = Math.min(idealTop, maxTop);

      setMenuTop(finalTop);
      setMenuLeft(finalLeft);
      setMenuWidth(idealWidth);
    };

    computePosition();
    window.addEventListener('resize', computePosition);
    window.addEventListener('scroll', computePosition, true);
    return () => {
      window.removeEventListener('resize', computePosition);
      window.removeEventListener('scroll', computePosition, true);
    };
  }, [open]);

  const activeCategory: ProductCategory = PRODUCT_CATEGORIES[activeIndex] ?? PRODUCT_CATEGORIES[0];
  const allActiveProducts = getCategoryProducts(activeCategory.slug);
  const featuredProducts = allActiveProducts.slice(0, FEATURED_MAX);
  const previewProduct =
    featuredProducts[featuredIndex] ?? featuredProducts[0] ?? allActiveProducts[0];

  return (
    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="relative">
      <button
        onClick={onSelectProducts}
        className="group relative flex items-center gap-1.5 font-button text-[11px] tracking-[0.15em] uppercase text-[#1F1F1F]/80 transition-colors hover:text-[#C8A646]"
        onMouseEnter={() => {
          openMenu();
        }}
      >
        Products
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? 'rotate-180 text-[#C8A646]' : ''}`}
        />
        <span
          className={`absolute -bottom-1 left-0 h-px bg-[#C8A646] transition-all duration-300 ${
            open ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[150] overflow-hidden"
            style={{
              top: menuTop,
              left: menuLeft,
              width: menuWidth,
              maxHeight: MENU_MAX_HEIGHT,
              willChange: 'opacity, transform',
            }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <div
              className="border border-[#C8A646]/35 bg-white backdrop-blur-xl shadow-[0_30px_80px_-28px_rgba(15,92,77,0.55)]"
              style={{
                borderRadius: '24px',
                padding: '28px',
                height: MENU_MAX_HEIGHT,
              }}
            >
              <div
                className="grid h-full gap-6"
                style={{ gridTemplateColumns: '25% 40% 35%' }}
              >
                <div className="flex flex-col overflow-hidden">
                  <div className="mb-4 flex items-center gap-2 pl-1">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A646]/45" />
                    <span className="font-button text-[9.5px] uppercase tracking-[0.3em] text-[#C8A646]">
                      Collections
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A646]/45" />
                  </div>
                  <nav className="flex flex-col gap-0.5 pr-1">
                    {PRODUCT_CATEGORIES.map((cat, i) => (
                      <CategoryNavItem
                        key={cat.slug}
                        category={cat}
                        isActive={i === activeIndex}
                        onEnter={() => setActiveIndex(i)}
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          setOpen(false);
                        }}
                      />
                    ))}
                  </nav>
                </div>

                <div className="flex flex-col overflow-hidden">
                  <div className="mb-4 flex items-center justify-between pl-1">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F5C4D]/[0.06] text-[#0F5C4D]">
                        {(() => {
                          const Icon = CATEGORY_ICON[activeCategory.slug];
                          return <Icon size={15} strokeWidth={1.8} />;
                        })()}
                      </div>
                      <div>
                        <h4 className="font-heading text-[14.5px] tracking-tight text-[#1F1F1F]">
                          {activeCategory.name}
                        </h4>
                        <p className="font-button text-[8.5px] uppercase tracking-[0.25em] text-[#C8A646]">
                          {allActiveProducts.length} Products
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid flex-1 grid-cols-1 content-start gap-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory.slug}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="grid grid-cols-1 gap-2 overflow-hidden"
                      >
                        {featuredProducts.length > 0 ? (
                          featuredProducts.map((p, i) => (
                            <FeaturedCard
                              key={p.id}
                              product={p}
                              category={activeCategory}
                              isActive={i === featuredIndex}
                              onEnter={() => setFeaturedIndex(i)}
                              onClick={() => {
                                onSelectProduct?.(p.id);
                                setOpen(false);
                              }}
                            />
                          ))
                        ) : (
                          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[#C8A646]/30">
                            <span className="font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]/40">
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col overflow-hidden rounded-2xl border border-[#1F1F1F]/[0.06] bg-gradient-to-br from-white via-[#FCFCF8] to-[#EAF5F2]/25 p-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={previewProduct?.id ?? activeCategory.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex h-full flex-col"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#C8A646]/20 bg-[#EAF5F2]/50 shadow-[0_8px_30px_-18px_rgba(15,92,77,0.55)]">
                        {previewProduct ? (
                          <img
                            loading="lazy"
                            src={previewProduct.src}
                            alt={previewProduct.name}
                            className="h-full w-full object-cover"
                            decoding="async"
                            sizes="350px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-heading text-[#C8A646]/40">
                            Preview
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex-1 overflow-hidden">
                        <p className="font-button text-[8.5px] uppercase tracking-[0.25em] text-[#C8A646]">
                          {STONE_TYPE_LABEL[activeCategory.slug]}
                        </p>
                        <h5 className="mt-1.5 font-heading text-[18px] leading-tight tracking-tight text-[#1F1F1F]">
                          {previewProduct?.name ?? activeCategory.name}
                        </h5>
                        <p className="mt-2 line-clamp-3 font-body text-[11.5px] leading-relaxed text-[#1F1F1F]/60">
                          {activeCategory.description.split('.').slice(0, 2).join('.')}.
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            if (previewProduct) {
                              onSelectProduct?.(previewProduct.id);
                              setOpen(false);
                            } else {
                              onSelectCategory(activeCategory.slug);
                              setOpen(false);
                            }
                          }}
                          className="group flex items-center gap-1.5 rounded-full bg-[#C8A646] px-4 py-2.5 transition-all duration-300 hover:shadow-[0_12px_30px_-16px_rgba(200,166,70,0.8)]"
                        >
                          <span className="font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]">
                            View Collection
                          </span>
                          <ArrowUpRight
                            size={12}
                            className="text-[#1F1F1F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductsMegaDropdownMobile({
  onSelectProducts,
  onSelectCategory,
  onSelectProduct,
  onClose,
}: Props) {
  const [openSlug, setOpenSlug] = useState<CategorySlug | null>(null);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => {
          onSelectProducts?.();
          onClose?.();
        }}
        className="mb-3 flex items-center justify-between rounded-2xl border border-[#C8A646] bg-[#C8A646] px-4 py-3 font-button text-[10px] uppercase tracking-[0.2em] text-[#1F1F1F]"
      >
        All Products
        <ArrowUpRight size={15} />
      </button>
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="font-button text-[10px] uppercase tracking-[0.3em] text-[#C8A646]">
          Collections
        </span>
        <span className="h-px flex-1 bg-[#C8A646]/25" />
      </div>
      {PRODUCT_CATEGORIES.map((cat) => {
        const isOpen = openSlug === cat.slug;
        const products = getCategoryProducts(cat.slug);
        const Icon = CATEGORY_ICON[cat.slug];
        return (
          <div key={cat.slug} className="border-b border-[#1F1F1F]/5 last:border-b-0">
            <button
              onClick={() => setOpenSlug(isOpen ? null : cat.slug)}
              className="flex w-full items-center justify-between py-3.5 pl-1 pr-1"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8A646]/10 text-[#C8A646]">
                  <Icon size={15} />
                </div>
                <div className="text-left">
                  <p className="font-heading text-[14px] text-[#1F1F1F]">{cat.name}</p>
                  <p className="font-button text-[9px] uppercase tracking-[0.2em] text-[#1F1F1F]/40">
                    {products.length} Products
                  </p>
                </div>
              </div>
              <ChevronDown
                size={15}
                className={`text-[#1F1F1F]/40 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#C8A646]' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <CategoryAccordionDetail
                    category={cat}
                    products={products}
                    onSelectCategory={(slug) => {
                      onSelectCategory(slug);
                      onClose?.();
                    }}
                    onSelectProduct={(pid) => {
                      onSelectProduct?.(pid);
                      onClose?.();
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function CategoryAccordionDetail({
  category,
  products,
  onSelectCategory,
  onSelectProduct,
}: {
  category: ProductCategory;
  products: ProductImage[];
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectProduct: (productId: string) => void;
}) {
  const thumbs = products.slice(0, 4);
  return (
    <div className="pb-5 pl-1 pr-1">
      {thumbs.length > 0 && (
        <div className="mb-4 grid grid-cols-4 gap-2">
          {thumbs.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProduct(p.id)}
              className="aspect-square overflow-hidden rounded-xl border border-[#1F1F1F]/5 bg-[#EAF5F2]/40 transition-all hover:border-[#C8A646]/40"
            >
              <img
                loading="lazy"
                src={p.src}
                alt={p.name}
                className="h-full w-full object-cover"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => onSelectCategory(category.slug)}
        className="group flex w-full items-center justify-between rounded-2xl border border-[#C8A646]/30 bg-white px-4 py-3 transition-all duration-300 hover:bg-[#C8A646]/5"
      >
        <div className="text-left">
          <p className="font-heading text-[13px] text-[#1F1F1F]">
            Explore {category.shortName}
          </p>
          <p className="font-button text-[9px] uppercase tracking-[0.2em] text-[#C8A646]">
            {products.length} Premium Products
          </p>
        </div>
        <ArrowUpRight size={15} className="text-[#C8A646]" />
      </button>
    </div>
  );
}
