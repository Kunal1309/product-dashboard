// Action Types
export const SET_SEARCH = 'SET_SEARCH';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SORT = 'SET_SORT';

// Action Creators
export const setSearch = (search) => ({ type: SET_SEARCH, payload: search });
export const setCategory = (category) => ({ type: SET_CATEGORY, payload: category });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });

// Initial State
const initialState = {
  search: '',
  category: 'all',
  sort: 'default'
};

// Reducer
export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};
