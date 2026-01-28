import { TICK_VALUES } from '../constants';

/**
 * Get the tick value for a given symbol
 * @param symbol - Trading symbol (e.g., "ES-001M", "NQ-001M")
 * @returns Tick value in dollars per point
 */
export const getTickValue = (symbol: string): number => {
  // Micro E-mini S&P 500
  if (symbol.includes('MES')) return TICK_VALUES.MES;

  // E-mini S&P 500
  if (symbol.includes('ES') && !symbol.includes('MES')) return TICK_VALUES.ES;

  // Micro E-mini Nasdaq
  if (symbol.includes('MNQ')) return TICK_VALUES.MNQ;

  // E-mini Nasdaq
  if (symbol.includes('NQ') && !symbol.includes('MNQ')) return TICK_VALUES.NQ;

  // Micro Gold
  if (symbol.includes('MGC')) return TICK_VALUES.MGC;

  // Gold Futures
  if (symbol.includes('GC') && !symbol.includes('MGC')) return TICK_VALUES.GC;

  // Micro Crude Oil
  if (symbol.includes('MCL')) return TICK_VALUES.MCL;

  // Crude Oil
  if (symbol.includes('CL') && !symbol.includes('MCL')) return TICK_VALUES.CL;

  // Micro E-mini Russell
  if (symbol.includes('M2K')) return TICK_VALUES.M2K;

  // E-mini Russell
  if (symbol.includes('RTY')) return TICK_VALUES.RTY;

  // Micro E-mini Dow
  if (symbol.includes('MYM')) return TICK_VALUES.MYM;

  // E-mini Dow
  if (symbol.includes('YM') && !symbol.includes('MYM')) return TICK_VALUES.YM;

  // Default to MES
  return TICK_VALUES.MES;
};

/**
 * Get symbol display name (remove contract month)
 * @param symbol - Trading symbol (e.g., "ES-001M")
 * @returns Clean symbol name (e.g., "ES")
 */
export const getSymbolName = (symbol: string): string => {
  // Remove contract month suffix (e.g., "-001M", "-002M", etc.)
  return symbol.split('-')[0];
};

/**
 * Check if a symbol is a micro contract
 * @param symbol - Trading symbol
 * @returns True if micro contract
 */
export const isMicroContract = (symbol: string): boolean => {
  const microSymbols = ['MES', 'MNQ', 'MGC', 'MCL', 'M2K', 'MYM'];
  return microSymbols.some(micro => symbol.includes(micro));
};
