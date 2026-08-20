import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo/logo.png';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setExit(true), 500);
        setTimeout(onDone, 1100);
      }
      setProgress(Math.floor(p));
    }, 120);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#083D34]"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <img
              src={logo}
              alt="The Marble Boutique logo"
              className="mx-auto mb-6 h-[100px] w-[100px] object-contain"
              width={100}
              height={100}
              loading="eager"
              decoding="async"
            />
            <h1 className="mb-8 font-heading text-4xl text-white md:text-6xl">
              We Deliver
              <span className="block text-gold-gradient italic">Your Vision</span>
            </h1>
          </motion.div>

          <div className="w-56 md:w-72">
            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-[#0F5C4D] via-[#C8A646] to-[#EAF5F2]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 flex justify-between font-button text-[10px] tracking-widest text-white/40">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
