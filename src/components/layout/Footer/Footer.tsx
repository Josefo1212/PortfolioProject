import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../icons';
import { Container } from '../../ui/Container';
import styles from './Footer.module.css';

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
