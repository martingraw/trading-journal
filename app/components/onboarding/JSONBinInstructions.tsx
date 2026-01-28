'use client';

import { useState, useEffect } from 'react';

interface JSONBinInstructionsProps {
  isExpanded?: boolean;
}

export default function JSONBinInstructions({ isExpanded = false }: JSONBinInstructionsProps) {
  const [expanded, setExpanded] = useState(false);

  // Update expanded state after mount to prevent hydration mismatch
  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-base)',
        marginTop: 'var(--space-6)',
        overflow: 'hidden',
      }}
    >
      {/* Header - Clickable to toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: 'var(--space-4)',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'background var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <i
            className="fas fa-question-circle"
            style={{ color: 'var(--accent-blue)', fontSize: 'var(--text-base)' }}
          />
          <span className="body" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-semibold)' }}>
            How to get your JSONBin credentials
          </span>
        </div>
        <i
          className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-sm)',
            transition: 'transform var(--transition-base)',
          }}
        />
      </button>

      {/* Collapsible Content */}
      {expanded && (
        <div
          style={{
            padding: '0 var(--space-4) var(--space-4)',
            borderTop: '1px solid var(--border)',
          }}
        >
          {/* Step 1 */}
          <div style={{ marginTop: 'var(--space-4)' }}>
            <h4
              className="heading-6"
              style={{
                marginBottom: 'var(--space-3)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  background: 'var(--accent-blue)',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                }}
              >
                1
              </span>
              Create Free Account
            </h4>
            <ul
              className="body-small"
              style={{
                color: 'var(--text-secondary)',
                marginLeft: 'var(--space-8)',
                listStyle: 'disc',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}
            >
              <li>
                Visit{' '}
                <a
                  href="https://jsonbin.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}
                >
                  jsonbin.io
                </a>
              </li>
              <li>Sign up for a free account (100,000 requests/month)</li>
              <li>No credit card required</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div style={{ marginTop: 'var(--space-5)' }}>
            <h4
              className="heading-6"
              style={{
                marginBottom: 'var(--space-3)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  background: 'var(--accent-green)',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                }}
              >
                2
              </span>
              Get API Key
            </h4>
            <ul
              className="body-small"
              style={{
                color: 'var(--text-secondary)',
                marginLeft: 'var(--space-8)',
                listStyle: 'disc',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                marginBottom: 'var(--space-3)',
              }}
            >
              <li>After login, go to the "API Keys" section</li>
              <li>Find your "Master Key" or "Access Key"</li>
              <li>Click the copy button to copy your key</li>
            </ul>
            <div
              style={{
                marginLeft: 'var(--space-8)',
                padding: 'var(--space-3)',
                background: 'rgba(0, 255, 163, 0.1)',
                border: '1px solid var(--accent-green)',
                borderRadius: 'var(--radius-base)',
              }}
            >
              <div className="label" style={{ color: 'var(--accent-green)', marginBottom: 'var(--space-1)' }}>
                Example API Key Format:
              </div>
              <code
                className="mono"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all',
                }}
              >
                $2b$10$abcd1234efgh5678...
              </code>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ marginTop: 'var(--space-5)' }}>
            <h4
              className="heading-6"
              style={{
                marginBottom: 'var(--space-3)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  background: 'var(--accent-purple)',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                }}
              >
                3
              </span>
              Create a Bin
            </h4>
            <ul
              className="body-small"
              style={{
                color: 'var(--text-secondary)',
                marginLeft: 'var(--space-8)',
                listStyle: 'disc',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                marginBottom: 'var(--space-3)',
              }}
            >
              <li>Click the "Create Bin" button</li>
              <li>Name it "TradeLog" (optional)</li>
              <li>Leave the content empty or use: {'{}'}</li>
              <li>After creation, copy the Bin ID from the URL or bin details</li>
            </ul>
            <div
              style={{
                marginLeft: 'var(--space-8)',
                padding: 'var(--space-3)',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid var(--accent-purple)',
                borderRadius: 'var(--radius-base)',
              }}
            >
              <div className="label" style={{ color: 'var(--accent-purple)', marginBottom: 'var(--space-1)' }}>
                Example Bin ID Format:
              </div>
              <code
                className="mono"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all',
                }}
              >
                67a3f4b2e41b4c001234abcd
              </code>
            </div>
          </div>

          {/* Security Note */}
          <div
            style={{
              marginTop: 'var(--space-5)',
              padding: 'var(--space-3)',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid var(--accent-blue)',
              borderRadius: 'var(--radius-base)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
            }}
          >
            <i
              className="fas fa-lock"
              style={{
                color: 'var(--accent-blue)',
                fontSize: 'var(--text-base)',
                marginTop: '2px',
              }}
            />
            <div>
              <div className="body-small" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-semibold)' }}>
                Your Data is Secure
              </div>
              <div className="body-small" style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                Your trade data stays on JSONBin's secure servers and syncs across your devices. We never store your
                credentials.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
