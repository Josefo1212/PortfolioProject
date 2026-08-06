import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassPanel } from '../../../components/ui/GlassPanel';
import { PROJECTS } from '../../Home/components/data';
import { ChartTooltip } from './ChartTooltip';
import styles from './ChartCard.module.css';

const COLORS = ['#00D4FF', '#7C3AED', '#22D3EE', '#8B5CF6', '#34D399', '#F59E0B'];
const GROUP: Record<string, string> = { HTML: 'HTML/CSS', CSS: 'HTML/CSS' };

const computeStack = (): Array<{ name: string; value: number }> => {
  const counts = new Map<string, number>();

  for (const project of PROJECTS) {
    for (const tech of project.tech) {
      const key = GROUP[tech] ?? tech;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      value: Math.round((count / PROJECTS.length) * 100),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
};

export const StackDonut = () => {
  const data = useMemo(() => computeStack(), []);

  return (
    <GlassPanel variant="card" className={styles.card}>
      <header className={styles.header}>
        <span className={styles.label}>// Stack</span>
        <h3 className={styles.title}>Tecnologías más usadas</h3>
      </header>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="75%"
              paddingAngle={3}
              strokeWidth={0}
              animationDuration={800}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip unit="%" />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
};
