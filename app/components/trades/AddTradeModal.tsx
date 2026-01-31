'use client';

import { useState } from 'react';
import { Trade } from '@/app/lib/types';

interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (trade: Omit<Trade, 'id'>) => void;
}

export default function AddTradeModal({ isOpen, onClose, onAdd }: AddTradeModalProps) {
  const [formData, setFormData] = useState({
    symbol: '',
    direction: 'Long' as 'Long' | 'Short',
    qty: '',
    entryPrice: '',
    exitPrice: '',
    entryDate: '',
    entryTime: '',
    exitDate: '',
    exitTime: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.symbol) newErrors.symbol = 'Symbol is required';
    if (!formData.qty || parseFloat(formData.qty) <= 0) newErrors.qty = 'Valid quantity required';
    if (!formData.entryPrice || parseFloat(formData.entryPrice) <= 0) newErrors.entryPrice = 'Valid entry price required';
    if (!formData.exitPrice || parseFloat(formData.exitPrice) <= 0) newErrors.exitPrice = 'Valid exit price required';
    if (!formData.entryDate) newErrors.entryDate = 'Entry date required';
    if (!formData.entryTime) newErrors.entryTime = 'Entry time required';
    if (!formData.exitDate) newErrors.exitDate = 'Exit date required';
    if (!formData.exitTime) newErrors.exitTime = 'Exit time required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate P&L
    const qty = parseFloat(formData.qty);
    const entryPrice = parseFloat(formData.entryPrice);
    const exitPrice = parseFloat(formData.exitPrice);
    const priceDiff = formData.direction === 'Long' ? exitPrice - entryPrice : entryPrice - exitPrice;
    const pnl = priceDiff * qty;

    // Create trade object
    const trade: Omit<Trade, 'id'> = {
      symbol: formData.symbol.toUpperCase(),
      direction: formData.direction,
      qty,
      entryPrice,
      exitPrice,
      entryTime: `${formData.entryDate} ${formData.entryTime}`,
      exitTime: `${formData.exitDate} ${formData.exitTime}`,
      pnl,
      pnlTicks: 0, // Will be calculated if tick value is known
      tags: [],
      notes: '',
    };

    onAdd(trade);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      symbol: '',
      direction: 'Long',
      qty: '',
      entryPrice: '',
      exitPrice: '',
      entryDate: '',
      entryTime: '',
      exitDate: '',
      exitTime: '',
    });
    setErrors({});
    onClose();
  };

  const setNow = (field: 'entry' | 'exit') => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    
    if (field === 'entry') {
      setFormData({ ...formData, entryDate: date, entryTime: time });
    } else {
      setFormData({ ...formData, exitDate: date, exitTime: time });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-4)',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--space-6)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 className="heading-3" style={{ marginBottom: 'var(--space-1)' }}>
              <i className="fas fa-plus" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
              Add Trade
            </h2>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Enter trade details manually
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xl)',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-base)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 'var(--space-6)' }}>
          {/* Symbol, Direction, Quantity Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Symbol *
              </label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                placeholder="MES"
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.symbol ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
              {errors.symbol && <p className="body-small" style={{ color: 'var(--accent-red)', marginTop: 'var(--space-1)' }}>{errors.symbol}</p>}
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Direction *
              </label>
              <select
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value as 'Long' | 'Short' })}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Quantity *
              </label>
              <input
                type="number"
                value={formData.qty}
                onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                placeholder="1"
                min="0"
                step="1"
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.qty ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
              {errors.qty && <p className="body-small" style={{ color: 'var(--accent-red)', marginTop: 'var(--space-1)' }}>{errors.qty}</p>}
            </div>
          </div>

          {/* Entry Price & Exit Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Entry Price *
              </label>
              <input
                type="number"
                value={formData.entryPrice}
                onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.entryPrice ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
              {errors.entryPrice && <p className="body-small" style={{ color: 'var(--accent-red)', marginTop: 'var(--space-1)' }}>{errors.entryPrice}</p>}
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Exit Price *
              </label>
              <input
                type="number"
                value={formData.exitPrice}
                onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.exitPrice ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
              {errors.exitPrice && <p className="body-small" style={{ color: 'var(--accent-red)', marginTop: 'var(--space-1)' }}>{errors.exitPrice}</p>}
            </div>
          </div>

          {/* Entry Date & Time */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <label className="label">Entry Date & Time *</label>
              <button
                type="button"
                onClick={() => setNow('entry')}
                className="body-small"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-blue)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                }}
              >
                <i className="fas fa-clock" />
                Now
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3)' }}>
              <input
                type="date"
                value={formData.entryDate}
                onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.entryDate ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
              <input
                type="time"
                value={formData.entryTime}
                onChange={(e) => setFormData({ ...formData, entryTime: e.target.value })}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.entryTime ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
            </div>
            {(errors.entryDate || errors.entryTime) && (
              <p className="body-small" style={{ color: 'var(--accent-red)', marginTop: 'var(--space-1)' }}>
                {errors.entryDate || errors.entryTime}
              </p>
            )}
          </div>

          {/* Exit Date & Time */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <label className="label">Exit Date & Time *</label>
              <button
                type="button"
                onClick={() => setNow('exit')}
                className="body-small"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-blue)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                }}
              >
                <i className="fas fa-clock" />
                Now
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3)' }}>
              <input
                type="date"
                value={formData.exitDate}
                onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.exitDate ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
              <input
                type="time"
                value={formData.exitTime}
                onChange={(e) => setFormData({ ...formData, exitTime: e.target.value })}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${errors.exitTime ? 'var(--accent-red)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                }}
              />
            </div>
            {(errors.exitDate || errors.exitTime) && (
              <p className="body-small" style={{ color: 'var(--accent-red)', marginTop: 'var(--space-1)' }}>
                {errors.exitDate || errors.exitTime}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-base)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-base)',
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
              Close
            </button>
            <button
              type="submit"
              style={{
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--accent-blue)',
                border: 'none',
                borderRadius: 'var(--radius-base)',
                color: 'white',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <i className="fas fa-plus" style={{ marginRight: 'var(--space-2)' }} />
              Add Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
