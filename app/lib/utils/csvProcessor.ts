import Papa from 'papaparse';
import { Trade, CSVRow, ProcessedCSVResult } from '../types';
import { getTickValue } from './tickValues';

/**
 * Process CSV data from TradingView and convert to trades
 * @param csvData - Parsed CSV rows
 * @param existingTrades - Existing trades to merge with
 * @returns Processed trades with new ones merged in
 */
export const processCSV = (csvData: any[], existingTrades: Trade[] = []): Trade[] => {
  // Get all filled orders
  const allOrders = csvData.filter((row: any) => {
    const status = row.Status;
    const fillQty = parseInt(row['Fill Qty']) || 0;
    return status === 'Filled' && fillQty > 0;
  });

  // Sort ALL orders by Status Time chronologically
  allOrders.sort((a: any, b: any) => {
    // Parse dates - handle both formats: M/D/YY H:MM and YYYY-MM-DD HH:MM:SS
    const parseDate = (dateStr: string) => {
      if (dateStr.includes('/')) {
        // M/D/YY H:MM format
        const [datePart, timePart] = dateStr.split(' ');
        const [month, day, year] = datePart.split('/');
        const [hour, minute] = timePart.split(':');
        return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)).getTime();
      } else {
        // YYYY-MM-DD HH:MM:SS format
        return new Date(dateStr).getTime();
      }
    };
    
    const dateA = parseDate(a['Status Time']);
    const dateB = parseDate(b['Status Time']);
    return dateA - dateB;
  });

  console.log(
    'Processing filled orders:',
    allOrders.map((r: any) => ({
      side: r.Side,
      type: r.Type,
      price: r['Avg Fill Price'],
      time: r['Status Time'],
    }))
  );

  const trades: Trade[] = [];
  const openPositions: Record<string, any[]> = {};

  allOrders.forEach((row: any) => {
    // Normalize symbol names - extract just the base symbol
    let symbol = row.Symbol || '';
    
    // Remove everything before the last dot and any contract months
    // "F.US.MNQH26" → "MNQ"
    // "F.US.MESH26" → "MES"
    // "F.US.MGCG26" → "MGC"
    // "F.US.M1OZJ26" → "M1OZ"
    if (symbol.includes('.')) {
      const parts = symbol.split('.');
      symbol = parts[parts.length - 1]; // Get last part after dots
    }
    
    // Remove contract month codes (H26, G26, J26, etc.) - last 3 characters if they match pattern
    // BUT preserve symbols like M1OZ (don't remove the "J26" part incorrectly)
    if (symbol.length > 3 && /[A-Z]\d{2}$/.test(symbol)) {
      symbol = symbol.slice(0, -3);
    }
    
    const originalSymbol = row.Symbol;
    console.log('Processed symbol:', symbol, 'from original:', originalSymbol, 'tick value:', getTickValue(symbol));
    
    const side = row.Side;
    const orderType = row.Type;
    const qty = parseInt(row['Fill Qty']) || parseInt(row.Qty) || 1;
    const price = parseFloat(row['Avg Fill Price']);
    const timeStr = row['Status Time'];
    
    // Convert time to YYYY-MM-DD HH:MM:SS format - handle both formats
    let time: string;
    if (timeStr.includes('/')) {
      // M/D/YY H:MM format
      const [datePart, timePart] = timeStr.split(' ');
      const [month, day, year] = datePart.split('/');
      const [hour, minute] = timePart.split(':');
      const fullYear = 2000 + parseInt(year);
      time = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
    } else {
      // Already in YYYY-MM-DD HH:MM:SS format
      time = timeStr;
    }

    if (!openPositions[symbol]) {
      openPositions[symbol] = [];
    }

    if (side === 'Buy') {
      // Check if we have an open short position to close
      if (openPositions[symbol].length > 0 && openPositions[symbol][0].type === 'short') {
        const entry = openPositions[symbol].shift();
        const tickValue = getTickValue(symbol);
        const priceDiff = entry.price - price;
        
        // Check if this is a forex pair - prices are in decimal format like 1.1829 or 0.7044
        // Micro forex: M6E, M6A, M6B, MCD, MJY, MSF
        // Standard forex: 6A (DA6), 6E, 6B, 6C, 6J, 6N, 6S, E7, J7
        const isForex = symbol.startsWith('M6') || symbol.startsWith('MCD') || symbol.startsWith('MJY') || symbol.startsWith('MSF') ||
                        symbol.startsWith('6A') || symbol.startsWith('6E') || symbol.startsWith('6B') || symbol.startsWith('6C') ||
                        symbol.startsWith('6J') || symbol.startsWith('6N') || symbol.startsWith('6S') || symbol.startsWith('E7') || 
                        symbol.startsWith('J7') || symbol.startsWith('DA6') || symbol.startsWith('EU6') || symbol.startsWith('BP6') ||
                        symbol.startsWith('CA6') || symbol.startsWith('JY6') || symbol.startsWith('NE6') || symbol.startsWith('SF6') ||
                        symbol.startsWith('EEU') || symbol.startsWith('EJY');
        
        // For forex: priceDiff is in decimal (e.g., 0.0011), multiply by 10000 to get pips (11 pips)
        // Then multiply by tick value per pip and quantity
        const pnl = isForex ? priceDiff * 10000 * tickValue * qty : priceDiff * tickValue * qty;
        
        console.log('Trade calculation:', {
          symbol,
          isForex,
          priceDiff,
          tickValue,
          qty,
          pnl,
          formula: isForex ? `${priceDiff} * 10000 * ${tickValue} * ${qty} = ${pnl}` : `${priceDiff} * ${tickValue} * ${qty} = ${pnl}`
        });

        trades.push({
          id: `${entry.time}-${time}`,
          symbol,
          direction: 'Short',
          entryPrice: entry.price,
          exitPrice: price,
          entryTime: entry.time,
          exitTime: time,
          qty,
          pnl,
          pnlTicks: isForex ? priceDiff * 10000 : priceDiff * 4, // Convert to pips for forex, ticks for futures
          notes: '',
          tags: [],
        });
      } else {
        // Opening a long position
        openPositions[symbol].push({ type: 'long', price, qty, time, orderType });
      }
    } else if (side === 'Sell') {
      // Check if we have an open long position to close
      if (openPositions[symbol].length > 0 && openPositions[symbol][0].type === 'long') {
        const entry = openPositions[symbol].shift();
        const tickValue = getTickValue(symbol);
        const priceDiff = price - entry.price;
        
        // Check if this is a forex pair - prices are in decimal format like 1.1829 or 0.7044
        // Micro forex: M6E, M6A, M6B, MCD, MJY, MSF
        // Standard forex: 6A (DA6), 6E, 6B, 6C, 6J, 6N, 6S, E7, J7
        const isForex = symbol.startsWith('M6') || symbol.startsWith('MCD') || symbol.startsWith('MJY') || symbol.startsWith('MSF') ||
                        symbol.startsWith('6A') || symbol.startsWith('6E') || symbol.startsWith('6B') || symbol.startsWith('6C') ||
                        symbol.startsWith('6J') || symbol.startsWith('6N') || symbol.startsWith('6S') || symbol.startsWith('E7') || 
                        symbol.startsWith('J7') || symbol.startsWith('DA6') || symbol.startsWith('EU6') || symbol.startsWith('BP6') ||
                        symbol.startsWith('CA6') || symbol.startsWith('JY6') || symbol.startsWith('NE6') || symbol.startsWith('SF6') ||
                        symbol.startsWith('EEU') || symbol.startsWith('EJY');
        
        // For forex: priceDiff is in decimal (e.g., 0.0011), multiply by 10000 to get pips (11 pips)
        // Then multiply by tick value per pip and quantity
        const pnl = isForex ? priceDiff * 10000 * tickValue * qty : priceDiff * tickValue * qty;
        
        console.log('Trade calculation:', {
          symbol,
          isForex,
          priceDiff,
          tickValue,
          qty,
          pnl,
          formula: isForex ? `${priceDiff} * 10000 * ${tickValue} * ${qty} = ${pnl}` : `${priceDiff} * ${tickValue} * ${qty} = ${pnl}`
        });

        trades.push({
          id: `${entry.time}-${time}`,
          symbol,
          direction: 'Long',
          entryPrice: entry.price,
          exitPrice: price,
          entryTime: entry.time,
          exitTime: time,
          qty,
          pnl,
          pnlTicks: isForex ? priceDiff * 10000 : priceDiff * 4, // Convert to pips for forex, ticks for futures
          notes: '',
          tags: [],
        });
      } else {
        // Opening a short position
        openPositions[symbol].push({ type: 'short', price, qty, time, orderType });
      }
    }
  });

  console.log('Trades found:', trades);

  // Merge with existing trades (avoid duplicates by ID)
  const existingIds = new Set(existingTrades.map((t) => t.id));
  const newTrades = trades.filter((t) => !existingIds.has(t.id));

  // Also preserve notes and tags from existing trades
  const existingTradesMap: Record<string, Trade> = {};
  existingTrades.forEach((t) => {
    existingTradesMap[t.id] = t;
  });

  const mergedNewTrades = newTrades.map((t) => ({
    ...t,
    notes: existingTradesMap[t.id]?.notes || '',
    tags: existingTradesMap[t.id]?.tags || [],
  }));

  // Combine and sort by exit time (most recent first)
  return [...existingTrades, ...mergedNewTrades].sort((a, b) => {
    const dateA = new Date(b.exitTime).getTime();
    const dateB = new Date(a.exitTime).getTime();
    return dateA - dateB;
  });
};

