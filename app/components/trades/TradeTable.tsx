'use client';

import { Trade } from '@/app/lib/types';
import MonthAccordion from './MonthAccordion';

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

  // Group trades by month
  const tradesByMonth: Record<string, Trade[]> = {};
  
  trades.forEach((trade) => {
    const date = new Date(trade.exitTime);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!tradesByMonth[monthKey]) {
      tradesByMonth[monthKey] = [];
    }
    tradesByMonth[monthKey].push(trade);
  });

  // Sort months in reverse chronological order (newest first)
  const sortedMonths = Object.keys(tradesByMonth).sort((a, b) => b.localeCompare(a));

  // Get current month key to expand it by default
  const currentDate = new Date();
  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  return (
    <div>
      {sortedMonths.map((monthKey) => {
        const monthTrades = tradesByMonth[monthKey];
        const date = new Date(monthTrades[0].exitTime);
        const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        return (
          <MonthAccordion
            key={monthKey}
            month={monthLabel}
            trades={monthTrades}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isDefaultExpanded={monthKey === currentMonthKey}
          />
        );
      })}
    </div>
  );
}
