import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useGetLikes from '../services/useGetLikes';

const LikesScreen = () => {
  const {getLikes, data} = useGetLikes();
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  useEffect(() => {
    console.log({data});
    if (data) {
      setNext(data.paging.cursors.after);
    }
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Likes Screen</Text>
        {data && (
          <View style={styles.likeList}>
            {data.data.map(like => (
              <TouchableOpacity>
                <View key={like.id + like.name} style={styles.likeContainer}>
                  <Image
                    source={{uri: like.picture.data.url}}
                    style={styles.likeImage}
                  />
                  <View style={styles.likeInfoWrapper}>
                    <Text style={styles.likeText}>Name: {like.name}</Text>
                    <Text style={styles.likeText}>
                      Follower: {like.followers_count}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
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
  likeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  likeInfoWrapper: {
    display: 'flex',
  },
  likeImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  likeText: {
    marginLeft: 10,
  },
});
