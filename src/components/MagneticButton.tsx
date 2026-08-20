import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  as = 'button',
  href,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );

  if (as === 'a') {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className="inline-block"
      >
        {inner}
      </a>
    );
  }
  if (as === 'button') {
    return (
      <button onClick={onClick} aria-label={ariaLabel} className="inline-block">
        {inner}
      </button>
    );
  }
  return inner;
}
