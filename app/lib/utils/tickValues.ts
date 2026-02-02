import { TICK_VALUES } from '../constants';

/**
 * Get the tick value for a given symbol
 * @param symbol - Trading symbol (e.g., "ES", "NQ", "MES", "MNQ")
 * @returns Tick value in dollars per point
 */
export const getTickValue = (symbol: string): number => {
  // Normalize symbol to uppercase for matching
  const normalizedSymbol = symbol.toUpperCase();
  
  // Direct match first (for exact symbol matches)
  if (TICK_VALUES[normalizedSymbol]) {
    return TICK_VALUES[normalizedSymbol];
  }
  
  // Pattern matching for symbols that might have suffixes
  // Check micro contracts first (more specific)
  if (normalizedSymbol.includes('MES')) return TICK_VALUES.MES;
  if (normalizedSymbol.includes('MNQ')) return TICK_VALUES.MNQ;
  if (normalizedSymbol.includes('MYM')) return TICK_VALUES.MYM;
  if (normalizedSymbol.includes('M2K')) return TICK_VALUES.M2K;
  if (normalizedSymbol.includes('M1OZ')) return TICK_VALUES.M1OZ;
  if (normalizedSymbol.includes('MGC')) return TICK_VALUES.MGC;
  if (normalizedSymbol.includes('MCL')) return TICK_VALUES.MCL;
  if (normalizedSymbol.includes('MHG')) return TICK_VALUES.MHG;
  if (normalizedSymbol.includes('MNG')) return TICK_VALUES.MNG;
  if (normalizedSymbol.includes('M6A')) return TICK_VALUES.M6A;
  if (normalizedSymbol.includes('M6B')) return TICK_VALUES.M6B;
  if (normalizedSymbol.includes('MCD')) return TICK_VALUES.MCD;
  if (normalizedSymbol.includes('M6E')) return TICK_VALUES.M6E;
  if (normalizedSymbol.includes('MJY')) return TICK_VALUES.MJY;
  if (normalizedSymbol.includes('MSF')) return TICK_VALUES.MSF;
  if (normalizedSymbol.includes('MNK')) return TICK_VALUES.MNK;
  if (normalizedSymbol.includes('MWN')) return TICK_VALUES.MWN;
  if (normalizedSymbol.includes('MTN')) return TICK_VALUES.MTN;
  if (normalizedSymbol.includes('MZC')) return TICK_VALUES.MZC;
  if (normalizedSymbol.includes('MZW')) return TICK_VALUES.MZW;
  if (normalizedSymbol.includes('MZS')) return TICK_VALUES.MZS;
  if (normalizedSymbol.includes('MZL')) return TICK_VALUES.MZL;
  if (normalizedSymbol.includes('MZM')) return TICK_VALUES.MZM;
  
  // Then check regular contracts
  if (normalizedSymbol.includes('ES') && !normalizedSymbol.includes('MES')) return TICK_VALUES.ES;
  if (normalizedSymbol.includes('NQ') && !normalizedSymbol.includes('MNQ')) return TICK_VALUES.NQ;
  if (normalizedSymbol.includes('YM') && !normalizedSymbol.includes('MYM')) return TICK_VALUES.YM;
  if (normalizedSymbol.includes('RTY')) return TICK_VALUES.RTY;
  if (normalizedSymbol.includes('GC') && !normalizedSymbol.includes('MGC')) return TICK_VALUES.GC;
  if (normalizedSymbol.includes('CL') && !normalizedSymbol.includes('MCL')) return TICK_VALUES.CL;
  if (normalizedSymbol.includes('NG') && !normalizedSymbol.includes('MNG')) return TICK_VALUES.NG;
  if (normalizedSymbol.includes('HG') && !normalizedSymbol.includes('MHG')) return TICK_VALUES.HG;
  if (normalizedSymbol.includes('SI') && !normalizedSymbol.includes('SIL')) return TICK_VALUES.SI;
  if (normalizedSymbol.includes('ZC')) return TICK_VALUES.ZC;
  if (normalizedSymbol.includes('ZW')) return TICK_VALUES.ZW;
  if (normalizedSymbol.includes('ZS')) return TICK_VALUES.ZS;
  if (normalizedSymbol.includes('ZL')) return TICK_VALUES.ZL;
  if (normalizedSymbol.includes('ZM')) return TICK_VALUES.ZM;
  if (normalizedSymbol.includes('ZN')) return TICK_VALUES.ZN;
  if (normalizedSymbol.includes('ZB')) return TICK_VALUES.ZB;
  if (normalizedSymbol.includes('ZF')) return TICK_VALUES.ZF;
  if (normalizedSymbol.includes('ZT')) return TICK_VALUES.ZT;
  
  // Default to MES if no match found
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
