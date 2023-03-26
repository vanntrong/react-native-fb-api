import {LIMIT} from '../../../configs/app.config';
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
import Modal from '../../../components/modal';
import LikeCard from '../components/like-card';
import useGetLikes from '../services/useGetLikes';
import {TUserPageLike} from '../types/likes';

const LikesScreen = () => {
  const {getLikes, data, loading} = useGetLikes();
  const [next, setNext] = useState<string | null>(null);
  const [pageLikes, setPageLikes] = useState<TUserPageLike[]>([]);
  const [selectedItem, setSelectedItem] = useState<TUserPageLike | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  useEffect(() => {
    if (data?.data.length === 0) {
      setNext(null);
      return;
    }
    if (data) {
      setPageLikes(prev => [...prev, ...data.data]);

      if (data.data.length > LIMIT) {
        setNext(data.paging.cursors.after);
      }
    }
  }, [data]);

  const handleLoadMore = () => {
    if (next) {
      getLikes(next);
      setNext(null);
    }
  };

  const renderItem: ListRenderItem<TUserPageLike> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
          setSelectedItem(item);
        }}>
        <LikeCard item={item} />
      </TouchableOpacity>
    );
  };

  const renderLoading = () => {
    if (!loading && !next) {
      return <Text>No more likes</Text>;
    }
    return <ActivityIndicator />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pageLikes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoading}
      />

      {selectedItem && (
        <Modal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setSelectedItem(null);
          }}>
          <LikeCard
            item={selectedItem}
            isShowAbout={true}
            isShowDescription={true}
          />
        </Modal>
      )}
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  likeList: {
    display: 'flex',
  },
});
