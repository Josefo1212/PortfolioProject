import { useNavigate } from 'react-router';
import { Activity, Code2, FolderGit2, Languages, LogOut, User, Users } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Button } from '../../components/ui/Button';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { StatCard } from './components/StatCard';
import { ProjectsChart } from './components/ProjectsChart';
import { LinesChart } from './components/LinesChart';
import { Services } from './components/Services';
import styles from './Dashboard.module.css';

const STATS = [
  { icon: Code2, label: 'Líneas de Código', value: '85k+' },
  { icon: Languages, label: 'Lenguajes', value: '8' },
  { icon: FolderGit2, label: 'Proyectos', value: '12' },
  { icon: Users, label: 'Proyectos en Equipo', value: '6' },
] as const;

const QUICK_LINKS = [
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
            <div>
              <h1 className={styles.title}>
                Bienvenido, <span className={styles.accent}>{user?.firstName} {user?.lastName}</span>
              </h1>
              <p className={styles.subtitle}>Este es tu panel de control</p>
            </div>

            <Button
              variant="secondary"
              leftIcon={<LogOut size={16} />}
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              Cerrar Sesión
            </Button>
          </header>

          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>

          <div className={styles.chartsGrid}>
            <ProjectsChart />
            <LinesChart />
          </div>

          <Services />

          <section className={styles.quickSection}>
            <SectionTitle
              label="// Accesos rápidos"
              title="Módulos"
              alignment="left"
            />

            <div className={styles.quickGrid}>
              {QUICK_LINKS.map(({ icon: Icon, title, description }) => (
                <GlassPanel key={title} variant="card" hover className={styles.quickCard}>
                  <div className={styles.quickIcon}>
                    <Icon size={20} />
                  </div>
                  <h2 className={styles.quickTitle}>{title}</h2>
                  <p className={styles.quickText}>{description}</p>
                </GlassPanel>
              ))}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
};
