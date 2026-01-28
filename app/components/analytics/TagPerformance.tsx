'use client';

import { TagStats } from '@/app/lib/types';

interface TagPerformanceProps {
  tagStats: TagStats;
  onTagClick?: (tag: string) => void;
}

export default function TagPerformance({ tagStats, onTagClick }: TagPerformanceProps) {
  // Convert TagStats object to array and sort by total trades descending
  const sortedStats = Object.entries(tagStats)
    .map(([tag, stats]) => ({
      tag,
      ...stats,
    }))
    .sort((a, b) => b.trades - a.trades);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: '2px solid var(--border)',
            }}
          >
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Tag
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'center',
                padding: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Trades
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'center',
                padding: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Wins
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'center',
                padding: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Losses
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'center',
                padding: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Win Rate
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'right',
                padding: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Avg P&L
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((stat, index) => (
            <tr
              key={stat.tag}
              onClick={() => onTagClick && onTagClick(stat.tag)}
              style={{
                borderBottom: index < sortedStats.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: onTagClick ? 'pointer' : 'default',
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (onTagClick) {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Tag Name with Color Indicator */}
              <td style={{ padding: 'var(--space-4) var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: stat.color,
                      flexShrink: 0,
                    }}
                  />
                  <span className="body" style={{ fontWeight: 'var(--font-medium)' }}>
                    {stat.tag}
                  </span>
                </div>
              </td>

              {/* Total Trades */}
              <td
                className="mono"
                style={{
                  padding: 'var(--space-4) var(--space-3)',
                  textAlign: 'center',
                  color: 'var(--text-primary)',
                }}
              >
                {stat.trades}
              </td>

              {/* Wins */}
              <td
                className="mono"
                style={{
                  padding: 'var(--space-4) var(--space-3)',
                  textAlign: 'center',
                  color: 'var(--accent-green)',
                }}
              >
                {stat.wins}
              </td>

              {/* Losses */}
              <td
                className="mono"
                style={{
                  padding: 'var(--space-4) var(--space-3)',
                  textAlign: 'center',
                  color: 'var(--accent-red)',
                }}
              >
                {stat.losses}
              </td>

              {/* Win Rate */}
              <td
                className="mono"
                style={{
                  padding: 'var(--space-4) var(--space-3)',
                  textAlign: 'center',
                  color: 'var(--text-primary)',
                  fontWeight: 'var(--font-semibold)',
                }}
              >
                {stat.winRate.toFixed(1)}%
              </td>

              {/* Avg P&L */}
              <td
                className="mono"
                style={{
                  padding: 'var(--space-4) var(--space-3)',
                  textAlign: 'right',
                  color: stat.totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                  fontWeight: 'var(--font-semibold)',
                }}
              >
                {stat.totalPnL >= 0 ? '+' : ''}
                {(stat.totalPnL / stat.trades).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedStats.length === 0 && (
        <div
          style={{
            padding: 'var(--space-12)',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <i className="fas fa-tags" style={{ fontSize: '48px', marginBottom: 'var(--space-4)', opacity: 0.3 }} />
          <p className="body">No tagged trades yet</p>
        </div>
      )}
    </div>
  );
}
