import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  memories: [],
  loading: true,
  error: null,
};

// Reducer function
const reducer  = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        memories: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        memories: [],
        loading: false,
        error: action.payload,
      };
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

// Create Context
export const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('mm');

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
