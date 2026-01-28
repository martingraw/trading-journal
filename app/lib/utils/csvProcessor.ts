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
  // Filter for filled orders only (Market and Limit types that actually executed)
  const rows = csvData.filter((row: any) => {
    const status = row.Status;
    const type = row.Type;
    const fillQty = parseInt(row['Fill Qty']) || 0;

    // Include Market, Limit, Stop Loss, Take Profit, and Stop orders that were filled
    return (
      status === 'Filled' &&
      (type === 'Market' ||
        type === 'Limit' ||
        type === 'Stop Loss' ||
        type === 'Take Profit' ||
        type === 'Stop') &&
      fillQty > 0
    );
  });

  // Sort by Status Time chronologically
  rows.sort((a: any, b: any) => {
    // Parse dates in M/D/YY H:MM format
    const parseDate = (dateStr: string) => {
      const [datePart, timePart] = dateStr.split(' ');
      const [month, day, year] = datePart.split('/');
      const [hour, minute] = timePart.split(':');
      return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)).getTime();
    };
    
    const dateA = parseDate(a['Status Time']);
    const dateB = parseDate(b['Status Time']);
    return dateA - dateB;
  });

  console.log(
    'Processing filled orders:',
    rows.map((r: any) => ({
      side: r.Side,
      type: r.Type,
      price: r['Avg Fill Price'],
      time: r['Status Time'],
    }))
  );

  const trades: Trade[] = [];
  const openPositions: Record<string, any[]> = {};

  rows.forEach((row: any) => {
    // Normalize symbol names - extract just the base symbol
    let symbol = row.Symbol || '';
    
    // Remove everything before the last dot and any contract months
    // "F.US.MNQH26" → "MNQ"
    // "F.US.MESH26" → "MES"
    // "F.US.MGCG26" → "MGC"
    if (symbol.includes('.')) {
      const parts = symbol.split('.');
      symbol = parts[parts.length - 1]; // Get last part after dots
    }
    
    // Remove contract month codes (H26, G26, etc.) - last 3 characters if they match pattern
    if (symbol.length > 3 && /[A-Z]\d{2}$/.test(symbol)) {
      symbol = symbol.slice(0, -3);
    }
    
    const side = row.Side;
    const qty = parseInt(row['Fill Qty']) || parseInt(row.Qty) || 1;
    const price = parseFloat(row['Avg Fill Price']);
    const timeStr = row['Status Time'];
    
    // Convert M/D/YY H:MM to YYYY-MM-DD HH:MM:SS format
    const [datePart, timePart] = timeStr.split(' ');
    const [month, day, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    const fullYear = 2000 + parseInt(year);
    const time = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;

    if (!openPositions[symbol]) {
      openPositions[symbol] = [];
    }

    if (side === 'Buy') {
      // Opening a long position
      openPositions[symbol].push({ type: 'long', price, qty, time });
    } else if (side === 'Sell') {
      // Check if we have an open long position to close
      if (openPositions[symbol].length > 0 && openPositions[symbol][0].type === 'long') {
        const entry = openPositions[symbol].shift();
        const tickValue = getTickValue(symbol);
        const pnl = (price - entry.price) * tickValue * qty;

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
          pnlTicks: (price - entry.price) * 4, // Convert to ticks
          notes: '',
          tags: [],
        });
      } else {
        // Opening a short position
        openPositions[symbol].push({ type: 'short', price, qty, time });
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
