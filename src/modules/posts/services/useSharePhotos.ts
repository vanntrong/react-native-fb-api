import {useCallback} from 'react';
import {Alert} from 'react-native';
import {ShareContent, ShareDialog} from 'react-native-fbsdk-next';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useSharePhotos = () => {
  const sharePhotos = useCallback((images: string[]) => {
    if (images.length === 0) {
      Alert.alert('Please select at least one image');
    }

    const sharePhotoContent: ShareContent = {
      contentType: 'photo',
      photos: images.map(img => ({imageUrl: img})),
    };
    ShareDialog.show(sharePhotoContent)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: `Upload ${images.length > 1 ? 'photos' : 'photo'} success`,
          text2: 'Now your images is https://facebook.com',
          autoHide: true,
          bottomOffset: 50,
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Upload photos failed',
          text2: err.message,
        });
      });
  }, []);

  return {sharePhotos};
};

export default useSharePhotos;
