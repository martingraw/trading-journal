'use client';

import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import FileUpload from '../components/upload/FileUpload';
import AddTradeModal from '../components/trades/AddTradeModal';
import { useTradeContext } from '../context/TradeContext';
import { formatCurrency } from '../lib/utils/formatters';
import { Trade } from '../lib/types';

export default function UploadPage() {
  const { importCSV, addTrade, stats, trades } = useTradeContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTrade = async (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    await addTrade(newTrade);
  };

  return (
    <AppLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <div>
            <h1 className="heading-2" style={{ marginBottom: 'var(--space-2)' }}>
              Add Trades
            </h1>
            <p className="body" style={{ color: 'var(--text-secondary)' }}>
              Import from CSV or add trades manually
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'var(--accent-blue)',
              border: 'none',
              borderRadius: 'var(--radius-base)',
              color: 'white',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <i className="fas fa-plus" />
            Add Trade Manually
          </button>
        </div>

        <div style={{ marginBottom: 'var(--space-8)' }} />

        {/* Current Stats Summary */}
        {trades.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
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
                {trades.length}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="label" style={{ marginBottom: 'var(--space-2)' }}>
                Total P&L
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-bold)',
                  color: stats.totalPnL >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                }}
              >
                {formatCurrency(stats.totalPnL)}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
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
                {stats.winRate.toFixed(1)}%
              </div>
            </div>
          </div>
        )}

        {/* File Upload Component */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <FileUpload onImport={importCSV} />
        </div>

        {/* Data Management */}
        {trades.length > 0 && (
          <div
            style={{
              marginTop: 'var(--space-8)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-4)' }}>
              Data Management
            </h3>
            <p className="body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
              Export your trade data as a JSON backup or manage your existing trades
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const { exportData } = require('../context/TradeContext');
                  // TODO: Implement export functionality
                }}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                }}
              >
                <i className="fas fa-download" style={{ marginRight: 'var(--space-2)' }} />
                Export JSON Backup
              </button>

              <button
                onClick={() => {
                  // TODO: Implement import JSON functionality
                }}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                }}
              >
                <i className="fas fa-upload" style={{ marginRight: 'var(--space-2)' }} />
                Import JSON Backup
              </button>
            </div>
          </div>
        )}

        {/* Add Trade Modal */}
        <AddTradeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTrade}
        />
      </div>
    </AppLayout>
  );
}
