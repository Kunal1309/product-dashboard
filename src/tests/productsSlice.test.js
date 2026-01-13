import { describe, it, expect } from 'vitest';
import { productsReducer, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../store/slices/productsSlice';

describe('Products Slice', () => {
  const initialState = { items: [], loading: false, error: null };

  it('should return initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_PRODUCTS_REQUEST', () => {
    const action = { type: FETCH_PRODUCTS_REQUEST };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    const products = [
      { id: 1, title: 'Product 1', price: 10 },
      { id: 2, title: 'Product 2', price: 20 }
    ];
    const action = { type: FETCH_PRODUCTS_SUCCESS, payload: products };
    const state = productsReducer(initialState, action);
    expect(state.items).toEqual(products);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle FETCH_PRODUCTS_FAILURE', () => {
    const error = 'Network error';
    const action = { type: FETCH_PRODUCTS_FAILURE, payload: error };
    const state = productsReducer(initialState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
