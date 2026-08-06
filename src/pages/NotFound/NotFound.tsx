import { useNavigate } from 'react-router';
import { useAuth } from '../../context/useAuth';
import { Button } from '../../components/ui/Button';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Container } from '../../components/ui/Container';
import styles from './NotFound.module.css';

export const NotFound = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const goHome = () => navigate(isAuthenticated ? '/home' : '/');

  return (
    <div className={styles.page}>
      <div className={styles.orbs} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
      </div>

      <Container maxWidth="sm">
        <GlassPanel variant="modal" className={styles.panel}>
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>Página no encontrada</h1>
          <p className={styles.text}>
            La página que buscas no existe o fue movida a otra dirección.
          </p>
          <Button variant="glow" size="lg" onClick={goHome} className={styles.button}>
            Volver al inicio
          </Button>
        </GlassPanel>
      </Container>
    </div>
  );
};
