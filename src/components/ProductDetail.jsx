import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const ProductDetail = ({ productId, onBack }) => {
  const dispatch = useDispatch();
  const product = useSelector(state => 
    state.products.items.find(p => p.id === productId)
  );
  const isFavorite = useSelector(state => state.favorites.includes(productId));
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Product not found</p>
        <button onClick={onBack} className="text-blue-600 hover:underline">
          Back to Products
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>
          
          <div>
            <div className="text-sm text-blue-600 font-semibold uppercase mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="font-semibold">{product.rating.rate}</span>
                <span className="text-gray-500 ml-1">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            
            <div className="text-4xl font-bold text-gray-900 mb-6">
              ${product.price}
            </div>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isFavorite
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
