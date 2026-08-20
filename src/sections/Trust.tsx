import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { COUNTERS } from '@/data/content';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Trust() {
  return (
    <section className="relative bg-[#0c0c0c] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {COUNTERS.map((c, i) => (
            <div
              key={c.label}
              className="group relative text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="font-heading text-4xl text-gold-gradient md:text-6xl">
                <Counter value={c.value} suffix={c.suffix} />
              </div>
              <p className="mt-3 font-button text-[10px] tracking-[0.25em] uppercase text-white/55 md:text-xs">
                {c.label}
              </p>
              {i < COUNTERS.length - 1 && (
                <span className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#c8a646]/30 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
