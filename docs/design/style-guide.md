# Style Guide

This guide provides practical guidelines for implementing TradeLog's design system. Follow these patterns to maintain consistency, accessibility, and quality across the application.

## Table of Contents

- [Color Usage](#color-usage)
- [Typography Guidelines](#typography-guidelines)
- [Spacing & Layout](#spacing--layout)
- [Component Patterns](#component-patterns)
- [Data Visualization](#data-visualization)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Code Examples](#code-examples)

---

## Color Usage

### Financial Data Colors

Always use semantic colors for financial data to maintain consistency:

#### DO ✓

```jsx
// Profit/Loss indication
<span className="profit">+$1,250.50</span>
<span className="loss">-$430.25</span>

// Position types
<Badge variant="success">LONG</Badge>
<Badge variant="danger">SHORT</Badge>

// With inline styles when needed
<div style={{ color: 'var(--accent-green)' }}>+5.2%</div>
```

#### DON'T ✗

```jsx
// Don't use arbitrary colors
<span style={{ color: '#00ff00' }}>+$1,250.50</span>

// Don't reverse the color semantics
<span className="loss">+$1,250.50</span>  // Wrong!
```

### Background Colors

Use the appropriate background token for hierarchy:

```jsx
// Page background
<div style={{ background: 'var(--bg-primary)' }}>

// Cards and panels
<div style={{ background: 'var(--bg-card)' }}>

// Nested surfaces
<div style={{ background: 'var(--bg-secondary)' }}>

// Interactive hover states
<div style={{ background: 'var(--bg-tertiary)' }}>
```

### Color Contrast

Ensure proper contrast ratios for accessibility:

- **Large text** (≥18px): Minimum 3:1 contrast ratio
- **Normal text** (<18px): Minimum 4.5:1 contrast ratio
- **Interactive elements**: Minimum 3:1 against adjacent colors

Use browser DevTools or contrast checkers to verify:

```javascript
// Check contrast programmatically
const checkContrast = (fg, bg) => {
  // Implementation using WCAG formulas
  // Returns ratio like 4.5:1
};
```

---

## Typography Guidelines

### Type Scale Application

Match typography to content hierarchy:

```jsx
// Page titles
<h1 className="heading-1">Trading Dashboard</h1>

// Section headers
<h2 className="heading-2">Recent Trades</h2>

// Card titles
<h3 className="heading-3">Account Balance</h3>

// Body text
<p className="body">Your trading journal for systematic analysis</p>

// Small descriptions
<p className="body-small">Last updated 5 minutes ago</p>
```

### Monospace for Data

Always use monospace font for numerical data, prices, and timestamps:

#### DO ✓

```jsx
// Financial data
<span className="mono">$12,450.50</span>

// Percentages
<span className="mono">+23.5%</span>

// Account numbers
<span className="mono">****8192</span>

// Timestamps
<span className="mono">14:30:25</span>
```

#### DON'T ✗

```jsx
// Don't use sans-serif for financial data
<span>$12,450.50</span>  // Harder to scan

// Don't use monospace for labels or descriptions
<label className="mono">Account Balance</label>  // Wrong font choice
```

### Font Weight Hierarchy

Use consistent font weights:

```css
/* Headings: Bold (700) or Extrabold (800) */
.heading { font-weight: var(--font-bold); }

/* Emphasized text: Semibold (600) */
.emphasized { font-weight: var(--font-semibold); }

/* Body text: Normal (400) */
.body { font-weight: var(--font-normal); }

/* De-emphasized text: Normal (400) with muted color */
.muted {
  font-weight: var(--font-normal);
  color: var(--text-muted);
}
```

### Line Length

Maintain optimal line lengths for readability:

- **Body text**: 50-75 characters per line (optimal: 66)
- **Wide content**: Up to 90 characters
- **Narrow sidebars**: 40-50 characters

```css
.readable-content {
  max-width: 65ch;  /* 65 characters */
}
```

---

## Spacing & Layout

### Consistent Spacing

Use the spacing scale consistently:

```jsx
// Component internal padding
<div style={{ padding: 'var(--space-6)' }}>  // 24px

// Spacing between related elements
<div style={{ marginBottom: 'var(--space-4)' }}>  // 16px

// Spacing between sections
<div style={{ marginTop: 'var(--space-8)' }}>  // 32px
```

### Grid Layouts

Use CSS Grid for card layouts:

```jsx
// Dashboard grid
<div className="grid grid-cols-3">
  <StatCard />
  <StatCard />
  <StatCard />
</div>

// Custom gaps
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--space-6)'
}}>
  {/* Cards */}
</div>
```

### Responsive Breakpoints

Follow mobile-first approach:

```css
/* Mobile first (default) */
.card {
  padding: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    padding: var(--space-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card {
    padding: var(--space-8);
  }
}
```

---

## Component Patterns

### Card Composition

Build consistent card layouts:

```jsx
const TradeCard = ({ trade }) => {
  return (
    <div className="card">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 className="heading-4">{trade.symbol}</h3>
        <Badge variant={trade.type === 'long' ? 'success' : 'danger'}>
          {trade.type}
        </Badge>
      </div>

      {/* Body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-4)'
      }}>
        <div>
          <div className="label">Entry Price</div>
          <div className="mono">${trade.entry}</div>
        </div>
        <div>
          <div className="label">P&L</div>
          <div className={`mono ${trade.pnl > 0 ? 'profit' : 'loss'}`}>
            {trade.pnl > 0 ? '+' : ''}{trade.pnl}%
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Loading States

Show loading states for async operations:

```jsx
const DataTable = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px'
      }}>
        <Spinner />
      </div>
    );
  }

  return <Table data={data} />;
};
```

### Empty States

Provide helpful empty states:

```jsx
const EmptyState = ({ title, description, action }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: 'var(--space-8)',
      textAlign: 'center'
    }}>
      <i className="fas fa-inbox fa-3x" style={{
        color: 'var(--text-muted)',
        marginBottom: 'var(--space-6)'
      }} />
      <h3 className="heading-3">{title}</h3>
      <p className="body" style={{
        color: 'var(--text-secondary)',
        marginTop: 'var(--space-2)',
        marginBottom: 'var(--space-6)'
      }}>
        {description}
      </p>
      {action && <Button>{action}</Button>}
    </div>
  );
};

