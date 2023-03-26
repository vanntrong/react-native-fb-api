import dayjs from 'dayjs';
import React, {FC, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {EPrivacy, TPost} from '../../types/post';

interface IPostCardProps {
  post: TPost;
}

const PRIVACY_ICONS: Record<EPrivacy, React.ReactNode> = {
  SELF: <Text>🔒</Text>,
  ALL_FRIENDS: <Text>👥</Text>,
  EVERYONE: <Text>🌎</Text>,
};

const MAX_LENGTH_DESCRIPTION = 100;

const PostCard: FC<IPostCardProps> = ({post}) => {
  const [isSplitDescription, setIsSplitDescription] = useState<boolean>(true);

  const renderPrivacy = (privacy: EPrivacy) => {
    if (EPrivacy[privacy]) {
      return PRIVACY_ICONS[privacy];
    }
    return null;
    // return <Text>🔒</Text>;
  };
  return (
    <View style={styles.post}>
      {post.full_picture && (
        <View style={styles.postImageWrapper}>
          <Image source={{uri: post.full_picture}} style={styles.postImage} />
        </View>
      )}
      <Text style={styles.postCreatedTime}>
        {dayjs(post.created_time).format('DD/MM/YYYY HH:mm:ss')}
        {renderPrivacy(post.privacy.value)}
      </Text>
      {post.name && <Text style={styles.postName}>{post.name}</Text>}
      {post.description && (
        <>
          <Text style={styles.postDescription}>
            {isSplitDescription
              ? post.description.slice(0, MAX_LENGTH_DESCRIPTION)
              : post.description}
          </Text>
          {post.description.length > MAX_LENGTH_DESCRIPTION && (
            <View style={styles.buttonSeeMoreWrapper}>
              <Pressable
                onPress={() => setIsSplitDescription(prev => !prev)}
                style={styles.buttonSeeMore}>
                <Text style={styles.buttonSeeMoreText}>
                  See {isSplitDescription ? 'more' : 'less'}
                </Text>
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  post: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  postImageWrapper: {
    width: '100%',
    height: 250,
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postCreatedTime: {
    marginTop: 10,
    fontSize: 14,
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  postDescription: {
    fontSize: 14,
    marginTop: 10,
    color: '#000',
  },
  buttonSeeMoreWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttonSeeMore: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2976F2',
    width: 80,
  },
  buttonSeeMoreText: {
    fontSize: 14,
    color: '#fff',
  },
});
