/* eslint-disable no-unused-vars */

import { createContext, ReactNode, useContext, useReducer } from 'react';

import { IUser } from '@/services/types';

type State = {
  user: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

export type AuthContextParam = { state: State; dispatch: Dispatch };

const initialState: State = {
  user: null,
};

type AuthContextProviderProps = { children: ReactNode };

const AuthContext = createContext<AuthContextParam | undefined>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error(`useAuthContext must be used within a AuthContextProvider`);
};

export { AuthContextProvider, useAuthContext };