// Usage
<EmptyState
  title="No trades yet"
  description="Start your trading journey by logging your first trade"
  action="Add Trade"
/>
```

### Error States

Display errors clearly:

```jsx
const ErrorState = ({ error, onRetry }) => {
  return (
    <div style={{
      padding: 'var(--space-6)',
      background: 'var(--accent-red-dim)',
      border: '1px solid var(--accent-red)',
      borderRadius: 'var(--radius-base)',
      display: 'flex',
      alignItems: 'start',
      gap: 'var(--space-4)'
    }}>
      <i className="fas fa-exclamation-circle" style={{
        color: 'var(--accent-red)',
        fontSize: '24px'
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontWeight: 'var(--font-semibold)',
          color: 'var(--accent-red)',
          marginBottom: 'var(--space-2)'
        }}>
          Error Loading Data
        </div>
        <div className="body-small" style={{
          color: 'var(--text-secondary)'
        }}>
          {error.message}
        </div>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};
```

---

## Data Visualization

### Chart Configuration

Configure Chart.js with consistent theming:

```javascript
const createChartConfig = (type, data, options = {}) => {
  const theme = document.documentElement.getAttribute('data-theme');
  const isDark = theme !== 'light';

  return {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: isDark ? '#8b9dc3' : '#475569',
            font: {
              family: 'Inter',
              size: 12,
              weight: '500'
            },
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1e2130' : '#ffffff',
          titleColor: isDark ? '#f0f4ff' : '#0f172a',
          bodyColor: isDark ? '#8b9dc3' : '#475569',
          borderColor: isDark ? '#2d3142' : '#e2e8f0',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 14,
            weight: '600'
          },
          bodyFont: {
            size: 13,
            weight: '400'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: isDark ? '#2d3142' : '#e2e8f0',
            drawBorder: false
          },
          ticks: {
            color: isDark ? '#5a6b8f' : '#94a3b8',
            font: {
              size: 11
            }
          }
        },
        y: {
          grid: {
            color: isDark ? '#2d3142' : '#e2e8f0',
            drawBorder: false
          },
          ticks: {
            color: isDark ? '#5a6b8f' : '#94a3b8',
            font: {
              size: 11
            }
          }
        }
      },
      ...options
    }
  };
};
```

### Profit/Loss Chart

```javascript
const createPnLChart = (ctx, data) => {
  return new Chart(ctx, createChartConfig('line', {
    labels: data.labels,
    datasets: [{
      label: 'P&L',
      data: data.values,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    }]
  }, {
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  }));
};
```

### Color-Coded Data

Use consistent colors for different data types:

```javascript
const datasetColors = {
  profit: {
    border: '#00ffa3',
    background: 'rgba(0, 255, 163, 0.1)'
  },
  loss: {
    border: '#ff4757',
    background: 'rgba(255, 71, 87, 0.1)'
  },
  neutral: {
    border: '#3b82f6',
    background: 'rgba(59, 130, 246, 0.1)'
  },
  volume: {
    border: '#a855f7',
    background: 'rgba(168, 85, 247, 0.1)'
  }
};
```

---

## Accessibility

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```jsx
// Custom interactive component
const InteractiveCard = ({ onClick, children }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e);
        }
      }}
      style={{
        cursor: 'pointer',
        outline: 'none'
      }}
      className="card-interactive"
    >
      {children}
    </div>
  );
};
```

### Focus Indicators

Always show focus states:

```css
.interactive-element:focus {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}