/**
 * Parse CSV file and process trades
 * @param file - CSV file to parse
 * @param existingTrades - Existing trades to merge with
 * @returns Promise with processed result
 */
export const parseCSVFile = (
  file: File,
  existingTrades: Trade[] = []
): Promise<ProcessedCSVResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const beforeCount = existingTrades.length;
          const processedTrades = processCSV(results.data, existingTrades);
          const afterCount = processedTrades.length;
          const newTradesCount = afterCount - beforeCount;

          resolve({
            trades: processedTrades,
            errors: results.errors.map((e) => e.message),
            duplicates: results.data.length - newTradesCount,
          });
        } catch (error) {
          reject(error);
        }
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};

/**
 * Parse CSV text string
 * @param csvText - CSV text content
 * @param existingTrades - Existing trades to merge with
 * @returns Promise with processed result
 */
export const parseCSVText = (
  csvText: string,
  existingTrades: Trade[] = []
): Promise<ProcessedCSVResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const beforeCount = existingTrades.length;
          const processedTrades = processCSV(results.data, existingTrades);
          const afterCount = processedTrades.length;
          const newTradesCount = afterCount - beforeCount;

          resolve({
            trades: processedTrades,
            errors: results.errors.map((e) => e.message),
            duplicates: results.data.length - newTradesCount,
          });
        } catch (error) {
          reject(error);
        }
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};

/**
 * Validate CSV file
 * @param file - File to validate
 * @returns True if valid CSV file
 */
export const validateCSVFile = (file: File): boolean => {
  const validTypes = ['text/csv', 'application/vnd.ms-excel', 'text/plain'];
  const validExtensions = ['.csv', '.txt'];

  const hasValidType = validTypes.includes(file.type);
  const hasValidExtension = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

  return hasValidType || hasValidExtension;
};
