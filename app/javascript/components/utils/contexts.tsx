import { createContext } from 'react';
import { User } from 'utils/types';

interface UserContext {
  user: User | null;
  setUser: (user: User) => void;
  isLogin: boolean;
  loadingUser: boolean;
}

export const UserContext = createContext({
  user: null,
  setUser: () => null,
  isLogin: false,
  loadingUser: true,
} as UserContext);

interface UtilContext {
  util: {
    flashMessage: (message, severity?) => void;
    confirmDialog: (message?) => Promise<boolean>;
    promptDialog: (message, defaultValue?) => Promise<string>;
    setBackdrop: (loading: boolean) => void;
  };
}

export const UtilContext = createContext({
  util: null,
} as UtilContext);
