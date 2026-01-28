'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from './components/layout/AppLayout';
import StatsGrid from './components/dashboard/StatsGrid';
import WinRateChart from './components/charts/WinRateChart';
import PnLChart from './components/charts/PnLChart';
import TagPerformance from './components/analytics/TagPerformance';
import TimeAnalysis from './components/analytics/TimeAnalysis';
import BestWorstDay from './components/analytics/BestWorstDay';
import CalendarHeatmap from './components/analytics/CalendarHeatmap';
import EmptyStateCard from './components/dashboard/EmptyStateCard';
import { useTradeContext } from './context/TradeContext';
import { useOnboarding } from './lib/hooks/useOnboarding';

export default function Home() {
  const router = useRouter();
  const { stats, trades, tagStats, tradesByDay, selectedDate, setSelectedDate } = useTradeContext();
  const { isConnected } = useOnboarding();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppLayout>
      <div>
        <h1 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>
          Dashboard
        </h1>

        {!mounted ? (
          <div />
        ) : trades.length === 0 ? (
          /* Empty State - Adapts based on connection status */
          isConnected ? (
            <EmptyStateCard
              icon="fa-chart-line"
              title="Import Your First Trades"
              description="You're all set up! Now import your trading history from your TradingView CSV export to start tracking your performance."
              primaryAction={{
                label: 'Import Trades',
                onClick: () => router.push('/upload'),
                icon: 'fa-upload',
              }}
              helpText="Export your CSV from TradingView → Paper Trading → List of Trades → Export button"
            />
          ) : (
            <EmptyStateCard
              icon="fa-cog"
              title="Set Up Cloud Sync"
              description="First, connect to JSONBin for free cloud backup and sync across devices. Your trades will be stored securely."
              primaryAction={{
                label: 'Import Trades',
                onClick: () => router.push('/upload'),
                icon: 'fa-upload',
              }}
              helpText="Configure JSONBin from Settings (gear icon in sidebar) or import trades locally first"
            />
          )
        ) : (
          /* Dashboard Content */
          <>
            {/* Stats Grid */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <StatsGrid stats={stats} />
            </div>

            {/* Charts Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: 'var(--space-6)',
                marginBottom: 'var(--space-8)',
              }}
            >
              {/* Win Rate Chart */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
                  Win Rate Distribution
                </h3>
                <WinRateChart wins={stats.wins} losses={stats.losses} winRate={stats.winRate} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 'var(--space-6)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div className="label" style={{ marginBottom: 'var(--space-1)' }}>
                      Wins
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--accent-green)',
                      }}
                    >
                      {stats.wins}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="label" style={{ marginBottom: 'var(--space-1)' }}>
                      Losses
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--accent-red)',
                      }}
                    >
                      {stats.losses}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cumulative P&L Chart */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
                  Cumulative P&L
                </h3>
                <PnLChart trades={trades} />
              </div>
            </div>

            {/* Best/Worst Days */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
                Performance Highlights
              </h3>
              <BestWorstDay bestDay={stats.bestDay} worstDay={stats.worstDay} />
            </div>

            {/* Time Analysis */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
                Time of Day Analysis
              </h3>
              <TimeAnalysis
                morningTrades={stats.morningTrades}
                morningWinRate={stats.morningWinRate}
                afternoonTrades={stats.afternoonTrades}
                afternoonWinRate={stats.afternoonWinRate}
              />
            </div>

            {/* Calendar Heatmap */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <CalendarHeatmap
                tradesByDay={tradesByDay}
                selectedDate={selectedDate}
                onDateClick={setSelectedDate}
              />
            </div>

            {/* Tag Performance */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
                Tag Performance
              </h3>
              <TagPerformance tagStats={tagStats} />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
