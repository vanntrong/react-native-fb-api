import React from 'react';
import HomeScreen from '@/modules/home/screens/home';
import {PATH} from './paths.config';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '@/modules/auth/screens/login';

type TScreen = {
  name: string;
  component: React.FC;
  icon: () => React.ReactElement;
};

export const screens: TScreen[] = [
  {
    name: PATH.HOME,
    component: HomeScreen,
    icon: () => <FaIcon name="home" size={20} />,
  },
  {
    name: PATH.LOGIN,
    component: LoginScreen,
    icon: () => <FaIcon name="user" size={20} />,
  },
];
