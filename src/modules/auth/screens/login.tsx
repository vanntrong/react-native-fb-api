import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import useLoginFacebook from '../services/useLoginFacebook';

const LoginScreen = () => {
  const {loginFacebook, isCancel, isError} = useLoginFacebook();

  useEffect(() => {
    if (isCancel) {
      Alert.alert('You need to login to continue');
    }

    if (isError) {
      Alert.alert('Login failed');
    }
  }, [isCancel, isError]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headingWrapper}>
          <Text style={styles.title}>Welcome to my App</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={loginFacebook}>
          <FaIcon name="facebook" color={'#fff'} size={18} />
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingWrapper: {
    display: 'flex',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2976F2',
    flexDirection: 'row',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
});
