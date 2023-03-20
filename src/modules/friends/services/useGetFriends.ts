/* eslint-disable react-hooks/exhaustive-deps */
import {useAuthContext} from '../../../contexts/auth.context';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
import {useEffect} from 'react';

const useGetFriends = () => {
  const {accessToken, setUser, user} = useAuthContext();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    function _responseInfoCallback(
      error?: Record<string, unknown>,
      result?: Record<string, any>,
    ) {
      if (error) {
        console.log('Error fetching data: ' + error.toString());
        return;
      }
      if (result) {
        console.log('Success fetching data: ' + JSON.stringify(result));
        setUser(
          user
            ? {
                ...user,
                friendCount: result.friends?.summary?.total_count ?? 0,
              }
            : null,
        );
      }
    }
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'friends',
          },
        },
      },
      _responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }, [accessToken]);
};

export default useGetFriends;
