'use client';

import { useEffect } from 'react';

interface WelcomeScreenProps {
  onDismiss: () => void;
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onDismiss, onGetStarted }: WelcomeScreenProps) {
  // Handle ESC key to dismiss
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onDismiss]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'var(--space-6)',
      }}
      onClick={onDismiss}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          padding: 'var(--space-10)',
          maxWidth: '800px',
          width: '100%',
          border: '1px solid var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)', color: 'var(--accent-blue)' }}>
            <i className="fas fa-bullseye" />
          </div>
          <h1 className="heading-2" style={{ marginBottom: 'var(--space-2)' }}>
            Welcome to TradeLog
          </h1>
          <p className="body" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Your intelligent trading journal for futures traders
          </p>
        </div>

        {/* 3-Step Guide */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {/* Step 1: Cloud Sync */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              textAlign: 'center',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
              }}
            >
              <i className="fas fa-cloud" />
            </div>
            <div
              className="label"
              style={{
                color: 'var(--accent-blue)',
                marginBottom: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
              }}
            >
              <i className="fas fa-circle" style={{ fontSize: '8px', marginRight: 'var(--space-1)' }} /> CLOUD SYNC
            </div>
            <h3 className="heading-5" style={{ marginBottom: 'var(--space-3)' }}>
              Set Up JSONBin
            </h3>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Connect to JSONBin (free) for cloud backup and sync across devices
            </p>
          </div>

          {/* Step 2: Import Trades */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              textAlign: 'center',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
              }}
            >
              <i className="fas fa-chart-bar" />
            </div>
            <div
              className="label"
              style={{
                color: 'var(--accent-green)',
                marginBottom: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
              }}
            >
              <i className="fas fa-circle" style={{ fontSize: '8px', marginRight: 'var(--space-1)' }} /> IMPORT TRADES
            </div>
            <h3 className="heading-5" style={{ marginBottom: 'var(--space-3)' }}>
              Upload CSV
            </h3>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Upload your CSV export from TradingView to import your trading history
            </p>
          </div>

          {/* Step 3: Analyze & Win */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              textAlign: 'center',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
              }}
            >
              <i className="fas fa-chart-line" />
            </div>
            <div
              className="label"
              style={{
                color: 'var(--accent-purple)',
                marginBottom: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
              }}
            >
              <i className="fas fa-circle" style={{ fontSize: '8px', marginRight: 'var(--space-1)' }} /> ANALYZE & WIN
            </div>
            <h3 className="heading-5" style={{ marginBottom: 'var(--space-3)' }}>
              Track Performance
            </h3>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Track your performance with detailed charts, stats, and insights
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onGetStarted}
            style={{
              padding: 'var(--space-3) var(--space-8)',
              background: 'var(--gradient-info)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-base)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--transition-base)',
              minWidth: '160px',
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
            <i className="fas fa-rocket" style={{ marginRight: 'var(--space-2)' }} />
            Get Started
          </button>

          <button
            onClick={onDismiss}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              minWidth: '160px',
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
            Skip for Now
          </button>
        </div>

        {/* Hint */}
        <p
          className="body-small"
          style={{
            textAlign: 'center',
            color: 'var(--text-tertiary)',
            marginTop: 'var(--space-6)',
          }}
        >
          Press <kbd style={{ padding: '2px 6px', background: 'var(--bg-elevated)', borderRadius: '4px' }}>ESC</kbd> to
          close
        </p>
      </div>
    </div>
  );
}
