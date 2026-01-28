'use client';

import { useState } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  color?: 'green' | 'red' | 'blue' | 'neutral';
  tooltip?: string;
  icon?: string;
}

export default function StatCard({ label, value, subValue, color = 'neutral', tooltip, icon }: StatCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getColor = () => {
    switch (color) {
      case 'green':
        return 'var(--accent-green)';
      case 'red':
        return 'var(--accent-red)';
      case 'blue':
        return 'var(--accent-blue)';
      default:
        return 'var(--text-primary)';
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        transition: 'all var(--transition-base)',
      }}
      onMouseEnter={() => tooltip && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            background: 'rgba(30, 33, 48, 0.98)',
            color: 'var(--text-primary)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-base)',
            fontSize: 'var(--text-sm)',
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 10,
            border: '1px solid var(--border)',
          }}
        >
          {tooltip}
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(30, 33, 48, 0.98)',
            }}
          />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            fontSize: 'var(--text-2xl)',
            color: getColor(),
            opacity: 0.15,
          }}
        >
          <i className={`fas fa-${icon}`} />
        </div>
      )}

      {/* Label */}
      <div className="label" style={{ marginBottom: 'var(--space-2)', position: 'relative', zIndex: 1 }}>
        {label}
      </div>

      {/* Value */}
      <div
        className="mono"
        style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          color: getColor(),
          lineHeight: 1.2,
          marginBottom: subValue ? 'var(--space-2)' : 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {value}
      </div>

      {/* Sub Value */}
      {subValue && (
        <div
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {subValue}
        </div>
      )}
    </div>
  );
}
