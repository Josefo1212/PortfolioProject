import { motion } from 'framer-motion';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { SERVICES } from './data';
import styles from './Services.module.css';

export const Services = () => (
  <GlassPanel variant="card" className={styles.card}>
    <header className={styles.header}>
      <div className={styles.dots} aria-hidden="true">
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
      </div>
      <div>
        <span className={styles.label}>// Servicios</span>
        <h3 className={styles.title}>Qué puedo ofrecer</h3>
      </div>
    </header>

    <div className={styles.grid}>
      {SERVICES.map(({ icon: Icon, title, description }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={styles.service}
        >
          <div className={styles.serviceIcon}>
            <Icon size={18} />
          </div>
          <h4 className={styles.serviceTitle}>{title}</h4>
          <p className={styles.serviceText}>{description}</p>
        </motion.div>
      ))}
    </div>
  </GlassPanel>
);
