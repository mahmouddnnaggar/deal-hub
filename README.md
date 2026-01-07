# Deal Hub - Enterprise E-Commerce Application

A production-grade e-commerce application built with Next.js 16 (App Router), TypeScript, NextAuth, TailwindCSS + shadcn/ui, Framer Motion, and full internationalization support for Arabic (RTL) and English (LTR).

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **React Context** | Client state management |
| **NextAuth v5** | Authentication layer |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Subtle UI animations |
| **next-intl** | Internationalization (i18n) |
| **Zod** | Schema validation |
| **Vitest** | Unit testing |
| **Axios** | HTTP client |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-based routing
│   │   ├── products/       # Products pages
│   │   ├── categories/     # Categories pages
│   │   ├── brands/         # Brands pages
│   │   ├── cart/           # Cart page
│   │   ├── wishlist/       # Wishlist page
│   │   ├── checkout/       # Checkout flow
│   │   ├── orders/         # Orders pages
│   │   ├── profile/        # Profile pages
│   │   └── login/          # Auth pages
│   └── api/                # API routes
├── core/                   # Core infrastructure
│   ├── api/                # HTTP client & endpoints
│   ├── auth/               # NextAuth configuration
│   ├── config/             # App configuration
│   └── providers/          # Context providers
├── features/               # Feature modules
│   ├── auth/               # Authentication
│   ├── products/           # Products
│   ├── categories/         # Categories
│   ├── brands/             # Brands
│   ├── cart/               # Cart
│   ├── wishlist/           # Wishlist
│   ├── orders/             # Orders
│   └── addresses/          # User addresses
├── shared/                 # Shared utilities
│   ├── ui/                 # UI components
│   ├── lib/                # Utilities
│   ├── hooks/              # Custom hooks
│   └── motion/             # Animation primitives
├── entities/               # Zod schemas & types
├── i18n/                   # Internationalization
└── messages/               # Translation files
```

## 🌐 API Integration

**Base URL:** `https://ecommerce.routemisr.com`

### Endpoints Covered (33 total)

| Feature | Endpoints |
|---------|-----------|
| Auth | 8 (signup, signin, forgot/reset password, change password, update profile, verify token) |
| Products | 2 (list with full query params, details) |
| Categories | 3 (list, details, subcategories) |
| SubCategories | 2 (list, details) |
| Brands | 2 (list, details) |
| Cart | 5 (add, get, update, remove, clear) |
| Wishlist | 3 (add, remove, get) |
| Addresses | 4 (add, remove, get one, get all) |
| Orders | 4 (create cash, checkout session, get all, get user orders) |

### Query Parameters Utilized

Products listing supports full filtering:
- `limit`, `page` - Pagination
- `sort` - Sorting (price, rating, date, etc.)
- `keyword` - Search
- `brand`, `category[in]` - Filtering
- `price[gte]`, `price[lte]` - Price range

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd deal-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Deal Hub
```

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
```

## 🌍 Internationalization

Supports English and Arabic with full RTL/LTR layout switching:

- `/en/*` - English (LTR)
- `/ar/*` - Arabic (RTL)

Translations are in `src/messages/{locale}.json`.

## 🎨 Design System

Built on Tailwind CSS 4 with design tokens:

- Consistent color palette (light/dark modes)
- Typography scale
- Spacing system
- Component variants (shadcn/ui style)

## 🔒 Security

- NextAuth for authentication
- Protected routes via proxy
- Secure session handling
- Input validation with Zod
- Security headers configured

## ⚡ Performance

- Server Components for SSR
- Streaming with loading states
- Image optimization
- Route prefetching
- Memoization where needed

## 📋 Coding Conventions

- Feature-based modular architecture
- No business logic in UI components
- Type-safe API responses (Zod validation)
- Explicit error/loading/empty state handling
- Optimistic updates for cart/wishlist

## 🧪 Testing

```bash
npm run test
```

Tests cover:
- Business logic
- Component rendering
- API utilities

## 📱 Accessibility

- ARIA labels and roles
- Keyboard navigation
- Focus management
- Semantic HTML

---

Built with ❤️ for enterprise e-commerce
