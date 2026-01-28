'use client';

import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getDoughnutOptions, getChartTheme } from '@/app/lib/charts/chartConfig';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WinRateChartProps {
  wins: number;
  losses: number;
  winRate: number;
}

export default function WinRateChart({ wins, losses, winRate }: WinRateChartProps) {
  const theme = getChartTheme();

  const data = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: [theme.colors.green, theme.colors.red],
        borderColor: ['rgba(0, 255, 163, 0.3)', 'rgba(255, 71, 87, 0.3)'],
        borderWidth: 2,
      },
    ],
  };

  const options = getDoughnutOptions();

  return (
    <div style={{ position: 'relative', height: '250px' }}>
      <Doughnut data={data} options={options} />

      {/* Center Text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {winRate.toFixed(1)}%
        </div>
        <div
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
            marginTop: 'var(--space-1)',
          }}
        >
          Win Rate
        </div>
      </div>
    </div>
  );
}
