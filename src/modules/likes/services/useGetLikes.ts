import {useCallback, useState} from 'react';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {TUserLike} from '../../../types/user.type';

const useGetLikes = () => {
  const [data, setData] = useState<TUserLike>();
  const [loading, setLoading] = useState(false);

  const getLikes = useCallback(async (next?: string) => {
    setLoading(true);
    const token = await AccessToken.getCurrentAccessToken();
    if (!token) {
      return;
    }

    const getLikeGraphApi = new GraphRequest(
      `/${
        token.userID
      }/likes?fields=picture{url},name,followers_count,description&limit=25${
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
          setData(result as TUserLike);
          setLoading(false);
        }
      },
    );

    new GraphRequestManager().addRequest(getLikeGraphApi).start();
  }, []);

  return {
    getLikes,
    data,
    loading,
  };
};

export default useGetLikes;
