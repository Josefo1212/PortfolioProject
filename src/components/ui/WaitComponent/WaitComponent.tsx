import { motion } from 'framer-motion';
import styles from './WaitComponent.module.css';

export const WaitComponent = () => (
  <motion.div
    className={styles.overlay}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  >
    <div className={styles.orbs} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
    </div>

    <div className={styles.content}>
      <div className={styles.scene}>
        <div className={styles.cube}>
          <div className={`${styles.face} ${styles.front}`} />
          <div className={`${styles.face} ${styles.back}`} />
          <div className={`${styles.face} ${styles.right}`} />
          <div className={`${styles.face} ${styles.left}`} />
          <div className={`${styles.face} ${styles.top}`} />
          <div className={`${styles.face} ${styles.bottom}`} />
        </div>
      </div>
      <p className={styles.text}>
        Cargando portafolio<span className={styles.dots}><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  </motion.div>
);
