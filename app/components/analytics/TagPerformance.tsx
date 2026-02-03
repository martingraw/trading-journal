'use client';

import { useState, useMemo } from 'react';
import { TagStats, Trade } from '@/app/lib/types';
import { calculateTagStats } from '@/app/lib/utils/tradeCalculations';

interface TagPerformanceProps {
  tagStats: TagStats;
  trades: Trade[];
  onTagClick?: (tag: string) => void;
}

type TimePeriod = 'all' | 'current-month' | 'last-month';

export default function TagPerformance({ tagStats, trades, onTagClick }: TagPerformanceProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');

  // Filter trades by time period and recalculate tag stats
  const filteredTagStats = useMemo(() => {
    if (timePeriod === 'all') {
      return tagStats;
    }

    const now = new Date();
    const filteredTrades = trades.filter((trade) => {
      const tradeDate = new Date(trade.exitTime);
      const tradeYear = tradeDate.getFullYear();
      const tradeMonth = tradeDate.getMonth();

      if (timePeriod === 'current-month') {
        return tradeYear === now.getFullYear() && tradeMonth === now.getMonth();
      } else if (timePeriod === 'last-month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return tradeYear === lastMonth.getFullYear() && tradeMonth === lastMonth.getMonth();
      }
      return true;
    });

    return calculateTagStats(filteredTrades);
  }, [timePeriod, trades, tagStats]);

  // Convert TagStats object to array and sort by total trades descending
  const sortedStats = Object.entries(filteredTagStats)
    .map(([tag, stats]) => ({
      tag,
      ...stats,
    }))
    .sort((a, b) => b.trades - a.trades);

  // Get period label
  const getPeriodLabel = () => {
    const now = new Date();
    switch (timePeriod) {
      case 'current-month':
        return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'last-month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'all':
      default:
        return 'All Time';
    }
  };

  return (
    <div>
      {/* Period Selector */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="heading-5" style={{ color: 'var(--text-secondary)' }}>
          {getPeriodLabel()}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            onClick={() => setTimePeriod('current-month')}
            className="body-small"
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: timePeriod === 'current-month' ? 'var(--accent-blue)' : 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: timePeriod === 'current-month' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 'var(--font-medium)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (timePeriod !== 'current-month') {
                e.currentTarget.style.background = 'var(--bg-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (timePeriod !== 'current-month') {
                e.currentTarget.style.background = 'var(--bg-elevated)';
              }
            }}
          >
            This Month
          </button>
          <button
            onClick={() => setTimePeriod('last-month')}
            className="body-small"
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: timePeriod === 'last-month' ? 'var(--accent-blue)' : 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: timePeriod === 'last-month' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 'var(--font-medium)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (timePeriod !== 'last-month') {
                e.currentTarget.style.background = 'var(--bg-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (timePeriod !== 'last-month') {
                e.currentTarget.style.background = 'var(--bg-elevated)';
              }
            }}
          >
            Last Month
          </button>
          <button
            onClick={() => setTimePeriod('all')}
            className="body-small"
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: timePeriod === 'all' ? 'var(--accent-blue)' : 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: timePeriod === 'all' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 'var(--font-medium)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (timePeriod !== 'all') {
                e.currentTarget.style.background = 'var(--bg-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (timePeriod !== 'all') {
                e.currentTarget.style.background = 'var(--bg-elevated)';
              }
            }}
          >
            All Time
          </button>
        </div>
      </div>

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
              Total P&L
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
                  <span className="body" style={{ fontWeight: 'var(--font-medium)', textTransform: 'uppercase' }}>
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

              {/* Total P&L */}
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
                {stat.totalPnL.toFixed(2)}
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
    </div>
  );
}
