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
import GroupCard from '../components/group-card';
import useGetGroups from '../services/useGetGroups';
import {TUserGroup} from '../types/groups';

const GroupsScreen = () => {
  const {getGroups, data, loading} = useGetGroups();

  const [next, setNext] = useState<string | null>(null);
  const [groups, setGroups] = useState<TUserGroup[]>([]);
  const [selectedItem, setSelectedItem] = useState<TUserGroup | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    if (data?.data.length === 0) {
      setNext(null);
      return;
    }
    if (data) {
      setGroups(prev => [...prev, ...data.data]);

      if (data.data.length > LIMIT) {
        setNext(data.paging.cursors.after);
      }
    }
  }, [data]);

  const renderItem: ListRenderItem<TUserGroup> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
          setSelectedItem(item);
        }}>
        <GroupCard item={item} />
      </TouchableOpacity>
    );
  };

  const renderLoading = () => {
    if (!loading && !next) {
      return <Text>No more groups</Text>;
    }
    return <ActivityIndicator />;
  };

  const handleLoadMore = () => {
    if (next) {
      getGroups(next);
      setNext(null);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
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
          <GroupCard item={selectedItem} isShowDescription={true} />
        </Modal>
      )}
    </View>
  );
};

export default GroupsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  likeList: {
    display: 'flex',
  },
});
