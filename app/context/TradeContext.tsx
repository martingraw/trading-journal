'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Trade, FilterState, TradeStats, TagStats, CalendarDay, JSONBinConfig, ToastType } from '../lib/types';
import { STORAGE_KEYS, DEFAULT_JSONBIN_CONFIG, DEFAULT_FILTERS, API } from '../lib/constants';
import { calculateStats, filterTrades, groupTradesByDay, calculateTagStats } from '../lib/utils/tradeCalculations';
import { processCSV } from '../lib/utils/csvProcessor';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { useToast } from '../lib/hooks/useToast';

interface TradeContextType {
  // State
  trades: Trade[];
  filters: FilterState;
  selectedDate: string | null;
  theme: 'dark' | 'light';
  jsonBinConfig: JSONBinConfig;
  dailyNotes: Record<string, string>;
  isLoading: boolean;
  isSyncing: boolean;
  isConnected: boolean;

  // Actions
  setTrades: (trades: Trade[]) => void;
  addTrade: (trade: Trade) => Promise<void>;
  updateTrade: (id: string, updates: Partial<Trade>) => Promise<void>;
  deleteTrade: (id: string) => Promise<void>;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  setSelectedDate: (date: string | null) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setJsonBinConfig: (config: JSONBinConfig) => Promise<void>;
  setDailyNote: (date: string, note: string) => void;

  // Complex operations
  importCSV: (csvData: any[]) => Promise<{ success: boolean; tradesAdded: number; message: string }>;
  syncToCloud: () => Promise<boolean>;
  loadFromCloud: () => Promise<boolean>;
  exportData: () => string;
  importData: (jsonData: string) => Promise<{ success: boolean; message: string }>;
  clearAllTrades: () => void;

  // Computed values
  stats: TradeStats;
  filteredTrades: Trade[];
  tagStats: TagStats;
  tradesByDay: Record<string, CalendarDay>;

