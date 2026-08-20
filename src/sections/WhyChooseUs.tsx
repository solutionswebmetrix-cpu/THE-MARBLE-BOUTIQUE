import { motion } from 'framer-motion';
import {
  Gem,
  Globe2,
  Hammer,
  PenTool,
  BadgeIndianRupee,
  Wrench,
  Truck,
  HeartHandshake,
} from 'lucide-react';
import { WHY_CHOOSE } from '@/data/content';

const ICONS = {
  Gem,
  Globe2,
  Hammer,
  PenTool,
  BadgeIndianRupee,
  Wrench,
  Truck,
  HeartHandshake,
} as const;

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-24 md:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a646]/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c8a646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Why Choose Us</span>
            <span className="h-px w-10 bg-[#c8a646]" />
          </div>
          <h2 className="font-heading text-4xl text-white md:text-5xl">
            The Marble Boutique <span className="text-gold-gradient italic">Difference</span>
          </h2>
        </div>

        <div className="grid gap-px bg-[#c8a646]/10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((w, i) => {
            const Icon = ICONS[w.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className="group relative bg-[#0c0c0c] p-8 transition-colors duration-500 hover:bg-[#111111]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c8a646]/30 text-[#c8a646] transition-all duration-500 group-hover:bg-[#c8a646] group-hover:text-[#111111]">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading text-xl text-white">{w.title}</h3>
                <p className="mt-3 font-body text-xs leading-relaxed text-white/55">{w.desc}</p>
                <span className="absolute right-6 top-6 font-heading text-3xl text-white/5 transition-colors group-hover:text-[#c8a646]/20">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
