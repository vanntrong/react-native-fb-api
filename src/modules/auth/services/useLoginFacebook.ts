import {useAuthContext} from '../../../contexts/auth.context';
import {useState} from 'react';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {TUser} from '@/types/user.type';

const useLoginFacebook = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isError, setIsError] = useState(false);
  const {setUser, setAccessToken} = useAuthContext();
  async function loginFacebook() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]);

    if (result.isCancelled) {
      setIsCancel(true);
      return;
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      setIsError(true);
      return;
    }

    setAccessToken(data.accessToken.toString());

    Profile.getCurrentProfile().then(profile => {
      console.log('profile', profile);
      setUser(profile as TUser);
    });
  }

  return {
    isCancel,
    isError,
    loginFacebook,
  };
};

export default useLoginFacebook;
