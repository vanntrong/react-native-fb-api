import {TUserPageLike} from 'modules/likes/types/likes';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface ILikeCardProps {
  item: TUserPageLike;
  isShowAbout?: boolean;
  isShowDescription?: boolean;
}

const LikeCard: FC<ILikeCardProps> = ({
  item,
  isShowAbout,
  isShowDescription,
}) => {
  return (
    <View>
      <View style={styles.likeContainer}>
        <Image source={{uri: item.picture.data.url}} style={styles.likeImage} />
        <View style={styles.likeInfoWrapper}>
          <Text style={styles.likeText}>Name: {item.name}</Text>
          <Text style={styles.likeText}>Follower: {item.followers_count}</Text>
        </View>
      </View>
      {isShowAbout && item.about && <Text>About: {item.about}</Text>}
      {isShowDescription && item.description && (
        <Text>Description: {item.description}</Text>
      )}
    </View>
  );
};

export default LikeCard;

const styles = StyleSheet.create({
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: 1,
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
