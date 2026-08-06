import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { SKILL_LEVELS } from './data';
import { ChartTooltip } from './ChartTooltip';
import styles from './ChartCard.module.css';

export const SkillsRadar = () => (
  <GlassPanel variant="card" className={styles.card}>
    <header className={styles.header}>
      <span className={styles.label}>// Skills</span>
      <h3 className={styles.title}>Nivel por área</h3>
    </header>

    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={SKILL_LEVELS} margin={{ top: 8, right: 8, left: 8, bottom: 8 }} outerRadius="72%">
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="rgba(255, 255, 255, 0.06)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#8B8FA8', fontSize: 12 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="level"
            stroke="#00D4FF"
            strokeWidth={2}
            fill="url(#radarFill)"
            animationDuration={800}
          />
          <Tooltip
            content={<ChartTooltip unit="%" />}
            cursor={{ stroke: 'rgba(0, 212, 255, 0.3)', strokeDasharray: '4 4' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </GlassPanel>
);
