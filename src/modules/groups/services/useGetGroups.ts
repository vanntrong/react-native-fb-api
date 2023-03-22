import {useCallback, useState} from 'react';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {TUserGroups} from '../types/groups';

const useGetGroups = () => {
  const [data, setData] = useState<TUserGroups>();
  const [loading, setLoading] = useState(false);

  const getGroups = useCallback(async (next?: string) => {
    setLoading(true);
    const token = await AccessToken.getCurrentAccessToken();
    if (!token) {
      return;
    }

    const getLikeGraphApi = new GraphRequest(
      `/${token.userID}/groups?fields=picture{url},name,description&limit=25${
        next ? `&after=${next}` : ''
      }`,
      {
        accessToken: token.accessToken,
      },
      (err, result) => {
        if (err) {
          console.log('Error fetching data: ', err);
          setLoading(false);
          return;
        } else {
          setData(result as TUserGroups);
          setLoading(false);
        }
      },
    );

    new GraphRequestManager().addRequest(getLikeGraphApi).start();
  }, []);

  return {
    getGroups,
    data,
    loading,
  };
};

export default useGetGroups;
