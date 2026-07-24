import { type ReactNode, forwardRef, type ElementType } from 'react';
import styles from './GlassPanel.module.css';

type Variant = 'default' | 'navbar' | 'card' | 'modal';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  blur?: number;
  border?: boolean;
  hover?: boolean;
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
      as: Tag = 'div',
    },
    ref
  ) => (
    <Tag
      ref={ref}
      className={`
        ${styles.panel}
        ${styles[variant]}
        ${border ? styles.withBorder : ''}
        ${hover ? styles.hoverable : ''}
        ${className}
      `}
      style={{
        backdropFilter: `blur(${blur}px) saturate(var(--glass-saturate))`,
      }}
    >
      {children}
    </Tag>
  )
);

GlassPanel.displayName = 'GlassPanel';
