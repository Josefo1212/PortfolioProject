import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import styles from './Input.module.css';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`${styles.wrapper} ${className}`}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <div
          className={`
            ${styles.inputWrapper}
            ${styles[inputSize]}
            ${error ? styles.error : ''}
          `}
        >
          {leftIcon && (
            <span className={styles.iconLeft}>{leftIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${leftIcon ? styles.hasLeftIcon : ''} ${rightIcon ? styles.hasRightIcon : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className={styles.iconRight}>{rightIcon}</span>
          )}
        </div>
        {error && (
          <span id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {!error && hint && (
          <span id={`${inputId}-hint`} className={styles.hint}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
