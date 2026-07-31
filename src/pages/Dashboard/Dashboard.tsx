import { Code2, FolderGit2, Languages, LogOut, Users } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { useLogoutFlow } from '../../hooks/useLogoutFlow';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { WaitComponent } from '../../components/ui/WaitComponent';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
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

export const Dashboard = () => {
  const { user } = useAuth();
  const { isLoggingOut, handleLogout } = useLogoutFlow();

  return (
    <>
      {isLoggingOut && <WaitComponent />}
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
        </Container>
      </main>
      <Footer />
    </>
  );
};
