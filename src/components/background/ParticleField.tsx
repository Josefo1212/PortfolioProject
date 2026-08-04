import { useEffect, useRef } from 'react';
import styles from './ParticleField.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const COLORS = ['#00D4FF', '#7C3AED', '#E6F7FF'];
const LINE_DISTANCE = 120;
const MAX_PARTICLES = 90;
const MIN_PARTICLES = 24;

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  radius: 1 + Math.random() * 1.2,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  alpha: 0.55 + Math.random() * 0.3,
});

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    let particles: Particle[] = [];
    let animationId = 0;
    const isRunning = !reduceMotion();

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnParticles();
    };

    const spawnParticles = () => {
      const count = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, Math.round((width * height) / 16000)));
      particles = Array.from({ length: count }, () => createParticle(width, height));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINE_DISTANCE) {
            const opacity = (1 - dist / LINE_DISTANCE) * 0.16;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.globalAlpha = p.alpha * 0.2;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      if (!isRunning) return;
      cancelAnimationFrame(animationId);
      drawFrame();
    };

    const stop = () => cancelAnimationFrame(animationId);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (isRunning) start();
    };

    const onResize = () => {
      setCanvasSize();
      if (isRunning) start();
      else renderStatic();
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    setCanvasSize();
    if (isRunning) {
      start();
    } else {
      renderStatic();
    }

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};
