import styles from './SectionTitle.module.css';

type Alignment = 'left' | 'center';

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
  alignment?: Alignment;
  className?: string;
}

export const SectionTitle = ({
  label,
  title,
  description,
  alignment = 'left',
  className = '',
}: SectionTitleProps) => (
  <div className={`${styles.container} ${styles[alignment]} ${className}`}>
    <span className={styles.label}>{label}</span>
    <h2 className={styles.title}>{title}</h2>
    {description && <p className={styles.description}>{description}</p>}
  </div>
);
