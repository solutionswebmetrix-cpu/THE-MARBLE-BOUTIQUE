import { motion } from 'framer-motion';
import { APPLICATIONS } from '@/data/content';

export default function Applications() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c8a646]" />
              <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Featured Applications</span>
            </div>
            <h2 className="font-heading text-4xl text-[#111111] md:text-5xl">
              Where Luxury <span className="text-gold-gradient italic">Lives</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-sm text-[#111111]/60">
            Every surface tells a story. See how our marble transforms the spaces that matter most.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {APPLICATIONS.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.08 }}
              className={`group relative overflow-hidden rounded-sm ${
                i === 0 ? 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className={`${i === 0 ? 'aspect-square' : 'aspect-[4/5]'} w-full overflow-hidden`}>
                <img
                  src={app.img}
                  alt={app.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-5">
                <p className="font-button text-[8px] tracking-[0.3em] uppercase text-[#c8a646] mb-1">
                  Application
                </p>
                <h3 className={`font-heading text-white ${i === 0 ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'}`}>
                  {app.name}
                </h3>
              </div>
              <span className="absolute inset-0 border border-[#c8a646]/0 transition-colors duration-500 group-hover:border-[#c8a646]/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
