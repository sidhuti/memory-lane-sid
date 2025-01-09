import React, { createContext, useReducer } from 'react';
import { Memory } from '../constants/constants'

interface User {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  description: string
}




interface State {
  user?: User
  memories: Memory[],
  loading: boolean,
  error?: { message: string}
}

// Define action types
type Action =
  | { type: 'FETCH_USER_SUCCESS'; payload: User }
  | { type: 'UPDATE_USER_DESCRIPTION'; payload: string }
  | { type: 'API_ERROR'; payload: string }
  | { type: 'CLEAR_ALL_ERRORS' }
  | { type: 'FETCH_MEMORY_SUCCESS'; payload: Memory[] }
  | { type: 'POST_MEMORY_SUCCESS'; payload: Memory[] }
  | { type: 'FETCH_MEMORY_START' };


// Initial state
const initialState: State = {
  user: undefined,
  memories: [],
  loading: true,
  error: undefined,
};

// Reducer function
const reducer  = (state : State, action: Action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: undefined,
      };
    case 'UPDATE_USER_DESCRIPTION':
      if (!state.user) {
        return state; // No user to update
      }
      return {
        ...state,
        user: {
          ...state.user,
          description: action.payload,
        },
        loading: false,
        error: undefined,
      }
    case 'API_ERROR':
        return {
          ...state,
          loading: false,
          error: { message: action.payload },
      };
    case 'CLEAR_ALL_ERRORS':
      return {
        ...state,
        error: undefined,
        loading: false,
      };
    case 'FETCH_MEMORY_SUCCESS':
      return {
        ...state,
        memories: action.payload,
        loading: false,
        error: undefined,
      };
    case 'POST_MEMORY_SUCCESS':
      return {
        ...state,
        memories: [...state.memories, ...action.payload],
        loading: false,
        error: undefined,
      };
    case 'FETCH_MEMORY_START':
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    default:
      return state;
  }
};

export interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider Component
export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }: { children: React.ReactNode}) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
