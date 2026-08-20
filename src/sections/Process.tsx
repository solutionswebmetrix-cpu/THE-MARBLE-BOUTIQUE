import { motion } from 'framer-motion';
import { Cpu, Hand } from 'lucide-react';
import { PROCESS } from '@/data/content';

export default function Process() {
  return (
    <section className="relative bg-[#FCFCF8] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C8A646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#0F5C4D]">Our Process</span>
            <span className="h-px w-10 bg-[#C8A646]" />
          </div>
          <h2 className="font-heading text-4xl text-[#083D34] md:text-5xl">
            From Vision to <span className="text-gold-gradient italic">Reality</span>
          </h2>
        </div>

        <div className="hidden md:block">
          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute left-0 top-7 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#C8A646]/50 to-transparent"
            />
            <div className="grid grid-cols-6 gap-4">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative rounded-[1.5rem] border border-[#0F5C4D]/10 bg-white/80 p-5 text-center shadow-[0_18px_45px_rgba(8,61,52,0.08)]"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C8A646]/40 bg-[#EAF5F2] font-heading text-lg text-[#0F5C4D]">
                    {p.title.includes('Precision Manufacturing') ? (
                      <div className="flex items-center gap-1">
                        <Cpu size={16} />
                        <Hand size={16} />
                      </div>
                    ) : (
                      p.step
                    )}
                  </div>
                  <h3 className="font-heading text-lg text-[#083D34]">{p.title}</h3>
                  <p className="mt-2 font-body text-xs leading-relaxed text-[#1A1A1A]/70">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative border-l border-[#C8A646]/30 pl-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative mb-8 rounded-[1.2rem] border border-[#0F5C4D]/10 bg-white/80 p-4 last:mb-0"
              >
                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-[#C8A646]/50 bg-[#EAF5F2] font-button text-[9px] text-[#0F5C4D]">
                  {p.title.includes('Precision Manufacturing') ? <Cpu size={12} /> : p.step}
                </span>
                <h3 className="font-heading text-lg text-[#083D34]">{p.title}</h3>
                <p className="mt-1 font-body text-xs leading-relaxed text-[#1A1A1A]/70">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
