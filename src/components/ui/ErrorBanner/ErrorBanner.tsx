import { AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ErrorBanner.module.css';

type Variant = 'error' | 'success';

interface ErrorBannerProps {
  message: string;
  variant?: Variant;
  onDismiss?: () => void;
}

const ICONS = {
  error: AlertTriangle,
  success: CheckCircle,
};

const PREFIX = {
  error: 'error:',
  success: 'success:',
} as const;

export const ErrorBanner = ({ message, variant = 'error', onDismiss }: ErrorBannerProps) => {
  const Icon = ICONS[variant];

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          className={`${styles.banner} ${styles[variant]}`}
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          role="alert"
        >
          <div className={`${styles.icon} ${styles[variant]}`}>
            <Icon size={14} />
          </div>
          <div className={styles.body}>
            <span className={styles.prefix}>{PREFIX[variant]}</span>
            <span className={styles.message}>{message}</span>
          </div>
          {onDismiss && (
            <button
              type="button"
              className={styles.dismiss}
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              ×
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
