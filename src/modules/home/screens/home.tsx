import {useAuthContext} from '../../../contexts/auth.context';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = () => {
  const {user, logout} = useAuthContext();

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');

  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <Image source={{uri: user?.picture?.data.url}} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.email}>{user?.birthday}</Text>
        </View>
      </View>
      <View style={styles.countWrapper}>
        {user?.friends && (
          <Text>{`Friend count: ${user.friends.summary.total_count} friends`}</Text>
        )}
      </View>

      <View style={styles.forms}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            placeholder="user first name"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            placeholder="user last name"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={user?.email}
            style={{...styles.input, ...styles.inputDisabled}}
            placeholder="email"
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            value={user?.birthday}
            style={{...styles.input, ...styles.inputDisabled}}
            placeholder="birthday"
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            value={user?.gender}
            style={{...styles.input, ...styles.inputDisabled}}
            placeholder="gender"
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.buttonSubmit}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogout} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
  forms: {
    marginTop: 20,
  },
  inputGroup: {
    display: 'flex',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  inputDisabled: {
    backgroundColor: '#eee',
  },
  buttonSubmit: {
    backgroundColor: '#4b79c3',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#e74c3c',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
