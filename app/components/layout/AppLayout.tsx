'use client';

import { useState, useRef, useEffect } from 'react';
import { useTradeContext } from '@/app/context/TradeContext';
import { useOnboarding } from '@/app/lib/hooks/useOnboarding';
import Sidebar from './Sidebar';
import Header from './Header';
import SettingsModal from '../settings/SettingsModal';
import WelcomeScreen from '../onboarding/WelcomeScreen';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const {
    stats,
    trades,
    isConnected,
    jsonBinConfig,
    setJsonBinConfig,
    exportData,
    importData,
    clearAllTrades,
    theme,
    setTheme,
  } = useTradeContext();
  const { isFirstTimeUser, markWelcomeDismissed } = useOnboarding();
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mounted, setMounted] = useState(false);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Prevent hydration mismatch by only checking after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show welcome screen for first-time users
  useEffect(() => {
    if (mounted && isFirstTimeUser) {
      setShowWelcome(true);
    }
  }, [mounted, isFirstTimeUser]);

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tradelog-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    importFileInputRef.current?.click();
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = event.target?.result as string;
        await importData(jsonData);
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
    markWelcomeDismissed();
    setShowSettings(true);
  };

  const handleSkipWelcome = () => {
    setShowWelcome(false);
    markWelcomeDismissed();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Welcome Screen for First-Time Users */}
      {showWelcome && <WelcomeScreen onGetStarted={handleGetStarted} onDismiss={handleSkipWelcome} />}

      {/* Sidebar */}
      <Sidebar onSettingsClick={() => setShowSettings(true)} />

      {/* Header */}
      <Header
        totalPnL={stats.totalPnL}
        winRate={stats.winRate}
        totalTrades={trades.length}
        isConnected={isConnected}
        streak={stats.streak}
        streakType={stats.streakType}
      />

      {/* Main Content */}
      <main
        style={{
          marginLeft: '260px',
          padding: 'var(--space-8)',
          minHeight: 'calc(100vh - 73px)',
        }}
      >
        {children}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        jsonBinConfig={jsonBinConfig}
        onSaveConfig={setJsonBinConfig}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onClearAllTrades={clearAllTrades}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Hidden file input for JSON import */}
      <input
        ref={importFileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        style={{ display: 'none' }}
      />
    </div>
  );
}
