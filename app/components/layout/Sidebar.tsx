'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTradeContext } from '@/app/context/TradeContext';

interface SidebarProps {
  onSettingsClick: () => void;
}

export default function Sidebar({ onSettingsClick }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTradeContext();

  const menuItems = [
    { id: 'dashboard', href: '/', icon: 'fa-chart-line', label: 'Dashboard' },
    { id: 'trades', href: '/trades', icon: 'fa-list', label: 'Trade Log' },
    { id: 'upload', href: '/upload', icon: 'fa-upload', label: 'Import Trades' },
  ];

  const getActiveTab = () => {
    if (pathname === '/') return 'dashboard';
    if (pathname.startsWith('/trades')) return 'trades';
    if (pathname.startsWith('/upload')) return 'upload';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '260px',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 200,
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          padding: 'var(--space-6) var(--space-4)',
          paddingBottom: 'var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <img
          src={theme === 'light' ? '/logo-dk.png' : '/logo.png'}
          alt="TradeLog"
          style={{
            width: '100%',
            maxWidth: '180px',
            height: 'auto',
            borderRadius: 'var(--radius-base)',
          }}
        />
      </Link>

      {/* Menu Items */}
      <div
        style={{
          flex: 1,
          padding: '0 var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-1)',
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: activeTab === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              borderRadius: 'var(--radius-base)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              width: '100%',
              color: activeTab === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              fontWeight: activeTab === item.id ? 'var(--font-semibold)' : 'var(--font-medium)',
              position: 'relative',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {activeTab === item.id && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '20px',
                  background: 'var(--accent-blue)',
                  borderRadius: '0 2px 2px 0',
                }}
              />
            )}
            <i className={`fas ${item.icon}`} style={{ width: '20px', textAlign: 'center' }} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Settings Button */}
      <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onSettingsClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-base)',
            cursor: 'pointer',
            transition: 'all var(--transition-base)',
            width: '100%',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-medium)',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <i className="fas fa-cog" style={{ width: '20px', textAlign: 'center' }} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
