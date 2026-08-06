import { type CSSProperties, type ReactNode } from 'react';
import styles from './Marquee.module.css';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export const Marquee = ({
  children,
  speed = 30,
  reverse = false,
  className = '',
}: MarqueeProps) => {
  const trackStyle = { '--marquee-speed': `${speed}s` } as CSSProperties;

  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.reverse : ''} ${className}`}
      role="presentation"
    >
      <div className={styles.track} style={trackStyle}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
