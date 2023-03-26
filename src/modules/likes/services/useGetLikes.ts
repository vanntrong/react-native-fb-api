import {LIMIT} from '../../../configs/app.config';
import {useCallback, useState} from 'react';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {TUserPageLikes} from '../types/likes';

const useGetLikes = () => {
  const [data, setData] = useState<TUserPageLikes>();
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
      }/likes?fields=picture{url},name,followers_count,description,about&limit=${LIMIT}${
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
          setData(result as TUserPageLikes);
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
