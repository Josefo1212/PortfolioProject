import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { Container } from '../../ui/Container';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { path: '/home', label: 'Inicio' },
  { path: '/home#skills', label: 'Skills' },
  { path: '/home#projects', label: 'Proyectos' },
  { path: '/dashboard', label: 'Dashboard' },
] as const;

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Update pill position
  useEffect(() => {
    const container = navLinksRef.current;
    if (!container) return;

    const updatePill = () => {
      const activeEl = container.querySelector('[data-active="true"]') as HTMLElement | null;
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
  }, [location.pathname, location.hash]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const handleLogout = useCallback(() => {
    closeMobile();
    logout();
  }, [closeMobile, logout]);

  const isActive = useCallback(
    (path: string) => {
      if (path === '/home') return location.pathname === '/home' && !location.hash;
      if (path === '/home#skills') return location.pathname === '/home' && location.hash === '#skills';
      if (path === '/home#projects') return location.pathname === '/home' && location.hash === '#projects';
      return location.pathname === path;
    },
    [location.pathname, location.hash]
  );

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.content}>
          <Link to="/home" className={styles.logo} onClick={closeMobile}>
            <span className={styles.accent}>&lt;</span>
            Portfolio
            <span className={styles.accent}> /&gt;</span>
          </Link>

          <div className={`${styles.links} ${isMobileOpen ? styles.open : ''}`}>
            <div className={styles.navLinksContainer} ref={navLinksRef}>
              <div ref={pillRef} className={styles.pill} aria-hidden="true" />
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-active={isActive(link.path)}
                  className={`${styles.link} ${isActive(link.path) ? styles.active : ''}`}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button onClick={handleLogout} className={styles.authBtn}>
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
  );
};
