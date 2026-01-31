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
  // Micro E-mini Futures
  'MES': 5,      // Micro E-mini S&P 500: $5 per point
  'MNQ': 2,      // Micro E-mini Nasdaq-100: $2 per point
  'MYM': 0.5,    // Micro E-mini Dow: $0.50 per point
  'M2K': 5,      // Micro E-mini Russell 2000: $5 per point
  'FDXS': 5,     // Micro-DAX: €5 per point
  'FSXE': 1,     // Micro-EURO STOXX 50: €1 per point

  // Stock Index
  'ES': 50,      // E-mini S&P 500: $50 per point
  'EP': 50,      // E-mini S&P 500 (CQG): $50 per point
  'NQ': 20,      // E-mini Nasdaq-100: $20 per point
  'ENQ': 20,     // E-mini Nasdaq-100 (CQG): $20 per point
  'YM': 5,       // E-mini Dow: $5 per point
  'RTY': 50,     // E-mini Russell 2000: $50 per point
  'EMD': 100,    // E-mini S&P MidCap 400: $100 per point
  'MNK': 5,      // Micro Nikkei (USD): $5 per point
  'NKD': 5,      // NIKKEI 225/USD: $5 per point
  'FDAX': 25,    // DAX: €25 per point
  'DD': 25,      // DAX (CQG): €25 per point
  'FDXM': 5,     // Mini-DAX: €5 per point
  'FESX': 10,    // EURO STOXX 50: €10 per point
  'DSX': 10,     // EURO STOXX 50 (CQG): €10 per point

  // Currencies
  '6A': 10,      // Australian Dollar: $10 per tick
  'DA6': 10,     // Australian Dollar (CQG): $10 per tick
  '6B': 6.25,    // British Pound: $6.25 per tick
  'BP6': 6.25,   // British Pound (CQG): $6.25 per tick
  '6C': 10,      // Canadian Dollar: $10 per tick
  'CA6': 10,     // Canadian Dollar (CQG): $10 per tick
  '6E': 12.5,    // Euro FX: $12.50 per tick
  'EU6': 12.5,   // Euro FX (CQG): $12.50 per tick
  '6J': 12.5,    // Japanese Yen: $12.50 per tick
  'JY6': 12.5,   // Japanese Yen (CQG): $12.50 per tick
  '6N': 10,      // New Zealand Dollar: $10 per tick
  'NE6': 10,     // New Zealand Dollar (CQG): $10 per tick
  '6S': 12.5,    // Swiss Franc: $12.50 per tick
  'SF6': 12.5,   // Swiss Franc (CQG): $12.50 per tick
  'E7': 6.25,    // E-mini Euro FX: $6.25 per tick
  'EEU': 6.25,   // E-mini Euro FX (CQG): $6.25 per tick
  'J7': 6.25,    // E-mini Japanese Yen: $6.25 per tick
  'EJY': 6.25,   // E-mini Japanese Yen (CQG): $6.25 per tick
  'M6A': 1,      // Micro AUD/USD: $1 per tick
  'M6B': 0.625,  // Micro GBP/USD: $0.625 per tick
  'MCD': 1,      // Micro CAD/USD: $1 per tick
  'GMCD': 1,     // Micro CAD/USD (CQG): $1 per tick
  'M6E': 1.25,   // Micro EUR/USD: $1.25 per tick
  'MJY': 1.25,   // Micro JPY/USD: $1.25 per tick
  'MSF': 1.25,   // Micro CHF/USD: $1.25 per tick
  'DX': 10,      // Dollar Index: $10 per tick
  'DXE': 10,     // Dollar Index (CQG): $10 per tick

  // Energies
  'CL': 10,      // Crude Oil: $10 per tick (0.01 = $10)
  'CLE': 10,     // Crude Oil (CQG): $10 per tick
  'QM': 12.5,    // E-mini Crude Oil: $12.50 per tick
  'NQM': 12.5,   // E-mini Crude Oil (CQG): $12.50 per tick
  'MCL': 1,      // Micro WTI Crude Oil: $1 per tick
  'MCLE': 1,     // Micro WTI Crude Oil (CQG): $1 per tick
  'NG': 10,      // Natural Gas: $10 per tick (0.001 = $10)
  'NGE': 10,     // Natural Gas (CQG): $10 per tick
  'QG': 12.5,    // E-mini Natural Gas: $12.50 per tick
  'NQG': 12.5,   // E-mini Natural Gas (CQG): $12.50 per tick
  'MNG': 1,      // Micro Henry Hub Natural Gas: $1 per tick
  'RB': 4.2,     // RBOB Gasoline: $4.20 per tick
  'RBE': 4.2,    // RBOB Gasoline (CQG): $4.20 per tick
  'HO': 4.2,     // Heating Oil: $4.20 per tick
  'HOE': 4.2,    // Heating Oil (CQG): $4.20 per tick

  // Metals
  'GC': 10,      // Gold: $10 per tick (0.10 = $10)
  'GCE': 10,     // Gold (CQG): $10 per tick
  'QO': 12.5,    // E-mini Gold: $12.50 per tick
  'MQO': 12.5,   // E-mini Gold (CQG): $12.50 per tick
  'MGC': 1,      // Micro Gold: $1 per tick
  '1OZ': 0.1,    // 1-Ounce Gold: $0.10 per tick
  'M1OZ': 0.1,   // 1-Ounce Gold (CQG): $0.10 per tick
  'HG': 25,      // Copper: $25 per tick (0.0005 = $12.50)
  'CPE': 25,     // Copper (CQG): $25 per tick
  'QC': 12.5,    // E-mini Copper: $12.50 per tick
  'MQC': 12.5,   // E-mini Copper (CQG): $12.50 per tick
  'MHG': 2.5,    // Micro Copper: $2.50 per tick
  'SI': 25,      // Silver: $25 per tick (0.005 = $25)
  'SIE': 25,     // Silver (CQG): $25 per tick
  'QI': 12.5,    // E-mini Silver: $12.50 per tick
  'MQI': 12.5,   // E-mini Silver (CQG): $12.50 per tick
  'SIL': 5,      // E-micro Silver: $5 per tick
  'PL': 5,       // Platinum: $5 per tick
  'PLE': 5,      // Platinum (CQG): $5 per tick

  // Financials
  'UB': 31.25,   // Ultra U.S. Treasury Bond: $31.25 per tick
  'ULA': 31.25,  // Ultra U.S. Treasury Bond (CQG): $31.25 per tick
  'MWN': 3.125,  // Micro Ultra U.S. Treasury Bond: $3.125 per tick
  'MWNA': 3.125, // Micro Ultra U.S. Treasury Bond (CQG): $3.125 per tick
  'TN': 15.625,  // Ultra 10-Year U.S. Treasury Note: $15.625 per tick
  'TNA': 15.625, // Ultra 10-Year U.S. Treasury Note (CQG): $15.625 per tick
  'MTN': 1.5625, // Micro Ultra 10-Year U.S. Treasury Note: $1.5625 per tick
  'MTNA': 1.5625,// Micro Ultra 10-Year U.S. Treasury Note (CQG): $1.5625 per tick
  'Z3N': 7.8125, // 3-Year U.S. Treasury Note: $7.8125 per tick
  'ZB': 31.25,   // U.S. Treasury Bond: $31.25 per tick
  'USA': 31.25,  // U.S. Treasury Bond (CQG): $31.25 per tick
  'ZF': 7.8125,  // 5-Year U.S. Treasury Note: $7.8125 per tick
  'FVA': 7.8125, // 5-Year U.S. Treasury Note (CQG): $7.8125 per tick
  'ZN': 15.625,  // 10-Year U.S. Treasury Note: $15.625 per tick
  'TYA': 15.625, // 10-Year U.S. Treasury Note (CQG): $15.625 per tick
  'ZT': 15.625,  // 2-Year U.S. Treasury Note: $15.625 per tick
  'TUA': 15.625, // 2-Year U.S. Treasury Note (CQG): $15.625 per tick

  // Grains
  'ZC': 50,      // Corn: $50 per tick (0.25 = $12.50)
  'ZCE': 50,     // Corn (CQG): $50 per tick
  'XC': 10,      // Mini-Corn: $10 per tick
  'MZC': 5,      // Micro Corn: $5 per tick
  'ZW': 50,      // Chicago SRW Wheat: $50 per tick
  'ZWA': 50,     // Chicago SRW Wheat (CQG): $50 per tick
  'XW': 10,      // Mini-sized Chicago SRW Wheat: $10 per tick
  'MZW': 5,      // Micro Wheat: $5 per tick
  'ZS': 50,      // Soybeans: $50 per tick
  'ZSE': 50,     // Soybeans (CQG): $50 per tick
  'XK': 10,      // Mini Soybean: $10 per tick
  'XB': 10,      // Mini Soybean (CQG): $10 per tick
  'MZS': 5,      // Micro Soybean: $5 per tick
  'ZL': 6,       // Soybean Oil: $6 per tick
  'ZLE': 6,      // Soybean Oil (CQG): $6 per tick
  'MZL': 0.6,    // Micro Soybean Oil: $0.60 per tick
  'ZM': 10,      // Soybean Meal: $10 per tick
  'ZME': 10,     // Soybean Meal (CQG): $10 per tick
  'MZM': 1,      // Micro Soybean Meal: $1 per tick
  'ZO': 50,      // Oats: $50 per tick
  'ZOE': 50,     // Oats (CQG): $50 per tick
  'ZR': 10,      // Rough Rice: $10 per tick
  'ZRE': 10,     // Rough Rice (CQG): $10 per tick

  // Softs
  'DC': 10,      // Class III Milk: $10 per tick
  'GDC': 10,     // Class III Milk (CQG): $10 per tick
  'LBR': 11,     // Lumber: $11 per tick
  'CC': 10,      // Cocoa: $10 per tick
  'CCE': 10,     // Cocoa (CQG): $10 per tick
  'CT': 5,       // Cotton: $5 per tick
  'CTE': 5,      // Cotton (CQG): $5 per tick
  'KC': 18.75,   // Coffee: $18.75 per tick
  'KCE': 18.75,  // Coffee (CQG): $18.75 per tick
  'OJ': 15,      // Orange Juice: $15 per tick
  'OJE': 15,     // Orange Juice (CQG): $15 per tick
  'SB': 11.2,    // Sugar #11: $11.20 per tick
  'SBE': 11.2,   // Sugar #11 (CQG): $11.20 per tick

  // Meats
  'GF': 50,      // Feeder Cattle: $50 per tick
  'HE': 10,      // Lean Hog: $10 per tick
  'LE': 10,      // Live Cattle: $10 per tick
  'GLE': 10,     // Live Cattle (CQG): $10 per tick
};

// ============ STORAGE KEYS ============

export const STORAGE_KEYS = {
  TRADES: 'tradingJournal_trades',
  JSONBIN_CONFIG: 'tradingJournal_jsonBinConfig',
  THEME: 'tradingJournal_theme',
  DAILY_NOTES: 'tradingJournal_dailyNotes',
  ONBOARDING_COMPLETED: 'tradingJournal_onboarding_completed',
  WELCOME_DISMISSED: 'tradingJournal_welcome_dismissed',
  WIDGET_ORDER: 'tradingJournal_widgetOrder',
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

// Default dashboard widget order
export const DEFAULT_WIDGET_ORDER = [
  'stats',
  'charts',
  'calendar',
  'performance',
  'tags',
  'time-analysis',
];

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
