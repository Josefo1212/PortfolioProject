import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { useLogoutFlow } from '../../../hooks/useLogoutFlow';
import { WaitComponent } from '../../ui/WaitComponent';
import { Container } from '../../ui/Container';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { path: '/home', label: 'Inicio' },
  { path: '/home#skills', label: 'Skills' },
  { path: '/home#projects', label: 'Proyectos' },
  { path: '/dashboard', label: 'Dashboard' },
] as const;

type SectionId = 'home' | 'skills' | 'projects';

const HOME_SECTIONS: SectionId[] = ['home', 'skills', 'projects'];

const scrollToHash = (hash: string) => {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const { user } = useAuth();
  const { isLoggingOut, handleLogout } = useLogoutFlow();
  const location = useLocation();
  const navigate = useNavigate();
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    HOME_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Update pill position
  useEffect(() => {
    const container = navLinksRef.current;
    if (!container) return;

    const updatePill = () => {
      const activeEl = container.querySelector('[data-active="true"]');
      const pill = pillRef.current;
      if (!activeEl || !pill) {
        pill?.style.setProperty('--pill-opacity', '0');
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      pill.style.setProperty('--pill-left', `${activeRect.left - containerRect.left}px`);
      pill.style.setProperty('--pill-width', `${activeRect.width}px`);
      pill.style.setProperty('--pill-opacity', '1');
    };

    updatePill();

    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [location.pathname, location.hash, activeSection]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const onLogout = useCallback(() => {
    closeMobile();
    handleLogout();
  }, [closeMobile, handleLogout]);

  const handleNavClick = useCallback((path: string) => {
    closeMobile();

    const hashIndex = path.indexOf('#');
    if (hashIndex !== -1) {
      const hash = path.slice(hashIndex);
      const basePath = path.slice(0, hashIndex);

      if (location.pathname === basePath) {
        scrollToHash(hash);
      } else {
        void navigate(path);
        setTimeout(() => scrollToHash(hash), 100);
      }
    } else if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, navigate, closeMobile]);

  const isActive = useCallback(
    (path: string) => {
      if (path === '/dashboard') return location.pathname === '/dashboard';

      if (location.pathname !== '/home') return false;

      if (activeSection) {
        const section = activeSection;
        if (path === '/home') return section === 'home';
        if (path === '/home#skills') return section === 'skills';
        if (path === '/home#projects') return section === 'projects';
      }

      if (path === '/home') return !location.hash;
      if (path === '/home#skills') return location.hash === '#skills';
      if (path === '/home#projects') return location.hash === '#projects';
      return false;
    },
    [location.pathname, location.hash, activeSection]
  );

  return (
    <>
      {isLoggingOut && <WaitComponent />}
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.content}>
          <span className={styles.logo} aria-label="Portfolio">
            <span>&lt;</span>
            Portfolio
            <span> /&gt;</span>
            <span className={styles.caret}>|</span>
          </span>

          <div className={`${styles.links} ${isMobileOpen ? styles.open : ''}`}>
            <div className={styles.navLinksContainer} ref={navLinksRef}>
              <div ref={pillRef} className={styles.pill} aria-hidden="true" />
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-active={isActive(link.path)}
                  className={`${styles.link} ${isActive(link.path) ? styles.active : ''}`}
                  onClick={() => handleNavClick(link.path)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button onClick={onLogout} className={styles.authBtn}>
              Cerrar Sesión
            </button>

            {user && (
              <span className={styles.userBadge}>{user.firstName.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <button
            className={styles.toggle}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>
    </nav>
    </>
  );
};
