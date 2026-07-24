import { type ReactNode } from 'react';
import styles from './Container.module.css';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: MaxWidth;
  as?: 'div' | 'section' | 'main' | 'article';
}

export const Container = ({
  children,
  className = '',
  maxWidth = 'lg',
  as: Tag = 'div',
}: ContainerProps) => (
  <Tag className={`${styles.container} ${styles[maxWidth]} ${className}`}>
    {children}
  </Tag>
);
