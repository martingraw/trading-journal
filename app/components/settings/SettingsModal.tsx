'use client';

import { useState } from 'react';
import { JSONBinConfig } from '@/app/lib/types';
import { useOnboarding } from '@/app/lib/hooks/useOnboarding';
import JSONBinInstructions from '../onboarding/JSONBinInstructions';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jsonBinConfig: JSONBinConfig;
  onSaveConfig: (config: JSONBinConfig) => Promise<void>;
  onExportData: () => void;
  onImportData: () => void;
  onClearAllTrades: () => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  jsonBinConfig,
  onSaveConfig,
  onExportData,
  onImportData,
  onClearAllTrades,
  theme,
  onThemeChange,
}: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(jsonBinConfig.apiKey);
  const [binId, setBinId] = useState(jsonBinConfig.binId);
  const [isSaving, setIsSaving] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const { hasSeenWelcome } = useOnboarding();

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await onSaveConfig({ apiKey, binId });
    setIsSaving(false);
  };

  const handleClearAll = () => {
    onClearAllTrades();
    setShowClearConfirm(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border)',
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
          <h2 className="heading-2">Settings</h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xl)',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-6)' }}>
          {/* JSONBin Configuration */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-4)' }}>
              <i className="fas fa-cloud" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
              Cloud Sync (JSONBin)
            </h3>
            <p className="body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Connect to JSONBin to sync your trades across devices
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="$2b$10$..."
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-base)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'monospace',
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

              <div>
                <label className="label" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                  Bin ID
                </label>
                <input
                  type="text"
                  value={binId}
                  onChange={(e) => setBinId(e.target.value)}
                  placeholder="67..."
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-base)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'monospace',
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

              {/* JSONBin Setup Instructions */}
              <JSONBinInstructions isExpanded={!hasSeenWelcome} />

              <button
                onClick={handleSave}
                disabled={isSaving || !apiKey || !binId}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: apiKey && binId ? 'var(--accent-green)' : 'var(--bg-elevated)',
                  color: apiKey && binId ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: apiKey && binId ? 'pointer' : 'not-allowed',
                  transition: 'all var(--transition-fast)',
                  opacity: isSaving ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (apiKey && binId && !isSaving) {
                    e.currentTarget.style.opacity = '0.9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {isSaving ? (
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: 'var(--space-2)' }} />
                    Connecting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save" style={{ marginRight: 'var(--space-2)' }} />
                    Save & Connect
                  </>
                )}
              </button>

              <div
                style={{
                  padding: 'var(--space-3)',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid var(--accent-blue)',
                  borderRadius: 'var(--radius-base)',
                }}
              >
                <p className="body-small" style={{ color: 'var(--text-primary)', margin: 0 }}>
                  <i className="fas fa-info-circle" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
                  Get your API key and create a bin at{' '}
                  <a
                    href="https://jsonbin.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}
                  >
                    jsonbin.io
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Theme */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-4)' }}>
              <i className="fas fa-palette" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
              Appearance
            </h3>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                onClick={() => onThemeChange('dark')}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: theme === 'dark' ? 'var(--accent-blue)' : 'var(--bg-elevated)',
                  color: theme === 'dark' ? 'white' : 'var(--text-primary)',
                  border: theme === 'dark' ? 'none' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <i className="fas fa-moon" style={{ marginRight: 'var(--space-2)' }} />
                Dark
              </button>
              <button
                onClick={() => onThemeChange('light')}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: theme === 'light' ? 'var(--accent-blue)' : 'var(--bg-elevated)',
                  color: theme === 'light' ? 'white' : 'var(--text-primary)',
                  border: theme === 'light' ? 'none' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <i className="fas fa-sun" style={{ marginRight: 'var(--space-2)' }} />
                Light
              </button>
            </div>
          </section>

          {/* Data Management */}
          <section>
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-4)' }}>
              <i className="fas fa-database" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
              Data Management
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button
                onClick={onExportData}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left',
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
                onClick={onImportData}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left',
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

              {showClearConfirm ? (
                <div
                  style={{
                    padding: 'var(--space-4)',
                    background: 'var(--accent-red-dim)',
                    border: '1px solid var(--accent-red)',
                    borderRadius: 'var(--radius-base)',
                  }}
                >
                  <p className="body-small" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                    Are you sure? This will delete all trades permanently.
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button
                      onClick={handleClearAll}
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
                      Yes, Delete All
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
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
                  onClick={() => setShowClearConfirm(true)}
                  style={{
                    padding: 'var(--space-3)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--accent-red)',
                    borderRadius: 'var(--radius-base)',
                    color: 'var(--accent-red)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-semibold)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-red)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                    e.currentTarget.style.color = 'var(--accent-red)';
                  }}
                >
                  <i className="fas fa-trash" style={{ marginRight: 'var(--space-2)' }} />
                  Clear All Trades
                </button>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: 'var(--space-6)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--accent-blue)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-base)',
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
