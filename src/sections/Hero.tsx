import { motion } from 'framer-motion';
import { ArrowRight, Phone, CalendarCheck } from 'lucide-react';
import { COMPANY } from '@/data/content';
import heroImg from '@/assets/Italian Marble.png';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-[#F7F4EF]">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury marble showroom with premium slabs"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-24 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[650px] text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C8A646]" />
            <span className="font-button text-[11px] uppercase tracking-[0.35em] text-[#C8A646]">
              Luxury Marble Manufacturer
            </span>
          </div>

          <h1 className="font-heading text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Crafting Timeless
            <span className="mt-2 block italic text-[#E4C46A]">Luxury in Marble</span>
          </h1>

          <p className="mt-5 font-heading text-xl italic text-white/90 sm:text-2xl">
            We Deliver Your Vision
          </p>

          <p className="mx-auto mt-5 max-w-[560px] font-body text-sm leading-7 text-white/85 sm:text-base">
            Premium Imported Marble • Italian Marble • Indian Marble • Granite • Luxury Stone
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-[#23493D] px-6 py-3 font-button text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2E5A4A]"
            >
              Explore Collection
              <ArrowRight size={16} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-6 py-3 font-button text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#E4C46A] hover:bg-[#E4C46A] hover:text-[#1F1F1F]"
            >
              <CalendarCheck size={16} />
              Get Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
