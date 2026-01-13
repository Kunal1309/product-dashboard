import { describe, it, expect } from 'vitest';
import { favoritesReducer, TOGGLE_FAVORITE } from '../store/slices/favoritesSlice';

describe('Favorites Slice', () => {
  it('should return initial state', () => {
    expect(favoritesReducer(undefined, {})).toEqual([]);
  });

  it('should add item to favorites', () => {
    const action = { type: TOGGLE_FAVORITE, payload: 1 };
    const state = favoritesReducer([], action);
    expect(state).toEqual([1]);
  });

  it('should remove item from favorites', () => {
    const initialState = [1, 2, 3];
    const action = { type: TOGGLE_FAVORITE, payload: 2 };
    const state = favoritesReducer(initialState, action);
    expect(state).toEqual([1, 3]);
  });

  it('should toggle multiple items correctly', () => {
    let state = [];
    state = favoritesReducer(state, { type: TOGGLE_FAVORITE, payload: 1 });
    state = favoritesReducer(state, { type: TOGGLE_FAVORITE, payload: 2 });
    expect(state).toEqual([1, 2]);
    
    state = favoritesReducer(state, { type: TOGGLE_FAVORITE, payload: 1 });
    expect(state).toEqual([2]);
  });
});
