import React from 'react';
import HomeScreen from '../modules/home/screens/home';
import {PATH} from './paths.config';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../modules/auth/screens/login';
import LikesScreen from '../modules/likes/screens/likes';

type TScreen = {
  name: string;
  component: React.FC;
  icon: () => React.ReactElement;
};

export const privateScreens: TScreen[] = [
  {
    name: PATH.HOME,
    component: HomeScreen,
    icon: () => <FaIcon name="home" size={20} />,
  },
  {
    name: PATH.LIKES,
    component: LikesScreen,
    icon: () => <FaIcon name="heart" size={20} />,
  },
];

export const publicScreens: TScreen[] = [
  {
    name: PATH.LOGIN,
    component: LoginScreen,
    icon: () => <FaIcon name="user" size={20} />,
  },
];
