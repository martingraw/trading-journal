# TradeLog - Trading Journal & Analytics

Professional trading journal with advanced analytics and performance tracking built with Next.js 15, React 18, and TypeScript.

## 🚀 Quick Start

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
TradeLog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   └── globals.css        # Design system CSS variables
├── public/                # Static assets
│   ├── favicon.png
│   └── logo.jpg
├── docs/                  # Documentation
│   └── design/           # Design system
│       ├── README.md
│       ├── design-tokens.md
│       ├── components.md
│       ├── style-guide.md
│       └── compliance-report.md
├── index.html            # Legacy HTML version
├── index.source.html     # Legacy HTML source
└── menu-items.csv        # Navigation menu data

```

## 🎨 Design System

TradeLog uses a comprehensive design system with CSS custom properties. All design tokens, component specs, and guidelines are documented in the `/docs/design` folder:

- **[Design System Overview](docs/design/README.md)** - Core principles and structure
- **[Design Tokens](docs/design/design-tokens.md)** - Colors, typography, spacing, effects
- **[Component Specs](docs/design/components.md)** - Detailed component documentation
- **[Style Guide](docs/design/style-guide.md)** - Usage guidelines and best practices
- **[Compliance Report](docs/design/compliance-report.md)** - Design system audit

### Key Design Features

- 🌙 Dark theme by default with light theme support
- 💚 Semantic colors: Green for profit, Red for loss
- 🔤 Inter font for UI, JetBrains Mono for data
- ♿ WCAG 2.1 AA compliant
- 📱 Fully responsive

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5
- **Styling**: CSS Custom Properties (CSS Variables)
- **Fonts**: Next.js Font Optimization (Inter, JetBrains Mono)
- **Linting**: ESLint with Next.js config

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎯 Next Steps

1. **Start development server**: `npm run dev`
2. **Create components**: Add reusable components in `app/components/`
3. **Add routes**: Create new routes in the `app/` directory
4. **Follow design system**: Use tokens from `app/globals.css`
5. **Review compliance**: Check `docs/design/compliance-report.md` for improvements

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🔒 Environment Variables

Create a `.env.local` file for environment variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=
```

## 📝 License

Private project - All rights reserved

---

**Version**: 1.0.0
**Last Updated**: January 2026
