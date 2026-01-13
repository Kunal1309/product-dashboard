import { createStore, combineReducers, applyMiddleware } from 'redux';
import { productsReducer } from './slices/productsSlice';
import { filtersReducer } from './slices/filtersSlice';
import { favoritesReducer } from './slices/favoritesSlice';

// Thunk middleware
const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

// Root reducer
const rootReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  favorites: favoritesReducer
});

// Create store with thunk middleware
export const store = createStore(rootReducer, applyMiddleware(thunk));
