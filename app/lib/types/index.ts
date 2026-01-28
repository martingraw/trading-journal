// ============ CORE TYPES ============

export interface Trade {
  id: string;
  symbol: string;
  direction: 'Long' | 'Short';
  entryPrice: number;
  exitPrice: number;
  entryTime: string; // ISO datetime string
  exitTime: string;  // ISO datetime string
  qty: number;
  pnl: number;       // Profit/Loss in dollars
  pnlTicks: number;  // P&L in ticks
  notes: string;
  tags: string[];
}

export interface FilterState {
  symbol?: string;
  direction?: 'Long' | 'Short' | '';
  outcome?: 'winners' | 'losers' | '';
  startDate?: string;
  endDate?: string;
  minPnl?: string;
  maxPnl?: string;
  tag?: string;
}

export interface DailyStats {
  pnl: number;
  trades: number;
  wins: number;
  losses: number;
}

export interface JSONBinConfig {
  apiKey: string;
  binId: string;
}

export interface TradeStats {
  totalPnL: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  largestWin: number;
  largestLoss: number;
  avgTrade: number;
  wins: number;
  losses: number;
  streak: number;
  streakType: 'win' | 'loss' | null;
  bestDay: {
    date: string;
    pnl: number;
  } | null;
  worstDay: {
    date: string;
    pnl: number;
  } | null;
  morningWinRate: number;
  afternoonWinRate: number;
  morningTrades: number;
  afternoonTrades: number;
}

export interface TagStats {
  [tagLabel: string]: {
    color: string;
    trades: number;
    wins: number;
    losses: number;
    winRate: number;
    totalPnL: number;
    avgWin: number;
    avgLoss: number;
    profitFactor: number;
  };
}

export interface PresetTag {
  label: string;
  color: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface CalendarDay {
  date: string;
  pnl: number;
  trades: number;
  wins: number;
  losses: number;
  note?: string;
}

// ============ CONTEXT TYPES ============

export interface TradeContextValue {
  // State
  trades: Trade[];
  filters: FilterState;
  selectedDate: string | null;
  theme: 'dark' | 'light';
  jsonBinConfig: JSONBinConfig;
  dailyNotes: Record<string, string>;
  isLoading: boolean;
  isSyncing: boolean;

  // Actions
  setTrades: (trades: Trade[]) => void;
  addTrade: (trade: Trade) => void;
  updateTrade: (id: string, updates: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  setSelectedDate: (date: string | null) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setJsonBinConfig: (config: JSONBinConfig) => void;
  setDailyNote: (date: string, note: string) => void;

  // Complex operations
  importCSV: (csvData: string) => Promise<{ success: boolean; tradesAdded: number; message: string }>;
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
}

// ============ COMPONENT PROP TYPES ============

export interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  tooltip?: string;
  gradient?: string;
}

export interface TradeRowProps {
  trade: Trade;
  onUpdate: (id: string, updates: Partial<Trade>) => void;
  onDelete: (id: string) => void;
}

export interface ChartProps {
  data: any;
  options?: any;
}

export interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ToastProps {
  message: ToastMessage;
  onDismiss: (id: string) => void;
}

// ============ UTILITY TYPES ============

export type TradeDirection = 'Long' | 'Short';
export type TradeOutcome = 'winner' | 'loser';
export type Theme = 'dark' | 'light';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// ============ CSV TYPES ============

export interface CSVRow {
  Symbol: string;
  'Order Type': string;
  'Order ID': string;
  'Order Status': string;
  Instrument: string;
  Type: string;
  'Exec price': string;
  Qty: string;
  Time: string;
  [key: string]: string; // Allow additional columns
}

export interface ProcessedCSVResult {
  trades: Trade[];
  errors: string[];
  duplicates: number;
}
