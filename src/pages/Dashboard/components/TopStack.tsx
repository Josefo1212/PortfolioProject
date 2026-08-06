import { motion, useReducedMotion } from 'framer-motion';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { TOP_STACK } from './data';
import styles from './BarChart.module.css';

const EASE = [0.4, 0, 0.2, 1] as const;

export const TopStack = () => {
  const reduced = useReducedMotion();
  const max = Math.max(...TOP_STACK.map((item) => item.value));

  return (
    <GlassPanel variant="card" className={styles.card}>
      <header className={styles.header}>
        <span className={styles.label}>// Stack</span>
        <h3 className={styles.title}>Top Stack</h3>
        <p className={styles.subtitle}>Tecnologías con mayor presencia en mis proyectos</p>
      </header>

      <ol className={styles.list}>
        {TOP_STACK.map(({ name, value }, i) => {
          const width = (value / max) * 100;

          return (
            <li key={name} className={styles.row}>
              <div className={styles.rowHeader}>
                <span className={styles.rank} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={styles.name}>{name}</span>
                {i === 0 && <span className={styles.badge}>Most Used</span>}
              </div>

              <div className={styles.track} role="presentation">
                <motion.span
                  className={styles.fill}
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
