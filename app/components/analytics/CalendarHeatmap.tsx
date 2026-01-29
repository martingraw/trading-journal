'use client';

import { useState, useEffect } from 'react';
import { CalendarDay } from '@/app/lib/types';
import { formatCurrency } from '@/app/lib/utils/formatters';
import { useTradeContext } from '@/app/context/TradeContext';

interface CalendarHeatmapProps {
  tradesByDay: Record<string, CalendarDay>;
  selectedDate: string | null;
  onDateClick: (date: string) => void;
}

export default function CalendarHeatmap({ tradesByDay, selectedDate, onDateClick }: CalendarHeatmapProps) {
  const { dailyNotes, setDailyNote } = useTradeContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [noteModalDate, setNoteModalDate] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only checking dailyNotes after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get calendar data for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Note modal handlers
  const openNoteModal = (dateStr: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent day click
    setNoteModalDate(dateStr);
    setNoteText(dailyNotes[dateStr] || '');
  };

  const closeNoteModal = () => {
    setNoteModalDate(null);
    setNoteText('');
  };

  const saveNote = () => {
    if (noteModalDate) {
      setDailyNote(noteModalDate, noteText);
      closeNoteModal();
    }
  };

  // Get heat color based on P&L - subtle background colors
  const getHeatColor = (pnl: number): string => {
    if (pnl === 0) return 'var(--bg-elevated)';
    
    // Green for wins: #a5f28b at 13% opacity
    if (pnl > 0) {
      return 'rgba(165, 242, 139, 0.13)';
    } else {
      // Red for losses: #ff8686 at 20% opacity
      return 'rgba(255, 134, 134, 0.20)';
    }
  };

  // Build calendar grid
  const calendarDays = [];
  // Only compute today's date after mount to prevent hydration mismatch
  // Use local date string to avoid timezone issues
  const todayStr = mounted ? (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })() : '';

  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const stats = tradesByDay[dateStr];
    const isSelected = dateStr === selectedDate;
    const isToday = mounted && dateStr === todayStr;
    const hasTrades = stats && stats.trades > 0;

    calendarDays.push(
      <div
        key={dateStr}
        onClick={() => hasTrades && onDateClick(dateStr)}
        style={{
          padding: 'var(--space-2)',
          background: hasTrades ? getHeatColor(stats.pnl) : 'var(--bg-elevated)',
          border: isSelected ? '2px solid var(--accent-blue)' : isToday ? '2px solid var(--accent-blue)' : '1px solid var(--border)',
          borderRadius: 'var(--radius-base)',
          cursor: hasTrades ? 'pointer' : 'default',
          transition: 'all var(--transition-fast)',
          position: 'relative',
          minHeight: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onMouseEnter={(e) => {
          if (hasTrades) {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.zIndex = '10';
          }
        }}
        onMouseLeave={(e) => {
          if (hasTrades) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.zIndex = '1';
          }
        }}
      >
        {/* Day Number and Note Icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            className="body-small"
            style={{
              fontWeight: isToday ? 'var(--font-bold)' : 'var(--font-medium)',
              color: hasTrades ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            {day}
          </div>
          {/* Pencil Icon for Daily Notes */}
          <button
            onClick={(e) => openNoteModal(dateStr, e)}
            style={{
              background: mounted && dailyNotes[dateStr] ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid',
              borderColor: mounted && dailyNotes[dateStr] ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-base)',
              padding: '4px 6px',
              cursor: 'pointer',
              color: mounted && dailyNotes[dateStr] ? '#000' : 'var(--text-primary)',
              fontSize: '12px',
              transition: 'all var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '24px',
              minHeight: '24px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              if (!mounted || !dailyNotes[dateStr]) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              if (!mounted || !dailyNotes[dateStr]) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            title={mounted && dailyNotes[dateStr] ? 'Edit note' : 'Add note'}
          >
            <i className="fas fa-pencil-alt" />
          </button>
        </div>

        {/* Stats */}
        {hasTrades && (
          <div style={{ marginTop: 'var(--space-1)' }}>
            <div
              className="mono"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-bold)',
                color: stats.pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                marginBottom: 'var(--space-1)',
              }}
            >
              {formatCurrency(stats.pnl, 0)}
            </div>
            <div
              className="body-small"
              style={{
                fontSize: '10px',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)',
              }}
            >
              {stats.trades} trade{stats.trades !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>
    );
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Header with Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
        }}
      >
        <h3 className="heading-4">{monthName}</h3>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            onClick={goToPreviousMonth}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
            }}
          >
            <i className="fas fa-chevron-left" />
          </button>

          <button
            onClick={goToToday}
            className="body-small"
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 'var(--font-medium)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
            }}
          >
            Today
          </button>

          <button
            onClick={goToNextMonth}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
            }}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>

      {/* Day Labels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="label"
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 'var(--space-2)',
        }}
      >
        {calendarDays}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              background: 'var(--accent-red)',
              borderRadius: 'var(--radius-base)',
            }}
          />
          <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
            Loss
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-base)',
            }}
          />
          <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
            No trades
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              background: 'var(--accent-green)',
              borderRadius: 'var(--radius-base)',
            }}
          />
          <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
            Profit
          </span>
        </div>
      </div>

      {/* Note Modal */}
      {noteModalDate && (
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
          onClick={closeNoteModal}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '500px',
              width: '90%',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: 'var(--space-6)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 className="heading-4">
                Daily Note - {new Date(noteModalDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button
                onClick={closeNoteModal}
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

            {/* Modal Content */}
            <div style={{ padding: 'var(--space-6)' }}>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add your thoughts about this trading day..."
                style={{
                  width: '100%',
                  minHeight: '150px',
                  padding: 'var(--space-4)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'inherit',
                  resize: 'vertical',
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

            {/* Modal Footer */}
            <div
              style={{
                padding: 'var(--space-6)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 'var(--space-3)',
              }}
            >
              <button
                onClick={closeNoteModal}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-base)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--accent-blue)',
                  border: 'none',
                  borderRadius: 'var(--radius-base)',
                  color: 'white',
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
                <i className="fas fa-save" style={{ marginRight: 'var(--space-2)' }} />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
