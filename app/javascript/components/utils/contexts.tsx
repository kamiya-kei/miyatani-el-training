import { createContext } from 'react';

interface User {
  id: string;
  name: string;
}

interface UserContext {
  user: User | null;
  setUser: (user: User) => void;
  isLogin: boolean;
}

export const UserContext = createContext({
  user: null,
  setUser: () => null,
  isLogin: false,
} as UserContext);
