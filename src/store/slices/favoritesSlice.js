// Action Types
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Action Creators
export const toggleFavorite = (id) => ({ type: TOGGLE_FAVORITE, payload: id });

// Initial State
const initialState = [];

// Reducer
export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
};
