import { Boxes, Code2, FolderGit2, Languages, Layers } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { useLogoutFlow } from '../../hooks/useLogoutFlow';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ParticleField } from '../../components/background/ParticleField';
import { WaitComponent } from '../../components/ui/WaitComponent';
import { Container } from '../../components/ui/Container';
import { StatCard } from './components/StatCard';
import { SkillsRadar } from './components/SkillsRadar';
import { StackDonut } from './components/StackDonut';
import { Services } from './components/Services';
import styles from './Dashboard.module.css';

const STATS = [
  { icon: Code2, label: 'Líneas de Código', value: '85k+' },
  { icon: Languages, label: 'Lenguajes', value: '8' },
  { icon: FolderGit2, label: 'Proyectos', value: '12' },
  { icon: Boxes, label: 'Componentes', value: '50+' },
  { icon: Layers, label: 'Tecnologías', value: '12' },
] as const;

export const Dashboard = () => {
  const { user } = useAuth();
  const { isLoggingOut } = useLogoutFlow();

  return (
    <>
      <ParticleField />
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
          </header>

          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>

          <div className={styles.chartsGrid}>
            <SkillsRadar />
            <StackDonut />
          </div>

          <Services />
        </Container>
      </main>
      <Footer />
    </>
  );
};
