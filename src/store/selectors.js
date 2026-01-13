// Selector for filtered and sorted products
export const selectFilteredProducts = (state) => {
  let filtered = state.products.items;
  
  // Apply search filter
  if (state.filters.search) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(state.filters.search.toLowerCase())
    );
  }
  
  // Apply category filter
  if (state.filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === state.filters.category);
  }
  
  // Apply sorting
  if (state.filters.sort === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (state.filters.sort === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }
  
  return filtered;
};

// Selector for all products
export const selectAllProducts = (state) => state.products.items;

// Selector for products loading state
export const selectProductsLoading = (state) => state.products.loading;

// Selector for products error
export const selectProductsError = (state) => state.products.error;

// Selector for filters
export const selectFilters = (state) => state.filters;

// Selector for favorites
export const selectFavorites = (state) => state.favorites;

// Selector for favorite products
export const selectFavoriteProducts = (state) => {
  const favorites = state.favorites;
  return state.products.items.filter(p => favorites.includes(p.id));
};

// Selector for checking if product is favorite
export const selectIsFavorite = (productId) => (state) => {
  return state.favorites.includes(productId);
};
