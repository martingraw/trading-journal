'use client';

import { useState } from 'react';
import { Trade } from '@/app/lib/types';
import { PRESET_TAGS } from '@/app/lib/constants';
import { formatCurrency, formatDate, formatTime } from '@/app/lib/utils/formatters';

interface TradeRowProps {
  trade: Trade;
  onUpdate: (id: string, updates: Partial<Trade>) => void;
  onDelete: (id: string) => void;
  isEvenDate?: boolean;
}

export default function TradeRow({ trade, onUpdate, onDelete, isEvenDate = false }: TradeRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(trade.notes);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveNotes = () => {
    onUpdate(trade.id, { notes });
    setIsEditingNotes(false);
  };

  const handleCancelNotes = () => {
    setNotes(trade.notes);
    setIsEditingNotes(false);
  };

  const handleToggleTag = (tagLabel: string) => {
    const currentTags = trade.tags || [];
    const newTags = currentTags.includes(tagLabel)
      ? currentTags.filter((t) => t !== tagLabel)
      : [...currentTags, tagLabel];
    onUpdate(trade.id, { tags: newTags });
  };

  const handleDelete = () => {
    onDelete(trade.id);
    setShowDeleteConfirm(false);
  };

  const isWinner = trade.pnl > 0;
  const exitDate = formatDate(trade.exitTime);
  const exitTime = formatTime(trade.exitTime);

  return (
    <>
      {/* Main Row */}
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: 'pointer',
          borderBottom: isExpanded ? 'none' : '1px solid var(--border)',
          transition: 'background var(--transition-fast)',
          background: isEvenDate ? 'rgba(59, 130, 246, 0.03)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isEvenDate ? 'rgba(59, 130, 246, 0.03)' : 'transparent';
        }}
      >
        {/* Expand Icon */}
        <td style={{ padding: 'var(--space-4) var(--space-3)', width: '40px' }}>
          <i
            className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
              transition: 'transform var(--transition-fast)',
            }}
          />
        </td>

        {/* Date & Time */}
        <td style={{ padding: 'var(--space-4) var(--space-3)' }}>
          <div className="body" style={{ fontWeight: 'var(--font-medium)' }}>
            {exitDate}
          </div>
          <div className="body-small" style={{ color: 'var(--text-secondary)' }}>
            {exitTime}
          </div>
        </td>

        {/* Symbol */}
        <td className="mono" style={{ padding: 'var(--space-4) var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          {trade.symbol}
        </td>

        {/* Direction */}
        <td style={{ padding: 'var(--space-4) var(--space-3)' }}>
          <span
            style={{
              padding: 'var(--space-1) var(--space-2)',
              background: trade.direction === 'Long' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)',
              color: trade.direction === 'Long' ? 'var(--accent-green)' : 'var(--accent-red)',
              borderRadius: 'var(--radius-base)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
            }}
          >
            {trade.direction}
          </span>
        </td>

        {/* Entry */}
        <td className="mono" style={{ padding: 'var(--space-4) var(--space-3)', color: 'var(--text-secondary)' }}>
          {trade.entryPrice.toFixed(2)}
        </td>

        {/* Exit */}
        <td className="mono" style={{ padding: 'var(--space-4) var(--space-3)', color: 'var(--text-secondary)' }}>
          {trade.exitPrice.toFixed(2)}
        </td>

        {/* Qty */}
        <td className="mono" style={{ padding: 'var(--space-4) var(--space-3)', textAlign: 'center' }}>
          {trade.qty}
        </td>

        {/* P&L */}
        <td
          className="mono"
          style={{
            padding: 'var(--space-4) var(--space-3)',
            textAlign: 'right',
            fontWeight: 'var(--font-bold)',
            color: isWinner ? 'var(--accent-green)' : 'var(--accent-red)',
          }}
        >
          {formatCurrency(trade.pnl)}
        </td>

        {/* Tags */}
        <td style={{ padding: 'var(--space-4) var(--space-3)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
            {trade.tags && trade.tags.length > 0 ? (
              trade.tags.slice(0, 2).map((tag) => {
                const tagInfo = PRESET_TAGS.find((t) => t.label === tag);
                return (
                  <span
                    key={tag}
                    style={{
                      padding: 'var(--space-1) var(--space-2)',
                      background: tagInfo?.color || 'var(--accent-blue)',
                      color: 'white',
                      borderRadius: 'var(--radius-base)',
                      fontSize: '10px',
                      fontWeight: 'var(--font-semibold)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tag}
                  </span>
                );
              })
            ) : (
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>-</span>
            )}
            {trade.tags && trade.tags.length > 2 && (
              <span
                style={{
                  fontSize: '10px',
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-semibold)',
                }}
              >
                +{trade.tags.length - 2}
              </span>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Details */}
      {isExpanded && (
        <tr style={{ borderBottom: '1px solid var(--border)' }}>
          <td colSpan={9} style={{ padding: 'var(--space-6)', background: 'var(--bg-elevated)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
              {/* Left Column - Trade Details */}
              <div>
                <h4 className="heading-5" style={{ marginBottom: 'var(--space-4)' }}>
                  Trade Details
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label">Entry Time:</span>
                    <span className="body-small mono">{formatDate(trade.entryTime)} {formatTime(trade.entryTime)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label">Exit Time:</span>
                    <span className="body-small mono">{formatDate(trade.exitTime)} {formatTime(trade.exitTime)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label">P&L (Ticks):</span>
                    <span
                      className="body-small mono"
                      style={{
                        color: isWinner ? 'var(--accent-green)' : 'var(--accent-red)',
                        fontWeight: 'var(--font-semibold)',
                      }}
                    >
                      {trade.pnlTicks >= 0 ? '+' : ''}{trade.pnlTicks}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label">Trade ID:</span>
                    <span className="body-small mono" style={{ color: 'var(--text-muted)' }}>
                      {trade.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                {/* Tags Management */}
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <h5 className="label" style={{ marginBottom: 'var(--space-3)' }}>
                    Tags
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {PRESET_TAGS.map((tag) => {
                      const isSelected = trade.tags?.includes(tag.label);
                      return (
                        <button
                          key={tag.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleTag(tag.label);
                          }}
                          style={{
                            padding: 'var(--space-2) var(--space-3)',
                            background: isSelected ? tag.color : 'var(--bg-card)',
                            color: isSelected ? 'white' : 'var(--text-primary)',
                            border: isSelected ? 'none' : '1px solid var(--border)',
                            borderRadius: 'var(--radius-base)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-medium)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = tag.color;
                              e.currentTarget.style.color = tag.color;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = 'var(--border)';
                              e.currentTarget.style.color = 'var(--text-primary)';
                            }
                          }}
                        >
                          {isSelected && <i className="fas fa-check" style={{ marginRight: 'var(--space-2)' }} />}
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Notes */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h4 className="heading-5">Notes</h4>
                  {!isEditingNotes && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingNotes(true);
                      }}
                      className="body-small"
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-base)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: 'var(--font-medium)',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-card)';
                      }}
                    >
                      <i className="fas fa-edit" style={{ marginRight: 'var(--space-2)' }} />
                      Edit
                    </button>
                  )}
                </div>

                {isEditingNotes ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this trade..."
                      rows={6}
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-base)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-base)',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        marginBottom: 'var(--space-3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-blue)';
                        e.currentTarget.style.outline = 'none';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    />
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveNotes();
                        }}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          background: 'var(--accent-green)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-base)',
                          fontSize: 'var(--text-sm)',
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
                        <i className="fas fa-check" style={{ marginRight: 'var(--space-2)' }} />
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelNotes();
                        }}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          background: 'var(--bg-card)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-base)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-semibold)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--bg-card)';
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="body"
                    style={{
                      padding: 'var(--space-3)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-base)',
                      color: trade.notes ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontStyle: trade.notes ? 'normal' : 'italic',
                      minHeight: '100px',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {trade.notes || 'No notes for this trade.'}
                  </div>
                )}

                {/* Delete Button */}
                <div style={{ marginTop: 'var(--space-6)' }}>
                  {showDeleteConfirm ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: 'var(--space-4)',
                        background: 'var(--accent-red-dim)',
                        border: '1px solid var(--accent-red)',
                        borderRadius: 'var(--radius-base)',
                      }}
                    >
                      <p className="body-small" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                        Are you sure you want to delete this trade? This action cannot be undone.
                      </p>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                          }}
                          style={{
                            padding: 'var(--space-2) var(--space-4)',
                            background: 'var(--accent-red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-base)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-semibold)',
                            cursor: 'pointer',
                          }}
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(false);
                          }}
                          style={{
                            padding: 'var(--space-2) var(--space-4)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-base)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-semibold)',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(true);
                      }}
                      style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'var(--bg-card)',
                        color: 'var(--accent-red)',
                        border: '1px solid var(--accent-red)',
                        borderRadius: 'var(--radius-base)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-semibold)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--accent-red)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-card)';
                        e.currentTarget.style.color = 'var(--accent-red)';
                      }}
                    >
                      <i className="fas fa-trash" style={{ marginRight: 'var(--space-2)' }} />
                      Delete Trade
                    </button>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
