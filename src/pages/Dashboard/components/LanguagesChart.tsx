import { motion, useReducedMotion } from 'framer-motion';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { LANGUAGES } from './data';
import styles from './BarChart.module.css';

const EASE = [0.4, 0, 0.2, 1] as const;

export const LanguagesChart = () => {
  const reduced = useReducedMotion();
  const max = Math.max(...LANGUAGES.map((language) => language.value));

  return (
    <GlassPanel variant="card" className={styles.card}>
      <header className={styles.header}>
        <span className={styles.label}>// Lenguajes</span>
        <h3 className={styles.title}>Lenguajes utilizados</h3>
        <p className={styles.subtitle}>Distribución del código desarrollado por lenguaje</p>
      </header>

      <ol className={styles.list}>
        {LANGUAGES.map(({ name, value }, i) => {
          const width = (value / max) * 100;

          return (
            <li key={name} className={styles.row}>
              <div className={styles.rowHeader}>
                <span className={styles.name}>{name}</span>
              </div>

              <div className={styles.track} role="presentation">
                <motion.span
                  className={`${styles.fill} ${styles.fillGradient}`}
                  style={reduced ? { width: `${width}%` } : undefined}
                  initial={reduced ? false : { width: 0 }}
                  whileInView={reduced ? undefined : { width: `${width}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : i * 0.08 }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </GlassPanel>
  );
};
