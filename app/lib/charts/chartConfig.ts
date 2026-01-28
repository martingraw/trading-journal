/**
 * Chart.js theme configuration that reads design tokens from CSS variables
 */

export const getChartTheme = () => {
  if (typeof window === 'undefined') {
    return {
      colors: {
        green: '#00ffa3',
        red: '#ff4757',
        blue: '#3b82f6',
        purple: '#a855f7',
        yellow: '#fbbf24',
      },
      textPrimary: '#f0f4ff',
      textSecondary: '#8b9dc3',
      border: '#2d3142',
      fontFamily: 'Inter',
    };
  }

  const styles = getComputedStyle(document.documentElement);

  return {
    colors: {
      green: styles.getPropertyValue('--accent-green').trim(),
      red: styles.getPropertyValue('--accent-red').trim(),
      blue: styles.getPropertyValue('--accent-blue').trim(),
      purple: styles.getPropertyValue('--accent-purple').trim(),
      yellow: styles.getPropertyValue('--accent-yellow').trim(),
    },
    textPrimary: styles.getPropertyValue('--text-primary').trim(),
    textSecondary: styles.getPropertyValue('--text-secondary').trim(),
    textMuted: styles.getPropertyValue('--text-muted').trim(),
    border: styles.getPropertyValue('--border').trim(),
    fontFamily: 'Inter, sans-serif',
  };
};

export const getBaseChartOptions = (type: 'line' | 'doughnut' | 'bar' = 'line') => {
  const theme = getChartTheme();

  const baseOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: type !== 'doughnut',
        labels: {
          color: theme.textSecondary,
          font: {
            family: theme.fontFamily,
            size: 12,
            weight: '500',
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 33, 48, 0.95)',
        titleColor: theme.textPrimary,
        bodyColor: theme.textSecondary,
        borderColor: theme.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: '600',
          family: theme.fontFamily,
        },
        bodyFont: {
          size: 13,
          weight: '400',
          family: theme.fontFamily,
        },
        displayColors: true,
        boxPadding: 6,
      },
    },
  };

  // Add scales for line and bar charts
  if (type === 'line' || type === 'bar') {
    baseOptions.scales = {
      x: {
        grid: {
          color: theme.border,
          drawBorder: false,
        },
        ticks: {
          color: theme.textMuted,
          font: {
            size: 11,
            family: theme.fontFamily,
          },
        },
      },
      y: {
        grid: {
          color: theme.border,
          drawBorder: false,
        },
        ticks: {
          color: theme.textMuted,
          font: {
            size: 11,
            family: theme.fontFamily,
          },
        },
      },
    };
  }

  return baseOptions;
};

export const getDoughnutOptions = () => {
  const theme = getChartTheme();

  return {
    ...getBaseChartOptions('doughnut'),
    cutout: '70%',
    plugins: {
      ...getBaseChartOptions('doughnut').plugins,
      legend: {
        display: false,
      },
      tooltip: {
        ...getBaseChartOptions('doughnut').plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };
};

export const getLineChartOptions = (formatYAxis?: (value: number) => string) => {
  const baseOptions = getBaseChartOptions('line');

  return {
    ...baseOptions,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        ticks: {
          ...baseOptions.scales.y.ticks,
          callback: formatYAxis || ((value: any) => value),
        },
      },
    },
  };
};
