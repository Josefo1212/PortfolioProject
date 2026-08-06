import styles from './ChartCard.module.css';

interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number | string; name?: string; dataKey?: string }>;
  unit?: string;
}

export const ChartTooltip = ({ active, label, payload, unit = '' }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;

  const displayLabel = label ?? payload[0].name ?? '';

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipLabel}>{displayLabel}</span>
      <span className={styles.tooltipValue}>
        {payload[0].value}
        {unit}
      </span>
    </div>
  );
};
