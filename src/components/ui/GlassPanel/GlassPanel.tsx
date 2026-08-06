import { type ElementType, type ReactNode, type Ref } from 'react';
import { useSpotlight } from '../../../hooks/useSpotlight';
import styles from './GlassPanel.module.css';

type Variant = 'default' | 'navbar' | 'card' | 'modal';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  blur?: number;
  border?: boolean;
  hover?: boolean;
  spotlight?: boolean;
  as?: ElementType;
  ref?: Ref<HTMLDivElement>;
}

export const GlassPanel = ({
  children,
  className = '',
  variant = 'default',
  blur = 20,
  border = true,
  hover = false,
  spotlight = false,
  as: Tag = 'div',
  ref,
}: GlassPanelProps) => {
  const { ref: spotlightRef, handleMouseMove } = useSpotlight();

  const setPanelRef = (node: HTMLDivElement | null) => {
    spotlightRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <Tag
      ref={setPanelRef}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      className={`
        ${styles.panel}
        ${styles[variant]}
        ${border ? styles.withBorder : ''}
        ${hover ? styles.hoverable : ''}
        ${spotlight ? styles.spotlight : ''}
        ${className}
      `}
      style={{
        backdropFilter: `blur(${blur}px) saturate(var(--glass-saturate))`,
      }}
    >
      {children}
    </Tag>
  );
};
