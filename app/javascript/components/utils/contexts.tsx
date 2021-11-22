import { createContext } from 'react';
interface User {
  id: string;
  name: string;
}

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
    flashMessage: (message) => void;
    confirmDialog: () => Promise<boolean>;
    setBackdrop: (loading: boolean) => void;
  };
}

export const UtilContext = createContext({
  util: null,
} as UtilContext);
