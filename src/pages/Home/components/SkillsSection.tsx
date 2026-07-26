import { type ElementType } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Monitor, Server, Wrench } from 'lucide-react';
import { Tabs, TabList, Tab, TabPanel } from '../../../components/ui/Tabs';
import { Badge } from '../../../components/ui/Badge';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import styles from './SkillsSection.module.css';

interface Skill {
  name: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: ElementType;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Monitor,
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Angular' },
      { name: 'HTML5' },
      { name: 'JavaScript' },    
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'PostgreSQL' },
      { name: 'REST APIs' },
      { name: 'Microservices' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'pnpm' },
    ],
  },
];

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export const SkillsSection = () => {
  return (
    <div className={styles.wrapper}>
      <SectionTitle
        label="// Skills"
        title="Habilidades"
        description="Tecnologías y herramientas que domino."
        alignment="center"
      />

      <Tabs defaultValue={SKILL_CATEGORIES[0].id}>
        <TabList className={styles.tabList}>
          {SKILL_CATEGORIES.map((cat) => (
            <Tab key={cat.id} value={cat.id}>
              <span className={styles.tabContent}>
                <cat.icon size={14} />
                {cat.label}
              </span>
            </Tab>
          ))}
        </TabList>

        {SKILL_CATEGORIES.map((cat) => (
          <TabPanel key={cat.id} value={cat.id}>
            <div className={styles.grid}>
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  custom={i}
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Badge variant="default" size="md" className={styles.skillBadge}>
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
