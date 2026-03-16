# Bakery Website - Frontend

A modern, responsive landing page for a Filipino-Hawaiian bakery built with **React**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and **npm**

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server (auto-reload on file changes)
npm run dev
```

The website will be available at **http://localhost:5173/**

## 📋 Recent Changes

### ✨ New Features Added

1. **Mini Cakes Section**
   - Added a new product showcase section featuring 5 mini cake offerings:
     - Chocolate Mini Cake ($6)
     - Vanilla Mini Cake ($6)
     - Turon Mini Cake ($10)
     - Ube Mini Cake ($10)
     - Samplers Collection ($30)
   - Responsive grid layout (1 column mobile → 5 columns desktop)
   - Each card includes emoji, name, price badge, description, and CTA

2. **Routing Setup**
   - Integrated React Router for multi-page navigation
   - Home page displays at root path (`/`)
   - Navigation structure ready for Products, Checkout pages

3. **Styling & Design**
   - Tailwind CSS fully configured
   - Brand color tokens applied throughout
   - Responsive design with Tailwind utilities
   - Google Fonts integrated (Cormorant Garamond + DM Sans)

### 🔧 Technical Setup

- ✅ Tailwind CSS with PostCSS configured
- ✅ React Router DOM for client-side routing
- ✅ TypeScript for type safety
- ✅ Vite dev server with hot module replacement (HMR)
- ✅ Responsive grid system for product cards

## 📁 Project Structure

```
src/
├── pages/
│   └── Home.tsx          # Main landing page with all sections
├── App.tsx               # App routing wrapper
├── main.tsx              # React entry point
└── index.css             # Global styles + Tailwind directives

public/                   # Static assets
tailwind.config.js        # Tailwind configuration
postcss.config.js         # PostCSS configuration
vite.config.ts            # Vite configuration
```

## 🎨 Page Sections

The homepage includes the following sections:

1. **Navbar** - Sticky navigation with logo and cart button
2. **Hero** - Full-viewport intro with tagline and CTAs
3. **Marquee Ticker** - Scrolling pastry name carousel
4. **Featured Products** - 3 highlight product cards
5. **Mini Cakes** - NEW: 5 mini cake showcase 
6. **About Strip** - Brand story with quote
7. **Footer** - Links and copyright

## 🛠 Available Scripts

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎯 Key Features

- **Responsive Design** - Mobile-first, works on all screen sizes
- **Hot Reloading** - Changes save automatically in dev mode
- **Tailwind Utilities** - Grid, flexbox, responsive breakpoints
- **Brand Tokens** - Centralized color system for consistency
- **Smooth Animations** - Fade-up effects and card hover states
- **Accessible** - Semantic HTML, ARIA labels

## 📝 Notes for Backend Developers

### Viewing Changes
1. Run `npm run dev` and open http://localhost:5173/
2. Changes auto-reload as you edit files
3. All changes are in `src/pages/Home.tsx`

### Integration Points
- **Product Cards**: Currently use emoji placeholders — replace with API data
- **Navigation**: Routes configured for `/products`, `/checkout` (pages not yet created)
- **Cart Count**: Placeholder showing "0" — wire to cart state management
- **Product Links**: Cards navigate to `/products/{id}` routes

### API Integration TODO
- Replace `FEATURED_ITEMS` with `GET /api/v1/products?featured=true`
- Replace `MINI_CAKES` with `GET /api/v1/products?category=mini_cakes`
- Fetch product images and update `emoji` fields to use `imageUrl`

## 🎨 Brand Tokens

All colors defined in `Home.tsx`:
- **Cream**: `#FAF7F2` (background)
- **Ink**: `#1C1A17` (text)
- **Forest**: `#2D4A3E` (primary)
- **Gold**: `#C9A84C` (accent)
- **Sand**: `#EDE0CC` (secondary)
- **Muted**: `#7A7060` (secondary text)

## 📦 Dependencies

- `react` - UI library
- `react-dom` - React renderer
- `react-router-dom` - Routing
- `tailwindcss` - Utility-first CSS
- `typescript` - Type safety

## ❓ Questions?

See TODOs in the code for known tasks. All TODOs are marked with comments in `src/pages/Home.tsx`.

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
