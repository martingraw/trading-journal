'use client';

import AppLayout from '../components/layout/AppLayout';
import TradeFilters from '../components/trades/TradeFilters';
import TradeTable from '../components/trades/TradeTable';
import { useTradeContext } from '../context/TradeContext';

export default function TradesPage() {
  const { filteredTrades, trades, filters, setFilters, clearFilters, updateTrade, deleteTrade } = useTradeContext();

  return (
    <AppLayout>
      <div>
        <h1 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>
          Trade Log
        </h1>

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
