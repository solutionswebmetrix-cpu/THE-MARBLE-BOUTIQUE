import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data/content';

export default function Projects() {
  return (
    <section id="projects" className="relative bg-[#0c0c0c] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c8a646]" />
              <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Featured Projects</span>
            </div>
            <h2 className="font-heading text-4xl text-white md:text-5xl">
              Built for the <span className="text-gold-gradient italic">Extraordinary</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-sm text-white/55">
            A selection of landmark villas, hotels, temples and commercial spaces shaped by our stone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 lg:gap-5">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.name}
              href="#gallery"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden rounded-sm ${p.span}`}
            >
              <div className="h-full min-h-[280px] w-full overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-6">
                <div>
                  <p className="font-button text-[8px] tracking-[0.3em] uppercase text-[#c8a646] mb-1">
                    {p.category}
                  </p>
                  <h3 className="font-heading text-xl text-white md:text-2xl">{p.name}</h3>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all group-hover:border-[#c8a646] group-hover:bg-[#c8a646] group-hover:text-[#111111]">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
