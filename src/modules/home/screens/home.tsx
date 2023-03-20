import {useAuthContext} from '../../../contexts/auth.context';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import useGetFriends from '../../friends/services/useGetFriends';

const HomeScreen = () => {
  const {user} = useAuthContext();
  useGetFriends();

  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <Image source={{uri: user?.imageURL}} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.countWrapper}>
        {user?.friendCount && (
          <Text>{`Friend count: ${user.friendCount} friends`}</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#999',
  },
  info: {
    marginLeft: 10,
    display: 'flex',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  countWrapper: {
    display: 'flex',
    marginTop: 20,
  },
});
