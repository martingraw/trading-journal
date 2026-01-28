'use client';

import AppLayout from '../components/layout/AppLayout';
import TradeFilters from '../components/trades/TradeFilters';
import TradeTable from '../components/trades/TradeTable';
import { useTradeContext } from '../context/TradeContext';

export default function TradesPage() {
  const { filteredTrades, trades, filters, setFilters, clearFilters, updateTrade, deleteTrade, selectedDate, setSelectedDate } = useTradeContext();

  return (
    <AppLayout>
      <div>
        <h1 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>
          Trade Log
        </h1>

        {/* Selected Date Banner */}
        {selectedDate && (
          <div
            style={{
              background: 'var(--accent-blue-dim)',
              border: '1px solid var(--accent-blue)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <i className="fas fa-calendar-day" style={{ color: 'var(--accent-blue)', fontSize: 'var(--text-lg)' }} />
              <span className="body" style={{ color: 'var(--text-primary)' }}>
                Showing trades for <strong>{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
              </span>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="body-small"
              style={{
                padding: 'var(--space-2) var(--space-3)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-base)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 'var(--font-medium)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <i className="fas fa-times" style={{ marginRight: 'var(--space-2)' }} />
              Clear Date Filter
            </button>
          </div>
        )}

        {/* Filters */}
        <TradeFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={clearFilters}
          totalTrades={trades.length}
          filteredCount={filteredTrades.length}
        />

        {/* Trade Table */}
        <TradeTable trades={filteredTrades} onUpdate={updateTrade} onDelete={deleteTrade} />
      </div>
    </AppLayout>
  );
}
