import { Trade, TradeStats, FilterState, CalendarDay, TagStats } from '../types';
import { PRESET_TAGS, MORNING_CUTOFF_HOUR } from '../constants';

/**
 * Calculate comprehensive trading statistics
 * @param trades - Array of trades
 * @returns TradeStats object
 */
export const calculateStats = (trades: Trade[]): TradeStats => {
  if (trades.length === 0) {
    return {
      totalPnL: 0,
      winRate: 0,
      avgWin: 0,
      avgLoss: 0,
      profitFactor: 0,
      largestWin: 0,
      largestLoss: 0,
      avgTrade: 0,
      wins: 0,
      losses: 0,
      streak: 0,
      streakType: null,
      bestDay: null,
      worstDay: null,
      morningWinRate: 0,
      afternoonWinRate: 0,
      morningTrades: 0,
      afternoonTrades: 0,
    };
  }

  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl < 0);
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = (wins.length / trades.length) * 100;
  const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? losses.reduce((sum, t) => sum + t.pnl, 0) / losses.length : 0;
  const grossWins = wins.reduce((sum, t) => sum + t.pnl, 0);
  const grossLosses = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
  const profitFactor = grossLosses > 0 ? grossWins / grossLosses : grossWins > 0 ? Infinity : 0;
  const largestWin = wins.length > 0 ? Math.max(...wins.map((t) => t.pnl)) : 0;
  const largestLoss = losses.length > 0 ? Math.min(...losses.map((t) => t.pnl)) : 0;
  const avgTrade = totalPnL / trades.length;

  // Calculate daily P&L for streak and best/worst day
  const dailyPnL: Record<string, number> = {};
  trades.forEach((t) => {
    const day = t.exitTime.split(' ')[0];
    if (!dailyPnL[day]) dailyPnL[day] = 0;
    dailyPnL[day] += t.pnl;
  });

  const sortedDays = Object.entries(dailyPnL).sort((a, b) => a[0].localeCompare(b[0]));

  // Calculate streak (consecutive profitable/losing days)
  let streak = 0;
  let streakType: 'win' | 'loss' | null = null;
  if (sortedDays.length > 0) {
    const lastDayPnL = sortedDays[sortedDays.length - 1][1];
    streakType = lastDayPnL >= 0 ? 'win' : 'loss';

    for (let i = sortedDays.length - 1; i >= 0; i--) {
      const dayPnL = sortedDays[i][1];
      if ((streakType === 'win' && dayPnL >= 0) || (streakType === 'loss' && dayPnL < 0)) {
        streak++;
      } else {
        break;
      }
    }
  }

  // Best and worst day
  let bestDay: { date: string; pnl: number } | null = null;
  let worstDay: { date: string; pnl: number } | null = null;
  if (sortedDays.length > 0) {
    const sorted = [...sortedDays].sort((a, b) => b[1] - a[1]);
    bestDay = { date: sorted[0][0], pnl: sorted[0][1] };
    worstDay = { date: sorted[sorted.length - 1][0], pnl: sorted[sorted.length - 1][1] };
  }

  // Time of day analysis (morning = before 12pm, afternoon = 12pm+)
  const morningTrades = trades.filter((t) => {
    const hour = parseInt(t.exitTime.split(' ')[1].split(':')[0]);
    return hour < MORNING_CUTOFF_HOUR;
  });
  const afternoonTrades = trades.filter((t) => {
    const hour = parseInt(t.exitTime.split(' ')[1].split(':')[0]);
    return hour >= MORNING_CUTOFF_HOUR;
  });

  const morningWins = morningTrades.filter((t) => t.pnl > 0).length;
  const afternoonWins = afternoonTrades.filter((t) => t.pnl > 0).length;
  const morningWinRate = morningTrades.length > 0 ? (morningWins / morningTrades.length) * 100 : 0;
  const afternoonWinRate =
    afternoonTrades.length > 0 ? (afternoonWins / afternoonTrades.length) * 100 : 0;

  return {
    totalPnL,
    winRate,
    avgWin,
    avgLoss,
    profitFactor,
    largestWin,
    largestLoss,
    avgTrade,
    wins: wins.length,
    losses: losses.length,
    streak,
    streakType,
    bestDay,
    worstDay,
    morningWinRate,
    afternoonWinRate,
    morningTrades: morningTrades.length,
    afternoonTrades: afternoonTrades.length,
  };
};

/**
 * Filter trades based on filter state
 * @param trades - Array of trades
 * @param filters - Filter criteria
 * @param selectedDate - Optional date filter from calendar
 * @returns Filtered trades
 */
