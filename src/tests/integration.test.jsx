import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { productsReducer } from '../store/slices/productsSlice';
import { filtersReducer } from '../store/slices/filtersSlice';
import { favoritesReducer } from '../store/slices/favoritesSlice';
import { setSearch, setCategory, setSort } from '../store/slices/filtersSlice';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { FETCH_PRODUCTS_SUCCESS } from '../store/slices/productsSlice';

// Thunk middleware
const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

describe('Integration Tests', () => {
  let store;

  beforeEach(() => {
    const rootReducer = combineReducers({
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer
    });

    store = createStore(rootReducer, applyMiddleware(thunk));
  });

  it('should fetch and display products', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 10, category: 'electronics' },
      { id: 2, title: 'Product 2', price: 20, category: 'clothing' }
    ];

    store.dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: mockProducts });

    const state = store.getState();
    expect(state.products.items).toHaveLength(2);
    expect(state.products.items[0].title).toBe('Product 1');
  });

  it('should update search filter', () => {
    store.dispatch(setSearch('laptop'));
    
    const state = store.getState();
    expect(state.filters.search).toBe('laptop');
  });

  it('should update category filter', () => {
    store.dispatch(setCategory('electronics'));
    
    const state = store.getState();
    expect(state.filters.category).toBe('electronics');
  });

  it('should update sort filter', () => {
    store.dispatch(setSort('price-asc'));
    
    const state = store.getState();
    expect(state.filters.sort).toBe('price-asc');
  });

  it('should add and remove favorites', () => {
    store.dispatch(toggleFavorite(1));
    let state = store.getState();
    expect(state.favorites).toContain(1);

    store.dispatch(toggleFavorite(2));
    state = store.getState();
    expect(state.favorites).toEqual([1, 2]);

    store.dispatch(toggleFavorite(1));
    state = store.getState();
    expect(state.favorites).toEqual([2]);
  });

  it('should handle multiple filter changes', () => {
    store.dispatch(setSearch('phone'));
    store.dispatch(setCategory('electronics'));
    store.dispatch(setSort('price-asc'));

    const state = store.getState();
    expect(state.filters.search).toBe('phone');
    expect(state.filters.category).toBe('electronics');
    expect(state.filters.sort).toBe('price-asc');
  });

  it('should maintain state across multiple actions', () => {
    const mockProducts = [
      { id: 1, title: 'Laptop', price: 999, category: 'electronics' },
      { id: 2, title: 'Shirt', price: 29, category: 'clothing' }
    ];

    store.dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: mockProducts });
    store.dispatch(setCategory('electronics'));
    store.dispatch(toggleFavorite(1));

    const state = store.getState();
    expect(state.products.items).toHaveLength(2);
    expect(state.filters.category).toBe('electronics');
    expect(state.favorites).toEqual([1]);
  });
});
