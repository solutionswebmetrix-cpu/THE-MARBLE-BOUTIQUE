import { motion } from 'framer-motion';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import DustParticles from '@/components/DustParticles';
import { COMPANY } from '@/data/content';

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#111111] py-28 md:py-40">
      <DustParticles count={30} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a646]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c8a646]" />
            <span className="font-button text-[11px] tracking-[0.4em] uppercase text-[#c8a646]">Get in Touch</span>
            <span className="h-px w-10 bg-[#c8a646]" />
          </div>
          <h2 className="font-heading text-4xl leading-tight text-white md:text-6xl">
            Bring Your Dream Space
            <span className="block text-gold-gradient italic">to Life</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-sm text-white/60 md:text-base">
            From premium imported marble to custom carved masterpieces, we transform your vision
            into timeless elegance.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as="a"
              href={`tel:${COMPANY.phoneRaw}`}
              className="shine group inline-flex items-center gap-2 rounded-full bg-[#c8a646] px-8 py-4 font-button text-[12px] font-semibold tracking-[0.15em] uppercase text-[#111111] overflow-hidden"
            >
              <Phone size={16} />
              Call Now
            </MagneticButton>
            <MagneticButton
              as="a"
              href={`https://wa.me/${COMPANY.phoneRaw}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[#25D366]/50 px-8 py-4 font-button text-[12px] font-semibold tracking-[0.15em] uppercase text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#111111]"
            >
              <MessageCircle size={16} />
              WhatsApp
            </MagneticButton>
            <MagneticButton
              as="a"
              href={`mailto:${COMPANY.email}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-button text-[12px] font-semibold tracking-[0.15em] uppercase text-white transition-colors hover:border-[#c8a646] hover:text-[#c8a646]"
            >
              <FileText size={16} />
              Get Free Quote
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
