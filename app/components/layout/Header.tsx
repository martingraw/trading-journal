'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/app/lib/utils/formatters';

interface HeaderProps {
  totalPnL: number;
  winRate: number;
  totalTrades: number;
  isConnected: boolean;
  streak: number;
  streakType: 'win' | 'loss' | null;
}

export default function Header({
  totalPnL,
  winRate,
  totalTrades,
  isConnected,
  streak,
  streakType,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--space-4) var(--space-8)',
        marginLeft: '260px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {mounted && (
          <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
            {/* Streak Indicator */}
            {streak > 1 && streakType && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  background: streakType === 'win' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <span style={{ fontSize: 'var(--text-md)' }}>
                  {streakType === 'win' ? '🔥' : '❄️'}
                </span>
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    color: streakType === 'win' ? 'var(--accent-green)' : 'var(--accent-red)',
                  }}
                >
                  {streak} day {streakType === 'win' ? 'streak' : 'losing streak'}
                </span>
              </div>
            )}

            {/* Total P&L */}
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 'var(--space-1)' }}>
                Total P&L
              </p>
              <p
                className="mono"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-semibold)',
                  color: totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                }}
              >
                {formatCurrency(totalPnL)}
              </p>
            </div>

            {/* Win Rate */}
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 'var(--space-1)' }}>
                Win Rate
              </p>
              <p
                className="mono"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                {winRate.toFixed(1)}%
              </p>
            </div>

            {/* Trades */}
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 'var(--space-1)' }}>
                Trades
              </p>
              <p
                className="mono"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                {totalTrades}
              </p>
            </div>

            {/* Cloud Sync Status */}
            {isConnected && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--accent-green-dim)',
                  borderRadius: 'var(--radius-base)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent-green)',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent-green)',
                    fontWeight: 'var(--font-medium)',
                  }}
                >
                  Synced
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </header>
  );
}
