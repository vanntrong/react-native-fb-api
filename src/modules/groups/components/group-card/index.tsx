import {TUserGroup} from '../../types/groups';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface IGroupCardProps {
  item: TUserGroup;
  isShowDescription?: boolean;
}

const GroupCard: FC<IGroupCardProps> = ({item, isShowDescription}) => {
  return (
    <View>
      <View style={styles.groupContainer}>
        <Image
          source={{uri: item.picture.data.url}}
          style={styles.groupImage}
        />
        <View style={styles.groupInfoWrapper}>
          <Text style={styles.groupText}>Name: {item.name}</Text>
        </View>
      </View>
      {isShowDescription && item.description && (
        <Text>Description: {item.description}</Text>
      )}
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  groupInfoWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'row',
  },
  groupImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  groupText: {
    marginLeft: 10,
  },
});
