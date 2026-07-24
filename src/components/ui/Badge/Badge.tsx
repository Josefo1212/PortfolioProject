import { type ReactNode, type ElementType } from 'react';
import styles from './Badge.module.css';

type Variant = 'default' | 'primary' | 'secondary' | 'outline';
type Size = 'xs' | 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  icon?: ElementType;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export const Badge = ({
  children,
  icon: Icon,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) => (
  <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
    {Icon && (
      <span className={styles.icon}>
        <Icon size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} />
      </span>
    )}
    <span className={styles.label}>{children}</span>
  </span>
);
