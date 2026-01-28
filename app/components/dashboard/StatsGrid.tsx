'use client';

import StatCard from './StatCard';
import { formatCurrency } from '@/app/lib/utils/formatters';
import { TradeStats } from '@/app/lib/types';

interface StatsGridProps {
  stats: TradeStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--space-6)',
      }}
    >
      <StatCard
        label="Avg Winner"
        value={formatCurrency(stats.avgWin)}
        color="green"
        icon="arrow-up"
        tooltip="Average profit from winning trades"
      />

      <StatCard
        label="Avg Loser"
        value={formatCurrency(stats.avgLoss)}
        color="red"
        icon="arrow-down"
        tooltip="Average loss from losing trades"
      />

      <StatCard
        label="Profit Factor"
        value={stats.profitFactor === Infinity ? '∞' : stats.profitFactor.toFixed(2)}
        color="blue"
        icon="chart-line"
        tooltip="Gross profits / Gross losses"
        subValue={`${stats.wins}W / ${stats.losses}L`}
      />

      <StatCard
        label="Largest Win"
        value={formatCurrency(stats.largestWin)}
        color="green"
        icon="trophy"
        tooltip="Your best single trade"
      />

      <StatCard
        label="Largest Loss"
        value={formatCurrency(stats.largestLoss)}
        color="red"
        icon="exclamation-triangle"
        tooltip="Your worst single trade"
      />

      <StatCard
        label="Avg Trade"
        value={formatCurrency(stats.avgTrade)}
        color={stats.avgTrade >= 0 ? 'green' : 'red'}
        icon="calculator"
        tooltip="Average P&L per trade (expectancy)"
      />
    </div>
  );
}
