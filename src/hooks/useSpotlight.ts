import { useRef, type MouseEvent } from 'react';

export const useSpotlight = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  };

  return { ref, handleMouseMove };
};
