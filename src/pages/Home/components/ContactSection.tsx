import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../../components/icons';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { Reveal } from '../../../components/ui/Reveal/Reveal';
import styles from './ContactSection.module.css';

const EMAIL = 'jffcastillo0@gmail.com';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    value: 'github.com/Josefo1212',
    href: 'https://github.com/Josefo1212?tab=repositories',
    Icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jose-fereira-56b52034a',
    href: 'https://www.linkedin.com/in/jose-fereira-56b52034a/',
    Icon: LinkedInIcon,
  },
] as const;

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className={styles.wrapper}>
      <Reveal>
        <SectionTitle
          label="// Contacto"
          title="Hablemos"
          description="¿Tienes un proyecto en mente o quieres colaborar? Escríbeme."
          alignment="center"
        />
      </Reveal>

      <Reveal delay={0.15}>
        <div className={styles.grid}>
        <button
          type="button"
          className={`${styles.card} ${styles.cardCopy}`}
          onClick={copyEmail}
          aria-label="Copiar email"
        >
          <div className={styles.cardIcon}>
            <Mail size={18} />
          </div>
          <span className={styles.cardLabel}>Email</span>
          <span className={styles.cardValue}>{EMAIL}</span>
          <span className={`${styles.copyBadge} ${copied ? styles.copyBadgeDone : ''}`}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copiado' : 'Copiar'}
          </span>
        </button>

        {SOCIAL_LINKS.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardIcon}>
              <Icon size={18} />
            </div>
            <span className={styles.cardLabel}>{label}</span>
            <span className={styles.cardValue}>{value}</span>
          </a>
        ))}
        </div>
      </Reveal>
    </div>
  );
};
