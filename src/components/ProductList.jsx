import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { setSearch, setCategory, setSort } from '../store/slices/filtersSlice';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { selectFilteredProducts } from '../store/selectors';
import ProductCard from './ProductCard';

const ProductList = ({ onViewProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const { loading, error, items } = useSelector(state => state.products);
  const { search, category, sort } = useSelector(state => state.filters);
  const favorites = useSelector(state => state.favorites);
  
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearch(searchInput));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);
  
  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [items]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        Error loading products: {error}
      </div>
    );
  }
  
  return (
    <div>
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Product Count */}
      <div className="mb-4 text-gray-600">
        Showing {products.length} of {items.length} products
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            onViewDetails={onViewProduct}
          />
        ))}
      </div>
      
      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductList;
