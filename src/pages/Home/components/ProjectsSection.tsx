import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../components/ui/Accordion';
import { PROJECTS, type Project } from './data';
import styles from './ProjectsSection.module.css';

const GAP = 24;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ProjectCard = ({ project, active }: { project: Project; active: boolean }) => {
  const Icon = project.icon;

  return (
    <article className={`${styles.card} ${active ? styles.cardActive : ''}`}>
      <div className={`${styles.preview} ${styles[project.gradient]}`}>
        <div className={styles.windowBar}>
          <span className={styles.windowDots}>
            <span className={`${styles.winDot} ${styles.winDotRed}`} />
            <span className={`${styles.winDot} ${styles.winDotYellow}`} />
            <span className={`${styles.winDot} ${styles.winDotGreen}`} />
          </span>
          <span className={styles.windowTitle}>{project.title.toLowerCase().replaceAll(' ', '-')}</span>
        </div>

        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`Captura de ${project.title}`}
            className={styles.previewImage}
            loading="lazy"
          />
        ) : project.video ? (
          <video
            src={project.video}
            className={styles.previewVideo}
            controls
            muted
            loop
            preload="metadata"
          />
        ) : (
          <div className={styles.previewIcon}>
            <Icon size={30} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <Badge variant="outline" size="xs">
          {project.category}
        </Badge>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.tech}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techItem}>
              {t}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <GitHubIcon />
            <span>Código</span>
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <ExternalLink size={14} />
              <span>Demo</span>
            </a>
          )}
        </div>

        <Accordion className={styles.details}>
          <AccordionItem value="details">
            <AccordionTrigger>Ver detalles</AccordionTrigger>
            <AccordionContent>
              <div className={styles.detailBlock}>
                <span className={styles.detailLabel}>Objetivo</span>
                <p className={styles.detailText}>{project.objective}</p>
              </div>

              <div className={styles.detailBlock}>
                <span className={styles.detailLabel}>Logros</span>
                <ul className={styles.detailList}>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {project.codeSnippet && (
                <div className={styles.detailBlock}>
                  <span className={styles.detailLabel}>
                    Código · <span className={styles.detailFile}>{project.codeSnippet.filename}</span>
                  </span>
                  <pre className={styles.codeBlock}>
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </article>
  );
};

export const ProjectsSection = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const visible = containerWidth < 640 ? 1 : containerWidth < 1024 ? 2 : 3;
  const slideWidth = (containerWidth - (visible - 1) * GAP) / visible;
  const maxIndex = Math.max(0, PROJECTS.length - visible);
  const offset = slideWidth + GAP;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleResize = (width: number) => {
      setContainerWidth(width);
      const newVisible = width < 640 ? 1 : width < 1024 ? 2 : 3;
      setIndex((prev) => Math.min(prev, Math.max(0, PROJECTS.length - newVisible)));
    };

    const ro = new ResizeObserver((entries) => {
      handleResize(entries[0]?.contentRect.width ?? 0);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const goPrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setIndex((prev) => Math.min(maxIndex, prev + 1));

  const handleTrackKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <div className={styles.wrapper}>
      <SectionTitle
        label="// Proyectos"
        title="Proyectos Destacados"
        description="Una selección de proyectos en los que he trabajado."
        alignment="center"
      />

      <div ref={viewportRef} className={styles.viewport}>
        <motion.div
          className={styles.track}
          drag="x"
          dragConstraints={{ left: -maxIndex * offset, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          animate={{ x: -index * offset }}
          transition={{ type: 'spring', stiffness: 280, damping: 32, mass: 0.9 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) goNext();
            else if (info.offset.x > 60) goPrev();
          }}
          role="list"
          tabIndex={0}
          onKeyDown={handleTrackKeyDown}
          aria-label="Carrusel de proyectos"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className={styles.slide}
              style={{ minWidth: slideWidth, maxWidth: slideWidth }}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              role="listitem"
            >
              <ProjectCard project={project} active={i === index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Proyecto anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div className={styles.dots} role="tablist" aria-label="Seleccionar proyecto">
          {PROJECTS.slice(0, maxIndex + 1).map((project, i) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.pageDot} ${i === index ? styles.pageDotActive : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              aria-selected={i === index}
              role="tab"
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.arrowBtn}
          onClick={goNext}
          disabled={index === maxIndex}
          aria-label="Siguiente proyecto"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
