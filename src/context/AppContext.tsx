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
    case 'UPDATE_USER_DESCRIPTION':
      return {
        ...state,
        user: {
          ...state.user,
          description: action.payload,
        },
        loading: false,
        error: null,
      }
    case 'API_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
      };
    case 'CLEAR_ALL_ERRORS':
      return {
        ...state,
        error: false,
        loading: false,
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
