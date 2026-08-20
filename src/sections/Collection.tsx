import { useRef } from 'react';
import { motion } from 'framer-motion';
import { COLLECTION } from '@/data/content';

function TiltCard({ item, index }: { item: (typeof COLLECTION)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) scale(1.03)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
      className="[transform-style:preserve-3d]"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c8a646]/0 transition-all duration-500 hover:border-[#c8a646]/60"
        style={{ transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.5s' }}
      >
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent opacity-90" />
        <div className="absolute inset-0 glass opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <span className="font-button text-[9px] tracking-[0.3em] uppercase text-[#c8a646] mb-2">
            Collection
          </span>
          <h3 className="font-heading text-2xl text-white">{item.name}</h3>
          <p className="mt-2 max-h-0 overflow-hidden font-body text-xs text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="relative bg-[#0c0c0c] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c8a646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Our Collection</span>
            <span className="h-px w-10 bg-[#c8a646]" />
          </div>
          <h2 className="font-heading text-4xl text-white md:text-5xl lg:text-6xl">
            A Curated World of <span className="text-gold-gradient italic">Stone</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-sm text-white/55 md:text-base">
            From the quarries of Carrara to the heart of Makrana — explore a collection curated for
            the most discerning interiors.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTION.map((item, i) => (
            <TiltCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
