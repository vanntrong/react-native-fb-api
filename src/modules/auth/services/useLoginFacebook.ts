import {useState} from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import useGetMe from './useGetMe';

const useLoginFacebook = () => {
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
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      setIsError(true);
      return;
    }

    getMe(data.accessToken.toString());
  }

  return {
    isCancel,
    isError,
    loginFacebook,
  };
};

export default useLoginFacebook;
