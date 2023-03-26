import {useCallback} from 'react';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
import {TUser} from '../../../types/user.type';

const useGetMe = () => {
  const getMe = useCallback((accessToken: string) => {
    return new Promise<TUser>((resolve, reject) => {
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
            reject(err);
          }
          resolve(result as TUser);
        },
      );

      new GraphRequestManager().addRequest(getMeRequest).start();
    });
  }, []);

  return {
    getMe,
  };
};

export default useGetMe;
