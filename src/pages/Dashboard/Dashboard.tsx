import { Boxes, Code2, FolderGit2, Languages, Layers } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ParticleField } from '../../components/background/ParticleField';
import { Container } from '../../components/ui/Container';
import { StatCard } from './components/StatCard';
import { SkillsRadar } from './components/SkillsRadar';
import { CategoryChart } from './components/CategoryChart';
import { Services } from './components/Services';
import styles from './Dashboard.module.css';

const STATS = [
  { icon: Code2, label: 'Líneas de Código', value: 85, suffix: 'k+' },
  { icon: Languages, label: 'Lenguajes', value: 5, suffix: '' },
  { icon: FolderGit2, label: 'Proyectos', value: 50, suffix: '' },
  { icon: Boxes, label: 'Componentes', value: 50, suffix: '+' },
  { icon: Layers, label: 'Tecnologías', value: 12, suffix: '' },
] as const;

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <ParticleField />
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
            <CategoryChart />
          </div>

          <Services />
        </Container>
      </main>
      <Footer />
    </>
  );
};
