'use client';

import { ReactNode } from 'react';

interface DashboardWidgetProps {
  id: string;
  title?: string;
  children: ReactNode;
  isEditMode: boolean;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function DashboardWidget({
  id,
  title,
  children,
  isEditMode,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: DashboardWidgetProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        marginBottom: 'var(--space-8)',
        transition: 'all var(--transition-base)',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!isEditMode) {
          e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isEditMode) {
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            display: 'flex',
            gap: 'var(--space-2)',
            zIndex: 10,
          }}
        >
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            style={{
              padding: 'var(--space-2)',
              background: isFirst ? 'var(--bg-elevated)' : 'var(--accent-blue)',
              border: 'none',
              borderRadius: 'var(--radius-base)',
              color: isFirst ? 'var(--text-tertiary)' : 'white',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              fontSize: 'var(--text-sm)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (!isFirst) {
                e.currentTarget.style.opacity = '0.9';
              }
            }}
            onMouseLeave={(e) => {
              if (!isFirst) {
                e.currentTarget.style.opacity = '1';
              }
            }}
            title="Move up"
          >
            <i className="fas fa-arrow-up" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            style={{
              padding: 'var(--space-2)',
              background: isLast ? 'var(--bg-elevated)' : 'var(--accent-blue)',
              border: 'none',
              borderRadius: 'var(--radius-base)',
              color: isLast ? 'var(--text-tertiary)' : 'white',
              cursor: isLast ? 'not-allowed' : 'pointer',
              fontSize: 'var(--text-sm)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (!isLast) {
                e.currentTarget.style.opacity = '0.9';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLast) {
                e.currentTarget.style.opacity = '1';
              }
            }}
            title="Move down"
          >
            <i className="fas fa-arrow-down" />
          </button>
        </div>
      )}

      {/* Widget Title */}
      {title && (
        <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
          {title}
        </h3>
      )}

      {/* Widget Content */}
      {children}
    </div>
  );
}
