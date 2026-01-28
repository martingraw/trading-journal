import { PresetTag } from '../types';

// ============ PRESET TAGS ============

export const PRESET_TAGS: PresetTag[] = [
  { label: 'Breakout', color: '#4488ff' },
  { label: 'Reversal', color: '#8855ff' },
  { label: 'Trend', color: '#00d4aa' },
  { label: 'Scalp', color: '#ffcc00' },
  { label: 'Swing', color: '#ff8844' },
  { label: 'First Candle Rule', color: '#00d4aa' },
  { label: 'FOMO', color: '#ff4466' },
  { label: 'Revenge', color: '#ff4466' },
  { label: 'A+ Setup', color: '#00d4aa' },
  { label: 'Overtraded', color: '#ff4466' },
  { label: 'News', color: '#8855ff' }
];

// ============ TICK VALUES ============
// Tick value mapping for different symbols
export const TICK_VALUES: Record<string, number> = {
  // E-mini S&P 500
  'MES': 5,    // Micro E-mini S&P 500: $5 per tick
  'ES': 50,    // E-mini S&P 500: $50 per tick

  // E-mini NASDAQ
  'MNQ': 2,    // Micro E-mini NASDAQ: $2 per tick
  'NQ': 20,    // E-mini NASDAQ: $20 per tick

  // Gold
  'MGC': 10,   // Micro Gold: $10 per tick
  'GC': 100,   // Gold: $100 per tick

  // Crude Oil
  'MCL': 10,   // Micro Crude Oil: $10 per tick
  'CL': 1000,  // Crude Oil: $1000 per tick

  // E-mini Russell 2000
  'M2K': 5,    // Micro E-mini Russell 2000: $5 per tick
  'RTY': 50,   // E-mini Russell 2000: $50 per tick

  // E-mini Dow
  'MYM': 0.5,  // Micro E-mini Dow: $0.50 per tick
  'YM': 5,     // E-mini Dow: $5 per tick
};

// ============ STORAGE KEYS ============

export const STORAGE_KEYS = {
  TRADES: 'tradingJournal_trades',
  JSONBIN_CONFIG: 'tradingJournal_jsonBinConfig',
  THEME: 'tradingJournal_theme',
  DAILY_NOTES: 'tradingJournal_dailyNotes',
  ONBOARDING_COMPLETED: 'tradingJournal_onboarding_completed',
  WELCOME_DISMISSED: 'tradingJournal_welcome_dismissed',
} as const;

// ============ API ENDPOINTS ============

export const API = {
  JSONBIN_BASE: 'https://api.jsonbin.io/v3/b',
  JSONBIN_CREATE: 'https://api.jsonbin.io/v3/b',
} as const;

// ============ DEFAULTS ============

export const DEFAULT_JSONBIN_CONFIG = {
  apiKey: '',
  binId: '',
};

export const DEFAULT_FILTERS = {
  symbol: '',
  direction: '' as const,
  outcome: '' as const,
  startDate: '',
  endDate: '',
  minPnl: '',
  maxPnl: '',
  tag: '',
};

// ============ UI CONSTANTS ============

export const TOAST_DURATION = 5000; // 5 seconds
export const CHART_ANIMATION_DURATION = 750; // ms

// Time-of-day split (12:00 PM)
export const MORNING_CUTOFF_HOUR = 12;

// Chart colors
export const CHART_COLORS = {
  green: '#00ffa3',
  red: '#ff4757',
  blue: '#3b82f6',
  purple: '#a855f7',
  yellow: '#fbbf24',
} as const;

// Tab names
export const TABS = {
  DASHBOARD: 'dashboard',
  TRADES: 'trades',
  UPLOAD: 'upload',
} as const;
