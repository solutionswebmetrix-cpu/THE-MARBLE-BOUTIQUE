import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import aboutImg from '@/assets/Imported Marble.png';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8 md:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="reveal-mask aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img
              style={{ y }}
              src={aboutImg}
              alt="Luxury marble showroom interior"
              className="h-full w-full scale-110 object-cover"
              loading="lazy"
            />
          </div>
          {/* Gold frame */}
          <div className="pointer-events-none absolute -inset-3 -z-10 border border-[#c8a646]/30" />
          {/* Floating stat card */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute -bottom-6 -right-4 md:-right-8 glass-light rounded-sm p-5 shadow-2xl"
          >
            <p className="font-heading text-3xl text-[#c8a646]">20+</p>
            <p className="font-button text-[10px] tracking-widest uppercase text-[#111111]/60">Years of Craft</p>
          </motion.div> */}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#c8a646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">About Us</span>
          </div>
          <h2 className="font-heading text-4xl leading-tight text-[#111111] md:text-5xl">
            About <span className="text-gold-gradient">THE MARBLE BOUTIQUE</span>
          </h2>
          <div className="mt-6 space-y-4 font-body text-sm leading-relaxed text-[#111111]/70 md:text-base">
            <p>
              THE MARBLE BOUTIQUE is a manufacturer and supplier of premium Indian Marble, Imported
              Marble, Italian Marble, Granite, Slabs, Stones, Temple, House Mandirs, Fireplaces,
              Table Tops, Water Fountains, Wash Basins, Bath Tubs, Flower Vases, and customized
              carved marble products.
            </p>
            <p>
              We specialize in luxury residential, commercial and architectural marble solutions —
              combining exceptional craftsmanship, imported collections and precision manufacturing
              to bring every vision to life in timeless stone.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {['Premium Manufacturing', 'Indian, Imported, Italian Marble', 'Custom Carved Pieces', 'Architectural Solutions'].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8a646]" />
                <span className="font-body text-xs text-[#111111]/75">{f}</span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <MagneticButton
              as="a"
              href="#collection"
              className="shine group inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 font-button text-[12px] font-semibold tracking-[0.15em] uppercase text-white overflow-hidden"
            >
              Know More
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
