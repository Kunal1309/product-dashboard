import { describe, it, expect } from 'vitest';
import { filtersReducer, SET_SEARCH, SET_CATEGORY, SET_SORT } from '../store/slices/filtersSlice';

describe('Filters Slice', () => {
  const initialState = { search: '', category: 'all', sort: 'default' };

  it('should return initial state', () => {
    expect(filtersReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_SEARCH', () => {
    const action = { type: SET_SEARCH, payload: 'laptop' };
    const state = filtersReducer(initialState, action);
    expect(state.search).toBe('laptop');
  });

  it('should handle SET_CATEGORY', () => {
    const action = { type: SET_CATEGORY, payload: 'electronics' };
    const state = filtersReducer(initialState, action);
    expect(state.category).toBe('electronics');
  });

  it('should handle SET_SORT', () => {
    const action = { type: SET_SORT, payload: 'price-asc' };
    const state = filtersReducer(initialState, action);
    expect(state.sort).toBe('price-asc');
  });
});
