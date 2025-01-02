import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  memories: [],
  loading: true,
  error: null,
};

// Reducer function
const reducer  = (state, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USER_ERROR':
        return {
          ...state,
          user: null,
          loading: false,
          error: null,
      };
    case 'FETCH_MEMORY_SUCCESS':
      return {
        ...state,
        memories: action.payload,
        loading: false,
        error: null,
      };
    case 'POST_MEMORY_SUCCESS':
      return {
        ...state,
        memories: [...state.memories, ...action.payload],
        loading: false,
        error: null,
      };
    case 'FETCH_MEMORY_ERROR':
      return {
        ...state,
        memories: [],
        loading: false,
        error: action.payload,
      };
    case 'FETCH_MEMORY_START':
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


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
