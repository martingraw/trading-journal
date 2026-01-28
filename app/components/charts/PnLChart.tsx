'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getLineChartOptions, getChartTheme } from '@/app/lib/charts/chartConfig';
import { formatCurrency, formatDate } from '@/app/lib/utils/formatters';
import { Trade } from '@/app/lib/types';
import { getCumulativePnL } from '@/app/lib/utils/tradeCalculations';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PnLChartProps {
  trades: Trade[];
}

export default function PnLChart({ trades }: PnLChartProps) {
  const theme = getChartTheme();
  const cumulativeData = getCumulativePnL(trades);

  const isPositive = cumulativeData.length > 0 && cumulativeData[cumulativeData.length - 1].cumulativePnL >= 0;

  const data = {
    labels: cumulativeData.map((d) => formatDate(d.date)),
    datasets: [
      {
        label: 'Cumulative P&L',
        data: cumulativeData.map((d) => d.cumulativePnL),
        borderColor: isPositive ? theme.colors.green : theme.colors.red,
        backgroundColor: isPositive
          ? 'rgba(0, 255, 163, 0.1)'
          : 'rgba(255, 71, 87, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: isPositive ? theme.colors.green : theme.colors.red,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = getLineChartOptions((value: number) => formatCurrency(value));

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
}
