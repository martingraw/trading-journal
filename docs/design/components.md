# Component Specifications

This document defines the TradeLog component library with detailed specifications for each component type, including visual variants, states, and React implementation patterns.

## Table of Contents

- [Buttons](#buttons)
- [Cards](#cards)
- [Forms](#forms)
- [Data Display](#data-display)
- [Navigation](#navigation)
- [Feedback](#feedback)
- [Charts](#charts)
- [Layout](#layout)

---

## Buttons

### Primary Button

The main call-to-action button used for primary actions.

#### Variants

**Default**
```css
.btn-primary {
  padding: var(--space-3) var(--space-6);  /* 12px 24px */
  background: var(--accent-blue);
  color: white;
  border: none;
  border-radius: var(--radius-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: #2563eb;
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Success (Green)**
```css
.btn-success {
  background: var(--accent-green);
  color: var(--bg-primary);
}

.btn-success:hover {
  background: #00d4aa;
}
```

**Danger (Red)**
```css
.btn-danger {
  background: var(--accent-red);
  color: white;
}

.btn-danger:hover {
  background: #ff6b81;
}
```

#### Sizes

```css
.btn-sm {
  padding: var(--space-2) var(--space-4);  /* 8px 16px */
  font-size: var(--text-sm);
}

.btn-md {
  padding: var(--space-3) var(--space-6);  /* 12px 24px */
  font-size: var(--text-base);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);  /* 16px 32px */
  font-size: var(--text-md);
}
```

#### React Implementation

```jsx
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage
<Button variant="success" size="lg" onClick={handleTrade}>
  Execute Trade
</Button>
```

### Secondary Button

Outlined button for secondary actions.

```css
.btn-secondary {
  padding: var(--space-3) var(--space-6);
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--text-secondary);
}
```

### Ghost Button

Minimal button for tertiary actions.

```css
.btn-ghost {
  padding: var(--space-3) var(--space-6);
  background: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: var(--radius-base);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-ghost:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
```

### Icon Button

```css
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-icon:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
```

---

## Cards

### Base Card

Foundation for all card components.

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card-hover:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

#### React Implementation

```jsx
const Card = ({ children, hoverable = false, className = '', ...props }) => {
  return (
    <div
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Stat Card

Display key metrics and statistics.

```css
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
}

.stat-card-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.stat-card-value {
  font-family: var(--font-mono);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.stat-card-change {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.stat-card-change.positive {
  color: var(--accent-green);
}

.stat-card-change.negative {
  color: var(--accent-red);
}
```

#### React Implementation

```jsx
const StatCard = ({ label, value, change, changeType }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${changeType}`}>
          <i className={`fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'}`} />
          {change}
        </div>
      )}
    </div>
  );
};

// Usage
<StatCard
  label="Total Profit"
  value="$12,450.00"
  change="+23.5%"
  changeType="positive"
/>
```

### Trade Card

Specialized card for displaying trade information.

```css
.trade-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  padding: var(--space-5);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.trade-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trade-card-symbol {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.trade-card-type {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
}

.trade-card-type.long {
  background: var(--accent-green-dim);
  color: var(--accent-green);
}

.trade-card-type.short {
  background: var(--accent-red-dim);
  color: var(--accent-red);
}

.trade-card-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.trade-card-metric {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.trade-card-metric-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  text-transform: uppercase;
}

.trade-card-metric-value {
  font-family: var(--font-mono);
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}
```

---

## Forms

### Input Field

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  color: var(--text-primary);
  font-size: var(--text-base);
  font-family: var(--font-sans);
  transition: all var(--transition-base);
}

.input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: var(--text-muted);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### With Label

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.form-help {
  font-size: var(--text-xs);
  color: var(--text-muted);
}
```

#### States

```css
/* Error State */
.input.error {
  border-color: var(--accent-red);
}

.input.error:focus {
  box-shadow: 0 0 0 3px var(--accent-red-dim);
}

.form-error {
  font-size: var(--text-xs);
  color: var(--accent-red);
  margin-top: var(--space-1);
}

/* Success State */
.input.success {
  border-color: var(--accent-green);
}
```

#### React Implementation

```jsx
const Input = ({
  label,
  error,
  help,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <div className="form-error">{error}</div>}
      {help && !error && <div className="form-help">{help}</div>}
    </div>
  );
};
```

### Select Dropdown

```css
.select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  color: var(--text-primary);
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--transition-base);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b9dc3' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
}

.select:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Checkbox

```css
.checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  appearance: none;
  position: relative;
}

.checkbox-input:checked {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
}

.checkbox-input:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
}

.checkbox-label {
  font-size: var(--text-base);
  color: var(--text-primary);
}
```

### Toggle Switch

```css
.toggle {
  position: relative;
  width: 48px;
  height: 24px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-base);
}

.toggle.checked {
  background: var(--accent-blue);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle.checked .toggle-thumb {
  left: 26px;
}
```

---

## Data Display

### Table

```css
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-base);
  border: 1px solid var(--border);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: var(--bg-tertiary);
}

.table th {
  padding: var(--space-4);
  text-align: left;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table td {
  padding: var(--space-4);
  border-top: 1px solid var(--border);
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.table tbody tr {
  transition: background var(--transition-fast);
}

.table tbody tr:hover {
  background: var(--bg-secondary);
}

/* Monospace for data columns */
.table .data-cell {
  font-family: var(--font-mono);
  font-weight: var(--font-medium);
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.badge-success {
  background: var(--accent-green-dim);
  color: var(--accent-green);
}

.badge-danger {
  background: var(--accent-red-dim);
  color: var(--accent-red);
}

.badge-info {
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-blue);
}

.badge-warning {
  background: rgba(251, 191, 36, 0.1);
  color: var(--accent-yellow);
}

.badge-neutral {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}
```

### Pill Tag

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.pill-count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 var(--space-2);
  background: var(--accent-blue);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
}
```

### Progress Bar

```css
.progress {
  width: 100%;
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--accent-blue);
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
}

.progress-bar.success {
  background: var(--gradient-success);
}

.progress-bar.danger {
  background: var(--gradient-danger);
}
```

---

## Navigation

### Sidebar

```css
.sidebar {
  width: 280px;
  height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  gap: var(--space-8);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-base);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all var(--transition-base);
}

.sidebar-link:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.sidebar-link.active {
  background: var(--bg-tertiary);
  color: var(--accent-blue);
}

.sidebar-link-icon {
  width: 20px;
  text-align: center;
}
```

### Tab Navigation

```css
.tabs {
  display: flex;
  gap: var(--space-2);
  border-bottom: 1px solid var(--border);
}

.tab {
  padding: var(--space-3) var(--space-5);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all var(--transition-base);
}

.tab:hover {
  color: var(--text-primary);
}

.tab.active {
  color: var(--accent-blue);
  border-bottom-color: var(--accent-blue);
}
```

---

## Feedback

### Toast Notification

```css
.toast {
  min-width: 300px;
  max-width: 500px;
  padding: var(--space-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: start;
  gap: var(--space-3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-icon {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-icon.success {
  background: var(--accent-green-dim);
  color: var(--accent-green);
}

.toast-icon.error {
  background: var(--accent-red-dim);
  color: var(--accent-red);
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.toast-message {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

### Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
}

.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border);
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}
```

### Loading Spinner

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-tertiary);
  border-top-color: var(--accent-blue);
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-sm {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner-lg {
  width: 60px;
  height: 60px;
  border-width: 4px;
}
```

---

## Charts

### Chart Container

```css
.chart-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-base);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.chart-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.chart-subtitle {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-1);
}
```

### Chart.js Theme Configuration

```javascript
const chartTheme = {
  defaultFontFamily: "'Inter', sans-serif",
  defaultFontSize: 12,
  defaultFontColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--text-secondary').trim(),

  colors: {
    green: '#00ffa3',
    red: '#ff4757',
    blue: '#3b82f6',
    purple: '#a855f7',
    yellow: '#fbbf24',
  },

  gridColor: getComputedStyle(document.documentElement)
    .getPropertyValue('--border').trim(),
};
```

---

## Layout

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 1024px) {
  .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-cols-4,
  .grid-cols-3,
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
```

### Container

```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.container-fluid {
  width: 100%;
  padding: 0 var(--space-6);
}
```

### Stack (Vertical Spacing)

```css
.stack {
  display: flex;
  flex-direction: column;
}

.stack > * + * {
  margin-top: var(--space-4);
}

.stack-sm > * + * { margin-top: var(--space-2); }
.stack-md > * + * { margin-top: var(--space-4); }
.stack-lg > * + * { margin-top: var(--space-6); }
.stack-xl > * + * { margin-top: var(--space-8); }
```

---

**Last Updated**: January 2026
