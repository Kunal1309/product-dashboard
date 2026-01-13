import React from 'react';

const ProductCard = ({ product, isFavorite, onToggleFavorite, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : 'fill-gray-300'}`} viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="text-xs text-blue-600 font-semibold uppercase mb-1">
          {product.category}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={() => onViewDetails(product.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
