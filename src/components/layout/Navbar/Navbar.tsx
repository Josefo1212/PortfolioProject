import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { Container } from '../../ui/Container';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { path: '/', label: 'Inicio' },
  { path: '/#skills', label: 'Skills' },
  { path: '/#projects', label: 'Proyectos' },
] as const;

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const handleLogout = useCallback(() => {
    closeMobile();
    logout();
  }, [closeMobile, logout]);

  const isActive = useCallback(
    (path: string) => path === '/' && location.pathname === '/',
    [location.pathname]
  );

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.content}>
          <Link to="/" className={styles.logo} onClick={closeMobile}>
            <span className={styles.accent}>&lt;</span>
            Portfolio
            <span className={styles.accent}> /&gt;</span>
          </Link>

          <div className={`${styles.links} ${isMobileOpen ? styles.open : ''}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.link} ${isActive(link.path) ? styles.active : ''}`}
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={styles.link} onClick={closeMobile}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className={styles.authBtn}>
                  Cerrar Sesión
                </button>
                {user && (
                  <span className={styles.userBadge}>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </>
            ) : (
              <Link to="/login" className={styles.authBtn} onClick={closeMobile}>
                Iniciar Sesión
              </Link>
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
