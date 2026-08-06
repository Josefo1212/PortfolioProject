import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const MAX_TILT = 7;

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches;

export const useTilt = (maxTilt = MAX_TILT) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || reduced || isCoarsePointer()) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      el.style.setProperty('--tilt-x', `${(0.5 - y) * 2 * maxTilt}deg`);
      el.style.setProperty('--tilt-y', `${(x - 0.5) * 2 * maxTilt}deg`);
      el.style.setProperty('--glare-x', `${x * 100}%`);
      el.style.setProperty('--glare-y', `${y * 100}%`);
    },
    [maxTilt, reduced]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  return { tiltRef: ref, handleMouseMove, handleMouseLeave };
};
