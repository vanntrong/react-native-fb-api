import {useAuthContext} from '../../../contexts/auth.context';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
import {TUser} from '../../../types/user.type';

const useGetMe = () => {
  const {setUser} = useAuthContext();
  const getMe = (accessToken: string) => {
    const getMeRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string:
              'first_name,last_name,birthday,name,hometown,gender,picture{url},email,friends{about,name},education',
          },
        },
      },
      (err, result) => {
        if (err) {
          console.log('error', err);
          return;
        }
        setUser(result as TUser);
      },
    );

    new GraphRequestManager().addRequest(getMeRequest).start();
  };

  return {
    getMe,
  };
};

export default useGetMe;
