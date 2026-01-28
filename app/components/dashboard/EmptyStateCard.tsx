'use client';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  icon?: string;
}

interface EmptyStateCardProps {
  icon: string;
  title: string;
  description: string;
  primaryAction: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  helpText?: string;
}

export default function EmptyStateCard({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  helpText,
}: EmptyStateCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-12)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: '80px',
          marginBottom: 'var(--space-6)',
          opacity: 0.9,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h2 className="heading-3" style={{ marginBottom: 'var(--space-3)' }}>
        {title}
      </h2>

      {/* Description */}
      <p
        className="body"
        style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-8)',
          maxWidth: '500px',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: helpText ? 'var(--space-6)' : 0,
        }}
      >
        {/* Primary Action */}
        <button
          onClick={primaryAction.onClick}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--gradient-info)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-base)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-semibold)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            transition: 'all var(--transition-base)',
            minWidth: '180px',
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
          {primaryAction.icon && (
            <i className={`fas ${primaryAction.icon}`} style={{ marginRight: 'var(--space-2)' }} />
          )}
          {primaryAction.label}
        </button>

        {/* Secondary Action (Optional) */}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              minWidth: '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
            }}
          >
            {secondaryAction.icon && (
              <i className={`fas ${secondaryAction.icon}`} style={{ marginRight: 'var(--space-2)' }} />
            )}
            {secondaryAction.label}
          </button>
        )}
      </div>

      {/* Help Text (Optional) */}
      {helpText && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid var(--accent-blue)',
            borderRadius: 'var(--radius-base)',
            maxWidth: '500px',
          }}
        >
          <p className="body-small" style={{ color: 'var(--text-secondary)', margin: 0 }}>
            <i className="fas fa-info-circle" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
}