  // Toast
  showToast: (message: string, type?: ToastType) => void;
  toasts: any[];
  dismissToast: (id: string) => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export function TradeProvider({ children }: { children: React.ReactNode }) {
  // Local storage state
  const [trades, setTradesState] = useLocalStorage<Trade[]>(STORAGE_KEYS.TRADES, []);
  const [jsonBinConfig, setJsonBinConfigState] = useLocalStorage<JSONBinConfig>(
    STORAGE_KEYS.JSONBIN_CONFIG,
    DEFAULT_JSONBIN_CONFIG
  );
  const [dailyNotes, setDailyNotesState] = useLocalStorage<Record<string, string>>(
    STORAGE_KEYS.DAILY_NOTES,
    {}
  );
  const [themeState, setThemeState] = useLocalStorage<'dark' | 'light'>(STORAGE_KEYS.THEME, 'dark');

  // Component state
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Toast notifications
  const { toasts, showToast, dismissToast } = useToast();

  // Check if connected to JSONBin
  const isConnected = Boolean(jsonBinConfig.apiKey && jsonBinConfig.binId);

  // Apply theme on mount and changes
  useEffect(() => {
    if (themeState === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [themeState]);

  // Load from cloud on mount if connected
  useEffect(() => {
    if (isConnected) {
      loadFromCloud();
    }
  }, []); // Only on mount

  // Save to localStorage whenever trades change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRADES, JSON.stringify(trades));
  }, [trades]);

  // Helper to save trades and sync
  const setTrades = useCallback(async (newTrades: Trade[]) => {
    setTradesState(newTrades);
    if (isConnected) {
      await saveToCloud(newTrades);
    }
  }, [isConnected, setTradesState]);

  // JSONBin sync functions
  const saveToCloud = async (tradesToSave: Trade[]): Promise<boolean> => {
    if (!isConnected) return false;

    setIsSyncing(true);
    try {
      const response = await fetch(`${API.JSONBIN_BASE}/${jsonBinConfig.binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': jsonBinConfig.apiKey,
        },
        body: JSON.stringify({ trades: tradesToSave }),
      });

      if (!response.ok) throw new Error('Failed to save');

      setIsSyncing(false);
      return true;
    } catch (error) {
      console.error('Error saving to JSONBin:', error);
      showToast('Failed to sync to cloud', 'error');
      setIsSyncing(false);
      return false;
    }
  };

  const loadFromCloud = async (): Promise<boolean> => {
    if (!isConnected) return false;

    setIsLoading(true);
    try {
      const response = await fetch(`${API.JSONBIN_BASE}/${jsonBinConfig.binId}/latest`, {
        headers: {
          'X-Master-Key': jsonBinConfig.apiKey,
        },
      });

      if (!response.ok) throw new Error('Failed to load');

      const data = await response.json();

      if (data.record && data.record.trades) {
        const sortedTrades = data.record.trades.sort(
          (a: Trade, b: Trade) => new Date(b.exitTime).getTime() - new Date(a.exitTime).getTime()
        );
        setTradesState(sortedTrades);
      } else {
        setTradesState([]);
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error loading from JSONBin:', error);
      showToast('Could not connect to cloud storage', 'error');

      // Fallback to localStorage
      const saved = localStorage.getItem(STORAGE_KEYS.TRADES);
      setTradesState(saved ? JSON.parse(saved) : []);

      setIsLoading(false);
      return false;
    }
  };

  const syncToCloud = async (): Promise<boolean> => {
    return await saveToCloud(trades);
  };

  // Trade operations
  const addTrade = async (trade: Trade) => {
    const newTrades = [trade, ...trades];
    await setTrades(newTrades);
    showToast('Trade added successfully', 'success');
  };

  const updateTrade = async (id: string, updates: Partial<Trade>) => {
    const newTrades = trades.map((t) => (t.id === id ? { ...t, ...updates } : t));
    await setTrades(newTrades);
  };

  const deleteTrade = async (id: string) => {
    const newTrades = trades.filter((t) => t.id !== id);
    await setTrades(newTrades);
    showToast('Trade deleted', 'success');
  };

  // CSV Import
  const importCSV = async (csvData: any[]): Promise<{ success: boolean; tradesAdded: number; message: string }> => {
    try {
      const existingIds = new Set(trades.map((t) => t.id));
      const newTrades = processCSV(csvData, trades);
      const addedTrades = newTrades.filter((t) => !existingIds.has(t.id));

      if (addedTrades.length === 0) {
        return {
          success: false,
          tradesAdded: 0,
          message: 'No new trades found. These trades may already be imported.',
        };
      }

      await setTrades(newTrades);

      return {
        success: true,
        tradesAdded: addedTrades.length,
        message: `Successfully imported ${addedTrades.length} new trade${addedTrades.length > 1 ? 's' : ''}!`,
      };
    } catch (error) {
      console.error('CSV import error:', error);
      return {
        success: false,
        tradesAdded: 0,
        message: 'Failed to process CSV file',
      };
    }
  };

  // Data export/import
  const exportData = (): string => {
    const data = {
      trades,
      dailyNotes,
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = async (jsonData: string): Promise<{ success: boolean; message: string }> => {
    try {
      const importData = JSON.parse(jsonData);

      if (!importData.trades || !Array.isArray(importData.trades)) {
        return { success: false, message: 'Invalid backup file format' };
      }

      // Merge imported trades with existing (avoid duplicates)
      const existingIds = new Set(trades.map((t) => t.id));
      const newTrades = importData.trades.filter((t: Trade) => !existingIds.has(t.id));
      const mergedTrades = [...trades, ...newTrades].sort(
        (a, b) => new Date(b.exitTime).getTime() - new Date(a.exitTime).getTime()
      );

      await setTrades(mergedTrades);

      if (importData.dailyNotes) {
        setDailyNotesState({ ...dailyNotes, ...importData.dailyNotes });
      }

      return {
        success: true,
        message: `Imported ${newTrades.length} new trade${newTrades.length !== 1 ? 's' : ''}`,
      };
    } catch (error) {
      return { success: false, message: 'Failed to parse backup file' };
    }
  };

  const clearAllTrades = () => {
    setTradesState([]);
    if (isConnected) {
      saveToCloud([]);
    }
    showToast('All trades cleared', 'success');
  };

  // JSONBin config
  const setJsonBinConfig = async (config: JSONBinConfig): Promise<void> => {
    setJsonBinConfigState(config);

    if (config.apiKey && config.binId) {
      // Try to load from cloud
      const success = await loadFromCloud();
      if (success) {
        showToast('Connected to cloud storage', 'success');
      }
    }
  };

  // Theme
  const setTheme = (theme: 'dark' | 'light') => {
    setThemeState(theme);
  };

  // Daily notes
  const setDailyNote = (date: string, note: string) => {
    setDailyNotesState({ ...dailyNotes, [date]: note });
  };

  // Filters
  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSelectedDate(null);
  };

  // Computed values
  const stats = useMemo(() => calculateStats(trades), [trades]);

  const filteredTrades = useMemo(
    () => filterTrades(trades, filters, selectedDate),
    [trades, filters, selectedDate]
  );

  const tagStats = useMemo(() => calculateTagStats(trades), [trades]);

  const tradesByDay = useMemo(() => groupTradesByDay(trades), [trades]);

  const value: TradeContextType = {
    // State
    trades,
    filters,
    selectedDate,
    theme: themeState,
    jsonBinConfig,
    dailyNotes,
    isLoading,
    isSyncing,
    isConnected,

    // Actions
    setTrades,
    addTrade,
    updateTrade,
    deleteTrade,
    setFilters,
    clearFilters,
    setSelectedDate,
    setTheme,
    setJsonBinConfig,
    setDailyNote,

    // Complex operations
    importCSV,
    syncToCloud,
    loadFromCloud,
    exportData,
    importData,
    clearAllTrades,

    // Computed
    stats,
    filteredTrades,
    tagStats,
    tradesByDay,

    // Toast
    showToast,
    toasts,
    dismissToast,
  };

  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
}

export function useTradeContext() {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error('useTradeContext must be used within a TradeProvider');
  }
  return context;
}
