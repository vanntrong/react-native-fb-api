import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import App from './App';
import AuthProvider from './providers/auth.provider';

const MainApp = () => {
  return (
    <AuthProvider>
      <App />
      <Toast />
    </AuthProvider>
  );
};

export default MainApp;
