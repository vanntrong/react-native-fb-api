import {useAuthContext} from '../../../contexts/auth.context';
import {useState} from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import useGetMe from './useGetMe';

const useLoginFacebook = () => {
  const {setUser} = useAuthContext();
  const {getMe} = useGetMe();

  const [isCancel, setIsCancel] = useState(false);
  const [isError, setIsError] = useState(false);

  async function loginFacebook() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
      'user_birthday',
      'user_gender',
      'user_likes',
      'groups_show_list',
    ]);

    if (result.isCancelled) {
      setIsCancel(true);
      return;
    }

    // Once signed in, get the users AccesToken
    const accessToken = await AccessToken.getCurrentAccessToken();

    if (!accessToken) {
      setIsError(true);
      return;
    }

    getMe(accessToken.accessToken.toString()).then(res => {
      setUser(res);
    });
  }

  return {
    isCancel,
    isError,
    loginFacebook,
  };
};

export default useLoginFacebook;
