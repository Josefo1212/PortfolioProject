import { forwardRef, type ElementType, type ReactNode } from 'react';
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
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      blur = 20,
      border = true,
      hover = false,
      spotlight = false,
      as: Tag = 'div',
    },
    ref
  ) => {
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
  }
);

GlassPanel.displayName = 'GlassPanel';
