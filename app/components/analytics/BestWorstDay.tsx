'use client';

import { formatCurrency } from '@/app/lib/utils/formatters';

interface BestWorstDayProps {
  bestDay: { date: string; pnl: number } | null;
  worstDay: { date: string; pnl: number } | null;
}

export default function BestWorstDay({ bestDay, worstDay }: BestWorstDayProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-6)',
      }}
    >
      {/* Best Day */}
      <div
        style={{
          padding: 'var(--space-6)',
          background: 'var(--accent-green-dim)',
          border: '1px solid var(--accent-green)',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
        }}
      >
        {/* Icon */}
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            fontSize: 'var(--text-4xl)',
            opacity: 0.15,
          }}
        >
          <i className="fas fa-trophy" />
        </div>

        {/* Label */}
        <div
          className="label"
          style={{
            marginBottom: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <i className="fas fa-trophy" style={{ fontSize: 'var(--text-lg)', color: 'var(--accent-green)' }} />
          <span>Best Day</span>
        </div>

        {bestDay ? (
          <>
            {/* P&L */}
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--accent-green)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {formatCurrency(bestDay.pnl)}
            </div>

            {/* Date */}
            <div
              className="body-small"
              style={{
                color: 'var(--text-secondary)',
              }}
            >
              {formatDate(bestDay.date)}
            </div>
          </>
        ) : (
          <div
            className="body"
            style={{
              color: 'var(--text-muted)',
              fontStyle: 'italic',
            }}
          >
            No data yet
          </div>
        )}
      </div>

      {/* Worst Day */}
      <div
        style={{
          padding: 'var(--space-6)',
          background: 'var(--accent-red-dim)',
          border: '1px solid var(--accent-red)',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
        }}
      >
        {/* Icon */}
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            fontSize: 'var(--text-4xl)',
            opacity: 0.15,
          }}
        >
          <i className="fas fa-exclamation-triangle" />
        </div>

        {/* Label */}
        <div
          className="label"
          style={{
            marginBottom: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <i className="fas fa-exclamation-triangle" style={{ fontSize: 'var(--text-lg)', color: 'var(--accent-red)' }} />
          <span>Worst Day</span>
        </div>

        {worstDay ? (
          <>
            {/* P&L */}
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--accent-red)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {formatCurrency(worstDay.pnl)}
            </div>

            {/* Date */}
            <div
              className="body-small"
              style={{
                color: 'var(--text-secondary)',
              }}
            >
              {formatDate(worstDay.date)}
            </div>
          </>
        ) : (
          <div
            className="body"
            style={{
              color: 'var(--text-muted)',
              fontStyle: 'italic',
            }}
          >
            No data yet
          </div>
        )}
      </div>
    </div>
  );
}
