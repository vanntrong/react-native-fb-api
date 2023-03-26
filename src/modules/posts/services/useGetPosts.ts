import {LIMIT} from '../../../configs/app.config';
import queryString from 'query-string';
import {useCallback, useState} from 'react';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {TGetPostsResponse} from '../types/post';

export type TNext = {
  until: string;
  since?: string;
  __paging_token: string;
  __previous?: string;
};

const useGetPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TGetPostsResponse>();

  const getPosts = useCallback(async (next?: TNext) => {
    const token = await AccessToken.getCurrentAccessToken();
    setLoading(true);
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }

    const getPostsApi = new GraphRequest(
      `/me/posts?${queryString.stringify({
        ...{
          fields:
            'caption,description,name,full_picture,created_time,privacy,attachments',
          limit: `${LIMIT}`,
          ...(next ? next : {}),
        },
      })}`,
      {
        accessToken: token?.accessToken,
      },
      (err, res) => {
        if (err) {
          setError(true);
          setLoading(false);
          console.log('Error fetching data: ', err);
          return;
        }
        setData(res as TGetPostsResponse);
        setLoading(false);
      },
    );

    new GraphRequestManager().addRequest(getPostsApi).start();
  }, []);

  return {
    getPosts,
    data,
    loading,
    error,
  };
};

export default useGetPosts;
