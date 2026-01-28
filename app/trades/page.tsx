'use client';

import AppLayout from '../components/layout/AppLayout';
import TradeFilters from '../components/trades/TradeFilters';
import TradeTable from '../components/trades/TradeTable';
import { useTradeContext } from '../context/TradeContext';

export default function TradesPage() {
  const { filteredTrades, trades, filters, setFilters, clearFilters, updateTrade, deleteTrade, selectedDate, setSelectedDate, stats } = useTradeContext();

  // Calculate filtered stats
  const filteredStats = {
    totalPnL: filteredTrades.reduce((sum, t) => sum + t.pnl, 0),
    wins: filteredTrades.filter(t => t.pnl > 0).length,
    losses: filteredTrades.filter(t => t.pnl < 0).length,
    winRate: filteredTrades.length > 0 ? (filteredTrades.filter(t => t.pnl > 0).length / filteredTrades.length) * 100 : 0,
  };

  const hasActiveFilters = selectedDate || Object.values(filters).some((val) => val !== '' && val !== undefined);

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

        {/* Filtered Stats Summary */}
        {hasActiveFilters && filteredTrades.length > 0 && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <i className="fas fa-chart-bar" style={{ color: 'var(--accent-blue)', fontSize: 'var(--text-lg)' }} />
              <h3 className="heading-4">Filtered Results Analysis</h3>
            </div>
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {/* Total P&L */}
              <div>
                <div className="label" style={{ marginBottom: 'var(--space-2)' }}>
                  Total P&L
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: filteredStats.totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                  }}
                >
                  {filteredStats.totalPnL >= 0 ? '+' : ''}${filteredStats.totalPnL.toFixed(2)}
                </div>
              </div>

              {/* Win Rate */}
              <div>
                <div className="label" style={{ marginBottom: 'var(--space-2)' }}>
                  Win Rate
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {filteredStats.winRate.toFixed(1)}%
                </div>
              </div>

              {/* Wins */}
              <div>
                <div className="label" style={{ marginBottom: 'var(--space-2)' }}>
                  Wins
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--accent-green)',
                  }}
                >
                  {filteredStats.wins}
                </div>
              </div>

              {/* Losses */}
              <div>
                <div className="label" style={{ marginBottom: 'var(--space-2)' }}>
                  Losses
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--accent-red)',
                  }}
                >
                  {filteredStats.losses}
                </div>
              </div>

              {/* Total Trades */}
              <div>
                <div className="label" style={{ marginBottom: 'var(--space-2)' }}>
                  Total Trades
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {filteredTrades.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trade Table */}
        <TradeTable trades={filteredTrades} onUpdate={updateTrade} onDelete={deleteTrade} />
      </div>
    </AppLayout>
  );
}