/* Or custom focus ring */
.button:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
```

### ARIA Labels

Use appropriate ARIA attributes:

```jsx
// Icon buttons
<button aria-label="Close modal">
  <i className="fas fa-times" aria-hidden="true" />
</button>

// Status indicators
<span className="badge" role="status" aria-live="polite">
  Processing
</span>

// Loading states
<div role="alert" aria-busy="true">
  <Spinner aria-label="Loading data" />
</div>
```

### Screen Reader Support

Provide meaningful content for screen readers:

```jsx
// Hidden text for screen readers
<span className="sr-only">
  Current profit: $12,450 dollars
</span>
<span className="mono" aria-hidden="true">
  $12,450
</span>

// CSS for sr-only
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Color Independence

Never rely solely on color to convey information:

#### DO ✓

```jsx
// Use icons + color
<div className="profit">
  <i className="fas fa-arrow-up" /> +$1,250
</div>

// Use text + color
<Badge variant="success">
  <i className="fas fa-check" /> Completed
</Badge>
```

#### DON'T ✗

```jsx
// Color only
<div className="profit">$1,250</div>  // Missing indicator
```

---

## Performance

### Optimize Renders

Use React optimization techniques:

```jsx
// Memoize expensive components
const TradeCard = React.memo(({ trade }) => {
  return (
    <div className="card">
      {/* Component content */}
    </div>
  );
});

// Memoize expensive calculations
const TradingStats = ({ trades }) => {
  const totalProfit = useMemo(() => {
    return trades.reduce((sum, trade) => sum + trade.pnl, 0);
  }, [trades]);

  return <div className="mono">${totalProfit.toFixed(2)}</div>;
};
```

### Lazy Load Components

```jsx
// Code splitting for routes
const Dashboard = React.lazy(() => import('./Dashboard'));
const Analytics = React.lazy(() => import('./Analytics'));

// Usage with Suspense
<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/analytics" element={<Analytics />} />
  </Routes>
</Suspense>
```

### Debounce Search

```jsx
const SearchInput = () => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((value) => {
      // Perform search
      console.log('Searching for:', value);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search trades..."
      className="input"
    />
  );
};
```

---

## Code Examples

### Complete Dashboard Card

```jsx
const DashboardCard = ({ title, value, change, changeType, icon }) => {
  const { useState } = React;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'all var(--transition-base)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-md)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: 'var(--space-4)'
      }}>
        <div className="label">{title}</div>
        {icon && (
          <i className={`fas fa-${icon}`} style={{
            color: 'var(--accent-blue)',
            fontSize: '20px'
          }} />
        )}
      </div>

      <div className="mono" style={{
        fontSize: 'var(--text-4xl)',
        fontWeight: 'var(--font-bold)',
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)'
      }}>
        {value}
      </div>

      {change && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-medium)',
          color: changeType === 'positive' ? 'var(--accent-green)' : 'var(--accent-red)'
        }}>
          <i className={`fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'}`} />
          {change}
        </div>
      )}
    </div>
  );
};

// Usage
<DashboardCard
  title="Total Profit"
  value="$12,450.50"
  change="+23.5%"
  changeType="positive"
  icon="chart-line"
/>
```

### Theme Toggle

```jsx
const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'dark'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Save preference
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      className="btn-icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} />
    </button>
  );
};
```

### Responsive Data Table

```jsx
const TradesTable = ({ trades }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Type</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>P&L</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>
                <span style={{
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--text-primary)'
                }}>
                  {trade.symbol}
                </span>
              </td>
              <td>
                <span className={`badge badge-${trade.type === 'long' ? 'success' : 'danger'}`}>
                  {trade.type}
                </span>
              </td>
              <td className="data-cell">${trade.entry}</td>
              <td className="data-cell">${trade.exit}</td>
              <td className={`data-cell ${trade.pnl > 0 ? 'profit' : 'loss'}`}>
                {trade.pnl > 0 ? '+' : ''}{trade.pnl}%
              </td>
              <td className="data-cell">
                {new Date(trade.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## Best Practices Summary

### DO ✓

- Use design tokens for all styling
- Test in both dark and light themes
- Verify keyboard navigation works
- Check color contrast ratios
- Use monospace for financial data
- Provide loading and error states
- Optimize re-renders with React.memo
- Use semantic HTML elements
- Add ARIA labels where needed
- Test on multiple screen sizes

### DON'T ✗

- Hard-code colors or spacing values
- Rely solely on color for meaning
- Forget hover/focus states
- Use arbitrary font sizes
- Skip empty states
- Ignore loading states
- Over-animate (keep it subtle)
- Use vague button labels ("Click here")
- Forget mobile responsiveness
- Skip error handling

---

## Resources

- [Design Tokens Reference](design-tokens.md)
- [Component Specifications](components.md)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [React Accessibility](https://react.dev/learn/accessibility)

---

**Last Updated**: January 2026