export const filterTrades = (
  trades: Trade[],
  filters: FilterState,
  selectedDate?: string | null
): Trade[] => {
  let result = trades;

  // Calendar date filter (from dashboard click)
  if (selectedDate) {
    result = result.filter((t) => t.exitTime.startsWith(selectedDate));
  }

  // Date range filter
  if (filters.startDate) {
    result = result.filter((t) => t.exitTime.split(' ')[0] >= filters.startDate!);
  }
  if (filters.endDate) {
    result = result.filter((t) => t.exitTime.split(' ')[0] <= filters.endDate!);
  }

  // Symbol filter
  if (filters.symbol) {
    result = result.filter(
      (t) => t.symbol.split('.').pop()!.replace(/[A-Z]\d+$/, '') === filters.symbol
    );
  }

  // Direction filter
  if (filters.direction) {
    result = result.filter((t) => t.direction === filters.direction);
  }

  // Outcome filter
  if (filters.outcome) {
    if (filters.outcome === 'winners') {
      result = result.filter((t) => t.pnl > 0);
    } else if (filters.outcome === 'losers') {
      result = result.filter((t) => t.pnl < 0);
    }
  }

  // Tag filter
  if (filters.tag) {
    result = result.filter((t) => t.tags && t.tags.includes(filters.tag!));
  }

  // P&L range filter
  if (filters.minPnl) {
    result = result.filter((t) => t.pnl >= parseFloat(filters.minPnl!));
  }
  if (filters.maxPnl) {
    result = result.filter((t) => t.pnl <= parseFloat(filters.maxPnl!));
  }

  return result;
};

/**
 * Group trades by day for calendar visualization
 * @param trades - Array of trades
 * @returns Record of date to CalendarDay
 */
export const groupTradesByDay = (trades: Trade[]): Record<string, CalendarDay> => {
  const tradesByDay: Record<string, CalendarDay> = {};

  trades.forEach((t) => {
    const day = t.exitTime.split(' ')[0];
    if (!tradesByDay[day]) {
      tradesByDay[day] = {
        date: day,
        pnl: 0,
        trades: 0,
        wins: 0,
        losses: 0,
      };
    }
    tradesByDay[day].pnl += t.pnl;
    tradesByDay[day].trades += 1;
    if (t.pnl > 0) {
      tradesByDay[day].wins += 1;
    } else if (t.pnl < 0) {
      tradesByDay[day].losses += 1;
    }
  });

  return tradesByDay;
};

/**
 * Calculate statistics per tag
 * @param trades - Array of trades
 * @returns TagStats object
 */
export const calculateTagStats = (trades: Trade[]): TagStats => {
  const stats: TagStats = {};

  PRESET_TAGS.forEach((tag) => {
    const taggedTrades = trades.filter((t) => t.tags && t.tags.includes(tag.label));
    if (taggedTrades.length === 0) return;

    const wins = taggedTrades.filter((t) => t.pnl > 0);
    const losses = taggedTrades.filter((t) => t.pnl < 0);
    const totalPnL = taggedTrades.reduce((sum, t) => sum + t.pnl, 0);
    const winRate = (wins.length / taggedTrades.length) * 100;
    const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.pnl, 0) / wins.length : 0;
    const avgLoss =
      losses.length > 0 ? Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0) / losses.length) : 0;
    const grossWins = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLosses = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = grossLosses > 0 ? grossWins / grossLosses : grossWins > 0 ? Infinity : 0;

    stats[tag.label] = {
      color: tag.color,
      trades: taggedTrades.length,
      wins: wins.length,
      losses: losses.length,
      winRate,
      totalPnL,
      avgWin,
      avgLoss,
      profitFactor,
    };
  });

  return stats;
};

/**
 * Get cumulative P&L data for chart
 * @param trades - Array of trades (should be sorted by date)
 * @returns Array of { date, cumulativePnL }
 */
export const getCumulativePnL = (
  trades: Trade[]
): Array<{ date: string; cumulativePnL: number }> => {
  const sortedTrades = [...trades].sort(
    (a, b) => new Date(a.exitTime).getTime() - new Date(b.exitTime).getTime()
  );

  let cumulative = 0;
  return sortedTrades.map((trade) => {
    cumulative += trade.pnl;
    return {
      date: trade.exitTime,
      cumulativePnL: cumulative,
    };
  });
};

/**
 * Get unique symbols from trades
 * @param trades - Array of trades
 * @returns Array of unique symbols
 */
export const getUniqueSymbols = (trades: Trade[]): string[] => {
  const symbols = new Set<string>();
  trades.forEach((t) => {
    const cleanSymbol = t.symbol.split('.').pop()!.replace(/[A-Z]\d+$/, '');
    symbols.add(cleanSymbol);
  });
  return Array.from(symbols).sort();
};
