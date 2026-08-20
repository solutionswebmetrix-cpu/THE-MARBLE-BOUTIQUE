import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Search, MessageCircle } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '@/data/content';
import { ProductsMegaDropdownDesktop, ProductsMegaDropdownMobile } from '@/components/ProductsMegaDropdown';
import type { CategorySlug } from '@/data/products';
import logo from '@/assets/logo/logo.png';

interface Props {
  onSelectProducts?: () => void;
  onSelectCategory?: (slug: CategorySlug) => void;
  onSelectProduct?: (productId: string) => void;
}

export default function Header({ onSelectProducts, onSelectCategory, onSelectProduct }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 z-[100] w-full px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <div
          className={`mx-auto flex h-[78px] max-w-7xl items-center justify-between rounded-full border border-white/80 bg-white/90 px-4 shadow-[0_10px_35px_rgba(34,34,34,0.10)] backdrop-blur-2xl transition-all duration-500 ${
            scrolled ? 'border-[#C8A646]/35' : ''
          }`}
        >
          <a href="#home" className="group flex items-center">
            <img
              src={logo}
              alt="The Marble Boutique logo"
              className="h-[100px] w-[100px] -my-[22px] object-contain"
              width={100}
              height={100}
              loading="eager"
              decoding="async"
            />
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              if (link.label === 'Products') {
                return (
                  <ProductsMegaDropdownDesktop
                    onSelectProducts={onSelectProducts}
                    key="products-desktop"
                    onSelectCategory={(slug) => {
                      onSelectCategory?.(slug);
                    }}
                    onSelectProduct={(pid) => {
                      onSelectProduct?.(pid);
                    }}
                  />
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative font-button text-[11px] tracking-[0.15em] uppercase text-[#1F1F1F]/80 transition-colors hover:text-[#C8A646]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C8A646] transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#1F1F1F]/10 text-[#1F1F1F]/80 transition-colors hover:border-[#C8A646] hover:text-[#C8A646] md:flex"
            >
              <Search size={16} />
            </button>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              aria-label="Call now"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#C8A646]/30 text-[#C8A646] transition-all hover:bg-[#C8A646] hover:text-[#1F1F1F] md:flex"
            >
              <Phone size={16} />
            </a>
            <a
              href={`https://wa.me/${COMPANY.phoneRaw}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#1F1F1F]/10 text-[#1F1F1F]/80 transition-colors hover:border-[#25D366] hover:text-[#25D366] md:flex"
            >
              <MessageCircle size={16} />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F1F]/10 text-[#1F1F1F] lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-white/95 px-6 py-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <img
                src={logo}
                alt="The Marble Boutique logo"
                className="h-[100px] w-[100px] object-contain"
                width={100}
                height={100}
              />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-[#1F1F1F]">
                <X size={22} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => {
                if (link.label === 'Products') {
                  return (
                    <motion.div
                      key="products-mobile"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ProductsMegaDropdownMobile
                        onSelectProducts={onSelectProducts}
                        onSelectCategory={(slug) => {
                          setOpen(false);
                          onSelectCategory?.(slug);
                        }}
                        onSelectProduct={(pid) => {
                          setOpen(false);
                          onSelectProduct?.(pid);
                        }}
                        onClose={() => setOpen(false)}
                      />
                    </motion.div>
                  );
                }
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="block py-2 font-heading text-3xl text-[#1F1F1F]/90 transition-colors hover:text-[#C8A646]"
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <a href={`tel:${COMPANY.phoneRaw}`} className="font-button text-sm tracking-wider text-[#17483C]">
                {COMPANY.phoneDisplay}
              </a>
              <a href={`https://wa.me/${COMPANY.phoneRaw}`} target="_blank" rel="noreferrer" className="font-button text-sm tracking-wider text-[#1F1F1F]/70">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-[200] flex items-start justify-center bg-white/95 px-6 pt-32 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl"
            >
              <p className="mb-3 font-button text-[11px] uppercase tracking-[0.3em] text-[#C8A646]">Search</p>
              <div className="flex items-center gap-3 border-b border-[#222222]/15 pb-3">
                <Search size={20} className="text-[#23493D]" />
                <input
                  autoFocus
                  placeholder="Search marble, granite, products…"
                  className="w-full bg-transparent font-heading text-2xl text-[#1F1F1F] placeholder-[#1F1F1F]/30 focus:outline-none"
                />
              </div>
              <p className="mt-4 text-sm text-[#1F1F1F]/40">Try: Italian Marble, Fireplaces, Temples, Bath Tubs…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
