'use client';

import { FilterState } from '@/app/lib/types';
import { PRESET_TAGS } from '@/app/lib/constants';

interface TradeFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  totalTrades: number;
  filteredCount: number;
}

export default function TradeFilters({
  filters,
  onFilterChange,
  onClearFilters,
  totalTrades,
  filteredCount,
}: TradeFiltersProps) {
  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const hasActiveFilters = Object.values(filters).some((val) => val !== '' && val !== undefined);

  return (
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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <i className="fas fa-filter" style={{ color: 'var(--accent-blue)', fontSize: 'var(--text-lg)' }} />
          <h3 className="heading-4">Filters</h3>
          {hasActiveFilters && (
            <span
              style={{
                background: 'var(--accent-blue)',
                color: 'white',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-bold)',
              }}
            >
              Active
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
            Showing {filteredCount} of {totalTrades}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
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
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {/* Symbol */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Symbol
          </label>
          <input
            type="text"
            value={filters.symbol || ''}
            onChange={(e) => handleChange('symbol', e.target.value)}
            placeholder="e.g., MES, NQ"
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
        </div>

        {/* Direction */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Direction
          </label>
          <select
            value={filters.direction || ''}
            onChange={(e) => handleChange('direction', e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <option value="">All Directions</option>
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
        </div>

        {/* Outcome */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Outcome
          </label>
          <select
            value={filters.outcome || ''}
            onChange={(e) => handleChange('outcome', e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <option value="">All Outcomes</option>
            <option value="winners">Winners</option>
            <option value="losers">Losers</option>
          </select>
        </div>

        {/* Tag */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Tag
          </label>
          <select
            value={filters.tag || ''}
            onChange={(e) => handleChange('tag', e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <option value="">All Tags</option>
            {PRESET_TAGS.map((tag) => (
              <option key={tag.label} value={tag.label}>
                {tag.label}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
        </div>

        {/* Min P&L */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Min P&L
          </label>
          <input
            type="number"
            value={filters.minPnl || ''}
            onChange={(e) => handleChange('minPnl', e.target.value)}
            placeholder="e.g., -500"
            step="0.01"
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
        </div>

        {/* Max P&L */}
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Max P&L
          </label>
          <input
            type="number"
            value={filters.maxPnl || ''}
            onChange={(e) => handleChange('maxPnl', e.target.value)}
            placeholder="e.g., 1000"
            step="0.01"
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-fast)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
        </div>
      </div>
    </div>
  );
}
