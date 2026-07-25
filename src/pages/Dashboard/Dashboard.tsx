import { useNavigate } from 'react-router';
import { LogOut, User, Activity, FolderGit2 } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Button } from '../../components/ui/Button';
import styles from './Dashboard.module.css';

const CARDS = [
  {
    icon: User,
    title: 'Perfil',
    description: 'Gestiona tu información personal y configuración de cuenta.',
  },
  {
    icon: Activity,
    title: 'Actividad',
    description: 'Revisa tu historial de actividad y estadísticas de la cuenta.',
  },
  {
    icon: FolderGit2,
    title: 'Proyectos',
    description: 'Administra y organiza tus proyectos personales.',
  },
] as const;

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Container>
          <header className={styles.header}>
            <h1 className={styles.title}>
              Bienvenido, <span className={styles.accent}>{user?.firstName} {user?.lastName}</span>
            </h1>
            <p className={styles.subtitle}>Este es tu panel de control</p>
          </header>

          <div className={styles.grid}>
            {CARDS.map(({ icon: Icon, title, description }) => (
              <GlassPanel key={title} variant="card" hover className={styles.card}>
                <div className={styles.cardIcon}>
                  <Icon size={20} />
                </div>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardText}>{description}</p>
              </GlassPanel>
            ))}
          </div>

          <Button
            variant="secondary"
            leftIcon={<LogOut size={16} />}
            onClick={handleLogout}
            className={styles.logoutBtn}
          >
            Cerrar Sesión
          </Button>
        </Container>
      </main>
      <Footer />
    </>
  );
};
