# URL Shortener - Frontend

React application built with TypeScript, Vite, Mantine UI, and TanStack Router.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Mantine UI** - Component library
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@tabler/icons-react** - Icon library
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the app on http://localhost:3000

### Type Checking

```bash
npm run type-check
```

Runs TypeScript compiler to check for type errors.

### Linting

```bash
npm run lint         # Check for linting errors
npm run lint:fix     # Fix auto-fixable linting errors
```

### Formatting

```bash
npm run format        # Format all files with Prettier
npm run format:check  # Check if files are formatted correctly
```

### Build for Production

```bash
npm run build
```

Runs type checking and builds the app to the `dist` folder, ready for deployment to S3.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_API_ENDPOINT=https://your-api-gateway-url.amazonaws.com
```

This endpoint will be provided after deploying the backend.

## Project Structure

```
src/
├── pages/
│   └── Home.tsx               # Home page with URL shortening form
├── components/                # Reusable components (for future use)
├── hooks/                     # Custom React hooks
│   ├── useCreateShortUrl.ts   # Hook for creating short URLs
│   └── README.md              # Hook patterns documentation
├── mutations/                 # TanStack Query mutation functions
│   ├── createShortUrl.ts      # API function for shortening URLs
│   └── README.md              # Mutation patterns documentation
├── types/
│   └── types.ts               # Shared TypeScript types
├── routes/                    # Additional routes (for future use)
├── App.tsx                    # App shell wrapper
├── main.tsx                   # Entry point with providers
└── routeTree.tsx              # TanStack Router configuration
```

## Features

- ✅ Full TypeScript support for type safety
- ✅ URL input with React Hook Form
- ✅ Zod schema validation (required, valid URL, http/https protocol)
- ✅ TanStack Query for API state management
  - Automatic loading states
  - Error handling
  - Request deduplication
  - DevTools for debugging
- ✅ Display shortened URL with copy button
- ✅ Toast notifications for success/error
- ✅ Responsive design
- ✅ Modern UI with Mantine components

## Deployment

The built files in `dist/` will be deployed to AWS S3 for static hosting via GitHub Actions.
