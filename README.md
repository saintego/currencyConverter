# 💱 CZK Currency Converter

A modern React application for converting Czech Koruna (CZK) to other currencies using live exchange rates from the Czech National Bank (CNB).

## ✨ Features

- 📊 **Live Exchange Rates** - Fetches real-time rates from Czech National Bank
- 💰 **Currency Converter** - Convert CZK to any supported currency with real-time updates
- 📋 **Exchange Rates Table** - View all available exchange rates in a clean table format
- 🎨 **Modern UI** - Beautiful gradient design with styled-components
- ⚡ **Fast & Responsive** - Built with Vite and React 19
- ✅ **Fully Tested** - Comprehensive test coverage with Vitest and React Testing Library

## 🛠️ Tech Stack

- **React** 19.2 with Hooks
- **TypeScript** for type safety
- **Styled Components** for styling
- **React Query** (@tanstack/react-query) for data fetching and caching
- **Vite** for blazing fast builds
- **Vitest** & React Testing Library for testing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm test -- --run` - Run tests once
- `npm run lint` - Run ESLint

## 🧪 Testing

The application includes comprehensive tests for:

- Currency conversion logic
- API service functions
- Component rendering and user interactions

Run tests with: `npm test`

## 📡 API

The app uses the Czech National Bank's official exchange rate API:

- **Endpoint**: `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`
- **Documentation**: [CNB Exchange Rate Format](https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/)

### CORS Handling

The CNB API does not support CORS for browser requests. The app handles this differently for development and production:

- **Development**: Uses Vite proxy configuration (configured in `vite.config.ts`)
- **Production**: Requires deployment platform with proxy/rewrite rules or serverless function

For Vercel deployment, add this to `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/cnb/:path*",
      "destination": "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/:path*"
    }
  ]
}
```

For Netlify, add to `netlify.toml`:

```toml
[[redirects]]
  from = "/api/cnb/*"
  to = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/:splat"
  status = 200
```

## 📄 License

MIT
