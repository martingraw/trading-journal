/**
 * Format a number as currency with + or - sign
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string (e.g., "+$1,234.56" or "-$432.10")
 */
export const formatCurrency = (value: number | string, decimals: number = 2): string => {
  const num = parseFloat(value as string) || 0;
  const sign = num >= 0 ? '+' : '-';
  const formatted = Math.abs(num).toFixed(decimals);

  // Add comma separators
  const [integer, decimal] = formatted.split('.');
  const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${sign}$${withCommas}${decimal ? `.${decimal}` : ''}`;
};

/**
 * Format a date string to readable format
 * @param dateStr - ISO date string
 * @returns Formatted date (e.g., "Jan 15, 2025")
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format a date string to short format for charts
 * @param dateStr - ISO date string
 * @returns Formatted date (e.g., "Jan 26")
 */
export const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a date string to time only
 * @param dateStr - ISO date string
 * @returns Formatted time (e.g., "02:30 PM")
 */
export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format a date string to YYYY-MM-DD format for input fields
 * @param dateStr - ISO date string
 * @returns Date string in YYYY-MM-DD format
 */
export const formatDateForInput = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format a percentage value
 * @param value - Percentage as decimal (e.g., 0.65 for 65%)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string (e.g., "65.0%")
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format a number with thousand separators
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string (e.g., "1,234.56")
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param dateStr - ISO date string
 * @returns Relative time string
 */
export const getRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return formatDate(dateStr);
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};
