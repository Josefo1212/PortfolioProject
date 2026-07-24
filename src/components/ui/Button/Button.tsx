import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={`
          ${styles.button}
          ${styles[variant]}
          ${styles[size]}
          ${isLoading ? styles.loading : ''}
          ${className}
        `}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : leftIcon ? (
          <span className={styles.icon}>{leftIcon}</span>
        ) : null}
        <span className={styles.content}>{children}</span>
        {!isLoading && rightIcon && (
          <span className={styles.icon}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
