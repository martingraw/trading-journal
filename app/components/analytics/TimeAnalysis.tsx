'use client';

interface TimeAnalysisProps {
  morningTrades: number;
  morningWinRate: number;
  afternoonTrades: number;
  afternoonWinRate: number;
}

export default function TimeAnalysis({
  morningTrades,
  morningWinRate,
  afternoonTrades,
  afternoonWinRate,
}: TimeAnalysisProps) {
  // Determine which is better
  const morningBetter = morningWinRate > afternoonWinRate;
  const afternoonBetter = afternoonWinRate > morningWinRate;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-6)',
      }}
    >
      {/* Morning */}
      <div
        style={{
          padding: 'var(--space-6)',
          background: morningBetter ? 'var(--accent-green-dim)' : 'var(--bg-elevated)',
          border: morningBetter ? '2px solid var(--accent-green)' : '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          transition: 'all var(--transition-base)',
        }}
      >
        {/* Best Indicator */}
        {morningBetter && morningTrades > 0 && afternoonTrades > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-3)',
              right: 'var(--space-3)',
              background: 'var(--accent-green)',
              color: 'white',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-base)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Best
          </div>
        )}

        {/* Icon */}
        <div
          style={{
            fontSize: '48px',
            marginBottom: 'var(--space-4)',
            textAlign: 'center',
            color: 'var(--accent-yellow)',
          }}
        >
          <i className="fas fa-sun" />
        </div>

        {/* Label */}
        <h4 className="heading-4" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          Morning
        </h4>
        <p
          className="body-small"
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Before 12:00 PM
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <div className="label" style={{ marginBottom: 'var(--space-1)', textAlign: 'center' }}>
              Trades
            </div>
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}
            >
              {morningTrades}
            </div>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 'var(--space-1)', textAlign: 'center' }}>
              Win Rate
            </div>
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: morningWinRate >= 50 ? 'var(--accent-green)' : 'var(--accent-red)',
                textAlign: 'center',
              }}
            >
              {morningWinRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Afternoon */}
      <div
        style={{
          padding: 'var(--space-6)',
          background: afternoonBetter ? 'var(--accent-green-dim)' : 'var(--bg-elevated)',
          border: afternoonBetter ? '2px solid var(--accent-green)' : '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          transition: 'all var(--transition-base)',
        }}
      >
        {/* Best Indicator */}
        {afternoonBetter && morningTrades > 0 && afternoonTrades > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-3)',
              right: 'var(--space-3)',
              background: 'var(--accent-green)',
              color: 'white',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-base)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Best
          </div>
        )}

        {/* Icon */}
        <div
          style={{
            fontSize: '48px',
            marginBottom: 'var(--space-4)',
            textAlign: 'center',
            color: 'var(--accent-purple)',
          }}
        >
          <i className="fas fa-moon" />
        </div>

        {/* Label */}
        <h4 className="heading-4" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          Afternoon
        </h4>
        <p
          className="body-small"
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          After 12:00 PM
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <div className="label" style={{ marginBottom: 'var(--space-1)', textAlign: 'center' }}>
              Trades
            </div>
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}
            >
              {afternoonTrades}
            </div>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 'var(--space-1)', textAlign: 'center' }}>
              Win Rate
            </div>
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: afternoonWinRate >= 50 ? 'var(--accent-green)' : 'var(--accent-red)',
                textAlign: 'center',
              }}
            >
              {afternoonWinRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
