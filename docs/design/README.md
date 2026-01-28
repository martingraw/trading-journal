# TradeLog Design System

## Overview

The TradeLog Design System is a comprehensive set of design tokens, components, and guidelines that ensure consistency across the trading journal application. This system is built specifically for financial data visualization and trading analytics.

## Design Philosophy

### Core Principles

1. **Data First**: Trading data should be immediately scannable with clear visual hierarchies
2. **Professional & Modern**: Clean, sophisticated interface that builds trader confidence
3. **Accessible**: WCAG 2.1 AA compliant with proper contrast ratios and keyboard navigation
4. **Performance**: Optimized for real-time data updates and chart rendering
5. **Dark by Default**: Reduce eye strain during extended trading sessions with optional light mode

### Visual Language

- **Geometric Clarity**: Clean rectangles, subtle rounded corners (8px standard)
- **Depth Through Layers**: Subtle shadows and elevation system
- **Color as Meaning**: Green = profit/long, Red = loss/short, Blue = neutral/info
- **Purposeful Motion**: Smooth 200ms transitions for state changes
- **Data Density**: Balanced information density without overwhelming users

## Technology Stack

- **Framework**: React 18
- **Styling**: CSS Custom Properties (CSS Variables)
- **Charts**: Chart.js
- **Icons**: Font Awesome 6.5.1
- **Typography**: Inter (UI), JetBrains Mono (data/monospace)

## Structure

```
docs/design/
├── README.md           # This file - Design system overview
├── design-tokens.md    # Color, typography, spacing, effects
├── components.md       # Component specifications and patterns
├── style-guide.md      # Usage guidelines and best practices
└── references/         # Design reference images
    ├── 1.webp         # Trading dashboard (dark purple theme)
    ├── 2.webp         # Wallet dashboard (dark multi-color)
    ├── 3.webp         # Analytics dashboard (lime accent)
    └── 4.webp         # Cards dashboard (light theme)
```

## Quick Start

### Using Design Tokens

All design tokens are available as CSS custom properties in the `:root` scope:

```css
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
}
```

### Theme Support

The system supports both dark and light themes via the `data-theme` attribute:

```javascript
// Toggle theme
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.setAttribute('data-theme', 'dark'); // or remove attribute
```

### Typography Scale

```css
.heading-1 { font-size: 32px; font-weight: 800; }
.heading-2 { font-size: 24px; font-weight: 700; }
.body { font-size: 14px; font-weight: 400; }
.mono { font-family: 'JetBrains Mono', monospace; }
```

## Key Features

### Dual Theme System
- Dark theme optimized for trading (default)
- Light theme for daytime use
- Automatic color adjustments across all components

### Financial Color Semantics
- **Green (#00ffa3)**: Profits, long positions, positive changes
- **Red (#ff4757)**: Losses, short positions, negative changes
- **Blue (#3b82f6)**: Neutral information, links, primary actions
- **Purple (#a855f7)**: Secondary actions, premium features
- **Yellow (#fbbf24)**: Warnings, pending states

### Component Library
- Cards with multiple variants
- Data tables optimized for financial data
- Chart components with consistent theming
- Form elements with validation states
- Status badges and pills
- Navigation patterns

### Accessibility
- WCAG 2.1 AA compliant color contrast
- Keyboard navigation support
- Screen reader friendly markup
- Focus indicators on all interactive elements
- Reduced motion support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Versioning

**Current Version**: 1.0.0

This design system follows semantic versioning:
- **Major**: Breaking changes to tokens or component APIs
- **Minor**: New components or non-breaking enhancements
- **Patch**: Bug fixes and documentation updates

## Contributing

When adding new patterns or components:

1. Ensure they follow the core design principles
2. Use existing design tokens (create new ones if needed)
3. Document usage examples and accessibility considerations
4. Test in both dark and light themes
5. Verify WCAG compliance

## Resources

- [Design Tokens](design-tokens.md) - Complete token reference
- [Component Specs](components.md) - Detailed component documentation
- [Style Guide](style-guide.md) - Usage guidelines and patterns
- [Reference Images](references/) - Visual inspiration and goals

## Support

For questions or suggestions about the design system, please open an issue or reach out to the development team.

---

**Last Updated**: January 2026
**Maintained By**: TradeLog Development Team
