import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Favorites from './components/Favorites';

const App = () => {
  const [currentPage, setCurrentPage] = useState('products');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const favoritesCount = useSelector(state => state.favorites.length);
  
  const handleViewProduct = (id) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
  };
  
  const handleBack = () => {
    setCurrentPage('products');
    setSelectedProductId(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ShopHub</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('products')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'products' || currentPage === 'detail'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setCurrentPage('favorites')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  currentPage === 'favorites'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Favorites
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {currentPage === 'products' && <ProductList onViewProduct={handleViewProduct} />}
        {currentPage === 'detail' && <ProductDetail productId={selectedProductId} onBack={handleBack} />}
        {currentPage === 'favorites' && <Favorites onViewProduct={handleViewProduct} />}
      </main>
    </div>
  );
};

export default App;
