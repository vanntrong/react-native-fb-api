import {AuthContext} from '../contexts/auth.context';
import React, {FC, PropsWithChildren, useState} from 'react';
import {TUser} from '@/types/user.type';

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
