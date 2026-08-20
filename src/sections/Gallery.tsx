import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { GALLERY } from '@/data/content';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c8a646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Image Gallery</span>
            <span className="h-px w-10 bg-[#c8a646]" />
          </div>
          <h2 className="font-heading text-4xl text-[#111111] md:text-5xl">
            A Visual <span className="text-gold-gradient italic">Journey</span>
          </h2>
        </div>

        {/* Masonry via CSS columns */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative block w-full overflow-hidden rounded-sm break-inside-avoid"
            >
              <img
                src={g.img}
                alt={g.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  g.tall ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              />
              <div className="absolute inset-0 bg-[#111111]/0 transition-colors duration-500 group-hover:bg-[#111111]/40" />
              <span className="absolute right-3 top-3 flex h-9 w-9 scale-0 items-center justify-center rounded-full bg-[#c8a646] text-[#111111] transition-transform duration-500 group-hover:scale-100">
                <ZoomIn size={16} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c8a646] hover:text-[#c8a646]"
              onClick={() => setActive(null)}
            >
              <X size={20} />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={GALLERY[active].img.replace('w=800', 'w=1600')}
              alt={GALLERY[active].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
