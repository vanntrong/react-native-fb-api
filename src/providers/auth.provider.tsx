import {AuthContext} from '../contexts/auth.context';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {TUser} from '../types/user.type';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import useGetMe from '../modules/auth/services/useGetMe';
import RNBootSplash from 'react-native-bootsplash';

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const {getMe} = useGetMe();
  const [user, setUser] = useState<TUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getUserIfTokenExists = useCallback(async () => {
    const token = await AccessToken.getCurrentAccessToken();
    if (!token) {
      RNBootSplash.hide({fade: true});
      return;
    }

    getMe(token.accessToken).then((res: TUser) => {
      setUser(res);
      RNBootSplash.hide({fade: true});
    });
  }, [getMe]);

  useEffect(() => {
    getUserIfTokenExists();
  }, [getUserIfTokenExists]);

  const logout = useCallback(() => {
    LoginManager.logOut();
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{user, setUser, accessToken, setAccessToken, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
