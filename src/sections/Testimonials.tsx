import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/content';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const count = TESTIMONIALS.length;

  const go = useCallback((next: number, d: number) => {
    setDir(d);
    setI((p) => (next + count) % count);
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => go(i + 1, 1), 5500);
    return () => clearInterval(id);
  }, [i, go]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-24 md:py-32">
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#c8a646]/5 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c8a646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Testimonials</span>
            <span className="h-px w-10 bg-[#c8a646]" />
          </div>
          <h2 className="font-heading text-4xl text-white md:text-5xl">
            Words from Our <span className="text-gold-gradient italic">Clientele</span>
          </h2>
        </div>

        <div className="relative min-h-[320px] md:min-h-[280px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark rounded-sm p-8 md:p-12 text-center"
            >
              <Quote size={32} className="mx-auto mb-5 text-[#c8a646]" />
              <p className="font-heading text-xl italic leading-relaxed text-white/90 md:text-2xl">
                “{t.text}”
              </p>
              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={15} className="fill-[#c8a646] text-[#c8a646]" />
                ))}
              </div>
              <p className="mt-4 font-button text-sm tracking-wide text-[#c8a646]">{t.name}</p>
              <p className="mt-1 font-body text-xs text-white/45">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(i - 1, -1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c8a646] hover:text-[#c8a646]"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, d) => (
              <button
                key={d}
                onClick={() => go(d, d > i ? 1 : -1)}
                aria-label={`Go to testimonial ${d + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  d === i ? 'w-6 bg-[#c8a646]' : 'w-1.5 bg-white/25'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(i + 1, 1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#c8a646] hover:text-[#c8a646]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
