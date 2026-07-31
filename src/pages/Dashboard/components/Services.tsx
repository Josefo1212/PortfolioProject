import { type ComponentProps } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { useSpotlight } from '../../../hooks/useSpotlight';
import { SERVICES, type Service } from './data';
import styles from './Services.module.css';

interface ServiceCardProps extends ComponentProps<typeof motion.div> {
  service: Service;
  index: number;
}

const ServiceCard = ({ service: { icon: Icon, title, description }, index }: ServiceCardProps) => {
  const { ref, handleMouseMove } = useSpotlight();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={styles.service}
    >
      <div className={styles.serviceIcon}>
        <Icon size={18} />
      </div>
      <h4 className={styles.serviceTitle}>{title}</h4>
      <p className={styles.serviceText}>{description}</p>
    </motion.div>
  );
};

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
      {SERVICES.map((service, i) => (
        <ServiceCard key={service.title} service={service} index={i} />
      ))}
    </div>
  </GlassPanel>
);
