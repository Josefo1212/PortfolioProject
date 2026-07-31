import { type ElementType } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import styles from './StatCard.module.css';

interface StatCardProps {
  icon: ElementType;
  label: string;
  value: string;
  index: number;
}

export const StatCard = ({ icon: Icon, label, value, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    <GlassPanel variant="card" hover className={styles.card}>
      <div className={styles.icon}>
        <Icon size={18} />
      </div>

      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </GlassPanel>
  </motion.div>
);
