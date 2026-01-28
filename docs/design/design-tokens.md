# Design Tokens

Design tokens are the atomic design decisions that make up the TradeLog visual language. All tokens are implemented as CSS custom properties for easy theming and maintenance.

## Table of Contents

- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing](#spacing)
- [Elevation & Shadows](#elevation--shadows)
- [Border Radius](#border-radius)
- [Transitions](#transitions)
- [Effects](#effects)
- [Layout](#layout)

---

## Color Palette

### Base Colors

#### Dark Theme (Default)

```css
--bg-primary: #0f1117      /* Main app background */
--bg-secondary: #1a1d2e    /* Secondary surfaces */
--bg-tertiary: #22263a     /* Tertiary surfaces */
--bg-card: #1e2130         /* Card backgrounds */
--border: #2d3142          /* Border color */
```

#### Light Theme

```css
--bg-primary: #f8fafc      /* Main app background */
--bg-secondary: #ffffff    /* Secondary surfaces */
--bg-tertiary: #f1f5f9     /* Tertiary surfaces */
--bg-card: #ffffff         /* Card backgrounds */
--border: #e2e8f0          /* Border color */
```

### Text Colors

#### Dark Theme

```css
--text-primary: #f0f4ff    /* Primary text, headings */
--text-secondary: #8b9dc3  /* Secondary text, labels */
--text-muted: #5a6b8f      /* Muted text, placeholders */
```

#### Light Theme

```css
--text-primary: #0f172a    /* Primary text, headings */
--text-secondary: #475569  /* Secondary text, labels */
--text-muted: #94a3b8      /* Muted text, placeholders */
```

### Accent Colors

Consistent across both themes with adjustments for contrast:

#### Dark Theme Accents

```css
--accent-green: #00ffa3           /* Success, profit, long positions */
--accent-green-dim: rgba(0, 255, 163, 0.12)  /* Green backgrounds */
--accent-red: #ff4757             /* Error, loss, short positions */
--accent-red-dim: rgba(255, 71, 87, 0.12)    /* Red backgrounds */
--accent-blue: #3b82f6            /* Info, primary actions */
--accent-purple: #a855f7          /* Secondary actions, premium */
--accent-yellow: #fbbf24          /* Warning, pending states */
```

#### Light Theme Accents

```css
--accent-green: #10b981           /* Success, profit, long positions */
--accent-green-dim: rgba(16, 185, 129, 0.1)
--accent-red: #ef4444             /* Error, loss, short positions */
--accent-red-dim: rgba(239, 68, 68, 0.1)
--accent-blue: #3b82f6            /* Info, primary actions */
--accent-purple: #a855f7          /* Secondary actions, premium */
--accent-yellow: #f59e0b          /* Warning, pending states */
```

### Semantic Colors

Trading-specific semantic colors:

```css
/* Profit/Loss */
.profit { color: var(--accent-green); }
.loss { color: var(--accent-red); }

/* Position Types */
.long-position { color: var(--accent-green); }
.short-position { color: var(--accent-red); }

/* Trade Status */
.status-open { color: var(--accent-blue); }
.status-closed { color: var(--text-muted); }
.status-pending { color: var(--accent-yellow); }
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-success: linear-gradient(135deg, #00ffa3 0%, #00d4aa 100%)
--gradient-danger: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%)
--gradient-info: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)
```

Usage example:

```css
.premium-card {
  background: var(--gradient-primary);
}
```

### Color Usage Guidelines

| Color | Use For | Don't Use For |
|-------|---------|---------------|
| Green | Profits, gains, long positions, success states | Warnings, neutral actions |
| Red | Losses, declines, short positions, errors | Success states, info |
| Blue | Primary actions, links, neutral info | Profit/loss indicators |
| Purple | Premium features, secondary actions | Primary actions, critical data |
| Yellow | Warnings, pending states, highlights | Success or error states |

---

## Typography

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-mono: 'JetBrains Mono', 'Courier New', monospace
```

### Font Sizes

```css
--text-xs: 11px      /* Small labels, captions */
--text-sm: 12px      /* Small text, table data */
--text-base: 14px    /* Body text, default size */
--text-md: 16px      /* Emphasized body text */
--text-lg: 18px      /* Large body text */
--text-xl: 20px      /* Small headings */
--text-2xl: 24px     /* H3 headings */
--text-3xl: 28px     /* H2 headings */
--text-4xl: 32px     /* H1 headings */
--text-5xl: 40px     /* Hero headings */
```

### Font Weights

```css
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
--font-black: 900
```

### Line Heights

```css
--leading-none: 1
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

### Typography Scale

#### Headings

```css
.heading-1 {
  font-size: var(--text-4xl);     /* 32px */
  font-weight: var(--font-extrabold);  /* 800 */
  line-height: var(--leading-tight);   /* 1.25 */
  letter-spacing: -0.02em;
}

.heading-2 {
  font-size: var(--text-3xl);     /* 28px */
  font-weight: var(--font-bold);       /* 700 */
  line-height: var(--leading-tight);   /* 1.25 */
  letter-spacing: -0.01em;
}

.heading-3 {
  font-size: var(--text-2xl);     /* 24px */
  font-weight: var(--font-bold);       /* 700 */
  line-height: var(--leading-snug);    /* 1.375 */
}

.heading-4 {
  font-size: var(--text-xl);      /* 20px */
  font-weight: var(--font-semibold);   /* 600 */
  line-height: var(--leading-snug);    /* 1.375 */
}
```

#### Body Text

```css
.body-large {
  font-size: var(--text-md);      /* 16px */
  font-weight: var(--font-normal);     /* 400 */
  line-height: var(--leading-relaxed); /* 1.625 */
}

.body {
  font-size: var(--text-base);    /* 14px */
  font-weight: var(--font-normal);     /* 400 */
  line-height: var(--leading-normal);  /* 1.5 */
}

.body-small {
  font-size: var(--text-sm);      /* 12px */
  font-weight: var(--font-normal);     /* 400 */
  line-height: var(--leading-normal);  /* 1.5 */
}
```

#### Monospace (Data Display)

```css
.mono {
  font-family: var(--font-mono);
  font-feature-settings: 'tnum', 'zero';  /* Tabular numbers, slashed zero */
}

.data-large {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);     /* 28px */
  font-weight: var(--font-bold);       /* 700 */
  line-height: var(--leading-none);    /* 1 */
}

.data-medium {
  font-family: var(--font-mono);
  font-size: var(--text-xl);      /* 20px */
  font-weight: var(--font-semibold);   /* 600 */
  line-height: var(--leading-tight);   /* 1.25 */
}

.data-small {
  font-family: var(--font-mono);
  font-size: var(--text-sm);      /* 12px */
  font-weight: var(--font-medium);     /* 500 */
  line-height: var(--leading-tight);   /* 1.25 */
}
```

#### Labels & Captions

```css
.label {
  font-size: var(--text-xs);      /* 11px */
  font-weight: var(--font-medium);     /* 500 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.caption {
  font-size: var(--text-xs);      /* 11px */
  font-weight: var(--font-normal);     /* 400 */
  color: var(--text-muted);
  line-height: var(--leading-normal);  /* 1.5 */
}
```

---

## Spacing

Consistent spacing scale based on 4px grid:

```css
--space-0: 0px
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

### Usage Guidelines

- **Padding**: Use for internal component spacing
- **Margin**: Use for component separation
- **Gap**: Use for flexbox/grid spacing

```css
/* Component internal padding */
.card {
  padding: var(--space-6);  /* 24px */
}

/* Spacing between elements */
.stack > * + * {
  margin-top: var(--space-4);  /* 16px */
}

/* Grid/flex gaps */
.grid {
  gap: var(--space-4);  /* 16px */
}
```

---

## Elevation & Shadows

Shadow system for creating depth and hierarchy:

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15)
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2)
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.3)
```

Light theme shadows (softer):

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08)
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12)
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.15)
```

### Elevation Levels

| Level | Token | Use Case |
|-------|-------|----------|
| 0 | none | Flush with background |
| 1 | --shadow-sm | Subtle cards, hoverable items |
| 2 | --shadow-md | Cards, dropdowns |
| 3 | --shadow-lg | Modals, popovers |
| 4 | --shadow-xl | Modal overlays, prominent dialogs |

### Glow Effects

```css
--glow-green: 0 0 20px rgba(0, 255, 163, 0.3)
--glow-red: 0 0 20px rgba(255, 71, 87, 0.3)
--glow-blue: 0 0 20px rgba(59, 130, 246, 0.3)
```

Usage for emphasis on key metrics:

```css
.profit-highlight {
  box-shadow: var(--glow-green);
}
```

---

## Border Radius

Rounded corner values for consistent component shapes:

```css
--radius-none: 0px
--radius-sm: 4px
--radius-base: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 20px
--radius-2xl: 24px
--radius-full: 9999px
```

### Usage Guidelines

| Radius | Use For |
|--------|---------|
| none | Flush edges, data tables |
| sm (4px) | Small buttons, badges |
| base (8px) | Cards, inputs, buttons (default) |
| md (12px) | Large cards, modals |
| lg (16px) | Hero sections, featured cards |
| full | Pills, circular avatars, tags |

---

## Transitions

Smooth animations for state changes:

```css
--transition-fast: 100ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Usage Guidelines

```css
/* Hover effects */
.button {
  transition: all var(--transition-base);
}

/* Modal enter/exit */
.modal {
  transition: opacity var(--transition-slow);
}

/* Micro-interactions */
.icon {
  transition: transform var(--transition-fast);
}
```

---

## Effects

### Backdrop Blur

```css
--blur-sm: blur(4px)
--blur-base: blur(8px)
--blur-md: blur(12px)
--blur-lg: blur(16px)
--blur-xl: blur(24px)
```

Usage for glassmorphism effects:

```css
.glass-card {
  background: rgba(30, 33, 48, 0.8);
  backdrop-filter: var(--blur-md);
}
```

### Opacity Levels

```css
--opacity-0: 0
--opacity-10: 0.1
--opacity-20: 0.2
--opacity-30: 0.3
--opacity-40: 0.4
--opacity-50: 0.5
--opacity-60: 0.6
--opacity-70: 0.7
--opacity-80: 0.8
--opacity-90: 0.9
--opacity-100: 1
```

---

## Layout

### Container Widths

```css
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1536px
```

### Z-Index Scale

```css
--z-base: 0
--z-dropdown: 100
--z-sticky: 200
--z-overlay: 300
--z-modal: 400
--z-popover: 500
--z-tooltip: 600
--z-notification: 700
```

### Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Implementation Example

Complete example using design tokens:

```css
.trade-card {
  /* Layout */
  padding: var(--space-6);
  border-radius: var(--radius-base);

  /* Colors */
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-primary);

  /* Effects */
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.trade-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.trade-profit {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--accent-green);
}
```

---

## Token Naming Convention

All tokens follow this pattern:

```
--{category}-{variant}-{state}
```

Examples:
- `--bg-primary` (background, primary variant)
- `--text-secondary` (text, secondary variant)
- `--accent-green-dim` (accent, green variant, dim state)

---

**Last Updated**: January 2026
