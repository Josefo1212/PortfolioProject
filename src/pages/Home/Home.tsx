import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/useAuth';
import { ParticleField } from '../../components/background/ParticleField';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import styles from './Home.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export const Home = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ParticleField />
      <Navbar />
      <main className={styles.main}>
        <section id="home" className={styles.hero}>
          <div className={styles.glow} aria-hidden="true" />
          <Container>
            <div className={styles.content}>
              <motion.span
                className={styles.tag}
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeUp}
              >
                Welcome
              </motion.span>

              <motion.h1
                className={styles.name}
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeUp}
              >
                {user ? `${user.firstName} ${user.lastName}` : 'Developer'}
              </motion.h1>

              <motion.p
                className={styles.subtitle}
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
              >
                Software Developer
              </motion.p>

              <motion.p
                className={styles.description}
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
              >
                Construyendo interfaces modernas y experiencias digitales premium.
                Apasionado por el Frontend, Backend y el diseño UI/UX.
              </motion.p>

              <motion.div
                className={styles.actions}
                initial="hidden"
                animate="visible"
                custom={4}
                variants={fadeUp}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={scrollToProjects}
                  rightIcon={<ExternalLink size={16} />}
                >
                  Ver Proyectos
                </Button>
              </motion.div>
            </div>
          </Container>

          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <ArrowDown size={20} className={styles.scrollArrow} />
          </motion.div>
        </section>

        <section id="skills" className={styles.section}>
          <Container>
            <SkillsSection />
          </Container>
        </section>

        <section id="projects" className={styles.section}>
          <Container>
            <ProjectsSection />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};
