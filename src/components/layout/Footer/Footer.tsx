import { Mail } from 'lucide-react';
import { GitHubIcon } from '../../icons';
import { Container } from '../../ui/Container';
import styles from './Footer.module.css';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);

const MailIcon = () => <Mail size={16} />;

const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  {
    Icon: GitHubIcon,
    href: 'https://github.com/Josefo1212?tab=repositories',
    label: 'GitHub',
  },
  {
    Icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/jose-fereira-56b52034a/',
    label: 'LinkedIn',
  },
  {
    Icon: MailIcon,
    href: 'mailto:jffcastillo0@gmail.com',
    label: 'Email',
  },
] as const;

export const Footer = () => {
  const fullName = 'Jose Fereira';

  return (
    <footer className={styles.footer}>
      <div className={styles.gradientLine} aria-hidden="true" />
      <Container>
        <div className={styles.content}>
          <p className={styles.text}>
            Designed &amp; Built by{' '}
            <span className={styles.accent}>{fullName}</span>
          </p>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>

          <p className={styles.copyright}>
            &copy; {CURRENT_YEAR}. Built with React + TypeScript
          </p>
        </div>
      </Container>
    </footer>
  );
};
