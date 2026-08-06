import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { PROJECTS } from '../../Home/components/data';
import { ChartTooltip } from './ChartTooltip';
import styles from './ChartCard.module.css';

const computeCategories = (): Array<{ name: string; count: number }> => {
  const counts = new Map<string, number>();

  for (const project of PROJECTS) {
    counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const CategoryChart = () => {
  const data = useMemo(() => computeCategories(), []);

  return (
    <GlassPanel variant="card" className={styles.card}>
      <header className={styles.header}>
        <span className={styles.label}>// Categorías</span>
        <h3 className={styles.title}>Proyectos por categoría</h3>
      </header>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="categoryFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis
              dataKey="name"
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
              cursor={{ fill: 'rgba(124, 58, 237, 0.08)' }}
            />
            <Bar
              dataKey="count"
              fill="url(#categoryFill)"
              radius={[6, 6, 0, 0]}
              barSize={32}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
};
