'use client';

import { Trade } from '@/app/lib/types';
import TradeRow from './TradeRow';

interface TradeTableProps {
  trades: Trade[];
  onUpdate: (id: string, updates: Partial<Trade>) => void;
  onDelete: (id: string) => void;
}

export default function TradeTable({ trades, onUpdate, onDelete }: TradeTableProps) {
  if (trades.length === 0) {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-12)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)', opacity: 0.3 }}>
          📝
        </div>
        <h3 className="heading-4" style={{ marginBottom: 'var(--space-2)' }}>
          No trades found
        </h3>
        <p className="body" style={{ color: 'var(--text-secondary)' }}>
          Try adjusting your filters or import trades to get started
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        overflowX: 'auto',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              background: 'var(--bg-elevated)',
              borderBottom: '2px solid var(--border)',
            }}
          >
            <th style={{ width: '40px' }} />
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Date / Time
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Symbol
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Direction
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Entry
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Exit
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'center',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Qty
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'right',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              P&L
            </th>
            <th
              className="body-small"
              style={{
                textAlign: 'left',
                padding: 'var(--space-4) var(--space-3)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <TradeRow key={trade.id} trade={trade} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
