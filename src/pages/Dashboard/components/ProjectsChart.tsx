import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { PROJECTS_BY_YEAR } from './data';
import { ChartTooltip } from './ChartTooltip';
import styles from './ChartCard.module.css';

export const ProjectsChart = () => (
  <GlassPanel variant="card" className={styles.card}>
    <header className={styles.header}>
      <span className={styles.label}>// Trayectoria</span>
      <h3 className={styles.title}>Proyectos por año</h3>
    </header>

    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={PROJECTS_BY_YEAR} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="projectsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="#4A4E63"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={6}
          />
          <YAxis
            stroke="#4A4E63"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: 'rgba(0, 212, 255, 0.3)', strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="projects"
            stroke="#00D4FF"
            strokeWidth={2}
            fill="url(#projectsFill)"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </GlassPanel>
);
