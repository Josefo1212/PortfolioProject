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
import { LINES_BY_LANGUAGE } from './data';
import { ChartTooltip } from './ChartTooltip';
import styles from './ChartCard.module.css';

const formatLines = (value: number) => `${(value / 1000).toFixed(0)}k`;

export const LinesChart = () => (
  <GlassPanel variant="card" className={styles.card}>
    <header className={styles.header}>
      <span className={styles.label}>// Código</span>
      <h3 className={styles.title}>Líneas por lenguaje</h3>
    </header>

    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={LINES_BY_LANGUAGE} layout="vertical" margin={{ top: 0, right: 16, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="linesFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" horizontal={false} />
          <XAxis
            type="number"
            stroke="#4A4E63"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatLines}
          />
          <YAxis
            type="category"
            dataKey="language"
            stroke="#4A4E63"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={84}
          />
          <Tooltip
            content={<ChartTooltip unit=" líneas" />}
            cursor={{ fill: 'rgba(124, 58, 237, 0.08)' }}
          />
          <Bar
            dataKey="lines"
            fill="url(#linesFill)"
            radius={[4, 4, 4, 4]}
            barSize={18}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </GlassPanel>
);
