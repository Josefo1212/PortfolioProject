import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorBanner = ({ message, onDismiss }: ErrorBannerProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          className={styles.banner}
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          role="alert"
        >
          <div className={styles.icon}>
            <AlertTriangle size={14} />
          </div>
          <div className={styles.body}>
            <span className={styles.prefix}>error:</span>
            <span className={styles.message}>{message}</span>
          </div>
          {onDismiss && (
            <button
              type="button"
              className={styles.dismiss}
              onClick={onDismiss}
              aria-label="Dismiss error"
            >
              ×
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
