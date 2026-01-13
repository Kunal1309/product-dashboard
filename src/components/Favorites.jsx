import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { selectFavoriteProducts } from '../store/selectors';
import ProductCard from './ProductCard';

const Favorites = ({ onViewProduct }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const products = useSelector(selectFavoriteProducts);
  
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Favorites Yet</h2>
        <p className="text-gray-500">Start adding products to your favorites!</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        My Favorites ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
            onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            onViewDetails={onViewProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
