import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import PostCard from '../components/post-card';
import useGetPosts, {TNext} from '../services/useGetPosts';
import useSharePhotos from '../services/useSharePhotos';
import {TPost} from '../types/post';
import queryString from 'query-string';

const PostsScreen = () => {
  const [next, setNext] = useState<TNext>();
  const [posts, setPosts] = useState<TPost[]>([]);

  const {getPosts, data, loading} = useGetPosts();
  const {sharePhotos} = useSharePhotos();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    if (data) {
      setPosts(prev => [...prev, ...data.data]);
      const parsed: any = queryString.parse(data.paging.next);
      const {
        until,
        __paging_token,
        since = undefined,
        __previous = undefined,
      } = parsed;
      setNext({
        until,
        __paging_token,
        since,
        __previous,
      });
    }
  }, [data]);

  const handleLoadMore = () => {
    if (next) {
      getPosts(next);
    }
  };

  const onUploadPhotos = () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [DocumentPicker.types.images],
    }).then((res: DocumentPickerResponse[]) => {
      const images = res.map(item => item.uri);

      sharePhotos(images);
    });
  };

  const onUploadVideos = () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [DocumentPicker.types.video],
    }).then((res: DocumentPickerResponse[]) => {
      const videos = res.map(item => item.uri);

      console.log({videos});
    });
  };

  const renderItem: ListRenderItem<TPost> = ({item}) => {
    return <PostCard post={item} />;
  };

  const renderLoading = () => {
    return <ActivityIndicator />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonUpload} onPress={onUploadPhotos}>
        <Text style={styles.buttonText}>Upload photos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.buttonUpload, ...styles.buttonUploadVideo}}
        onPress={onUploadVideos}>
        <Text style={styles.buttonText}>Upload videos</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        style={styles.postList}
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoading}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonUpload: {
    backgroundColor: '#2976F2',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonUploadVideo: {
    backgroundColor: '#cf1d1d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  postList: {
    display: 'flex',
    paddingBottom: 20,
  },
});
