# Product Dashboard - E-Commerce Application

A modern, modular e-commerce product dashboard built with React, Redux, and Tailwind CSS.

## 📁 Project Structure
```
src/
├── components/          # React components
│   ├── ProductCard.jsx  # Individual product card
│   ├── ProductList.jsx  # Products grid with filters
│   ├── ProductDetail.jsx# Product detail view
│   └── Favorites.jsx    # Favorites page
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   │   ├── productsSlice.js  # Products state
│   │   ├── filtersSlice.js   # Filters state
│   │   └── favoritesSlice.js # Favorites state
│   ├── selectors.js    # Redux selectors
│   └── store.js        # Store configuration
├── tests/              # Test files
│   ├── productsSlice.test.js
│   ├── filtersSlice.test.js
│   ├── favoritesSlice.test.js
│   ├── ProductCard.test.jsx
│   ├── selectors.test.js
│   ├── integration.test.jsx
│   └── setup.js
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## ✨ Features

- **Product Listing**: Responsive grid with Fake Store API integration
- **Real-time Search**: Debounced search (300ms)
- **Category Filtering**: Filter by product categories
- **Price Sorting**: Sort ascending/descending
- **Favorites Management**: Add/remove with persistence
- **Product Details**: Full product information view
- **Responsive Design**: Mobile-first approach

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Testing
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 🧪 Test Coverage

✅ **37 Tests Passing**

- Redux Slices (15 tests)
- Selectors (6 tests)
- Components (4 tests)
- Integration (12 tests)

## 🛠️ Tech Stack

- React 18
- Redux (with custom thunk middleware)
- Vite
- Tailwind CSS
- Vitest + React Testing Library

## 📦 Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-redux": "^9.1.2",
  "redux": "^5.0.1"
}
```

## 🎯 Architecture Highlights

### Component Structure
- **Presentational Components**: Pure UI components (ProductCard)
- **Container Components**: Connected to Redux (ProductList, Favorites)
- **Page Components**: Route-level components (ProductDetail)

### State Management
- **Products Slice**: API data and loading states
- **Filters Slice**: Search, category, and sort filters
- **Favorites Slice**: User's favorite products

### Selectors
- Memoized selectors for optimal performance
- Complex filtering and sorting logic
- Derived state calculations

## 🧩 Component API

### ProductCard
```jsx
<ProductCard
  product={product}
  isFavorite={boolean}
  onToggleFavorite={(id) => void}
  onViewDetails={(id) => void}
/>
```

### ProductList
```jsx
<ProductList onViewProduct={(id) => void} />
```

### ProductDetail
```jsx
<ProductDetail productId={number} onBack={() => void} />
```

### Favorites
```jsx
<Favorites onViewProduct={(id) => void} />
```

## 📊 Performance

- Debounced search: 300ms
- Memoized selectors
- Optimized re-renders
- Code splitting ready

## 🔒 Best Practices

✅ Modular code structure  
✅ Separation of concerns  
✅ Comprehensive testing  
✅ Type-safe patterns  
✅ Accessible UI  
✅ Responsive design  

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder
```


## 👤 Author

Kunal Titare
+91 6202745560
