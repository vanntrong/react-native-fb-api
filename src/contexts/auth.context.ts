import {TUser} from '../types/user.type';
import {createContext, useContext} from 'react';

interface IAuthContext {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
