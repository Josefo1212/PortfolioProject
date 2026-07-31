import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ClickSpark.module.css';

const BURST_LIFETIME = 550;
const MAX_BURSTS = 12;

interface Burst {
  id: number;
  x: number;
  y: number;
}

export const ClickSpark = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleClick = (event: MouseEvent) => {
      const burst: Burst = {
        id: ++idRef.current,
        x: event.clientX,
        y: event.clientY,
      };

      setBursts((prev) => [...prev.slice(-(MAX_BURSTS - 1)), burst]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burst.id));
      }, BURST_LIFETIME);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className={styles.layer} aria-hidden="true">
      {bursts.map((burst) => (
        <motion.div key={burst.id} className={styles.burst} style={{ left: burst.x, top: burst.y }}>
          <motion.span
            className={styles.flash}
            initial={{ opacity: 0.4, scale: 0.15 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <motion.span
            className={styles.ring}
            initial={{ opacity: 0.6, scale: 0.2 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        </motion.div>
      ))}
    </div>
  );
};
