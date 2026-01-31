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
import DashboardWidget from './components/dashboard/DashboardWidget';
import { useTradeContext } from './context/TradeContext';
import { useOnboarding } from './lib/hooks/useOnboarding';
import { useWidgetOrder } from './lib/hooks/useWidgetOrder';

export default function Home() {
  const router = useRouter();
  const { stats, trades, tagStats, tradesByDay, selectedDate, setSelectedDate } = useTradeContext();
  const { isConnected } = useOnboarding();
  const { widgetOrder, moveWidgetUp, moveWidgetDown, resetToDefault, mounted: widgetMounted } = useWidgetOrder();
  const [mounted, setMounted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Widget rendering map
  const widgets: Record<string, JSX.Element> = {
    stats: (
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <StatsGrid stats={stats} />
      </div>
    ),
    charts: (
      <DashboardWidget
        id="charts"
        isEditMode={isEditMode}
        isFirst={widgetOrder[0] === 'charts'}
        isLast={widgetOrder[widgetOrder.length - 1] === 'charts'}
        onMoveUp={() => moveWidgetUp('charts')}
        onMoveDown={() => moveWidgetDown('charts')}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {/* Win Rate Chart */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-base)',
              padding: 'var(--space-5)',
              border: '1px solid var(--border)',
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
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-base)',
              padding: 'var(--space-5)',
              border: '1px solid var(--border)',
            }}
          >
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-6)' }}>
              Cumulative P&L
            </h3>
            <PnLChart trades={trades} />
          </div>
        </div>
      </DashboardWidget>
    ),
    performance: (
      <DashboardWidget
        id="performance"
        title="Performance Highlights"
        isEditMode={isEditMode}
        isFirst={widgetOrder[0] === 'performance'}
        isLast={widgetOrder[widgetOrder.length - 1] === 'performance'}
        onMoveUp={() => moveWidgetUp('performance')}
        onMoveDown={() => moveWidgetDown('performance')}
      >
        <BestWorstDay bestDay={stats.bestDay} worstDay={stats.worstDay} />
      </DashboardWidget>
    ),
    'time-analysis': (
      <DashboardWidget
        id="time-analysis"
        title="Time of Day Analysis"
        isEditMode={isEditMode}
        isFirst={widgetOrder[0] === 'time-analysis'}
        isLast={widgetOrder[widgetOrder.length - 1] === 'time-analysis'}
        onMoveUp={() => moveWidgetUp('time-analysis')}
        onMoveDown={() => moveWidgetDown('time-analysis')}
      >
        <TimeAnalysis
          morningTrades={stats.morningTrades}
          morningWinRate={stats.morningWinRate}
          afternoonTrades={stats.afternoonTrades}
          afternoonWinRate={stats.afternoonWinRate}
        />
      </DashboardWidget>
    ),
    calendar: (
      <DashboardWidget
        id="calendar"
        isEditMode={isEditMode}
        isFirst={widgetOrder[0] === 'calendar'}
        isLast={widgetOrder[widgetOrder.length - 1] === 'calendar'}
        onMoveUp={() => moveWidgetUp('calendar')}
        onMoveDown={() => moveWidgetDown('calendar')}
      >
        <CalendarHeatmap
          tradesByDay={tradesByDay}
          selectedDate={selectedDate}
          onDateClick={(date) => {
            setSelectedDate(date);
            router.push('/trades');
          }}
        />
      </DashboardWidget>
    ),
    tags: (
      <DashboardWidget
        id="tags"
        title="Tag Performance"
        isEditMode={isEditMode}
        isFirst={widgetOrder[0] === 'tags'}
        isLast={widgetOrder[widgetOrder.length - 1] === 'tags'}
        onMoveUp={() => moveWidgetUp('tags')}
        onMoveDown={() => moveWidgetDown('tags')}
      >
        <TagPerformance tagStats={tagStats} />
      </DashboardWidget>
    ),
  };

  return (
    <AppLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 className="heading-2">Dashboard</h1>
          {mounted && trades.length > 0 && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: isEditMode ? 'var(--accent-blue)' : 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-base)',
                color: isEditMode ? 'white' : 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <i className={`fas ${isEditMode ? 'fa-check' : 'fa-edit'}`} />
              {isEditMode ? 'Done' : 'Edit Layout'}
            </button>
          )}
        </div>

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
              helpText="Export your CSV from TradingView → Trading Panel → Broker's dropdown menu → Export data..."
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
          /* Dashboard Content - Render widgets in custom order */
          <>
            {widgetMounted && widgetOrder.map((widgetId) => (
              <div key={widgetId}>
                {widgets[widgetId]}
              </div>
            ))}
          </>
        )}
      </div>
    </AppLayout>
  );
}
