import {useCallback} from 'react';
import {ShareContent, ShareDialog} from 'react-native-fbsdk-next';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useShareVideo = () => {
  const shareVideo = useCallback((video: string) => {
    const sharePhotoContent: ShareContent = {
      contentType: 'video',
      video: {
        localUrl: video,
      },
    };
    ShareDialog.show(sharePhotoContent)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Upload video success',
          text2: 'Now your video is https://facebook.com',
          autoHide: true,
          bottomOffset: 50,
        });
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Upload video failed',
          text2: err.message,
        });
      });
  }, []);

  return {shareVideo};
};

export default useShareVideo;
