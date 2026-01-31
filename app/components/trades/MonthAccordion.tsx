'use client';

import { useState } from 'react';
import { Trade } from '@/app/lib/types';
import { formatCurrency } from '@/app/lib/utils/formatters';
import TradeRow from './TradeRow';

interface MonthAccordionProps {
  month: string; // e.g., "January 2026"
  trades: Trade[];
  onUpdate: (id: string, updates: Partial<Trade>) => void;
  onDelete: (id: string) => void;
  isDefaultExpanded?: boolean;
}

export default function MonthAccordion({
  month,
  trades,
  onUpdate,
  onDelete,
  isDefaultExpanded = false,
}: MonthAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);

  // Calculate month statistics
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const wins = trades.filter((t) => t.pnl > 0).length;
  const losses = trades.filter((t) => t.pnl < 0).length;
  const winRate = trades.length > 0 ? (wins / trades.length) * 100 : 0;

  // Group trades by date for alternating backgrounds
  const getTradeDate = (trade: Trade) => trade.exitTime.split(' ')[0];
  const uniqueDates = Array.from(new Set(trades.map(getTradeDate)));
  const dateColorMap: Record<string, boolean> = {};
  uniqueDates.forEach((date, index) => {
    dateColorMap[date] = index % 2 === 0;
  });

  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      {/* Month Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
        }}
      >
        {/* Left: Month name and expand icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <i
            className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              transition: 'transform var(--transition-fast)',
            }}
          />
          <h3 className="heading-4">{month}</h3>
          <span
            className="body-small"
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 'var(--font-medium)',
            }}
          >
            {trades.length} trade{trades.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Right: Month stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          {/* Win Rate */}
          <div style={{ textAlign: 'right' }}>
            <div className="label" style={{ marginBottom: 'var(--space-1)' }}>
              Win Rate
            </div>
            <div
              className="body"
              style={{
                fontWeight: 'var(--font-semibold)',
                color: winRate >= 50 ? 'var(--accent-green)' : 'var(--accent-red)',
              }}
            >
              {winRate.toFixed(1)}%
            </div>
          </div>

          {/* W/L */}
          <div style={{ textAlign: 'right' }}>
            <div className="label" style={{ marginBottom: 'var(--space-1)' }}>
              W/L
            </div>
            <div className="body" style={{ fontWeight: 'var(--font-semibold)' }}>
              <span style={{ color: 'var(--accent-green)' }}>{wins}</span>
              <span style={{ color: 'var(--text-secondary)', margin: '0 var(--space-1)' }}>/</span>
              <span style={{ color: 'var(--accent-red)' }}>{losses}</span>
            </div>
          </div>

          {/* Total P&L */}
          <div style={{ textAlign: 'right', minWidth: '120px' }}>
            <div className="label" style={{ marginBottom: 'var(--space-1)' }}>
              Total P&L
            </div>
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-bold)',
                color: totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
              }}
            >
              {formatCurrency(totalPnL)}
            </div>
          </div>
        </div>
      </div>

      {/* Trades Table (Collapsible) */}
      {isExpanded && (
        <div
          style={{
            marginTop: 'var(--space-2)',
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
              {trades.map((trade) => {
                const tradeDate = getTradeDate(trade);
                const isEvenDate = dateColorMap[tradeDate];
                return (
                  <TradeRow
                    key={trade.id}
                    trade={trade}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    isEvenDate={isEvenDate}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
